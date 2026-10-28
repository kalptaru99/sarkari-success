/**
 * Opportunity Graph — Lifecycle Engine
 * Deterministic status calculation for job opportunities.
 * No LLMs. Pure logic based on dates and verified facts.
 */

/**
 * Parse Indian date formats into a JS Date object.
 * Handles:
 *   "14 August 2026", "14th August 2026", "14-08-2026", "14.08.2026",
 *   "14/08/2026", "08-2026" (month/year only), "06 November 2026",
 *   "March 08, 2026", "2026-03-08", "09-11-2026", "09.11.2026"
 *   Returns null if unparseable or if text like "Check official website".
 */
export function parseIndianDate(raw) {
  if (!raw || typeof raw !== 'string') return null;

  const s = raw.trim();

  // Reject obviously non-date strings
  if (/check|official|website|tba|n\/a|not|yet|see|notification|extended|closed|tentative/i.test(s)) {
    // Special case: "(Closed)" suffix — still try to parse the date part
    const closedMatch = s.match(/^(.+?)\s*\(closed\)/i);
    if (!closedMatch) return null;
    return parseIndianDate(closedMatch[1].trim());
  }

  const MONTHS = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    january: 0, february: 1, march: 2, april: 3, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  // "14 August 2026" or "14th August 2026" or "14th Aug 2026"
  const m1 = s.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/i);
  if (m1) {
    const mo = MONTHS[m1[2].toLowerCase().slice(0, 3)];
    if (mo !== undefined) return new Date(+m1[3], mo, +m1[1]);
  }

  // "August 14, 2026" or "March 08, 2026"
  const m2 = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (m2) {
    const mo = MONTHS[m2[1].toLowerCase().slice(0, 3)];
    if (mo !== undefined) return new Date(+m2[3], mo, +m2[2]);
  }

  // "06 November 2026" (same as m1 but explicit)
  // already caught above

  // ISO "2026-03-08"
  const m3 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m3) return new Date(+m3[1], +m3[2] - 1, +m3[3]);

  // DD-MM-YYYY or DD.MM.YYYY or DD/MM/YYYY
  const m4 = s.match(/^(\d{1,2})[-./](\d{1,2})[-./](\d{4})/);
  if (m4) {
    const day = +m4[1], mon = +m4[2], year = +m4[3];
    // Sanity: month must be 1-12
    if (mon >= 1 && mon <= 12 && day >= 1 && day <= 31) {
      return new Date(year, mon - 1, day);
    }
  }

  // "08-2026" — month/year only, treat as last day of that month
  const m5 = s.match(/^(\d{1,2})-(\d{4})$/);
  if (m5) {
    const mon = +m5[1], year = +m5[2];
    if (mon >= 1 && mon <= 12) return new Date(year, mon, 0); // day 0 = last day of prev month
  }

  // Last resort: native Date parse (handles ISO and some others)
  const fallback = new Date(s);
  if (!isNaN(fallback.getTime())) return fallback;

  return null;
}

/**
 * Calculate lifecycle status for a single job.
 *
 * Status ladder (lowest → highest precedence):
 *   NEW          Created within 7 days, deadline in future
 *   OPEN         Deadline in future, older than 7 days
 *   CLOSING_SOON Deadline within 7 days
 *   CLOSED       Deadline passed OR explicitly closed
 *   RESULT_OUT   Result event exists in opportunity_events
 *
 * @param {Object} job - Row from jobs table
 * @param {Array}  events - Rows from opportunity_events for this job
 * @returns {{ status: string, reason: string, daysLeft: number|null }}
 */
export function calculateLifecycleStatus(job, events = []) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check for RESULT_OUT — highest precedence
  const resultEvent = events.find(e =>
    e.event_type === 'RESULT_DECLARED' && e.event_date
  );
  if (resultEvent) {
    return {
      status: 'RESULT_OUT',
      reason: `Result declared on ${resultEvent.event_date}`,
      daysLeft: null,
    };
  }

  // Check for explicit CANCELLED event
  const cancelEvent = events.find(e => e.event_type === 'CANCELLED');
  if (cancelEvent) {
    return {
      status: 'CLOSED',
      reason: 'Recruitment cancelled',
      daysLeft: null,
    };
  }

  // Parse last_date — handles all Indian date formats
  let deadline = null;
  let daysLeft = null;
  if (job.last_date) {
    const parsed = parseIndianDate(job.last_date);
    if (parsed && !isNaN(parsed.getTime())) {
      deadline = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
      daysLeft = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
    }
  }

  // If last_date text contains "(Closed)" explicitly → CLOSED immediately
  if (job.last_date && /\(closed\)/i.test(job.last_date)) {
    return {
      status: 'CLOSED',
      reason: 'Marked closed in notification',
      daysLeft: deadline ? daysLeft : null,
    };
  }

  // Deadline in the past → CLOSED
  if (deadline && daysLeft < 0) {
    return {
      status: 'CLOSED',
      reason: `Deadline passed ${Math.abs(daysLeft)} day(s) ago`,
      daysLeft,
    };
  }

  // Deadline within 7 days → CLOSING_SOON
  if (deadline && daysLeft !== null && daysLeft <= 7) {
    return {
      status: 'CLOSING_SOON',
      reason: `${daysLeft} day(s) left to apply`,
      daysLeft,
    };
  }

  // Created within 7 days AND deadline in future → NEW
  const createdAt = job.created_at ? new Date(job.created_at) : null;
  const ageInDays = createdAt
    ? Math.floor((today - createdAt) / (1000 * 60 * 60 * 24))
    : 999;

  if (ageInDays <= 7 && (deadline === null || daysLeft > 0)) {
    return {
      status: 'NEW',
      reason: `Posted ${ageInDays} day(s) ago`,
      daysLeft,
    };
  }

  // Default → OPEN
  return {
    status: 'OPEN',
    reason: deadline ? `${daysLeft} day(s) left to apply` : 'No deadline specified',
    daysLeft,
  };
}

/**
 * Normalize job status label for display.
 * Returns { label, color, bgColor, emoji }
 */
export function statusBadge(status) {
  const badges = {
    NEW:          { label: 'New',          color: '#fff',    bgColor: '#16a34a', emoji: '🟢' },
    OPEN:         { label: 'Open',         color: '#fff',    bgColor: '#2563eb', emoji: '🔵' },
    CLOSING_SOON: { label: 'Closing Soon', color: '#fff',    bgColor: '#d97706', emoji: '🟡' },
    CLOSED:       { label: 'Closed',       color: '#fff',    bgColor: '#dc2626', emoji: '🔴' },
    RESULT_OUT:   { label: 'Result Out',   color: '#fff',    bgColor: '#7c3aed', emoji: '🏆' },
  };
  return badges[status] || badges.OPEN;
}
