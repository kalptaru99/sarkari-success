import pool from '@/lib/db.js';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const searchQueries = [
  // Central Govt
  { query: 'site:ssc.gov.in new recruitment notification 2026', type: 'job', org: 'SSC' },
  { query: 'site:upsc.gov.in new notification recruitment 2026', type: 'job', org: 'UPSC' },
  { query: 'site:rrbapply.gov.in new notification 2026', type: 'job', org: 'RRB' },
  { query: 'site:ibps.in new notification recruitment 2026', type: 'job', org: 'IBPS' },
  { query: 'site:sbi.co.in careers recruitment 2026', type: 'job', org: 'SBI' },
  { query: 'site:rbi.org.in opportunities recruitment 2026', type: 'job', org: 'RBI' },
  { query: 'site:joinindianarmy.nic.in recruitment 2026', type: 'job', org: 'Indian Army' },
  { query: 'site:ssc.gov.in result 2026', type: 'result', org: 'SSC' },
  { query: 'site:upsc.gov.in result 2026', type: 'result', org: 'UPSC' },
  { query: 'site:ibps.in result 2026', type: 'result', org: 'IBPS' },
  { query: 'site:ssc.gov.in admit card hall ticket 2026', type: 'admit_card', org: 'SSC' },
  { query: 'site:rrbapply.gov.in admit card 2026', type: 'admit_card', org: 'RRB' },
  // State Govt
  { query: 'site:bpsc.bih.nic.in new notification 2026', type: 'job', org: 'BPSC' },
  { query: 'site:uppsc.up.nic.in new notification 2026', type: 'job', org: 'UPPSC' },
  { query: 'site:tnpsc.gov.in new notification 2026', type: 'job', org: 'TNPSC' },
  { query: 'site:keralapsc.gov.in new notification 2026', type: 'job', org: 'Kerala PSC' },
  { query: 'site:kpsc.kar.nic.in new notification 2026', type: 'job', org: 'KPSC' },
  { query: 'site:mpsc.gov.in new notification 2026', type: 'job', org: 'MPSC' },
  { query: 'site:pscwb.org.in new notification 2026', type: 'job', org: 'WBPSC' },
  { query: 'site:gpsc.gujarat.gov.in new notification 2026', type: 'job', org: 'GPSC' },
  { query: 'site:appsc.gov.in new notification 2026', type: 'job', org: 'APPSC' },
  { query: 'site:tspsc.gov.in new notification 2026', type: 'job', org: 'TSPSC' },
  { query: 'site:rpsc.rajasthan.gov.in new notification 2026', type: 'job', org: 'RPSC' },
  { query: 'site:mppsc.mp.gov.in new notification 2026', type: 'job', org: 'MPPSC' },
  { query: 'site:opsc.gov.in new notification 2026', type: 'job', org: 'OPSC' },
];

async function searchSerper(query) {
  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, num: 5 }),
    });
    const data = await response.json();
    return data.organic || [];
  } catch (error) {
    console.error('Serper error:', error);
    return [];
  }
}

async function extractWithClaude(results, type, org) {
  if (results.length === 0) return null;

  const resultsText = results.map(r =>
    'Title: ' + r.title + '\nURL: ' + r.link + '\nSnippet: ' + r.snippet
  ).join('\n\n');

  const prompt = 'You are extracting government job notification data from search results.\n\n'
    + 'Search results:\n' + resultsText + '\n\n'
    + 'Extract information for type: ' + type + '\n'
    + 'Organization: ' + org + '\n\n'
    + 'Return ONLY a JSON object or null if no relevant new notification found:\n'
    + '{\n'
    + '  "found": true/false,\n'
    + '  "title": "exact notification title",\n'
    + '  "org": "organization name",\n'
    + '  "vacancies": "exact number only like 1234 or null if not found",\n'
    + '  "last_date": "exact date only like 25 June 2026 or null if not found",\n'
    + '  "exam_date": "exam date if mentioned",\n'
    + '  "salary": "salary if mentioned",\n'
    + '  "eligibility": "eligibility if mentioned",\n'
    + '  "apply_link": "direct apply URL",\n'
    + '  "notification_link": "notification PDF URL",\n'
    + '  "description": "2-3 sentence summary",\n'
    + '  "category": "SSC/Railway/Banking/UPSC/Defence/Teaching/State PSC/PSU",\n'
    + '  "slug": "url-friendly-slug-from-title",\n'
    + '  "result_date": "if type is result",\n'
    + '  "status": "Declared if result",\n'
    + '  "exam_name": "if type is result or admit card",\n'
    + '  "admit_card_date": "if type is admit card"\n'
    + '}\n\n'
    + 'Return null if no new 2026 notification found. Return ONLY JSON, nothing else.';

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].text.trim();
    if (text === 'null') return null;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (error) {
    console.error('Claude extraction error:', error);
    return null;
  }
}

