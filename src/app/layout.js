import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Sarkari Success — India's First AI-Powered Sarkari Career Companion",
  description: "SSC, Railway, UPSC, Banking & State exam updates powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}