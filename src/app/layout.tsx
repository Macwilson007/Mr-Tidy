import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import FloatingReceptionist from "@/components/FloatingReceptionist";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mr Tidy — Premium Cleaning Services",
  description:
    "Elite residential, commercial, and short-term rental cleaning. AI-powered booking. Immaculate results, every time.",
  keywords: [
    "cleaning agency",
    "premium cleaning",
    "commercial cleaning",
    "residential cleaning",
    "Airbnb cleaning",
    "AI receptionist",
  ],
  openGraph: {
    title: "Mr Tidy — Premium Cleaning Services",
    description:
      "Elite residential, commercial, and short-term rental cleaning. AI-powered booking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <AuthProvider>
          {/* Noise texture overlay for premium feel */}
          <div className="noise-overlay" aria-hidden="true" />
          {children}
          <FloatingReceptionist />
        </AuthProvider>
      </body>
    </html>
  );
}
