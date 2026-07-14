import { useState } from 'react'
import { Check, Clock, MessageCircle, Sparkles } from 'lucide-react'
import { categories, services } from '@/content/catalog'
import type { CategoryId } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatDuration, formatLongDate, formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Calendar } from './Calendar'
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

/** Estilo comum dos itens selecionáveis: serviço, profissional e horário. */
function optionClass(selected: boolean): string {
  return cn(
    'transition-all duration-200',
    selected
      ? 'border-mocha-500 bg-mocha-500/[0.07] shadow-[0_0_0_1px_rgba(141,103,72,0.35)]'
      : 'border-cream-300 hover:border-mocha-300 hover:bg-cream-100',
  )
}

function EmptyHint({ children }: { children: string }) {
  return (
    <p className="border-cream-300 text-ink-400 rounded-xl border border-dashed p-7 text-center text-sm">
      {children}
    </p>
  )
}

export function BookingWidget() {
  const booking = useBooking()
  const [category, setCategory] = useState<CategoryId>('noivas')

  const categoryServices = services.filter((s) => s.category === category)
  const { state, service, professional, eligibleProfessionals, availableSlots } = booking

  return (
    <div className="border-cream-300 relative overflow-hidden rounded-3xl border bg-white shadow-[0_50px_120px_-60px_rgba(26,21,18,0.5)]">
      <div className="relative grid lg:grid-cols-2">
        {/* Coluna 1 — o que e com quem */}
        <div className="border-cream-300 space-y-10 border-b p-7 md:p-10 lg:border-b-0 lg:border-r">
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

          <div>
            <StepLabel step={2}>Escolha a profissional</StepLabel>

            {service ? (
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
            ) : (
              <EmptyHint>Escolha um serviço acima para ver quem atende.</EmptyHint>
            )}
          </div>
        </div>

        {/* Coluna 2 — quando e confirmação */}
        <div className="space-y-10 p-7 md:p-10">
          <div>
            <StepLabel step={3}>Escolha a data</StepLabel>
            <Calendar
              selected={state.date}
              onSelect={booking.selectDate}
              isDateAvailable={booking.isDateAvailable}
            />
            {professional ? (
              <p className="text-ink-400 mt-4 text-xs">
                Mostrando apenas os dias em que {professional.name.split(' ')[0]} atende.
              </p>
            ) : null}
          </div>

          <div>
            <StepLabel step={4}>Escolha o horário</StepLabel>

            {state.date ? (
              availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => booking.selectTime(slot)}
                      aria-pressed={state.time === slot}
                      className={cn(
                        'text-ink-700 rounded-lg border py-2.5 text-xs font-medium tabular-nums',
                        state.time === slot && 'text-mocha-600',
                        optionClass(state.time === slot),
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <EmptyHint>Não há mais horários livres neste dia. Escolha outra data.</EmptyHint>
              )
            ) : (
              <EmptyHint>Escolha uma data para ver os horários.</EmptyHint>
            )}
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-ink-500 mb-2 block text-xs font-medium">
                Seu nome <span className="text-ink-400 font-normal">(opcional)</span>
              </span>
              <input
                type="text"
                value={state.clientName}
                onChange={(e) => booking.setClientName(e.target.value)}
                placeholder="Como podemos te chamar?"
                className="border-cream-300 bg-cream-50 text-ink-900 placeholder:text-ink-400 focus:border-mocha-400 w-full rounded-lg border px-4 py-3 text-sm transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-ink-500 mb-2 block text-xs font-medium">
                Alguma observação? <span className="text-ink-400 font-normal">(opcional)</span>
              </span>
              <textarea
                value={state.notes}
                onChange={(e) => booking.setNotes(e.target.value)}
                rows={2}
                placeholder="Ex.: é para um casamento no fim do mês"
                className="border-cream-300 bg-cream-50 text-ink-900 placeholder:text-ink-400 focus:border-mocha-400 w-full resize-none rounded-lg border px-4 py-3 text-sm transition-colors"
              />
            </label>
          </div>

          {/* Resumo — fecha o loop antes do clique final */}
          <div className="border-cream-300 border-t pt-7">
            {booking.isComplete && service && state.date ? (
              <div className="border-mocha-200 bg-mocha-500/[0.06] mb-5 rounded-xl border p-4">
                <p className="text-ink-900 text-sm font-medium">{service.name}</p>
                <p className="text-ink-500 mt-1.5 flex flex-wrap items-center gap-x-2 text-xs">
                  <Clock className="text-mocha-500 size-3" aria-hidden />
                  <span className="first-letter-caps">{formatLongDate(state.date)}</span>
                  <span aria-hidden className="text-cream-300">
                    ·
                  </span>
                  <span>{state.time}</span>
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
              Confirmar no WhatsApp
            </Button>

            <p className="text-ink-400 mt-4 text-center text-xs leading-relaxed">
              {booking.isComplete
                ? 'Abrimos o WhatsApp com sua reserva já escrita. É só enviar.'
                : 'Complete os quatro passos para liberar a reserva.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
