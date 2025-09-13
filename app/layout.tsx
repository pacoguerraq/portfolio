// app/layout.tsx
import type { Metadata } from 'next';
import { Outfit } from "next/font/google";
import { LanguageProvider } from "@/providers/LanguageProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_HOST ? new URL(process.env.NEXT_PUBLIC_HOST) : undefined,
  title: "pacoguerraq | Software Developer",
  description: "Portfolio of Francisco Guerra, a software developer specializing in modern web solutions and custom business applications.",
  keywords: "Portfolio, Software Development, Web Development, Full-Stack, Next.js, AWS, JavaScript, TypeScript, APIs, pacoguerraq",
  openGraph: {
    title: "pacoguerraq | Software Developer",
    description: "Explore my portfolio of web applications, e-commerce platforms, and custom business solutions.",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "pacoguerraq Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} antialiased overflow-x-hidden bg-white text-gray-900`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}