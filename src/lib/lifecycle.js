/**
 * Opportunity Graph — Lifecycle Engine
 * Deterministic status calculation for job opportunities.
 * No LLMs. Pure logic based on dates and verified facts.
 */

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

  // Parse last_date
  let deadline = null;
  let daysLeft = null;
  if (job.last_date) {
    // Handle both DATE string ("2026-03-15") and text ("15 March 2026")
    const parsed = new Date(job.last_date);
    if (!isNaN(parsed.getTime())) {
      deadline = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
      daysLeft = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
    }
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
