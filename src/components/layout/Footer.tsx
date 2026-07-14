import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/content/site'
import { InstagramIcon } from '@/components/ui/icons'
import { Container } from '@/components/ui/Section'
import { Logo } from './Logo'

const navLinks = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/noivas', label: 'Noivas' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/#agendar', label: 'Agendar horário' },
]

function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="text-mocha-500 text-[0.6875rem] font-medium uppercase tracking-[0.22em]">
      {children}
    </h2>
  )
}

export function Footer() {
  return (
    <footer
      id="contato"
      className="border-cream-300 bg-cream-200 relative scroll-mt-24 overflow-hidden border-t pb-10 pt-20"
    >
      <div
        aria-hidden
        className="glow-warm pointer-events-none absolute -bottom-64 left-1/2 size-[40rem] -translate-x-1/2 rounded-full"
      />

      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Logo className="items-start" />
            <p className="text-ink-500 mt-6 max-w-xs text-sm leading-relaxed">{site.tagline}.</p>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-700 hover:text-mocha-500 mt-6 inline-flex items-center gap-2 text-sm transition-colors"
            >
              <InstagramIcon className="size-4" />
              {site.instagramHandle}
            </a>
          </div>

          <nav aria-label="Rodapé">
            <ColumnTitle>Navegação</ColumnTitle>
            <ul className="mt-6 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-ink-500 hover:text-mocha-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>Onde estamos</ColumnTitle>
            <address className="text-ink-500 mt-6 space-y-3 text-sm not-italic">
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mocha-500 flex gap-2.5 transition-colors"
              >
                <MapPin className="text-mocha-500 mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}
                </span>
              </a>
              <a
                href={`tel:+${site.whatsapp}`}
                className="hover:text-mocha-500 flex items-center gap-2.5 transition-colors"
              >
                <Phone className="text-mocha-500 size-4 shrink-0" aria-hidden />
                {site.whatsappDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-mocha-500 flex items-center gap-2.5 transition-colors"
              >
                <Mail className="text-mocha-500 size-4 shrink-0" aria-hidden />
                {site.email}
              </a>
            </address>
          </div>

          <div>
            <ColumnTitle>Atendimento</ColumnTitle>
            <ul className="text-ink-500 mt-6 space-y-3 text-sm">
              {site.hours.map((entry) => (
                <li key={entry.days} className="flex gap-2.5">
                  <Clock className="text-mocha-500 mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    {entry.days}
                    <br />
                    <span className="text-ink-400">{entry.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-mocha mt-16" />

        <p className="text-ink-400 mt-8 text-xs">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  )
}
