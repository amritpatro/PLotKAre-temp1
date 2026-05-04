'use client'

import { motion } from 'framer-motion'
import { Plot3DScene } from '@/components/plot-3d-scene'
import { CheckCircle2 } from 'lucide-react'

export function Plot3DSection() {
  return (
    <section id="3d-plot" className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
            See Your Plot. <span className="text-accent">Anywhere in the World.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl font-sans text-lg text-white/60">
            Interactive 3D visualization of your property in Visakhapatnam. Rotate, explore, and monitor from anywhere.
          </p>
        </motion.div>

        {/* 3D Scene and Card */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex h-96 min-h-96 flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-charcoal to-charcoal"
          >
            <Plot3DScene />
          </motion.div>

          {/* Owner Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              {/* Status Badge */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs text-white/50">Plot</p>
                  <h3 className="mt-1 font-serif text-3xl font-bold text-white">VZG-047</h3>
                </div>
                <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 font-mono text-xs font-medium text-accent">
                  Active
                </span>
              </div>

              {/* Details Grid */}
              <div className="space-y-6 border-t border-white/10 pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-mono text-xs text-white/50">Owner Name</p>
                    <p className="mt-2 font-sans text-lg font-semibold text-white">Ravi Kumar</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/50">Plot Size</p>
                    <p className="mt-2 font-sans text-lg font-semibold text-white">200 sq. yards</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-mono text-xs text-white/50">Location</p>
                    <p className="mt-2 font-sans text-sm font-semibold text-white">Bheemunipatnam Phase 2</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/50">Last Inspection</p>
                    <p className="mt-2 font-sans text-sm font-semibold text-white">28 April 2026</p>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs text-white/50">Estimated Value</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-accent">68 Lakhs</p>
                </div>
              </div>

              {/* Services */}
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="mb-3 font-mono text-xs text-white/50">Active Services</p>
                <div className="flex flex-wrap gap-3">
                  {['Monthly Inspection', 'Legal Monitoring', 'Value Tracker'].map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="font-sans text-sm text-white/80">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
