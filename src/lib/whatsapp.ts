import { site } from '@/content/site'

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 * Usamos `wa.me` porque funciona igual no app do celular e no WhatsApp Web.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}
