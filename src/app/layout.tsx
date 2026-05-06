import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VOID//ECHO - Immersive Cyber Experience',
  description:
    'A dark cyber surreal immersive single-page scrolling experience. Enter the void and let reality echo back distorted fragments of consciousness.',
  keywords: ['cyber', 'void', 'immersive', '3D', 'interactive', 'webgl'],
  authors: [{ name: 'VOID//ECHO Studio' }],
  openGraph: {
    title: 'VOID//ECHO',
    description: 'Enter the void. Let reality echo.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  )
}
