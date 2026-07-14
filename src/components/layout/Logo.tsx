import { cn } from '@/lib/cn'

/**
 * Logo da marca. O arquivo original vem com fundo bege chapado; `logo-transparent.png`
 * é a mesma arte com o fundo recortado — sem ele, apareceria um retângulo sobre a foto.
 *
 * O traço é dourado claro: sobre o banner escuro ele é clareado, e sobre o creme é
 * escurecido, senão desapareceria no fundo.
 */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string
  /** `light` = repousa sobre a foto do banner. `dark` = sobre o creme. */
  tone?: 'dark' | 'light'
}) {
  return (
    <img
      src="/logo-transparent.png"
      alt="Studio B Lumière"
      width={126}
      height={67}
      className={cn(
        'h-14 w-auto transition-[filter] duration-300',
        // `brightness-0` achata o dourado em preto; `invert` sobe esse preto para o branco.
        tone === 'light' ? 'brightness-0 invert' : 'brightness-[0.55] saturate-150',
        className,
      )}
    />
  )
}
