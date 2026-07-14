import type { LucideIcon } from 'lucide-react'
import { CalendarCheck, HeartHandshake, Sparkles, UserRoundCheck } from 'lucide-react'

interface Pillar {
  icon: LucideIcon
  title: string
  text: string
}

const pillars: Pillar[] = [
  {
    icon: UserRoundCheck,
    title: 'Você escolhe a profissional',
    text: 'Nada de roleta: reserve direto com quem já conhece o seu traço.',
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

function PillarList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {pillars.map((pillar) => (
        <li key={pillar.title} className="flex shrink-0 items-center gap-3 px-8">
          <span className="border-mocha-200 bg-mocha-500/[0.08] flex size-9 shrink-0 items-center justify-center rounded-full border">
            <pillar.icon className="text-mocha-500 size-4" aria-hidden />
          </span>

          <div className="whitespace-nowrap">
            <p className="text-ink-900 text-sm font-medium">{pillar.title}</p>
            <p className="text-ink-500 text-xs">{pillar.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

/**
 * Esteira contínua no estilo e-commerce: a lista é duplicada e a trilha desliza
 * até -50%, ponto em que a cópia ocupa exatamente a posição da original.
 * A segunda cópia é `aria-hidden` — para o leitor de tela, os pilares são quatro.
 */
export function TrustBar() {
  return (
    <div className="border-cream-300 bg-cream-200 group overflow-hidden border-y py-5">
      <div className="marquee-track flex w-max">
        <PillarList />
        <PillarList hidden />
      </div>
    </div>
  )
}
