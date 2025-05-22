import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import NewsTicker from "@/components/news-ticker"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Krishi Vaani - Voice-First Agricultural Advisory for Rural Farmers",
  description:
    "AI-powered agricultural advisory platform for rural Indian farmers with voice-first interface and multilingual support",
  manifest: "/manifest.json",
  themeColor: "#3c7f3c",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Krishi Vaani",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Krishi Vaani" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body suppressHydrationWarning={true} className={`${inter.className} bg-[#f8f5eb] min-h-screen flex flex-col`}>
        

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <Navigation />
            <NewsTicker />
            <main className="pt-24 flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>``
        </ThemeProvider>
      </body>
    </html>
  )
}
