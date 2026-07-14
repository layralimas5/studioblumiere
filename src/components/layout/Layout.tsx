import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsappFab } from './WhatsappFab'

/**
 * Numa SPA o navegador não restaura a posição sozinho: sem isso, ir para
 * "Serviços" abriria a página nova já rolada no meio.
 *
 * A rolagem só é suave quando a âncora está na página em que já estamos. Vindo de
 * outra rota, um "voo" suave por milhares de pixels é desconfortável — ali salta direto.
 */
function useScrollBehavior() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    const samePage = previousPathname.current === pathname
    previousPathname.current = pathname

    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: samePage ? 'smooth' : 'auto' })
        return
      }
    }

    window.scrollTo({ top: 0 })
  }, [pathname, hash])
}

export function Layout() {
  useScrollBehavior()

  return (
    <>
      <a
        href="#conteudo"
        className="bg-mocha-500 text-cream-50 sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>

      <ScrollProgress />
      <Header />

      <main id="conteudo" className="relative z-10">
        <Outlet />
      </main>

      <Footer />
      <WhatsappFab />

      {/* Textura por cima de tudo — inerte ao clique, invisível ao leitor de tela. */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70]" />
    </>
  )
}
