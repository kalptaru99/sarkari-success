/**
 * Deterministic eligibility matcher
 * Compares a candidate profile against a job's requirements.
 * Returns { eligible: 'yes' | 'no' | 'maybe', checks: [...] }
 */

// Map education levels to a numeric rank (higher = more qualified)
const EDU_RANK = {
  '8th': 1,
  '10th': 2,
  'matriculation': 2,
  '12th': 3,
  'intermediate': 3,
  'iti': 3,
  'diploma': 4,
  'graduate': 5,
  'graduation': 5,
  'bachelor': 5,
  'btech': 5,
  'be': 5,
  'bsc': 5,
  'ba': 5,
  'bcom': 5,
  'postgraduate': 6,
  'master': 6,
  'mtech': 6,
  'mba': 6,
  'msc': 6,
  'ma': 6,
  'phd': 7,
};

function eduRank(text) {
  if (!text) return 0;
  const lower = text.toLowerCase();
  for (const [key, rank] of Object.entries(EDU_RANK)) {
    if (lower.includes(key)) return rank;
  }
  return 0;
}

function parseAgeLimit(ageLimitStr) {
  if (!ageLimitStr) return null;
  // Handle "18-32", "18 to 32", "upto 30", "max 35"
  const rangeMatch = ageLimitStr.match(/(\d+)\s*[-–to]+\s*(\d+)/i);
  if (rangeMatch) return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
  const maxMatch = ageLimitStr.match(/(?:upto|max|maximum|up to)\s*(\d+)/i);
  if (maxMatch) return { min: 18, max: parseInt(maxMatch[1]) };
  const singleMatch = ageLimitStr.match(/(\d+)/);
  if (singleMatch) return { min: 18, max: parseInt(singleMatch[1]) };
  return null;
}

// Category age relaxations (years) per GoI rules
const CATEGORY_RELAXATION = {
  obc: 3,
  sc: 5,
  st: 5,
  ews: 0,
  general: 0,
};

/**
 * @param {object} profile - candidate profile from DB
 * @param {object} job - job row from DB
 * @returns {{ eligible: 'yes'|'no'|'maybe', score: number, checks: Array }}
 */
export function checkEligibility(profile, job) {
  if (!profile) return { eligible: 'maybe', score: 0, checks: [] };

  const checks = [];
  let yesCount = 0;
  let noCount = 0;
  let maybeCount = 0;

  // ── AGE CHECK ──────────────────────────────────────────────────────────────
  const ageLimit = parseAgeLimit(job.age_limit);
  if (ageLimit && profile.age) {
    const relaxation = CATEGORY_RELAXATION[profile.category] || 0;
    const effectiveMax = ageLimit.max + relaxation;
    const age = parseInt(profile.age);
    if (age < ageLimit.min) {
      checks.push({ label: 'Age', status: 'no', detail: `${age} yrs — minimum is ${ageLimit.min}` });
      noCount++;
    } else if (age > effectiveMax) {
      const relNote = relaxation > 0 ? ` (${ageLimit.max} + ${relaxation} ${profile.category?.toUpperCase()} relaxation)` : '';
      checks.push({ label: 'Age', status: 'no', detail: `${age} yrs — limit is ${effectiveMax}${relNote}` });
      noCount++;
    } else {
      const relNote = relaxation > 0 ? ` (incl. ${relaxation}-yr ${profile.category?.toUpperCase()} relaxation)` : '';
      checks.push({ label: 'Age', status: 'yes', detail: `${age} yrs ✓ — limit ${ageLimit.min}–${effectiveMax}${relNote}` });
      yesCount++;
    }
  } else if (ageLimit && !profile.age) {
    checks.push({ label: 'Age', status: 'maybe', detail: `Limit is ${job.age_limit} — add your age to check` });
    maybeCount++;
  } else if (profile.age && !ageLimit) {
    // No age limit info on job — try parsing from eligibility field
    const fromEligibility = parseAgeLimit(job.eligibility || '');
    if (fromEligibility) {
      const relaxation = CATEGORY_RELAXATION[profile.category] || 0;
      const effectiveMax = fromEligibility.max + relaxation;
      const age = parseInt(profile.age);
      if (age >= fromEligibility.min && age <= effectiveMax) {
        checks.push({ label: 'Age', status: 'yes', detail: `${age} yrs ✓` });
        yesCount++;
      } else {
        checks.push({ label: 'Age', status: 'no', detail: `${age} yrs — limit approx ${fromEligibility.min}–${effectiveMax}` });
        noCount++;
      }
    }
    // else no age info — skip
  }

  // ── EDUCATION CHECK ────────────────────────────────────────────────────────
  const jobEduText = job.min_qualification || job.eligibility || '';
  const jobRank = eduRank(jobEduText);
  const candidateRank = eduRank(profile.education);

  if (jobRank > 0 && candidateRank > 0) {
    if (candidateRank >= jobRank) {
      checks.push({ label: 'Qualification', status: 'yes', detail: `${profile.education} ✓ — ${jobEduRankLabel(jobRank)} required` });
      yesCount++;
    } else {
      checks.push({ label: 'Qualification', status: 'no', detail: `${profile.education} — ${jobEduRankLabel(jobRank)} required` });
      noCount++;
    }
  } else if (jobEduText && candidateRank === 0) {
    checks.push({ label: 'Qualification', status: 'maybe', detail: `Requirement: ${jobEduText.substring(0, 60)} — add your education to check` });
    maybeCount++;
  } else if (jobRank > 0 && candidateRank === 0) {
    checks.push({ label: 'Qualification', status: 'maybe', detail: `${jobEduRankLabel(jobRank)} required — add your education to check` });
    maybeCount++;
  }

  // ── CATEGORY CHECK ─────────────────────────────────────────────────────────
  // Always a 'yes' — all government jobs are open to all categories
  // (reserved seats exist but general candidates are also welcome)
  if (profile.category) {
    checks.push({ label: 'Category', status: 'yes', detail: `${profile.category.toUpperCase()} — eligible (${profile.category !== 'general' ? 'reserved + general seats' : 'general seats'})` });
    yesCount++;
  }

  // ── OVERALL VERDICT ────────────────────────────────────────────────────────
  let eligible;
  if (checks.length === 0) {
    eligible = 'maybe';
  } else if (noCount > 0) {
    eligible = 'no';
  } else if (maybeCount > 0) {
    eligible = 'maybe';
  } else {
    eligible = 'yes';
  }

  const score = checks.length > 0 ? Math.round((yesCount / checks.length) * 100) : 0;
  return { eligible, score, checks };
}

function jobEduRankLabel(rank) {
  const labels = { 1: '8th Pass', 2: '10th Pass', 3: '12th Pass / ITI', 4: 'Diploma', 5: 'Graduate', 6: 'Post Graduate', 7: 'PhD' };
  return labels[rank] || 'Unknown';
}
