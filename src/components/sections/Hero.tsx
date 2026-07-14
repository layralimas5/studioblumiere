import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import { categories } from '@/content/catalog'
import { site } from '@/content/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Container } from '@/components/ui/Section'

export function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
  })

  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      {/* Sombra de folhagem entrando pelo canto — a textura que impede o creme de chapar */}
      <div aria-hidden className="leaf-shade pointer-events-none absolute inset-0" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <motion.h1
              {...rise(0)}
              className="font-display text-ink-900 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.25rem]"
            >
              Do café da manhã
              <br />
              ao <span className="font-script text-mocha-500 pr-1 text-[1.1em] font-normal">altar</span>,
              <br />
              sem correria.
            </motion.h1>

            <motion.p {...rise(0.1)} className="font-script text-mocha-500 mt-6 text-3xl">
              Studio B Lumière
            </motion.p>

            {/* CTA e argumento lado a lado: o botão nunca fica órfão no meio do branco */}
            <motion.div
              {...rise(0.2)}
              className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center"
            >
              <Button as={Link} to="/#agendar" size="lg" className="shrink-0">
                Agendar meu horário
                <ArrowRight className="size-4" aria-hidden />
              </Button>

              <p className="text-ink-500 max-w-xs text-sm leading-relaxed">
                Cabelo, maquiagem, cílios e unhas sob o mesmo teto — com a profissional que{' '}
                <span className="text-ink-900 font-medium">você</span> escolhe.
              </p>
            </motion.div>

            <motion.div
              {...rise(0.3)}
              className="border-cream-300 mt-12 flex items-center gap-4 border-t pt-8"
            >
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="fill-mocha-400 text-mocha-400 size-3.5" />
                ))}
              </div>
              <p className="text-ink-500 text-sm">
                <span className="text-ink-900 font-medium">{site.socialProof.rating}</span> em mais
                de {site.socialProof.reviewCount} avaliações
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            <Photo
              src="/images/hero.jpg"
              alt="Cliente finalizando o penteado no Studio B Lumière"
              loading="eager"
              className="aspect-[4/5] rounded-[2.5rem] shadow-[0_50px_100px_-50px_rgba(26,21,18,0.5)]"
            />

            <motion.div
              {...rise(0.5)}
              className="border-cream-300 absolute -bottom-6 -left-6 hidden rounded-2xl border bg-white p-5 shadow-[0_24px_50px_-30px_rgba(26,21,18,0.4)] sm:block"
            >
              <p className="font-display text-ink-900 text-3xl font-semibold leading-none">
                +{site.socialProof.bridesServed}
              </p>
              <p className="text-ink-500 mt-2 max-w-[9rem] text-xs leading-snug">
                noivas atendidas sem um único atraso no altar
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Faixa de contexto: diz o que fazemos e onde, sem roubar espaço do título */}
        <motion.div
          {...rise(0.6)}
          className="border-cream-300 mt-20 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border bg-white/70 px-6 py-4 backdrop-blur-sm"
        >
          <p className="text-ink-500 flex items-center gap-1.5 text-xs">
            <MapPin className="text-mocha-500 size-3.5" aria-hidden />
            {site.address.city}
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
