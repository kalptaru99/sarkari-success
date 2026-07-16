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

const examTopics = {
  "SSC CGL": ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
  "SSC CHSL": ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
  "RRB NTPC": ["Mathematics", "General Intelligence", "General Awareness", "English Language"],
  "RRB Group D": ["Mathematics", "General Intelligence", "General Science", "General Awareness"],
  "UPSC Civil Services": ["History", "Geography", "Polity", "Economy", "Current Affairs"],
  "IBPS PO": ["Reasoning", "English Language", "Quantitative Aptitude", "General Awareness"],
  "IBPS Clerk": ["Reasoning", "English Language", "Numerical Ability", "General Awareness"],
  "SBI PO": ["Reasoning", "English Language", "Data Analysis", "General Awareness"],
};

async function generateQuestions(exam, topic) {
  try {
    console.log(`Generating: ${exam} — ${topic}`);

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{
        role: "user",
        content: `Generate 10 multiple choice questions for ${exam} exam on topic: ${topic}.

Return ONLY a JSON array, no other text:
[
  {
    "question": "question text",
    "option_a": "option A",
    "option_b": "option B",
    "option_c": "option C",
    "option_d": "option D",
    "correct_answer": "A",
    "explanation": "why this is correct",
    "difficulty": "medium"
  }
]

Rules:
- correct_answer must be exactly A, B, C, or D
- difficulty must be easy, medium, or hard
- Return only the JSON array, nothing else`
      }]
    });

    const text = response.content[0].text.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(clean);

    for (const q of questions) {
      await pool.query(
        `INSERT INTO questions (exam, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [exam, topic, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.explanation, q.difficulty]
      );
    }

    console.log(`✅ Done: ${exam} — ${topic} (${questions.length} questions)`);
    await new Promise(r => setTimeout(r, 2000));

  } catch (error) {
    console.error(`❌ Error: ${exam} — ${topic}:`, error.message);
  }
}

async function generateAll() {
  console.log('Starting question generation for all exams...\n');

  for (const [exam, topics] of Object.entries(examTopics)) {
    for (const topic of topics) {
      await generateQuestions(exam, topic);
    }
  }

  console.log('\n✅ All questions generated successfully!');
  await pool.end();
  process.exit(0);
}

generateAll();