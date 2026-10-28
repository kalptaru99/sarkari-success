-- =============================================================
-- Opportunity Graph MVP — Migration 001
-- Run this against your Neon DB (staging first, then prod)
-- Safe to run multiple times — all statements use IF NOT EXISTS
-- =============================================================

-- -----------------------------------------------
-- 1. Extend the existing jobs table
-- -----------------------------------------------

-- Lifecycle status: NEW | OPEN | CLOSING_SOON | CLOSED | RESULT_OUT
ALTER TABLE jobs
  ADD COLUMN IF NOT EXISTS lifecycle_status VARCHAR(20) DEFAULT 'NEW',
  ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS canonical_job_id INTEGER REFERENCES jobs(id),
  ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS duplicate_of_id INTEGER REFERENCES jobs(id),
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS source_hash VARCHAR(64),
  ADD COLUMN IF NOT EXISTS source_fetched_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS human_verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS human_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS human_verified_by VARCHAR(100),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Back-fill lifecycle_status based on current data
UPDATE jobs SET
  lifecycle_status = CASE
    WHEN last_date IS NOT NULL AND last_date::date < CURRENT_DATE THEN 'CLOSED'
    WHEN last_date IS NOT NULL AND last_date::date <= CURRENT_DATE + INTERVAL '7 days' THEN 'CLOSING_SOON'
    WHEN created_at > NOW() - INTERVAL '7 days' THEN 'NEW'
    ELSE 'OPEN'
  END,
  status_updated_at = NOW()
WHERE lifecycle_status = 'NEW' OR lifecycle_status IS NULL;

-- Index for fast lifecycle queries
CREATE INDEX IF NOT EXISTS idx_jobs_lifecycle_status ON jobs(lifecycle_status);
CREATE INDEX IF NOT EXISTS idx_jobs_last_date ON jobs(last_date);
CREATE INDEX IF NOT EXISTS idx_jobs_is_duplicate ON jobs(is_duplicate);
CREATE INDEX IF NOT EXISTS idx_jobs_canonical ON jobs(canonical_job_id);


