import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
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
  { to: '/#contato', label: 'Contato' },
]

const allLinks = [...leftLinks, ...rightLinks]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Uma navegação não deve deixar o menu mobile aberto por cima da página nova.
  useEffect(() => setMenuOpen(false), [pathname])

  /**
   * Só a home tem o banner subindo por trás do menu. Enquanto ele estiver ali,
   * a navegação é clara sobre a foto; ao rolar, vira tinta escura sobre o creme.
   */
  const overBanner = pathname === '/' && !scrolled && !menuOpen

  const navClass = ({ isActive }: { isActive: boolean }): string =>
    cn(
      'text-sm transition-colors',
      overBanner
        ? isActive
          ? 'text-mocha-200'
          : 'text-cream-100 hover:text-mocha-200'
        : isActive
          ? 'text-mocha-500'
          : 'text-ink-700 hover:text-mocha-500',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        // Ao rolar: só desfoque, sem cor de fundo — a página continua aparecendo por baixo.
        overBanner ? '' : 'backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <nav aria-label="Principal" className="hidden flex-1 items-center gap-8 md:flex">
          {leftLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" aria-label="Studio B Lumière — página inicial" className="shrink-0">
          <Logo tone={overBanner ? 'light' : 'dark'} />
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          <nav aria-label="Secundária" className="flex items-center gap-8">
            {rightLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
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

      {menuOpen ? (
        <nav
          id="menu-mobile"
          aria-label="Principal (mobile)"
          className="border-cream-300 bg-cream-100/95 border-t px-6 py-6 backdrop-blur-xl md:hidden"
        >
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
        </nav>
      ) : null}
    </header>
  )
}
