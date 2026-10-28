-- Migration 002: Fix stale OPEN jobs where last_date text contains "(Closed)"
-- Run this in Neon SQL Editor after 001

-- Mark jobs with "(Closed)" in last_date text as CLOSED
UPDATE jobs
SET lifecycle_status = 'CLOSED',
    status_updated_at = NOW()
WHERE (last_date ILIKE '%(closed)%' OR last_date ILIKE '%closed%')
  AND lifecycle_status != 'CLOSED';

-- Mark jobs where last_date looks like a past date (simple cases)
-- DD-MM-YYYY format
UPDATE jobs
SET lifecycle_status = 'CLOSED',
    status_updated_at = NOW()
WHERE lifecycle_status NOT IN ('CLOSED', 'RESULT_OUT')
  AND last_date ~ '^\d{2}[-./]\d{2}[-./]\d{4}'
  AND (
    -- Parse DD-MM-YYYY or DD.MM.YYYY or DD/MM/YYYY
    TO_DATE(
      REGEXP_REPLACE(last_date, '^(\d{2})[-./](\d{2})[-./](\d{4}).*', '\3-\2-\1'),
      'YYYY-MM-DD'
    ) < CURRENT_DATE
  );

-- Verify result
SELECT lifecycle_status, COUNT(*) FROM jobs GROUP BY 1 ORDER BY 2 DESC;
