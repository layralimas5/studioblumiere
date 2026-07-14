import { CalendarCheck, HeartHandshake, Sparkles, UserRoundCheck } from 'lucide-react'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const pillars = [
  {
    icon: UserRoundCheck,
    title: 'Você escolhe a profissional',
    text: 'Nada de roleta: reserve com quem já conhece o seu cabelo.',
  },
  {
    icon: CalendarCheck,
    title: 'Horário confirmado',
    text: 'Sem fila de espera e sem "chega e aguarda".',
  },
  {
    icon: Sparkles,
    title: 'Produtos premium',
    text: 'Linhas profissionais que respeitam o fio e a pele.',
  },
  {
    icon: HeartHandshake,
    title: 'Especialistas em noivas',
    text: 'Teste prévio, cronograma e equipe dedicada no grande dia.',
  },
]

export function TrustBar() {
  return (
    <div className="border-night-700/60 bg-night-900 border-y py-12">
      <Container>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <li className="flex gap-4">
                <span className="border-gold-500/25 bg-gold-500/5 flex size-10 shrink-0 items-center justify-center rounded-full border">
                  <pillar.icon className="text-gold-400 size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-ivory-50 text-sm font-medium">{pillar.title}</p>
                  <p className="text-ivory-400 mt-1.5 text-sm leading-relaxed">{pillar.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </div>
  )
}
