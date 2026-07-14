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
              Escolha o serviço e
              <br className="hidden md:block" /> fale com <Script>a sua profissional</Script>
            </>
          }
          description="Sem cadastro e sem app: você seleciona o que quer, abre o WhatsApp com tudo escrito e combina o horário direto com quem vai te atender."
        />

        <Reveal delay={0.1} className="mt-16">
          <BookingWidget />
        </Reveal>
      </Container>
    </Section>
  )
}
