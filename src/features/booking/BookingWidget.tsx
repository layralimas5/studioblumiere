import { useState } from 'react'
import { Check, MessageCircle, Sparkles } from 'lucide-react'
import { categories, services } from '@/content/catalog'
import type { CategoryId } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatDuration, formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { ANY_PROFESSIONAL, useBooking } from './useBooking'

function StepLabel({ step, children }: { step: number; children: string }) {
  return (
    <h3 className="text-ink-900 mb-5 flex items-center gap-3 text-sm font-medium">
      <span className="border-mocha-200 bg-mocha-500/[0.08] text-mocha-500 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums">
        {step}
      </span>
      {children}
    </h3>
  )
}

/** Estilo comum dos itens selecionáveis: serviço e profissional. */
function optionClass(selected: boolean): string {
  return cn(
    'transition-all duration-200',
    selected
      ? 'border-mocha-500 bg-mocha-500/[0.07] shadow-[0_0_0_1px_rgba(141,103,72,0.35)]'
      : 'border-cream-300 hover:border-mocha-300 hover:bg-cream-100',
  )
}

export function BookingWidget() {
  const booking = useBooking()
  const [category, setCategory] = useState<CategoryId>('noivas')

  const categoryServices = services.filter((s) => s.category === category)
  const { state, service, professional, eligibleProfessionals } = booking

  return (
    <div className="border-cream-300 relative mx-auto max-w-2xl overflow-hidden rounded-3xl border bg-white shadow-[0_50px_120px_-60px_rgba(26,21,18,0.5)]">
      <div className="space-y-10 p-7 md:p-10">
        <div>
          <StepLabel step={1}>Escolha o serviço</StepLabel>

          <div
            className="mb-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Categorias de serviço"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                  category === cat.id
                    ? 'bg-mocha-500 text-cream-50'
                    : 'border-cream-300 text-ink-500 hover:border-mocha-400 hover:text-ink-900 border',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <fieldset className="space-y-2.5">
            <legend className="sr-only">Serviços de {category}</legend>

            {categoryServices.map((item) => {
              const checked = state.serviceId === item.id

              return (
                <label
                  key={item.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3.5 rounded-xl border p-4',
                    optionClass(checked),
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    value={item.id}
                    checked={checked}
                    onChange={() => booking.selectService(item.id)}
                    className="sr-only"
                  />

                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                      checked ? 'border-mocha-500 bg-mocha-500' : 'border-cream-300',
                    )}
                  >
                    {checked ? (
                      <Check className="text-cream-50 size-2.5" strokeWidth={3.5} />
                    ) : null}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="text-ink-900 block text-sm font-medium">{item.name}</span>
                    <span className="text-ink-400 mt-1 block text-xs">
                      {formatDuration(item.durationMin)} · {formatPrice(item.priceFrom)}
                    </span>
                  </span>
                </label>
              )
            })}
          </fieldset>
        </div>

        {/* A profissional é preferência, não requisito: quem não escolher fala com o salão. */}
        {service ? (
          <div>
            <StepLabel step={2}>Com quem você quer falar?</StepLabel>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => booking.selectProfessional(ANY_PROFESSIONAL)}
                aria-pressed={state.professionalId === ANY_PROFESSIONAL}
                className={cn(
                  'flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center',
                  optionClass(state.professionalId === ANY_PROFESSIONAL),
                )}
              >
                <span className="border-mocha-200 bg-mocha-500/[0.08] text-mocha-500 flex size-12 items-center justify-center rounded-full border">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <span className="text-ink-700 text-xs font-medium leading-tight">
                  Sem preferência
                </span>
              </button>

              {eligibleProfessionals.map((pro) => {
                const selected = state.professionalId === pro.id

                return (
                  <button
                    key={pro.id}
                    type="button"
                    onClick={() => booking.selectProfessional(pro.id)}
                    aria-pressed={selected}
                    className={cn(
                      'flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center',
                      optionClass(selected),
                    )}
                  >
                    <Photo
                      src={pro.photo}
                      alt={pro.name}
                      className={cn(
                        'size-12 shrink-0 rounded-full ring-1 transition-colors',
                        selected ? 'ring-mocha-500' : 'ring-cream-300',
                      )}
                    />
                    <span className="text-ink-700 text-xs font-medium leading-tight">
                      {pro.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        <div className="border-cream-300 border-t pt-7">
          {service ? (
            <div className="border-mocha-200 bg-mocha-500/[0.06] mb-5 rounded-xl border p-4">
              <p className="text-ink-900 text-sm font-medium">{service.name}</p>
              <p className="text-ink-500 mt-1.5 flex flex-wrap items-center gap-x-2 text-xs">
                <span>{formatDuration(service.durationMin)}</span>
                <span aria-hidden className="text-cream-300">
                  ·
                </span>
                <span>{formatPrice(service.priceFrom)}</span>
                <span aria-hidden className="text-cream-300">
                  ·
                </span>
                <span>{professional ? professional.name : 'Sem preferência'}</span>
              </p>
            </div>
          ) : null}

          <Button
            as="a"
            href={booking.isComplete ? booking.whatsappLink : undefined}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            aria-disabled={!booking.isComplete}
            className={cn('w-full', !booking.isComplete && 'pointer-events-none opacity-40')}
          >
            <MessageCircle className="size-4" aria-hidden />
            {professional
              ? `Falar com ${professional.name.split(' ')[0]} no WhatsApp`
              : 'Falar no WhatsApp'}
          </Button>

          <p className="text-ink-400 mt-4 text-center text-xs leading-relaxed">
            {booking.isComplete
              ? 'Abrimos o WhatsApp com o seu serviço já escrito. É só enviar e combinar o melhor horário.'
              : 'Escolha um serviço para liberar a conversa.'}
          </p>
        </div>
      </div>
    </div>
  )
}
