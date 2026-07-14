import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { useParallax } from '@/lib/useParallax'
import { Container } from '@/components/ui/Section'

/**
 * Banner de sangria total para o topo de uma página interna — a mesma linguagem do
 * hero da home, em altura menor. O `id="hero"` é o que o Header observa para manter
 * a navegação clara enquanto ela repousa sobre a foto.
 */
export function PageBanner({
  image,
  alt,
  eyebrow,
  title,
  description,
  imagePosition = 'center',
  children,
}: {
  image: string
  alt: string
  eyebrow: string
  title: ReactNode
  description: string
  /** Lado da foto que não pode ser cortado quando a tela estreita — normalmente o rosto. */
  imagePosition?: 'center' | 'right' | 'left'
  /** Espaço para CTAs abaixo do texto. */
  children?: ReactNode
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const y = useParallax(ref)

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
  })

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[28rem] overflow-hidden md:min-h-[34rem] lg:min-h-[38rem]"
    >
      {/* A moldura é maior que a seção: a foto pode deslizar sem descolar das bordas. */}
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <motion.img
          src={image}
          alt={alt}
          loading="eager"
          decoding="async"
          initial={{ scale: reduced ? 1 : 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          className={cn(
            'absolute inset-0 size-full object-cover',
            imagePosition === 'right' && 'object-right',
            imagePosition === 'left' && 'object-left',
            imagePosition === 'center' && 'object-center',
          )}
        />
      </motion.div>

      {/* Véu do lado do texto: sem ele, o título branco cairia sobre pele clara. */}
      <div
        aria-hidden
        className="from-ink-900/90 via-ink-900/55 absolute inset-0 bg-gradient-to-r to-transparent md:via-45%"
      />

      {/* Sombra no topo: sustenta os links do menu, que passam por cima da foto. */}
      <div
        aria-hidden
        className="from-ink-900/70 absolute inset-x-0 top-0 h-36 bg-gradient-to-b to-transparent"
      />

      {/*
        Saída para a seção de baixo: a foto se dissolve no creme do corpo em vez de terminar
        numa linha reta. É a mesma emenda das seções, feita por cima da imagem.
      */}
      <div
        aria-hidden
        className="to-cream-100 absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent md:h-36"
      />

      <Container className="flex min-h-[28rem] items-center pb-16 pt-36 md:min-h-[34rem] md:pt-32 lg:min-h-[38rem]">
        <div className="max-w-xl">
          <motion.p
            {...rise(0)}
            className="text-mocha-200 flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.28em]"
          >
            <span aria-hidden className="from-mocha-200/0 to-mocha-200/70 h-px w-8 bg-gradient-to-r" />
            {eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.1)}
            className="font-display text-cream-50 mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="text-cream-200 mt-6 max-w-md text-pretty leading-relaxed"
          >
            {description}
          </motion.p>

          {children ? (
            <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-4">
              {children}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

/** Palavra em script sobre a foto — a versão clara do `Script` usado no creme. */
export function BannerScript({ children }: { children: ReactNode }) {
  return (
    <span className="font-script text-mocha-200 pr-1 text-[1.15em] font-normal">{children}</span>
  )
}
