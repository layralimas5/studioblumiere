import { Quote } from 'lucide-react'
import { testimonials } from '@/content/catalog'
import { Card, Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function Testimonials() {
  return (
    <Section tone="soft">
      <Container>
        <SectionHeading eyebrow="Quem já sentou na cadeira" title="O que elas contam depois" />

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} className="h-full">
              <Card className="flex h-full flex-col p-8">
                <Quote className="text-mocha-300 size-7 shrink-0" aria-hidden />

                <blockquote className="text-ink-700 mt-6 flex-1 text-pretty text-sm leading-relaxed">
                  {item.quote}
                </blockquote>

                <footer className="border-cream-300 mt-7 border-t pt-6">
                  <p className="text-ink-900 text-sm font-medium">{item.name}</p>
                  <p className="text-mocha-500 mt-1 text-xs">{item.context}</p>
                </footer>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
