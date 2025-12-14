import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Architecture from '@/components/Architecture'
import HowItWorks from '@/components/HowItWorks'
import BusinessImpact from '@/components/BusinessImpact'
import TechStack from '@/components/TechStack'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Architecture />
      <HowItWorks />
      <BusinessImpact />
      <TechStack />
      <Footer />
    </main>
  )
}
