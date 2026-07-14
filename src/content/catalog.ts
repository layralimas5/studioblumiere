import type {
  Category,
  FaqItem,
  GalleryItem,
  Professional,
  Service,
  Testimonial,
} from './types'

export const categories: Category[] = [
  {
    id: 'noivas',
    label: 'Noivas',
    tagline: 'Do teste ao altar, com hora marcada e nenhum imprevisto.',
  },
  { id: 'cabelo', label: 'Cabelo', tagline: 'Corte, cor e tratamento com leitura de fio.' },
  { id: 'maquiagem', label: 'Maquiagem', tagline: 'Pele viva, longa duração, nada de máscara.' },
  { id: 'cilios', label: 'Cílios', tagline: 'Do natural ao volume, respeitando o fio nativo.' },
  { id: 'unhas', label: 'Unhas', tagline: 'Acabamento impecável que dura semanas.' },
  { id: 'sobrancelhas', label: 'Sobrancelhas', tagline: 'Design que segue o seu olhar, não a moda.' },
]

export const services: Service[] = [
  // Noivas
  {
    id: 'noiva-completo',
    category: 'noivas',
    name: 'Pacote Noiva Completo',
    description:
      'Teste prévio de cabelo e maquiagem, dia do casamento com equipe dedicada e retoque final antes da cerimônia.',
    durationMin: 240,
    priceFrom: null,
    featured: true,
  },
  {
    id: 'noiva-teste',
    category: 'noivas',
    name: 'Teste de Noiva',
    description:
      'Ensaio de penteado e maquiagem para definir cada detalhe com calma, antes do grande dia.',
    durationMin: 120,
    priceFrom: 450,
  },
  {
    id: 'noiva-madrinhas',
    category: 'noivas',
    name: 'Madrinhas e Mãe da Noiva',
    description: 'Penteado e maquiagem para o cortejo, no mesmo dia e no mesmo ritmo da noiva.',
    durationMin: 90,
    priceFrom: 320,
  },
  {
    id: 'noiva-day',
    category: 'noivas',
    name: 'Day of the Bride',
    description:
      'O salão reservado para você e suas convidadas: espumante, música e todos os serviços em sequência.',
    durationMin: 300,
    priceFrom: null,
  },

  // Cabelo
  {
    id: 'cabelo-corte',
    category: 'cabelo',
    name: 'Corte + Finalização',
    description: 'Consulta de visagismo, corte sob medida e finalização que você consegue repetir em casa.',
    durationMin: 90,
    priceFrom: 180,
    featured: true,
  },
  {
    id: 'cabelo-cor',
    category: 'cabelo',
    name: 'Coloração & Mechas',
    description: 'Loiros, morenas iluminadas e cobertura de brancos com diagnóstico de fio antes de qualquer química.',
    durationMin: 180,
    priceFrom: 420,
  },
  {
    id: 'cabelo-tratamento',
    category: 'cabelo',
    name: 'Tratamento de Reconstrução',
    description: 'Protocolo de reposição de massa e brilho para cabelos cansados de química ou calor.',
    durationMin: 60,
    priceFrom: 220,
  },
  {
    id: 'cabelo-penteado',
    category: 'cabelo',
    name: 'Penteado para Evento',
    description: 'Preso, semipreso ou ondas soltas — construído para durar a festa inteira.',
    durationMin: 75,
    priceFrom: 260,
  },

  // Maquiagem
  {
    id: 'make-social',
    category: 'maquiagem',
    name: 'Maquiagem Social',
    description: 'Para formatura, casamento de amiga ou jantar. Pele natural, olhar marcado.',
    durationMin: 60,
    priceFrom: 240,
    featured: true,
  },
  {
    id: 'make-express',
    category: 'maquiagem',
    name: 'Make Express',
    description: 'Trinta minutos entre o trabalho e o compromisso, sem abrir mão do acabamento.',
    durationMin: 30,
    priceFrom: 140,
  },
  {
    id: 'make-aula',
    category: 'maquiagem',
    name: 'Aula de Automaquiagem',
    description: 'Você aprende a fazer a sua própria make, com os produtos que já tem em casa.',
    durationMin: 120,
    priceFrom: 380,
  },

  // Cílios
  {
    id: 'cilios-classico',
    category: 'cilios',
    name: 'Extensão Clássica',
    description: 'Um fio para cada cílio natural. O efeito de quem nasceu com cílios bonitos.',
    durationMin: 90,
    priceFrom: 190,
    featured: true,
  },
  {
    id: 'cilios-volume',
    category: 'cilios',
    name: 'Volume Brasileiro',
    description: 'Leques leves que preenchem as falhas e dão densidade sem pesar na pálpebra.',
    durationMin: 120,
    priceFrom: 260,
  },
  {
    id: 'cilios-lifting',
    category: 'cilios',
    name: 'Lash Lifting + Tintura',
    description: 'Curvatura e cor no seu próprio cílio, sem colar um fio sequer. Dura até 8 semanas.',
    durationMin: 60,
    priceFrom: 180,
  },
  {
    id: 'cilios-manutencao',
    category: 'cilios',
    name: 'Manutenção de Extensão',
    description: 'Reposição dos fios que caíram no ciclo natural. Ideal a cada 3 semanas.',
    durationMin: 60,
    priceFrom: 120,
  },

  // Unhas
  {
    id: 'unhas-gel',
    category: 'unhas',
    name: 'Alongamento em Gel',
    description: 'Estrutura resistente, formato desenhado com você e acabamento espelhado.',
    durationMin: 150,
    priceFrom: 220,
    featured: true,
  },
  {
    id: 'unhas-esmaltacao',
    category: 'unhas',
    name: 'Esmaltação em Gel',
    description: 'Cor uniforme e brilho que atravessa três semanas de rotina.',
    durationMin: 75,
    priceFrom: 110,
  },
  {
    id: 'unhas-spa',
    category: 'unhas',
    name: 'Spa de Mãos e Pés',
    description: 'Esfoliação, hidratação profunda e massagem — mais cuidado do que estética.',
    durationMin: 90,
    priceFrom: 160,
  },

  // Sobrancelhas
  {
    id: 'brow-design',
    category: 'sobrancelhas',
    name: 'Design com Henna',
    description: 'Mapeamento do rosto, correção do desenho e preenchimento das falhas.',
    durationMin: 45,
    priceFrom: 90,
    featured: true,
  },
  {
    id: 'brow-laminacao',
    category: 'sobrancelhas',
    name: 'Laminação de Sobrancelhas',
    description: 'Fios alinhados para cima, efeito volumoso e penteado por semanas.',
    durationMin: 60,
    priceFrom: 150,
  },
]

