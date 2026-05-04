'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Start Protecting
              <br />
              <span className="text-primary">Your Plot Today</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-muted-foreground">
              Your first inspection report is delivered within seven days of signing up. 
              No long-term commitment required.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 font-sans text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                List My Plot
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-sm border border-foreground bg-transparent px-8 py-4 font-sans text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-white"
              >
                Download Brochure
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">
                    2nd Floor, Krishna Towers
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    Siripuram, Visakhapatnam 530003
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <p className="font-sans text-sm text-foreground">
                  +91 891 234 5678
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <p className="font-sans text-sm text-foreground">
                  hello@plotkare.in
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-primary" />
                <p className="font-sans text-sm text-foreground">
                  Mon - Sat, 9:00 AM - 7:00 PM IST
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="flex h-full items-center justify-center rounded-lg bg-white p-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-8 w-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">
                    Enquiry Received
                  </h3>
                  <p className="mt-2 font-sans text-muted-foreground">
                    We will call you back within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-lg bg-white p-8 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-sans text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block font-sans text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 block font-sans text-sm font-medium text-foreground"
                    >
                      Plot Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      className="w-full border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0"
                      placeholder="e.g., Bheemunipatnam Phase 2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-sans text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-0"
                      placeholder="Tell us about your plot..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-sm bg-primary py-4 font-sans text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
