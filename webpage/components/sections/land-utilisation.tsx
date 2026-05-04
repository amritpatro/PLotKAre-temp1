'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type Category = 'All' | 'Income Generation' | 'Protection' | 'Development'

interface Service {
  title: string
  description: string
  category: 'Income Generation' | 'Protection' | 'Development'
  gradient: string
  size: 'full' | 'half'
  imageUrl: string
}

const services: Service[] = [
  {
    title: 'Container Farming Lease',
    description: 'Generate passive income by leasing your plot for modern container farming operations.',
    category: 'Income Generation',
    gradient: 'from-emerald-900 to-emerald-700',
    size: 'full',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
  },
  {
    title: 'Mushroom Kit Cultivation',
    description: 'Low-maintenance mushroom cultivation that generates monthly returns.',
    category: 'Income Generation',
    gradient: 'from-amber-900 to-amber-700',
    size: 'half',
    imageUrl: '/images/mushroom-kit.jpg',
  },
  {
    title: 'Solar Panel Hosting',
    description: 'Host solar panels and earn from clean energy generation.',
    category: 'Income Generation',
    gradient: 'from-slate-800 to-slate-600',
    size: 'half',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  },
  {
    title: 'Boundary Fencing Installation',
    description: 'Professional fencing to secure your plot boundaries and deter encroachment.',
    category: 'Protection',
    gradient: 'from-zinc-800 to-zinc-600',
    size: 'half',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    title: 'Legal Holding Advisory',
    description: 'Expert guidance on property laws, tax planning, and estate management.',
    category: 'Protection',
    gradient: 'from-stone-800 to-stone-600',
    size: 'half',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
  },
  {
    title: 'Plot Resale Assistance',
    description: 'End-to-end support for selling your plot at the best market value.',
    category: 'Development',
    gradient: 'from-indigo-900 to-indigo-700',
    size: 'full',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  },
]

const categories: Category[] = ['All', 'Income Generation', 'Protection', 'Development']

export function LandUtilisationSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory)

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            We Grow Your Land&apos;s <span className="text-primary">Potential</span>
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-lg text-muted-foreground">
            Beyond monitoring — optional value-add services for your vacant plot.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative pb-2 font-sans text-sm font-medium transition-colors ${
                activeCategory === category ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 0.98 }}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${service.gradient} p-8 ${
                  service.size === 'full' ? 'md:col-span-2' : ''
                }`}
              >
                <Image
                  src={service.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={service.size === 'full' ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 600px'}
                />
                <div
                  className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.75)]"
                  aria-hidden
                />

                <div className="relative z-[2]">
                  {/* Category Pill */}
                  <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/80">
                    {service.category}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-white/70">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-accent transition-transform group-hover:translate-x-2">
                    <span className="font-sans text-sm font-medium">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
