import "./globals.css";
import Providers from "./providers";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "Sarkari Result 2026 : Latest Sarkari Naukri, Job Notification, Admit Card & Result | Sarkari Success",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  description: "Sarkari Success brings the latest sarkari naukri notifications 2026, online forms, admit cards, results & answer keys for SSC, Railway, UPSC, Banking & State PSC — plus free AI mock tests in Hindi & English.",
  keywords: "sarkari result 2026, sarkari naukri, sarkari job, govt job notification, admit card, ssc, railway, upsc, banking jobs india",
  authors: [{ name: "Sarkari Success Editorial Team" }],
  creator: "Sarkari Success",
  publisher: "Sarkari Success",
  metadataBase: new URL("https://www.sarkarisuccess.com"),
  alternates: {
    canonical: "https://www.sarkarisuccess.com",
    languages: {
      'en-IN': 'https://www.sarkarisuccess.com',
      'hi': 'https://www.sarkarisuccess.com',
      'x-default': 'https://www.sarkarisuccess.com',
    },
  },
  openGraph: {
    title: "Sarkari Result 2026 : Latest Sarkari Naukri, Job Notification, Admit Card & Result | Sarkari Success",
    description: "Sarkari Success brings the latest sarkari naukri notifications 2026, online forms, admit cards, results & answer keys for SSC, Railway, UPSC, Banking & State PSC — plus free AI mock tests in Hindi & English.",
    url: "https://www.sarkarisuccess.com",
    siteName: "Sarkari Success",
    images: [
      {
        url: "https://www.sarkarisuccess.com/api/og",
        width: 1200,
        height: 630,
        alt: "Sarkari Success — AI-Powered Government Jobs Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarkari Result 2026 : Latest Sarkari Naukri & Job Notifications | Sarkari Success",
    description: "Sarkari Success brings the latest sarkari naukri notifications 2026, online forms, admit cards, results & answer keys for SSC, Railway, UPSC, Banking & State PSC.",
    images: ["https://www.sarkarisuccess.com/api/og"],
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
  other: {
    'msvalidate.01': 'DAB8F593C55D42274BEC143203AD8380',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="DAB8F593C55D42274BEC143203AD8380" />
      </head>
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
        <CookieConsent />
      </body>
    </html>
  );
}