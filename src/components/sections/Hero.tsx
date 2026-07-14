import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { site } from '@/content/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Container } from '@/components/ui/Section'

export function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  })

  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      {/* Luz âmbar entrando pela direita, como um refletor de estúdio */}
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute -right-64 -top-32 size-[46rem] rounded-full"
      />
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute -bottom-48 -left-48 size-[32rem] rounded-full opacity-50"
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <motion.div {...rise(0)}>
              <p className="text-gold-400 flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.28em]">
                <span
                  aria-hidden
                  className="from-gold-500/0 to-gold-500/70 h-px w-10 bg-gradient-to-r"
                />
                Noivas & dia a dia
              </p>
            </motion.div>

            <motion.h1
              {...rise(0.1)}
              className="font-display text-ivory-50 mt-8 text-balance text-6xl font-light leading-[0.98] md:text-8xl"
            >
              Do café
              <br />
              da manhã ao
              <br />
              <span className="text-gold-gradient italic">altar</span>.
            </motion.h1>

            <motion.p
              {...rise(0.2)}
              className="text-ivory-400 mt-9 max-w-md text-pretty text-lg leading-relaxed"
            >
              Cabelo, maquiagem, cílios e unhas sob o mesmo teto — com a profissional que{' '}
              <span className="text-ivory-50">você</span> escolhe e o horário que cabe na sua rotina.
            </motion.p>

            <motion.div {...rise(0.3)} className="mt-11 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/#agendar" size="lg">
                Agendar meu horário
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button as={Link} to="/noivas" variant="secondary" size="lg">
                Sou noiva
              </Button>
            </motion.div>

            <motion.div
              {...rise(0.4)}
              className="border-night-700/80 mt-12 flex items-center gap-5 border-t pt-8"
            >
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="fill-gold-400 text-gold-400 size-3.5" />
                ))}
              </div>
              <p className="text-ivory-400 text-sm">
                <span className="text-ivory-50 font-medium">{site.socialProof.rating}</span> em mais
                de {site.socialProof.reviewCount} avaliações
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            {/* Moldura dourada deslocada: dá volume à foto sem precisar de sombra pesada */}
            <div
              aria-hidden
              className="border-gold-500/25 absolute -right-4 -top-4 h-full w-full rounded-[2rem] border"
            />

            <Photo
              src="/images/hero.jpg"
              alt="Cliente finalizando o penteado no Studio B Lumière"
              loading="eager"
              overlay
              className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]"
            />

            <motion.div
              {...rise(0.6)}
              className="surface border-night-700 bg-night-900/90 absolute -bottom-8 -left-8 hidden rounded-2xl border p-6 backdrop-blur-md sm:block"
            >
              <p className="font-display text-gold-gradient text-4xl leading-none">
                +{site.socialProof.bridesServed}
              </p>
              <p className="text-ivory-400 mt-2 max-w-[10rem] text-xs leading-snug">
                noivas atendidas sem um único atraso no altar
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
