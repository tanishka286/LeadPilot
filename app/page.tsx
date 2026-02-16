import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { SocialProof } from '@/components/social-proof'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { ValueSection } from '@/components/value-section'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <ValueSection />
      <CTA />
      <Footer />
    </main>
  )
}
