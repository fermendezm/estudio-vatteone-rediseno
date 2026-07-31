'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 140

/** Partículas doradas a la deriva. Muy pocas y muy tenues: dan aire, no ruido. */
export default function GoldDust() {
  const ref = useRef<THREE.Points>(null)

  const { geometry, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const spd = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      sizes[i] = Math.random() * 0.05 + 0.015
      spd[i] = Math.random() * 0.12 + 0.03
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return { geometry: g, speeds: spd }
  }, [])

  useFrame((_, delta) => {
    const points = ref.current
    if (!points) return
    const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * delta
      if (arr[i * 3 + 1] > 4.5) arr[i * 3 + 1] = -4.5
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={/* glsl */ `
          attribute float aSize;
          varying float vAlpha;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * 620.0 / -mv.z;
            vAlpha = smoothstep(0.015, 0.065, aSize);
          }
        `}
        fragmentShader={/* glsl */ `
          varying float vAlpha;
          void main() {
            // Punto circular con borde suave
            float d = length(gl_PointCoord - 0.5);
            float a = (1.0 - smoothstep(0.32, 0.5, d)) * vAlpha * 0.5;
            if (a < 0.01) discard;
            gl_FragColor = vec4(0.72, 0.60, 0.32, a);
          }
        `}
      />
    </points>
  )
}
