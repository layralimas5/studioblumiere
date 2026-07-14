import { cn } from '@/lib/cn'

/**
 * A marca é o único elemento manuscrito fixo da tela. O "Studio B" em versalete
 * segura o script para que ele leia como assinatura, não como enfeite.
 *
 * `tone="light"` é usado quando a logo repousa sobre a foto do banner.
 */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <span className={cn('flex flex-col items-center leading-none', className)}>
      <span
        className={cn(
          'font-display text-[0.5625rem] font-medium uppercase tracking-[0.42em] transition-colors',
          tone === 'light' ? 'text-cream-200' : 'text-ink-500',
        )}
      >
        Studio B
      </span>
      <span
        className={cn(
          'font-script -mt-1 text-3xl transition-colors',
          tone === 'light' ? 'text-cream-50' : 'text-ink-900',
        )}
      >
        Lumière
      </span>
    </span>
  )
}
