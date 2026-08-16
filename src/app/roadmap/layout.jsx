import '.././globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
  
      <body className={`${inter.className} antialiased`} lang="en" className="light">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
  
  )
}