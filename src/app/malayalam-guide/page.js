export const metadata = {
  title: 'സർക്കാർ ജോലി ഗൈഡ് മലയാളത്തിൽ 2026 — SSC, Railway, UPSC, Kerala PSC | Sarkari Success',
  description: 'SSC CGL, RRB NTPC, UPSC, Kerala PSC സംബന്ധിച്ച് സമ്പൂർണ്ണ വിവരം മലയാളത്തിൽ.',
  keywords: 'government job guide malayalam, Kerala PSC guide, SSC CGL malayalam, sarkari naukri malayalam 2026',
};

const guides = [
  {
    title: 'Kerala PSC എന്താണ്? മലയാളത്തിൽ വിവരണം',
    color: '#4CAF50',
    content: [
      { q: 'Kerala PSC എന്താണ്?', a: 'Kerala Public Service Commission കേരള സർക്കാരിന്റെ Group A, B, C തസ്തികകളിലേക്ക് നിയമനം നടത്തുന്ന ഏജൻസിയാണ്. LD Clerk, LGS, Village Field Assistant, Police Constable തുടങ്ങിയ തസ്തികകൾ ഉൾപ്പെടുന്നു.' },
      { q: 'Kerala PSC യോഗ്യത എന്താണ്?', a: 'LD Clerk: 10+2, പ്രായം 18-39. LGS: 10th pass, പ്രായം 18-36. Village Field Assistant: Plus Two, പ്രായം 18-39. SC/ST/OBC ഉദ്യോഗാർത്ഥികൾക്ക് പ്രായ ഇളവ് ലഭ്യമാണ്.' },
      { q: 'Kerala PSC ൽ ശമ്പളം എത്ര?', a: 'LD Clerk: ₹19,000 അടിസ്ഥാന ശമ്പളം. Village Field Assistant: ₹22,200. Police Constable: ₹22,200. DA, HRA ചേർത്ത് മൊത്തം ₹35,000-50,000 ആകും.' },
      { q: 'Kerala PSC തയ്യാറെടുപ്പ് എങ്ങനെ?', a: 'Kerala history, culture, geography, current affairs വളരെ പ്രധാനം. General Knowledge, Maths, Mental Ability, English ഇവ focus ചെയ്യുക. Previous year questions തീർച്ചയായും practice ചെയ്യുക.' },
    ],
  },
  {
    title: 'SSC CGL എന്താണ്? മലയാളത്തിൽ വിവരണം',
    color: '#1e3a8a',
    content: [
      { q: 'SSC CGL എന്താണ്?', a: 'SSC CGL (Combined Graduate Level) Staff Selection Commission നടത്തുന്ന പരീക്ഷയാണ്. Income Tax Inspector, Auditor തുടങ്ങിയ Group B, C തസ്തികകൾക്ക്.' },
      { q: 'SSC CGL യോഗ്യത?', a: 'ഏതെങ്കിലും അംഗീകൃത സർവകലാശാലയിൽ നിന്ന് Graduation ആവശ്യമാണ്. പ്രായം: 18-32 വർഷം. OBC ക്ക് 3 വർഷം, SC/ST ക്ക് 5 വർഷം ഇളവ്.' },
      { q: 'SSC CGL ശമ്പളം?', a: 'SSC CGL ൽ ₹25,500 മുതൽ ₹1,51,100 വരെ പ്രതിമാസം. Grade Pay 4200 തസ്തികകളിൽ കൈയ്യിൽ ഏകദേശം ₹67,000 ലഭിക്കും.' },
      { q: 'SSC CGL തയ്യാറെടുപ്പ്?', a: 'Maths, Reasoning ഇവയ്ക്ക് കൂടുതൽ സമയം ചെലവഴിക്കുക — 60% weightage ഉണ്ട്. ദിവസം 50 practice questions, ആഴ്ചയിൽ ഒരു mock test.' },
    ],
  },
];

const keyTerms = [
  { en: 'Notification', ml: 'അറിയിപ്പ് — പുതിയ നിയമന പ്രഖ്യാപനം' },
  { en: 'Vacancy', ml: 'ഒഴിവ് — ഒഴിഞ്ഞ തസ്തികകളുടെ എണ്ണം' },
  { en: 'Eligibility', ml: 'യോഗ്യത — അപേക്ഷിക്കാൻ ആവശ്യമായ നിബന്ധനകൾ' },
  { en: 'Admit Card', ml: 'അഡ്മിറ്റ് കാർഡ് — പരീക്ഷയ്ക്ക് ഹാജരാകാൻ അനുമതി' },
  { en: 'Cutoff', ml: 'കട്ട് ഓഫ് — തിരഞ്ഞെടുപ്പിനുള്ള കുറഞ്ഞ മാർക്ക്' },
  { en: 'Merit List', ml: 'മെറിറ്റ് ലിസ്റ്റ് — മാർക്കിന്റെ അടിസ്ഥാനത്തിലുള്ള തിരഞ്ഞെടുപ്പ് പട്ടിക' },
  { en: 'Age Relaxation', ml: 'പ്രായ ഇളവ് — SC/ST/OBC ക്ക് അധിക വർഷങ്ങൾ' },
  { en: 'Document Verification', ml: 'രേഖ പരിശോധന — യഥാർത്ഥ രേഖകളുടെ പരിശോധന' },
];

export default function MalayalamGuidePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>
      <div style={{ backgroundColor: '#4CAF50', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>സർക്കാർ ജോലി ഗൈഡ് — മലയാളത്തിൽ</h1>
        <p style={{ color: '#e8f5e9', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • Kerala PSC — എല്ലാം മലയാളത്തിൽ</p>
        <p style={{ color: '#c8e6c9', fontSize: '13px', margin: 0 }}>കേരളം, കേന്ദ്ര സർക്കാർ ജോലി അവസരങ്ങളുടെ സമ്പൂർണ്ണ ഗൈഡ്</p>
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
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>📚 Government Job Terms — മലയാളം അർത്ഥം</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {keyTerms.map((term, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>{term.en}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{term.ml}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: '#4CAF50', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 SarkariGPT നോട് മലയാളത്തിൽ ചോദിക്കൂ</h3>
          <p style={{ color: '#e8f5e9', fontSize: '14px', margin: '0 0 16px 0' }}>ഏത് ചോദ്യവും മലയാളത്തിൽ ചോദിക്കൂ — SSC, Railway, UPSC, Kerala PSC കുറിച്ച്</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>മലയാളത്തിൽ ചോദിക്കൂ →</a>
        </div>
      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}