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
 * `tone` alterna a profundidade do fundo. O ritmo entre 950 e 900 é o que impede
 * a página inteira de virar um bloco escuro contínuo.
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
  tone?: 'base' | 'raised'
}) {
  const tones = {
    base: 'bg-night-950',
    raised: 'bg-night-900',
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
    <p className="text-gold-400 flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.28em]">
      <span aria-hidden className="from-gold-500/0 to-gold-500/70 h-px w-8 bg-gradient-to-r" />
      {children}
      <span aria-hidden className="from-gold-500/70 to-gold-500/0 h-px w-8 bg-gradient-to-r" />
    </p>
  )
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

      <Title className="font-display text-ivory-50 mt-6 text-balance text-4xl font-light leading-[1.08] md:text-6xl">
        {title}
      </Title>

      {description ? (
        <p className="text-ivory-400 mt-6 text-pretty text-base leading-relaxed md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

/** Card padrão: borda viva, superfície em degradê e brilho no hover. */
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
        'surface border-night-700/70 relative rounded-2xl border',
        interactive &&
          'hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(201,169,97,0.35)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
