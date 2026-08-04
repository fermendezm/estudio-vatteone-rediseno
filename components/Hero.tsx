'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { site, yearsOfExperience } from '@/lib/site'

// El canvas nunca se renderiza en servidor: el export estático queda limpio
// y el bundle de three no bloquea la primera pintura.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
})

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <HeroScene />

      {/* Velo que aclara el borde inferior para que el texto siempre tenga contraste */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-paper to-transparent" />

      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="reveal eyebrow flex items-center gap-3"
          >
            <span className="inline-block h-px w-10 bg-gold" />
            Asunción, Paraguay · desde {site.foundedYear}
          </motion.p>

          <h1 className="display mt-8 text-[clamp(3rem,9vw,7.5rem)] text-ink">
            {['Números', 'que sostienen'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="reveal block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, ease, delay: 0.25 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="reveal block italic text-teal"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.15, ease, delay: 0.45 }}
              >
                decisiones.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="reveal mt-9 max-w-xl text-[17px] leading-relaxed text-ink-soft md:text-[19px]"
          >
            Estudio contable fundado en {site.foundedYear} para brindar un
            servicio responsable, eficiente y honesto. {yearsOfExperience} años
            acompañando a empresas y particulares en Paraguay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="reveal mt-11 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              href="/servicios"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-paper transition-colors hover:bg-teal-deep sm:justify-start sm:py-3.5"
            >
              Ver servicios
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M2 8h11m0 0L9 4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/15 px-7 py-4 text-[15px] text-ink transition-colors hover:border-teal hover:text-teal sm:justify-start sm:py-3.5"
            >
              Hablar con el estudio
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 block h-3 bg-teal"
            animate={{ y: [-12, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
