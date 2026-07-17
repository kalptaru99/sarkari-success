import Anthropic from "@anthropic-ai/sdk";
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

  if (data.count >= maxRequests) {
    return false;
  }

  data.count++;
  return true;
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
      `Title: ${r.title}\nSnippet: ${r.snippet}\nLink: ${r.link}`
    ).join("\n\n");
    return results || "No search results found.";
  } catch (error) {
    return "Search unavailable.";
  }
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(ip)) {
      return Response.json({ error: 'Too many requests. Please wait a minute before trying again.' }, { status: 429 });
    }
    const { message, history } = await request.json();

    const searchResults = await searchWeb(message);

    const messages = [
      ...history,
      { 
        role: "user", 
        content: `Student Question: ${message}

Latest Web Search Results (use these for current 2026 information):
${searchResults}

Answer the student's question using both your knowledge and the above search results. Prioritize recent information from search results.`
      }
    ];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are SarkariGPT, an expert AI career guide for Indian government job aspirants on Sarkari Success website.

EXAMS YOU COVER:
SSC - CGL, CHSL, MTS, CPO, JE, GD Constable, Stenographer
Railway - RRB NTPC, Group D, ALP, JE, RPF
UPSC - Civil Services IAS IPS IFS, CDS, NDA, CAPF
Banking - IBPS PO, IBPS Clerk, IBPS RRB, SBI PO, SBI Clerk, RBI Grade B
Defence - Agniveer Army Navy Airforce, NDA, CDS, AFCAT
Teaching - CTET, DSSSB, KVS, NVS, State TET
Police - Delhi Police, SSC GD, CRPF, BSF, CISF
State PSC - BPSC, UPPSC, MPSC, RPSC, TNPSC and all state PSCs

HOW TO RESPOND:
Write in clear simple English or Hindi depending on what the student uses
Use short paragraphs with blank lines between them
Use plain text only, no asterisks, no hashtags, no special characters
Write important words in CAPITALS instead of bold
Give complete information including eligibility, syllabus, exam pattern, salary, vacancies, dates
Always include latest 2025 and 2026 updates from search results
End every response with the official website link
Be encouraging and motivating

RULES:
Never use asterisks or hashtags or special symbols
Use numbered lists like 1. 2. 3. when listing items
Always give salary in both pay scale and in hand amount
Always mention negative marking if applicable
Always mention age relaxation for SC ST OBC PwD categories
Use search results to give real-time accurate information`,
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