import Anthropic from "@anthropic-ai/sdk";
import pkg from 'pg';
const { Pool } = pkg;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const stateExams = [
  { state: "Bihar", state_code: "BR", language: "Hindi", exam: "BPSC TRE 4.0 2026", org: "Bihar Public Service Commission", org_local: "बिहार लोक सेवा आयोग" },
  { state: "Bihar", state_code: "BR", language: "Hindi", exam: "Bihar Police Constable 2026", org: "Central Selection Board of Constables Bihar", org_local: "बिहार केंद्रीय चयन पर्षद" },
  { state: "Uttar Pradesh", state_code: "UP", language: "Hindi", exam: "UP Police Constable 2026", org: "Uttar Pradesh Police Recruitment Board", org_local: "उत्तर प्रदेश पुलिस भर्ती बोर्ड" },
  { state: "Uttar Pradesh", state_code: "UP", language: "Hindi", exam: "UPSESSB TGT PGT 2026", org: "Uttar Pradesh Secondary Education Service Selection Board", org_local: "उत्तर प्रदेश माध्यमिक शिक्षा सेवा चयन बोर्ड" },
  { state: "Rajasthan", state_code: "RJ", language: "Hindi", exam: "RPSC RAS 2026", org: "Rajasthan Public Service Commission", org_local: "राजस्थान लोक सेवा आयोग" },
  { state: "Rajasthan", state_code: "RJ", language: "Hindi", exam: "Rajasthan Police Constable 2026", org: "Rajasthan Police", org_local: "राजस्थान पुलिस" },
  { state: "Madhya Pradesh", state_code: "MP", language: "Hindi", exam: "MPPSC 2026", org: "Madhya Pradesh Public Service Commission", org_local: "मध्यप्रदेश लोक सेवा आयोग" },
  { state: "Madhya Pradesh", state_code: "MP", language: "Hindi", exam: "MP Police Constable 2026", org: "Madhya Pradesh Police", org_local: "मध्यप्रदेश पुलिस" },
  { state: "Tamil Nadu", state_code: "TN", language: "Tamil", exam: "TNPSC Group 2 2026", org: "Tamil Nadu Public Service Commission", org_local: "தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம்" },
  { state: "Tamil Nadu", state_code: "TN", language: "Tamil", exam: "TNPSC Group 4 2026", org: "Tamil Nadu Public Service Commission", org_local: "தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம்" },
  { state: "Andhra Pradesh", state_code: "AP", language: "Telugu", exam: "APPSC Group 2 2026", org: "Andhra Pradesh Public Service Commission", org_local: "ఆంధ్రప్రదేశ్ పబ్లిక్ సర్వీస్ కమిషన్" },
  { state: "Telangana", state_code: "TS", language: "Telugu", exam: "TSPSC Group 2 2026", org: "Telangana State Public Service Commission", org_local: "తెలంగాణ రాష్ట్ర పబ్లిక్ సర్వీస్ కమిషన్" },
  { state: "Kerala", state_code: "KL", language: "Malayalam", exam: "Kerala PSC LD Clerk 2026", org: "Kerala Public Service Commission", org_local: "കേരള പബ്ലിക് സർവീസ് കമ്മീഷൻ" },
  { state: "Karnataka", state_code: "KA", language: "Kannada", exam: "KPSC Group C 2026", org: "Karnataka Public Service Commission", org_local: "ಕರ್ನಾಟಕ ಲೋಕಸೇವಾ ಆಯೋಗ" },
  { state: "Maharashtra", state_code: "MH", language: "Marathi", exam: "MPSC State Service 2026", org: "Maharashtra Public Service Commission", org_local: "महाराष्ट्र लोकसेवा आयोग" },
  { state: "West Bengal", state_code: "WB", language: "Bengali", exam: "WBPSC Clerkship 2026", org: "West Bengal Public Service Commission", org_local: "পশ্চিমবঙ্গ পাবলিক সার্ভিস কমিশন" },
  { state: "Gujarat", state_code: "GJ", language: "Gujarati", exam: "GPSC Class 1 2 2026", org: "Gujarat Public Service Commission", org_local: "ગુજરાત જાહેર સેવા આયોગ" },
  { state: "Odisha", state_code: "OD", language: "Odia", exam: "OPSC OAS 2026", org: "Odisha Public Service Commission", org_local: "ଓଡ଼ିଶା ଲୋକ ସେବା ଆୟୋଗ" },
  { state: "Punjab", state_code: "PB", language: "Punjabi", exam: "PPSC PCS 2026", org: "Punjab Public Service Commission", org_local: "ਪੰਜਾਬ ਲੋਕ ਸੇਵਾ ਕਮਿਸ਼ਨ" },
  { state: "Assam", state_code: "AS", language: "Assamese", exam: "APSC CCE 2026", org: "Assam Public Service Commission", org_local: "অসম লোক সেৱা আয়োগ" },
  { state: "Jharkhand", state_code: "JH", language: "Hindi", exam: "JPSC PCS 2026", org: "Jharkhand Public Service Commission", org_local: "झारखंड लोक सेवा आयोग" },
  { state: "Haryana", state_code: "HR", language: "Hindi", exam: "HSSC CET 2026", org: "Haryana Staff Selection Commission", org_local: "हरियाणा कर्मचारी चयन आयोग" },
  { state: "Uttarakhand", state_code: "UK", language: "Hindi", exam: "UKPSC PCS 2026", org: "Uttarakhand Public Service Commission", org_local: "उत्तराखंड लोक सेवा आयोग" },
  { state: "Himachal Pradesh", state_code: "HP", language: "Hindi", exam: "HPPSC HAS 2026", org: "Himachal Pradesh Public Service Commission", org_local: "हिमाचल प्रदेश लोक सेवा आयोग" },
  { state: "Chhattisgarh", state_code: "CG", language: "Hindi", exam: "CGPSC State Service 2026", org: "Chhattisgarh Public Service Commission", org_local: "छत्तीसगढ़ लोक सेवा आयोग" },
];

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function generateStateJob(examInfo) {
  console.log(`Generating: ${examInfo.state} — ${examInfo.exam}`);

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{
        role: "user",
        content: `Generate accurate job notification data for: ${examInfo.exam} in ${examInfo.state}.

Use only real, verified information. If exact figures are not known, use "Check official website" for that field.

Return ONLY a JSON object, no other text:
{
  "title": "full job title in English",
  "title_local": "job title in ${examInfo.language}",
  "vacancies": "number or approximate or TBA",
  "last_date": "application last date or Closed or TBA",
  "exam_date": "exam date or expected month/year",
  "salary": "pay scale and approximate in-hand salary",
  "eligibility": "eligibility in one sentence",
  "eligibility_local": "eligibility in ${examInfo.language}",
  "description": "2-3 sentence description in English with key facts",
  "description_local": "same description in ${examInfo.language}",
  "apply_link": "official website URL",
  "category": "State PSC or State Police or State TET or State SSC"
}

Be accurate. Use TBA if information is not available. Do not make up numbers.`
      }]
    });

    const text = response.content[0].text.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(clean);

    const slug = generateSlug(`${examInfo.exam}-${examInfo.state}`);

    await pool.query(
      `INSERT INTO state_jobs (title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, category, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       ON CONFLICT (slug) DO NOTHING`,
      [data.title, data.title_local, examInfo.org, examInfo.org_local, examInfo.state, examInfo.state_code, examInfo.language, data.vacancies, data.last_date, data.exam_date, data.salary, data.eligibility, data.eligibility_local, data.description, data.description_local, data.apply_link, data.category, slug]
    );

    console.log(`✅ Done: ${examInfo.state} — ${examInfo.exam}`);
    await new Promise(r => setTimeout(r, 2000));

  } catch (error) {
    console.error(`❌ Error: ${examInfo.state} — ${examInfo.exam}:`, error.message);
  }
}

async function generateAll() {
  console.log('Generating state jobs for all exams...\n');
  for (const examInfo of stateExams) {
    await generateStateJob(examInfo);
  }
  console.log('\nAll state jobs generated!');
  await pool.end();
  process.exit(0);
}

generateAll();