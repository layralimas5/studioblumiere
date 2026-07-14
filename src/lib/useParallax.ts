import type { RefObject } from 'react'
import { useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * Foto que rola mais devagar que o texto por cima dela — a profundidade que separa um
 * banner "colado na tela" de uma cena com camadas.
 *
 * O deslocamento é percentual e menor que a folga da moldura (`-inset-y-[12%]`), então a
 * imagem nunca descola das bordas. Com `prefers-reduced-motion`, ela simplesmente não anda.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, distance = 10): MotionValue<string> {
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  return useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : `${distance}%`])
}
