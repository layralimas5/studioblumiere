# Studio B Lumière

Site de conversão para salão de beleza completo (noivas, cabelo, maquiagem, cílios, unhas e
sobrancelhas), com agendamento que abre o WhatsApp já preenchido.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

## O que precisa ser trocado antes de publicar

Todo o conteúdo editável vive em `src/content/` — não é preciso mexer em componente para atualizar
o site.

| Arquivo | O que tem lá |
| --- | --- |
| `src/content/site.ts` | WhatsApp, e-mail, endereço, Instagram e horário de funcionamento |
| `src/content/catalog.ts` | Serviços (nome, preço, duração), profissionais, galeria, depoimentos e FAQ |

Tudo que está marcado com `[PLACEHOLDER]` é dado inventado e **precisa** ser substituído:

1. **WhatsApp** (`site.whatsapp`) — só dígitos, com código do país: `5511987654321`.
2. **Prova social** (`site.socialProof`) — a nota e o número de avaliações/noivas. Publicar número
   inventado de avaliação é propaganda enganosa; use os dados reais do Google ou remova a seção.
3. **Depoimentos** (`testimonials`) — trocar pelos reais, com autorização das clientes.
4. **Preços e durações** (`services`) — conferir um a um com a dona do salão.
5. **Equipe** (`professionals`) — nomes, cargos, especialidades e o WhatsApp de cada uma.
6. **Domínio e dados estruturados** — `index.html` (canonical, Open Graph e o bloco JSON-LD com
   endereço e telefone) e `public/sitemap.xml`.

## Fotos

O site funciona sem nenhuma foto: quando o arquivo não existe, aparece um placeholder champagne da
marca no lugar (`src/components/ui/Photo.tsx`). Para usar as fotos reais, basta colocá-las em
`public/images/` com estes nomes:

```
public/images/
  hero.jpg                    # foto principal da home (retrato, proporção 4:5)
  bridal/hero.jpg             # foto principal da página de noivas
  bridal/noiva-1.jpg
  bridal/noiva-2.jpg
  team/ana.jpg                # uma por profissional, usando o id do catalog.ts
  team/carol.jpg
  ...
  services/noivas.jpg         # uma por categoria: noivas, cabelo, maquiagem, cilios, unhas, sobrancelhas
  services/cabelo.jpg
  ...
  gallery/noivas-1.jpg        # os caminhos exatos estão em catalog.ts → gallery
  ...
```

Otimize antes de subir (WebP ou JPEG com largura máxima de ~1600px) — imagem é o que mais pesa no
carregamento.

## Como funciona o agendamento

Não há backend nem calendário. `src/features/booking/` mantém o estado (serviço → profissional) e
gera um link `wa.me` com a mensagem escrita. A cliente confere e envia; o horário é combinado na
conversa, direto com quem vai atender.

Regras já implementadas:

- Só aparecem as profissionais que atendem a **categoria do serviço** escolhido.
- Escolher a profissional é **opcional**: sem escolha, a conversa vai para o WhatsApp geral do salão;
  com escolha, vai para o número dela (`professionals[].whatsapp`).
- O botão só habilita depois que um serviço é selecionado.

Se um dia a disponibilidade em tempo real fizer sentido, o caminho é trocar essa camada por Supabase
(tabelas `services`, `professionals`, `availability`, `bookings`) mantendo a mesma interface: o hook
`useBooking` já isola essa lógica do resto da UI.

## Stack

React + TypeScript (strict) · Vite · Tailwind CSS v4 · Framer Motion · React Router.
