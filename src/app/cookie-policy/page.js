export default function CookiePolicy() {
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

          <h1 style={{ color: '#1e3a8a', fontSize: '28px', margin: '0 0 8px 0' }}>Cookie Policy</h1>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '32px' }}>Last updated: July 2026</p>

          {[
            {
              title: "1. What Are Cookies",
              content: "Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site. Sarkari Success uses cookies to provide a better user experience and to improve our services."
            },
            {
              title: "2. Types of Cookies We Use",
              content: "We use the following types of cookies on Sarkari Success: Essential Cookies (required for the website to function — login sessions, security tokens, user authentication), Preference Cookies (remember your settings such as preferred language, target exam, and study preferences), Analytics Cookies (Google Analytics to understand how visitors use our website — pages visited, time spent, traffic sources), and Performance Cookies (to monitor and improve website performance and loading speed)."
            },
            {
              title: "3. Essential Cookies",
              content: "These cookies are strictly necessary for Sarkari Success to function properly. They include session cookies for keeping you logged in, security cookies for protecting your account, and authentication tokens for NextAuth.js. These cookies cannot be disabled as they are essential for the website to work."
            },
            {
              title: "4. Google Analytics Cookies",
              content: "We use Google Analytics (Measurement ID: G-RK6LW3C9V4) to analyze website traffic and user behavior. Google Analytics uses cookies to collect anonymous information about how visitors use our website. This data helps us improve our content and user experience. Google Analytics does not collect personally identifiable information. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on."
            },
            {
              title: "5. Third Party Cookies",
              content: "Sarkari Success may use third-party services that set their own cookies including Google Analytics for traffic analysis, Vercel for website hosting and performance, and Razorpay for payment processing (when applicable). These third parties have their own privacy and cookie policies."
            },
            {
              title: "6. Compliance with IT Act and GDPR",
              content: "Sarkari Success complies with the Information Technology Act 2000 and its amendments applicable in India. For users in the European Union, we also comply with the General Data Protection Regulation (GDPR). We collect only the minimum necessary data required to provide our services. You have the right to request deletion of your data by contacting us."
            },
            {
              title: "7. Managing Cookies",
              content: "You can control and manage cookies through your browser settings. Most browsers allow you to view, delete, and block cookies. Blocking essential cookies may prevent Sarkari Success from functioning correctly including keeping you logged in. To manage cookies in Chrome: Settings > Privacy and Security > Cookies and other site data. To manage cookies in Firefox: Options > Privacy & Security > Cookies and Site Data."
            },
            {
              title: "8. Cookie Retention",
              content: "Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. Our login session cookies expire after 30 days. Google Analytics cookies expire after 2 years. Preference cookies expire after 1 year."
            },
            {
              title: "9. Your Rights",
              content: "Under applicable Indian law and GDPR, you have the right to access cookies and data we collect about you, request deletion of your personal data, opt out of non-essential cookies, and withdraw consent at any time. To exercise these rights, contact us at the email below."
            },
            {
              title: "10. Changes to This Policy",
              content: "We may update this Cookie Policy from time to time to reflect changes in technology, law, or our services. We will notify registered users of significant changes. Continued use of Sarkari Success after changes constitutes acceptance of the updated Cookie Policy."
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>{section.title}</h2>
              <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{section.content}</p>
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>11. Contact Us</h2>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              For cookie-related queries or to exercise your data rights, contact us at <strong style={{ color: '#dc2626' }}>contact.sarkarisuccess@gmail.com</strong>
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