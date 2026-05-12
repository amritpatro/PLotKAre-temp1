'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, FileWarning, TrendingDown, Eye } from 'lucide-react'

const painPoints = [
  {
    number: '01',
    icon: AlertTriangle,
    title: 'Encroachment Risk',
    description: 'Vacant plots attract squatters and boundary violations that go unnoticed for months.',
  },
  {
    number: '02',
    icon: FileWarning,
    title: 'Legal Complexity',
    description: 'Statutory filings, tax dues, and compliance windows pile up without a single calendar owner.',
  },
  {
    number: '03',
    icon: TrendingDown,
    title: 'Value Uncertainty',
    description: 'Without monitoring, you never know the current market value or legal status of your plot.',
  },
  {
    number: '04',
    icon: Eye,
    title: 'No Reliable Eyes',
    description: 'Local relatives get busy, and brokers have conflicts of interest. Trust is hard to find.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function ProblemSection() {
  return (
    <section id="about" className="bg-charcoal py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Visakhapatnam Land at Risk When
              <br />
              No One Visits on a
              <br />
              <span className="text-primary">Predictable Schedule.</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-white/60">
              NRIs abroad, metro-based owners with a second asset in AP, and local investors with multiple parcels all
              share the same failure mode: decisions made from stale information. PlotKare is built around dated
              field evidence you can forward to counsel or family.
            </p>
          </motion.div>

          {/* Right Content - Pain Point Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {painPoints.map((point) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.number}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-lg bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  {/* Background Number */}
                  <span className="absolute -right-2 -top-4 font-mono text-7xl font-bold text-white/5">
                    {point.number}
                  </span>

                  {/* Content */}
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-white/60">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
