import pkg from 'pg';
const { Pool } = pkg;
import { getServerSession } from 'next-auth';
import { checkEligibility } from '@/lib/eligibility';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// GET /api/jobs/eligibility?slug=sbi-po-2026
export async function GET(request) {
  const session = await getServerSession();
  if (!session?.user?.email) return Response.json({ eligible: 'login_required' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return Response.json({ error: 'slug required' }, { status: 400 });

  // Fetch job
  const jobRes = await pool.query(
    'SELECT id, title, eligibility, age_limit, min_qualification FROM jobs WHERE slug = $1 AND is_active = TRUE',
    [slug]
  );
  if (!jobRes.rows.length) return Response.json({ error: 'Job not found' }, { status: 404 });
  const job = jobRes.rows[0];

  // Fetch candidate profile
  const profileRes = await pool.query(
    `SELECT cp.age, cp.education, cp.category, cp.state, cp.preferred_exams
     FROM candidate_profiles cp
     JOIN users u ON u.id = cp.user_id
     WHERE u.email = $1`,
    [session.user.email]
  );
  const profile = profileRes.rows[0] || null;

  if (!profile) {
    return Response.json({ eligible: 'no_profile', message: 'Complete your profile to check eligibility' });
  }

  const result = checkEligibility(profile, job);
  return Response.json({ ...result, profile_complete: true });
}
