'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  name: string
  badge?: string
  badgeColor?: 'red' | 'gold'
  monthlyPrice: number
  features: PlanFeature[]
  variant: 'default' | 'featured' | 'premium'
}

const plans: Plan[] = [
  {
    name: 'Basic Monitor',
    monthlyPrice: 999,
    variant: 'default',
    features: [
      { text: 'Monthly field inspection', included: true },
      { text: 'Four boundary photos', included: true },
      { text: 'WhatsApp report delivery', included: true },
      { text: 'Plot status indicator', included: true },
      { text: 'Legal health check', included: false },
      { text: 'Document vault', included: false },
    ],
  },
  {
    name: 'Complete Care',
    badge: 'Most Popular',
    badgeColor: 'red',
    monthlyPrice: 1999,
    variant: 'featured',
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'Legal health check', included: true },
      { text: 'EC & tax monitoring', included: true },
      { text: 'Document vault', included: true },
      { text: 'Value tracker', included: true },
      { text: 'Dedicated agent', included: false },
    ],
  },
  {
    name: 'Premium NRI',
    badge: 'Best Value',
    badgeColor: 'gold',
    monthlyPrice: 3499,
    variant: 'premium',
    features: [
      { text: 'Everything in Complete', included: true },
      { text: 'Dedicated agent', included: true },
      { text: 'Video inspection report', included: true },
      { text: 'Encroachment legal support', included: true },
      { text: 'Priority 24-hour response', included: true },
      { text: 'Quarterly in-person updates', included: true },
    ],
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.round(monthlyPrice * 0.8)
    }
    return monthlyPrice
  }

  return (
    <section id="pricing" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Property Monitoring <span className="text-primary">Plans &amp; Pricing</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <span className={`font-sans text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative h-7 w-14 rounded-full transition-colors ${
              isAnnual ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <motion.div
              animate={{ x: isAnnual ? 28 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
            />
          </button>
          <span className={`font-sans text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
            <span className="ml-1 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl p-8 ${
                plan.variant === 'premium'
                  ? 'bg-charcoal text-white'
                  : plan.variant === 'featured'
                  ? 'border-2 border-primary bg-white shadow-xl'
                  : 'border border-border bg-white'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-medium ${
                    plan.badgeColor === 'gold'
                      ? 'bg-accent text-charcoal'
                      : 'bg-primary text-white'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <h3
                className={`font-serif text-2xl font-semibold ${
                  plan.variant === 'premium' ? 'text-white' : 'text-foreground'
                }`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline">
                <span
                  className={`font-mono text-4xl font-bold ${
                    plan.variant === 'premium' ? 'text-accent' : 'text-primary'
                  }`}
                >
                  Rs. {getPrice(plan.monthlyPrice).toLocaleString()}
                </span>
                <span
                  className={`ml-2 font-sans text-sm ${
                    plan.variant === 'premium' ? 'text-white/60' : 'text-muted-foreground'
                  }`}
                >
                  /month
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                        feature.included
                          ? plan.variant === 'premium'
                            ? 'text-accent'
                            : 'text-primary'
                          : plan.variant === 'premium'
                          ? 'text-white/30'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                    <span
                      className={`font-sans text-sm ${
                        feature.included
                          ? plan.variant === 'premium'
                            ? 'text-white/80'
                            : 'text-foreground'
                          : plan.variant === 'premium'
                          ? 'text-white/30'
                          : 'text-muted-foreground/50'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`mt-8 block w-full rounded-sm py-3 text-center font-sans text-sm font-medium transition-colors ${
                  plan.variant === 'premium'
                    ? 'bg-accent text-charcoal hover:bg-accent/90'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
