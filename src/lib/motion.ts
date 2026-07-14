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
