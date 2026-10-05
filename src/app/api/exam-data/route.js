export async function GET(request) {
  const examData = {
    version: '1.0',
    last_updated: '2026-10-01',
    source: 'Sarkari Success — sarkarisuccess.com',
    license: 'Free to use with attribution to sarkarisuccess.com',
    data: {
      exams: [
        { id: 'ssc-cgl', name: 'SSC CGL', org: 'Staff Selection Commission', eligibility: 'Graduate', age_limit: '18-32', vacancies_2026: 17727, exam_date: 'December 2026', notification_date: 'September 2026', official_website: 'ssc.gov.in', category: 'SSC' },
        { id: 'ssc-chsl', name: 'SSC CHSL', org: 'Staff Selection Commission', eligibility: '12th Pass', age_limit: '18-27', vacancies_2026: 3712, exam_date: 'January 2027', notification_date: 'October 2026', official_website: 'ssc.gov.in', category: 'SSC' },
        { id: 'ssc-mts', name: 'SSC MTS', org: 'Staff Selection Commission', eligibility: '10th Pass', age_limit: '18-25', vacancies_2026: 9583, exam_date: 'October 2026', notification_date: 'September 2026', official_website: 'ssc.gov.in', category: 'SSC' },
        { id: 'ssc-gd', name: 'SSC GD Constable', org: 'Staff Selection Commission', eligibility: '10th Pass', age_limit: '18-23', vacancies_2026: 39481, exam_date: 'November 2026', notification_date: 'October 2026', official_website: 'ssc.gov.in', category: 'SSC' },
        { id: 'rrb-ntpc', name: 'RRB NTPC', org: 'Railway Recruitment Board', eligibility: 'Graduate/12th Pass', age_limit: '18-33', vacancies_2026: 8868, exam_date: 'January 2027', notification_date: 'October 2026', official_website: 'rrbapply.gov.in', category: 'Railway' },
        { id: 'rrb-group-d', name: 'RRB Group D', org: 'Railway Recruitment Board', eligibility: '10th Pass + ITI', age_limit: '18-33', vacancies_2026: 32438, exam_date: 'February 2027', notification_date: 'October 2026', official_website: 'rrbapply.gov.in', category: 'Railway' },
        { id: 'rrb-alp', name: 'RRB ALP', org: 'Railway Recruitment Board', eligibility: '10th Pass + ITI', age_limit: '18-28', vacancies_2026: 18799, exam_date: 'March 2027', notification_date: 'December 2026', official_website: 'rrbapply.gov.in', category: 'Railway' },
        { id: 'upsc-cse', name: 'UPSC Civil Services', org: 'Union Public Service Commission', eligibility: 'Graduate', age_limit: '21-32', vacancies_2026: 979, exam_date: 'May 2027', notification_date: 'February 2027', official_website: 'upsc.gov.in', category: 'UPSC' },
        { id: 'upsc-cds', name: 'UPSC CDS', org: 'Union Public Service Commission', eligibility: 'Graduate', age_limit: '19-25', vacancies_2026: 459, exam_date: 'September 2026', notification_date: 'June 2026', official_website: 'upsc.gov.in', category: 'UPSC' },
        { id: 'ibps-po', name: 'IBPS PO', org: 'Institute of Banking Personnel Selection', eligibility: 'Graduate', age_limit: '20-30', vacancies_2026: 4455, exam_date: 'August 2026', notification_date: 'June 2026', official_website: 'ibps.in', category: 'Banking' },
        { id: 'ibps-clerk', name: 'IBPS Clerk', org: 'Institute of Banking Personnel Selection', eligibility: 'Graduate', age_limit: '20-28', vacancies_2026: 6128, exam_date: 'November 2026', notification_date: 'September 2026', official_website: 'ibps.in', category: 'Banking' },
        { id: 'sbi-po', name: 'SBI PO', org: 'State Bank of India', eligibility: 'Graduate', age_limit: '21-30', vacancies_2026: 600, exam_date: 'March 2027', notification_date: 'January 2027', official_website: 'sbi.co.in', category: 'Banking' },
        { id: 'sbi-clerk', name: 'SBI Clerk', org: 'State Bank of India', eligibility: 'Graduate', age_limit: '20-28', vacancies_2026: 13735, exam_date: 'February 2027', notification_date: 'November 2026', official_website: 'sbi.co.in', category: 'Banking' },
      ],
      state_pscs: [
        { id: 'bpsc', name: 'BPSC', state: 'Bihar', website: 'bpsc.bihar.gov.in' },
        { id: 'uppsc', name: 'UPPSC', state: 'Uttar Pradesh', website: 'uppsc.up.nic.in' },
        { id: 'mppsc', name: 'MPPSC', state: 'Madhya Pradesh', website: 'mppsc.mp.gov.in' },
        { id: 'rpsc', name: 'RPSC', state: 'Rajasthan', website: 'rpsc.rajasthan.gov.in' },
        { id: 'tnpsc', name: 'TNPSC', state: 'Tamil Nadu', website: 'tnpsc.gov.in' },
        { id: 'kerala-psc', name: 'Kerala PSC', state: 'Kerala', website: 'keralapsc.gov.in' },
        { id: 'kpsc', name: 'KPSC', state: 'Karnataka', website: 'kpsc.kar.nic.in' },
        { id: 'wbpsc', name: 'WBPSC', state: 'West Bengal', website: 'pscwb.org.in' },
      ],
      salary_data: [
        { exam: 'UPSC Civil Services', basic_pay: 56100, in_hand: 85000, category: 'UPSC' },
        { exam: 'SSC CGL Grade B', basic_pay: 44900, in_hand: 67000, category: 'SSC' },
        { exam: 'IBPS PO', basic_pay: 36000, in_hand: 52000, category: 'Banking' },
        { exam: 'RRB NTPC Graduate', basic_pay: 35400, in_hand: 53000, category: 'Railway' },
        { exam: 'SSC CHSL', basic_pay: 19900, in_hand: 30000, category: 'SSC' },
        { exam: 'RRB Group D', basic_pay: 18000, in_hand: 27000, category: 'Railway' },
      ],
    },
    api_info: {
      description: 'Free public API for Indian Government Job data by Sarkari Success',
      website: 'https://sarkarisuccess.com',
      contact: 'contact.sarkarisuccess@gmail.com',
      attribution: 'Please credit sarkarisuccess.com when using this data',
    },
  };

  return Response.json(examData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}