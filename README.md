# Estudio Vatteone — sitio 2026

Rediseño del sitio de [estudiovatteone.com.py](https://estudiovatteone.com.py) (WordPress + Elementor)
a un sitio estático moderno, con escena WebGL en el hero.

## Stack

| Pieza | Qué hace |
|---|---|
| Next.js 15 (App Router, `output: 'export'`) | Genera HTML estático en `out/` |
| React Three Fiber 9 + drei 10 + three 0.180 | Escena 3D del hero |
| Tailwind CSS 4 | Tokens de diseño en `app/globals.css` (`@theme`) |
| Framer Motion 12 | Reveals al scroll y transiciones |
| Lenis | Scroll suave con inercia |

## Comandos

Desarrollo en `http://localhost:4323`:

```bash
npm run dev
```

Build estático a `out/`:

```bash
npm run build
```

`out/` se sube tal cual a Vercel, Netlify, Cloudflare Pages o por FTP a un hosting
común. No requiere Node en el servidor.

## Dónde se edita el contenido

Todo el texto, los servicios, los pilares, la línea de tiempo y los datos de
contacto viven en un solo archivo: **`lib/site.ts`**. No hay que tocar los
componentes para cambiar un teléfono o agregar un servicio.

Los años de trayectoria se calculan solos (`new Date().getFullYear() - 1956`).
El sitio original tenía "65 años" escrito a mano y quedó desactualizado.

## El formulario de contacto

El sitio es estático: no hay backend propio. `components/Contact.tsx` tiene dos modos:

- **Sin configurar** (por defecto): al enviar abre el cliente de correo del
  visitante con la consulta ya redactada hacia `administracion@estudiovatteone.com.py`.
- **Con endpoint**: definí `NEXT_PUBLIC_FORM_ENDPOINT` en `.env.local` apuntando a
  Formspree, Web3Forms o Getform y el formulario envía por `fetch`, sin salir del sitio.

```bash
# .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Incluye un honeypot (`empresa_web`) contra bots.

## La escena 3D

`components/three/` — tres piezas, todas sobre canvas transparente:

- **`LedgerGrid`** — malla de líneas que ondula, tipo hoja de libro mayor. El
  desplazamiento es 100 % GPU (`ShaderMaterial`), y reacciona al cursor.
- **`GlassRing`** — anillo de vidrio jade (`meshPhysicalMaterial` con
  `transmission`). Precesión acotada, nunca da una vuelta completa: de canto la
  silueta de un toro es una pastilla, no un anillo.
- **`GoldDust`** — 140 partículas doradas a la deriva.

La iluminación es un `<Environment>` armado con `<Lightformer>`, sin HDRI externo:
el sitio funciona offline y no depende de ningún CDN.

### Degradación

`HeroScene` detecta el equipo antes de montar el canvas:

- `prefers-reduced-motion`, o sin WebGL → **no se monta el canvas**.
- Pantalla < 900 px o ≤ 4 núcleos → calidad `low`: menos DPR, sin antialias y el
  anillo pasa a material opaco (la transmisión es lo caro).
- Fuera de viewport → `frameloop="never"`, la GPU queda libre al scrollear.

## Accesibilidad y robustez

- Sin JS, Framer Motion dejaría todo en `opacity: 0`. El `<noscript>` de
  `app/layout.tsx` revierte la clase `.reveal` para que la página siga siendo legible.
- Link "Saltar al contenido", foco visible, `aria-live` en el estado del formulario.
- Datos estructurados `AccountingService` (JSON-LD) en el layout.

## Assets

`public/img/` tiene el logo y los logos de clientes tomados del sitio original.
Las fotos de los servicios no se usan: el diseño reemplazó la grilla de tarjetas
con foto por un índice tipográfico.
