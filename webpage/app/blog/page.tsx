import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME, canonicalPageUrl } from '@/lib/site-config'
import { getAllPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Visakhapatnam plot & land guides',
  description:
    'Long-form guides on NRI plot inspections, encroachment prevention, Andhra documents, apartments in Vizag, and pricing signals.',
  alternates: { canonical: canonicalPageUrl('/blog/') },
  openGraph: {
    url: canonicalPageUrl('/blog/'),
    title: `Plot & land guides | ${SITE_NAME}`,
    description: 'Research-style articles for Visakhapatnam and coastal Andhra property owners.',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-sm text-primary">
          <Link href="/" className="hover:underline">
            ← Home
          </Link>
        </p>
        <h1 className="mt-6 font-serif text-4xl font-bold text-foreground md:text-5xl">PlotKare blog</h1>
        <p className="mt-4 font-sans text-muted-foreground">
          Practical writing for NRIs, metro-based owners, and local investors holding land or apartments near Vizag.
        </p>
        <ul className="mt-12 space-y-10">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border pb-10">
              <p className="font-mono text-xs text-muted-foreground">{post.datePublished}</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                <Link href={`/blog/${post.slug}/`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 font-sans text-sm text-muted-foreground">{post.description}</p>
              <Link href={`/blog/${post.slug}/`} className="mt-3 inline-block font-sans text-sm font-medium text-primary hover:underline">
                Read article
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
