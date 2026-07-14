import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
 * Colagem: as proporções alternam e os cards se deslocam na vertical. É o que quebra a
 * leitura de "grade" e dá o ar de editorial de revista.
 */
function shapeFor(index: number): string {
  const shapes = [
    'aspect-[4/5]',
    'aspect-[3/4] md:mt-12',
    'aspect-[4/5] md:-mt-6',
    'aspect-[3/4] md:mt-6',
    'aspect-[4/5] md:mt-14',
    'aspect-[3/4] md:-mt-2',
  ] as const
  return shapes[index % shapes.length] ?? shapes[0]
}

export function ServicesTeaser() {
  return (
    <Section id="servicos" tone="soft">
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

              <Button as="a" href="#agendar" variant="secondary" size="lg" className="mt-9">
                Agendar horário
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {highlights.map(({ category, service }, index) => (
              <motion.li key={category.id} variants={staggerItem}>
                <Link
                  to={`/servicos#${category.id}`}
                  className="group relative block overflow-hidden rounded-3xl shadow-[0_20px_50px_-35px_rgba(26,21,18,0.6)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(26,21,18,0.7)]"
                >
                  {/*
                    O texto vive SOBRE a foto — por isso o véu escuro (`overlay`) não é enfeite:
                    é o que garante o contraste do título em qualquer imagem.
                  */}
                  <Photo
                    src={`/images/services/${category.id}.jpg`}
                    alt={category.label}
                    zoom
                    overlay
                    className={`w-full rounded-3xl ${shapeFor(index)}`}
                  />

                  {/* O topo da foto pode ser claro: sem a sombra, o número sumiria nele. */}
                  <span
                    aria-hidden
                    className="font-display text-cream-50/70 absolute right-5 top-4 text-sm font-medium tabular-nums drop-shadow-[0_1px_6px_rgba(26,21,18,0.7)]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="font-display text-cream-50 text-2xl font-semibold tracking-tight">
                      {category.label}
                    </h3>

                    <p className="text-cream-200 mt-1.5 line-clamp-2 text-pretty text-xs leading-relaxed">
                      {category.tagline}
                    </p>

                    <div className="border-cream-50/20 mt-4 flex items-center justify-between gap-3 border-t pt-3.5">
                      <p className="text-cream-100 text-[0.6875rem] tracking-wide">
                        {formatDuration(service.durationMin)} · {formatPrice(service.priceFrom)}
                      </p>

                      {/* O disco vira café e a seta salta ao passar o mouse — o convite ao clique. */}
                      <span className="border-cream-50/30 text-cream-50 group-hover:bg-mocha-500 group-hover:border-mocha-500 flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300">
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transform-none"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>

                  {/* Fio de luz por dentro da borda: recorta o card do creme sem virar moldura. */}
                  <span
                    aria-hidden
                    className="ring-cream-50/15 pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset"
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </Section>
  )
}
