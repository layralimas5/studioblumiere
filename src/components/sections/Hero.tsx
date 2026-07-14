import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
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
    /*
      Banner de sangria total: sobe por trás do menu, que fica claro enquanto está sobre ele.
      O `id` é o que o Header observa para saber quando trocar a cor da navegação.
    */
    <section
      id="hero"
      className="relative min-h-[36rem] overflow-hidden md:min-h-[42rem] lg:min-h-[46rem]"
    >
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

      {/* Sem esta sombra no topo, os links da direita cairiam sobre a pele clara da foto. */}
      <div
        aria-hidden
        className="from-ink-900/70 absolute inset-x-0 top-0 h-36 bg-gradient-to-b to-transparent"
      />

      <Container className="flex min-h-[36rem] items-center pb-20 pt-36 md:min-h-[42rem] md:pt-32 lg:min-h-[46rem]">
        <div className="max-w-xl">
          <motion.h1
            {...rise(0)}
            className="font-display text-cream-50 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Do café da manhã ao{' '}
            <span className="font-script text-mocha-200 pr-1 text-[1.15em] font-normal">altar</span>
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

          {/* Endereço flutuando sobre a foto: a oscilação leve chama o olho sem pedir clique. */}
          <motion.div {...rise(0.45)} className="mt-10">
            <motion.a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: reduced ? 0 : [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-cream-100 hover:text-cream-50 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <MapPin className="text-mocha-200 size-3.5 shrink-0" aria-hidden />
              {site.address.street}, {site.address.city}
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
