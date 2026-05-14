/** @type {import('next').NextConfig} */
// Dynamic Next.js runtime for Supabase Auth, middleware, route handlers, and Hostinger Node hosting.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || ''

const nextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
