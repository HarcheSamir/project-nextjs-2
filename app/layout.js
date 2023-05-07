import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Esi Sba.',
  description: 'A comprehensive web platform that simplifies the management of social benefits for ESI SBA university employees, offering easy access to benefit information, request processing, and detailed reporting capabilities.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}</body>
    </html>
  )
}
