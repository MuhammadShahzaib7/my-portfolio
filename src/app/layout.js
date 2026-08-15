import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muhammad Shahzaib | Full Stack Web Developer",
  description: "Full Stack Developer specializing in React, Next.js, Node.js and MongoDB. View my projects, GitHub, and get in touch.",
  openGraph: {
    title: "Muhammad Shahzaib | Full Stack Web Developer",
    description: "Full Stack Developer building modern web experiences with React, Next.js, and Node.js.",
    url: "https://shahzaib-developer-portfolio.vercel.app/",
    siteName: "Muhammad Shahzaib Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shahzaib | Full Stack Web Developer",
    description: "Full Stack Developer building modern web experiences.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChat />
      </body>
    </html>
  );
}
