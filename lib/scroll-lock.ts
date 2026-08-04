import type Lenis from 'lenis'

// Lenis toma el control del scroll del documento, así que `body { overflow:
// hidden }` no lo detiene: con el menú móvil abierto la página seguía
// desplazándose por detrás. Hay que frenar la instancia y además bloquear el
// scroll nativo, porque cuando el usuario pide menos movimiento Lenis ni existe.

let instance: Lenis | null = null

export function registerLenis(l: Lenis | null) {
  instance = l
}

export function lockScroll(locked: boolean) {
  if (typeof document === 'undefined') return

  if (locked) instance?.stop()
  else instance?.start()

  const html = document.documentElement
  html.style.overflow = locked ? 'hidden' : ''
  // iOS Safari ignora overflow en <html> en algunos casos; con touch-action
  // desactivado el gesto tampoco llega al documento.
  html.style.touchAction = locked ? 'none' : ''
  document.body.style.overflow = locked ? 'hidden' : ''
}
