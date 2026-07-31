import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'
import SmoothScroll from '@/components/SmoothScroll'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} en Asunción`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'estudio contable Asunción',
    'contador Paraguay',
    'asesoría impositiva',
    'auditoría contable',
    'sociedades anónimas Paraguay',
    'gestiones laborales IPS',
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'es_PY',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#faf9f6',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+${site.phoneRaw}`,
  email: site.email,
  foundingDate: String(site.foundedYear),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address,
    addressLocality: 'Asunción',
    addressCountry: 'PY',
  },
  areaServed: 'Paraguay',
  sameAs: [site.linkedin],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-PY" className={`${inter.variable} ${display.variable}`}>
      <body className="grain">
        {/* Framer Motion serializa el estado inicial (opacity: 0) en el HTML.
            Sin JS eso dejaría la página en blanco: acá se revierte. */}
        <noscript>
          <style>{`.reveal, .reveal * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  )
}
