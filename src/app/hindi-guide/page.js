export const metadata = {
  title: 'सरकारी नौकरी गाइड हिंदी में 2026 — SSC CGL, RRB NTPC, UPSC तैयारी | Sarkari Success',
  description: 'SSC CGL, RRB NTPC, UPSC, IBPS PO की पूरी जानकारी हिंदी में। Syllabus, eligibility, salary, preparation tips सब हिंदी में।',
  keywords: 'sarkari naukri guide hindi, SSC CGL hindi guide, RRB NTPC hindi, UPSC preparation hindi, government job hindi 2026',
};

const guides = [
  {
    title: 'SSC CGL क्या है? पूरी जानकारी हिंदी में',
    color: '#1e3a8a',
    link: '/ssc',
    content: [
      { q: 'SSC CGL क्या है?', a: 'SSC CGL (Combined Graduate Level) Staff Selection Commission द्वारा आयोजित परीक्षा है। यह Group B और C पदों के लिए होती है जैसे Income Tax Inspector, Auditor, Sub-Inspector आदि।' },
      { q: 'SSC CGL के लिए योग्यता क्या है?', a: 'किसी भी मान्यता प्राप्त विश्वविद्यालय से Graduation (किसी भी विषय में) आवश्यक है। आयु सीमा: 18-32 वर्ष। OBC को 3 वर्ष और SC/ST को 5 वर्ष की छूट।' },
      { q: 'SSC CGL में कितनी salary मिलती है?', a: 'SSC CGL में salary पद के अनुसार ₹25,500 से ₹1,51,100 प्रति माह होती है। Grade Pay 4200 पदों के लिए लगभग ₹67,000 प्रति माह in-hand मिलता है।' },
      { q: 'SSC CGL की तैयारी कैसे करें?', a: 'Maths और Reasoning पर सबसे ज़्यादा ध्यान दें क्योंकि इनका weightage 60% है। Daily 50 practice questions, weekly mock test और पिछले 5 साल के papers ज़रूर solve करें।' },
    ],
  },
  {
    title: 'RRB NTPC क्या है? पूरी जानकारी हिंदी में',
    color: '#0f766e',
    link: '/rrb',
    content: [
      { q: 'RRB NTPC क्या है?', a: 'RRB NTPC (Non-Technical Popular Categories) Railway Recruitment Board द्वारा आयोजित परीक्षा है। Junior Clerk, Station Master, Goods Guard जैसे पदों के लिए।' },
      { q: 'RRB NTPC के लिए योग्यता क्या है?', a: 'Graduate posts के लिए Graduation, 12th pass posts के लिए 12th pass। आयु सीमा: 18-33 वर्ष। OBC को 3 वर्ष और SC/ST को 5 वर्ष की छूट।' },
      { q: 'RRB NTPC में कितनी salary मिलती है?', a: 'Graduate posts: ₹35,400+ प्रति माह। 12th pass posts: ₹19,900+ प्रति माह। Railway में salary के साथ free travel, medical और quarters जैसी सुविधाएं भी मिलती हैं।' },
      { q: 'RRB NTPC की तैयारी कैसे करें?', a: 'General Awareness सबसे important है — 40 marks का होता है। Maths और Reasoning में basic concepts मजबूत करें। Current Affairs के लिए daily newspaper पढ़ें।' },
    ],
  },
  {
    title: 'UPSC Civil Services क्या है? IAS कैसे बनें?',
    color: '#7c3aed',
    link: '/upsc',
    content: [
      { q: 'UPSC Civil Services क्या है?', a: 'UPSC Civil Services भारत की सबसे prestigious परीक्षा है। इसमें IAS, IPS, IFS, IRS और 24 अन्य सेवाओं के लिए selection होता है।' },
      { q: 'IAS बनने के लिए क्या करें?', a: 'किसी भी विषय में Graduation के बाद UPSC Civil Services दे सकते हैं। 3 stage होते हैं: Prelims → Mains → Interview। General category को 6 attempts, age limit 32 वर्ष।' },
      { q: 'IAS की salary कितनी होती है?', a: 'IAS officer की starting salary ₹56,100 basic pay + DA + HRA + अन्य allowances = लगभग ₹85,000-1,00,000 प्रति माह in-hand।' },
      { q: 'UPSC की तैयारी कैसे करें?', a: 'पहले Class 6-12 की NCERT books पढ़ें। फिर standard books जैसे Laxmikant (Polity), Spectrum (History), Certificate Physical Geography पढ़ें। Daily newspaper और monthly current affairs magazine ज़रूरी है।' },
    ],
  },
  {
    title: 'Bank PO क्या है? IBPS/SBI PO की जानकारी',
    color: '#1e40af',
    link: '/banking',
    content: [
      { q: 'Bank PO क्या है?', a: 'Bank PO (Probationary Officer) bank में officer level की नौकरी है। IBPS और SBI हर साल हज़ारों PO की vacancy निकालते हैं।' },
      { q: 'Bank PO के लिए eligibility क्या है?', a: 'किसी भी stream में Graduation आवश्यक है। IBPS PO: age 20-30, SBI PO: age 21-30। Final year students भी apply कर सकते हैं।' },
      { q: 'Bank PO की salary कितनी है?', a: 'Bank PO की starting salary लगभग ₹52,000 प्रति माह in-hand होती है। इसमें Basic Pay, DA, HRA, CCA, Medical allowance शामिल हैं।' },
      { q: 'Bank PO की तैयारी कैसे करें?', a: 'Reasoning Ability और Quantitative Aptitude पर ज़्यादा ध्यान दें। English Language में Reading Comprehension important है। Banking Awareness के लिए monthly current affairs पढ़ें।' },
    ],
  },
];

export default function HindiGuidePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>सरकारी नौकरी गाइड — हिंदी में</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • Bank — सब कुछ हिंदी में समझें</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>India's First AI-Powered Sarkari Career Companion™</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {guides.map((guide, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            <div style={{ backgroundColor: guide.color, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: 0 }}>{guide.title}</h2>
              <a href={guide.link} style={{ color: 'white', fontSize: '13px', textDecoration: 'none', opacity: 0.8 }}>Jobs देखें →</a>
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

        {/* Key Terms */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>📚 Government Job English Terms — हिंदी में</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { en: 'Notification', hi: 'अधिसूचना — नई भर्ती की घोषणा' },
              { en: 'Vacancy', hi: 'रिक्ति — खाली पद की संख्या' },
              { en: 'Eligibility', hi: 'पात्रता — आवेदन के लिए ज़रूरी योग्यता' },
              { en: 'Syllabus', hi: 'पाठ्यक्रम — परीक्षा में आने वाले topics' },
              { en: 'Admit Card', hi: 'प्रवेश पत्र — परीक्षा में बैठने की permission' },
              { en: 'Merit List', hi: 'मेरिट सूची — marks के आधार पर selection list' },
              { en: 'Document Verification', hi: 'दस्तावेज़ सत्यापन — original documents की जाँच' },
              { en: 'Cutoff', hi: 'कटऑफ — selection के लिए minimum marks' },
              { en: 'Age Relaxation', hi: 'आयु में छूट — SC/ST/OBC को extra years' },
              { en: 'In-hand Salary', hi: 'हाथ में salary — tax के बाद मिलने वाली राशि' },
            ].map((term, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>{term.en}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{term.hi}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 SarkariGPT से हिंदी में पूछें</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>कोई भी सवाल हिंदी में पूछें — SSC, Railway, UPSC, Bank सब के बारे में</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>हिंदी में पूछें →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}