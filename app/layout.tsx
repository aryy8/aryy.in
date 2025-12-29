import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aryan Rastogi | ML & AI Engineer",
  description:
    "Portfolio of Aryan Rastogi - Machine Learning and AI Engineer specializing in deep learning, computer vision, and natural language processing.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.className} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
