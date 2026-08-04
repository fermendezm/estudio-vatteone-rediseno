'use client'

import { useState } from 'react'
import { site } from '@/lib/site'
import Reveal, { RevealLines } from './Reveal'

// Definí NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Web3Forms, Getform…) y el
// formulario envía por fetch. Sin endpoint, cae a abrir el cliente de correo:
// el sitio es estático, no hay backend propio.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT

type Status = 'idle' | 'sending' | 'sent' | 'error'

function Field({
  label,
  name,
  type = 'text',
  required,
  textarea,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  textarea?: boolean
}) {
  const base =
    'peer w-full border-0 border-b border-line bg-transparent pb-3 pt-6 text-[16px] text-ink outline-none transition-colors placeholder:text-transparent focus:border-teal'
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required={required}
          placeholder={label}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={label}
          className={base}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-0 text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-[16px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-teal"
      >
        {label}
        {required && <span className="text-gold-deep"> *</span>}
      </label>
    </div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: los bots completan campos ocultos, las personas no
    if (data.get('empresa_web')) return

    if (!ENDPOINT) {
      const body = [
        `Nombre: ${data.get('nombre')}`,
        `Correo: ${data.get('correo')}`,
        `Teléfono: ${data.get('telefono') || '—'}`,
        '',
        String(data.get('mensaje') ?? ''),
      ].join('\n')
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Consulta web — ${data.get('nombre')}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="relative border-t border-line py-20 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold" />
                Contacto
              </p>
            </Reveal>
            <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)] text-ink">
              <RevealLines
                lines={[
                  'Conversemos',
                  <span key="l2">
                    sobre tus <span className="italic text-teal">números</span>
                  </span>,
                ]}
              />
            </h2>

            <Reveal delay={1}>
              <dl className="mt-12 space-y-8">
                <div>
                  <dt className="eyebrow">Dirección</dt>
                  <dd className="mt-2">
                    <a
                      href={site.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[16px] text-ink transition-colors hover:text-teal"
                    >
                      {site.address}
                    </a>
                    <span className="mt-1 block text-[14px] text-muted">
                      {site.city}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Correo electrónico</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline break-all text-[15px] text-ink transition-colors hover:text-teal md:text-[16px]"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Teléfono</dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:+${site.phoneRaw}`}
                      className="link-underline text-[16px] text-ink transition-colors hover:text-teal"
                    >
                      {site.phone}
                    </a>
                    <span className="mt-1 block text-[14px] text-muted">
                      {site.hours}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={site.whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-5 py-2.5 text-[14px] text-ink transition-colors hover:border-teal hover:text-teal"
                >
                  WhatsApp
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-5 py-2.5 text-[14px] text-ink transition-colors hover:border-teal hover:text-teal"
                >
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={1}>
              <form onSubmit={onSubmit} className="space-y-7 md:space-y-9">
                <input
                  type="text"
                  name="empresa_web"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                />
                <Field label="Nombre completo" name="nombre" required />
                <Field
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  required
                />
                <Field label="Teléfono" name="telefono" type="tel" />
                <Field label="¿Cómo podemos ayudarte?" name="mensaje" textarea required />

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-teal-deep disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
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
                  </button>

                  <p aria-live="polite" className="text-[14px]">
                    {status === 'sent' && (
                      <span className="text-teal">
                        Gracias, recibimos tu consulta. Te respondemos a la
                        brevedad.
                      </span>
                    )}
                    {status === 'error' && (
                      <span className="text-gold-deep">
                        No pudimos enviarlo. Escribinos a{' '}
                        <a
                          className="underline"
                          href={`mailto:${site.email}`}
                        >
                          {site.email}
                        </a>
                        .
                      </span>
                    )}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
