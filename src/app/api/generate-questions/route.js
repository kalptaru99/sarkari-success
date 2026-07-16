import Anthropic from "@anthropic-ai/sdk";
import pool from '@/lib/db.js';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { exam, topic, count } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Generate ${count || 10} multiple choice questions for ${exam} exam on the topic of ${topic}.

Return ONLY a JSON array with no other text, in this exact format:
[
  {
    "question": "question text here",
    "option_a": "first option",
    "option_b": "second option", 
    "option_c": "third option",
    "option_d": "fourth option",
    "correct_answer": "A",
    "explanation": "explanation why this is correct",
    "difficulty": "easy"
  }
]

Rules:
- correct_answer must be exactly A, B, C, or D
- difficulty must be easy, medium, or hard
- Questions must be relevant to ${exam} syllabus
- Make questions realistic and exam-standard
- Return only the JSON array, nothing else`
        }
      ]
    });

    const text = response.content[0].text.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(clean);

    let inserted = 0;
    for (const q of questions) {
      await pool.query(
        `INSERT INTO questions (exam, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT DO NOTHING`,
        [exam, topic, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.explanation, q.difficulty]
      );
      inserted++;
    }

    return Response.json({ 
      success: true, 
      generated: questions.length,
      inserted,
      message: `Successfully generated ${inserted} questions for ${exam} - ${topic}`
    });

  } catch (error) {
    console.error('Generate error:', error);
    return Response.json({ error: 'Something went wrong: ' + error.message }, { status: 500 });
  }
}