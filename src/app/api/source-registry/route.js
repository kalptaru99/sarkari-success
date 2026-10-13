export async function GET(request) {
  const sources = {
    last_updated: '2026-10-13',
    total_sources: 45,
    monitored: 32,
    coverage_percentage: 71,
    sources: [
      // Central Government
      { id: 'ssc', name: 'Staff Selection Commission', url: 'ssc.gov.in', category: 'Central', method: 'Serper Search', status: 'active', priority: 'high', exams: ['CGL', 'CHSL', 'MTS', 'GD', 'CPO', 'JE'] },
      { id: 'upsc', name: 'Union Public Service Commission', url: 'upsc.gov.in', category: 'Central', method: 'Serper Search', status: 'active', priority: 'high', exams: ['Civil Services', 'CDS', 'NDA', 'CAPF', 'ESE'] },
      { id: 'rrb', name: 'Railway Recruitment Board', url: 'rrbapply.gov.in', category: 'Railway', method: 'Serper Search', status: 'active', priority: 'high', exams: ['NTPC', 'Group D', 'ALP', 'Technician', 'JE'] },
      { id: 'ibps', name: 'Institute of Banking Personnel Selection', url: 'ibps.in', category: 'Banking', method: 'Serper Search', status: 'active', priority: 'high', exams: ['PO', 'Clerk', 'RRB', 'SO'] },
      { id: 'sbi', name: 'State Bank of India', url: 'sbi.co.in', category: 'Banking', method: 'Serper Search', status: 'active', priority: 'high', exams: ['PO', 'Clerk', 'SO'] },
      { id: 'rbi', name: 'Reserve Bank of India', url: 'rbi.org.in', category: 'Banking', method: 'Serper Search', status: 'active', priority: 'high', exams: ['Grade B', 'Assistant'] },
      { id: 'nta', name: 'National Testing Agency', url: 'nta.ac.in', category: 'Central', method: 'Serper Search', status: 'active', priority: 'high', exams: ['UGC NET', 'CSIR NET', 'CUET'] },
      { id: 'drdo', name: 'Defence Research & Development Organisation', url: 'drdo.gov.in', category: 'PSU', method: 'Serper Search', status: 'active', priority: 'high', exams: ['Scientist B', 'CEPTAM'] },
      { id: 'hal', name: 'Hindustan Aeronautics Limited', url: 'hal-india.co.in', category: 'PSU', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['Management Trainee', 'Design Trainee'] },
      { id: 'isro', name: 'Indian Space Research Organisation', url: 'isro.gov.in', category: 'PSU', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['Scientist/Engineer SC'] },
      { id: 'army', name: 'Indian Army', url: 'joinindianarmy.nic.in', category: 'Defence', method: 'Serper Search', status: 'active', priority: 'high', exams: ['Agniveer', 'Officer Entry'] },
      { id: 'employment-news', name: 'Employment News', url: 'employmentnews.gov.in', category: 'Central', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['All'] },
      // State PSCs
      { id: 'bpsc', name: 'Bihar Public Service Commission', url: 'bpsc.bihar.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'high', exams: ['CCE', 'TRE', 'APO'] },
      { id: 'uppsc', name: 'UP Public Service Commission', url: 'uppsc.up.nic.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'high', exams: ['PCS', 'RO/ARO'] },
      { id: 'mppsc', name: 'MP Public Service Commission', url: 'mppsc.mp.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['State Service'] },
      { id: 'rpsc', name: 'Rajasthan Public Service Commission', url: 'rpsc.rajasthan.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['RAS'] },
      { id: 'tnpsc', name: 'Tamil Nadu Public Service Commission', url: 'tnpsc.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['Group 1', 'Group 2', 'Group 4'] },
      { id: 'keralapsc', name: 'Kerala Public Service Commission', url: 'keralapsc.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['LD Clerk', 'LGS'] },
      { id: 'kpsc', name: 'Karnataka Public Service Commission', url: 'kpsc.kar.nic.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['KAS', 'FDA', 'SDA'] },
      { id: 'wbpsc', name: 'West Bengal Public Service Commission', url: 'pscwb.org.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['WBCS'] },
      { id: 'gpsc', name: 'Gujarat Public Service Commission', url: 'gpsc.gujarat.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['Class 1/2'] },
      { id: 'mpsc', name: 'Maharashtra Public Service Commission', url: 'mpsc.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['Rajyaseva'] },
      { id: 'opsc', name: 'Odisha Public Service Commission', url: 'opsc.gov.in', category: 'State PSC', method: 'Serper Search', status: 'active', priority: 'medium', exams: ['OCS', 'OPS'] },
      // Not yet monitored
      { id: 'hpsc', name: 'Haryana Public Service Commission', url: 'hpsc.gov.in', category: 'State PSC', method: 'Not monitored', status: 'pending', priority: 'medium', exams: ['HCS'] },
      { id: 'ppsc', name: 'Punjab Public Service Commission', url: 'ppsc.gov.in', category: 'State PSC', method: 'Not monitored', status: 'pending', priority: 'medium', exams: ['PCS'] },
      { id: 'jpsc', name: 'Jharkhand Public Service Commission', url: 'jpsc.gov.in', category: 'State PSC', method: 'Not monitored', status: 'pending', priority: 'low', exams: ['JPSC'] },
      { id: 'apsc', name: 'Assam Public Service Commission', url: 'apsc.nic.in', category: 'State PSC', method: 'Not monitored', status: 'pending', priority: 'low', exams: ['ACS'] },
      { id: 'tspsc', name: 'Telangana Public Service Commission', url: 'tspsc.gov.in', category: 'State PSC', method: 'Not monitored', status: 'pending', priority: 'medium', exams: ['Group 1', 'Group 2'] },
      { id: 'appsc', name: 'Andhra Pradesh Public Service Commission', url: 'psc.ap.gov.in', category: 'State PSC', method: 'Not monitored', status: 'pending', priority: 'medium', exams: ['Group 1', 'Group 2'] },
    ],
    gaps: [
      'High Court recruitment portals not monitored',
      'University recruitment boards not monitored',
      'Municipal corporation jobs not covered',
      'Defence sub-boards (Navy, Air Force) partially covered',
      'PDF-only notifications missed — no OCR pipeline yet',
      'Corrigendum/amendment tracking not implemented',
      'Result and admit card lifecycle tracking partial',
    ],
    next_priorities: [
      'Add TSPSC, APPSC, HPSC, PPSC to monitoring',
      'Implement PDF OCR for notifications without web pages',
      'Add corrigendum detection and linking',
      'Build result/admit card lifecycle tracker',
      'Add High Court recruitment monitoring',
    ],
  };

  return Response.json(sources, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}