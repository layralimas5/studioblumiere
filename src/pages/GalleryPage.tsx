import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Container, Script, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { BookingSection } from '@/components/sections/BookingSection'

export function GalleryPage() {
  useDocumentMeta(
    'Galeria — Studio B Lumière',
    'Penteados, maquiagens, extensões de cílios, unhas e produções de noiva feitas no Studio B Lumière. Filtre por categoria e veja o nosso trabalho.',
  )

  return (
    <>
      <Section className="overflow-hidden pt-36 md:pt-44">
        <div
          aria-hidden
          className="glow-warm pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full"
        />

        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Galeria"
            title={
              <>
                O nosso trabalho,
                <br />
                <Script>sem filtro</Script>
              </>
            }
            description="Fotos reais de clientes reais. Filtre pela categoria que te interessa."
          />

          <Reveal delay={0.1} className="mt-16">
            <GalleryGrid />
          </Reveal>
        </Container>
      </Section>

      <BookingSection />
    </>
  )
}
