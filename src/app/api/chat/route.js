import Anthropic from "@anthropic-ai/sdk";
import pool from "@/lib/db.js";

const rateLimitMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  const data = rateLimitMap.get(ip);
  if (now - data.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (data.count >= maxRequests) return false;
  data.count++;
  return true;
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SITE_URL = 'https://sarkarisuccess.com';

/**
 * Detect if the question is about current/open jobs and fetch live DB data.
 * Returns structured rows with slugs so the LLM can cite job page URLs.
 */
async function fetchLiveJobs(message) {
  const jobKeywords = /open|current|latest|new|apply|vacancy|vacancies|abhi|available|kab|last date|deadline|notification|2026|filling|form/i;
  if (!jobKeywords.test(message)) return null;

  try {
    const orgMap = {
      sbi: 'SBI', rbi: 'RBI', rrb: 'RRB', railway: 'RRB',
      ssc: 'SSC', upsc: 'UPSC', ibps: 'IBPS', drdo: 'DRDO',
      isro: 'ISRO', hal: 'HAL', army: 'Indian Army', uppsc: 'UPPSC',
      kpsc: 'KPSC', tnpsc: 'TNPSC', rpsc: 'RPSC', wbpsc: 'WBPSC',
      'kerala psc': 'Kerala PSC', mppsc: 'MPPSC', gpsc: 'GPSC',
    };
    const lowerMsg = message.toLowerCase();
    const matchedOrg = Object.entries(orgMap).find(([k]) => lowerMsg.includes(k));

    let rows;
    if (matchedOrg) {
      const result = await pool.query(
        `SELECT title, org, vacancies, last_date, lifecycle_status, apply_link, slug, eligibility, age_limit
         FROM jobs
         WHERE is_active = TRUE
           AND (is_duplicate = FALSE OR is_duplicate IS NULL)
           AND LOWER(org) LIKE $1
           AND (lifecycle_status != 'CLOSED' OR lifecycle_status IS NULL)
         ORDER BY created_at DESC LIMIT 5`,
        [`%${matchedOrg[1].toLowerCase()}%`]
      );
      rows = result.rows;
    } else {
      const result = await pool.query(
        `SELECT title, org, vacancies, last_date, lifecycle_status, apply_link, slug, eligibility, age_limit
         FROM jobs
         WHERE is_active = TRUE
           AND (is_duplicate = FALSE OR is_duplicate IS NULL)
           AND lifecycle_status IN ('NEW', 'OPEN', 'CLOSING_SOON')
         ORDER BY
           CASE lifecycle_status WHEN 'CLOSING_SOON' THEN 0 WHEN 'NEW' THEN 1 ELSE 2 END,
           created_at DESC
         LIMIT 10`
      );
      rows = result.rows;
    }

    if (!rows || rows.length === 0) return null;

    const lines = rows.map(r => {
      const statusEmoji = { NEW: '🟢', OPEN: '🔵', CLOSING_SOON: '🟡⚡' }[r.lifecycle_status] || '🔵';
      const pageUrl = r.slug ? `${SITE_URL}/jobs/${r.slug}` : SITE_URL;
      const parts = [
        `${statusEmoji} ${r.title}`,
        `Org: ${r.org}`,
        r.vacancies ? `Vacancies: ${r.vacancies}` : 'Vacancies: Check notification',
        r.last_date ? `Last Date: ${r.last_date}` : 'Last Date: Check notification',
        r.age_limit ? `Age Limit: ${r.age_limit}` : null,
        r.eligibility ? `Eligibility: ${r.eligibility}` : null,
        `Page: ${pageUrl}`,
      ].filter(Boolean);
      return parts.join(' | ');
    });

    return [
      '=== VERIFIED LIVE DATA FROM SARKARISUCCESS.COM DATABASE ===',
      'These facts are verified. Cite the Page URL when mentioning each job.',
      ...lines,
      '=== END VERIFIED DATA ===',
    ].join('\n');
  } catch (err) {
    console.error('Live DB fetch error:', err);
    return null;
  }
}

/**
 * Check if question asks about specific job facts we might not have verified.
 * Returns a refusal hint if the question is high-risk and no DB data found.
 */
function buildRefusalHint(liveJobs, message) {
  const highRiskTerms = /fee|application fee|fees|syllabus|cut.?off|cutoff|result date|answer key/i;
  if (!highRiskTerms.test(message)) return null;
  if (liveJobs) return null; // We have DB data — proceed, just note unverified fields
  return 'REFUSAL NOTE: The user is asking about application fees, syllabus, or cut-offs. These are NOT in our verified database. Do NOT invent specific numbers. Instead tell the user to check the official notification and link them to the official website. You may give general historical context but must clearly say the exact figure needs verification.';
}

async function searchWeb(query) {
  try {
    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query + " 2026", num: 5 }),
    });
    const data = await response.json();
    const results = data.organic?.slice(0, 5).map(r =>
      "Title: " + r.title + "\nSnippet: " + r.snippet + "\nLink: " + r.link
    ).join("\n\n");
    return results || "No search results found.";
  } catch (error) {
    return "Search unavailable.";
  }
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!rateLimit(ip)) {
      return Response.json({ error: "Too many requests. Please wait a minute before trying again." }, { status: 429 });
    }

    const { message, history, preferredLanguage } = await request.json();

    const langNote = preferredLanguage === 'auto'
      ? " Detect the language the student is using and respond in the SAME language. If they write or speak in Tamil respond in Tamil. If Hindi respond in Hindi. If Telugu respond in Telugu. If Malayalam respond in Malayalam. Match their language exactly."
      : preferredLanguage && preferredLanguage !== "English"
      ? " Respond in " + preferredLanguage + " language."
      : " Respond in Hindi or English based on what the student uses.";
      

    const [searchResults, liveJobs] = await Promise.all([
      searchWeb(message),
      fetchLiveJobs(message),
    ]);

    const refusalHint = buildRefusalHint(liveJobs, message);

    let contextBlock = "Latest Web Search Results (use for general exam info, syllabus, pattern):\n" + searchResults;
    if (liveJobs) {
      contextBlock = liveJobs + "\n\n" + contextBlock;
    }
    if (refusalHint) {
      contextBlock += "\n\n" + refusalHint;
    }

    const citationInstruction = liveJobs
      ? "For each job you mention from the VERIFIED LIVE DATA, include its Page URL as a citation at the end of that sentence or paragraph, formatted exactly as: [View full details: <URL>]. Do not invent URLs — only cite the Page URLs given in the live data above."
      : "If you mention any specific job, add: 'Verify current details at sarkarisuccess.com or the official website.'";

    const messages = [
      ...history,
      {
        role: "user",
        content: `Student Question: ${message}\n\n${contextBlock}\n\nINSTRUCTIONS: Answer using verified live database data first (highest accuracy). For any vacancy count, last date, or fee amount NOT in the verified data, say \"verify from official notification\" instead of guessing. ${citationInstruction}`
      }
    ];

    const systemPrompt = "You are SarkariGPT, an expert AI career guide for Indian government job aspirants on Sarkari Success website (sarkarisuccess.com).\n\n"
      + "EXAMS YOU COVER:\n"
      + "SSC - CGL, CHSL, MTS, CPO, JE, GD Constable, Stenographer\n"
      + "Railway - RRB NTPC, Group D, ALP, JE, RPF\n"
      + "UPSC - Civil Services IAS IPS IFS, CDS, NDA, CAPF\n"
      + "Banking - IBPS PO, IBPS Clerk, IBPS RRB, SBI PO, SBI Clerk, RBI Grade B, RBI Assistant, NABARD\n"
      + "Defence - Agniveer Army Navy Airforce, NDA, CDS, AFCAT\n"
      + "Teaching - CTET, DSSSB, KVS, NVS, State TET\n"
      + "Police - Delhi Police, SSC GD, CRPF, BSF, CISF, ITBP\n"
      + "State PSC - BPSC, UPPSC, MPSC, MPPSC, RPSC, TNPSC, KPSC and all other state PSCs\n"
      + "Others - LIC AAO, LIC HFL, FCI, EPFO, Coal India, SAIL, BHEL, DRDO, ISRO\n\n"
      + "HOW TO RESPOND:\n"
      + "Write in clear simple English or Hindi depending on what the student uses\n"
      + "Use short paragraphs with blank lines between them for readability\n"
      + "Use plain text only, no asterisks, no hashtags, no special characters, no markdown formatting\n"
      + "Write important words in CAPITALS instead of bold\n"
      + "Give complete practical information including eligibility, syllabus, exam pattern, salary, vacancies, important dates\n"
      + "Always include the latest 2025 and 2026 updates from search results\n"
      + "Be encouraging and motivating\n"
      + "Keep responses detailed but easy to read\n\n"
      + "CITATION RULES (follow exactly):\n"
      + "When you mention a specific job that has a Page URL in the VERIFIED LIVE DATA, always end that paragraph with the URL in this exact format: [View full details: <URL>]\n"
      + "Example: SBI PO 2026 has 600 vacancies, last date 30 November 2026. [View full details: https://sarkarisuccess.com/jobs/sbi-po-2026]\n"
      + "Never invent a sarkarisuccess.com URL — only use URLs explicitly given in the live data context\n"
      + "For exam info NOT from live data, end with: Check official website for latest updates.\n\n"
      + "ACCURACY AND REFUSAL RULES (critical):\n"
      + "1. VACANCIES and LAST DATE: State these only from VERIFIED LIVE DATA. If not in live data, say 'vacancy count not verified — check official notification'\n"
      + "2. APPLICATION FEE: NEVER state a specific fee amount unless it appears in the live data. Always say 'check the official notification for exact fee — it changes each year'\n"
      + "3. CUT-OFF MARKS: These change every year. Give HISTORICAL ranges from web search but always say 'this year cut-off will vary — these are previous year figures'\n"
      + "4. RESULT DATE: Only state if in live data. Otherwise say 'result date not yet announced — check official website'\n"
      + "5. SALARY: Verified salaries from live data can be stated. For others, give pay scale range and note it is indicative\n"
      + "6. SYLLABUS: Safe to describe from web search — this is stable information\n\n"
      + "IMPORTANT FORMATTING RULES:\n"
      + "Never use asterisks or hashtags or any special symbols\n"
      + "Never write bullet points with dashes or stars\n"
      + "Use numbered lists like 1. 2. 3. when listing items\n"
      + "Always give salary in both pay scale and in hand amount\n"
      + "Always mention negative marking if applicable\n"
      + "Always mention age relaxation for SC ST OBC and PwD categories\n\n"
      + "LANGUAGE INSTRUCTION: " + langNote;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      messages,
    });

    return Response.json({
      reply: response.content[0].text,
    });

  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}