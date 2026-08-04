'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { pillars, site, yearsOfExperience } from '@/lib/site'
import Reveal, { RevealLines } from './Reveal'

// En servidor no existe useLayoutEffect; React avisa si se usa igual.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Contador que arranca cuando el número entra en pantalla.
 *
 * Nace en el valor final, no en cero: así el HTML servido y el caso sin JS
 * dicen "70 años" y no "0 años". El cero se siembra en un layout effect, antes
 * del primer pintado, de modo que nadie ve el salto.
 */
function Counter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(to)
  const started = useRef(false)
  const settled = useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setValue(0)
  }, [])

  // Red de seguridad que NO depende del observer ni de rAF: si a los 5 s la
  // animación nunca arrancó, se planta el número final. Sin esto, cualquier
  // entorno donde el IntersectionObserver no dispare deja "0 años de
  // trayectoria" en pantalla, que es peor que no animar nada.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (started.current) return
      settled.current = true
      setValue(to)
    }, 5000)
    return () => window.clearTimeout(t)
  }, [to])

  useEffect(() => {
    if (!inView || settled.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    started.current = true

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Y si rAF queda estrangulado a mitad de camino (pestaña en segundo plano,
    // ahorro de batería), el contador se clavaría en un número parcial.
    const finish = window.setTimeout(() => setValue(to), duration + 600)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(finish)
    }
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}

export default function WhyUs() {
  return (
    <section id="nosotros" className="relative border-y border-line bg-paper-2/60 py-20 md:py-40">
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

        <div className="mt-14 grid md:mt-20 gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.6}>
              <article className="group relative h-full bg-paper px-6 py-8 md:px-7 md:py-10 transition-colors duration-500 hover:bg-teal-wash">
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