/**
 * TODO(cliente): trocar por nomes e fotos reais da equipe.
 * `worksOn` controla quais dias o calendário libera para cada profissional.
 */
export const professionals: Professional[] = [
  {
    id: 'ana',
    name: 'Ana Beatriz',
    role: 'Hair stylist sênior · Especialista em noivas',
    specialties: ['noivas', 'cabelo'],
    photo: '/images/team/ana.jpg',
    worksOn: [2, 3, 4, 5, 6],
  },
  {
    id: 'carol',
    name: 'Carolina Reis',
    role: 'Maquiadora · Beauty artist',
    specialties: ['noivas', 'maquiagem'],
    photo: '/images/team/carol.jpg',
    worksOn: [3, 4, 5, 6],
  },
  {
    id: 'juliana',
    name: 'Juliana Mota',
    role: 'Colorista',
    specialties: ['cabelo'],
    photo: '/images/team/juliana.jpg',
    worksOn: [2, 3, 4, 5],
  },
  {
    id: 'marina',
    name: 'Marina Alves',
    role: 'Lash designer',
    specialties: ['cilios', 'sobrancelhas'],
    photo: '/images/team/marina.jpg',
    worksOn: [2, 3, 4, 5, 6],
  },
  {
    id: 'patricia',
    name: 'Patrícia Lopes',
    role: 'Lash designer · Brow expert',
    specialties: ['cilios', 'sobrancelhas'],
    photo: '/images/team/patricia.jpg',
    worksOn: [3, 4, 5, 6],
  },
  {
    id: 'renata',
    name: 'Renata Souza',
    role: 'Nail designer',
    specialties: ['unhas'],
    photo: '/images/team/renata.jpg',
    worksOn: [2, 3, 4, 5, 6],
  },
  {
    id: 'tais',
    name: 'Taís Ferreira',
    role: 'Nail designer · Spa',
    specialties: ['unhas'],
    photo: '/images/team/tais.jpg',
    worksOn: [2, 4, 5, 6],
  },
  {
    id: 'vitoria',
    name: 'Vitória Nunes',
    role: 'Maquiadora',
    specialties: ['maquiagem', 'noivas'],
    photo: '/images/team/vitoria.jpg',
    worksOn: [2, 3, 5, 6],
  },
]

