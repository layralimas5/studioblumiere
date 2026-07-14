import { useCallback, useMemo, useState } from 'react'
import { professionals, services } from '@/content/catalog'
import { site } from '@/content/site'
import type { Professional, Service } from '@/content/types'
import { getWeekday, isSameDay, startOfToday } from '@/lib/dates'
import { formatDuration, formatLongDate } from '@/lib/format'
import { whatsappUrl } from '@/lib/whatsapp'

export const ANY_PROFESSIONAL = 'any'

interface BookingState {
  serviceId: string | null
  professionalId: string | typeof ANY_PROFESSIONAL | null
  date: Date | null
  time: string | null
  clientName: string
  notes: string
}

const EMPTY: BookingState = {
  serviceId: null,
  professionalId: null,
  date: null,
  time: null,
  clientName: '',
  notes: '',
}

function worksOnDate(professional: Professional, date: Date): boolean {
  return professional.worksOn.includes(getWeekday(date))
}

/** Passado não é opção: se a data é hoje, só sobram os horários que ainda vão acontecer. */
function isSlotInPast(date: Date, slot: string): boolean {
  if (!isSameDay(date, new Date())) return false

  const [hours, minutes] = slot.split(':').map(Number)
  const slotTime = new Date(date)
  slotTime.setHours(hours ?? 0, minutes ?? 0, 0, 0)

  return slotTime.getTime() <= Date.now()
}

export function useBooking(initialServiceId?: string) {
  const [state, setState] = useState<BookingState>(() =>
    initialServiceId ? { ...EMPTY, serviceId: initialServiceId } : EMPTY,
  )

  const service = useMemo<Service | null>(
    () => services.find((s) => s.id === state.serviceId) ?? null,
    [state.serviceId],
  )

  /** Só quem realmente faz o serviço escolhido pode ser selecionada. */
  const eligibleProfessionals = useMemo<Professional[]>(() => {
    if (!service) return professionals
    return professionals.filter((p) => p.specialties.includes(service.category))
  }, [service])

  const professional = useMemo<Professional | null>(
    () => eligibleProfessionals.find((p) => p.id === state.professionalId) ?? null,
    [eligibleProfessionals, state.professionalId],
  )

  const isDateAvailable = useCallback(
    (date: Date): boolean => {
      if (date < startOfToday()) return false
      if (!professional) return true
      return worksOnDate(professional, date)
    },
    [professional],
  )

  const availableSlots = useMemo<string[]>(() => {
    if (!state.date) return []
    const date = state.date
    return site.bookingSlots.filter((slot) => !isSlotInPast(date, slot))
  }, [state.date])

  const selectService = useCallback((serviceId: string) => {
    setState((prev) => {
      if (prev.serviceId === serviceId) return prev

      const next = services.find((s) => s.id === serviceId)
      const previous = professionals.find((p) => p.id === prev.professionalId)

      // Uma troca de serviço pode invalidar a profissional já escolhida.
      const keepProfessional =
        prev.professionalId === ANY_PROFESSIONAL ||
        (next && previous && previous.specialties.includes(next.category))

      return {
        ...prev,
        serviceId,
        professionalId: keepProfessional ? prev.professionalId : null,
      }
    })
  }, [])

  const selectProfessional = useCallback((professionalId: string) => {
    setState((prev) => {
      const next = professionals.find((p) => p.id === professionalId)

      // A nova profissional pode não trabalhar no dia que já estava escolhido.
      const keepDate =
        !prev.date || !next || worksOnDate(next, prev.date)

      return {
        ...prev,
        professionalId,
        date: keepDate ? prev.date : null,
        time: keepDate ? prev.time : null,
      }
    })
  }, [])

  const selectDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, date, time: null }))
  }, [])

  const selectTime = useCallback((time: string) => {
    setState((prev) => ({ ...prev, time }))
  }, [])

  const setClientName = useCallback((clientName: string) => {
    setState((prev) => ({ ...prev, clientName }))
  }, [])

  const setNotes = useCallback((notes: string) => {
    setState((prev) => ({ ...prev, notes }))
  }, [])

  const reset = useCallback(() => setState(EMPTY), [])

  const isComplete = Boolean(service && state.professionalId && state.date && state.time)

  const message = useMemo(() => {
    if (!service || !state.date || !state.time) return ''

    const who = professional ? professional.name : 'Sem preferência'
    const lines = [
      `Olá! Quero agendar um horário no ${site.name}. ✨`,
      '',
      `*Serviço:* ${service.name} (${formatDuration(service.durationMin)})`,
      `*Profissional:* ${who}`,
      `*Data:* ${formatLongDate(state.date)}`,
      `*Horário:* ${state.time}`,
    ]

    if (state.clientName.trim()) lines.push(`*Meu nome:* ${state.clientName.trim()}`)
    if (state.notes.trim()) lines.push(`*Observações:* ${state.notes.trim()}`)

    lines.push('', 'Podemos confirmar?')
    return lines.join('\n')
  }, [service, professional, state.date, state.time, state.clientName, state.notes])

  return {
    state,
    service,
    professional,
    eligibleProfessionals,
    availableSlots,
    isDateAvailable,
    isComplete,
    /** A reserva vai para a profissional escolhida; sem escolha, para o contato geral. */
    whatsappLink: message ? whatsappUrl(message, professional?.whatsapp) : '',
    selectService,
    selectProfessional,
    selectDate,
    selectTime,
    setClientName,
    setNotes,
    reset,
  }
}
