/**
 * GET /api/lifecycle/deduplicate
 *     Find probable duplicate job postings.
 *     Returns clusters of jobs that look like duplicates.
 *     Query params:
 *       ?min_score=0.7  (0-1, default 0.75)
 *       ?limit=50       (max clusters to return)
 *       ?auto_flag=false (if true + auth: auto-mark duplicates in DB)
 *
 * POST /api/lifecycle/deduplicate
 *      Body: { primary_id: 1, duplicate_id: 2 }
 *      Mark duplicate_id as duplicate of primary_id. Admin-only.
 *
 * DELETE /api/lifecycle/deduplicate
 *        Body: { job_id: 2 }
 *        Clear duplicate flag from a job. Admin-only.
 */

import pool from '@/lib/db.js';

/**
 * Simple trigram-style title similarity.
 * Returns 0-1. Good enough for dedup without pg_trgm extension.
 */
function titleSimilarity(a, b) {
  if (!a || !b) return 0;
  const normalize = s => s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(recruitment|notification|vacancy|vacancies|post|posts|2024|2025|2026|limited|commission|board)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const na = normalize(a);
  const nb = normalize(b);

  if (na === nb) return 1.0;

  // Token overlap (Jaccard)
  const ta = new Set(na.split(' ').filter(t => t.length > 2));
  const tb = new Set(nb.split(' ').filter(t => t.length > 2));
  const intersection = [...ta].filter(t => tb.has(t)).length;
  const union = new Set([...ta, ...tb]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Org similarity — exact after normalization
 */
function orgSimilarity(a, b) {
  if (!a || !b) return 0;
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return norm(a) === norm(b) ? 1.0 : 0;
}

/**
 * Date overlap score — same last_date or within 30 days
 */
function dateProximity(a, b) {
  if (!a || !b) return 0.5; // neutral when unknown
  const da = new Date(a);
  const db = new Date(b);
  if (isNaN(da) || isNaN(db)) return 0.5;
  const diffDays = Math.abs((da - db) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 1.0;
  if (diffDays <= 7) return 0.8;
  if (diffDays <= 30) return 0.5;
  return 0;
}

/**
 * Composite duplicate score (0-1).
 * Title carries 60%, org 30%, date 10%.
 */
function duplicateScore(a, b) {
  const titleScore = titleSimilarity(a.title, b.title);
  if (titleScore < 0.3) return 0; // fast exit

  const orgScore = orgSimilarity(a.org, b.org);
  if (orgScore === 0) return 0;   // different orgs = not duplicate

  const dateScore = dateProximity(a.last_date, b.last_date);

  return (titleScore * 0.6) + (orgScore * 0.3) + (dateScore * 0.1);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const minScore = parseFloat(searchParams.get('min_score') || '0.75');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Fetch all active, non-duplicate jobs
    const result = await pool.query(
      `SELECT id, title, org, last_date, slug, category, created_at, is_duplicate
       FROM jobs
       WHERE is_active = TRUE
       ORDER BY created_at DESC
       LIMIT 500`
    );

    const jobs = result.rows;

    // O(n²) pair comparison — fine for ≤500 jobs
    const clusters = [];
    const seen = new Set();

    for (let i = 0; i < jobs.length; i++) {
      if (seen.has(jobs[i].id)) continue;

      const cluster = [jobs[i]];

      for (let j = i + 1; j < jobs.length; j++) {
        if (seen.has(jobs[j].id)) continue;

        const score = duplicateScore(jobs[i], jobs[j]);
        if (score >= minScore) {
          cluster.push({ ...jobs[j], score: Math.round(score * 100) / 100 });
          seen.add(jobs[j].id);
        }
      }

      if (cluster.length > 1) {
        seen.add(jobs[i].id);
        clusters.push({
          primary: cluster[0],
          duplicates: cluster.slice(1),
          max_score: Math.max(...cluster.slice(1).map(j => j.score || 0)),
        });
      }

      if (clusters.length >= limit) break;
    }

    // Sort by highest score first
    clusters.sort((a, b) => b.max_score - a.max_score);

    // auto_flag=true with auth: mark all duplicates in DB automatically
    const autoFlag = searchParams.get('auto_flag') === 'true';
    const authHeader = request.headers.get('authorization');
    const isAuthed = authHeader === `Bearer ${process.env.CRON_SECRET}`;

    let flagged = 0;
    if (autoFlag && isAuthed && clusters.length > 0) {
      for (const cluster of clusters) {
        for (const dup of cluster.duplicates) {
          try {
            await pool.query(
              `UPDATE jobs
               SET is_duplicate = TRUE,
                   duplicate_of_id = $1,
                   is_active = FALSE,
                   updated_at = NOW()
               WHERE id = $2 AND (is_duplicate = FALSE OR is_duplicate IS NULL)`,
              [cluster.primary.id, dup.id]
            );
            flagged++;
          } catch { /* continue */ }
        }
      }
    }

    return Response.json({
      clusters,
      total_clusters: clusters.length,
      total_potential_duplicates: clusters.reduce((sum, c) => sum + c.duplicates.length, 0),
      min_score_used: minScore,
      auto_flagged: autoFlag && isAuthed ? flagged : undefined,
    });

  } catch (error) {
    console.error('Deduplicate GET error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { primary_id, duplicate_id } = await request.json();
    if (!primary_id || !duplicate_id) {
      return Response.json({ error: 'primary_id and duplicate_id required' }, { status: 400 });
    }

    if (primary_id === duplicate_id) {
      return Response.json({ error: 'Cannot mark a job as duplicate of itself' }, { status: 400 });
    }

    // Verify both exist
    const check = await pool.query(
      'SELECT id, title FROM jobs WHERE id = ANY($1)',
      [[primary_id, duplicate_id]]
    );
    if (check.rows.length < 2) {
      return Response.json({ error: 'One or both jobs not found' }, { status: 404 });
    }

    // Mark duplicate
    await pool.query(
      `UPDATE jobs
       SET is_duplicate = TRUE,
           duplicate_of_id = $1,
           is_active = FALSE,
           updated_at = NOW()
       WHERE id = $2`,
      [primary_id, duplicate_id]
    );

    // Audit
    try {
      await pool.query(
        `INSERT INTO audit_log (table_name, record_id, action, field_name, old_value, new_value, changed_by, change_reason)
         VALUES ('jobs', $1, 'UPDATE', 'is_duplicate', 'false', 'true', 'system:lifecycle', $2)`,
        [duplicate_id, `Marked as duplicate of job #${primary_id}`]
      );
    } catch { /* audit_log may not exist yet */ }

    return Response.json({
      success: true,
      message: `Job #${duplicate_id} marked as duplicate of Job #${primary_id}`,
    });

  } catch (error) {
    console.error('Deduplicate POST error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { job_id } = await request.json();
    if (!job_id) {
      return Response.json({ error: 'job_id required' }, { status: 400 });
    }

    await pool.query(
      `UPDATE jobs
       SET is_duplicate = FALSE,
           duplicate_of_id = NULL,
           is_active = TRUE,
           updated_at = NOW()
       WHERE id = $1`,
      [job_id]
    );

    return Response.json({ success: true, message: `Duplicate flag cleared for job #${job_id}` });

  } catch (error) {
    console.error('Deduplicate DELETE error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
