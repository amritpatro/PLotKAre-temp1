'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'Inspection cadence',
    body: 'Repeatable checklists for boundaries, access paths, and visible encroachments — written so a family member or lawyer can follow without jargon.',
  },
  {
    title: 'Legal & tax hygiene',
    body: 'Reminders for EC pulls, mutation updates, and recurring dues so small gaps do not snowball into disputes.',
  },
  {
    title: 'Resale & income optionality',
    body: 'When you are ready to lease, build, or sell, you already have dated evidence of how the asset was maintained.',
  },
  {
    title: 'Corridor familiarity',
    body: 'Structured around local growth corridors first, then expanded through repeatable field workflows for each new city.',
  },
]

export function StatisticsSection() {
  return (
    <section id="investors" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center font-serif text-3xl font-bold text-foreground md:text-4xl"
        >
          Property Monitoring Built for Long-Distance Decisions
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 sm:grid-cols-2"
        >
          {pillars.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-xl border border-border bg-white/60 p-8 text-left shadow-sm backdrop-blur-sm"
            >
              <p className="font-serif text-xl font-semibold text-primary">{stat.title}</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{stat.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
