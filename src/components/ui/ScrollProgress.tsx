import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Filete café no topo, do tamanho do que já foi lido. É um indicador, não uma animação:
 * ele responde ao dedo da pessoa, então continua útil mesmo com `prefers-reduced-motion`.
 * A mola só tira o serrilhado do scroll — sem ela o traço treme a cada evento.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="from-mocha-400 via-mocha-500 to-mocha-300 fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r"
    />
  )
}
