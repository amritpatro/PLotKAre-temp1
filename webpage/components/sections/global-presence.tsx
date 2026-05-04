'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface City {
  name: string
  country: string
  x: number
  y: number
}

const cities: City[] = [
  { name: 'Houston', country: 'USA', x: 150, y: 180 },
  { name: 'New Jersey', country: 'USA', x: 195, y: 160 },
  { name: 'Toronto', country: 'Canada', x: 185, y: 140 },
  { name: 'London', country: 'UK', x: 330, y: 130 },
  { name: 'Dubai', country: 'UAE', x: 420, y: 185 },
  { name: 'Muscat', country: 'UAE', x: 435, y: 195 },
  { name: 'Singapore', country: 'Singapore', x: 530, y: 235 },
  { name: 'Sydney', country: 'Australia', x: 590, y: 320 },
]

// Vizag coordinates
const vizagX = 490
const vizagY = 200

const countries = ['All', 'USA', 'UK', 'UAE', 'Australia', 'Singapore', 'Canada']

const nriCounts: Record<string, number> = {
  USA: 27,
  UK: 11,
  UAE: 14,
  Australia: 9,
  Singapore: 5,
  Canada: 8,
}

export function GlobalPresenceSection() {
  const [activeCountry, setActiveCountry] = useState('All')

  const filteredCities = activeCountry === 'All'
    ? cities
    : cities.filter(c => c.country === activeCountry)

  return (
    <section id="presence" className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
            NRI Owners Trust PlotKare
            <br />
            <span className="text-primary">From Across the World</span>
          </h2>
        </motion.div>

        {/* World Map SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mb-10 max-w-4xl"
        >
          <svg viewBox="0 0 700 380" className="w-full">
            {/* Simplified World Map Paths */}
            {/* North America */}
            <path
              d="M50 100 L80 80 L120 70 L180 65 L220 80 L240 120 L230 160 L200 180 L160 200 L100 200 L70 180 L50 150 Z"
              fill="#2a2a2a"
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />
            {/* South America */}
            <path
              d="M160 220 L200 210 L220 240 L230 280 L220 320 L190 340 L150 330 L130 290 L140 250 Z"
              fill="#2a2a2a"
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />
            {/* Europe */}
            <path
              d="M300 80 L350 70 L380 80 L400 100 L390 130 L360 140 L320 135 L300 120 Z"
              fill="#2a2a2a"
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />
            {/* Africa */}
            <path
              d="M320 160 L380 150 L420 170 L430 220 L420 280 L380 320 L340 310 L310 260 L300 200 Z"
              fill="#2a2a2a"
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />
            {/* Asia */}
            <path
              d="M400 80 L480 60 L560 70 L600 100 L620 140 L600 180 L560 200 L500 210 L440 200 L410 160 L400 120 Z"
              fill="#2a2a2a"
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />
            {/* India */}
            <path
              d="M460 160 L500 155 L520 180 L510 220 L480 240 L450 230 L440 200 L450 175 Z"
              fill="#353535"
              stroke="#4a4a4a"
              strokeWidth="1"
            />
            {/* Australia */}
            <path
              d="M540 280 L600 270 L640 290 L650 330 L620 350 L570 345 L540 320 Z"
              fill="#2a2a2a"
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />

            {/* Connection Lines to Vizag */}
            {filteredCities.map((city) => (
              <line
                key={`line-${city.name}`}
                x1={city.x}
                y1={city.y}
                x2={vizagX}
                y2={vizagY}
                stroke="#8B1538"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />
            ))}

            {/* City Markers with Ping Animation */}
            {filteredCities.map((city) => (
              <g key={city.name}>
                {/* Ping Effect */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="6"
                  fill="#8B1538"
                  opacity="0.3"
                  className="animate-ping-slow"
                />
                {/* Main Dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="5"
                  fill="#8B1538"
                />
                {/* City Label */}
                <text
                  x={city.x}
                  y={city.y - 12}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="500"
                  className="font-mono"
                >
                  {city.name}
                </text>
              </g>
            ))}

            {/* Vizag Marker (Gold Star) */}
            <g>
              <circle
                cx={vizagX}
                cy={vizagY}
                r="10"
                fill="#C9A962"
                opacity="0.3"
                className="animate-ping-slow"
              />
              <circle
                cx={vizagX}
                cy={vizagY}
                r="8"
                fill="#C9A962"
              />
              <text
                x={vizagX}
                y={vizagY + 22}
                textAnchor="middle"
                fill="#C9A962"
                fontSize="10"
                fontWeight="600"
                className="font-mono"
              >
                VIZAG
              </text>
            </g>
          </svg>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors ${
                activeCountry === country
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {country}
            </button>
          ))}
        </motion.div>

        {/* NRI Counts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 text-center"
        >
          {Object.entries(nriCounts).map(([country, count]) => (
            <div key={country} className="flex items-center gap-2">
              <span className="font-mono text-lg font-semibold text-primary">{count}</span>
              <span className="font-sans text-sm text-white/60">NRI owners in {country}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
