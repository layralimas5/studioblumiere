import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Button } from '@/components/ui/Button'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { BridalTeaser } from '@/components/sections/BridalTeaser'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { Testimonials } from '@/components/sections/Testimonials'
import { BookingSection } from '@/components/sections/BookingSection'
import { Faq } from '@/components/sections/Faq'

export function HomePage() {
  useDocumentMeta(
    'Studio B Lumière — Beleza para noivas e para o seu dia a dia',
    'Maquiagem, cílios, unhas e sobrancelhas em Vitória, ES. Especialistas em noivas. Escolha o serviço, a profissional e o horário, e reserve em menos de um minuto.',
  )

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesTeaser />
      <BridalTeaser />

      <Section>
        <Container>
          <SectionHeading eyebrow="Portfólio" title="Trabalhos recentes" />

          <div className="mt-14">
            <GalleryGrid limit={8} />
          </div>

          <div className="mt-14 text-center">
            <Button as={Link} to="/galeria" variant="secondary" size="lg">
              Ver a galeria completa
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>

      <Testimonials />
      <BookingSection />
      <Faq />
    </>
  )
}
