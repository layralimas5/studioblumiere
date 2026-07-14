import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { categories, professionals, services } from '@/content/catalog'
import { formatDuration, formatPrice } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Card, Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { BannerScript, PageBanner } from '@/components/sections/PageBanner'
import { ServicesTeaser } from '@/components/sections/ServicesTeaser'
import { BookingSection } from '@/components/sections/BookingSection'
import { Faq } from '@/components/sections/Faq'

export function ServicesPage() {
  useDocumentMeta(
    'Serviços e preços — Studio B Lumière',
    'Maquiagem, cílios, unhas e sobrancelhas. Veja todos os serviços do Studio B Lumière, com duração e preço, e reserve com a profissional que você escolher.',
  )

  return (
    <>
      <PageBanner
        image="/images/services/banner.png"
        alt="Cliente com a pele e a maquiagem finalizadas, refletida no espelho"
        imagePosition="right"
        eyebrow="Serviços"
        title={
          <>
            Tudo o que fazemos,
            <br />
            <BannerScript>sem letra miúda</BannerScript>
          </>
        }
        description="O valor final depende do que combinarmos na avaliação. Você sabe quanto vai pagar antes de começar: nada de surpresa no caixa."
      >
        <Button as="a" href="#agendar" size="lg">
          Agendar meu horário
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </PageBanner>

      <ServicesTeaser />

      {categories.map((category, index) => {
        const items = services.filter((service) => service.category === category.id)

        return (
          <Section
            key={category.id}
            id={category.id}
            tone={index % 2 === 0 ? 'raised' : 'base'}
            className="py-20"
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                <Reveal>
                  <div className="lg:sticky lg:top-28">
                    <Photo
                      src={`/images/services/${category.id}.jpg`}
                      alt={category.label}
                      zoom
                      className="mb-7 aspect-[4/3] w-full rounded-2xl shadow-[0_30px_60px_-35px_rgba(26,21,18,0.5)]"
                    />
                    <h2 className="font-display text-ink-900 text-3xl font-semibold tracking-tight md:text-4xl">
                      {category.label}
                    </h2>
                    <p className="text-ink-500 mt-4 text-pretty text-sm leading-relaxed">
                      {category.tagline}
                    </p>
                  </div>
                </Reveal>

                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="space-y-3"
                >
                  {items.map((service) => (
                    <motion.li key={service.id} variants={staggerItem}>
                      <Card interactive className="p-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                          <h3 className="font-display text-ink-900 text-xl font-medium">
                            {service.name}
                          </h3>
                          <p className="text-mocha-500 text-sm font-medium">
                            {formatPrice(service.priceFrom)}
                          </p>
                        </div>

                        <p className="text-ink-500 mt-3 text-pretty text-sm leading-relaxed">
                          {service.description}
                        </p>

                        <p className="text-ink-400 mt-5 flex items-center gap-1.5 text-xs">
                          <Clock className="size-3.5" aria-hidden />
                          {formatDuration(service.durationMin)}
                        </p>
                      </Card>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Container>
          </Section>
        )
      })}

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Equipe"
            title="As mãos por trás do trabalho"
            description="Você escolhe quem te atende. Cada uma tem a sua especialidade — e o agendador só mostra quem faz o serviço que você selecionou."
          />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-3"
          >
            {professionals.map((pro) => (
              <motion.li key={pro.id} variants={staggerItem} className="group text-center">
                <Photo
                  src={pro.photo}
                  alt={pro.name}
                  zoom
                  className="ring-cream-300 group-hover:ring-mocha-300 mx-auto aspect-square w-full max-w-[11rem] rounded-2xl ring-1 transition-all duration-500"
                />
                <p className="text-ink-900 mt-5 text-sm font-medium">{pro.name}</p>
                <p className="text-mocha-500 mt-1.5 text-xs leading-snug">{pro.role}</p>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-14 text-center">
            <Button as="a" href="#agendar" size="lg">
              Reservar com a minha profissional
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>

      <BookingSection />
      <Faq />
    </>
  )
}
