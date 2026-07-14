import { BookingWidget } from '@/features/booking/BookingWidget'
import { Container, Script, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function BookingSection() {
  return (
    <Section id="agendar" className="overflow-hidden">
      <div
        aria-hidden
        className="glow-warm pointer-events-none absolute left-1/2 top-0 size-[44rem] -translate-x-1/2 rounded-full"
      />

      <Container>
        <SectionHeading
          eyebrow="Agendamento"
          title={
            <>
              Escolha o serviço, a profissional
              <br className="hidden md:block" /> e <Script>o seu horário</Script>
            </>
          }
          description="Em menos de um minuto. Sem cadastro, sem app, sem esperar ninguém responder para saber se tem vaga."
        />

        <Reveal delay={0.1} className="mt-16">
          <BookingWidget />
        </Reveal>
      </Container>
    </Section>
  )
}
