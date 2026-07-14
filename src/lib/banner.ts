import { createContext, useContext, useEffect, type RefObject } from 'react'

export interface BannerContextValue {
  /** O banner atualmente na tela, ou `null` quando a página não tem um. */
  banner: HTMLElement | null
  register: (element: HTMLElement | null) => void
}

export const BannerContext = createContext<BannerContextValue | null>(null)

function useBannerContext(): BannerContextValue {
  const context = useContext(BannerContext)
  if (!context) throw new Error('Banner só funciona dentro de <BannerProvider>.')
  return context
}

/**
 * Chamado pelo banner: enquanto ele estiver montado, o Header sabe que há foto sob o menu
 * e mantém a navegação clara.
 *
 * O banner precisa se anunciar porque perguntar ao DOM não funciona: com a transição de rota,
 * a página nova só entra depois que a antiga sai. No instante em que a rota muda, o banner
 * ainda não existe — e o menu acabaria com tinta escura sobre a foto escura.
 */
export function useRegisterBanner(ref: RefObject<HTMLElement | null>): void {
  const { register } = useBannerContext()

  useEffect(() => {
    register(ref.current)
    return () => register(null)
  }, [ref, register])
}

export function useBanner(): HTMLElement | null {
  return useBannerContext().banner
}
