import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { services } from '@/content/catalog'
import { site } from '@/content/site'
import { formatDuration, formatPrice } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { whatsappUrl } from '@/lib/whatsapp'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Card, Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Testimonials } from '@/components/sections/Testimonials'
import { BookingSection } from '@/components/sections/BookingSection'

const journey = [
  {
    step: 'Conversa',
    when: '4 a 6 meses antes',
    text: 'Entendemos o vestido, o horário, o clima e o estilo da cerimônia. Saímos com uma proposta escrita.',
  },
  {
    step: 'Teste',
    when: '30 a 60 dias antes',
    text: 'Cabelo e maquiagem completos, fotografados sob luz natural e sob flash. Ajustamos até você dizer "é esse".',
  },
  {
    step: 'Cronograma',
    when: '15 dias antes',
    text: 'Você recebe o horário de cada etapa — o seu, o das madrinhas e o da sua mãe — com folga para imprevisto.',
  },
  {
    step: 'O grande dia',
    when: 'Casamento',
    text: 'Equipe dedicada, kit de retoque nas suas mãos e a gente só vai embora quando você entrar na cerimônia.',
  },
]

const BRIDAL_MESSAGE = `Olá! Vou casar e gostaria de um orçamento para o pacote de noiva no ${site.name}. 💍`

export function BridalPage() {
  useDocumentMeta(
    'Noivas — Studio B Lumière',
    'Cabelo e maquiagem de noiva com teste prévio, cronograma escrito e equipe dedicada no dia do casamento. Atendemos também madrinhas e mãe da noiva.',
  )

  const bridalServices = services.filter((service) => service.category === 'noivas')

  return (
    <>
      <Section className="overflow-hidden pt-36 md:pt-44">
        <div
          aria-hidden
          className="glow-gold pointer-events-none absolute -left-40 top-10 size-[40rem] rounded-full"
        />

        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Noivas</Eyebrow>

                <h1 className="font-display text-ivory-50 mt-8 text-balance text-6xl font-light leading-[1] md:text-7xl">
                  Você só vai
                  <br />
                  lembrar de
                  <br />
                  <span className="text-gold-gradient italic">estar linda</span>.
                </h1>

                <p className="text-ivory-400 mt-8 max-w-md text-pretty text-lg leading-relaxed">
                  O resto — o horário, o retoque, a madrinha atrasada, o véu que não prende — é
                  problema nosso. Foi para isso que você nos contratou.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button
                    as="a"
                    href={whatsappUrl(BRIDAL_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Pedir meu orçamento
                  </Button>
                  <Button as="a" href="#agendar" variant="secondary" size="lg">
                    Agendar meu teste
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="relative">
                <div
                  aria-hidden
                  className="border-gold-500/25 absolute -left-4 -top-4 h-full w-full rounded-[2rem] border"
                />
                <Photo
                  src="/images/bridal/hero.jpg"
                  alt="Noiva pronta, com penteado e maquiagem finalizados"
                  loading="eager"
                  overlay
                  className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeading
            eyebrow="Como funciona"
            title="Do primeiro café até o altar"
            description="Nenhuma etapa é improvisada. Você sabe exatamente o que acontece, e quando."
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-16 grid gap-5 md:grid-cols-4"
          >
            {journey.map((phase, index) => (
              <motion.li key={phase.step} variants={staggerItem}>
                <Card interactive className="h-full p-7">
                  <span
                    aria-hidden
                    className="font-display text-gold-gradient absolute right-5 top-4 text-5xl leading-none tabular-nums opacity-40"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="font-display text-ivory-50 text-3xl font-light">{phase.step}</h3>
                  <p className="text-gold-500 mt-2 text-[0.625rem] font-medium uppercase tracking-[0.18em]">
                    {phase.when}
                  </p>
                  <p className="text-ivory-400 mt-5 text-pretty text-sm leading-relaxed">
                    {phase.text}
                  </p>
                </Card>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Pacotes"
            title="Escolha o tamanho do seu dia"
            description="Pacotes fechados são orçados caso a caso: dependem do número de pessoas, do horário e do local do atendimento."
          />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2"
          >
            {bridalServices.map((service) => (
              <motion.li key={service.id} variants={staggerItem}>
                <Card interactive className="flex h-full flex-col p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-ivory-50 text-3xl font-light">
                      {service.name}
                    </h3>
                    {service.featured ? (
                      <span className="border-gold-500/40 bg-gold-500/10 text-gold-400 shrink-0 rounded-full border px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider">
                        Mais pedido
                      </span>
                    ) : null}
                  </div>

                  <p className="text-ivory-400 mt-4 flex-1 text-pretty text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <p className="border-night-700/80 text-ivory-500 mt-7 border-t pt-6 text-xs">
                    {formatDuration(service.durationMin)} · {formatPrice(service.priceFrom)}
                  </p>
                </Card>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.1} className="mt-14 text-center">
            <Button
              as="a"
              href={whatsappUrl(BRIDAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Falar sobre o meu casamento
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Testimonials />
      <BookingSection />
    </>
  )
}
