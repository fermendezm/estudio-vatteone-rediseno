'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/lib/site'
import Reveal, { RevealLines } from './Reveal'

/**
 * Índice de servicios en formato editorial: filas numeradas que se abren al
 * pasar el cursor. Reemplaza la grilla de tarjetas con foto del sitio original.
 */
export default function ServicesList() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="servicios" className="relative py-20 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold" />
                Servicios
              </p>
            </Reveal>
            <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)] text-ink">
              <RevealLines
                lines={[
                  'Todo lo contable,',
                  <span key="l2">
                    en un <span className="italic text-teal">solo lugar</span>
                  </span>,
                ]}
              />
            </h2>
            <Reveal delay={1}>
              <p className="mt-7 max-w-sm text-[16px] leading-relaxed text-ink-soft">
                Servicios de confianza ante cualquier duda sobre aspectos
                impositivos y contables — para empresas y para particulares.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <Link
                href="/servicios"
                className="link-underline mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-teal"
              >
                Ver el detalle de cada servicio
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ul className="border-t border-line">
              {services.map((s, i) => {
                const isActive = active === s.id
                return (
                  <Reveal as="li" key={s.id} delay={i * 0.5}>
                    <Link
                      href={`/servicios#${s.id}`}
                      onMouseEnter={() => setActive(s.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(s.id)}
                      onBlur={() => setActive(null)}
                      className="group relative block border-b border-line py-6 md:py-7"
                    >
                      {/* Barra teal que crece desde la izquierda */}
                      <motion.span
                        className="absolute inset-y-0 left-0 -z-10 bg-teal-wash"
                        initial={false}
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="flex items-start gap-5 px-1 md:items-baseline md:gap-8">
                        <span
                          className={`font-mono text-[11px] tracking-widest transition-colors duration-500 ${
                            isActive ? 'text-teal' : 'text-muted'
                          }`}
                        >
                          {s.index}
                        </span>
                        <div className="flex-1">
                          <h3
                            className={`text-[19px] font-medium tracking-tight transition-colors duration-500 md:text-[22px] ${
                              isActive ? 'text-teal-deep' : 'text-ink'
                            }`}
                          >
                            {s.title}
                          </h3>
                          {/* En touch no hay hover: la descripción se muestra
                              siempre. Reservarla al hover la volvía contenido
                              inalcanzable en teléfono. */}
                          <p className="pt-2 text-[14px] leading-relaxed text-ink-soft md:hidden">
                            {s.short}
                          </p>

                          <div className="hidden md:block">
                            <AnimatePresence initial={false}>
                              {isActive && (
                                <motion.p
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className="overflow-hidden text-[15px] leading-relaxed text-ink-soft"
                                >
                                  <span className="block pt-2.5">{s.short}</span>
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        {/* En móvil la flecha es permanente: es la única señal
                            de que la fila lleva a otra página. */}
                        <span
                          className={`shrink-0 text-teal transition-all duration-500 ${
                            isActive
                              ? 'md:translate-x-0 md:opacity-100'
                              : 'md:-translate-x-2 md:opacity-0'
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
