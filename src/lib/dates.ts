import type { Weekday } from '@/content/types'

/** Chave estável no fuso local — `toISOString()` erraria o dia por causa do UTC. */
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function startOfToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b)
}

export function getWeekday(date: Date): Weekday {
  return date.getDay() as Weekday
}

/**
 * Células de um mês para uma grade de 7 colunas começando no domingo.
 * `null` representa os espaços vazios antes do dia 1.
 */
export function buildMonthGrid(month: Date): Array<Date | null> {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()

  const leading: Array<Date | null> = Array.from({ length: first.getDay() }, () => null)
  const days = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
  )

  return [...leading, ...days]
}

const monthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })

export function formatMonth(date: Date): string {
  return monthLabel.format(date)
}

export const WEEKDAY_INITIALS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const
