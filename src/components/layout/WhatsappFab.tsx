import { MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'

const FALLBACK_MESSAGE = `Olá! Vim pelo site do ${site.name} e gostaria de tirar uma dúvida.`

/** Saída de emergência para quem não quer preencher o agendador. */
export function WhatsappFab() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/*
        Halo que se abre e some, como uma gota n'água. Fica atrás do botão e é inerte ao
        clique — chama o olho de quem está rolando sem competir com o conteúdo.
      */}
      {reduced ? null : (
        <motion.span
          aria-hidden
          className="bg-mocha-500/30 absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeOut' }}
        />
      )}

      <a
        href={whatsappUrl(FALLBACK_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o salão no WhatsApp"
        className="bg-mocha-500 text-cream-50 hover:bg-mocha-600 relative flex size-14 items-center justify-center rounded-full shadow-[0_14px_40px_-10px_rgba(141,103,72,0.8)] transition-all duration-200 hover:scale-105 active:scale-95 motion-reduce:transform-none"
      >
        <MessageCircle className="size-6" aria-hidden />
      </a>
    </div>
  )
}
