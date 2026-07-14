export type CategoryId = 'noivas' | 'cabelo' | 'maquiagem' | 'cilios' | 'unhas' | 'sobrancelhas'

export interface Category {
  id: CategoryId
  label: string
  /** Frase curta usada como subtítulo da categoria na página de serviços. */
  tagline: string
}

export interface Service {
  id: string
  category: CategoryId
  name: string
  description: string
  /** Duração média em minutos. */
  durationMin: number
  /** Preço a partir de, em reais. `null` = sob consulta (ex.: pacotes de noiva). */
  priceFrom: number | null
  /** Destaca o serviço como o mais procurado da categoria. */
  featured?: boolean
}

/** Dias da semana no padrão de `Date.getDay()`: 0 = domingo. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface Professional {
  id: string
  name: string
  role: string
  /** Categorias que ela atende — usado para filtrar quem aparece no agendador. */
  specialties: CategoryId[]
  photo: string
  /** Dias em que atende. Uma data fora disso é bloqueada no calendário. */
  worksOn: Weekday[]
}

export interface GalleryItem {
  id: string
  category: CategoryId
  src: string
  alt: string
}

export interface Testimonial {
  id: string
  name: string
  context: string
  quote: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}
