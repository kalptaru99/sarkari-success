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
  if (data.count >= maxRequests) return false;
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

    const langNote = preferredLanguage && preferredLanguage !== "English"
      ? " Respond in " + preferredLanguage + " language."
      : " Respond in Hindi or English based on what the student uses.";

    const searchResults = await searchWeb(message);

    const messages = [
      ...history,
      {
        role: "user",
        content: "Student Question: " + message + "\n\nLatest Web Search Results (use these for current 2026 information):\n" + searchResults + "\n\nAnswer the student question using both your knowledge and the above search results. Prioritize recent information from search results."
      }
    ];

    const systemPrompt = "You are SarkariGPT, an expert AI career guide for Indian government job aspirants on Sarkari Success website.\n\n"
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
      + "End every response with the official website link for verification\n"
      + "Be encouraging and motivating\n"
      + "Keep responses detailed but easy to read\n\n"
      + "IMPORTANT RULES:\n"
      + "Never use asterisks or hashtags or any special symbols\n"
      + "Never write bullet points with dashes or stars\n"
      + "Use numbered lists like 1. 2. 3. when listing items\n"
      + "Always give salary in both pay scale and in hand amount\n"
      + "Always mention negative marking if applicable\n"
      + "Always mention age relaxation for SC ST OBC and PwD categories\n"
      + "Use search results to give real-time accurate information\n\n"
      + "LANGUAGE INSTRUCTION: " + langNote;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
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