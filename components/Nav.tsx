'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { asset } from '@/lib/asset'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '@/lib/site'
import { lockScroll } from '@/lib/scroll-lock'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquear el scroll de fondo con el menú móvil abierto
  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? 'border-b border-line/80 bg-paper/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:h-20 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — inicio`}
          >
            <Image
              src={asset("/img/logo-vatteone.png")}
              alt=""
              width={633}
              height={1024}
              priority
              className="h-9 w-auto md:h-10"
            />
            {/* El nombre también en móvil: antes el header era un logo de 22px
                y una hamburguesa, sin marca legible. La bajada se oculta en
                pantallas muy angostas para no empujar al botón de menú. */}
            <span className="block leading-none">
              <span className="block font-display text-[17px] tracking-tight text-ink md:text-[19px]">
                Estudio Vatteone
              </span>
              <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.2em] text-muted min-[380px]:block">
                Fundado en {site.foundedYear}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-[15px] text-ink-soft transition-colors hover:text-teal"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-ink px-6 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-teal-deep"
            >
              <span className="relative z-10">Agendar consulta</span>
            </a>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="relative z-[120] flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-400 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-400 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[110] bg-paper md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-line py-5"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-4xl text-ink"
                  >
                    <span className="text-[11px] tracking-widest text-muted">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                href={site.whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 rounded-full bg-ink px-6 py-4 text-center text-[15px] font-medium text-paper"
              >
                Agendar consulta
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
