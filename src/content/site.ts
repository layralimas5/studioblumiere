/**
 * Dados da marca. É o único arquivo que precisa ser tocado para trocar
 * telefone, endereço ou redes — nada disso deve ser escrito direto na UI.
 *
 * TODO(cliente): substituir os campos marcados com [PLACEHOLDER] pelos dados reais.
 */
export const site = {
  name: 'Studio B Lumière',
  tagline: 'Beleza que acompanha o seu momento',
  /**
   * Contato geral do salão: rodapé, botão flutuante e quem agenda sem escolher
   * profissional. Cada profissional tem o próprio número em `catalog.ts`.
   * Somente dígitos, com código do país — é o formato que a API do WhatsApp exige.
   */
  whatsapp: '5527999367381',
  whatsappDisplay: '(27) 99936-7381',
  email: 'contato@studioblumiere.com.br', // [PLACEHOLDER]
  instagram: 'https://instagram.com/studiob.lumiere', // [PLACEHOLDER]
  instagramHandle: '@studiob.lumiere', // [PLACEHOLDER]
  address: {
    street: 'Rua das Palmeiras, 309',
    city: 'Itararé, Vitória, ES',
    zip: '29047-550',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras+309+Itarar%C3%A9+Vit%C3%B3ria+ES',
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
} as const
