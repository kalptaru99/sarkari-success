/**
 * /hindi — Hindi language landing page
 * Targets Hindi-language searches: "सरकारी नौकरी", "govt job 2026 hindi", etc.
 * SEO: Hindi keywords in title/description, structured data, hreflang
 */

import Link from 'next/link';

export const metadata = {
  title: 'सरकारी नौकरी 2026 — Latest Govt Jobs in Hindi | Sarkari Success',
  description: 'सरकारी नौकरी 2026 की पूरी जानकारी हिंदी में। SSC, Railway, Bank, UPSC, State PSC की नई भर्ती, पात्रता, सिलेबस और परीक्षा तिथि जानें। Sarkari Success पर रोज अपडेट।',
  keywords: 'सरकारी नौकरी 2026, sarkari naukri 2026, govt job hindi, railway bharti, SSC bharti, bank job hindi, UPSC vacancy',
  alternates: {
    canonical: 'https://sarkarisuccess.com/hindi',
    languages: {
      'hi': 'https://sarkarisuccess.com/hindi',
      'en': 'https://sarkarisuccess.com',
    },
  },
  openGraph: {
    title: 'सरकारी नौकरी 2026 — Latest Govt Jobs in Hindi',
    description: 'SSC, Railway, Bank, UPSC सरकारी नौकरी की ताज़ा जानकारी। रोज़ अपडेट, फ्री अलर्ट।',
    url: 'https://sarkarisuccess.com/hindi',
    type: 'website',
  },
};

const CATEGORIES = [
  { icon: '🚂', hindi: 'रेलवे भर्ती', english: 'Railway', slug: 'railway', desc: 'RRB NTPC, Group D, ALP, RPF — लाखों पद' },
  { icon: '📋', hindi: 'SSC भर्ती', english: 'SSC', slug: 'ssc', desc: 'CGL, CHSL, MTS, GD Constable' },
  { icon: '🏦', hindi: 'बैंक भर्ती', english: 'Banking', slug: 'banking', desc: 'IBPS PO, Clerk, SBI, RBI' },
  { icon: '🎖️', hindi: 'सेना भर्ती', english: 'Defence', slug: 'defence', desc: 'Army, Navy, Air Force, CRPF, BSF' },
  { icon: '📚', hindi: 'शिक्षक भर्ती', english: 'Teaching', slug: 'teaching', desc: 'TET, CTET, KVS, NVS, State TET' },
  { icon: '⚕️', hindi: 'स्वास्थ्य विभाग', english: 'Health', slug: 'health', desc: 'AIIMS, ESIC, Nursing, ANM, GNM' },
  { icon: '👮', hindi: 'पुलिस भर्ती', english: 'Police', slug: 'police', desc: 'State Police, SSB, ITBP, CISF' },
  { icon: '🏛️', hindi: 'UPSC भर्ती', english: 'UPSC', slug: 'upsc', desc: 'IAS, IPS, Civil Services' },
];

const FAQ = [
  {
    q: 'सरकारी नौकरी के लिए न्यूनतम योग्यता क्या है?',
    a: 'यह पद के अनुसार अलग-अलग होती है। 10वीं पास के लिए Group D और Constable पद उपलब्ध हैं। 12वीं पास के लिए SSC CHSL, Railway Clerk। ग्रेजुएट के लिए SSC CGL, IBPS PO, UPSC जैसे बड़े पद हैं।',
  },
  {
    q: 'सरकारी नौकरी का फॉर्म कैसे भरें?',
    a: '1. आधिकारिक वेबसाइट पर जाएं (हम हर job page पर link देते हैं)। 2. Online Registration करें। 3. Documents upload करें (फोटो, हस्ताक्षर, प्रमाण पत्र)। 4. Application Fee जमा करें। 5. Form submit करें और Print लें।',
  },
  {
    q: 'क्या SarkariGPT हिंदी में जवाब देता है?',
    a: 'हाँ! SarkariGPT से हिंदी में सवाल पूछें — पात्रता, सिलेबस, परीक्षा pattern, तैयारी tips — सब हिंदी में जवाब मिलेगा।',
  },
  {
    q: 'नई सरकारी नौकरी का अलर्ट कैसे पाएं?',
    a: 'Sarkari Success पर Email Alert subscribe करें या Telegram Channel join करें। हर नई भर्ती का नोटिफिकेशन तुरंत मिलेगा — बिल्कुल मुफ्त।',
  },
];

