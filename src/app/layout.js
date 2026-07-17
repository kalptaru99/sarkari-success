import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

export const metadata = {
  title: "Sarkari Success — India's First AI-Powered Sarkari Career Companion",
  description: "Get latest SSC, Railway, UPSC, Banking government job notifications, results, admit cards. Free mock tests, 800+ practice questions and SarkariGPT AI chatbot in Hindi and English.",
  keywords: "sarkari naukri, sarkari result, SSC CGL 2026, RRB NTPC 2026, UPSC 2026, IBPS PO 2026, government jobs 2026, sarkari job, admit card, exam result",
  authors: [{ name: "Sarkari Success" }],
  creator: "Sarkari Success",
  publisher: "Sarkari Success",
  metadataBase: new URL("https://sarkarisuccess.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sarkari Success — India's First AI-Powered Sarkari Career Companion",
    description: "Latest SSC, Railway, UPSC, Banking job notifications with AI-powered mock tests and SarkariGPT chatbot.",
    url: "https://sarkarisuccess.com",
    siteName: "Sarkari Success",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarkari Success — India's First AI-Powered Sarkari Career Companion",
    description: "Latest SSC, Railway, UPSC, Banking job notifications with AI-powered mock tests and SarkariGPT chatbot.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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