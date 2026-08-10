export async function GET() {
  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative circles -->
  <circle cx="1100" cy="100" r="150" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="100" cy="550" r="120" fill="#ffffff" fill-opacity="0.05"/>
  
  <!-- Logo area -->
  <rect x="60" y="60" width="8" height="60" fill="#fca5a5" rx="4"/>
  
  <!-- Main title -->
  <text x="90" y="110" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="white">Sarkari Success</text>
  
  <!-- Subtitle -->
  <text x="60" y="180" font-family="Arial, sans-serif" font-size="28" fill="#bfdbfe">India's First AI-Powered Government Jobs Portal</text>
  
  <!-- Divider -->
  <rect x="60" y="210" width="200" height="3" fill="#fca5a5" rx="2"/>
  
  <!-- Features -->
  <text x="60" y="290" font-family="Arial, sans-serif" font-size="22" fill="#93c5fd">🎯 SSC • Railway • UPSC • Banking • State PSC</text>
  <text x="60" y="340" font-family="Arial, sans-serif" font-size="22" fill="#93c5fd">🤖 SarkariGPT — AI Career Guide in Hindi &amp; English</text>
  <text x="60" y="390" font-family="Arial, sans-serif" font-size="22" fill="#93c5fd">📚 30,000+ Practice Questions with AI Explanation</text>
  <text x="60" y="440" font-family="Arial, sans-serif" font-size="22" fill="#93c5fd">🏛️ 24 States • Latest Job Notifications Daily</text>
  
  <!-- Bottom bar -->
  <rect x="0" y="570" width="1200" height="60" fill="#ffffff" fill-opacity="0.1"/>
  <text x="60" y="610" font-family="Arial, sans-serif" font-size="22" fill="white" font-weight="bold">sarkarisuccess.com</text>
  <text x="900" y="610" font-family="Arial, sans-serif" font-size="18" fill="#bfdbfe">Free • AI-Powered • Hindi &amp; English</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}