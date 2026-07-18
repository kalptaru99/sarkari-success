export default function PrivacyPolicy() {
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

          <h1 style={{ color: '#1e3a8a', fontSize: '28px', margin: '0 0 8px 0' }}>Privacy Policy</h1>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '32px' }}>Last updated: July 2026</p>

          {[
            {
              title: "1. Information We Collect",
              content: "We collect information you provide when registering on Sarkari Success, including your name, email address, and password. We also collect usage data such as pages visited, mock test scores, and search queries to improve our services."
            },
            {
              title: "2. How We Use Your Information",
              content: "We use your information to provide personalized government job notifications, track your mock test progress, send relevant exam alerts, and improve our AI-powered features including SarkariGPT."
            },
            {
              title: "3. Data Storage",
              content: "Your data is stored securely on encrypted servers. Passwords are hashed using bcrypt encryption and are never stored in plain text. We use Neon PostgreSQL database hosted on AWS infrastructure."
            },
            {
              title: "4. Cookies",
              content: "We use cookies and session storage to keep you logged in and remember your preferences. We also use Google Analytics cookies to understand how visitors use our website. You can disable cookies in your browser settings."
            },
            {
              title: "5. Third Party Services",
              content: "We use Google Analytics for traffic analysis, Anthropic Claude API for SarkariGPT, and Vercel for hosting. These services have their own privacy policies. We do not sell your personal data to any third parties."
            },
            {
              title: "6. Government Job Data",
              content: "All government job notifications, results, and exam information published on Sarkari Success is sourced from official government websites including ssc.gov.in, upsc.gov.in, indianrailways.gov.in, and ibps.in. We verify data accuracy but recommend checking official websites for final confirmation."
            },
            {
              title: "7. Your Rights",
              content: "You have the right to access, update, or delete your personal data at any time. You can delete your account by contacting us at contact.sarkarisuccess@gmail.com. We will process your request within 7 business days."
            },
            {
              title: "8. Children's Privacy",
              content: "Sarkari Success is intended for users aged 18 and above who are eligible to apply for government jobs in India. We do not knowingly collect data from children under 18."
            },
            {
              title: "9. Changes to This Policy",
              content: "We may update this Privacy Policy from time to time. We will notify registered users of significant changes via email. Continued use of Sarkari Success after changes constitutes acceptance of the updated policy."
            },
            {
              title: "10. Contact Us",
              content: "For privacy-related queries, contact us at contact.sarkarisuccess@gmail.com or write to us at Sarkari Success, India."
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