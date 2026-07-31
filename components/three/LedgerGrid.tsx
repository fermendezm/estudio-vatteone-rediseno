'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 54
const ROWS = 34
const WIDTH = 17
const DEPTH = 11

/**
 * "El libro mayor": una malla de líneas finas que ondula como una hoja.
 * Se dibuja con LineSegments + ShaderMaterial — el desplazamiento ocurre
 * enteramente en la GPU, así que mover 9.000 vértices no cuesta nada de CPU.
 */
export default function LedgerGrid({
  pointer,
}: {
  pointer: React.MutableRefObject<THREE.Vector2>
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const pos: number[] = []
    const uvs: number[] = []

    const at = (i: number, j: number): [number, number, number, number] => {
      const x = (i / (COLS - 1) - 0.5) * WIDTH
      const y = (j / (ROWS - 1) - 0.5) * DEPTH
      return [x, y, i / (COLS - 1), j / (ROWS - 1)]
    }

    const push = (a: number[], b: number[]) => {
      pos.push(a[0], a[1], 0, b[0], b[1], 0)
      uvs.push(a[2], a[3], b[2], b[3])
    }

    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS - 1; i++) push(at(i, j), at(i + 1, j))
    }
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS - 1; j++) push(at(i, j), at(i, j + 1))
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('aUv', new THREE.Float32BufferAttribute(uvs, 2))
    return g
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTeal: { value: new THREE.Color('#0c8183') },
      uGold: { value: new THREE.Color('#c9a45c') },
      uOpacity: { value: 0 },
    }),
    [],
  )

  useFrame((_, delta) => {
    const m = matRef.current
    if (!m) return
    m.uniforms.uTime.value += delta
    // Fade-in de entrada, una sola vez
    m.uniforms.uOpacity.value = THREE.MathUtils.damp(
      m.uniforms.uOpacity.value,
      1,
      1.2,
      delta,
    )
    const p = m.uniforms.uPointer.value as THREE.Vector2
    p.lerp(pointer.current, Math.min(1, delta * 2.5))
  })

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          uniform float uTime;
          uniform vec2  uPointer;
          attribute vec2 aUv;
          varying float vElev;
          varying vec2  vUv;

          void main() {
            vUv = aUv;
            vec3 p = position;

            // Tres ondas de distinta frecuencia: evita el patrón obvio de una sola sinusoide
            float w =
                sin(p.x * 0.42 + uTime * 0.42) * 0.34
              + sin(p.y * 0.55 - uTime * 0.31) * 0.26
              + sin((p.x + p.y) * 0.24 + uTime * 0.19) * 0.30;

            // El cursor levanta la hoja: campana gaussiana alrededor del puntero
            vec2 mouse = vec2(uPointer.x * 7.5, uPointer.y * 4.2);
            float d = distance(p.xy, mouse);
            w += exp(-d * d * 0.09) * 0.85;

            p.z += w;
            vElev = w;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3  uTeal;
          uniform vec3  uGold;
          uniform float uOpacity;
          varying float vElev;
          varying vec2  vUv;

          void main() {
            // Solo las crestas altas viran al dorado; el resto se mantiene teal
            vec3 color = mix(uTeal, uGold, smoothstep(0.75, 1.75, vElev));

            // Disolución hacia los bordes para que la malla se funda con el papel.
            // smoothstep con edge0 > edge1 es indefinido en GLSL: se invierte a mano.
            float edgeX = smoothstep(0.0, 0.32, vUv.x) * (1.0 - smoothstep(0.68, 1.0, vUv.x));
            float edgeY = smoothstep(0.0, 0.28, vUv.y) * (1.0 - smoothstep(0.42, 0.88, vUv.y));

            float alpha = edgeX * edgeY * 0.30 * uOpacity;
            alpha *= 0.6 + smoothstep(-0.4, 1.2, vElev) * 0.6;

            if (alpha < 0.004) discard;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </lineSegments>
  )
}
