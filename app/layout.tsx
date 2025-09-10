import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Smart Tourist Safety Monitoring System",
  description: "AI + Blockchain + Geo-Fencing for Safe & Secure Travel",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
