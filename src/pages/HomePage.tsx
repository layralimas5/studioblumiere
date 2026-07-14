import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { BridalTeaser } from '@/components/sections/BridalTeaser'
import { Testimonials } from '@/components/sections/Testimonials'
import { BookingSection } from '@/components/sections/BookingSection'

/**
 * A home tem um objetivo só: levar ao agendamento. O catálogo, a galeria e as
 * dúvidas vivem na página de serviços — aqui eles só roubariam o foco.
 */
export function HomePage() {
  useDocumentMeta(
    'Studio B Lumière — Maquiagem, cílios e unhas em Vitória, ES',
    'Maquiagem, cílios, unhas e sobrancelhas no Itararé, Vitória. Especialistas em noivas. Escolha o serviço, a profissional e o horário, e reserve em menos de um minuto.',
  )

  return (
    <>
      <Hero />
      <TrustBar />
      <BridalTeaser />
      <BookingSection />
      <Testimonials />
    </>
  )
}
