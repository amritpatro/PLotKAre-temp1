import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero'
import { TrustStrip } from '@/components/sections/trust-strip'
import { ProblemSection } from '@/components/sections/problem'
import { ServicesSection } from '@/components/sections/services'
import { PlotVisualizationSection } from '@/components/sections/plot-visualization'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { Plot3DSection } from '@/components/sections/plot-3d-section'
import { LandUtilisationSection } from '@/components/sections/land-utilisation'
import { StatisticsSection } from '@/components/sections/statistics'
import { GlobalPresenceSection } from '@/components/sections/global-presence'
import { AvailablePlotsShowcaseSection } from '@/components/sections/available-plots-showcase'
import { PricingSection } from '@/components/sections/pricing'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { AwardsSection } from '@/components/sections/awards'
import { NewsroomSection } from '@/components/sections/newsroom'
import { ContactSection } from '@/components/sections/contact'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <ServicesSection />
      <PlotVisualizationSection />
      <HowItWorksSection />
      <Plot3DSection />
      <LandUtilisationSection />
      <StatisticsSection />
      <GlobalPresenceSection />
      <AvailablePlotsShowcaseSection />
      <PricingSection />
      <TestimonialsSection />
      <AwardsSection />
      <NewsroomSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