-- -----------------------------------------------
-- 2. opportunity_events — recruitment stage timeline
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS opportunity_events (
  id            SERIAL PRIMARY KEY,
  job_id        INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  event_type    VARCHAR(50) NOT NULL,
  -- event_type values: NOTIFICATION_RELEASED | APPLICATION_OPEN | APPLICATION_CLOSED
  --   ADMIT_CARD_RELEASED | EXAM_DATE | RESULT_DECLARED | DOCUMENT_VERIFICATION
  --   JOINING_LETTER | CANCELLED | RE_ADVERTISED
  event_date    DATE,
  event_label   TEXT,           -- human-readable: "CBT Phase-1"
  source_url    TEXT,           -- official source URL
  source_hash   VARCHAR(64),    -- SHA-256 of source page at retrieval time
  fetched_at    TIMESTAMPTZ DEFAULT NOW(),
  is_verified   BOOLEAN DEFAULT FALSE,
  verified_by   VARCHAR(100),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_opp_events_job_id ON opportunity_events(job_id);
CREATE INDEX IF NOT EXISTS idx_opp_events_type ON opportunity_events(event_type);
CREATE INDEX IF NOT EXISTS idx_opp_events_date ON opportunity_events(event_date);


-- -----------------------------------------------
-- 3. opportunity_facts — verified atomic facts
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS opportunity_facts (
  id            SERIAL PRIMARY KEY,
  job_id        INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  fact_key      VARCHAR(100) NOT NULL,
  -- fact_key examples: total_vacancies | age_min | age_max | education_required
  --   salary_min | salary_max | application_fee_general | application_fee_obc
  --   application_fee_sc_st | exam_mode | posting_state | selection_stages
  fact_value    TEXT NOT NULL,
  fact_unit     VARCHAR(30),    -- 'years', '₹', 'posts', etc.
  source_url    TEXT,
  source_hash   VARCHAR(64),
  fetched_at    TIMESTAMPTZ DEFAULT NOW(),
  is_verified   BOOLEAN DEFAULT FALSE,
  verified_by   VARCHAR(100),
  verified_at   TIMESTAMPTZ,
  superseded_by INTEGER REFERENCES opportunity_facts(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_opp_facts_job_id ON opportunity_facts(job_id);
CREATE INDEX IF NOT EXISTS idx_opp_facts_key ON opportunity_facts(fact_key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_opp_facts_job_key_active
  ON opportunity_facts(job_id, fact_key)
  WHERE superseded_by IS NULL;


-- -----------------------------------------------
-- 4. official_documents — PDF/notification tracking
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS official_documents (
  id              SERIAL PRIMARY KEY,
  job_id          INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  doc_type        VARCHAR(50) NOT NULL,
  -- doc_type: NOTIFICATION | SYLLABUS | ADMIT_CARD | RESULT | CUTOFF | ANSWER_KEY | JOINING_LETTER
  doc_url         TEXT NOT NULL,
  doc_hash        VARCHAR(64),    -- SHA-256 of file content
  file_size_bytes INTEGER,
  fetched_at      TIMESTAMPTZ DEFAULT NOW(),
  is_active       BOOLEAN DEFAULT TRUE,
  replaced_by_id  INTEGER REFERENCES official_documents(id),
  label           TEXT,           -- "SSC CGL 2026 Official Notification"
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_official_docs_job_id ON official_documents(job_id);
CREATE INDEX IF NOT EXISTS idx_official_docs_type ON official_documents(doc_type);


-- -----------------------------------------------
-- 5. audit_log — every data change tracked
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id            BIGSERIAL PRIMARY KEY,
  table_name    VARCHAR(50) NOT NULL,
  record_id     INTEGER NOT NULL,
  action        VARCHAR(20) NOT NULL,  -- INSERT | UPDATE | DELETE | VERIFY | FLAG
  field_name    VARCHAR(100),
  old_value     TEXT,
  new_value     TEXT,
  changed_by    VARCHAR(100),          -- 'cron:auto-fetch' | 'admin:gnprakash683' | 'system:lifecycle'
  change_reason TEXT,
  ip_address    INET,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);


-- -----------------------------------------------
-- 6. candidate_opportunities — saved jobs + follow
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS candidate_opportunities (
  id              SERIAL PRIMARY KEY,
  user_id         TEXT NOT NULL,        -- NextAuth user id
  job_id          INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  action          VARCHAR(20) NOT NULL, -- SAVED | FOLLOWING | APPLIED | IGNORED
  alert_deadline  BOOLEAN DEFAULT TRUE, -- email alert before last_date
  alert_stages    BOOLEAN DEFAULT TRUE, -- alert on new stages (admit card, result)
  notes           TEXT,                 -- candidate's private note
  applied_at      DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

CREATE INDEX IF NOT EXISTS idx_candidate_opp_user_id ON candidate_opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_candidate_opp_job_id ON candidate_opportunities(job_id);
CREATE INDEX IF NOT EXISTS idx_candidate_opp_action ON candidate_opportunities(action);


-- -----------------------------------------------
-- 7. source_registry enhancements (if table exists)
-- -----------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'source_registry') THEN
    ALTER TABLE source_registry
      ADD COLUMN IF NOT EXISTS reliability_score NUMERIC(3,2) DEFAULT 1.00,
      ADD COLUMN IF NOT EXISTS last_successful_fetch TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS consecutive_failures INTEGER DEFAULT 0;
  END IF;
END $$;


-- -----------------------------------------------
-- 8. Helper view: active jobs with lifecycle status
-- -----------------------------------------------
CREATE OR REPLACE VIEW v_jobs_lifecycle AS
SELECT
  j.id,
  j.title,
  j.org,
  j.slug,
  j.category,
  j.vacancies,
  j.last_date,
  j.lifecycle_status,
  j.status_updated_at,
  j.is_new,
  j.is_active,
  j.is_duplicate,
  j.human_verified,
  j.created_at,
  CASE
    WHEN j.last_date IS NOT NULL THEN
      (j.last_date::date - CURRENT_DATE)
    ELSE NULL
  END AS days_until_deadline,
  (SELECT COUNT(*) FROM opportunity_events oe WHERE oe.job_id = j.id) AS event_count,
  (SELECT COUNT(*) FROM opportunity_facts of2 WHERE of2.job_id = j.id AND of2.superseded_by IS NULL) AS fact_count
FROM jobs j
WHERE j.is_active = TRUE AND j.is_duplicate = FALSE;


-- =============================================================
-- DONE. Next steps:
-- 1. Run this file against your Neon staging DB
-- 2. Verify with: SELECT lifecycle_status, COUNT(*) FROM jobs GROUP BY 1;
-- 3. Then run against prod
-- 4. Deploy the /api/lifecycle/* routes (see src/app/api/lifecycle/)
-- =============================================================
