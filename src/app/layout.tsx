import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ GLOBAL DEFAULT SEO ONLY */
export const metadata: Metadata = {
  metadataBase: new URL("https://mcwachira.com"),

  title: {
    default: "Mcwachira | Fullstack Developer",
    template: "%s | Mcwachira",
  },

  description:
    "Fullstack developer building production-ready systems with Python, Java, C#, and React.",

  openGraph: {
    title: "Mcwachira",
    description: "Production-ready web apps, APIs, and enterprise software.",
    url: "https://mcwachira.com",
    siteName: "Mcwachira",
    type: "website",
    locale: "en_KE",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
