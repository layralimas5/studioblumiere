/**
 * Dados da marca. É o único arquivo que precisa ser tocado para trocar
 * telefone, endereço ou redes — nada disso deve ser escrito direto na UI.
 *
 * TODO(cliente): substituir os campos marcados com [PLACEHOLDER] pelos dados reais.
 */
export const site = {
  name: 'Studio B Lumière',
  tagline: 'Beleza que acompanha o seu momento',
  /** Somente dígitos, com código do país — é o formato que a API do WhatsApp exige. */
  whatsapp: '5511999999999', // [PLACEHOLDER]
  whatsappDisplay: '(11) 99999-9999', // [PLACEHOLDER]
  email: 'contato@studioblumiere.com.br', // [PLACEHOLDER]
  instagram: 'https://instagram.com/studiob.lumiere', // [PLACEHOLDER]
  instagramHandle: '@studiob.lumiere', // [PLACEHOLDER]
  address: {
    street: 'Rua das Acácias, 128 — Jardins', // [PLACEHOLDER]
    city: 'São Paulo, SP', // [PLACEHOLDER]
    mapsUrl: 'https://maps.google.com/?q=Studio+B+Lumiere', // [PLACEHOLDER]
  },
  hours: [
    { days: 'Terça a sexta', time: '09h — 20h' },
    { days: 'Sábado', time: '09h — 18h' },
    { days: 'Domingo e segunda', time: 'Fechado' },
  ],
  /**
   * ATENÇÃO: números de prova social. Precisam ser REAIS antes de ir ao ar —
   * inventar avaliação é propaganda enganosa e destrói a confiança que o site constrói.
   */
  socialProof: {
    rating: '4,9', // [PLACEHOLDER]
    reviewCount: 300, // [PLACEHOLDER]
    bridesServed: 300, // [PLACEHOLDER]
  },

  /** Horários oferecidos no agendador. */
  bookingSlots: [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ],
} as const
