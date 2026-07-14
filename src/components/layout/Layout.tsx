import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { BannerProvider } from './BannerProvider'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsappFab } from './WhatsappFab'

/**
 * Numa SPA o navegador não restaura a posição sozinho: sem isso, ir para "Serviços"
 * abriria a página nova já rolada no meio.
 *
 * Vive DENTRO da página, e não no Layout, por um motivo: com a transição de rota, a página
 * nova só entra no DOM depois que a antiga sai. Rodando de fora, este efeito procuraria a
 * âncora antes de ela existir — e acabaria rolando até a âncora da página que está saindo.
 *
 * A rolagem só é suave quando a âncora está na página em que já estamos (o componente já
 * estava montado). Vindo de outra rota, um "voo" por milhares de pixels é desconfortável.
 */
function ScrollToTarget({ hash }: { hash: string }) {
  const mounted = useRef(false)

  useLayoutEffect(() => {
    const behavior = mounted.current ? 'smooth' : 'auto'
    mounted.current = true

    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior })
        return
      }
    }

    window.scrollTo({ top: 0, behavior })
  }, [hash])

  return null
}

export function Layout() {
  const { pathname, hash } = useLocation()
  const reduced = useReducedMotion()

  return (
    <BannerProvider>
      <a
        href="#conteudo"
        className="bg-mocha-500 text-cream-50 sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>

      <ScrollProgress />
      <Header />

      <main id="conteudo" className="relative z-10">
        {/*
          `mode="wait"`: a página que sai termina antes de a próxima entrar. Sem isso, as duas
          coexistem por um instante e o site dá um solavanco de altura.
        */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={reduced ? { opacity: 0 } : pageTransition.initial}
            animate={reduced ? { opacity: 1 } : pageTransition.animate}
            exit={reduced ? { opacity: 0 } : pageTransition.exit}
            transition={pageTransition.transition}
          >
            <ScrollToTarget hash={hash} />
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsappFab />

      {/* Textura por cima de tudo — inerte ao clique, invisível ao leitor de tela. */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70]" />
    </BannerProvider>
  )
}
