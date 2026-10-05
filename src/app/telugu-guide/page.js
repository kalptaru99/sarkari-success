export const metadata = {
  title: 'ప్రభుత్వ ఉద్యోగ గైడ్ తెలుగులో 2026 — SSC, Railway, UPSC, TSPSC | Sarkari Success',
  description: 'SSC CGL, RRB NTPC, UPSC, TSPSC, APPSC గురించి పూర్తి సమాచారం తెలుగులో. Syllabus, eligibility, salary అన్నీ తెలుగులో.',
  keywords: 'government job guide telugu, TSPSC guide telugu, SSC CGL telugu, RRB NTPC telugu, sarkari naukri telugu 2026',
};

const guides = [
  {
    title: 'TSPSC అంటే ఏమిటి? తెలుగులో పూర్తి వివరణ',
    color: '#FF9800',
    content: [
      { q: 'TSPSC అంటే ఏమిటి?', a: 'TSPSC (Telangana State Public Service Commission) తెలంగాణ రాష్ట్ర ప్రభుత్వ Group 1, 2, 3, 4 పదవులకు పరీక్షలు నిర్వహిస్తుంది. Deputy Collector, DSP, Revenue Officer వంటి పదవులు ఇందులో ఉంటాయి.' },
      { q: 'TSPSC అర్హత ఏమిటి?', a: 'Group 1: Graduation అవసరం, వయసు 18-44. Group 2: Graduation, వయసు 18-44. Group 4: Intermediate (12th), వయసు 18-44. SC/ST/BC అభ్యర్థులకు వయసు సడలింపు ఉంటుంది.' },
      { q: 'TSPSC లో జీతం ఎంత?', a: 'Group 1 (Deputy Collector): ₹56,100 బేసిక్ పే. అన్ని allowances కలిపి నెలకు ₹80,000-95,000. Group 4: ₹19,500 బేసిక్ పే.' },
      { q: 'TSPSC తయారీ ఎలా?', a: 'తెలంగాణ చరిత్ర, సంస్కృతి, current affairs చాలా ముఖ్యం. NCERT books చదవండి. Previous year questions తప్పకుండా solve చేయండి.' },
    ],
  },
  {
    title: 'SSC CGL అంటే ఏమిటి? తెలుగులో వివరణ',
    color: '#1e3a8a',
    content: [
      { q: 'SSC CGL అంటే ఏమిటి?', a: 'SSC CGL (Combined Graduate Level) అనేది Staff Selection Commission నిర్వహించే పరీక్ష. Income Tax Inspector, Auditor వంటి Group B మరియు C పదవులకు.' },
      { q: 'SSC CGL అర్హత?', a: 'ఏ విభాగంలోనైనా Graduation అవసరం. వయసు: 18-32 సంవత్సరాలు. OBC కి 3 సంవత్సరాలు, SC/ST కి 5 సంవత్సరాల వయసు సడలింపు.' },
      { q: 'SSC CGL జీతం ఎంత?', a: 'SSC CGL లో ₹25,500 నుండి ₹1,51,100 నెలకు. Grade Pay 4200 పదవులలో చేతికి దాదాపు ₹67,000 వస్తుంది.' },
      { q: 'SSC CGL తయారీ ఎలా?', a: 'Maths మరియు Reasoning కి ఎక్కువ సమయం కేటాయించండి — 60% weightage ఉంది. రోజూ 50 practice questions, వారానికి ఒక mock test తప్పకుండా.' },
    ],
  },
  {
    title: 'RRB NTPC అంటే ఏమిటి? Railway ఉద్యోగ గైడ్',
    color: '#0f766e',
    content: [
      { q: 'RRB NTPC అంటే ఏమిటి?', a: 'RRB NTPC అనేది Railway Recruitment Board పరీక్ష. Junior Clerk, Station Master, Goods Guard వంటి పదవులకు.' },
      { q: 'RRB NTPC అర్హత?', a: 'Graduate posts కి Graduation, 12th pass posts కి 12th pass. వయసు: 18-33 సంవత్సరాలు.' },
      { q: 'Railway జీతం ఎంత?', a: 'Graduate posts: ₹35,400+ నెలకు. 12th pass posts: ₹19,900+ నెలకు. ఉచిత ప్రయాణం, వైద్యం, నివాసం వంటి సౌకర్యాలు కూడా.' },
      { q: 'RRB NTPC తయారీ?', a: 'General Awareness చాలా ముఖ్యం — 40 marks. Maths మరియు Reasoning లో basic concepts బలపరచుకోండి.' },
    ],
  },
];

const keyTerms = [
  { en: 'Notification', te: 'నోటిఫికేషన్ — కొత్త నియామకం ప్రకటన' },
  { en: 'Vacancy', te: 'ఖాళీ పదవులు — ఖాళీగా ఉన్న పదవుల సంఖ్య' },
  { en: 'Eligibility', te: 'అర్హత — దరఖాస్తు చేయడానికి అవసరమైన అర్హతలు' },
  { en: 'Admit Card', te: 'అడ్మిట్ కార్డ్ — పరీక్షలో పాల్గొనడానికి అనుమతి' },
  { en: 'Cutoff', te: 'కటాఫ్ — ఎంపికకు కనీస మార్కులు' },
  { en: 'Merit List', te: 'మెరిట్ జాబితా — మార్కుల ఆధారంగా ఎంపిక జాబితా' },
  { en: 'Age Relaxation', te: 'వయసు సడలింపు — SC/ST/BC కి అదనపు సంవత్సరాలు' },
  { en: 'Document Verification', te: 'పత్రాల ధృవీకరణ — అసలు పత్రాల తనిఖీ' },
];

export default function TeluguGuidePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>
      <div style={{ backgroundColor: '#FF9800', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>ప్రభుత్వ ఉద్యోగ గైడ్ — తెలుగులో</h1>
        <p style={{ color: '#fff3e0', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • TSPSC • APPSC — అన్నీ తెలుగులో</p>
        <p style={{ color: '#ffe0b2', fontSize: '13px', margin: 0 }}>తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు కేంద్ర ప్రభుత్వ ఉద్యోగాల పూర్తి గైడ్</p>
      </div>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>
        {guides.map((guide, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            <div style={{ backgroundColor: guide.color, padding: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: 0 }}>{guide.title}</h2>
            </div>
            <div style={{ padding: '20px' }}>
              {guide.content.map((item, j) => (
                <div key={j} style={{ borderBottom: j < guide.content.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
                  <h3 style={{ color: guide.color, fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>❓ {item.q}</h3>
                  <p style={{ color: '#374151', fontSize: '14px', margin: 0, lineHeight: '1.8' }}>✅ {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>📚 Government Job Terms — తెలుగు అర్థాలు</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {keyTerms.map((term, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>{term.en}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{term.te}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: '#FF9800', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 SarkariGPT ని తెలుగులో అడగండి</h3>
          <p style={{ color: '#fff3e0', fontSize: '14px', margin: '0 0 16px 0' }}>ఏ ప్రశ్నను అయినా తెలుగులో అడగండి — SSC, Railway, UPSC, TSPSC గురించి</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>తెలుగులో అడగండి →</a>
        </div>
      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}