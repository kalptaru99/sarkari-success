import pool from '@/lib/db.js';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const stateSearchQueries = [
  { state: "Bihar", state_code: "BR", language: "Hindi", query: "BPSC Bihar recruitment 2026 notification vacancies", org: "BPSC" },
  { state: "Bihar", state_code: "BR", language: "Hindi", query: "Bihar Police constable recruitment 2026 vacancies", org: "Bihar Police" },
  { state: "Uttar Pradesh", state_code: "UP", language: "Hindi", query: "UPPSC UP recruitment 2026 notification vacancies", org: "UPPSC" },
  { state: "Uttar Pradesh", state_code: "UP", language: "Hindi", query: "UP Police recruitment 2026 vacancies notification", org: "UP Police" },
  { state: "Rajasthan", state_code: "RJ", language: "Hindi", query: "RPSC Rajasthan recruitment 2026 notification vacancies", org: "RPSC" },
  { state: "Madhya Pradesh", state_code: "MP", language: "Hindi", query: "MPPSC MP recruitment 2026 notification vacancies", org: "MPPSC" },
  { state: "Tamil Nadu", state_code: "TN", language: "Tamil", query: "TNPSC Tamil Nadu recruitment 2026 notification vacancies", org: "TNPSC" },
  { state: "Kerala", state_code: "KL", language: "Malayalam", query: "Kerala PSC recruitment 2026 notification vacancies", org: "Kerala PSC" },
  { state: "Karnataka", state_code: "KA", language: "Kannada", query: "KPSC Karnataka recruitment 2026 notification vacancies", org: "KPSC" },
  { state: "Maharashtra", state_code: "MH", language: "Marathi", query: "MPSC Maharashtra recruitment 2026 notification vacancies", org: "MPSC" },
  { state: "West Bengal", state_code: "WB", language: "Bengali", query: "WBPSC West Bengal recruitment 2026 notification vacancies", org: "WBPSC" },
  { state: "Gujarat", state_code: "GJ", language: "Gujarati", query: "GPSC Gujarat recruitment 2026 notification vacancies", org: "GPSC" },
  { state: "Andhra Pradesh", state_code: "AP", language: "Telugu", query: "APPSC Andhra Pradesh recruitment 2026 notification vacancies", org: "APPSC" },
  { state: "Telangana", state_code: "TG", language: "Telugu", query: "TSPSC Telangana recruitment 2026 notification vacancies", org: "TSPSC" },
  { state: "Odisha", state_code: "OD", language: "Odia", query: "OPSC Odisha recruitment 2026 notification vacancies", org: "OPSC" },
  { state: "Punjab", state_code: "PB", language: "Punjabi", query: "PPSC Punjab recruitment 2026 notification vacancies", org: "PPSC" },
  { state: "Assam", state_code: "AS", language: "Assamese", query: "APSC Assam recruitment 2026 notification vacancies", org: "APSC" },
  { state: "Jharkhand", state_code: "JH", language: "Hindi", query: "JPSC Jharkhand recruitment 2026 notification vacancies", org: "JPSC" },
  { state: "Chhattisgarh", state_code: "CG", language: "Hindi", query: "CGPSC Chhattisgarh recruitment 2026 notification vacancies", org: "CGPSC" },
  { state: "Haryana", state_code: "HR", language: "Hindi", query: "HSSC Haryana recruitment 2026 notification vacancies", org: "HSSC" },
  { state: "Delhi", state_code: "DL", language: "Hindi", query: "DSSSB Delhi recruitment 2026 notification vacancies", org: "DSSSB" },
  { state: "Goa", state_code: "GA", language: "Konkani", query: "GPSC Goa recruitment 2026 notification vacancies", org: "GPSC Goa" },
  { state: "Himachal Pradesh", state_code: "HP", language: "Hindi", query: "HPPSC Himachal Pradesh recruitment 2026 vacancies", org: "HPPSC" },
  { state: "Uttarakhand", state_code: "UK", language: "Hindi", query: "UKPSC Uttarakhand recruitment 2026 notification vacancies", org: "UKPSC" },
  { state: "Jammu & Kashmir", state_code: "JK", language: "Urdu", query: "JKPSC JKSSB recruitment 2026 notification vacancies", org: "JKPSC" },
];

async function searchSerper(query) {
  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query, num: 5 }),
    });
    const data = await response.json();
    return data.organic || [];
  } catch (error) {
    return [];
  }
}

async function extractWithClaude(results, state, org) {
  if (results.length === 0) return null;

  const resultsText = results.map(r =>
    'Title: ' + r.title + '\nURL: ' + r.link + '\nSnippet: ' + r.snippet
  ).join('\n\n');

  const prompt = `Extract state government job notification data from these search results for ${state}.

Search results:
${resultsText}

Return ONLY a JSON object or null if no relevant 2026 notification found:
{
  "found": true,
  "title": "exact notification title in English",
  "title_local": "title in local language if available",
  "org": "${org}",
  "org_local": "organization name in local language",
  "vacancies": "exact number only, not TBA",
  "last_date": "exact date only, not TBA",
  "exam_date": "exam date if mentioned",
  "salary": "salary if mentioned",
  "apply_link": "direct apply URL",
  "description": "2-3 sentence summary",
  "description_local": "summary in local language if available",
  "category": "State PSC"
}

Return null if no real 2026 notification with actual vacancy numbers found. Return ONLY JSON.`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].text.trim();
    if (text === 'null') return null;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = { searched: 0, found: 0, saved: 0, skipped: 0, errors: 0, details: [] };

  for (const query of stateSearchQueries) {
    try {
      const searchResults = await searchSerper(query.query);
      results.searched++;

      const extracted = await extractWithClaude(searchResults, query.state, query.org);

      if (extracted && extracted.found) {
        results.found++;

        if (!extracted.vacancies || extracted.vacancies === 'TBA' || extracted.vacancies === null) {
          results.skipped++;
          results.details.push({ status: 'skipped', reason: 'no vacancy data', title: extracted.title });
          continue;
        }

        if (!extracted.last_date || extracted.last_date === 'TBA' || extracted.last_date === null) {
          results.skipped++;
          results.details.push({ status: 'skipped', reason: 'no last date', title: extracted.title });
          continue;
        }

        const slug = extracted.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 80) + '-' + query.state_code.toLowerCase();

        const existing = await pool.query('SELECT id FROM state_jobs WHERE slug = $1', [slug]);
        if (existing.rows.length > 0) {
          results.skipped++;
          results.details.push({ status: 'skipped', reason: 'already exists', title: extracted.title });
          continue;
        }

        await pool.query(
          `INSERT INTO state_jobs (title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, description, description_local, apply_link, category, slug, is_new, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, true, true)`,
          [
            extracted.title,
            extracted.title_local || extracted.title,
            extracted.org,
            extracted.org_local || extracted.org,
            query.state,
            query.state_code,
            query.language,
            extracted.vacancies,
            extracted.last_date,
            extracted.exam_date || '',
            extracted.salary || '',
            extracted.description || '',
            extracted.description_local || '',
            extracted.apply_link || '',
            extracted.category || 'State PSC',
            slug,
          ]
        );

        results.saved++;
        results.details.push({ status: 'saved', state: query.state, title: extracted.title });
      }

      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      results.errors++;
    }
  }

  return Response.json({ success: true, timestamp: new Date().toISOString(), results });
}