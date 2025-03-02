import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  variable: "--font-ovo",
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata = {
  title: "Francisco Guerra | Software Developer",
  description: "Portfolio of Francisco Guerra, a software developer specializing in modern web solutions.",
  keywords: "Portfolio, Software Development, Web Development, Full-Stack, Next.js, AWS, JavaScript, TypeScript, APIs",
  openGraph: {
    title: "Francisco Guerra | Software Developer",
    description: "Explore my portfolio of web applications, e-commerce platforms, and custom business solutions.",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "Francisco Guerra Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <body
        className={`${outfit.variable} ${ovo.variable} antialiased overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
