import type { Metadata } from "next";
import { Geist, Geist_Mono, Zen_Dots } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/app/providers/providers";
import SplashScreen from "@/components/layout/SplashScreen";
import FloatingBrochure from "@/components/layout/FloatingBrochure";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenDots = Zen_Dots({
  weight: "400",
  variable: "--font-zen-dots",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARKA CRETE | Premium Architectural Design & Innovation",
  description: "ARKA crafts next-generation spaces where luxury meets sustainability. Explore our architectural masterpieces and design innovations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${zenDots.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Providers>
          <SplashScreen />
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <FloatingBrochure />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
