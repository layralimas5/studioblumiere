import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { categories, professionals, services } from '@/content/catalog'
import { formatDuration, formatPrice } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Card, Container, Script, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { BookingSection } from '@/components/sections/BookingSection'

export function ServicesPage() {
  useDocumentMeta(
    'Serviços e preços — Studio B Lumière',
    'Cabelo, maquiagem, cílios, unhas e sobrancelhas. Veja todos os serviços do Studio B Lumière, com duração e preço, e reserve com a profissional que você escolher.',
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
            eyebrow="Serviços"
            title={
              <>
                Tudo o que fazemos,
                <br />
                <Script>sem letra miúda</Script>
              </>
            }
            description="Preços a partir de — o valor final depende do comprimento do cabelo, do volume e do que combinarmos na avaliação. Nada de surpresa no caixa."
          />

          {/* Índice: 6 categorias exigem um atalho, não um scroll longo */}
          <Reveal delay={0.1} className="mt-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="border-cream-300 text-ink-500 hover:border-mocha-400 hover:text-mocha-500 rounded-full border bg-white px-4 py-2 text-xs font-medium transition-colors"
                >
                  {category.label}
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

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
            className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {professionals.map((pro) => (
              <motion.li key={pro.id} variants={staggerItem} className="group text-center">
                <Photo
                  src={pro.photo}
                  alt={pro.name}
                  className="ring-cream-300 group-hover:ring-mocha-300 mx-auto aspect-square w-full max-w-[11rem] rounded-2xl ring-1 transition-all duration-500"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
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
    </>
  )
}
