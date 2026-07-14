import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useBanner } from '@/lib/banner'
import { EASE_OUT_EXPO, SPRING } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Logo } from './Logo'

/** A navegação abre dos dois lados da marca — a logo fica no eixo central da página. */
const leftLinks = [
  { to: '/', label: 'Início' },
  { to: '/servicos', label: 'Serviços' },
]

const rightLinks = [
  { to: '/noivas', label: 'Noivas' },
  { to: '/galeria', label: 'Galeria' },
]

const allLinks = [...leftLinks, ...rightLinks]

/** Altura do menu: o observador só considera "sobre o banner" a faixa que ele ocupa. */
const HEADER_HEIGHT = 80

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [onHero, setOnHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const banner = useBanner()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /**
   * A cor da navegação não pode depender do scroll: o banner tem centenas de pixels
   * de altura, e trocar para tinta escura no primeiro pixel rolado apagaria os links
   * sobre a foto. O que importa é se o menu ainda repousa sobre o banner — e é isso
   * que o observador responde, recortando do topo a faixa ocupada pelo próprio menu.
   *
   * O banner chega pelo contexto, não do DOM: ele avisa quando monta. Ver BannerContext.
   */
  useEffect(() => {
    if (!banner) {
      setOnHero(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry?.isIntersecting ?? false),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` },
    )

    observer.observe(banner)
    return () => observer.disconnect()
  }, [banner])

  // Uma navegação não deve deixar o menu mobile aberto por cima da página nova.
  useEffect(() => setMenuOpen(false), [pathname])

  const overBanner = onHero && !menuOpen

  /**
   * O filete da página ativa é um só, compartilhado por todos os links (`layoutId`): ao trocar
   * de página ele desliza até o novo link — inclusive atravessando a logo — em vez de sumir de
   * um lado e reaparecer do outro.
   */
  const NavItem = ({ to, label, end = false }: { to: string; label: string; end?: boolean }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'relative py-1 text-sm transition-colors',
          overBanner
            ? isActive
              ? 'text-mocha-200'
              : 'text-cream-100 hover:text-mocha-200'
            : isActive
              ? 'text-mocha-500'
              : 'text-ink-700 hover:text-mocha-500',
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive ? (
            <motion.span
              layoutId="nav-active"
              transition={reduced ? { duration: 0 } : SPRING}
              className={cn(
                'absolute inset-x-0 -bottom-0.5 h-px',
                overBanner ? 'bg-mocha-200' : 'bg-mocha-500',
              )}
            />
          ) : null}
        </>
      )}
    </NavLink>
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        // Ao rolar: só desfoque, sem cor de fundo — a página continua aparecendo por baixo.
        scrolled && 'backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <nav aria-label="Principal" className="hidden flex-1 items-center gap-8 md:flex">
          {leftLinks.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} end />
          ))}
        </nav>

        <Link to="/" aria-label="Studio B Lumière — página inicial" className="shrink-0">
          <Logo tone={overBanner ? 'light' : 'dark'} />
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          <nav aria-label="Secundária" className="flex items-center gap-8">
            {rightLinks.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          <Button as={Link} to="/#agendar">
            Agendar
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className={cn(
            '-mr-2 p-2 transition-colors md:hidden',
            overBanner ? 'text-cream-50' : 'text-ink-900',
          )}
        >
          {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            key="menu-mobile"
            id="menu-mobile"
            aria-label="Principal (mobile)"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT_EXPO }}
            className="border-cream-300 bg-cream-100/95 overflow-hidden border-t backdrop-blur-xl md:hidden"
          >
            <div className="px-6 py-6">
              <ul className="space-y-1">
                {allLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-ink-700 hover:text-mocha-500 hover:bg-mocha-500/[0.06] block rounded-lg px-3 py-3 text-base transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Button as={Link} to="/#agendar" size="lg" className="mt-5 w-full">
                Agendar horário
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
