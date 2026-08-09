// 'use client';

import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Courses from './components/Courses'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Roadmap from './components/Roadmap'
import ChinesePromoPopup from './promotion/ChinesePromoPopup'
import TopBanner from './promotion/TopBanner'
import { useAuth } from './context/AuthContext'
import GlobalLoadingOverlay from './components/GlobalLoadingOverlay'

export default function Home() {

  // const { loading } = useAuth();


  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-white min-h-screen">
      
      <TopBanner className='sticky top-0 left-0 right-0 z-50' /> 
      <Header />
      <main>
        <ChinesePromoPopup />
        <Hero />
        <Features />
        {/* <Roadmap /> */}
        <Courses />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}