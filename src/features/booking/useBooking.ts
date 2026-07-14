import { useCallback, useMemo, useState } from 'react'
import { professionals, services } from '@/content/catalog'
import { site } from '@/content/site'
import type { Professional, Service } from '@/content/types'
import { formatDuration } from '@/lib/format'
import { whatsappUrl } from '@/lib/whatsapp'

export const ANY_PROFESSIONAL = 'any'

interface BookingState {
  serviceId: string | null
  professionalId: string | typeof ANY_PROFESSIONAL | null
}

const EMPTY: BookingState = {
  serviceId: null,
  professionalId: null,
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
        serviceId,
        professionalId: keepProfessional ? prev.professionalId : null,
      }
    })
  }, [])

  const selectProfessional = useCallback((professionalId: string) => {
    setState((prev) => ({ ...prev, professionalId }))
  }, [])

  const reset = useCallback(() => setState(EMPTY), [])

  /** O serviço é o único passo obrigatório: a profissional é preferência, não requisito. */
  const isComplete = service !== null

  const message = useMemo(() => {
    if (!service) return ''

    const lines = [
      `Olá! Quero agendar um horário no ${site.name}. ✨`,
      '',
      `*Serviço:* ${service.name} (${formatDuration(service.durationMin)})`,
      `*Profissional:* ${professional ? professional.name : 'Sem preferência'}`,
      '',
      'Quais horários você tem disponíveis?',
    ]

    return lines.join('\n')
  }, [service, professional])

  return {
    state,
    service,
    professional,
    eligibleProfessionals,
    isComplete,
    /** A conversa vai para a profissional escolhida; sem escolha, para o contato geral. */
    whatsappLink: message ? whatsappUrl(message, professional?.whatsapp) : '',
    selectService,
    selectProfessional,
    reset,
  }
}
