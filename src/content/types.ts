export type CategoryId = 'noivas' | 'maquiagem' | 'cilios' | 'unhas' | 'sobrancelhas'

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

export interface Professional {
  id: string
  name: string
  role: string
  /** Categorias que ela atende — usado para filtrar quem aparece no agendador. */
  specialties: CategoryId[]
  photo: string
  /**
   * WhatsApp próprio: cada profissional recebe os agendamentos dela.
   * Somente dígitos, com código do país.
   */
  whatsapp: string
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
