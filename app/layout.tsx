import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MicrosoftClarity } from "@/components/clarity"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aryy.in"),
  title: {
    default: "Aryan Rastogi",
    template: "%s | Aryan Rastogi",
  },
  description:
    "Aryan Rastogi — AI Engineer, Researcher & Founder. Building at the intersection of AI safety, applied ML, and product. Founder of Aryy & Co.",
  authors: [{ name: "Aryan Rastogi", url: "https://www.aryy.in" }],
  creator: "Aryan Rastogi",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.aryy.in/",
  },
  keywords: [
    "Aryan Rastogi",
    "Aryan portfolio",
    "Machine Learning Engineer",
    "AI Engineer",
    "NLP",
    "Computer Vision",
    "aryy8",
    "aryy.in",
    "AI safety",
    "LLM safety",
    "SafeAlign",
    "Aryy and Co",
    "tech agency",
    "alignment tax",
    "RLHF",
    "DPO",
  ],
  openGraph: {
    type: "website",
    url: "https://www.aryy.in/",
    title: "Aryan Rastogi",
    description:
      "AI Engineer · Researcher · Founder — portfolio featuring research, projects, experience, and writing.",
    siteName: "Aryan Rastogi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aryan Rastogi — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aryyann8",
    title: "Aryan Rastogi",
    description:
      "AI Engineer · Researcher · Founder — portfolio featuring research, projects, experience, and writing.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.aryy.in/#website",
        url: "https://www.aryy.in/",
        name: "Aryan Rastogi",
        description:
          "Portfolio of Aryan Rastogi — Machine Learning & AI Engineer.",
      },
      {
        "@type": "WebPage",
        "@id": "https://www.aryy.in/#webpage",
        url: "https://www.aryy.in/",
        name: "Aryan Rastogi",
        isPartOf: {
          "@id": "https://www.aryy.in/#website",
        },
        about: {
          "@id": "https://www.aryy.in/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.aryy.in/#person",
        name: "Aryan Rastogi",
        url: "https://www.aryy.in/",
        image: "https://www.aryy.in/pfp.webp",
        jobTitle: "Machine Learning & AI Engineer",
        sameAs: [
          "https://github.com/aryy8",
          "https://linkedin.com/in/aryy8",
        ],
      },
    ],
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistMono.className} font-mono antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          {children}
          <Analytics />
          <MicrosoftClarity />
        </ThemeProvider>
      </body>
    </html>
  )
}