const STEPS = [
  { step: '1', hindi: 'नोटिफिकेशन पढ़ें', desc: 'आधिकारिक notification PDF ध्यान से पढ़ें — पात्रता, fee, dates सब नोट करें' },
  { step: '2', hindi: 'पात्रता जाँचें', desc: 'Age, education, category के हिसाब से confirm करें कि आप eligible हैं' },
  { step: '3', hindi: 'Documents तैयार करें', desc: 'Photo, signature, 10th/12th marksheet, ID proof scan करके रखें' },
  { step: '4', hindi: 'Online Form भरें', desc: 'आधिकारिक website पर जाएं, registration करें, form भरें, fee pay करें' },
  { step: '5', hindi: 'Admit Card डाउनलोड करें', desc: 'Exam date से पहले आधिकारिक site से Admit Card download करें' },
  { step: '6', hindi: 'परीक्षा दें', desc: 'Exam centre पर समय से पहले पहुँचें, Admit Card और ID proof साथ लाएं' },
];

export default function HindiPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, "Noto Sans Devanagari", sans-serif' }}>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "सरकारी नौकरी 2026 — Latest Govt Jobs in Hindi",
            "description": "सरकारी नौकरी 2026 की पूरी जानकारी हिंदी में। SSC, Railway, Bank, UPSC की नई भर्ती।",
            "url": "https://sarkarisuccess.com/hindi",
            "inLanguage": "hi",
            "publisher": {
              "@type": "Organization",
              "name": "Sarkari Success",
              "url": "https://sarkarisuccess.com",
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sarkarisuccess.com" },
                { "@type": "ListItem", "position": 2, "name": "सरकारी नौकरी", "item": "https://sarkarisuccess.com/hindi" },
              ],
            },
          }),
        }}
      />

      {/* Nav */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '14px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <Link href="/" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
          </Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#93c5fd', fontSize: '13px', textDecoration: 'none' }}>Latest Jobs</Link>
            <Link href="/sarkarigpt" style={{ color: '#93c5fd', fontSize: '13px', textDecoration: 'none' }}>SarkariGPT</Link>
            <a href="https://t.me/sarkarisuccess" target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', fontSize: '13px', textDecoration: 'none' }}>✈️ Telegram</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #b45309, #f97316)', color: 'white', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏛️</div>
        <h1 style={{ margin: '0 0 12px', fontSize: '36px', fontWeight: '800', lineHeight: '1.2' }}>
          सरकारी नौकरी 2026
        </h1>
        <p style={{ margin: '0 0 6px', fontSize: '18px', opacity: 0.9 }}>
          Latest Government Jobs in Hindi — हिंदी में जानकारी
        </p>
        <p style={{ margin: '0 0 28px', fontSize: '14px', opacity: 0.8 }}>
          SSC · Railway · Bank · UPSC · Defence · Teaching · Police
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ display: 'inline-block', backgroundColor: 'white', color: '#b45309', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>
            🔍 सभी नौकरियाँ देखें
          </Link>
          <Link href="/sarkarigpt" style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', border: '1px solid rgba(255,255,255,0.4)' }}>
            🤖 SarkariGPT से पूछें
          </Link>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '14px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            '✅ रोज़ नई नौकरियाँ',
            '📡 आधिकारिक स्रोत',
            '🔔 फ्री अलर्ट',
            '🤖 हिंदी AI सहायक',
            '🔒 कोई फीस नहीं',
          ].map((t, i) => (
            <span key={i} style={{ fontSize: '13px', color: '#374151', fontWeight: '600' }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Category grid */}
        <h2 style={{ color: '#1e3a8a', margin: '0 0 20px', fontSize: '22px', fontWeight: '800' }}>
          📂 विभाग के अनुसार नौकरियाँ
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '44px' }}>
          {CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              href={`/?category=${cat.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cat.icon}</div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: '#1e3a8a', marginBottom: '2px' }}>{cat.hindi}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>{cat.english}</div>
                <div style={{ fontSize: '12px', color: '#374151' }}>{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* SarkariGPT promo */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', borderRadius: '16px', padding: '32px', color: 'white', marginBottom: '44px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤖</div>
          <h2 style={{ margin: '0 0 10px', fontSize: '22px', fontWeight: '800' }}>SarkariGPT — हिंदी AI सहायक</h2>
          <p style={{ margin: '0 0 8px', fontSize: '15px', opacity: 0.9 }}>
            सरकारी नौकरी से जुड़ा कोई भी सवाल हिंदी में पूछें — पात्रता, सिलेबस, तैयारी कैसे करें
          </p>
          <p style={{ margin: '0 0 20px', fontSize: '13px', opacity: 0.7 }}>
            जैसे: "SSC CGL के लिए क्या पढ़ें?" · "Railway Group D में age limit क्या है?" · "मेरे लिए कौन सी नौकरी सही है?"
          </p>
          <Link href="/sarkarigpt" style={{ display: 'inline-block', backgroundColor: '#f97316', color: 'white', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>
            हिंदी में पूछें →
          </Link>
        </div>

        {/* Alert CTA */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', marginBottom: '44px' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 8px', fontSize: '20px', fontWeight: '800' }}>🔔 नई नौकरी का अलर्ट पाएं — बिल्कुल मुफ्त</h2>
          <p style={{ color: '#374151', margin: '0 0 20px', fontSize: '14px', lineHeight: '1.7' }}>
            Sarkari Success पर हर दिन नई सरकारी नौकरियाँ अपडेट होती हैं। Email या Telegram से अलर्ट subscribe करें और कोई भी भर्ती miss न करें।
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/?subscribe=1" style={{ display: 'inline-block', backgroundColor: '#f97316', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
              📧 Email Alert Subscribe करें
            </Link>
            <a href="https://t.me/sarkarisuccess" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#0088cc', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
              ✈️ Telegram Channel Join करें
            </a>
          </div>
        </div>

        {/* Step-by-step guide */}
        <h2 style={{ color: '#1e3a8a', margin: '0 0 20px', fontSize: '22px', fontWeight: '800' }}>
          📋 सरकारी नौकरी Form कैसे भरें — Step by Step
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '44px' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <div style={{ backgroundColor: '#f97316', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
                {s.step}
              </div>
              <div>
                <div style={{ fontWeight: '800', color: '#1e3a8a', fontSize: '15px', marginBottom: '2px' }}>{s.hindi}</div>
                <div style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.6' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ — SEO content */}
        <h2 style={{ color: '#1e3a8a', margin: '0 0 20px', fontSize: '22px', fontWeight: '800' }}>
          ❓ अक्सर पूछे जाने वाले सवाल (FAQ)
        </h2>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQ.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a },
              })),
            }),
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '44px' }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ margin: '0 0 8px', color: '#1e3a8a', fontSize: '15px', fontWeight: '800' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#374151', fontSize: '14px', lineHeight: '1.7' }}>{f.a}</p>
            </div>
          ))}
        </div>

        {/* Popular searches — internal links */}
        <h2 style={{ color: '#1e3a8a', margin: '0 0 16px', fontSize: '22px', fontWeight: '800' }}>
          🔍 लोकप्रिय खोजें
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '44px' }}>
          {[
            { label: 'SSC CGL 2026', href: '/?q=SSC+CGL' },
            { label: 'Railway NTPC भर्ती', href: '/?q=Railway+NTPC' },
            { label: 'IBPS PO 2026', href: '/?q=IBPS+PO' },
            { label: 'UP Police भर्ती', href: '/?q=UP+Police' },
            { label: 'UPSC Civil Services', href: '/?q=UPSC' },
            { label: 'Army Bharti 2026', href: '/?q=Army' },
            { label: '10वीं पास नौकरी', href: '/?q=10th+pass' },
            { label: '12वीं पास नौकरी', href: '/?q=12th+pass' },
            { label: 'महिलाओं के लिए नौकरी', href: '/?q=women' },
            { label: 'CTET 2026', href: '/?q=CTET' },
            { label: 'State PSC भर्ती', href: '/?category=psc' },
            { label: 'Bank Clerk 2026', href: '/?q=Bank+Clerk' },
          ].map((tag, i) => (
            <Link key={i} href={tag.href} style={{ display: 'inline-block', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 14px', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', border: '1px solid #bfdbfe' }}>
              {tag.label}
            </Link>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '28px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
            <Link href="/hindi" style={{ color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>हिंदी</Link>
            <Link href="/sarkarigpt" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '13px' }}>SarkariGPT</Link>
            <Link href="/trust" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '13px' }}>Trust Center</Link>
            <a href="https://t.me/sarkarisuccess" target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '13px' }}>Telegram</a>
            <a href="mailto:contact.sarkarisuccess@gmail.com" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
          </div>
          <p style={{ margin: 0, opacity: 0.6, fontSize: '12px' }}>
            © 2026 Sarkari Success. किसी भी सरकारी विभाग से संबद्ध नहीं। Not affiliated with any government department.
          </p>
        </div>
      </footer>
    </main>
  );
}
