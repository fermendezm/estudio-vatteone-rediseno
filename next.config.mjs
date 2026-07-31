/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: `npm run build` genera /out, subible a Vercel, Netlify,
  // Cloudflare Pages o cualquier hosting por FTP.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
}

export default nextConfig
