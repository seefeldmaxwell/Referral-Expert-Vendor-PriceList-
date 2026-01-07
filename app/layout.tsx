import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vendor Price List Submission | Global Public Adjusters",
  description:
    "Submit your vendor pricing information for handyman, plumber, HVAC, roofer, and general contractor services. Fast and easy online evaluation.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
