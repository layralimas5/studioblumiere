import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { categories, gallery } from '@/content/catalog'
import type { CategoryId } from '@/content/types'
import { cn } from '@/lib/cn'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { Photo } from '@/components/ui/Photo'

type Filter = CategoryId | 'todos'

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>('todos')
  const reduced = useReducedMotion()

  const items = useMemo(() => {
    const filtered =
      filter === 'todos' ? gallery : gallery.filter((item) => item.category === filter)
    return limit ? filtered.slice(0, limit) : filtered
  }, [filter, limit])

  const filters: Array<{ id: Filter; label: string }> = [
    { id: 'todos', label: 'Todos' },
    ...categories.map((category) => ({ id: category.id as Filter, label: category.label })),
  ]

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrar galeria por categoria"
        className="flex flex-wrap justify-center gap-2"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-medium transition-all duration-200',
              filter === item.id
                ? 'bg-mocha-500 text-cream-50'
                : 'border-cream-300 text-ink-500 hover:border-mocha-400 hover:text-ink-900 border bg-white',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-ink-500 mt-16 text-center text-sm">
          Ainda não temos fotos publicadas nesta categoria.
        </p>
      ) : (
        <motion.ul layout className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout={!reduced}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="group"
              >
                <Photo
                  src={item.src}
                  alt={item.alt}
                  zoom
                  className="ring-cream-300 group-hover:ring-mocha-300 aspect-[3/4] w-full rounded-2xl ring-1 transition-all duration-500 group-hover:shadow-[0_24px_50px_-32px_rgba(26,21,18,0.45)]"
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
