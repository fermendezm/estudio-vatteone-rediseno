import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import Contact from '@/components/Contact'
import Reveal from '@/components/Reveal'
import { services, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Servicios contables',
  description:
    'Asesoría impositiva y contable, registros contables, apertura de sociedades anónimas, gestiones laborales y municipales, y auditorías en Asunción, Paraguay.',
}

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        lines={[
          'Seis frentes,',
          <span key="l2">
            un solo <span className="italic text-teal">estudio</span>
          </span>,
        ]}
        lead="Servicios de confianza ante cualquier duda sobre aspectos impositivos y contables. Trabajamos con empresas de distintos rubros y con particulares, siempre con la normativa paraguaya vigente como referencia."
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className="scroll-mt-28 border-b border-line py-16 md:py-24"
          >
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <Reveal>
                  <span className="font-mono text-[11px] tracking-widest text-teal">
                    {s.index}
                  </span>
                  <h2 className="display mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] text-ink">
                    {s.title}
                  </h2>
                </Reveal>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <Reveal delay={1}>
                  <p className="text-[17px] leading-relaxed text-ink-soft">
                    {s.description}
                  </p>
                </Reveal>
                <Reveal delay={2}>
                  <ul className="mt-9 grid gap-px border-t border-line bg-line sm:grid-cols-3">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="bg-paper px-5 py-6 text-[14px] leading-snug text-ink"
                      >
                        <span className="mb-3 block h-px w-6 bg-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>

            {/* Cinta decorativa: número gigante al margen, muy tenue */}
            <Reveal delay={i * 0.2}>
              <span
                aria-hidden="true"
                className="pointer-events-none mt-10 block select-none font-display text-[clamp(4rem,12vw,9rem)] leading-none text-ink/[0.035] md:mt-0 md:hidden"
              >
                {s.index}
              </span>
            </Reveal>
          </article>
        ))}
      </div>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="rounded-3xl bg-paper-2 px-8 py-16 text-center md:px-16 md:py-24">
            <Reveal>
              <p className="eyebrow">¿No sabés por dónde empezar?</p>
              <p className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-tight text-ink">
                Contanos tu situación y te decimos qué necesitás — sin costo y
                sin compromiso.
              </p>
              <a
                href={site.whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-[15px] font-medium text-paper transition-colors hover:bg-teal-deep"
              >
                Escribir por WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
