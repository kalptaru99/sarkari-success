const fs = require("fs");
const code = `import pool from "@/lib/db.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit")) || 20;
    if (slug) {
      const result = await pool.query("SELECT * FROM state_jobs WHERE slug = $1 AND is_active = true", [slug]);
      if (result.rows.length === 0) return Response.json({ error: "Job not found" }, { status: 404 });
      return Response.json({ job: result.rows[0] });
    }
    if (state) {
      const result = await pool.query("SELECT * FROM state_jobs WHERE state_code = $1 AND is_active = true ORDER BY created_at DESC LIMIT $2", [state.toUpperCase(), limit]);
      return Response.json({ jobs: result.rows });
    }
    const result = await pool.query("SELECT * FROM state_jobs WHERE is_active = true ORDER BY created_at DESC LIMIT $1", [limit]);
    return Response.json({ jobs: result.rows });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, category, slug } = await request.json();
    if (!title || !org || !state || !slug) return Response.json({ error: "Required fields missing" }, { status: 400 });
    const result = await pool.query("INSERT INTO state_jobs (title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, category, slug) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *", [title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, category, slug]);
    return Response.json({ success: true, job: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") return Response.json({ error: "Slug exists" }, { status: 400 });
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, title, title_local, org, org_local, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, is_new, is_active } = await request.json();
    if (!id) return Response.json({ error: "ID required" }, { status: 400 });
    await pool.query("UPDATE state_jobs SET title=$1, title_local=$2, org=$3, org_local=$4, vacancies=$5, last_date=$6, exam_date=$7, salary=$8, eligibility=$9, eligibility_local=$10, description=$11, description_local=$12, apply_link=$13, notification_link=$14, is_new=$15, is_active=$16 WHERE id=$17", [title, title_local, org, org_local, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, is_new, is_active, id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}`;
fs.writeFileSync("src/app/api/state-jobs/route.js", code);
console.log("done");