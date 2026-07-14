import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories, services } from '@/content/catalog'
import type { Category, Service } from '@/content/types'
import { formatDuration, formatPrice } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Container, Section, SectionHeading } from '@/components/ui/Section'

interface Highlight {
  category: Category
  service: Service
}

/** Um destaque por categoria — a página de serviços mostra o catálogo inteiro. */
const highlights: Highlight[] = categories.flatMap((category) => {
  const service = services.find((item) => item.category === category.id && item.featured)
  return service ? [{ category, service }] : []
})

export function ServicesTeaser() {
  return (
    <Section id="servicos">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title={
            <>
              Um salão inteiro,
              <br />
              <span className="text-gold-gradient italic">uma agenda só</span>
            </>
          }
          description="Cabelo, maquiagem, cílios, unhas e sobrancelhas — sem percorrer a cidade entre um compromisso e outro."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map(({ category, service }) => (
            <motion.li key={category.id} variants={staggerItem}>
              <Link
                to={`/servicos#${category.id}`}
                className="group border-night-700/70 hover:border-gold-500/40 relative block h-full overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(201,169,97,0.4)]"
              >
                <Photo
                  src={`/images/services/${category.id}.jpg`}
                  alt={category.label}
                  overlay
                  className="aspect-[4/5] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />

                {/* O texto vive sobre a foto, como na referência — não num bloco separado */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-gold-400 text-[0.625rem] font-medium uppercase tracking-[0.24em]">
                    {category.label}
                  </p>

                  <h3 className="font-display text-ivory-50 mt-2 text-3xl font-light leading-tight">
                    {service.name}
                  </h3>

                  <p className="text-ivory-400 mt-2 text-sm leading-snug">{category.tagline}</p>

                  <p className="text-ivory-500 border-night-700/80 mt-4 border-t pt-4 text-xs">
                    {formatDuration(service.durationMin)} · {formatPrice(service.priceFrom)}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-14 text-center">
          <Button as={Link} to="/servicos" variant="secondary" size="lg">
            Ver todos os serviços e preços
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
