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
      className="from-gold-300 to-gold-500 text-night-950 fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-b shadow-[0_10px_40px_-8px_rgba(201,169,97,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  )
}
