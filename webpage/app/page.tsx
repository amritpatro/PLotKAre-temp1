import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { FloatingContactCta } from '@/components/floating-contact-cta'
import { HeroSection } from '@/components/sections/hero'
import { TrustStrip } from '@/components/sections/trust-strip'
import { ProblemSection } from '@/components/sections/problem'
import { ServicesSection } from '@/components/sections/services'
import { PlotVisualizationSection } from '@/components/sections/plot-visualization'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { Plot3DSection } from '@/components/sections/plot-3d-section'
import { LandUtilisationSection } from '@/components/sections/land-utilisation'
import { StatisticsSection } from '@/components/sections/statistics'
import { AvailablePlotsShowcaseSection } from '@/components/sections/available-plots-showcase'
import { PricingSection } from '@/components/sections/pricing'
import { MonitoringInsightsSection } from '@/components/sections/testimonials'
import { AwardsSection } from '@/components/sections/awards'
import { NewsroomSection } from '@/components/sections/newsroom'
import { ContactSection } from '@/components/sections/contact'
import { Footer } from '@/components/footer'
import { SITE_NAME, canonicalPageUrl } from '@/lib/site-config'

const HOME_TITLE = `${SITE_NAME} — Plot and Property Management in Visakhapatnam | Protect, Grow, and Track Your Asset`

export const metadata: Metadata = {
  title: HOME_TITLE,
  description:
    'Protect and grow your vacant plot or apartment in Visakhapatnam with PlotKare. Monthly inspections, 3D land visualization, amenity services, and property listings. Starting Rs 999 per month.',
  alternates: {
    canonical: canonicalPageUrl('/'),
  },
  openGraph: {
    url: canonicalPageUrl('/'),
    title: HOME_TITLE,
    description:
      'Protect and grow your vacant plot or apartment in Visakhapatnam with PlotKare. Monthly inspections, 3D land visualization, amenity services, and property listings. Starting Rs 999 per month.',
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description:
      'Protect and grow your vacant plot or apartment in Visakhapatnam with PlotKare. Monthly inspections, 3D land visualization, amenity services, and property listings. Starting Rs 999 per month.',
  },
}

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <TrustStrip />
      <Plot3DSection />
      <ProblemSection />
      <ServicesSection />
      <PlotVisualizationSection />
      <HowItWorksSection />
      <LandUtilisationSection />
      <StatisticsSection />
      <AvailablePlotsShowcaseSection />
      <PricingSection />
      <MonitoringInsightsSection />
      <AwardsSection />
      <NewsroomSection />
      <ContactSection />
      <Footer />
      <FloatingContactCta />
    </main>
  )
}
