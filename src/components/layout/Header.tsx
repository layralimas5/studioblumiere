import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { Logo } from './Logo'

const links = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/noivas', label: 'Noivas' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/#contato', label: 'Contato' },
]

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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || menuOpen
          ? 'bg-night-950/80 border-night-700/60 border-b backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" aria-label="Studio B Lumière — página inicial">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm transition-colors',
                  isActive && !link.to.includes('#')
                    ? 'text-gold-400'
                    : 'text-ivory-400 hover:text-ivory-50',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Button as={Link} to="/#agendar">
            Agendar horário
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="text-ivory-50 -mr-2 p-2 md:hidden"
        >
          {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="menu-mobile"
          aria-label="Principal (mobile)"
          className="border-night-700/60 bg-night-950/95 border-t px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-ivory-200 hover:text-gold-400 block rounded-lg px-3 py-3 text-base transition-colors hover:bg-white/5"
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
