'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  { value: 340, suffix: '+', label: 'Plots Currently Managed' },
  { value: 3, suffix: '', label: 'Districts Covered (Vizag City, Rural & Bheemunipatnam)' },
  { value: 12, suffix: '', label: 'Background-Verified Field Agents' },
  { value: 4080, suffix: '+', label: 'Inspection Reports Delivered' },
]

export function StatisticsSection() {
  return (
    <section id="investors" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="font-mono text-5xl font-bold text-primary md:text-6xl">
                <AnimatedCounter 
                  target={stat.value} 
                  suffix={stat.suffix} 
                  duration={2}
                />
              </p>
              <p className="mt-3 font-sans text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
