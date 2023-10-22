import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solevo',
  description: 'Loja Solevo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-pt">
      <head>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
          />
        </head>
      <body>{children}</body>
    </html>
  )
}
