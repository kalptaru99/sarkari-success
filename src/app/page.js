export default function Home() {
  const jobs = [
    {
      title: "SSC CGL 2026",
      org: "Staff Selection Commission",
      vacancies: "17,727",
      lastDate: "31 July 2026",
      isNew: true,
    },
    {
      title: "RRB NTPC 2026",
      org: "Railway Recruitment Board",
      vacancies: "11,558",
      lastDate: "15 August 2026",
      isNew: true,
    },
    {
      title: "IBPS PO 2026",
      org: "Institute of Banking Personnel Selection",
      vacancies: "6,432",
      lastDate: "10 August 2026",
      isNew: false,
    },
    {
      title: "UPSC Civil Services 2026",
      org: "Union Public Service Commission",
      vacancies: "1,056",
      lastDate: "5 September 2026",
      isNew: false,
    },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Top bar */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', textAlign: 'center', fontSize: '14px' }}>
        📢 India's First AI-Powered Sarkari Career Companion
      </div>

      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center', borderBottom: '3px solid #1e3a8a' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
          Sarkari <span style={{ color: '#dc2626' }}>Success</span>
        </h1>
        <p style={{ color: '#555', marginTop: '8px' }}>
          AI-Powered Sarkari Naukri, Results &amp; Exam Updates
        </p>
      </header>

      {/* Alert ticker */}
      <div style={{ backgroundColor: '#fee2e2', borderTop: '1px solid #dc2626', borderBottom: '1px solid #dc2626', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ backgroundColor: '#dc2626', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          NEW
        </span>
        <span style={{ color: '#991b1b', fontWeight: '500' }}>
          🚀 New notifications added daily — powered by AI
        </span>
      </div>

      {/* Job Listings */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '20px' }}>
          Latest Sarkari Jobs
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {jobs.map((job, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '18px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px', color: '#1e3a8a', margin: 0 }}>
                    {job.title}
                  </h3>
                  {job.isNew && (
                    <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                      NEW
                    </span>
                  )}
                </div>
                <p style={{ color: '#666', fontSize: '14px', margin: '4px 0' }}>
                  {job.org}
                </p>
                <p style={{ color: '#444', fontSize: '13px', margin: 0 }}>
                  Vacancies: <strong>{job.vacancies}</strong> &nbsp;|&nbsp; 
                  Last Date: <strong>{job.lastDate}</strong>
                </p>
              </div>

              <button style={{
                backgroundColor: '#1e3a8a',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '60px' }}>
        © 2026 Sarkari Success. All rights reserved.
      </footer>
    </main>
  );
}