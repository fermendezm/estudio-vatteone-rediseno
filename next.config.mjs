// GitHub Pages sirve el sitio en /<repo>/, no en la raíz del dominio. Sin
// basePath todos los assets de _next/ dan 404. En Vercel, Netlify o dominio
// propio la variable no se define y el sitio queda en la raíz, como debe.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: `npm run build` genera /out, subible a Vercel, Netlify,
  // Cloudflare Pages o cualquier hosting por FTP.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
}

export default nextConfig
