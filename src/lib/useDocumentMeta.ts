import { useEffect } from 'react'

/** Title e description por rota — numa SPA isso não acontece sozinho. */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title

    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = tag?.content

    if (tag) tag.content = description

    return () => {
      if (tag && previous !== undefined) tag.content = previous
    }
  }, [title, description])
}
