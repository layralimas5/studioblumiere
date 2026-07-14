import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { categories, professionals, services } from '@/content/catalog'
import { formatDuration, formatPrice } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
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
            tint={`var(--color-tint-${category.id})`}
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
                      className="mb-8 aspect-[4/3] w-full rounded-2xl shadow-[0_30px_60px_-35px_rgba(26,21,18,0.5)]"
                    />

                    <p className="text-mocha-500 flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em]">
                      <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                      <span aria-hidden className="bg-mocha-400/40 h-px w-6" />
                      {items.length} {items.length === 1 ? 'serviço' : 'serviços'}
                    </p>

                    <h2 className="font-display text-ink-900 mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                      {category.label}
                    </h2>
                    <p className="text-ink-500 mt-4 text-pretty text-sm leading-relaxed">
                      {category.tagline}
                    </p>

                    <Button as="a" href="#agendar" variant="secondary" className="mt-7">
                      Agendar {category.label.toLowerCase()}
                      <ArrowRight className="size-4" aria-hidden />
                    </Button>
                  </div>
                </Reveal>

                {/*
                  Lista em forma de cardápio: o pontilhado leva o olho do nome até o preço, que é
                  a pergunta que a pessoa veio fazer. Cards separados empurravam o preço para
                  longe do nome e transformavam a leitura numa sequência de blocos.
                */}
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="border-cream-300/70 border-t"
                >
                  {items.map((service) => (
                    <motion.li
                      key={service.id}
                      variants={staggerItem}
                      className="border-cream-300/70 hover:bg-mocha-500/[0.04] group relative border-b transition-colors duration-300"
                    >
                      {/* Filete café que cresce na lateral: marca a linha sob o cursor. */}
                      <span
                        aria-hidden
                        className="bg-mocha-500 absolute inset-y-3 left-0 w-px origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none"
                      />

                      <div className="px-4 py-7 md:px-6">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-display text-ink-900 group-hover:text-mocha-600 text-xl font-medium transition-colors">
                            {service.name}
                          </h3>

                          {service.featured ? (
                            <span className="border-mocha-200 bg-mocha-500/[0.08] text-mocha-600 shrink-0 rounded-full border px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider">
                              Mais pedido
                            </span>
                          ) : null}

                          <span
                            aria-hidden
                            className="border-cream-300 group-hover:border-mocha-300 hidden h-px flex-1 border-b border-dashed transition-colors sm:block"
                          />

                          <p className="text-mocha-600 shrink-0 text-base font-medium tabular-nums">
                            {formatPrice(service.priceFrom)}
                          </p>
                        </div>

                        <p className="text-ink-500 mt-3 max-w-xl text-pretty text-sm leading-relaxed">
                          {service.description}
                        </p>

                        <p className="text-ink-400 mt-4 flex items-center gap-1.5 text-xs">
                          <Clock className="size-3.5" aria-hidden />
                          {formatDuration(service.durationMin)}
                        </p>
                      </div>
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

          {/*
            O retrato ocupa o card inteiro e o nome vive sobre ele: a equipe é a prova social mais
            forte da página, e três avatares pequenos num texto centrado não sustentavam esse peso.
          */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2 md:grid-cols-3"
          >
            {professionals.map((pro) => (
              <motion.li key={pro.id} variants={staggerItem} className="group relative">
                <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-40px_rgba(26,21,18,0.6)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-40px_rgba(26,21,18,0.7)]">
                  <Photo
                    src={pro.photo}
                    alt={pro.name}
                    zoom
                    overlay
                    className="aspect-[4/5] w-full rounded-3xl"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-cream-50 text-xl font-semibold tracking-tight">
                      {pro.name}
                    </p>
                    <p className="text-mocha-200 mt-1 text-xs leading-snug">{pro.role}</p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {pro.specialties.map((specialty) => (
                        <li
                          key={specialty}
                          className="border-cream-50/25 text-cream-100 rounded-full border px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider backdrop-blur-sm"
                        >
                          {categories.find((item) => item.id === specialty)?.label ?? specialty}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    aria-hidden
                    className="ring-cream-50/15 pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset"
                  />
                </div>
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
