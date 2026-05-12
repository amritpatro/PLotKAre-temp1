'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IsometricPlot } from '@/components/isometric-plot'
import { OwnerDetailsCard } from '@/components/owner-details-card'

export function PlotVisualizationSection() {
  const ownerCardRef = useRef<HTMLDivElement>(null)
  const [emphasizeOwnerCard, setEmphasizeOwnerCard] = useState(false)

  const handleOwnerPlotClick = () => {
    ownerCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setEmphasizeOwnerCard(true)
    window.setTimeout(() => setEmphasizeOwnerCard(false), 2400)
  }

  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Visakhapatnam Plot Map &amp; Status View
              <br />
              <span className="text-primary">Built for Remote Owners.</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-muted-foreground">
              A living map of your property — boundaries, agent footprints, and status 
              at a glance. Monitor your investment from Houston, London, or Dubai.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-sandy" />
                <span className="font-sans text-sm text-muted-foreground">Standard Plots</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-primary" />
                <span className="font-sans text-sm text-muted-foreground">Your Plot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#2D5A3D]" />
                <span className="font-sans text-sm text-muted-foreground">Green Belt</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Plot Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <IsometricPlot className="rounded-xl shadow-xl" onOwnerPlotClick={handleOwnerPlotClick} />
            <OwnerDetailsCard ref={ownerCardRef} emphasize={emphasizeOwnerCard} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
