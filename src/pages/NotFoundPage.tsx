import { Link } from 'react-router-dom'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Script, Section } from '@/components/ui/Section'

export function NotFoundPage() {
  useDocumentMeta(
    'Página não encontrada — Studio B Lumière',
    'A página que você procura não existe ou foi movida.',
  )

  return (
    <Section className="overflow-hidden pt-44">
      <div
        aria-hidden
        className="glow-warm pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full"
      />

      <Container className="text-center">
        <div className="flex justify-center">
          <Eyebrow>Erro 404</Eyebrow>
        </div>

        <h1 className="font-display text-ink-900 mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
          Essa página <Script>não existe</Script>.
        </h1>

        <p className="text-ink-500 mx-auto mt-6 max-w-md text-pretty">
          O link pode estar quebrado ou a página pode ter sido movida. Que tal começar de novo pela
          página inicial?
        </p>

        <Button as={Link} to="/" size="lg" className="mt-10">
          Voltar para o início
        </Button>
      </Container>
    </Section>
  )
}
