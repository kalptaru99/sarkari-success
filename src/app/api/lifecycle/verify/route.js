/**
 * POST /api/lifecycle/verify
 *      Mark a job as human-verified (official source confirmed).
 *      Body: {
 *        job_id: 123,
 *        source_url: "https://ssc.gov.in/...",
 *        notes: "Verified against official notification PDF"
 *      }
 *      Admin-only.
 *
 * GET /api/lifecycle/verify?job_id=123
 *     Returns verification status + all official documents for a job.
 */

import pool from '@/lib/db.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('job_id');

    if (!jobId) {
      return Response.json({ error: 'job_id required' }, { status: 400 });
    }

    // Job verification status
    const jobResult = await pool.query(
      `SELECT id, title, org, slug, human_verified, human_verified_at, human_verified_by, source_url, source_hash
       FROM jobs WHERE id = $1`,
      [parseInt(jobId)]
    );

    if (jobResult.rows.length === 0) {
      return Response.json({ error: 'Job not found' }, { status: 404 });
    }

    // Official documents
    let docs = [];
    try {
      const docsResult = await pool.query(
        `SELECT id, doc_type, doc_url, doc_hash, fetched_at, is_active, label
         FROM official_documents WHERE job_id = $1 AND is_active = TRUE ORDER BY created_at DESC`,
        [parseInt(jobId)]
      );
      docs = docsResult.rows;
    } catch {
      docs = [];
    }

    // Verified facts
    let facts = [];
    try {
      const factsResult = await pool.query(
        `SELECT fact_key, fact_value, fact_unit, is_verified, verified_at, source_url
         FROM opportunity_facts WHERE job_id = $1 AND superseded_by IS NULL ORDER BY fact_key`,
        [parseInt(jobId)]
      );
      facts = factsResult.rows;
    } catch {
      facts = [];
    }

    return Response.json({
      job: jobResult.rows[0],
      official_documents: docs,
      facts,
    });

  } catch (error) {
    console.error('Lifecycle verify GET error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      job_id,
      source_url,
      doc_type = 'NOTIFICATION',
      doc_label,
      notes,
      facts: factsToSave = [],
    } = await request.json();

    if (!job_id) {
      return Response.json({ error: 'job_id required' }, { status: 400 });
    }

    // Mark job as human_verified
    await pool.query(
      `UPDATE jobs
       SET human_verified = TRUE,
           human_verified_at = NOW(),
           human_verified_by = 'admin',
           source_url = COALESCE($1, source_url),
           updated_at = NOW()
       WHERE id = $2`,
      [source_url || null, job_id]
    );

    // Save official document if URL provided
    if (source_url) {
      try {
        await pool.query(
          `INSERT INTO official_documents (job_id, doc_type, doc_url, label, fetched_at)
           VALUES ($1, $2, $3, $4, NOW())
           ON CONFLICT DO NOTHING`,
          [job_id, doc_type, source_url, doc_label || `Official ${doc_type}`]
        );
      } catch {
        // Table may not exist yet
      }
    }

    // Save facts if provided
    // facts format: [{ key: 'total_vacancies', value: '5000', unit: 'posts' }]
    for (const fact of factsToSave) {
      if (!fact.key || !fact.value) continue;
      try {
        // Supersede existing fact for this key
        await pool.query(
          `UPDATE opportunity_facts
           SET superseded_by = -1
           WHERE job_id = $1 AND fact_key = $2 AND superseded_by IS NULL`,
          [job_id, fact.key]
        );
        // Insert new verified fact
        const newFact = await pool.query(
          `INSERT INTO opportunity_facts (job_id, fact_key, fact_value, fact_unit, source_url, is_verified, verified_by, verified_at)
           VALUES ($1, $2, $3, $4, $5, TRUE, 'admin', NOW())
           RETURNING id`,
          [job_id, fact.key, String(fact.value), fact.unit || null, source_url || null]
        );
        // Fix the superseded_by to point to new fact id
        const newId = newFact.rows[0].id;
        await pool.query(
          `UPDATE opportunity_facts SET superseded_by = $1
           WHERE job_id = $2 AND fact_key = $3 AND id != $1 AND superseded_by = -1`,
          [newId, job_id, fact.key]
        );
      } catch {
        // Facts table may not exist yet
      }
    }

    // Audit
    try {
      await pool.query(
        `INSERT INTO audit_log (table_name, record_id, action, field_name, new_value, changed_by, change_reason)
         VALUES ('jobs', $1, 'VERIFY', 'human_verified', 'true', 'admin', $2)`,
        [job_id, notes || 'Manual verification']
      );
    } catch { /* audit_log may not exist yet */ }

    return Response.json({
      success: true,
      job_id,
      verified_at: new Date().toISOString(),
      facts_saved: factsToSave.length,
    });

  } catch (error) {
    console.error('Lifecycle verify POST error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
