'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Scroll suave con inercia. Se desactiva si el usuario pidió menos movimiento
 * en el sistema operativo.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Los anchors internos (#contacto) los maneja Lenis para que el easing sea el mismo
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.includes('#')) return
      const hash = href.slice(href.indexOf('#'))
      if (hash.length < 2) return
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -90 })
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
