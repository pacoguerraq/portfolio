// app/page.tsx
'use client'

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Background flowing lines - positioned absolutely */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top flowing lines */}
        <svg
          className="absolute -top-20 -left-20 w-96 h-96 opacity-10"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path
            d="M50 200 Q 150 100, 250 200 T 450 200"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-pulse"
          />
          <path
            d="M40 220 Q 140 120, 240 220 T 440 220"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M30 240 Q 130 140, 230 240 T 430 240"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* Bottom right flowing lines */}
        <svg
          className="absolute -bottom-20 -right-20 w-96 h-96 opacity-10 rotate-180"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path
            d="M50 200 Q 150 100, 250 200 T 450 200"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-pulse"
          />
          <path
            d="M40 220 Q 140 120, 240 220 T 440 220"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M30 240 Q 130 140, 230 240 T 430 240"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* Middle left flowing lines */}
        <svg
          className="absolute top-1/2 -left-32 w-80 h-80 opacity-5 -rotate-45"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path
            d="M50 200 Q 150 100, 250 200 T 450 200"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M40 220 Q 140 120, 240 220 T 440 220"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        {/* Middle right flowing lines */}
        <svg
          className="absolute top-1/3 -right-32 w-80 h-80 opacity-5 rotate-45"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path
            d="M50 200 Q 150 300, 250 200 T 450 200"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M40 180 Q 140 280, 240 180 T 440 180"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Main content - positioned relatively to appear above background */}
      <div className="relative z-10">
        <Navbar />
        <Header />
        <About />
        <Services />
        <Work />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}