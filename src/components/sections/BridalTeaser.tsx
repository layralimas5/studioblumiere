import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Container, Eyebrow, Script, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const promises = [
  'Teste de maquiagem antes do dia',
  'Cronograma escrito, com horário de cada etapa',
  'Equipe dedicada para madrinhas e mãe da noiva',
  'Atendimento onde você estiver: casa, hotel ou espaço',
]

export function BridalTeaser() {
  return (
    <Section className="bg-cream-50 overflow-hidden">
      <div
        aria-hidden
        className="glow-warm pointer-events-none absolute -left-40 top-1/4 size-[36rem] rounded-full"
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-5">
              <Photo
                src="/images/bridal/noiva-1.jpg"
                alt="Noiva com a maquiagem finalizada"
                className="aspect-[3/4] rounded-2xl shadow-[0_30px_60px_-35px_rgba(26,21,18,0.5)]"
              />
              <Photo
                src="/images/bridal/noiva-2.jpg"
                alt="Detalhe da maquiagem de noiva"
                className="mt-10 aspect-[3/4] rounded-2xl shadow-[0_30px_60px_-35px_rgba(26,21,18,0.5)]"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Noivas</Eyebrow>

              <h2 className="font-display text-ink-900 mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
                O seu casamento não tem{' '}
                <Script>segunda chance</Script>.
              </h2>

              <p className="text-ink-500 mt-6 text-pretty text-lg leading-relaxed">
                Por isso a gente não improvisa. Você chega no dia sabendo exatamente como vai ficar —
                porque já viu, já testou e já aprovou.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-9 space-y-3.5">
                {promises.map((promise) => (
                  <li key={promise} className="text-ink-700 flex items-start gap-3 text-sm">
                    <Check className="text-mocha-500 mt-0.5 size-4 shrink-0" aria-hidden />
                    {promise}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <Button as={Link} to="/noivas" size="lg" className="mt-10">
                Ver o universo das noivas
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
