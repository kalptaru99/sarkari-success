export const metadata = {
  title: 'सरकारी नोकरी मार्गदर्शन मराठीत 2026 — SSC, Railway, UPSC, MPSC | Sarkari Success',
  description: 'SSC CGL, RRB NTPC, UPSC, MPSC बद्दल संपूर्ण माहिती मराठीत. Syllabus, eligibility, salary सर्व मराठीत.',
  keywords: 'government job guide marathi, MPSC guide marathi, SSC CGL marathi, RRB NTPC marathi, sarkari naukri marathi 2026',
};

const guides = [
  {
    title: 'MPSC म्हणजे काय? मराठीत संपूर्ण माहिती',
    color: '#2196F3',
    content: [
      { q: 'MPSC म्हणजे काय?', a: 'MPSC (Maharashtra Public Service Commission) महाराष्ट्र राज्य सरकारच्या Group A, B, C पदांसाठी परीक्षा घेते. Deputy Collector, DSP, Revenue Officer अशा पदांसाठी.' },
      { q: 'MPSC साठी पात्रता काय?', a: 'Rajyaseva: Graduation आवश्यक, वय 19-38. Group B: Graduation, वय 18-38. Group C: 12th pass, वय 18-38. SC/ST/OBC उमेदवारांना वयात सूट मिळते.' },
      { q: 'MPSC मध्ये पगार किती?', a: 'Rajyaseva (Deputy Collector): ₹56,100 मूळ वेतन. सर्व allowances मिळून महिना ₹80,000-95,000. Group C: ₹19,500 मूळ वेतन.' },
      { q: 'MPSC तयारी कशी करावी?', a: 'Maharashtra इतिहास, भूगोल, संस्कृती आणि current affairs खूप महत्त्वाचे आहेत. NCERT books वाचा. मागील वर्षांचे प्रश्न जरूर सोडवा.' },
    ],
  },
  {
    title: 'SSC CGL म्हणजे काय? मराठीत विवरण',
    color: '#1e3a8a',
    content: [
      { q: 'SSC CGL म्हणजे काय?', a: 'SSC CGL (Combined Graduate Level) ही Staff Selection Commission ची परीक्षा आहे. Income Tax Inspector, Auditor यासारख्या Group B आणि C पदांसाठी.' },
      { q: 'SSC CGL पात्रता?', a: 'कोणत्याही शाखेतून Graduation आवश्यक. वय: 18-32 वर्षे. OBC ला 3 वर्षे आणि SC/ST ला 5 वर्षे वयात सूट.' },
      { q: 'SSC CGL पगार किती?', a: 'SSC CGL मध्ये ₹25,500 ते ₹1,51,100 महिना. Grade Pay 4200 पदांवर हातात सुमारे ₹67,000 मिळतात.' },
      { q: 'SSC CGL तयारी?', a: 'Maths आणि Reasoning ला जास्त वेळ द्या — 60% weightage आहे. रोज 50 practice questions, आठवड्यातून एक mock test.' },
    ],
  },
  {
    title: 'RRB NTPC म्हणजे काय? Railway नोकरी मार्गदर्शन',
    color: '#0f766e',
    content: [
      { q: 'RRB NTPC म्हणजे काय?', a: 'RRB NTPC ही Railway Recruitment Board ची परीक्षा आहे. Junior Clerk, Station Master, Goods Guard यासारख्या पदांसाठी.' },
      { q: 'RRB NTPC पात्रता?', a: 'Graduate posts साठी Graduation, 12th pass posts साठी 12th pass. वय: 18-33 वर्षे.' },
      { q: 'Railway पगार किती?', a: 'Graduate posts: ₹35,400+ महिना. 12th pass posts: ₹19,900+ महिना. मोफत प्रवास, वैद्यकीय सुविधा आणि घर यासारख्या सुविधाही.' },
      { q: 'RRB NTPC तयारी?', a: 'General Awareness सर्वात महत्त्वाचे — 40 marks. Maths आणि Reasoning मध्ये basic concepts मजबूत करा.' },
    ],
  },
];

const keyTerms = [
  { en: 'Notification', mr: 'जाहिरात — नवीन भरतीची घोषणा' },
  { en: 'Vacancy', mr: 'रिक्त पद — रिकाम्या जागांची संख्या' },
  { en: 'Eligibility', mr: 'पात्रता — अर्ज करण्यासाठी आवश्यक अटी' },
  { en: 'Admit Card', mr: 'प्रवेशपत्र — परीक्षेला बसण्याची परवानगी' },
  { en: 'Cutoff', mr: 'कटऑफ — निवडीसाठी किमान गुण' },
  { en: 'Merit List', mr: 'गुणवत्ता यादी — गुणांच्या आधारे निवड यादी' },
  { en: 'Age Relaxation', mr: 'वयात सूट — SC/ST/OBC ला अतिरिक्त वर्षे' },
  { en: 'Document Verification', mr: 'कागदपत्र पडताळणी — मूळ कागदपत्रांची तपासणी' },
];

export default function MarathiGuidePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>
      <div style={{ backgroundColor: '#2196F3', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>सरकारी नोकरी मार्गदर्शन — मराठीत</h1>
        <p style={{ color: '#e3f2fd', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • MPSC — सर्व माहिती मराठीत</p>
        <p style={{ color: '#bbdefb', fontSize: '13px', margin: 0 }}>महाराष्ट्र आणि केंद्र सरकारी नोकऱ्यांचे संपूर्ण मार्गदर्शन</p>
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
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>📚 Government Job Terms — मराठी अर्थ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {keyTerms.map((term, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>{term.en}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{term.mr}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: '#2196F3', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 SarkariGPT ला मराठीत विचारा</h3>
          <p style={{ color: '#e3f2fd', fontSize: '14px', margin: '0 0 16px 0' }}>कोणताही प्रश्न मराठीत विचारा — SSC, Railway, UPSC, MPSC बद्दल</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>मराठीत विचारा →</a>
        </div>
      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}