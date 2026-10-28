/**
 * GET /api/alerts/track?e=<emailHash>&b=<batchId>
 * Email open tracking pixel — returns 1x1 transparent GIF.
 * Logs the open event to email_events table.
 */

import pool from '@/lib/db.js';
import { createHash } from 'crypto';

// 1x1 transparent GIF (35 bytes)
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_events (
      id SERIAL PRIMARY KEY,
      event_type TEXT NOT NULL,
      email_hash TEXT NOT NULL,
      batch_id TEXT,
      ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `).catch(() => {});

  // Also ensure email_batches table for click tracking
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_batches (
      id TEXT PRIMARY KEY,
      sent_at TIMESTAMPTZ DEFAULT NOW(),
      recipient_count INTEGER DEFAULT 0,
      job_count INTEGER DEFAULT 0,
      opens INTEGER DEFAULT 0,
      clicks INTEGER DEFAULT 0
    )
  `).catch(() => {});
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const emailHash = searchParams.get('e') || 'unknown';
  const batchId = searchParams.get('b') || null;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ua = request.headers.get('user-agent') || '';

  // Fire-and-forget DB write — never block the pixel response
  ensureTable().then(() => {
    pool.query(
      `INSERT INTO email_events (event_type, email_hash, batch_id, ip, user_agent)
       VALUES ('open', $1, $2, $3, $4)`,
      [emailHash, batchId, ip, ua]
    ).catch(() => {});

    // Increment batch opens count
    if (batchId) {
      pool.query(
        `UPDATE email_batches SET opens = opens + 1 WHERE id = $1`,
        [batchId]
      ).catch(() => {});
    }
  }).catch(() => {});

  return new Response(PIXEL, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  });
}
