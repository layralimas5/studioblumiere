import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  /* Dourado sólido: o único elemento verdadeiramente brilhante da tela. */
  primary:
    'bg-gradient-to-b from-gold-300 to-gold-500 text-night-950 shadow-[0_0_0_1px_rgba(201,169,97,0.5),0_8px_30px_-8px_rgba(201,169,97,0.5)] hover:shadow-[0_0_0_1px_rgba(228,205,155,0.7),0_10px_40px_-6px_rgba(201,169,97,0.7)] hover:-translate-y-px',
  secondary:
    'border border-gold-500/30 text-ivory-200 hover:border-gold-400/70 hover:text-ivory-50 hover:bg-gold-500/5',
  ghost: 'text-ivory-400 hover:text-ivory-50 hover:bg-white/5',
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
