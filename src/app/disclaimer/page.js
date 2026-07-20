export default function Disclaimer() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Back to Home</a>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

          <h1 style={{ color: '#1e3a8a', fontSize: '28px', margin: '0 0 8px 0' }}>Disclaimer</h1>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '32px' }}>Last updated: July 2026</p>

          <div style={{ backgroundColor: '#fee2e2', borderRadius: '8px', padding: '16px', marginBottom: '24px', border: '1px solid #fca5a5' }}>
            <p style={{ color: '#dc2626', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '15px' }}>⚠️ Important Notice</p>
            <p style={{ color: '#7f1d1d', margin: 0, fontSize: '14px' }}>Sarkari Success (sarkarisuccess.com) is NOT an official government website. We are an independent AI-powered career guidance platform. Always verify information from official government sources.</p>
          </div>

          {[
            {
              title: "1. Not an Official Government Website",
              content: "Sarkari Success (sarkarisuccess.com) is an independent, privately operated educational and career guidance platform. We are not affiliated with, endorsed by, or connected to any government department, ministry, or official body of India including but not limited to SSC, UPSC, Railway Recruitment Boards, IBPS, SBI, or any State Public Service Commission."
            },
            {
              title: "2. Information Purpose Only",
              content: "All information published on Sarkari Success including job notifications, exam results, admit card updates, cutoff marks, syllabus details, and exam patterns is provided for general informational and educational purposes only. This information is sourced from official government websites and public domain sources but may not always be current, complete, or accurate."
            },
            {
              title: "3. Verify from Official Sources",
              content: "Users are strongly advised to verify all information from the respective official government websites before making any decisions including applying for jobs, appearing for examinations, or taking any career-related action. Official sources include ssc.gov.in, upsc.gov.in, indianrailways.gov.in, ibps.in, and respective state PSC websites."
            },
            {
              title: "4. AI-Generated Content",
              content: "Sarkari Success uses artificial intelligence including SarkariGPT, AI Selection Coach, AI Daily Mission, AI Revision Planner, AI Rank Predictor, and AI Selection DNA. All AI-generated content is for guidance purposes only. AI responses may contain errors, outdated information, or inaccuracies. Do not rely solely on AI-generated content for critical career decisions."
            },
            {
              title: "5. No Guarantee of Selection",
              content: "Sarkari Success does not guarantee selection, employment, or success in any government examination. Our AI tools including Selection Probability scores and Rank Predictions are estimates based on available data and are not guarantees of actual results. Actual results depend on many factors beyond our control."
            },
            {
              title: "6. External Links",
              content: "Sarkari Success may contain links to external government websites and third-party resources. We are not responsible for the content, accuracy, or availability of these external websites. Links to official government portals are provided for convenience only."
            },
            {
              title: "7. Mock Tests and Question Bank",
              content: "Mock tests and questions on Sarkari Success are for practice purposes only. They are not official exam papers and do not represent actual examination questions. Performance on our platform does not predict actual examination performance."
            },
            {
              title: "8. Changes to This Disclaimer",
              content: "Sarkari Success reserves the right to update this disclaimer at any time without prior notice. Continued use of our platform after changes constitutes acceptance of the updated disclaimer."
            },
            {
              title: "9. Contact Us",
              content: "If you find any incorrect information on our platform, please report it immediately."
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>{section.title}</h2>
              <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{section.content}</p>
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>10. Contact for Wrong Information</h2>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              To report incorrect information or for any disclaimer-related queries, contact us at <strong style={{ color: '#dc2626' }}>contact.sarkarisuccess@gmail.com</strong>
            </p>
          </div>

        </div>
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}