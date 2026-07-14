import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '@/content/types'
import { EASE_OUT_EXPO, SPRING } from '@/lib/motion'

interface LightboxProps {
  items: GalleryItem[]
  /** Índice aberto; `null` mantém o lightbox fechado. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * Visor em tela cheia. A foto não "aparece": ela é a mesma da grade, e voa até o centro
 * (`layoutId`). É esse vínculo que faz a transição parecer física em vez de um pop-up.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const reduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const isOpen = index !== null
  const item = isOpen ? items[index] : undefined

  const go = (step: number) => {
    if (index === null || items.length === 0) return
    // O visor dá a volta: da última foto, avançar leva à primeira.
    onNavigate((index + step + items.length) % items.length)
  }

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    // Sem isso, a página continua rolando por baixo do visor.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
    // `index` entra na lista porque as setas do teclado precisam da foto atual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, items.length])

  return (
    <AnimatePresence>
      {isOpen && item ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
          onClick={onClose}
          className="bg-ink-900/80 fixed inset-0 z-[80] flex items-center justify-center p-4 backdrop-blur-xl md:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-cream-100 hover:bg-cream-50/15 absolute right-4 top-4 flex size-11 items-center justify-center rounded-full transition-colors md:right-6 md:top-6"
          >
            <X className="size-5" aria-hidden />
          </button>

          {items.length > 1 ? (
            <>
              <NavButton side="left" onClick={() => go(-1)} />
              <NavButton side="right" onClick={() => go(1)} />
            </>
          ) : null}

          <motion.figure
            {...(reduced ? {} : { layoutId: `gallery-${item.id}` })}
            transition={SPRING}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-full flex-col items-center gap-4"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]"
            />
            <figcaption className="text-cream-200 max-w-md text-center text-xs leading-relaxed">
              {item.alt}
            </figcaption>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      aria-label={side === 'left' ? 'Foto anterior' : 'Próxima foto'}
      className={`text-cream-100 hover:bg-cream-50/15 absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors ${
        side === 'left' ? 'left-2 md:left-6' : 'right-2 md:right-6'
      }`}
    >
      <Icon className="size-6" aria-hidden />
    </button>
  )
}
