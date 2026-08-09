import '.././globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { MailWarningIcon } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <main lang="en" className="light"  className={`${inter.className} antialiased`}>
      
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      
    </main>
  )
}