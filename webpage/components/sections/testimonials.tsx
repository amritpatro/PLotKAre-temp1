'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "PlotKare caught an encroachment in the very first month and resolved it completely within six weeks. I could never have handled this from Houston.",
    name: 'Suresh R.',
    role: 'Software Engineer',
    location: 'Houston, Texas',
    plotLocation: 'Bheemunipatnam',
    clientSince: '2024',
  },
  {
    quote: "I hadn't visited Vizag in four years. The value tracker showed me my plot appreciated from Rs. 35 lakhs to Rs. 58 lakhs. That's real peace of mind.",
    name: 'Priya M.',
    role: 'Nurse',
    location: 'London, UK',
    plotLocation: 'Madhurawada',
    clientSince: '2023',
  },
  {
    quote: "The mushroom kit lease on my vacant plot generates Rs. 4,200 per month in passive income. My land is finally working for me.",
    name: 'Kiran P.',
    role: 'IT Manager',
    location: 'Dubai, UAE',
    plotLocation: 'Anandapuram',
    clientSince: '2022',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
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
            What NRI Owners <span className="text-primary">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-lg border-l-4 border-primary bg-white p-8 shadow-sm"
            >
              <blockquote className="font-sans text-base italic leading-relaxed text-foreground/80">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-6">
                <p className="font-sans font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.location}
                </p>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="font-mono text-xs text-muted-foreground">
                  Plot: {testimonial.plotLocation} • Client since {testimonial.clientSince}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
