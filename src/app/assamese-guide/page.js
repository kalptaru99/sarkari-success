export const metadata = {
  title: 'চৰকাৰী চাকৰি গাইড অসমীয়াত 2026 — SSC, Railway, UPSC, APSC | Sarkari Success',
  description: 'SSC CGL, RRB NTPC, UPSC, APSC সম্পৰ্কে সম্পূৰ্ণ তথ্য অসমীয়াত।',
  keywords: 'government job guide assamese, APSC guide assamese, SSC CGL assamese, sarkari naukri assamese 2026',
};

const guides = [
  {
    title: 'APSC কি? অসমীয়াত সম্পূৰ্ণ তথ্য',
    color: '#3F51B5',
    content: [
      { q: 'APSC কি?', a: 'APSC (Assam Public Service Commission) অসম ৰাজ্য চৰকাৰৰ Group A আৰু B পদৰ বাবে ACS, APS আৰু অন্যান্য প্ৰতিযোগিতামূলক পৰীক্ষা পৰিচালনা কৰে।' },
      { q: 'APSC ৰ যোগ্যতা কি?', a: 'যিকোনো বিষয়ত Graduation। বয়স সীমা: ২১-৩৮ বছৰ (General)। SC/ST/OBC প্ৰাৰ্থীসকলৰ বাবে বয়সত ৰেহাই আছে।' },
      { q: 'APSC ত দৰমহা কিমান?', a: 'ACS Officer ৰ আৰম্ভণি দৰমহা ₹৫৬,১০০ মূল দৰমহা। সকলো allowances মিলাই মাহে ₹৭৫,০০০-৯০,০০০।' },
      { q: 'APSC ৰ প্ৰস্তুতি কেনেকৈ?', a: 'অসমৰ ইতিহাস, ভূগোল, সংস্কৃতি আৰু current affairs অতি গুৰুত্বপূৰ্ণ। NCERT কিতাপবোৰ পঢ়ক। আগৰ বছৰৰ প্ৰশ্নবোৰ অৱশ্যে সমাধান কৰক।' },
    ],
  },
  {
    title: 'SSC CGL কি? অসমীয়াত বিৱৰণ',
    color: '#1e3a8a',
    content: [
      { q: 'SSC CGL কি?', a: 'SSC CGL (Combined Graduate Level) হৈছে Staff Selection Commission ৰ পৰীক্ষা। Income Tax Inspector, Auditor আদি Group B আৰু C পদৰ বাবে।' },
      { q: 'SSC CGL যোগ্যতা?', a: 'যিকোনো স্বীকৃত বিশ্ববিদ্যালয়ৰ পৰা Graduation প্ৰয়োজন। বয়স: ১৮-৩২ বছৰ। OBC ৰ বাবে ৩ বছৰ, SC/ST ৰ বাবে ৫ বছৰ ৰেহাই।' },
      { q: 'SSC CGL দৰমহা কিমান?', a: 'SSC CGL ত ₹২৫,৫০০ ৰ পৰা ₹১,৫১,১০০ মাহে। Grade Pay 4200 পদত হাতত প্ৰায় ₹৬৭,০০০ পোৱা যায়।' },
      { q: 'RRB NTPC কি?', a: 'RRB NTPC হৈছে Railway Recruitment Board ৰ পৰীক্ষা। Junior Clerk, Station Master আদি পদৰ বাবে। দৰমহা ₹৩৫,৪০০+ মাহে।' },
    ],
  },
];

const keyTerms = [
  { en: 'Notification', as: 'জাননী — নতুন নিযুক্তিৰ ঘোষণা' },
  { en: 'Vacancy', as: 'শূন্যপদ — খালি পদৰ সংখ্যা' },
  { en: 'Eligibility', as: 'যোগ্যতা — আবেদন কৰিবলৈ প্ৰয়োজনীয় চৰ্ত' },
  { en: 'Admit Card', as: 'প্ৰৱেশ পত্ৰ — পৰীক্ষাত বহিবলৈ অনুমতি' },
  { en: 'Cutoff', as: 'কাটঅফ — বাছনিৰ বাবে নূন্যতম নম্বৰ' },
  { en: 'Merit List', as: 'মেৰিট তালিকা — নম্বৰৰ ভিত্তিত বাছনি তালিকা' },
  { en: 'Age Relaxation', as: 'বয়সত ৰেহাই — SC/ST/OBC ৰ বাবে অতিৰিক্ত বছৰ' },
  { en: 'Document Verification', as: 'নথিপত্ৰ যাচাই — আচল নথিপত্ৰৰ পৰীক্ষা' },
];

export default function AssameseGuidePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>
      <div style={{ backgroundColor: '#3F51B5', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>চৰকাৰী চাকৰি গাইড — অসমীয়াত</h1>
        <p style={{ color: '#e8eaf6', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • APSC — সকলো অসমীয়াত</p>
        <p style={{ color: '#c5cae9', fontSize: '13px', margin: 0 }}>অসম আৰু কেন্দ্ৰীয় চৰকাৰী চাকৰিৰ সম্পূৰ্ণ গাইড</p>
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
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>📚 Government Job Terms — অসমীয়া অৰ্থ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {keyTerms.map((term, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>{term.en}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{term.as}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: '#3F51B5', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 SarkariGPT ক অসমীয়াত সোধক</h3>
          <p style={{ color: '#e8eaf6', fontSize: '14px', margin: '0 0 16px 0' }}>যিকোনো প্ৰশ্ন অসমীয়াত সোধক — SSC, Railway, UPSC, APSC সম্পৰ্কে</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>অসমীয়াত সোধক →</a>
        </div>
      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}