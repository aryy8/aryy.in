import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://aryy.in"),
  title: {
    default: "Aryan Rastogi",
    template: "%s | Aryan Rastogi",
  },
  description:
    "Aryan Rastogi — Machine Learning & AI Engineer. Portfolio featuring projects, experience, achievements, and writing.",
  alternates: {
    canonical: "/",
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
  ],
  openGraph: {
    type: "website",
    url: "https://aryy.in/",
    title: "Aryan Rastogi",
    description:
      "Machine Learning & AI Engineer — portfolio featuring projects, experience, achievements, and writing.",
    siteName: "Aryan Rastogi",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Aryan Rastogi — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Aryan Rastogi",
    description:
      "Machine Learning & AI Engineer — portfolio featuring projects, experience, achievements, and writing.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export const viewport: Viewport = {
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
        "@id": "https://aryy.in/#website",
        url: "https://aryy.in/",
        name: "Aryan Rastogi",
        description:
          "Portfolio of Aryan Rastogi — Machine Learning & AI Engineer.",
      },
      {
        "@type": "WebPage",
        "@id": "https://aryy.in/#webpage",
        url: "https://aryy.in/",
        name: "Aryan Rastogi",
        isPartOf: {
          "@id": "https://aryy.in/#website",
        },
        about: {
          "@id": "https://aryy.in/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://aryy.in/#person",
        name: "Aryan Rastogi",
        url: "https://aryy.in/",
        image: "https://aryy.in/pfp.jpg",
        jobTitle: "Machine Learning & AI Engineer",
        sameAs: [
          "https://github.com/aryy8",
          "https://linkedin.com/in/aryy8",
        ],
      },
    ],
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistMono.className} font-mono antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
