import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  /* Café sólido: a única cor saturada da tela — por isso é sempre o próximo passo. */
  primary:
    'bg-mocha-500 text-cream-50 shadow-[0_10px_30px_-12px_rgba(141,103,72,0.65)] hover:bg-mocha-600 hover:-translate-y-px hover:shadow-[0_14px_36px_-12px_rgba(141,103,72,0.75)]',
  secondary:
    'border border-ink-900/15 text-ink-900 hover:border-mocha-400 hover:bg-mocha-500/[0.06]',
  ghost: 'text-ink-500 hover:text-ink-900 hover:bg-ink-900/5',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.9375rem]',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-40'

interface ButtonOwnProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

/**
 * `as` permite renderizar o mesmo botão como `<a>` ou `<Link>` sem duplicar estilo,
 * mantendo a semântica correta (link navega, botão age).
 */
type ButtonProps<T extends ElementType> = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | 'as'> & { as?: T }

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? 'button') as ElementType

  return (
    <Component className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Component>
  )
}
