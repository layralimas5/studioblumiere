import { cn } from '@/lib/cn'

/**
 * A marca é o único elemento manuscrito fixo da tela. O "Studio B" em versalete
 * segura o script para que ele leia como assinatura, não como enfeite.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex flex-col items-center leading-none', className)}>
      <span className="font-display text-ink-500 text-[0.5625rem] font-medium uppercase tracking-[0.42em]">
        Studio B
      </span>
      <span className="font-script text-ink-900 -mt-1 text-3xl">Lumière</span>
    </span>
  )
}
