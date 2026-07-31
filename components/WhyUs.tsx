'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { pillars, site, yearsOfExperience } from '@/lib/site'
import Reveal, { RevealLines } from './Reveal'

/** Contador que arranca cuando el número entra en pantalla. */
function Counter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}

export default function WhyUs() {
  return (
    <section id="nosotros" className="relative border-y border-line bg-paper-2/60 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-end gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold" />
                ¿Por qué elegirnos?
              </p>
            </Reveal>
            <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)] text-ink">
              <RevealLines
                lines={[
                  'Una vara que no',
                  <span key="l2">
                    se movió <span className="italic text-teal">nunca</span>
                  </span>,
                ]}
              />
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={1}>
              <div className="flex items-end gap-6">
                <span className="display text-[clamp(5rem,13vw,10rem)] leading-[0.8] text-teal">
                  <Counter to={yearsOfExperience} />
                </span>
                <span className="mb-3 max-w-[14rem] text-[15px] leading-snug text-ink-soft">
                  años de trayectoria ininterrumpida desde {site.foundedYear}.
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.6}>
              <article className="group relative h-full bg-paper px-7 py-10 transition-colors duration-500 hover:bg-teal-wash">
                <span className="font-mono text-[11px] tracking-widest text-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-[20px] font-medium tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-teal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
