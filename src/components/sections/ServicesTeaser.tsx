import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories, services } from '@/content/catalog'
import type { Category, Service } from '@/content/types'
import { formatDuration, formatPrice } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

interface Highlight {
  category: Category
  service: Service
}

/** Um destaque por categoria — a página de serviços mostra o catálogo inteiro. */
const highlights: Highlight[] = categories.flatMap((category) => {
  const service = services.find((item) => item.category === category.id && item.featured)
  return service ? [{ category, service }] : []
})

/**
 * Colagem: cada terceiro item ganha uma proporção mais alta e um deslocamento vertical.
 * É o que quebra a leitura de "grade de cards" e dá o ar editorial da referência.
 */
function shapeFor(index: number): string {
  const shapes = [
    'aspect-[4/5]',
    'aspect-square md:mt-10',
    'aspect-[4/5] md:-mt-6',
    'aspect-square md:mt-4',
    'aspect-[4/5] md:mt-12',
    'aspect-square md:-mt-2',
  ] as const
  return shapes[index % shapes.length] ?? shapes[0]
}

export function ServicesTeaser() {
  return (
    <Section id="servicos">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-mocha-500 text-[0.6875rem] font-medium uppercase tracking-[0.28em]">
                O que fazemos
              </p>

              <h2 className="font-display text-ink-900 mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
                Realce a sua
                <br />
                beleza{' '}
                <span className="font-script text-mocha-500 pr-1 text-[1.15em] font-normal">
                  natural
                </span>
              </h2>

              <p className="text-ink-500 mt-6 max-w-sm text-pretty leading-relaxed">
                Maquiagem, cílios, unhas e sobrancelhas, sem percorrer a cidade entre um compromisso
                e outro.
              </p>

              <Button as={Link} to="/servicos" variant="secondary" size="lg" className="mt-9">
                Ver serviços
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3"
          >
            {highlights.map(({ category, service }, index) => (
              <motion.li key={category.id} variants={staggerItem}>
                <Link to={`/servicos#${category.id}`} className="group block">
                  <Photo
                    src={`/images/services/${category.id}.jpg`}
                    alt={category.label}
                    className={`w-full rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-35px_rgba(26,21,18,0.5)] ${shapeFor(index)}`}
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />

                  <h3 className="text-ink-900 group-hover:text-mocha-500 mt-4 text-sm font-medium transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-ink-400 mt-1 text-xs">
                    {formatDuration(service.durationMin)} · {formatPrice(service.priceFrom)}
                  </p>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </Section>
  )
}
