import '.././globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LingoDash - Chinese Learning Dashboard',
  description: 'Interactive dashboard for learning Chinese',
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}