import Anthropic from "@anthropic-ai/sdk";
import pool from '@/lib/db.js';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const questionPlan = {
  "Maths": {
    exams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "IBPS PO", "Bank Clerk"],
    topic: "Quantitative Aptitude",
    chapters: [
      { id: "Percentage", count: 40 },
      { id: "Profit & Loss", count: 35 },
      { id: "Ratio & Proportion", count: 28 },
      { id: "Time & Work", count: 33 },
      { id: "Time Speed & Distance", count: 38 },
      { id: "Simple & Compound Interest", count: 22 },
      { id: "Average", count: 25 },
      { id: "Partnership", count: 17 },
      { id: "Number System", count: 30 },
      { id: "Algebra", count: 35 },
      { id: "Geometry", count: 42 },
      { id: "Trigonometry", count: 28 },
      { id: "Mensuration", count: 33 },
      { id: "Data Interpretation", count: 50 },
    ]
  },
  "English": {
    exams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "IBPS PO", "Bank Clerk"],
    topic: "English Language",
    chapters: [
      { id: "Reading Comprehension", count: 57 },
      { id: "Error Detection", count: 48 },
      { id: "Sentence Improvement", count: 39 },
      { id: "Cloze Test", count: 29 },
      { id: "Para Jumbles", count: 24 },
      { id: "Vocabulary", count: 62 },
      { id: "Idioms & Phrases", count: 20 },
      { id: "Spelling Error", count: 27 },
    ]
  },
  "Reasoning": {
    exams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "IBPS PO", "Bank Clerk"],
    topic: "General Intelligence",
    chapters: [
      { id: "Analogy", count: 36 },
      { id: "Blood Relation", count: 30 },
      { id: "Syllogism", count: 40 },
      { id: "Coding-Decoding", count: 34 },
      { id: "Direction Sense", count: 24 },
      { id: "Puzzle & Seating", count: 82 },
      { id: "Inequality", count: 23 },
      { id: "Series", count: 42 },
      { id: "Non-Verbal", count: 28 },
      { id: "Classification", count: 20 },
      { id: "Statement & Assumption", count: 24 },
      { id: "Calendar & Clock", count: 17 },
    ]
  },
  "GK": {
    exams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "IBPS PO", "Bank Clerk"],
    topic: "General Awareness",
    chapters: [
      { id: "History", count: 54 },
      { id: "Geography", count: 46 },
      { id: "Polity", count: 50 },
      { id: "Economics", count: 34 },
      { id: "Science & Tech", count: 43 },
      { id: "Awards & Honours", count: 18 },
      { id: "Books & Authors", count: 14 },
      { id: "Sports", count: 21 },
    ]
  }
};

async function generateChapterQuestions(exam, topic, chapter, count) {
  const prompt = `You are an expert question paper setter for Indian government exams with 20 years experience.

Generate ${count} high-quality multiple choice questions for ${exam} exam.
Subject: ${topic}
Chapter: ${chapter}

Requirements:
- Questions must follow the EXACT pattern of last 20 years ${exam} question papers
- Include the most repeated and important question types from last 5 years
- Questions should be of mixed difficulty (60% medium, 25% hard, 15% easy)
- Each question must have exactly 4 options with only one correct answer
- Explanations must be detailed and educational
- Questions must be unique and not repetitive

Return ONLY a valid JSON array, no other text:
[
  {
    "question": "question text",
    "option_a": "option A",
    "option_b": "option B",
    "option_c": "option C", 
    "option_d": "option D",
    "correct_answer": "A",
    "explanation": "detailed explanation",
    "difficulty": "medium"
  }
]`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }]
  });

  const text = response.content[0].text.trim();
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array found');
  return JSON.parse(jsonMatch[0]);
}

export async function POST(request) {
  try {
    const { exam, topic, chapter, count } = await request.json();

    // Single chapter generation (existing feature)
    if (exam && topic && count && !request.url.includes('bulk')) {
      const questions = await generateChapterQuestions(exam, topic, chapter, count);
      let inserted = 0;
      for (const q of questions) {
        await pool.query(
          `INSERT INTO questions (exam, topic, chapter, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT DO NOTHING`,
          [exam, topic, chapter, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.explanation, q.difficulty]
        );
        inserted++;
      }
      return Response.json({ success: true, generated: questions.length, inserted });
    }

    return Response.json({ error: 'Invalid request' }, { status: 400 });

  } catch (error) {
    console.error('Generate error:', error);
    return Response.json({ error: 'Something went wrong: ' + error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const subject = searchParams.get('subject');
  const batchIndex = parseInt(searchParams.get('batch') || '0');

  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subjectPlan = questionPlan[subject];
  if (!subjectPlan) {
    return Response.json({ error: 'Invalid subject. Use: Maths, English, Reasoning, GK' }, { status: 400 });
  }

  const results = { subject, generated: 0, inserted: 0, errors: 0, details: [] };

  // Process one exam at a time per batch to avoid timeout
  const exam = subjectPlan.exams[batchIndex];
  if (!exam) {
    return Response.json({ success: true, message: 'All batches complete', results });
  }

  for (const chapter of subjectPlan.chapters) {
    try {
      const questions = await generateChapterQuestions(exam, subjectPlan.topic, chapter.id, chapter.count);
      results.generated += questions.length;

      for (const q of questions) {
        try {
          await pool.query(
            `INSERT INTO questions (exam, topic, chapter, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             ON CONFLICT DO NOTHING`,
            [exam, subjectPlan.topic, chapter.id, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.explanation, q.difficulty]
          );
          results.inserted++;
        } catch (e) {
          results.errors++;
        }
      }
      results.details.push({ exam, chapter: chapter.id, generated: questions.length });
    } catch (error) {
      results.errors++;
      results.details.push({ exam, chapter: chapter.id, error: error.message });
    }
  }

  return Response.json({ success: true, results, nextBatch: batchIndex + 1, totalBatches: subjectPlan.exams.length });
}