export const gallery: GalleryItem[] = [
  { id: 'g1', category: 'noivas', src: '/images/gallery/noivas-1.jpg', alt: 'Noiva com penteado semipreso e véu' },
  { id: 'g2', category: 'noivas', src: '/images/gallery/noivas-2.jpg', alt: 'Maquiagem de noiva em pele madura' },
  { id: 'g3', category: 'noivas', src: '/images/gallery/noivas-3.jpg', alt: 'Coque baixo trançado para noiva' },
  { id: 'g4', category: 'cabelo', src: '/images/gallery/cabelo-1.jpg', alt: 'Loiro iluminado com mechas finas' },
  { id: 'g5', category: 'cabelo', src: '/images/gallery/cabelo-2.jpg', alt: 'Corte bob com franja cortina' },
  { id: 'g6', category: 'cabelo', src: '/images/gallery/cabelo-3.jpg', alt: 'Ondas longas com brilho de tratamento' },
  { id: 'g7', category: 'maquiagem', src: '/images/gallery/make-1.jpg', alt: 'Maquiagem social com olhar esfumado' },
  { id: 'g8', category: 'maquiagem', src: '/images/gallery/make-2.jpg', alt: 'Pele natural com boca nude' },
  { id: 'g9', category: 'cilios', src: '/images/gallery/cilios-1.jpg', alt: 'Extensão de cílios efeito clássico' },
  { id: 'g10', category: 'cilios', src: '/images/gallery/cilios-2.jpg', alt: 'Volume brasileiro em olhos amendoados' },
  { id: 'g11', category: 'cilios', src: '/images/gallery/cilios-3.jpg', alt: 'Lash lifting com curvatura acentuada' },
  { id: 'g12', category: 'unhas', src: '/images/gallery/unhas-1.jpg', alt: 'Alongamento em gel formato bailarina' },
  { id: 'g13', category: 'unhas', src: '/images/gallery/unhas-2.jpg', alt: 'Francesinha moderna em unhas curtas' },
  { id: 'g14', category: 'sobrancelhas', src: '/images/gallery/brow-1.jpg', alt: 'Sobrancelha com design e henna' },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcela A.',
    context: 'Noiva · Casamento em março',
    quote:
      'Fiz o teste dois meses antes e chegamos no dia sem nenhuma surpresa. A equipe entrou na suíte no horário combinado e saiu no horário combinado — isso, num dia de casamento, vale ouro.',
  },
  {
    id: 't2',
    name: 'Bruna L.',
    context: 'Cliente de cílios há 2 anos',
    quote:
      'Já tinha desistido de extensão porque meus cílios naturais sempre sofriam. Aqui foi a primeira vez que alguém olhou o meu fio antes de escolher o efeito.',
  },
  {
    id: 't3',
    name: 'Camila R.',
    context: 'Coloração',
    quote:
      'Cheguei com um loiro alaranjado de outro salão e saí com a cor que eu queria há anos. Explicaram cada etapa antes de encostar no meu cabelo.',
  },
]

export const faq: FaqItem[] = [
  {
    id: 'f1',
    question: 'Como funciona o agendamento pelo site?',
    answer:
      'Você escolhe o serviço, a profissional e o melhor horário aqui mesmo. Ao finalizar, abrimos uma conversa no WhatsApp com tudo já preenchido — é só enviar. Confirmamos a reserva em poucos minutos, dentro do horário de atendimento.',
  },
  {
    id: 'f2',
    question: 'Posso escolher a profissional que vai me atender?',
    answer:
      'Sim, e recomendamos. Cada profissional tem uma especialidade, e o agendador só mostra quem atende o serviço que você selecionou. Se não tiver preferência, escolha "Sem preferência" e encaixamos você com quem estiver disponível.',
  },
  {
    id: 'f3',
    question: 'Com quanta antecedência preciso agendar o meu casamento?',
    answer:
      'Para noivas, o ideal é reservar de 4 a 6 meses antes, principalmente entre setembro e dezembro. O teste costuma ser feito de 30 a 60 dias antes da cerimônia.',
  },
  {
    id: 'f4',
    question: 'Vocês atendem fora do salão, no dia do casamento?',
    answer:
      'Sim. Atendemos em casa, no hotel ou no espaço da festa, com uma taxa de deslocamento calculada conforme a distância. É só nos contar o endereço na hora do orçamento.',
  },
  {
    id: 'f5',
    question: 'E se eu precisar remarcar ou cancelar?',
    answer:
      'Sem problema — pedimos apenas que nos avise com pelo menos 24 horas de antecedência, para que possamos oferecer o horário a outra cliente.',
  },
  {
    id: 'f6',
    question: 'Quais são as formas de pagamento?',
    answer:
      'Pix, dinheiro e cartão de crédito ou débito. Pacotes de noiva podem ser parcelados — combinamos as condições no orçamento.',
  },
]
