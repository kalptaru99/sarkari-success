"use client";
import { useState } from "react";

const jobs = [
  { name: 'IAS Officer', category: 'UPSC', exam: 'UPSC Civil Services', basic: 56100, gross: 92000, inhand: 85000, eligibility: 'Graduate', age: '21-32' },
  { name: 'IPS Officer', category: 'UPSC', exam: 'UPSC Civil Services', basic: 56100, gross: 90000, inhand: 83000, eligibility: 'Graduate', age: '21-32' },
  { name: 'UPSC CAPF AC', category: 'UPSC', exam: 'UPSC CAPF', basic: 56100, gross: 90000, inhand: 83000, eligibility: 'Graduate', age: '20-25' },
  { name: 'SSC CGL Grade B', category: 'SSC', exam: 'SSC CGL', basic: 44900, gross: 72000, inhand: 67000, eligibility: 'Graduate', age: '18-32' },
  { name: 'SSC CGL Grade C', category: 'SSC', exam: 'SSC CGL', basic: 35400, gross: 58000, inhand: 54000, eligibility: 'Graduate', age: '18-27' },
  { name: 'SSC CHSL LDC/DEO', category: 'SSC', exam: 'SSC CHSL', basic: 19900, gross: 33000, inhand: 30000, eligibility: '12th Pass', age: '18-27' },
  { name: 'SSC MTS', category: 'SSC', exam: 'SSC MTS', basic: 18000, gross: 30000, inhand: 27000, eligibility: '10th Pass', age: '18-25' },
  { name: 'IBPS PO', category: 'Banking', exam: 'IBPS PO', basic: 36000, gross: 55000, inhand: 52000, eligibility: 'Graduate', age: '20-30' },
  { name: 'SBI PO', category: 'Banking', exam: 'SBI PO', basic: 36000, gross: 57000, inhand: 54000, eligibility: 'Graduate', age: '21-30' },
  { name: 'IBPS Clerk', category: 'Banking', exam: 'IBPS Clerk', basic: 19900, gross: 32000, inhand: 29000, eligibility: 'Graduate', age: '20-28' },
  { name: 'RRB NTPC Graduate', category: 'Railway', exam: 'RRB NTPC', basic: 35400, gross: 57000, inhand: 53000, eligibility: 'Graduate', age: '18-33' },
  { name: 'RRB NTPC 12th Pass', category: 'Railway', exam: 'RRB NTPC', basic: 19900, gross: 33000, inhand: 30000, eligibility: '12th Pass', age: '18-33' },
  { name: 'RRB Group D', category: 'Railway', exam: 'RRB Group D', basic: 18000, gross: 30000, inhand: 27000, eligibility: '10th + ITI', age: '18-33' },
  { name: 'Agniveer Army', category: 'Defence', exam: 'Agnipath', basic: 30000, gross: 30000, inhand: 21000, eligibility: '10th/12th', age: '17.5-23' },
  { name: 'DRDO Scientist B', category: 'PSU', exam: 'DRDO', basic: 56100, gross: 90000, inhand: 83000, eligibility: 'B.Tech', age: '28 max' },
  { name: 'HAL Management Trainee', category: 'PSU', exam: 'HAL', basic: 40000, gross: 65000, inhand: 60000, eligibility: 'B.Tech', age: '28 max' },
  { name: 'KVS PGT Teacher', category: 'Teaching', exam: 'KVS', basic: 47600, gross: 76000, inhand: 70000, eligibility: 'PG + B.Ed', age: '18-40' },
  { name: 'KVS TGT Teacher', category: 'Teaching', exam: 'KVS', basic: 44900, gross: 72000, inhand: 67000, eligibility: 'Graduate + B.Ed', age: '18-35' },
];

const categories = ['All', 'UPSC', 'SSC', 'Banking', 'Railway', 'Defence', 'PSU', 'Teaching'];
const categoryColors = {
  UPSC: '#7c3aed', SSC: '#1e3a8a', Banking: '#1e40af',
  Railway: '#0f766e', Defence: '#dc2626', PSU: '#0891b2', Teaching: '#16a34a',
};

