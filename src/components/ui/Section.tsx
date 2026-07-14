import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('relative mx-auto w-full max-w-6xl px-6', className)}>{children}</div>
}

/**
 * `tone` alterna a temperatura do fundo. O ritmo entre os cremes é o que impede
 * a página inteira de virar um bloco claro contínuo.
 *
 * `base` é a cor do corpo — não precisa de emenda. Os outros dois tons entram e saem
 * em degradê (`section-blend`), então a troca de cor entre seções nunca é uma linha seca.
 */
export function Section({
  id,
  children,
  className,
  tone = 'base',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'base' | 'raised' | 'soft'
}) {
  const tones = {
    base: 'bg-cream-100',
    raised: 'section-blend [--tone:var(--color-cream-200)]',
    soft: 'section-blend [--tone:var(--color-cream-50)]',
  } as const

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 py-24 md:py-32', tones[tone], className)}
    >
      {children}
    </section>
  )
}

/** Rótulo pequeno em versalete, entre dois filetes — a assinatura editorial da marca. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-mocha-500 flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.28em]">
      <span aria-hidden className="from-mocha-400/0 to-mocha-400/70 h-px w-8 bg-gradient-to-r" />
      {children}
      <span aria-hidden className="from-mocha-400/70 to-mocha-400/0 h-px w-8 bg-gradient-to-r" />
    </p>
  )
}

/** Palavra em script café — o toque manuscrito que assina cada título. */
export function Script({ children }: { children: ReactNode }) {
  return <span className="font-script text-mocha-500 pr-1 text-[1.15em] font-normal">{children}</span>
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Title = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  /** O título de topo de uma página precisa ser `h1` — só um por documento. */
  as?: 'h1' | 'h2'
}) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow ? (
        <div className={cn('flex', align === 'center' ? 'justify-center' : 'justify-start')}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}

      <Title className="font-display text-ink-900 mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
        {title}
      </Title>

      {description ? (
        <p className="text-ink-500 mt-6 text-pretty text-base leading-relaxed md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

/** Card padrão: superfície branca sobre o creme, borda discreta e elevação no hover. */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={cn(
        'border-cream-300 relative rounded-2xl border bg-white',
        interactive &&
          'hover:border-mocha-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(26,21,18,0.35)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
