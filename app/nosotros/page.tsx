import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import Contact from '@/components/Contact'
import Clients from '@/components/Clients'
import Reveal from '@/components/Reveal'
import { site, timeline, yearsOfExperience } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Estudio contable fundado por Fernando Vatteone en ${site.foundedYear}. ${yearsOfExperience} años de trayectoria asesorando a empresas y particulares en Paraguay.`,
}

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        lines={[
          'Desde 1956,',
          <span key="l2">
            los mismos <span className="italic text-teal">principios</span>
          </span>,
        ]}
        lead={`El estudio fue fundado por Fernando Vatteone para brindar un servicio responsable, eficiente y honesto en el ámbito contable. ${yearsOfExperience} años después, esa sigue siendo la única vara.`}
      />

      {/* Misión y visión, tomadas del sitio original */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-px border-y border-line bg-line md:grid-cols-2">
            <div className="bg-paper px-8 py-14 md:px-12 md:py-20">
              <Reveal>
                <p className="eyebrow">Misión</p>
                <p className="mt-7 font-display text-[clamp(1.375rem,2.3vw,1.875rem)] leading-snug text-ink">
                  Proporcionar a empresas y particulares la confianza necesaria
                  para resolver cualquier cuestión relacionada con aspectos
                  impositivos y contables, garantizando una atención profesional
                  y personalizada.
                </p>
              </Reveal>
            </div>
            <div className="bg-paper px-8 py-14 md:px-12 md:py-20">
              <Reveal delay={1}>
                <p className="eyebrow">Visión</p>
                <p className="mt-7 font-display text-[clamp(1.375rem,2.3vw,1.875rem)] leading-snug text-ink">
                  Estamos comprometidos con la innovación continua, respaldados
                  por una sólida trayectoria de {yearsOfExperience} años en la
                  asesoría a empresas de diversos sectores.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="border-t border-line bg-paper-2/60 py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-gold" />
              Trayectoria
            </p>
          </Reveal>

          <ol className="mt-16 border-t border-line">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 0.6}>
                <div className="group grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="display text-[clamp(2rem,4vw,3rem)] text-teal transition-opacity duration-500">
                      {t.year}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-[19px] font-medium tracking-tight text-ink">
                      {t.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="max-w-xl text-[16px] leading-relaxed text-ink-soft">
                      {t.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span className="inline-block h-px w-8 bg-gold" />
                  Cómo trabajamos
                </p>
                <h2 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)] text-ink">
                  Un contador que{' '}
                  <span className="italic text-teal">atiende el teléfono</span>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={1}>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  Contamos con profesionales de experiencia capaces de asesorar
                  y resolver cuestiones contables, manteniendo un registro
                  ordenado y al día de las actividades económicas de cada
                  cliente. No tercerizamos la relación: la misma persona que
                  conoce tu empresa es la que te responde.
                </p>
              </Reveal>
              <Reveal delay={2}>
                <ul className="mt-10 space-y-6 border-t border-line pt-8">
                  {[
                    'Una persona de referencia asignada a tu cuenta.',
                    'Reportes mensuales claros, sin jerga innecesaria.',
                    'Aviso anticipado de vencimientos impositivos.',
                    'Respuesta por WhatsApp en horario de oficina.',
                  ].map((item, i) => (
                    <li key={item} className="flex gap-5">
                      <span className="mt-1.5 font-mono text-[11px] tracking-widest text-muted">
                        0{i + 1}
                      </span>
                      <span className="text-[16px] leading-relaxed text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Clients />
      <Contact />
    </>
  )
}
