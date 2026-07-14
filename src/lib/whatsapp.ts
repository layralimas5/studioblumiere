import { site } from '@/content/site'

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 * Usamos `wa.me` porque funciona igual no app do celular e no WhatsApp Web.
 *
 * `phone` permite mandar a reserva direto para a profissional escolhida;
 * sem ele, cai no contato geral do salão.
 */
export function whatsappUrl(message: string, phone: string = site.whatsapp): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
