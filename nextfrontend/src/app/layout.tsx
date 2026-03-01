import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Adityaraj Chatterjee | Portfolio",
  description: "Hardware and Software Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        
        {/* Template Interactive Scripts */}
        <Script src="https://unpkg.com/@alpine-collective/toolkit@1.0.0/dist/cdn.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}