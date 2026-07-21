export default function RefundPolicy() {
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

          <h1 style={{ color: '#1e3a8a', fontSize: '28px', margin: '0 0 8px 0' }}>Refund Policy</h1>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '32px' }}>Last updated: July 2026</p>

          {[
            {
              title: "1. Strict No Refund Policy",
              content: "Sarkari Success maintains a strict no-refund policy for all premium subscriptions and payments. Once a payment is made and the subscription is activated, no refunds will be issued under any circumstances. This policy applies to all subscription plans including monthly, 6-month, and annual plans."
            },
            {
              title: "2. Reasons for No Refund Policy",
              content: "Our no-refund policy exists because our services are digital in nature and are immediately accessible upon payment. Once you subscribe, you gain instant access to all premium AI features including AI Selection Coach, AI Daily Mission, AI Revision Planner, AI Learning Hub, AI Rank Predictor, AI Selection DNA, Exam Intelligence Report, and Unlimited SarkariGPT. Since these digital services cannot be returned, no refunds are possible."
            },
            {
              title: "3. Subscription Cancellation",
              content: "You may cancel your subscription at any time. However, even after cancellation, no refund will be issued for the amount already paid. Your premium access will continue until the end of the current billing period. Cancellation only prevents future charges — it does not entitle you to any refund for amounts already paid."
            },
            {
              title: "4. Duplicate Payment",
              content: "In the rare event of a genuine duplicate payment due to a technical error on our payment gateway, the duplicate amount will be adjusted as credit toward your next billing cycle. This is not a refund and will be handled at our sole discretion after verification."
            },
            
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>{section.title}</h2>
              <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{section.content}</p>
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>6. Contact Us</h2>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              For any payment-related queries, contact us at <strong style={{ color: '#dc2626' }}>contact.sarkarisuccess@gmail.com</strong>. Please note that contacting us does not entitle you to a refund.
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