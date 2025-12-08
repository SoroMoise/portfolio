import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SORO Colotcholoman Moïse | Full Stack Developer",
  description:
    "Passionate about creating smooth, performant, and scalable web, mobile, and desktop experiences. Specialized in React Native, React, Angular, Node.js, Python, and Kivy.",
  keywords: [
    "Full Stack Developer",
    "React Native",
    "React",
    "Angular",
    "Node.js",
    "Python",
    "Kivy",
    "Web Development",
    "Mobile Development",
    "Desktop Development",
  ],
  authors: [{ name: "SORO Colotcholoman Moïse" }],
  creator: "SORO Colotcholoman Moïse",
  metadataBase: new URL("https://soromoise.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soromoise.vercel.app",
    title: "SORO Colotcholoman Moïse | Full Stack Developer",
    description:
      "Passionate about creating smooth, performant, and scalable web, mobile, and desktop experiences.",
    siteName: "SORO Colotcholoman Moïse Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "SORO Colotcholoman Moïse | Full Stack Developer",
    description:
      "Passionate about creating smooth, performant, and scalable web, mobile, and desktop experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="portfolio-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
