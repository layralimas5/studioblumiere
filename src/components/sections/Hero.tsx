import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import { categories } from '@/content/catalog'
import { site } from '@/content/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'

export function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
  })

  return (
    <section className="relative pt-28 md:pt-32">
      {/*
        Banner com o texto por dentro. O padding-top da seção mantém a foto abaixo do
        menu: se ela passasse por trás, o menu (tinta escura) sumiria sobre a imagem.
      */}
      <div className="relative min-h-[32rem] overflow-hidden md:min-h-[38rem] lg:min-h-[42rem]">
        <motion.img
          src="/images/hero.png"
          alt="Maquiadora finalizando o contorno dos lábios de uma noiva"
          loading="eager"
          decoding="async"
          initial={{ scale: reduced ? 1 : 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          className="absolute inset-0 size-full object-cover object-right"
        />

        {/*
          Véu escuro só do lado do texto. A foto já é escura à esquerda, então o
          degradê termina transparente antes de chegar no rosto.
        */}
        <div
          aria-hidden
          className="from-ink-900/90 via-ink-900/60 absolute inset-0 bg-gradient-to-r to-transparent md:via-40%"
        />

        <Container className="relative flex min-h-[32rem] items-center py-20 md:min-h-[38rem] lg:min-h-[42rem]">
          <div className="max-w-xl">
            <motion.h1
              {...rise(0)}
              className="font-display text-cream-50 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Do café da manhã ao{' '}
              <span className="font-script text-mocha-200 pr-1 text-[1.15em] font-normal">
                altar
              </span>
              , sem correria.
            </motion.h1>

            <motion.p {...rise(0.1)} className="font-script text-mocha-200 mt-4 text-2xl sm:text-3xl">
              Studio B Lumière
            </motion.p>

            <motion.p
              {...rise(0.2)}
              className="text-cream-200 mt-6 max-w-md text-pretty leading-relaxed"
            >
              Maquiagem, cílios e unhas sob o mesmo teto, com a profissional que{' '}
              <span className="text-cream-50 font-medium">você</span> escolhe.
            </motion.p>

            <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-5">
              <Button as={Link} to="/#agendar" size="lg">
                Agendar meu horário
                <ArrowRight className="size-4" aria-hidden />
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="fill-mocha-200 text-mocha-200 size-3.5" />
                  ))}
                </div>
                <p className="text-cream-200 text-sm">
                  <span className="text-cream-50 font-medium">{site.socialProof.rating}</span> em{' '}
                  {site.socialProof.reviewCount}+ avaliações
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Faixa de contexto: onde estamos e o que fazemos, colada na base do banner */}
      <Container>
        <motion.div
          {...rise(0.45)}
          className="border-cream-300 -mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border bg-white px-6 py-4 shadow-[0_24px_50px_-30px_rgba(26,21,18,0.4)]"
        >
          <p className="text-ink-500 flex items-center gap-1.5 text-xs">
            <MapPin className="text-mocha-500 size-3.5" aria-hidden />
            {site.address.street}, {site.address.city}
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/servicos#${category.id}`}
                  className="text-ink-700 hover:text-mocha-500 text-xs transition-colors"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  )
}
