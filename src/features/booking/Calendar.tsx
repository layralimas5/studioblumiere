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
          className="text-ivory-400 hover:text-gold-400 rounded-full p-2 transition-colors hover:bg-white/5 disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>

        <p
          aria-live="polite"
          className="font-display text-ivory-50 first-letter-caps text-lg font-light"
        >
          {formatMonth(month)}
        </p>

        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          disabled={!canGoForward}
          aria-label="Próximo mês"
          className="text-ivory-400 hover:text-gold-400 rounded-full p-2 transition-colors hover:bg-white/5 disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAY_INITIALS.map((initial, index) => (
          <abbr
            key={index}
            title={WEEKDAY_NAMES[index]}
            className="text-ivory-500 py-1 text-center text-[0.625rem] font-medium uppercase tracking-widest no-underline"
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
                  ? 'from-gold-300 to-gold-500 text-night-950 bg-gradient-to-b font-medium shadow-[0_0_20px_-4px_rgba(201,169,97,0.7)]'
                  : available
                    ? 'text-ivory-200 hover:bg-gold-500/15 hover:text-gold-300'
                    : 'text-ivory-500/25 cursor-not-allowed',
                isSameDay(date, today) && !isSelected && 'ring-gold-500/50 ring-1',
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
