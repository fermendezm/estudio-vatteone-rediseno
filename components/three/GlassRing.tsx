'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Anillo de vidrio: la continuidad del estudio desde 1956, sin ser literal.
 * En equipos modestos cae a un material opaco tipo cerámica (misma silueta,
 * sin el costo del render de transmisión).
 */
export default function GlassRing({
  pointer,
  quality,
}: {
  pointer: React.MutableRefObject<THREE.Vector2>
  quality: 'high' | 'low'
}) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return
    const t = state.clock.elapsedTime

    // Precesión acotada, nunca una vuelta completa: un toro girando libre en Y
    // pasa de canto y ahí su silueta es una pastilla, no un anillo.
    mesh.current.rotation.x = -0.52 + Math.sin(t * 0.31) * 0.13
    mesh.current.rotation.y = Math.sin(t * 0.23) * 0.5
    mesh.current.rotation.z += delta * 0.1
    mesh.current.position.y = Math.sin(t * 0.45) * 0.12

    // Paralaje: el anillo sigue al cursor con retardo
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.28,
      2,
      delta,
    )
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.2,
      2,
      delta,
    )
  })

  const segments: [number, number] = quality === 'high' ? [180, 44] : [96, 22]

  return (
    <group ref={group}>
      <mesh ref={mesh} castShadow={false}>
        <torusGeometry args={[0.92, 0.27, segments[1], segments[0]]} />
        {quality === 'high' ? (
          <meshPhysicalMaterial
            transmission={0.94}
            thickness={0.9}
            roughness={0.12}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
            metalness={0}
            attenuationColor={new THREE.Color('#3f9b98')}
            attenuationDistance={0.7}
            color={new THREE.Color('#dceeec')}
            envMapIntensity={1}
          />
        ) : (
          <meshStandardMaterial
            color="#dcebe9"
            roughness={0.28}
            metalness={0.1}
            envMapIntensity={0.9}
          />
        )}
      </mesh>
    </group>
  )
}
