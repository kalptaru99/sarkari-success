# Opportunity Graph — SQL Migrations

## How to run migrations

### Option A: Neon Console (recommended)
1. Go to https://console.neon.tech → your project → SQL Editor
2. Paste the contents of `001_opportunity_graph.sql`
3. Click Run

### Option B: psql CLI
```bash
psql "$DATABASE_URL" -f sql/001_opportunity_graph.sql
```

### Option C: Via API (one-off)
You can POST the SQL through your existing pipeline-health route if it has a raw SQL exec endpoint.

---

## Migration 001: Opportunity Graph

**File:** `001_opportunity_graph.sql`

**What it does:**
1. Adds lifecycle columns to `jobs` table:
   - `lifecycle_status` (NEW/OPEN/CLOSING_SOON/CLOSED/RESULT_OUT)
   - `status_updated_at`
   - `is_duplicate`, `duplicate_of_id`
   - `source_url`, `source_hash`, `source_fetched_at`
   - `human_verified`, `human_verified_at`, `human_verified_by`
   - `updated_at`

2. Back-fills `lifecycle_status` from existing `last_date` values

3. Creates new tables:
   - `opportunity_events` — recruitment stage timeline (admit card, result, etc.)
   - `opportunity_facts` — verified atomic facts (vacancies, age limits, fees)
   - `official_documents` — PDF/notification tracking
   - `audit_log` — every data change tracked
   - `candidate_opportunities` — saved jobs, follow, alerts

4. Creates view `v_jobs_lifecycle` — all active jobs with lifecycle info

**Safe to re-run:** Yes, all statements use `IF NOT EXISTS` or `ADD COLUMN IF NOT EXISTS`.

---

## After migration: verify it worked

```sql
-- Check lifecycle distribution
SELECT lifecycle_status, COUNT(*) FROM jobs GROUP BY 1 ORDER BY 2 DESC;

-- Check new columns exist
SELECT column_name FROM information_schema.columns
WHERE table_name = 'jobs' AND column_name LIKE '%lifecycle%';

-- Check new tables
SELECT table_name FROM information_schema.tables
WHERE table_name IN ('opportunity_events','opportunity_facts','audit_log','official_documents','candidate_opportunities');

-- Preview the lifecycle view
SELECT * FROM v_jobs_lifecycle LIMIT 10;
```

---

## New API Endpoints (deployed with this PR)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/lifecycle/status?slug=ssc-cgl-2026` | GET | Get lifecycle status + events for one job |
| `/api/lifecycle/status` | POST | Recalculate + persist status for one job (auth required) |
| `/api/lifecycle/recalculate-all` | GET | Recalculate ALL jobs (cron, auth required) |
| `/api/lifecycle/deduplicate` | GET | Find probable duplicate job postings |
| `/api/lifecycle/deduplicate` | POST | Mark job as duplicate (auth required) |
| `/api/lifecycle/verify?job_id=123` | GET | Get verification status + documents |
| `/api/lifecycle/verify` | POST | Mark job human-verified, save facts (auth required) |

All POST/auth endpoints require: `Authorization: Bearer sarkari_success_cron_secret_2026`

---

## Nightly cron (added to vercel.json)

`/api/lifecycle/recalculate-all` runs at **2:00 AM IST** (20:30 UTC) nightly.
This fixes stale NEW labels and marks expired jobs as CLOSED automatically.
