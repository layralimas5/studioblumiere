import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { BannerContext } from '@/lib/banner'

export function BannerProvider({ children }: { children: ReactNode }) {
  const [banner, setBanner] = useState<HTMLElement | null>(null)
  const register = useCallback((element: HTMLElement | null) => setBanner(element), [])
  const value = useMemo(() => ({ banner, register }), [banner, register])

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
}
