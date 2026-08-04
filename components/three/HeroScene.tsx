'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import LedgerGrid from './LedgerGrid'
import GlassRing from './GlassRing'
import GoldDust from './GoldDust'

type Quality = 'high' | 'low' | 'off'

/**
 * La cámara tiene fov vertical, así que en un teléfono en vertical el encuadre
 * horizontal se angosta muchísimo: el anillo, ubicado para pantalla ancha, caía
 * fuera del frustum y el hero móvil se quedaba sin objeto. Acá la composición se
 * recalcula contra el aspecto real del canvas, no contra un breakpoint de CSS.
 */
function Composition({
  pointer,
  quality,
}: {
  pointer: React.MutableRefObject<THREE.Vector2>
  quality: 'high' | 'low'
}) {
  const size = useThree((s) => s.size)
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const aspect = size.width / Math.max(1, size.height)
  const portrait = aspect < 0.9

  // Media anchura visible al plano donde vive el anillo: con esto se ubica
  // dentro del encuadre en lugar de adivinar una x fija.
  const ringZ = portrait ? -1.5 : -1.9
  const dist = camera.position.z - ringZ
  const halfH = dist * Math.tan((camera.fov * Math.PI) / 360)
  const halfW = halfH * aspect

  // En vertical el anillo va al hueco libre a la derecha del titular: las tres
  // líneas del h1 ocupan como mucho dos tercios del ancho. Se posiciona en
  // fracciones del encuadre, así queda igual en 320px que en 430px.
  const ringScale = portrait ? 0.38 : 1
  const ringRadius = 1.19 * ringScale
  const ringX = portrait
    ? halfW * 0.58
    : Math.min(2.85, halfW - ringRadius - 0.12)
  const ringY = portrait ? halfH * 0.34 : 0.6

  return (
    <>
      {/* La malla, inclinada como una hoja apoyada sobre el escritorio.
          En vertical se hunde y se atenúa: con el mismo tamaño en unidades de
          mundo, las celdas se ven enormes y cruzan el párrafo del hero. */}
      <group
        position={[0, portrait ? -2.5 : -1.55, -0.5]}
        rotation={[-1.16, 0, 0]}
        scale={portrait ? 1.35 : 1}
      >
        <LedgerGrid pointer={pointer} opacity={portrait ? 0.5 : 1} />
      </group>

      <group position={[ringX, ringY, ringZ]}>
        <GlassRing pointer={pointer} quality={quality} scale={ringScale} />
      </group>

      <GoldDust />
    </>
  )
}

function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'off'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off'

  // Sin WebGL2 no vale la pena intentarlo
  try {
    const canvas = document.createElement('canvas')
    if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) return 'off'
  } catch {
    return 'off'
  }

  const cores = navigator.hardwareConcurrency ?? 4
  const narrow = window.innerWidth < 900
  return narrow || cores <= 4 ? 'low' : 'high'
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const [quality, setQuality] = useState<Quality>('off')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setQuality(detectQuality())
  }, [])

  // No gastar GPU cuando el hero salió de pantalla
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: '120px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrap.current
      if (!el) return
      const r = el.getBoundingClientRect()
      pointer.current.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -(((e.clientY - r.top) / r.height) * 2 - 1),
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {quality !== 'off' && (
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
          gl={{
            antialias: quality === 'high',
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0.9, 6.2], fov: 42 }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Luz de estudio armada a mano: sin HDRI externo, todo offline.
              El fondo del entorno es teal medio, no crema: si fuera crema el
              vidrio refractaría un plano uniforme y se vería como una mancha
              blanca. El contraste es lo que dibuja los bordes del anillo. */}
          {/* Sin `frames`: el entorno se re-renderiza cada cuadro. Con frames={1}
              el bake compite con el montaje de los Lightformer y el vidrio sale
              blanco mate la mitad de las veces. Son 4 quads planos, así que a
              esta resolución el costo por cuadro es despreciable. */}
          <Environment resolution={quality === 'high' ? 128 : 64}>
            <color attach="background" args={['#4d716f']} />
            <Lightformer
              intensity={3.2}
              position={[0, 4, 3]}
              scale={[9, 4, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={2}
              position={[-5, 0.5, 2]}
              scale={[3, 7, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={1.4}
              position={[5, -1.5, 2]}
              scale={[4, 3, 1]}
              color="#f0dcb0"
            />
            <Lightformer
              intensity={0.9}
              position={[0, -4, -3]}
              scale={[8, 3, 1]}
              color="#b7dedb"
            />
          </Environment>

          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={0.8} />

          <Composition
            pointer={pointer}
            quality={quality === 'high' ? 'high' : 'low'}
          />
        </Canvas>
      )}
    </div>
  )
}
