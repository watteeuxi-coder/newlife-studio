import ParticleCanvas from '@/components/ui/ParticleCanvas'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Forfaits from '@/components/sections/Forfaits'
import Portfolio from '@/components/sections/Portfolio'
import Temoignages from '@/components/sections/Temoignages'
import Pourquoi from '@/components/sections/Pourquoi'
import Faq from '@/components/sections/Faq'
import Contact from '@/components/sections/Contact'

export default function Page() {
  return (
    <>
      {/* Background layers (fixed, z=0) */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <ParticleCanvas />

      {/* Layout */}
      <Header />
      <main>
        <Hero />
        <Services />
        <Forfaits />
        <Portfolio />
        <Temoignages />
        <Pourquoi />
        <Faq />
        <Contact />
      </main>
      <Footer />

      {/* Floating WA button (mobile) */}
      <WhatsAppButton />
    </>
  )
}
