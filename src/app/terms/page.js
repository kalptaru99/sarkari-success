export default function TermsOfService() {
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

          <h1 style={{ color: '#1e3a8a', fontSize: '28px', margin: '0 0 8px 0' }}>Terms of Service</h1>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '32px' }}>Last updated: July 2026</p>

          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing and using Sarkari Success (sarkarisuccess.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website."
            },
            {
              title: "2. Description of Service",
              content: "Sarkari Success provides government job notifications, exam results, admit card updates, mock tests, question banks, and AI-powered career guidance through SarkariGPT. Our services are intended to help aspirants prepare for and track government job opportunities in India."
            },
            {
              title: "3. Accuracy of Information",
              content: "We strive to provide accurate and up-to-date information sourced from official government websites. However, Sarkari Success does not guarantee the accuracy, completeness, or timeliness of any information. Users are advised to verify all information from official government sources before making any decisions."
            },
            {
              title: "4. User Accounts",
              content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to update it as necessary. Sarkari Success reserves the right to terminate accounts that violate these terms."
            },
            {
              title: "5. SarkariGPT AI Service",
              content: "SarkariGPT is an AI-powered chatbot that provides information about government exams. While we strive for accuracy, AI responses may contain errors. Do not rely solely on SarkariGPT for critical decisions. Always verify information from official sources."
            },
            {
              title: "6. Mock Tests and Question Bank",
              content: "Mock tests and questions on Sarkari Success are for practice purposes only. They are not official exam papers. Performance on our mock tests does not guarantee similar performance in actual government examinations."
            },
            {
              title: "7. Intellectual Property",
              content: "All content on Sarkari Success including text, graphics, logos, and AI-generated content is the property of Sarkari Success. Government exam data is sourced from public domain official websites. Unauthorized reproduction of our proprietary content is prohibited."
            },
            {
              title: "8. Prohibited Activities",
              content: "You agree not to use Sarkari Success for any unlawful purpose, to attempt to hack or disrupt our services, to scrape our data without permission, to post false or misleading information, or to violate any applicable laws."
            },
            {
              title: "9. Limitation of Liability",
              content: "Sarkari Success shall not be liable for any direct, indirect, or consequential damages arising from the use of our services. We are not responsible for decisions made based on information provided on our platform."
            },
            {
              title: "10. Changes to Terms",
              content: "We reserve the right to modify these Terms of Service at any time. Continued use of Sarkari Success after changes constitutes acceptance of the updated terms. We will notify registered users of significant changes via email."
            },
            {
              title: "11. Governing Law",
              content: "These Terms of Service are governed by the laws of India. Any disputes arising from the use of Sarkari Success shall be subject to the jurisdiction of courts in India."
            },
            {
              title: "12. Contact",
              content: "For questions about these Terms of Service, contact us at support@sarkarisuccess.com."
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>{section.title}</h2>
              <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{section.content}</p>
            </div>
          ))}

        </div>
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}