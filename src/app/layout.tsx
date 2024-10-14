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
  openGraph: {
    title: 'Valeria Hub',
    description: 'Valeria Community Site',
    images: [
      {
        url: '/leafy_preview.png',
        width: 1200,
        height: 630,
        alt: 'Valeria Hub Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valeria Hub',
    description: 'Valeria Community Site',
    images: ['/leafy_preview.png'],
  },
  other: {
    'discord:title': 'Valeria Hub',
    'discord:description': 'Valeria Community Site',
    'discord:image': '/leafy_preview.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={pressStart2P.className}>
      <body className={pressStart2P.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}