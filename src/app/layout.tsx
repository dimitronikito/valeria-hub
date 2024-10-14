import type { Metadata } from "next";
import "./globals.css";
import { Press_Start_2P } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Valeria Hub",
  description: "Valeria Community Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={pressStart2P.className}>
      <body className={pressStart2P.className}>{children}
        <Analytics />
      </body>
    </html>
  )
}