async function saveToDatabase(data, type) {
  if (!data || !data.found) return { saved: false };

  try {
    if (type === 'job') {
      const existing = await pool.query('SELECT id FROM jobs WHERE slug = $1', [data.slug]);
      if (existing.rows.length > 0) return { saved: false, reason: 'already exists' };

      if (!data.vacancies || data.vacancies === 'TBA' || data.vacancies === 'See notification' || data.vacancies === 'null' || data.vacancies === null || data.vacancies.toLowerCase().includes('tba')) {
        return { saved: false, reason: 'no vacancy data' };
      }
      if (!data.last_date || data.last_date === 'TBA' || data.last_date === 'See notification' || data.last_date === 'null' || data.last_date === null || data.last_date.toLowerCase().includes('tba')) {
        return { saved: false, reason: 'no last date' };
      }
      const vacancyNum = parseInt(data.vacancies.toString().replace(/,/g, '').replace(/\+/g, '').replace(/[^0-9]/g, ''));
      if (isNaN(vacancyNum) || vacancyNum < 10) {
        return { saved: false, reason: 'vacancy number too low or invalid' };
      }
      if (!data.title || data.title.length < 10) {
        return { saved: false, reason: 'invalid title' };
      }

      await pool.query(
        `INSERT INTO jobs (title, org, vacancies, last_date, apply_link, notification_link, exam_date, salary, eligibility, description, category, slug, is_new)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)`,
        [data.title, data.org, data.vacancies || 'TBA', data.last_date || 'See notification',
         data.apply_link || '', data.notification_link || '', data.exam_date || '',
         data.salary || '', data.eligibility || '', data.description || '',
         data.category || 'Other', data.slug]
      );
      return { saved: true, type: 'job', title: data.title };
    }

    if (type === 'result') {
      const existing = await pool.query('SELECT id FROM results WHERE slug = $1', [data.slug]);
      if (existing.rows.length > 0) return { saved: false, reason: 'already exists' };

      await pool.query(
        `INSERT INTO results (exam, org, slug, result_date, status, result_link, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [data.exam_name || data.title, data.org, data.slug,
         data.result_date || 'Recently declared', data.status || 'Declared',
         data.apply_link || '', data.description || '']
      );
      return { saved: true, type: 'result', title: data.title };
    }

    if (type === 'admit_card') {
      const existing = await pool.query('SELECT id FROM admit_cards WHERE slug = $1', [data.slug]);
      if (existing.rows.length > 0) return { saved: false, reason: 'already exists' };

      await pool.query(
        `INSERT INTO admit_cards (exam, org, slug, exam_date, admit_card_date, official_link, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [data.exam_name || data.title, data.org, data.slug,
         data.exam_date || '', data.admit_card_date || 'Released',
         data.apply_link || '', data.description || '']
      );
      return { saved: true, type: 'admit_card', title: data.title };
    }

  } catch (error) {
    console.error('DB save error:', error);
    return { saved: false, reason: error.message };
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = {
    searched: 0,
    found: 0,
    saved: 0,
    skipped: 0,
    errors: 0,
    details: [],
  };

  for (const searchQuery of searchQueries) {
    try {
      const searchResults = await searchSerper(searchQuery.query);
      results.searched++;

      const extracted = await extractWithClaude(searchResults, searchQuery.type, searchQuery.org);

      if (extracted && extracted.found) {
        results.found++;
        const saved = await saveToDatabase(extracted, searchQuery.type);
        if (saved.saved) {
          results.saved++;
          results.details.push({ status: 'saved', type: searchQuery.type, title: saved.title });

          try {
            await fetch(`${process.env.NEXTAUTH_URL || 'https://sarkarisuccess.com'}/api/indexnow`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ urls: [`https://sarkarisuccess.com/${searchQuery.type === 'job' ? 'jobs' : searchQuery.type === 'result' ? 'results' : 'admit-card'}/${extracted.slug}`] }),
            });
          } catch (e) {
            console.error('IndexNow ping failed:', e);
          }
        } else {
          results.skipped++;
          results.details.push({ status: 'skipped', reason: saved.reason, title: extracted.title });
        }
      }

      await new Promise(r => setTimeout(r, 1000));

    } catch (error) {
      results.errors++;
      console.error('Pipeline error for query:', searchQuery.query, error);
    }
  }

  return Response.json({
    success: true,
    timestamp: new Date().toISOString(),
    results,
  });
}