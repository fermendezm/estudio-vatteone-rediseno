'use client'

import Image from 'next/image'
import { asset } from '@/lib/asset'
import { clients } from '@/lib/site'
import Reveal from './Reveal'

/**
 * Marquee infinito en CSS puro (dos copias de la lista desplazándose -50%).
 * Sin JS: no hay jank cuando el hilo principal está ocupado con el canvas.
 */
export default function Clients() {
  const row = [...clients, ...clients, ...clients]

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-gold" />
            Nuestros clientes
          </p>
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-6 max-w-2xl font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight text-ink">
            Empresas paraguayas que nos confían sus números, algunas desde hace
            décadas.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16">
        {/* Degradados laterales: las piezas entran y salen sin cortarse */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent md:w-40" />

        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-16 md:gap-28">
          {row.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex h-16 w-36 shrink-0 items-center justify-center md:w-48"
            >
              <Image
                src={asset(c.logo)}
                alt={c.name}
                width={220}
                height={80}
                className="h-full w-auto max-w-full object-contain opacity-45 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.3333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_38s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
