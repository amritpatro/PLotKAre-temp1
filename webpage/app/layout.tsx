import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { JsonLd } from '@/components/json-ld'
import { SITE_NAME, canonicalPageUrl, absoluteUrl, getSiteUrl } from '@/lib/site-config'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const siteUrl = getSiteUrl()
const defaultOgImage = absoluteUrl('/opengraph-default.svg')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Visakhapatnam plot & apartment oversight`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Scheduled field visits, boundary photos, and document reminders for plots and select apartments across Visakhapatnam and coastal Andhra — built for NRIs, metro owners, and local investors.',
  keywords: [
    'Visakhapatnam plot monitoring',
    'Vizag NRI land management',
    'Andhra Pradesh plot inspection',
    'Visakhapatnam apartment due diligence',
    'coastal Andhra plot encroachment',
    'Bheemunipatnam plot management',
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: canonicalPageUrl('/'),
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Visakhapatnam plot & apartment oversight`,
    description:
      'Inspection-first monitoring, legal document hygiene, and resale-ready evidence for land and apartments near Vizag.',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Visakhapatnam plots and apartments`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Visakhapatnam plot & apartment oversight`,
    description:
      'Inspection-first monitoring, legal document hygiene, and resale-ready evidence for land and apartments near Vizag.',
    images: [defaultOgImage],
  },
  alternates: {
    canonical: canonicalPageUrl('/'),
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: canonicalPageUrl('/'),
  email: 'hello@plotkare.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2nd Floor, Krishna Towers, Siripuram',
    addressLocality: 'Visakhapatnam',
    postalCode: '530003',
    addressRegion: 'Andhra Pradesh',
    addressCountry: 'IN',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: canonicalPageUrl('/'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
