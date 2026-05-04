'use client'

import { motion } from 'framer-motion'

const awards = [
  {
    title: 'AP RERA Compliant Partner',
    description: 'Officially registered with Andhra Pradesh Real Estate Regulatory Authority',
    year: '2023',
  },
  {
    title: 'Vizag Business Excellence Award',
    description: 'Confederation of Andhra Pradesh Industry - PropTech Innovation',
    year: '2024',
  },
  {
    title: 'NRI Property Trust Summit',
    description: 'Featured speaker and exhibitor at the NRI Property Summit in Hyderabad',
    year: '2024',
  },
  {
    title: 'ISO Process Standards',
    description: 'Aligned with ISO 9001:2015 quality management framework',
    year: '2023',
  },
]

export function AwardsSection() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
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
            Recognized and <span className="text-accent">Trusted</span>
          </h2>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 border-l-2 border-accent pl-6"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-accent">
                <svg
                  className="h-5 w-5 text-charcoal"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  {award.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-white/60">
                  {award.description}
                </p>
                <p className="mt-2 font-mono text-sm text-primary">
                  {award.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
