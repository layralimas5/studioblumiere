import { MessageCircle } from 'lucide-react'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'

const FALLBACK_MESSAGE = `Olá! Vim pelo site do ${site.name} e gostaria de tirar uma dúvida.`

/** Saída de emergência para quem não quer preencher o agendador. */
export function WhatsappFab() {
  return (
    <a
      href={whatsappUrl(FALLBACK_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o salão no WhatsApp"
      className="bg-mocha-500 text-cream-50 hover:bg-mocha-600 fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full shadow-[0_14px_40px_-10px_rgba(141,103,72,0.8)] transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  )
}
