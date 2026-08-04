import type { ReactNode } from 'react'
import Reveal, { RevealLines } from './Reveal'

/** Cabecera común de las páginas internas: mismo ritmo tipográfico que el hero. */
export default function PageHeader({
  eyebrow,
  lines,
  lead,
}: {
  eyebrow: string
  lines: ReactNode[]
  lead: string
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-14 pt-32 md:pb-28 md:pt-52">
      {/* Halo teal muy tenue detrás del título */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-teal-wash blur-3xl opacity-60"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-gold" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="display mt-8 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] text-ink">
          <RevealLines lines={lines} />
        </h1>
        <Reveal delay={2}>
          <p className="mt-9 max-w-2xl text-[17px] leading-relaxed text-ink-soft md:text-[19px]">
            {lead}
          </p>
        </Reveal>
      </div>
    </header>
  )
}
