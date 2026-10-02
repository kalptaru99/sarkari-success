import pool from '@/lib/db.js';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const jobId = searchParams.get('id');

  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get jobs without SEO content
    let query = `SELECT * FROM jobs WHERE seo_content IS NULL ORDER BY created_at DESC LIMIT 5`;
    if (jobId) query = `SELECT * FROM jobs WHERE id = ${jobId}`;
    
    const result = await pool.query(query);
    const jobs = result.rows;

    if (jobs.length === 0) return Response.json({ message: 'All jobs have SEO content' });

    const generated = [];

    for (const job of jobs) {
      try {
        const prompt = `You are an SEO/AEO content expert for Sarkari Success, India's #1 AI-powered government jobs portal.

Generate rich, factual SEO content for this government job notification. Use ONLY the data provided — never invent details.

JOB DATA:
Title: ${job.title}
Organization: ${job.org}
Vacancies: ${job.vacancies}
Last Date: ${job.last_date}
Exam Date: ${job.exam_date || 'Not announced'}
Salary: ${job.salary || 'As per rules'}
Eligibility: ${job.eligibility || 'Check notification'}
Category: ${job.category}
Description: ${job.description || ''}

Return a JSON object with these exact fields:
{
  "seo_title": "SEO-optimized title under 60 chars with year",
  "seo_description": "Meta description under 155 chars with key details",
  "intro": "2-3 sentence introduction about this recruitment",
  "important_dates": "Key dates in bullet points",
  "vacancy_details": "Vacancy breakdown if available",
  "eligibility_summary": "Clear eligibility in 2-3 points",
  "age_limit": "Age limit details",
  "application_fee": "Fee details if available",
  "selection_process": "Selection stages",
  "salary_details": "Salary/pay scale details",
  "how_to_apply": "Step by step application process",
  "faq": [
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"},
    {"q": "question", "a": "answer"}
  ]
}

Return ONLY valid JSON. No markdown, no explanation.`;

        const response = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1500,
          messages: [{ role: 'user', content: prompt }],
        });

        const content = response.content[0].text.trim();
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) continue;

        const seoData = JSON.parse(jsonMatch[0]);

        await pool.query(
          `UPDATE jobs SET seo_title = $1, seo_description = $2, seo_content = $3 WHERE id = $4`,
          [seoData.seo_title, seoData.seo_description, JSON.stringify(seoData), job.id]
        );

        generated.push({ id: job.id, title: job.title });
      } catch (e) {
        console.error('Error generating content for job:', job.id, e);
      }
    }

    return Response.json({ success: true, generated });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}