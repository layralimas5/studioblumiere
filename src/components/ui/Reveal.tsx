import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT_EXPO } from '@/lib/motion'

/** Entrada suave ao entrar na viewport. Vira um fade puro quando o sistema pede menos movimento. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  )
}
