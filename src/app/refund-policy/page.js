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

          <div style={{ backgroundColor: '#fee2e2', borderRadius: '8px', padding: '16px', marginBottom: '24px', border: '1px solid #fca5a5' }}>
            <p style={{ color: '#dc2626', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '15px' }}>⚠️ No Refund Policy</p>
            <p style={{ color: '#7f1d1d', margin: 0, fontSize: '14px' }}>All payments made to Sarkari Success are strictly non-refundable under any circumstances. Please read this policy carefully before making any purchase.</p>
          </div>

          {[
            {
              title: "1. Strict No Refund Policy",
              content: "Sarkari Success maintains a strict no-refund policy for all premium subscriptions and payments. Once a payment is made and the subscription is activated, no refunds will be issued under any circumstances. This policy applies to all subscription plans including monthly, quarterly, and annual plans."
            },
            {
              title: "2. Reasons for No Refund Policy",
              content: "Our no-refund policy exists because our services are digital in nature and are immediately accessible upon payment. Once you subscribe, you gain instant access to all premium AI features including AI Selection Coach, AI Daily Mission, AI Revision Planner, AI Learning Hub, AI Rank Predictor, and AI Selection DNA. Since these digital services cannot be returned, no refunds are possible."
            },
            {
              title: "3. No Refund Under Any Circumstances",
              content: "Refunds will not be provided for any reason including but not limited to: change of mind after purchase, dissatisfaction with AI-generated content, technical issues on the user's device, incorrect subscription plan purchased, failure to use the subscription, exam cancellation or postponement, duplicate payments (will be adjusted in next billing cycle), or any other reason whatsoever."
            },
            {
              title: "4. Subscription Cancellation",
              content: "You may cancel your subscription at any time. Upon cancellation, your premium access will continue until the end of the current billing period. No refund will be issued for the remaining unused period of your subscription. Cancellation prevents future charges but does not entitle you to any refund for amounts already paid."
            },
            {
              title: "5. Duplicate Payment",
              content: "In the rare event of a genuine duplicate payment due to a technical error on our payment gateway, the duplicate amount will be adjusted as credit toward your next billing cycle. This is not a refund and will be handled at our sole discretion after verification."
            },
            {
              title: "6. Free Trial",
              content: "Where applicable, Sarkari Success may offer a free trial period before charging. Users are advised to fully evaluate the platform during the free trial period before subscribing. No refunds will be issued after the trial period ends and payment is processed."
            },
            {
              title: "7. Chargebacks",
              content: "Initiating a chargeback or payment dispute with your bank or card provider for a valid Sarkari Success transaction is a violation of these terms. Such actions may result in immediate termination of your account and permanent ban from our platform. We reserve the right to contest all chargebacks with full transaction evidence."
            },
            {
              title: "8. Governing Law",
              content: "This refund policy is governed by the laws of India. Any disputes arising from this policy shall be subject to the jurisdiction of courts in India. By making a payment on Sarkari Success, you agree to this refund policy and all our terms of service."
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>{section.title}</h2>
              <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{section.content}</p>
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 8px 0' }}>9. Contact Us</h2>
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