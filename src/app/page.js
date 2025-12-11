import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Courses from './components/Courses'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Roadmap from './components/Roadmap'

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-white min-h-screen">
      <Header />
      <main>
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