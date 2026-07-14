import { Plus } from 'lucide-react'
import { faq } from '@/content/catalog'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/**
 * `<details>` nativo: acessível por teclado e leitor de tela de graça,
 * sem estado nem biblioteca de accordion.
 */
export function Faq() {
  return (
    <Section id="duvidas">
      <Container>
        <SectionHeading eyebrow="Dúvidas" title="Antes de você perguntar" />

        <div className="mx-auto mt-16 max-w-3xl">
          {faq.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04}>
              <details className="group border-cream-300 border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
                  <span className="text-ink-900 group-hover:text-mocha-500 text-base font-medium transition-colors">
                    {item.question}
                  </span>
                  <span className="border-cream-300 group-hover:border-mocha-400 flex size-8 shrink-0 items-center justify-center rounded-full border bg-white transition-colors">
                    <Plus
                      className="text-mocha-500 size-3.5 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    />
                  </span>
                </summary>

                <p className="text-ink-500 max-w-2xl text-pretty pb-7 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
