import { useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Ângulos de brilho alternados: dois placeholders lado a lado nunca ficam idênticos,
 * o que evita a aparência de "grade de blocos vazios".
 */
const GLOW_POSITIONS = ['at 30% 25%', 'at 70% 35%', 'at 45% 70%', 'at 65% 20%'] as const

function glowFor(seed: string): string {
  const sum = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return GLOW_POSITIONS[sum % GLOW_POSITIONS.length] ?? GLOW_POSITIONS[0]
}

/**
 * Imagem com fallback embutido. Enquanto as fotos reais não chegam, o lugar delas é
 * ocupado por uma moldura champagne da marca — não por um bloco vazio.
 */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  loading = 'lazy',
  overlay = false,
  zoom = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
  /** Escurece a base da imagem — necessário quando há texto claro por cima. */
  overlay?: boolean
  /**
   * Aproxima a foto no hover. É o mesmo movimento em todo o site: quando um card
   * inteiro é a área de hover, basta ele carregar a classe `group`.
   */
  zoom?: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('bg-cream-200 relative overflow-hidden', zoom && 'group', className)}>
      {failed ? (
        <div role="img" aria-label={alt} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(ellipse ${glowFor(alt)}, rgb(220 196 170 / 0.9), rgb(239 225 211) 45%, rgb(247 242 236) 80%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-script text-mocha-500/50 select-none text-4xl">Lumière</span>
          </div>
          <div className="ring-mocha-300/30 absolute inset-0 ring-1 ring-inset" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            zoom && 'transition-transform duration-700 ease-out group-hover:scale-105',
            imgClassName,
          )}
        />
      )}

      {/* Só faz sentido sobre foto real: aplicado ao placeholder, ele apagaria o brilho. */}
      {overlay && !failed ? (
        <div
          aria-hidden
          className="from-ink-900/75 via-ink-900/20 absolute inset-0 bg-gradient-to-t to-transparent"
        />
      ) : null}

      {/*
        Fio de tinta por dentro da borda. Sobre o creme, uma foto clara sem contorno parece
        derreter no fundo — este filete a recorta sem virar moldura.
      */}
      {failed ? null : (
        <div
          aria-hidden
          className="ring-ink-900/[0.07] pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset"
        />
      )}
    </div>
  )
}
