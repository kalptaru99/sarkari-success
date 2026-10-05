export const metadata = {
  title: 'Government Job Document Checklist 2026 — SSC, Railway, UPSC, Banking | Sarkari Success',
  description: 'Complete document checklist for government job applications 2026. SSC, RRB, UPSC, IBPS, SBI — know exactly which documents you need before applying.',
  keywords: 'government job documents list, SSC CGL documents required, RRB NTPC documents, UPSC documents checklist, IBPS PO documents 2026',
};

const commonDocs = [
  { doc: '10th Mark Sheet & Certificate', purpose: 'Age proof + Education proof', mandatory: true },
  { doc: '12th Mark Sheet & Certificate', purpose: 'Education qualification proof', mandatory: true },
  { doc: 'Graduation Degree/Mark Sheets', purpose: 'Higher education proof (if required)', mandatory: false },
  { doc: 'Aadhar Card', purpose: 'Identity proof', mandatory: true },
  { doc: 'PAN Card', purpose: 'Identity + Fee payment', mandatory: true },
  { doc: 'Passport Size Photographs', purpose: 'Application form + Documents', mandatory: true },
  { doc: 'Signature (on white paper)', purpose: 'Online application upload', mandatory: true },
  { doc: 'Caste Certificate (SC/ST/OBC)', purpose: 'Category reservation benefit', mandatory: false },
  { doc: 'EWS Certificate', purpose: 'Economic reservation benefit', mandatory: false },
  { doc: 'PwBD Certificate', purpose: 'Disability reservation benefit', mandatory: false },
  { doc: 'Domicile/Residence Certificate', purpose: 'State-level jobs', mandatory: false },
  { doc: 'Income Certificate', purpose: 'EWS/Fee exemption', mandatory: false },
  { doc: 'Ex-Serviceman Certificate', purpose: 'Ex-SM quota benefit', mandatory: false },
];

const examDocs = [
  {
    exam: 'SSC CGL/CHSL/MTS',
    color: '#1e3a8a',
    docs: [
      '10th Certificate (DOB proof)',
      '12th/Graduation mark sheets',
      'Aadhar Card',
      'Passport size photos (20+)',
      'Caste/Category certificate if applicable',
      'NOC from employer (if government employee)',
      'Ex-Serviceman discharge certificate (if applicable)',
    ],
    photoSpec: '4.5cm × 3.5cm, white background, recent',
    signSpec: 'On white paper with blue/black pen',
  },
  {
    exam: 'RRB NTPC/Group D/ALP',
    color: '#0f766e',
    docs: [
      '10th Certificate (DOB + Education proof)',
      'ITI Certificate (for Group D/ALP)',
      'Graduation certificate (for NTPC graduate posts)',
      'Aadhar Card',
      'Passport photos (white background)',
      'Caste certificate (SC/ST/OBC)',
      'Medical fitness certificate',
      'Character certificate',
    ],
    photoSpec: '4.5cm × 3.5cm, white background',
    signSpec: 'Black ink on white paper',
  },
  {
    exam: 'UPSC Civil Services',
    color: '#7c3aed',
    docs: [
      'Graduation degree/provisional certificate',
      '10th Certificate (DOB proof)',
      'Aadhar Card + Passport',
      'Caste certificate (if OBC/SC/ST)',
      'PWD certificate (if applicable)',
      'Age relaxation proof (if applicable)',
      'Passport photos (recent, white background)',
      'Signature scan',
    ],
    photoSpec: 'Recent, white background, 3.5cm × 4.5cm',
    signSpec: 'Black pen on white paper',
  },
  {
    exam: 'IBPS PO/Clerk/SBI PO',
    color: '#1e40af',
    docs: [
      'Graduation mark sheets (all semesters)',
      '10th + 12th certificates',
      'Aadhar Card + PAN Card',
      'Passport photos (10+)',
      'Caste certificate (SC/ST/OBC)',
      'Computer certificate (if required)',
      'NOC from current employer',
      'Experience certificate (if applicable)',
    ],
    photoSpec: '4.5cm × 3.5cm, light background',
    signSpec: 'Black ink, white paper',
  },
];

const photoTips = [
  'Photo must be recent (taken within 6 months)',
  'White or light background only',
  'Face should cover 70-80% of the photo',
  'No cap/hat (religious headwear allowed)',
  'Spectacles allowed in most exams',
  'File size usually 20KB-50KB (JPEG format)',
  'Dimensions: usually 3.5cm × 4.5cm or 200×230 pixels',
  'Keep 20-30 identical copies for document verification',
];

export default function DocumentChecklistPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Job Document Checklist 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • Banking — Know Exactly What Documents You Need</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>Save this page • Print the checklist • Never miss a document</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Common Documents */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📋 Common Documents for All Government Jobs</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          {commonDocs.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < commonDocs.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <span style={{ fontSize: '20px' }}>{item.mandatory ? '✅' : '📌'}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 2px 0' }}>{item.doc}</p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{item.purpose}</p>
              </div>
              <span style={{ backgroundColor: item.mandatory ? '#dcfce7' : '#fef9c3', color: item.mandatory ? '#16a34a' : '#ca8a04', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                {item.mandatory ? 'Mandatory' : 'If Applicable'}
              </span>
            </div>
          ))}
        </div>

        {/* Exam Specific */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📝 Exam-Specific Document Requirements</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {examDocs.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: `4px solid ${exam.color}` }}>
              <h3 style={{ color: exam.color, fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>📌 {exam.exam}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {exam.docs.map((doc, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>
                    <p style={{ color: '#374151', fontSize: '13px', margin: 0 }}>{doc}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>📸 Photo: {exam.photoSpec}</p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>✍️ Sign: {exam.signSpec}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Tips */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📸 Passport Photo Tips for Government Applications</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {photoTips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: '#1e3a8a', flexShrink: 0 }}>💡</span>
                <p style={{ color: '#374151', fontSize: '13px', margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions</h2>
          {[
            { q: 'What documents are needed for SSC CGL?', a: '10th certificate (DOB proof), 12th/graduation mark sheets, Aadhar card, passport photos, caste certificate (if applicable). Keep self-attested copies of all documents.' },
            { q: 'Is Aadhar card mandatory for government job applications?', a: 'Yes, Aadhar card is mandatory for most government job applications as identity proof. Some exams also accept Passport, Voter ID or Driving License as alternative ID.' },
            { q: 'How many passport photos should I keep?', a: 'Keep at least 20-30 identical passport photos. Government job applications require photos at multiple stages — online application, admit card, exam center, document verification.' },
            { q: 'What is a self-attested copy?', a: 'A self-attested copy is a photocopy of your document where you write "Self-Attested" and sign below it. This is required for most government job document submissions.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Questions about documents?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Ask SarkariGPT — get document guidance for any exam in Hindi & English</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}