export default function SalaryComparisonPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('inhand');
  const [compare, setCompare] = useState([]);

  const filtered = jobs
    .filter(j => selectedCategory === 'All' || j.category === selectedCategory)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const toggleCompare = (job) => {
    if (compare.find(j => j.name === job.name)) {
      setCompare(compare.filter(j => j.name !== job.name));
    } else if (compare.length < 3) {
      setCompare([...compare, job]);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Job Salary Comparison 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: 0 }}>Compare salaries across SSC, Railway, UPSC, Banking, Defence, PSU and Teaching jobs</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Compare Box */}
        {compare.length > 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '2px solid #1e3a8a', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: '800', margin: '0 0 16px 0' }}>📊 Comparing {compare.length} Jobs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compare.length}, 1fr)`, gap: '12px' }}>
              {compare.map((job, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: `2px solid ${categoryColors[job.category]}` }}>
                  <p style={{ color: categoryColors[job.category], fontWeight: '800', fontSize: '14px', margin: '0 0 8px 0' }}>{job.name}</p>
                  <p style={{ color: '#16a34a', fontSize: '20px', fontWeight: '900', margin: '0 0 4px 0' }}>₹{job.inhand.toLocaleString()}/mo</p>
                  <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>Basic: ₹{job.basic.toLocaleString()}</p>
                  <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>Eligibility: {job.eligibility}</p>
                  <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 8px 0' }}>Age: {job.age}</p>
                  <button onClick={() => toggleCompare(job)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button key={i} onClick={() => setSelectedCategory(cat)}
                style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                  borderColor: selectedCategory === cat ? (categoryColors[cat] || '#1e3a8a') : '#e2e8f0',
                  backgroundColor: selectedCategory === cat ? (categoryColors[cat] || '#1e3a8a') : 'white',
                  color: selectedCategory === cat ? 'white' : '#64748b' }}>
                {cat}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '13px', color: '#1e3a8a', fontWeight: '700', cursor: 'pointer' }}>
            <option value="inhand">Sort by In-hand Salary</option>
            <option value="basic">Sort by Basic Pay</option>
            <option value="gross">Sort by Gross Salary</option>
          </select>
        </div>

        {compare.length < 3 && (
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
            💡 Click any job card to compare — {3 - compare.length} more can be added
          </p>
        )}

        {/* Jobs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {filtered.map((job, i) => {
            const isSelected = compare.find(j => j.name === job.name);
            return (
              <div key={i} onClick={() => toggleCompare(job)}
                style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: isSelected ? `2px solid ${categoryColors[job.category]}` : '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ backgroundColor: (categoryColors[job.category] || '#1e3a8a') + '20', color: categoryColors[job.category] || '#1e3a8a', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '700' }}>
                    {job.category}
                  </span>
                  {isSelected && <span style={{ color: '#16a34a', fontSize: '18px' }}>✓</span>}
                </div>
                <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>{job.name}</h3>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 12px 0' }}>{job.exam}</p>
                <p style={{ color: '#16a34a', fontSize: '24px', fontWeight: '900', margin: '0 0 4px 0' }}>₹{job.inhand.toLocaleString()}<span style={{ fontSize: '13px', fontWeight: '600' }}>/month</span></p>
                <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 8px 0' }}>In-hand salary (approx)</p>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Basic Pay</span>
                    <span style={{ color: '#374151', fontSize: '11px', fontWeight: '700' }}>₹{job.basic.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Eligibility</span>
                    <span style={{ color: '#374151', fontSize: '11px', fontWeight: '700' }}>{job.eligibility}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Age Limit</span>
                    <span style={{ color: '#374151', fontSize: '11px', fontWeight: '700' }}>{job.age} yrs</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Salary Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#1e3a8a', padding: '16px 20px' }}>
            <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: 0 }}>💰 Complete Salary Breakdown Table 2026</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  {['Post', 'Exam', 'Basic Pay', 'Gross Salary', 'In-hand', 'Eligibility', 'Age'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...jobs].sort((a, b) => b.inhand - a.inhand).map((job, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '10px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: '700' }}>{job.name}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b' }}>{job.exam}</td>
                    <td style={{ padding: '10px 16px', fontSize: '13px', color: '#374151', fontWeight: '600' }}>₹{job.basic.toLocaleString()}</td>
                    <td style={{ padding: '10px 16px', fontSize: '13px', color: '#374151', fontWeight: '600' }}>₹{job.gross.toLocaleString()}</td>
                    <td style={{ padding: '10px 16px', fontSize: '13px', color: '#16a34a', fontWeight: '800' }}>₹{job.inhand.toLocaleString()}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b' }}>{job.eligibility}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#64748b' }}>{job.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Which exam should YOU appear for?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Ask SarkariGPT — get personalized exam recommendation based on your qualification</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>
            Get My Recommendation →
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}