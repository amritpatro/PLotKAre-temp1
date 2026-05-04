'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const news = [
  {
    date: 'April 2026',
    headline: 'PlotKare Expands to Bheemunipatnam Phase 3 and Anandapuram Zones',
    excerpt: 'Coverage now extends to 47 additional residential layouts across two new zones.',
  },
  {
    date: 'March 2026',
    headline: 'New Feature: Video Inspection Reports Now Available for Premium NRI Plan',
    excerpt: 'Premium subscribers can now receive monthly video walkthroughs of their plots.',
  },
  {
    date: 'February 2026',
    headline: 'PlotKare Resolves 12 Encroachment Cases in Q1 2026 Across Vizag District',
    excerpt: 'Our legal team successfully cleared boundary disputes worth Rs. 4.2 crore in total value.',
  },
]

export function NewsroomSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Latest <span className="text-primary">Updates</span>
          </h2>
        </motion.div>

        {/* News Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <p className="font-mono text-sm text-muted-foreground">
                {item.date}
              </p>
              <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {item.headline}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary transition-transform group-hover:translate-x-2">
                <span className="font-sans text-sm font-medium">Read more</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
