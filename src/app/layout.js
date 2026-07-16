import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

export const metadata = {
  title: "Sarkari Success — India's First AI-Powered Sarkari Career Companion",
  description: "SSC, Railway, UPSC, Banking & State exam updates powered by AI. Free mock tests, question bank, and SarkariGPT chatbot.",
  keywords: "sarkari naukri, sarkari result, SSC CGL, RRB NTPC, UPSC, IBPS PO, government jobs 2026",
  verification: {
    google: "35nM2-Nu0pDv-3_xcWujMHIHnNT4s7yqKhCdpbvhNYI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RK6LW3C9V4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RK6LW3C9V4');
          `}
        </Script>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}