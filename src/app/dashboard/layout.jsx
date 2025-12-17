import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zhongwen Master - Chinese Learning Dashboard',
  description: 'Interactive dashboard for learning Chinese language',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}