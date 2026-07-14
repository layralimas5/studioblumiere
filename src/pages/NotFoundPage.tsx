import { Link } from 'react-router-dom'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/Section'

export function NotFoundPage() {
  useDocumentMeta(
    'Página não encontrada — Studio B Lumière',
    'A página que você procura não existe ou foi movida.',
  )

  return (
    <Section className="overflow-hidden pt-44">
      <div
        aria-hidden
        className="glow-gold pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full"
      />

      <Container className="text-center">
        <div className="flex justify-center">
          <Eyebrow>Erro 404</Eyebrow>
        </div>

        <h1 className="font-display text-ivory-50 mt-8 text-5xl font-light md:text-6xl">
          Essa página <span className="text-gold-gradient italic">não existe</span>.
        </h1>

        <p className="text-ivory-400 mx-auto mt-6 max-w-md text-pretty">
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
