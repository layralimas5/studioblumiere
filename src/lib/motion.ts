/** Curva de saída usada em todas as animações — mantém o movimento coerente no site inteiro. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

/**
 * Troca de página: o conteúdo antigo recua antes que o novo suba. O corte seco entre rotas
 * é o que mais denuncia um site "montado em pedaços".
 *
 * Só `opacity` e `transform` — desfocar um elemento do tamanho da tela custa caro e engasga
 * no celular. O blur fica para os elementos pequenos, no `Reveal`.
 */
export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: EASE_OUT_EXPO },
} as const

/** Mola usada em elementos que precisam parecer físicos (indicador do menu, lightbox). */
export const SPRING = { type: 'spring', stiffness: 260, damping: 30 } as const
