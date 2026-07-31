'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  }),
}

/** Aparición al entrar en viewport. `delay` se expresa en índices, no en segundos. */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'section'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className ? `reveal ${className}` : 'reveal'}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Título que se revela línea por línea, con máscara. Pasar el texto ya cortado
 * en líneas para controlar exactamente dónde corta.
 */
export function RevealLines({
  lines,
  className,
  delay = 0,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
}) {
  return (
    <span className={className ? `reveal ${className}` : 'reveal'}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
