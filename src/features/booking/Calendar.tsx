import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import {
  addMonths,
  buildMonthGrid,
  formatMonth,
  isSameDay,
  startOfToday,
  toDateKey,
  WEEKDAY_INITIALS,
} from '@/lib/dates'
import { formatLongDate } from '@/lib/format'

/** Quanto tempo à frente a cliente pode reservar. */
const MONTHS_AHEAD = 3

const WEEKDAY_NAMES = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const

export function Calendar({
  selected,
  onSelect,
  isDateAvailable,
}: {
  selected: Date | null
  onSelect: (date: Date) => void
  isDateAvailable: (date: Date) => boolean
}) {
  const today = startOfToday()
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastMonth = addMonths(firstMonth, MONTHS_AHEAD)

  const canGoBack = month > firstMonth
  const canGoForward = month < lastMonth

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, -1))}
          disabled={!canGoBack}
          aria-label="Mês anterior"
          className="text-ink-500 hover:text-mocha-500 hover:bg-cream-100 rounded-full p-2 transition-colors disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>

        <p
          aria-live="polite"
          className="font-display text-ink-900 first-letter-caps text-base font-medium"
        >
          {formatMonth(month)}
        </p>

        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          disabled={!canGoForward}
          aria-label="Próximo mês"
          className="text-ink-500 hover:text-mocha-500 hover:bg-cream-100 rounded-full p-2 transition-colors disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAY_INITIALS.map((initial, index) => (
          <abbr
            key={index}
            title={WEEKDAY_NAMES[index]}
            className="text-ink-400 py-1 text-center text-[0.625rem] font-medium uppercase tracking-widest no-underline"
          >
            {initial}
          </abbr>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {buildMonthGrid(month).map((date, index) => {
          if (!date) return <div key={`empty-${index}`} aria-hidden />

          const available = isDateAvailable(date)
          const isSelected = selected !== null && isSameDay(date, selected)

          return (
            <button
              key={toDateKey(date)}
              type="button"
              onClick={() => onSelect(date)}
              disabled={!available}
              aria-pressed={isSelected}
              aria-label={formatLongDate(date)}
              className={cn(
                'aspect-square rounded-lg text-sm tabular-nums transition-all duration-200',
                isSelected
                  ? 'bg-mocha-500 text-cream-50 font-medium shadow-[0_8px_20px_-8px_rgba(141,103,72,0.9)]'
                  : available
                    ? 'text-ink-700 hover:bg-mocha-500/10 hover:text-mocha-600'
                    : 'text-ink-400/40 cursor-not-allowed',
                isSameDay(date, today) && !isSelected && 'ring-mocha-300 ring-1',
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
