# Template de Referência — Sites para Pequenos Negócios

> Baseado no projeto **Gerês Cascatas Residence** (Junho 2026).
> Recipe para criar sites profissionais com Astro + Tailwind para alojamentos, barbearias, restaurantes, ginásios, e similares.

**Tempo estimado para novo projeto usando este recipe:** 25-40 horas (vs 80-110h do zero).

---

## Índice

1. [Quick Start](#1-quick-start)
2. [Tech Stack & Justificações](#2-tech-stack--justificações)
3. [Arquitetura do Projeto](#3-arquitetura-do-projeto)
4. [Componentes Reutilizáveis](#4-componentes-reutilizáveis)
5. [Pattern de Configuração (`client.config.ts`)](#5-pattern-de-configuração)
6. [Adaptação por Vertical de Negócio](#6-adaptação-por-vertical)
7. [Schema.org por Tipo de Negócio](#7-schemaorg-por-tipo-de-negócio)
8. [Recipe de Deploy](#8-recipe-de-deploy)
9. [Bugs Comuns & Fixes](#9-bugs-comuns--fixes)
10. [Custo Operacional](#10-custo-operacional)
11. [Estimativa de Esforço por Vertical](#11-estimativa-de-esforço)
12. [Exemplo: Adaptar para Barbearia](#12-exemplo-adaptar-para-barbearia)
13. [Stack Tecnológico Avançado — Frontend & Backend](#13-stack-tecnológico-avançado--frontend--backend)
14. [Sistema de Booking Integrado — Estudo de Caso Barbearia](#14-sistema-de-booking-integrado--estudo-de-caso-barbearia)
15. [Briefing Inicial — Questionário Cliente](#15-briefing-inicial--questionário-cliente)
16. [Workflow de Desenvolvimento](#16-workflow-de-desenvolvimento)
17. [Conversion Optimization Patterns](#17-conversion-optimization-patterns)
18. [CMS — Quando o Cliente Quer Editar](#18-cms--quando-o-cliente-quer-editar-conteúdo)
19. [Performance & Acessibilidade — Checklist](#19-performance--acessibilidade--checklist)
20. [SEO Playbook Avançado](#20-seo-playbook-avançado)
21. [Monitoring & Error Tracking](#21-monitoring--error-tracking-produção)
22. [PWA & Features Avançadas](#22-pwa--features-avançadas)
23. [Email Marketing & Retention](#23-email-marketing--retention)
24. [Comunicação com Cliente — Templates](#24-comunicação-com-cliente--templates)
25. [Propostas e Contratos](#25-propostas-e-contratos)
26. [Snippets Reutilizáveis](#26-snippets-reutilizáveis)
27. [Manutenção Pós-Entrega](#27-manutenção-pós-entrega)
28. [Lições Aprendidas — Projeto Gerês](#28-lições-aprendidas--projeto-gerês)
29. [Lições Aprendidas — Template Barbearia Nobre](#29-lições-aprendidas--template-barbearia-nobre-junho-2026)
30. [Lições Aprendidas — Template Alojamento com Temas](#30-lições-aprendidas--template-alojamento-local-com-temas-junho-2026)
31. [Lições Aprendidas — Açaí do Rei (Food Delivery / Builder Interactivo)](#31-lições-aprendidas--açaí-do-rei-junho-2026)

---

## 1. Quick Start

```bash
# Clone o projeto base
git clone https://github.com/andremacaes10/gerescascatasresidence.git novo-projeto
cd novo-projeto

# Limpa o histórico e cria novo repo
rm -rf .git && git init

# Instala dependências
npm install

# Renomeia projeto (Astro)
# Edita: package.json (name), README.md, client.config.ts

# Configuração inicial
cp client.config.ts client.config.ts.template
# Edita client.config.ts com dados do novo cliente

# Dev local
npm run dev
```

**Para deploy:** ver Secção 8.

---

## 2. Tech Stack & Justificações

| Componente | Tecnologia | Porquê | Custo |
|---|---|---|---|
| Framework | **Astro 4** | Static-first, performance top, zero runtime JS por default | Grátis |
| CSS | **Tailwind CSS** | Utility-first, sem CSS custom desnecessário, bundle pequeno | Grátis |
| Linguagem | **TypeScript** | Type safety nos componentes, autocomplete melhor | Grátis |
| Mapa | **Google Maps embed** (iframe) ou **Mapbox GL JS** | Embed = zero config, zero JS, zero token. Mapbox só se precisas de tema custom ou POIs interativos | Grátis |
| Date picker | **flatpickr** | Lightweight, locale PT, tema custom | Grátis |
| Lightbox | **GLightbox** | Simples, sem dependências, touch-friendly | Grátis |
| Form backend | **Web3Forms** | Free tier 250/mês, sem servidor, GDPR-friendly | Grátis até 250/mês |
| Hosting | **Vercel** | Auto-deploy GitHub, edge global, SSL automático | Grátis (Hobby) |
| Cron jobs | **cron-job.org** | Fiável, free, melhor que GitHub Actions para scheduling | Grátis |
| Email | **Gmail** | Familiar, gratuito | Grátis |
| Versionamento | **GitHub** | Standard, integra com Vercel | Grátis |

**Decisões deliberadamente evitadas:**
- ❌ React (overkill para sites maioritariamente estáticos)
- ❌ Next.js (mais pesado que Astro, sem ganho real para este caso)
- ❌ WordPress (slow, plugins de segurança, manutenção)
- ❌ Wix/Webflow (vendor lock-in, custo recorrente, sem control)
- ❌ Google Analytics (cookie banner obrigatório, pesa no Lighthouse)

---

## 3. Arquitetura do Projeto

```
projeto/
├── client.config.ts          # ★ SINGLE SOURCE OF TRUTH
├── astro.config.mjs          # Config Astro (i18n, site URL)
├── tailwind.config.mjs       # Cores brand, fontes
├── vercel.json               # Security headers + cache
├── public/
│   ├── favicon.svg           # Logo brand-aware
│   ├── images/
│   │   ├── logo.png          # Logo oficial
│   │   ├── hero.jpg          # Hero principal
│   │   └── gallery/          # Fotos diversas
│   └── fonts/                # Fontes self-hosted
├── src/
│   ├── pages/
│   │   ├── index.astro       # Homepage PT
│   │   ├── en/index.astro    # Homepage EN
│   │   ├── privacidade.astro # Política PT
│   │   ├── en/privacy.astro  # Política EN
│   │   ├── blog/             # Posts PT
│   │   ├── en/blog/          # Posts EN
│   │   └── sitemap.xml.ts    # Sitemap dinâmico
│   ├── layouts/
│   │   └── Layout.astro      # Meta tags, Schema.org, favicon
│   ├── components/
│   │   ├── Navbar.astro      # Top navigation
│   │   ├── Hero.astro        # Hero principal
│   │   ├── Footer.astro      # Footer com social
│   │   └── ...               # Componentes por secção
│   ├── content/
│   │   └── blog/             # Markdown dos posts (PT + EN)
│   ├── i18n/
│   │   ├── pt.json           # Traduções PT
│   │   ├── en.json           # Traduções EN
│   │   └── utils.ts          # Helper functions
│   ├── styles/
│   │   └── global.css        # CSS global + utility classes
│   └── utils/
│       └── icons.ts          # SVGs inline
├── docs/                     # Docs para cliente
└── .github/workflows/        # CI/CD opcional
```

### Princípios fundamentais

1. **`client.config.ts` é o único sítio que muda por cliente.** Componentes leem dele, nunca hardcoded.
2. **i18n é obrigatório desde o início.** Mesmo para clientes PT-only, deixa estrutura pronta.
3. **Mobile-first sempre.** Testa em iPhone real antes de considerar feito.
4. **Performance é feature.** Astro static = 95+ Lighthouse por default. Não a destruas.

---

## 4. Componentes Reutilizáveis

### 🟢 Mantém quase sempre (90%+ aproveitamento)

| Componente | Adaptações típicas |
|---|---|
| `Layout.astro` | Meta tags, Schema.org (mudar `@type`) |
| `Navbar.astro` | Links do menu (configurável via config) |
| `Footer.astro` | Social links, copyright |
| `Hero.astro` | Vídeo/imagem, tagline, CTA |
| `Gallery.astro` | Fotos diferentes, layout igual |
| `Location.astro` | Mapbox com coords/POI diferentes |
| `Reviews.astro` | Source diferente (Google em vez de Booking, etc.) |
| `BookingInfo.astro` | Renomear para "Info" + adaptar campos |
| `Contact.astro` | Form multi-step adaptado ao tipo de pedido |

### 🟡 Adaptação parcial (50-70%)

| Componente | Notas |
|---|---|
| `Accommodation.astro` | Renomear para `About.astro` / `Services.astro` |
| `Amenities.astro` | Mudar ícones + texto consoante negócio |
| Blog posts | Conteúdo novo, estrutura mantém |

### 🔴 Específico do alojamento (remove ou refaz)

- Pool de disponibilidade dos 3 T1s
- iCal sync com Booking
- flatpickr date range com turnover days
- Lógica de "noites mínimas sazonais"

---

## 5. Pattern de Configuração

O ficheiro `client.config.ts` centraliza **tudo o que muda entre clientes**. Estrutura padrão:

```typescript
export const config = {
  // === IDENTIDADE ===
  name: 'Nome do Negócio',
  tagline: { pt: '...', en: '...' },
  description: { pt: '...', en: '...' },

  // === CONTACTO ===
  contact: {
    phone: '+351 ...',
    email: '...',
    whatsapp: '+351...',
    address: '...',
    city: '...',
    googleMapsUrl: '...',
    latitude: ...,
    longitude: ...,
  },

  // === REDES SOCIAIS ===
  instagram: { enabled: true, handle: '...', posts: [...] },
  tiktok: { enabled: true, handle: '...', url: '...' },

  // === MAPBOX ===
  mapbox: { token: 'pk...', centerLng: ..., centerLat: ..., zoom: 14 },

  // === IMAGENS ===
  images: {
    hero: '/images/hero.jpg',
    logo: '/images/logo.png',
  },

  // === POI (Mapa) ===
  pointsOfInterest: [
    { category: '...', name: '...', distance: ..., lng: ..., lat: ... },
  ],

  // === REVIEWS ===
  reviews: [...],
  reviewCategories: [...],

  // === BUSINESS-SPECIFIC ===
  // (varia por vertical — ver Secção 6)

  // === SEO ===
  seo: {
    title: { pt: '...', en: '...' },
    description: { pt: '...', en: '...' },
    ogImage: '/images/hero.jpg',
  },

  // === FORMS ===
  web3formsKey: 'XXX',

  // === ANALYTICS (geralmente vazio) ===
  analytics: { googleAnalyticsId: null },
};
```

---

## 6. Adaptação por Vertical

### 🏨 Alojamento Local / Hotel / Hostel
- **Booking system:** iCal sync + form de pedido de reserva
- **Schema.org:** `LodgingBusiness` ou `Hotel`
- **Secções únicas:** Quartos, comodidades, regras casa
- **Reviews source:** Booking.com / Airbnb
- **Multi-property:** sim (se aplicável)

### 💈 Barbearia / Cabeleireiro / Estética
- **Booking system:** **Calendly / Cal.com / Square Appointments** (slot-based, não date-range)
- **Schema.org:** `HairSalon` ou `BeautySalon`
- **Secções únicas:** Serviços + preços, equipa/barbeiros, portfolio
- **Reviews source:** Google Business Profile
- **Multi-property:** raro (uma loja só)

### 🍽️ Restaurante / Café
- **Booking system:** **TheFork / OpenTable** (ou form simples para grupos)
- **Schema.org:** `Restaurant` ou `CafeOrCoffeeShop`
- **Secções únicas:** Ementa, horários, eventos
- **Reviews source:** Google + TripAdvisor
- **Menu PDF:** download direto recomendado

### 🏋️ Ginásio / Estúdio Yoga / Pilates
- **Booking system:** **Mindbody / Glofox** (ou form para trial class)
- **Schema.org:** `SportsActivityLocation` ou `HealthClub`
- **Secções únicas:** Horários aulas, professores, planos preços
- **Reviews source:** Google
- **Membership pricing:** tabela transparente

### 🩺 Clínica / Consultório
- **Booking system:** **Doctolib** (em PT) ou form
- **Schema.org:** `MedicalClinic` ou `Dentist`
- **Secções únicas:** Especialidades, equipa médica, convénios
- **Reviews source:** Google
- **Compliance extra:** RNU + Saúde 24

### 🛍️ Loja Local / Atelier
- **Booking system:** se vende online → Shopify. Se não → catálogo + contacto
- **Schema.org:** `Store` ou `Product` por item
- **Secções únicas:** Catálogo, sobre o atelier, processo
- **Reviews source:** Google + Etsy

---

## 7. Schema.org por Tipo de Negócio

```typescript
// Base comum a todos
const base = {
  "@context": "https://schema.org",
  "name": config.name,
  "url": canonicalUrl,
  "telephone": config.contact.phone,
  "email": config.contact.email,
  "address": {...},
  "geo": {...},
  "image": [...],
  "logo": logoUrl,
  "openingHoursSpecification": [...], // se aplicável
  "priceRange": "€€",
  "aggregateRating": {...},
};

// Por vertical, muda só o @type:
```

| Negócio | `@type` | Campos extras |
|---|---|---|
| Alojamento | `LodgingBusiness` | `numberOfRooms`, `checkinTime`, `checkoutTime`, `amenityFeature` |
| Hotel | `Hotel` | + `starRating` |
| Barbearia | `HairSalon` | `serviceArea`, `hasOfferCatalog` |
| Salão de beleza | `BeautySalon` | idem barbearia |
| Restaurante | `Restaurant` | `servesCuisine`, `menu`, `acceptsReservations` |
| Café | `CafeOrCoffeeShop` | idem restaurante |
| Ginásio | `SportsActivityLocation` | `sportingActivity` |
| Clínica | `MedicalClinic` | `medicalSpecialty`, `availableService` |
| Dentista | `Dentist` | + Trust signals |
| Loja | `Store` | `paymentAccepted`, `currenciesAccepted` |

**Sempre adicionar separadamente:**
```json
{
  "@type": "Organization",
  "name": "...",
  "logo": "https://.../logo.png",
  "sameAs": ["instagram", "tiktok", "facebook"]
}
```

**Se tiverem FAQ:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": {...} }
  ]
}
```

---

## 8. Recipe de Deploy

### Fase 1: Setup inicial (30 min)
1. Criar repo GitHub (via GitHub CLI — mais rápido que web):
```bash
# Instalar CLI (Windows)
winget install --id GitHub.cli
gh auth login --web
# Criar repo privado e push em 1 comando
gh repo create nome-projeto --private --source=. --remote=origin --push
```
2. **Vercel:** Add New → Import Project → conectar GitHub
3. Deploy inicial (auto-detect Astro)

> ⚠️ **Criar `.gitignore` ANTES do primeiro `git add`** — incluir `node_modules/`, `.astro/`, `.env`, `dist/`.

### Fase 2: Domínio (15 min)
1. Cliente compra domínio (~10€/ano, recomendar Porkbun ou Cloudflare)
2. Vercel → Settings → Domains → Add Domain
3. Configurar redirect www → apex (308 permanent)
4. Esperar SSL (5-15 min)

### Fase 3: Form backend (10 min)
1. Criar conta Web3Forms (gerescascatas@gmail.com ou específico)
2. Copiar access key
3. Adicionar em `client.config.ts` → `web3formsKey`
4. Testar submissão

### Fase 4: SEO (20 min)
1. Google Search Console → Add Property → verificar via DNS TXT
2. Submeter sitemap: `https://dominio.com/sitemap.xml`
3. Google Business Profile (cliente cria)
4. Mapbox token → URL allowlist com domínio final

### Fase 5: Automação opcional (10 min)
- Se há cron job (iCal, etc.): configurar cron-job.org com Vercel Deploy Hook

### Fase 6: Segurança (já no template)
- Security headers em `vercel.json` (já configurados)
- Política de Privacidade (adaptar texto, sempre incluir)

---

## 9. Bugs Comuns & Fixes

### 🐛 iOS Safari: anchor links saltam para a secção errada
**Causa:** `content-visibility: auto` em secções entre Hero e target.
**Fix:** Remover `cv-auto` das secções. Perda performance é mínima.

### 🐛 Mapbox: `Cannot use import statement outside a module`
**Causa:** Script Astro dentro de fragmento condicional `{cond && (<script>...</script>)}`.
**Fix:** Mover `<script>` para top-level do componente. Check em runtime.

### 🐛 flatpickr: `invalid locale undefined`
**Causa:** `locale: isEnglish ? undefined : Portuguese` rebenta.
**Fix:** Usar `'default'` em vez de `undefined` para inglês.

### 🐛 iOS: campos de form fazem zoom automático
**Causa:** font-size < 16px em inputs.
**Fix:** `font-size: 16px` em todos os inputs/selects/textareas em mobile media query.

### 🐛 Mobile: alvos de toque muito pequenos
**Fix:** Mínimo 44×44px em todos os botões/links interativos.

### 🐛 iOS Hero: 100vh ultrapassa ecrã (devido a address bar)
**Fix:** Usar `100dvh` com `100vh` como fallback.

### 🐛 Google: ícone genérico em vez do logo
**Causa:** Falta Schema.org `Organization` com `logo`.
**Fix:** Adicionar bloco JSON-LD separado com Organization + logo URL absoluto.

### 🐛 Carrossel CSS não roda com prefers-reduced-motion
**Causa:** Media query `@media (prefers-reduced-motion: reduce) { animation: none; }`.
**Fix:** Só desativar para animações com movimento real. Crossfade de opacidade é seguro.

### 🐛 GitHub Actions cron salta execuções
**Causa:** Cron `0 * * * *` ao minuto :00 (hora de pico GitHub).
**Fix:** Usar minuto off-peak (`17 */2 * * *`) OU mudar para cron-job.org (mais fiável).

### 🐛 Vercel: Deploy hook falha "not a member of team"
**Causa:** Projeto na conta do cliente (Hobby) com commits de outro autor.
**Fix:** Manter projeto Vercel na conta do developer até handover final.

### 🐛 Mapbox: wildcards `*` rejeitados no URL allowlist
**Causa:** Mapbox usa prefix matching simples, não wildcards.
**Fix:** Adicionar URLs sem `*` (ex: `https://dominio.com/`).

### 🐛 Vercel: `nodejs18.x` invalid runtime (deploy falha)
**Causa:** `@astrojs/vercel` v7 gera funções com `nodejs18.x`, que o Vercel descontinuou após o Node.js 18 atingir EOL.
**Fix:** Atualizar `@astrojs/vercel` para v10+ (requer Astro 6). Fazer em conjunto:
```bash
npm install astro@latest @astrojs/vercel@latest --legacy-peer-deps
```
**Sintoma:** Build falha com `The following Serverless Functions contain an invalid "runtime": - _render (nodejs18.x)`.

### 🐛 Astro 6: `@astrojs/vercel/serverless` path removido
**Causa:** A partir de `@astrojs/vercel` v8+, o sub-path `/serverless` foi eliminado.
**Fix:** `astro.config.mjs`:
```js
// ❌ Antes
import vercel from '@astrojs/vercel/serverless';
// ✅ Depois
import vercel from '@astrojs/vercel';
```

### 🐛 Astro 6: `output: 'hybrid'` removido
**Causa:** Astro 6 unificou os modos `static` e `hybrid`. O modo `hybrid` já não existe.
**Fix:** Usar `output: 'static'` (default). Páginas SSR continuam a usar `export const prerender = false` individualmente — comportamento idêntico.

### 🐛 Astro 6: `@astrojs/tailwind` incompatível
**Causa:** `@astrojs/tailwind` só suporta até Astro 5. No Astro 6 o peer dependency falha.
**Fix:** Remover o integration e usar PostCSS diretamente (Vite já o suporta nativamente):
```bash
npm uninstall @astrojs/tailwind
npm install autoprefixer --save-dev
```
Criar `postcss.config.mjs`:
```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```
Remover `tailwind()` de `astro.config.mjs`. O `tailwind.config.mjs` e as classes continuam a funcionar sem alteração.

### 🐛 Supabase: novo formato de chaves (2026)
**Causa:** Supabase migrou para `sb_publishable_...` (era `anon`) e `sb_secret_...` (era `service_role`).
**Mapeamento:**
| Env var no código | Chave no dashboard |
|---|---|
| `PUBLIC_SUPABASE_ANON_KEY` | **Publishable key** (`sb_publishable_...`) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret key** (`sb_secret_...`) — clicar no olho para revelar |
O `createClient` do SDK funciona igual — só muda o valor da string.

### 🐛 HMAC `timingSafeEqual` lança exceção em vez de retornar false
**Causa:** `crypto.timingSafeEqual(a, b)` lança `RangeError` se os buffers tiverem tamanhos diferentes. Com assinaturas malformadas, isto transforma-se num 500 em vez de 401.
**Fix:**
```typescript
try {
  const a = Buffer.from(signature, 'utf8');
  const b = Buffer.from(expectedSig, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
} catch {
  return false;
}
```

### 🐛 Git: `node_modules` no primeiro commit
**Causa:** Fazer `git init && git add . && git commit` sem `.gitignore` inclui os 400+ pacotes.
**Fix:** Criar sempre o `.gitignore` **antes** do primeiro `git add`. Se já aconteceu:
```bash
git rm -r --cached node_modules .astro
git add .gitignore
git commit -m "chore: add .gitignore, remove node_modules from tracking"
```

---

## 10. Custo Operacional

### Para o cliente, por ano

| Item | Custo |
|---|---|
| Domínio `.com` | 10-15€ |
| Vercel Hobby | 0€ |
| GitHub | 0€ |
| Mapbox | 0€ (até 50k loads/mês) |
| Web3Forms | 0€ (até 250 envios/mês) |
| cron-job.org | 0€ |
| Email (Gmail) | 0€ |
| **TOTAL** | **~10-15€/ano** |

### Para o developer (por projeto)

| Item | Custo |
|---|---|
| Tempo dev (~30-50h) | 30-50€/h × 30-50h = 900-2500€ |
| Subscrições | 0€ (free tiers cobrem) |

**Margem:** 95%+ se cobrares preço justo.

---

## 11. Estimativa de Esforço

Tempo para lançar **um novo projeto usando este template**:

| Fase | Tempo |
|---|---|
| Setup inicial (clone + npm + config) | 1-2h |
| Adaptação visual (cores, fontes, logo) | 2-3h |
| Conteúdo (textos, traduções PT/EN) | 4-8h |
| Adaptação secções para o vertical | 6-10h |
| Sistema de booking (se diferente) | 4-8h |
| Galeria + fotos do cliente | 2-3h |
| Mapa + POIs | 1-2h |
| Schema.org + meta tags | 1-2h |
| GDPR (adaptar texto) | 1h |
| Deploy + DNS + SEO | 2-3h |
| QA + bugfixes | 3-5h |
| **TOTAL** | **27-47h** |

vs **80-110h do zero** (50-60% de poupança).

---

## 12. Exemplo: Adaptar para Barbearia

### Setup
- Clone repo, renomear `barbershop-{nome}`
- `client.config.ts` — manter estrutura, mudar valores

### Secções do site

#### Manter (adaptar conteúdo)
- ✅ Navbar
- ✅ Hero (foto interior loja, tagline "Cortes clássicos com toque moderno", CTA "Marcar")
- ✅ Galeria (cortes + ambiente)
- ✅ Localização (Mapbox, 1 ponto: a loja)
- ✅ Reviews (mudar source para Google Business Profile)
- ✅ Footer com Instagram (mostrar trabalho)

#### Substituir
- ❌ Pool disponibilidade 3 T1s
- ❌ iCal sync Booking
- ❌ Multi-step form com flatpickr date range
- ❌ Multi-property logic

- ✅ **Secção Serviços** (nova) — corte, barba, combo, preços
- ✅ **Equipa** (se há mais que 1 barbeiro) — fotos + bio + especialidades
- ✅ **Booking widget Cal.com / Calendly** embed (em vez de form custom)
- ✅ **Horários loja** (em vez de check-in/check-out)

#### Mover
- Blog "Guia do Gerês" → "Estilos & Tendências" (opcional)

### Schema.org

```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Barbearia X",
  "image": ["..."],
  "logo": "...",
  "@id": "https://barbeariax.com/#salon",
  "url": "https://barbeariax.com",
  "telephone": "+351...",
  "address": {...},
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "priceRange": "€€",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corte clássico" }, "price": "12", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corte + Barba" }, "price": "20", "priceCurrency": "EUR" }
    ]
  }
}
```

### Booking — integrar Calendly/Cal.com

Em vez do form custom, embed inline:

```html
<!-- Cal.com inline embed -->
<div data-cal-link="barbeariax/corte" data-cal-namespace="" style="width:100%;height:600px;"></div>
<script src="https://app.cal.com/embed/embed.js" async></script>
```

Vantagens:
- Gestão de slots automática
- Confirmação por email
- Reagendamento self-service
- Sincroniza com Google Calendar do barbeiro

### Costs adicionais barbearia
- Cal.com Free plan: 1 calendar (suficiente para 1 barbeiro)
- Cal.com Pro: 12€/mês se múltiplos barbeiros

### Estimativa específica
- Adaptação total: **30-35h**
- vs partir do zero: **70-90h**

---

## Checklist Final por Projeto

Antes de marcar como entregue:

- [ ] `client.config.ts` 100% preenchido
- [ ] Logo nas dimensões corretas (square 512x512 + retangular)
- [ ] Fotos otimizadas (WebP recomendado)
- [ ] PT + EN completos (mesmo que cliente seja PT-only)
- [ ] Mapa Mapbox com token restringido por URL
- [ ] Form Web3Forms testado (submeter pedido teste)
- [ ] Política de Privacidade adaptada
- [ ] Google Search Console verificado + sitemap submetido
- [ ] Google Business Profile criado (passo cliente)
- [ ] Schema.org validado em search.google.com/test/rich-results
- [ ] Mobile testado em iPhone real (não emulador)
- [ ] Lighthouse Performance > 90 em mobile
- [ ] Security headers ativos (testar em securityheaders.com)
- [ ] DNS configurado (apex + www redirect)
- [ ] SSL ativo
- [ ] Backup do `client.config.ts` partilhado com cliente
- [ ] Documentação entregue (`APRESENTACAO_CLIENTE.md` adaptado)

---

## 13. Stack Tecnológico Avançado — Frontend & Backend

### Quando este template não chega

O template atual (Astro + Tailwind + Web3Forms) é **excelente para sites institucionais sem lógica de utilizador** (alojamentos, restaurantes, lojas simples).

**Limitações:**
- ❌ Sem login / contas de utilizador
- ❌ Sem base de dados própria (só leitura de config + APIs externas)
- ❌ Sem real-time (chat, notificações live)
- ❌ Sem state persistente (carrinhos de compras, favoritos)
- ❌ Booking complexo (slots dinâmicos, múltiplos profissionais, dependências)

Para esses casos, precisas de **mais stack**. Aqui está o catálogo completo organizado por nível de complexidade.

---

### 🎨 Frontend Frameworks (Quando Astro não chega)

Astro é ótimo quando 95% do site é estático. Quando precisas de mais interatividade no cliente:

| Framework | Quando usar | Performance | Curva | DX |
|---|---|---|---|---|
| **Astro** ✅ | Sites maioritariamente estáticos com ilhas de interatividade | 🏆 Top | Fácil | Excelente |
| **Next.js** | App-like com SSR + ISR, e-commerce, dashboards | 🥈 Excelente | Média | Excelente |
| **Nuxt 3** | Igual ao Next mas Vue (preferência pessoal) | 🥈 Excelente | Média | Excelente |
| **SvelteKit** | Performance crítica + tamanho pequeno | 🏆 Top | Fácil | Muito boa |
| **Remix** | Apps que precisam SSR puro, sem hydration overhead | 🥈 Excelente | Média | Boa |
| **SolidStart** | Performance React-like sem overhead | 🏆 Top | Difícil | Boa |

**Recomendação por tipo de projeto:**
- Landing pages, sites empresa, blogs → **Astro**
- E-commerce custom, dashboards SaaS → **Next.js** (App Router + Server Components)
- App de barbearia com booking dinâmico → **Astro com ilhas React** (mantém SEO + tem interatividade)

---

### 🎭 UI Component Libraries (visual polish)

Para subir o nível visual sem reinventar a roda:

| Lib | Stack | O que dá | Custo |
|---|---|---|---|
| **shadcn/ui** ⭐ | React + Tailwind + Radix | Componentes copy-paste, customizáveis, accessible | Grátis |
| **Tailwind UI** | Tailwind + React/Vue | Templates + componentes premium prontos | 299$ one-time |
| **Radix UI** | React | Primitivos accessible (dropdown, modal, etc.) | Grátis |
| **Headless UI** | React/Vue (by Tailwind) | Componentes sem estilo, total controlo | Grátis |
| **Park UI** | Multi-framework | shadcn-like mas para Vue/Solid também | Grátis |
| **DaisyUI** | Tailwind plugin | Components prontos via classes Tailwind | Grátis |
| **Aceternity UI** | React + Tailwind + Framer | Componentes com animações fancy | Grátis |
| **Material UI (MUI)** | React | Material Design completo | Grátis |
| **Chakra UI** | React | Sistema design completo, simples | Grátis |

**Recomendação:**
- Trabalho rápido e bonito → **shadcn/ui** (de facto, é o standard 2026)
- Animações fancy / "wow factor" → **Aceternity UI** + Framer Motion
- Quer comprar atalho premium → **Tailwind UI**

---

### ✨ Animações & Micro-interactions

Para o "aspeto premium":

| Lib | Para quê | Tamanho |
|---|---|---|
| **Framer Motion** | Animações React de alta qualidade | ~50kb |
| **GSAP** | Animações complexas, timelines | ~50kb |
| **Lottie** | Animações After Effects exportadas | ~30kb |
| **AutoAnimate** | Animação automática em mudanças de DOM | ~3kb |
| **View Transitions API** (browser nativo) | Transições entre páginas (Astro 4+) | 0kb |
| **Velocity.js** | Alternative leve ao GSAP | ~30kb |

**Recomendação por projeto:**
- Astro static → **View Transitions API** (já integrada)
- React app → **Framer Motion** + **AutoAnimate**
- "Marketing flashy" → **GSAP** + **Lottie** para hero animado

---

### 🗄️ Backend — Backend-as-a-Service (BaaS)

Quando precisas de base de dados + auth + storage sem gerir servidores:

| BaaS | Pricing | DB | Auth | Storage | Realtime | Funções | Veredicto |
|---|---|---|---|---|---|---|---|
| **Supabase** ⭐ | Free tier generoso | Postgres | ✅ | ✅ | ✅ | Edge Functions | **Melhor escolha geral** |
| **Firebase** | Free tier | Firestore (NoSQL) | ✅ | ✅ | ✅ | Cloud Functions | Maduro mas vendor lock-in |
| **Appwrite** | Self-hostable + cloud | Postgres-like | ✅ | ✅ | ✅ | Functions | Open-source alternative |
| **PocketBase** | Self-hostable | SQLite | ✅ | ✅ | ✅ | Hooks | Single binary, MUITO simples |
| **Convex** | Free tier | Custom | ✅ | ✅ | ✅ (forte) | Funções | Reactive-first |
| **Neon** | Free tier | Postgres only | ❌ | ❌ | ❌ | ❌ | Só DB, integra com outros |
| **Turso** | Free tier | SQLite distribuído | ❌ | ❌ | ❌ | ❌ | Só DB, edge-native |

**Recomendação:**
- **Supabase** para 90% dos casos (Postgres é familiar, auth-built-in, free tier real)
- **PocketBase** se quer self-host barato (~5€/mês VPS, single binary)
- **Convex** se a app é fortemente real-time

---

### 🔐 Auth — Soluções dedicadas

Se BaaS não chega (UI auth mais polida, social login completo, etc.):

| Service | Pricing | Vantagens | Quando usar |
|---|---|---|---|
| **Clerk** ⭐ | Free até 10k MAU | UI pronta, ótimo DX, multi-tenant | SaaS, apps profissionais |
| **Auth.js** (NextAuth) | Grátis | OSS, controlas tudo | Next.js apps |
| **Supabase Auth** | Incluído no Supabase | Já vem com tudo | Se já usa Supabase |
| **Lucia** | Grátis | OSS, low-level | Custom auth, controle total |
| **Better Auth** | Grátis | Novo, framework-agnostic | Projetos novos 2026 |
| **Auth0** | Free até 7k MAU | Enterprise-grade | Apps corporativas |

**Recomendação:**
- Projeto novo simples → **Clerk** (DX top, free tier real)
- Já está com Supabase → **Supabase Auth**
- Quer 0€ + controlo total → **Better Auth**

---

### 💾 Bases de Dados

| Database | Tipo | Quando | Hosting |
|---|---|---|---|
| **PostgreSQL** ⭐ | Relacional | 90% dos casos, robusto | Neon, Supabase, Railway |
| **SQLite** | Embedded | Sites pequenos, single-server | Turso (distribuído), local |
| **MongoDB** | Document | Dados aninhados, schemaless | MongoDB Atlas |
| **Redis** | Key-Value cache | Sessions, cache, rate limit | Upstash, Railway |
| **PlanetScale** | MySQL serverless | Apps com tráfego elevado | Planet Scale (paga) |

**Sempre que possível:** Postgres. É o standard pelos próximos 20 anos.

---

### 📧 Email Transacional

Quando o site envia emails (confirmações, alertas, magic links):

| Service | Free tier | Pricing | Notas |
|---|---|---|---|
| **Resend** ⭐ | 100/dia | 20$/mês depois | DX moderno, React Email templates |
| **Postmark** | 100/mês | 15$/mês | Top deliverability |
| **SendGrid** | 100/dia | Variável | Mais legacy mas robusto |
| **AWS SES** | 62k/mês | 0.10$ por 1k | Mais barato em escala |
| **Loops** | 1k/mês | Marketing focus | Para newsletters e flows |

**Recomendação:** **Resend** + biblioteca **React Email** para templates bonitos.

---

### 💳 Pagamentos (contexto Portugal)

| Service | Métodos PT | Setup | Pricing |
|---|---|---|---|
| **Stripe** ⭐ | Cartão, MB Way (via partner), SEPA | Fácil | 1.4% + 0.25€ |
| **Easypay** | MB Way, Multibanco, MB Pay, cartão | Médio | 1.2% + 0.10€ |
| **IfthenPay** | Multibanco, MB Way, cartão | Médio | 0.85€/transação fixa |
| **HiPay** | Multibanco, MB Way, cartão | Médio | Negociado |
| **Mollie** | Cartão, SEPA, iDEAL | Fácil | 1.8% + 0.25€ |

**Recomendação:**
- Cliente internacional → **Stripe** (DX top, ótima documentação)
- Cliente PT-only que precisa **Multibanco** → **IfthenPay** (preço fixo, sem percentagem)
- Tipping/donations simples → **Stripe**

---

### 📨 Notificações & Real-time

| Service | Para quê | Free tier |
|---|---|---|
| **Pusher** | Channels real-time | 200 conexões |
| **Ably** | Realtime + presence | 6M msg/mês |
| **Supabase Realtime** | Já incluído | Generous |
| **Liveblocks** | Colaboração tempo-real | Grátis até X |
| **OneSignal** | Push notifications | Grátis até 10k |
| **Twilio** | SMS, WhatsApp | Pay-as-you-go |

---

## 14. Sistema de Booking Integrado — Estudo de Caso Barbearia

Esta é a secção mais útil para o **próximo projeto da barbearia**.

### Opção A: SaaS pronto (recomendado para começar)

#### A1. Cal.com (open-source + cloud) ⭐ **RECOMENDADO**

```html
<!-- Embed inline na página de serviços -->
<div id="my-cal-inline"></div>
<script type="text/javascript">
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1]; api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "barbeiro-x", { origin: "https://cal.com" });
Cal.ns["barbeiro-x"]("inline", {
  elementOrSelector: "#my-cal-inline",
  config: { "layout": "month_view" },
  calLink: "barbearia-x/corte-classico",
});
</script>
```

**Vantagens:**
- ✅ **Grátis até 1 calendário/utilizador** (1 barbeiro)
- ✅ Self-hostable se quiseres controlo total
- ✅ Sincroniza com Google Calendar / Outlook
- ✅ Confirmação por email automática
- ✅ Reagendamento self-service
- ✅ Buffer time entre marcações
- ✅ Pagamento integrado (Stripe) para sinal
- ✅ Lembretes por email/SMS
- ✅ Múltiplos serviços (corte, barba, combo) com durações diferentes

**Desvantagens:**
- ❌ Cal.com Pro (10€/mês/utilizador) se precisares de >1 barbeiro
- ❌ Customização visual limitada (mas tema combina com o site)

**Quando usar:** Barbearias com 1-3 barbeiros, querem solução chave-na-mão.

#### A2. Booksy (vertical-specific PT) ⭐ **MAIS USADO EM PORTUGAL**

```html
<!-- Botão que abre modal Booksy -->
<a href="https://booksy.com/pt-pt/123456_barbearia-x" target="_blank"
   class="btn-primary">Marcar Agora</a>
```

**Vantagens:**
- ✅ App específica para barbearias/cabeleireiros
- ✅ **Marketplace** — clientes descobrem-te na app Booksy
- ✅ Gestão completa (clientes, marcações, pagamentos, marketing)
- ✅ App mobile para o barbeiro
- ✅ Suporta múltiplos barbeiros, custom slots
- ✅ Free tier disponível

**Desvantagens:**
- ❌ Marca Booksy aparece no fluxo (não é 100% white-label)
- ❌ Custo escala com features (~25€/mês plano básico pago)

**Quando usar:** Barbearias com 2+ profissionais que querem marketing extra via app Booksy.

#### A3. Calendly

Mais usado para consultoria. Para barbearia funciona mas é menos vertical-fit que Cal.com.

#### A4. Setmore / Square Appointments

Boas alternativas. Square é forte se a barbearia já usa **POS Square** para pagamentos.

#### Tabela comparativa

| | Cal.com | Booksy | Calendly | Setmore | Square Appointments |
|---|---|---|---|---|---|
| **Free tier** | 1 user, generoso | Grátis básico | 1 cal | 100 marcações/mês | Free básico |
| **Foco vertical** | Generalista | **Barbearia/beleza** | Consultoria | Generalista | Generalista + POS |
| **Marketplace** | ❌ | ✅ App | ❌ | ❌ | ❌ |
| **Múltiplos staff** | Pro (10€/mês cada) | ✅ no plano pago | Pro | ✅ | ✅ |
| **PT idioma** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **MB Way** | ❌ (via Stripe) | ❌ | ❌ | ❌ | ❌ |
| **Personalização visual** | 🟡 Média | 🔴 Pouca | 🔴 Pouca | 🟡 Média | 🟡 Média |
| **Self-host** | ✅ (open-source) | ❌ | ❌ | ❌ | ❌ |

**Recomendação para barbearia em PT:**
1. **MVP rápido + visibilidade extra:** Booksy
2. **Solução premium integrada com site:** Cal.com
3. **Cliente já tem POS Square:** Square Appointments

---

### Opção B: Sistema custom (mais flexibilidade, mais trabalho)

Para barbearias com **necessidades específicas** que SaaS não cobre (ex: precisa de inventário de produtos, gestão de stock, programa de fidelidade complexo, integração com software de contabilidade PT).

#### Stack recomendado para custom:

```
┌─────────────────────────────────────────┐
│  Frontend: Astro + React Islands         │
│  ├─ shadcn/ui components                 │
│  ├─ Schedule-X (calendar UI)             │
│  └─ Framer Motion (animações)            │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│  Backend: Supabase                       │
│  ├─ Postgres (clientes, marcações,       │
│  │              serviços, barbeiros)     │
│  ├─ Auth (cliente faz login para        │
│  │        ver marcações, histórico)      │
│  ├─ Edge Functions (lógica de slots)    │
│  └─ Realtime (notificar barbeiro)        │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│  Integrações externas:                   │
│  ├─ Resend (emails confirmação)          │
│  ├─ Twilio (SMS lembretes — opcional)   │
│  ├─ Stripe (sinal 10% na marcação)      │
│  └─ Google Calendar API (sync barbeiro) │
└─────────────────────────────────────────┘
```

#### Schema da BD (Postgres / Supabase)

```sql
-- Serviços oferecidos
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INT NOT NULL,  -- ex: 30, 45, 60
  price_eur DECIMAL(10,2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Barbeiros / Profissionais
CREATE TABLE barbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  active BOOLEAN DEFAULT true
);

-- Que serviços cada barbeiro pode fazer (many-to-many)
CREATE TABLE barber_services (
  barber_id UUID REFERENCES barbers(id),
  service_id UUID REFERENCES services(id),
  PRIMARY KEY (barber_id, service_id)
);

-- Horário semanal de cada barbeiro
CREATE TABLE barber_schedules (
  barber_id UUID REFERENCES barbers(id),
  day_of_week INT,  -- 0=Domingo, 6=Sábado
  start_time TIME,
  end_time TIME,
  PRIMARY KEY (barber_id, day_of_week)
);

-- Folgas / ausências pontuais
CREATE TABLE barber_time_off (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barber_id UUID REFERENCES barbers(id),
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  reason TEXT
);

-- Marcações
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id),
  client_name TEXT NOT NULL,    -- para guests sem conta
  client_email TEXT NOT NULL,
  client_phone TEXT,
  barber_id UUID REFERENCES barbers(id),
  service_id UUID REFERENCES services(id),
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'confirmed',  -- 'confirmed', 'cancelled', 'completed', 'no_show'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index para conflitos rápidos
CREATE INDEX idx_appointments_barber_time
ON appointments(barber_id, start_at, end_at)
WHERE status = 'confirmed';
```

#### Lógica de slots disponíveis (Edge Function)

```typescript
// supabase/functions/available-slots/index.ts
import { serve } from 'std/http/server.ts';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const { barberId, serviceId, date } = await req.json();

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // 1. Buscar duração do serviço
  const { data: service } = await supabase
    .from('services')
    .select('duration_minutes')
    .eq('id', serviceId)
    .single();

  // 2. Buscar horário do barbeiro nesse dia da semana
  const dayOfWeek = new Date(date).getDay();
  const { data: schedule } = await supabase
    .from('barber_schedules')
    .select('start_time, end_time')
    .eq('barber_id', barberId)
    .eq('day_of_week', dayOfWeek)
    .single();

  if (!schedule) return new Response(JSON.stringify({ slots: [] }));

  // 3. Buscar marcações existentes nesse dia
  const startOfDay = `${date}T00:00:00`;
  const endOfDay = `${date}T23:59:59`;
  const { data: existing } = await supabase
    .from('appointments')
    .select('start_at, end_at')
    .eq('barber_id', barberId)
    .eq('status', 'confirmed')
    .gte('start_at', startOfDay)
    .lte('start_at', endOfDay);

  // 4. Buscar folgas
  const { data: timeOff } = await supabase
    .from('barber_time_off')
    .select('start_at, end_at')
    .eq('barber_id', barberId)
    .lte('start_at', endOfDay)
    .gte('end_at', startOfDay);

  // 5. Gerar slots a cada 15min e filtrar os disponíveis
  const slots = generateSlots(
    schedule.start_time,
    schedule.end_time,
    service.duration_minutes,
    [...existing, ...timeOff],
  );

  return new Response(JSON.stringify({ slots }));
});

function generateSlots(start, end, duration, blocked) {
  const slots = [];
  const slotInterval = 15; // minutos
  let current = parseTime(start);
  const endTime = parseTime(end);

  while (current + duration <= endTime) {
    const slotEnd = current + duration;
    const conflicts = blocked.some(b =>
      !(slotEnd <= b.start || current >= b.end)
    );
    if (!conflicts) slots.push(formatTime(current));
    current += slotInterval;
  }
  return slots;
}
```

#### Calendar UI

| Lib | Pricing | Notas |
|---|---|---|
| **Schedule-X** ⭐ | Free | Moderno, TypeScript-first, ótimo design |
| **FullCalendar** | Free + plugins pagos | O mais maduro, muito completo |
| **TUI Calendar** | Free | NHN Cloud, look corporativo |
| **react-big-calendar** | Free | React, simples |
| **Day.js + custom** | Free | Tu fazes UI do zero, mais flexível |

**Recomendação:** **Schedule-X** se queres calendar lib. Custom UI se a barbearia quer um look único.

---

### Padrão: Cal.com Webhook → Supabase sync

O webhook recebe eventos do Cal.com e grava na tabela `appointments`. Usar sempre `SUPABASE_SERVICE_ROLE_KEY` (não a anon key) para o webhook poder escrever sem restrições de RLS:

```typescript
// src/pages/api/webhook-cal.ts
import { createClient } from '@supabase/supabase-js';

// Service role bypassa RLS — só usar server-side, nunca expor ao cliente
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

if (triggerEvent === 'BOOKING_CREATED') {
  await supabase.from('appointments').upsert({
    cal_booking_uid: payload.uid,   // chave única para evitar duplicados
    client_name:     clientName,
    client_email:    clientEmail,
    service_id:      payload.eventType.slug,
    barber_id:       payload.organizer.email,
    start_at:        payload.startTime,
    end_at:          payload.endTime,
    status:          'confirmed',
  }, { onConflict: 'cal_booking_uid' });

} else if (triggerEvent === 'BOOKING_CANCELLED') {
  await supabase.from('appointments')
    .update({ status: 'cancelled' })
    .eq('cal_booking_uid', payload.uid);

} else if (triggerEvent === 'BOOKING_RESCHEDULED') {
  await supabase.from('appointments')
    .update({ start_at: payload.startTime, end_at: payload.endTime })
    .eq('cal_booking_uid', payload.uid);
}
```

**Variáveis de ambiente necessárias no Vercel:**
```
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...   ← frontend
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...        ← webhook server-side apenas
CAL_WEBHOOK_SECRET=...                         ← string aleatória definida por ti
```

**Secret do webhook Cal.com:** o Cal.com **não gera** o secret — defines tu. Usa qualquer string aleatória (ex: `openssl rand -hex 32` ou PowerShell: `-join ((1..32) | ForEach-Object { '{0:x}' -f (Get-Random -Max 16) })`). Cola no campo Secret do Cal.com e adiciona como env var no Vercel.

### Estimativa de esforço — Custom Booking System Barbershop

| Bloco | Horas |
|---|---|
| Setup Supabase + schema BD | 4-6h |
| Auth (login cliente + barbeiro) | 4-6h |
| Página de booking (calendar + slots + serviços + barbeiros) | 12-18h |
| Dashboard barbeiro (próximas marcações, histórico, gerir slots) | 10-15h |
| Email/SMS de confirmação | 3-5h |
| Pagamento de sinal (Stripe) | 5-8h |
| Painel admin (gestão serviços, preços, barbeiros) | 8-12h |
| Testes + polish + bugfixes | 8-12h |
| **TOTAL custom** | **54-82h** |

**vs Cal.com embed:** 4-8h. Considera bem se vale a pena custom.

---

### Decisão prática para barbearia

```
                Cliente quer só receber marcações?
                            │
                ┌───────────┴───────────┐
                │ Sim                   │ Quer dashboard +
                │                       │ relatórios + multi-staff?
                ▼                       │
        Cal.com ou Booksy               ▼
        (4-8h dev)                Sistema custom Supabase
                                  (54-82h dev)
                                  + integrações
```

**Para o primeiro projeto barbearia da carreira:** começa com **Cal.com embed**. Entrega rápido, cliente vê resultado, e podes sempre evoluir para custom mais tarde se justificar.

---

## 15. Briefing Inicial — Questionário Cliente

**Crítico:** nunca começar a codar sem isto preenchido. Poupa 10h+ de retrabalho.

### Identidade & Negócio
- [ ] Nome oficial do negócio (legal + comercial)
- [ ] Tagline / slogan (uma frase)
- [ ] História curta (3-5 linhas) — para o "Sobre"
- [ ] Personas dos clientes (idade, género, motivação)
- [ ] Concorrentes principais (3-5 URLs) → para análise
- [ ] Sites de referência que gosta (3-5 URLs)
- [ ] Tipo de tom: formal? casual? sofisticado? jovem?

### Conteúdo
- [ ] Logo em vetor (`.svg` ou `.ai`) — se só PNG, em alta resolução (>1024px)
- [ ] Logo quadrado (para favicon e GBP) — 512×512 min
- [ ] Paleta de cores definida (se não há, posso propor com base no logo)
- [ ] Fontes preferidas (ou liberdade para sugerir)
- [ ] Fotos profissionais? Quantas? (se <10, recomendar sessão fotográfica)
- [ ] Vídeo do espaço? (5-30s para Hero)
- [ ] Textos prontos OU briefing para copywriter

### Funcionalidade
- [ ] Multilingue? Quais idiomas? (PT default + EN é o mínimo recomendado)
- [ ] Sistema de reservas/booking? Que tipo?
- [ ] Loja online? (Se sim, quantos produtos?)
- [ ] Blog? Quem vai escrever os posts?
- [ ] Newsletter? (envia já emails marketing?)
- [ ] Login de utilizador?
- [ ] Pagamentos online?
- [ ] Integração com software existente (POS, CRM, etc.)?

### Marca & Redes Sociais
- [ ] Instagram (handle + acesso)
- [ ] Facebook (página + acesso)
- [ ] TikTok (handle)
- [ ] Google Business Profile (já tem? acesso?)
- [ ] WhatsApp Business (número)
- [ ] Outros (LinkedIn, YouTube, etc.)

### Domínio & Email
- [ ] Já tem domínio? (URL exata)
- [ ] Se sim, em que registrar? (precisa de acesso para configurar DNS)
- [ ] Se não, sugestões: `.com`, `.pt`, `.com.pt`?
- [ ] Email do negócio: usa Gmail/Outlook próprio ou quer email no domínio?

### Reviews & Reputação
- [ ] Tem reviews em alguma plataforma? (Google, Booking, TripAdvisor, etc.)
- [ ] Quantos clientes/transações por mês? (para estimar volume do form)

### Legal & Compliance
- [ ] Política de privacidade existente? (ou preciso de criar)
- [ ] Termos e condições?
- [ ] NIF (necessário para Schema.org)
- [ ] Morada fiscal completa

### Comercial
- [ ] Orçamento previsto: __€
- [ ] Prazo desejado: ___ semanas
- [ ] Manutenção futura: avulso ou plano?
- [ ] Responsável pelo conteúdo após entrega: cliente ou tu?

### Acessos a recolher
- [ ] Conta Google (para Search Console + GBP)
- [ ] Conta Vercel (para deploy)
- [ ] Conta do registrar do domínio
- [ ] Conta da plataforma de booking (se aplicável)

**Modelo de briefing em PDF:** considera criar uma versão preenchível e enviar via email logo no primeiro contacto.

---

## 16. Workflow de Desenvolvimento

### Git branching (mesmo para projetos solo)

```
main         ← produção, deploy automático
  ↑
develop      ← integração, deploy preview
  ↑
feature/*    ← features individuais
hotfix/*     ← bugfixes urgentes em produção
```

**Para projetos pequenos:** podes trabalhar direto em `main` (como fizemos no Gerês). Para projetos médios+, usar branching ajuda.

### Convenção de commits (Conventional Commits)

```
feat: nova funcionalidade
fix: bugfix
docs: documentação
style: formatação (sem mudança de código)
refactor: refactor sem mudança funcional
perf: melhoria de performance
test: adicionar/corrigir testes
chore: tarefas de manutenção (deps, build, etc.)
```

Exemplos:
- `feat: adicionar sistema de pool 3 propriedades iCal`
- `fix: turnover days no calendário do form`
- `docs: atualizar APRESENTACAO_CLIENTE`

### Workflow recomendado

```bash
# Antes de começar feature
git checkout main && git pull
git checkout -b feature/booking-system

# Durante desenvolvimento (commits pequenos e frequentes)
git add -p   # interactive staging
git commit -m "feat: ..."

# Quando feature pronta
git push -u origin feature/booking-system
# → PR no GitHub → merge → main

# Hotfix em produção
git checkout -b hotfix/calendar-locale main
# fix
git push && PR direct para main
```

### Code conventions (para te lembrares depois)

- **Componentes Astro:** PascalCase (`HeroBanner.astro`)
- **Utility functions:** camelCase (`formatPrice.ts`)
- **Config files:** kebab-case (`tailwind.config.mjs`)
- **Comentários:** em português (alinhado com cliente PT)
- **Imports ordenados:** Astro → componentes → utils → tipos
- **Magic numbers:** sempre extrair para constantes nomeadas

### Pre-commit hooks (Husky)

Opcional mas útil para projetos maiores:
```bash
npm install --save-dev husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

`package.json`:
```json
"lint-staged": {
  "*.{ts,astro}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md}": ["prettier --write"]
}
```

---

## 17. Conversion Optimization Patterns

Padrões que **provadamente aumentam conversões** em sites de pequenos negócios:

### Acima da dobra (Hero)
- ✅ **CTA único e óbvio** (não vários)
- ✅ Promessa concreta no headline (não vago tipo "qualidade")
- ✅ **Prova social** logo visível (rating, número clientes, "como visto em")
- ✅ Vídeo loop background > foto estática (engagement +30%)
- ❌ Carousel de slides com 5 mensagens (utilizadores só veem o primeiro)

### Formulário
- ✅ **Multi-step com progress bar** (vs form longo de uma página) → +35% completion
- ✅ Pedir o **mínimo de campos** (cada campo extra = -10% conversão)
- ✅ Smart defaults nos campos
- ✅ Validação inline (não só on submit)
- ✅ **Resposta esperada explícita** ("Respondemos em 12h")
- ✅ Disclaimer GDPR discreto, não bloqueante

### Páginas de produto/serviço
- ✅ **Preços visíveis** (esconder preço afasta clientes sérios)
- ✅ **FAQs** (objeções comuns respondidas → -50% emails)
- ✅ **Comparação** se múltiplas opções (T1 vs T2, corte vs combo)
- ✅ Reviews relacionadas ao serviço específico

### Reviews & social proof
- ✅ **Foto + nome real** (não anónimo)
- ✅ Data recente visível
- ✅ Variedade de nacionalidades/perfis
- ✅ Resposta do dono às reviews (mostra cuidado)
- ✅ Score em destaque (estilo Booking 9.3/10)

### Velocidade
- ✅ **Site carrega em <2.5s LCP** (Astro static = 1s)
- ✅ Imagens lazy-loaded + WebP/AVIF
- ✅ Fontes self-hosted (não Google Fonts CDN)

### Mobile
- ✅ **Tap targets 44×44px mínimo**
- ✅ Sticky CTA no fundo do ecrã em mobile
- ✅ Click-to-call e WhatsApp como botões dedicados

### Trust signals
- ✅ HTTPS visível (cadeado)
- ✅ **Política de privacidade** linkada no Footer
- ✅ Morada física real (não só email)
- ✅ Telefone clicável
- ✅ Resposta automática "Recebemos o seu pedido" pós-submit

### Anti-patterns a evitar
- ❌ Popup de newsletter à entrada (78% das pessoas saem)
- ❌ Chatbot a interromper logo
- ❌ Música automática
- ❌ "Subscreva para 10% desconto" antes de mostrar valor
- ❌ Cookie banner gigante (faz nosso site GDPR-without-cookies brilhar)

---

## 18. CMS — Quando o Cliente Quer Editar Conteúdo

Cenário: cliente quer editar textos/fotos sem te chamar.

### Opções por nível de complexidade

#### 🟢 Nível 1: Cliente edita JSON/Markdown via GitHub
- **Custo:** 0€
- **Setup:** Adicionar cliente como collaborator do repo
- **Limitações:** precisa de saber GitHub básico
- **Quando usar:** cliente tech-savvy, edições raras

#### 🟡 Nível 2: Decap CMS (antigo Netlify CMS)
- **Custo:** 0€
- **Setup:** ~3h para integrar
- **UI:** Admin panel custom no /admin/
- **Backend:** Edita ficheiros Git automaticamente
- **Limitações:** UX um pouco rústico
- **Quando usar:** cliente quer editar mas sem complicar

```yaml
# public/admin/config.yml
backend:
  name: github
  repo: andremacaes10/projeto
  branch: main

collections:
  - name: "posts"
    label: "Blog Posts"
    folder: "src/content/blog"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }
```

#### 🟢 Nível 3: Tina CMS ⭐ **RECOMENDADO**
- **Custo:** Free tier generoso (até 2 utilizadores)
- **Setup:** ~4h
- **UI:** **Edita inline no próprio site** (visual editor)
- **Backend:** Git-based (mesma vantagem do Decap)
- **Limitações:** plano pago para mais users
- **Quando usar:** cliente quer editar de forma visual e fácil

#### 🔵 Nível 4: Sanity / Storyblok (headless CMS)
- **Custo:** Sanity Free (~3 users) / Storyblok Free
- **Setup:** ~8-12h (estruturar schemas)
- **UI:** Dashboard completo, agendamento de posts, multi-language
- **Backend:** API-driven, separado do Git
- **Limitações:** mais um sistema para gerir
- **Quando usar:** sites com muito conteúdo dinâmico, blogs ativos

#### 🔴 Nível 5: Strapi / Directus (self-hosted)
- **Custo:** 0€ (mas precisa de hosting ~5€/mês)
- **Setup:** ~16-24h
- **UI:** Dashboard tipo WordPress mas moderno
- **Quando usar:** cliente quer "WordPress feeling" sem ser WordPress

### Recomendação por vertical

| Negócio | CMS recomendado | Porquê |
|---|---|---|
| Alojamento | Nenhum / Tina | Conteúdo muda raramente |
| Restaurante | **Tina** | Ementa muda semanalmente |
| Barbearia | Nenhum / Decap | Serviços fixos, blog opcional |
| E-commerce | **Sanity** ou Shopify | Catálogo dinâmico |
| Clínica | Decap | Equipa pode mudar |
| Blog/Media | **Sanity** ou **Storyblok** | Volume alto de posts |

---

## 19. Performance & Acessibilidade — Checklist

### Performance (Lighthouse > 95)

#### Imagens
- [ ] WebP ou AVIF (não JPEG/PNG)
- [ ] `<picture>` com fallback para browsers antigos
- [ ] `loading="lazy"` em tudo abaixo da dobra
- [ ] `fetchpriority="high"` no Hero
- [ ] Dimensões `width`/`height` explícitas (evita layout shift)
- [ ] Lazy loading via Intersection Observer para gallery
- [ ] Responsive images com `srcset`

#### CSS
- [ ] Critical CSS inline (Astro faz por default)
- [ ] CSS minificado em produção
- [ ] Tailwind purge (só usa classes utilizadas)
- [ ] Sem `@import` em runtime

#### JavaScript
- [ ] Astro Islands: só hidrata componentes interativos
- [ ] Defer/async em scripts externos
- [ ] Sem libraries inúteis
- [ ] Code splitting por rota (default no Astro)

#### Fontes
- [ ] Self-hosted via @fontsource
- [ ] `font-display: swap`
- [ ] Preload da fonte do Hero
- [ ] WOFF2 (não TTF/OTF)

#### Outros
- [ ] HTTPS sempre
- [ ] HTTP/2 ou HTTP/3
- [ ] Cache headers agressivos (1 ano para assets)
- [ ] Brotli compression (Vercel default)
- [ ] CDN global (Vercel Edge)

### Acessibilidade (WCAG 2.1 AA)

#### Semântica
- [ ] HTML5 semântico (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- [ ] Heading hierarchy correta (h1 → h2 → h3)
- [ ] Um único `<h1>` por página
- [ ] `<button>` para ações, `<a>` para navegação

#### Imagens & Media
- [ ] Alt text descritivo em todas as imagens (não "foto1.jpg")
- [ ] Alt vazio (`alt=""`) em imagens decorativas
- [ ] Vídeos com controlos OU autoplay+muted+loop
- [ ] Sem flashes rápidos (epilepsia)

#### Cores & contraste
- [ ] Texto: contraste mínimo 4.5:1 (AA)
- [ ] Texto grande: contraste mínimo 3:1
- [ ] Não usar só cor para indicar informação
- [ ] Modo dark se aplicável

#### Teclado & focus
- [ ] Todos os interativos acessíveis por teclado
- [ ] Focus ring visível (`:focus-visible`)
- [ ] Skip-to-content link no topo
- [ ] Ordem de tabulação lógica

#### Formulários
- [ ] `<label>` em todos os campos
- [ ] Erros associados via `aria-describedby`
- [ ] Validação inline + on submit
- [ ] Mensagens de erro claras

#### Screen readers
- [ ] `aria-label` em ícones sem texto
- [ ] `role` apropriado em widgets custom
- [ ] `aria-live` em conteúdo que muda dinamicamente
- [ ] `aria-hidden="true"` em decorações

### Ferramentas de teste
- **Lighthouse** (built-in Chrome DevTools)
- **axe DevTools** (extensão Chrome)
- **WAVE** (https://wave.webaim.org/)
- **NVDA** (screen reader Windows, grátis)
- **Polypane** (browser para testing multi-device, paga)

---

## 20. SEO Playbook Avançado

### Pesquisa de keywords (antes de escrever conteúdo)

#### Ferramentas gratuitas
- **Google Trends** — sazonalidade
- **Google Search Console** — queries que já trazem visitas
- **Answer the Public** — perguntas que pessoas fazem
- **Google Suggest** — autocomplete na barra de pesquisa
- **People Also Ask** — questões relacionadas no Google

#### Ferramentas pagas (vale a pena para projetos grandes)
- **Ahrefs** ($99-449/mês)
- **Semrush** ($129-499/mês)
- **Ubersuggest** ($29/mês)
- **Mangools** ($29-79/mês) — melhor custo-benefício

### Tipos de páginas por intenção de pesquisa

| Tipo de query | Intenção | Tipo de página ideal |
|---|---|---|
| "alojamento gerês" | Comercial | Homepage / Service page |
| "como ir cascata arado" | Informacional | Blog post |
| "gerescascatasresidence" | Navegacional | Homepage |
| "comprar X" | Transacional | Product page |

### On-page SEO checklist

- [ ] `<title>` único e descritivo (50-60 chars)
- [ ] Meta description (140-160 chars, com CTA)
- [ ] H1 único contém keyword principal
- [ ] URL slug curto e com keyword (`/blog/cascatas-geres`)
- [ ] Internal links para 2-3 páginas relacionadas
- [ ] Alt text com keyword (quando faz sentido natural)
- [ ] Schema.org adequado ao tipo de conteúdo
- [ ] Open Graph + Twitter Cards
- [ ] Mobile-friendly (60% das pesquisas)
- [ ] Velocidade < 2.5s

### Local SEO (CRÍTICO para negócios físicos)

- [ ] **Google Business Profile** 100% preenchido
- [ ] **NAP consistency** (Nome, Address, Phone) — exatamente igual em site, GBP, redes
- [ ] Schema.org `LocalBusiness` com address completo
- [ ] **Reviews Google** — pedir ativamente
- [ ] Posts no GBP semanais
- [ ] Fotos no GBP (mínimo 10)
- [ ] Citations em diretórios locais (PaiPai.pt, etc.)

### Content strategy

- **Pilar 1: páginas comerciais** (5-10 páginas)
  - Homepage, Serviços, Sobre, Contacto, FAQ
- **Pilar 2: blog informacional** (1 post/mês, +/-)
  - Resolve questões reais → traz tráfego orgânico
- **Pilar 3: páginas de localização** (se múltiplos sítios)
  - "Barbearia X em Braga", "Barbearia X em Guimarães"

### Backlinks (link building) — opcional, mas amplifica

- Diretórios locais (PaiPai, eGuia, Yelp)
- Parcerias com sites turismo (para alojamento)
- Bloggers locais (oferecer estadia gratuita por review)
- Press releases para abertura

### Medições importantes (Search Console)

- **Impressões** semanal (deve subir)
- **Cliques** semanal (deve subir)
- **CTR médio** > 3% (mais = título atrativo)
- **Posição média** < 20 (Top 2 páginas)
- **Páginas indexadas** = todas as que queres

---

## 21. Monitoring & Error Tracking (Produção)

### Para sites pequenos
Search Console + Vercel Analytics (free) é suficiente.

### Para sites com tráfego real

#### Error Tracking
- **Sentry** ⭐ — free tier 5k errors/mês
  - Captura erros JS automaticamente
  - Stack traces, breadcrumbs, replay
  - Integra com Slack/email
- **Bugsnag** — alternativa, free tier
- **Highlight.io** — session replay incluído

#### Web Analytics (privacy-first)
- **Plausible** — 9$/mês, cookie-less, lightweight
- **Umami** — self-host grátis ou cloud
- **Fathom** — 14$/mês
- **GoatCounter** — grátis, open-source, ultra-leve

#### Uptime monitoring
- **UptimeRobot** — free tier 50 monitors
- **Better Stack** — free tier 10 monitors + status page
- **Cronitor** — cron + uptime

#### Performance monitoring (RUM)
- **Vercel Analytics** — free tier no Vercel
- **SpeedCurve** — paga, profissional
- **Calibre** — paga, profissional

### Setup Sentry no Astro (5 min)

```bash
npm install @sentry/astro
```

```js
// astro.config.mjs
import sentry from '@sentry/astro';
export default defineConfig({
  integrations: [
    sentry({
      dsn: 'YOUR_DSN',
      sourceMapsUploadOptions: { project: 'projeto-x', authToken: '...' },
    }),
  ],
});
```

---

## 22. PWA & Features Avançadas

### Tornar o site instalável (Progressive Web App)

#### Manifest
```json
// public/manifest.json
{
  "name": "Gerês Cascatas Residence",
  "short_name": "GCR",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FDFAF5",
  "theme_color": "#2C4A1E",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

```html
<!-- Layout.astro -->
<link rel="manifest" href="/manifest.json" />
```

#### Service Worker (cache offline)
Para Astro:
```bash
npm install @vite-pwa/astro
```

```js
// astro.config.mjs
import AstroPWA from '@vite-pwa/astro';
export default defineConfig({
  integrations: [AstroPWA()],
});
```

### Web Share API (partilhar para redes)
```js
async function share() {
  await navigator.share({
    title: 'Gerês Cascatas Residence',
    text: 'Apartamentos T1 no Parque Nacional',
    url: window.location.href,
  });
}
```

### View Transitions (animações entre páginas)
```astro
---
// Layout.astro
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

### Speculation Rules (pre-render proativo)
```html
<script type="speculationrules">
{
  "prerender": [
    { "where": { "href_matches": "/*" }, "eagerness": "moderate" }
  ]
}
</script>
```

Páginas carregam **instantaneamente** ao clicar links internos.

---

## 23. Email Marketing & Retention

### Quando vale a pena

- Cliente tem >100 visitas/mês
- Cliente repete (alojamento, barbearia, restaurante) → newsletter mensal funciona
- Cliente quer construir audiência própria (não depender só de Google/Booking)

### Plataformas

| Service | Free tier | Pricing | Notas |
|---|---|---|---|
| **Resend** + **React Email** | 100/dia | 20$/mês depois | Para transactional (confirmações) |
| **Loops** | 1k contactos | 49$/mês | Marketing automation |
| **Beehiiv** | Grátis até 2.5k | $39/mês | Newsletter focused |
| **Buttondown** | Grátis até 100 subs | $9/mês | Simples, ético |
| **EmailOctopus** | Free 2.5k subs | $9/mês | Bom custo-benefício |
| **Mailchimp** | 500 contactos | $13/mês | Mais conhecido |

### Estratégia para alojamento local

**Email 1 — Confirmação** (transactional via Resend)
```
Assunto: Pedido recebido — Gerês Cascatas Residence
Body: Resumo do pedido + "Respondemos em 12h"
```

**Email 2 — Após estadia** (1 semana depois)
```
Assunto: Como foi a sua estadia?
Body: Pedir review Google + Booking + 10% desconto próxima estadia
```

**Email 3 — Newsletter mensal** (opcional)
```
Assunto: Outono no Gerês — 3 trilhos para descobrir
Body: 1 post blog destaque + disponibilidade próximos meses
```

### Estratégia para barbearia

**Email 1 — Confirmação da marcação** (via Cal.com automático)

**Email 2 — Lembrete 24h antes** (via Cal.com)

**Email 3 — Pós-corte** (3 dias depois)
```
Assunto: A próxima já está marcada?
Body: Link reservar próximo corte + tip de manutenção
```

**Email 4 — Reativação (45 dias sem corte)**
```
Assunto: Está na hora 💈
Body: Lembrete amigável + slots disponíveis esta semana
```

---

## 24. Comunicação com Cliente — Templates

### Email inicial (após primeiro contacto)

```
Assunto: Proposta — Site para [Nome do Negócio]

Olá [Nome],

Obrigado pelo interesse. Anexo o briefing inicial — assim que estiver
preenchido, posso preparar uma proposta concreta com orçamento e prazo.

Para te dar uma referência rápida:
- Sites típicos para o teu tipo de negócio: 1.500€ a 4.000€
- Prazo médio: 4-8 semanas
- Inclui: design, código, SEO, deploy, 1 mês bugfixes
- Não inclui: copywriter, fotografia profissional, manutenção mensal

Há alguma referência de site (concorrente ou outro) que gostes?

Cumprimentos,
[Tu]
```

### Mensagem WhatsApp durante projeto

```
"Olá [Nome], última atualização da semana:
- ✅ Hero pronto (vê aqui: link preview)
- ✅ Galeria com as 30 fotos
- 🔄 Estou a trabalhar no formulário de reservas
- ⏳ Próxima semana: integrar mapa

Algum feedback até aqui?"
```

### Email de entrega

```
Assunto: 🎉 Site entregue — [Nome do Negócio]

Olá [Nome],

O site está online em [URL].

📋 Documentação que te enviei:
- Resumo do que tem (Notion)
- Como gerir [iCals / Cal.com / etc.]
- Como mudar o conteúdo se precisares (CMS)

🛠️ Suporte:
- 30 dias de bugfixes gratuitos a contar de hoje
- Para alterações futuras: 30€/h ou pack 200€/ano

📊 Próximos passos para ti:
1. Partilha no Instagram/TikTok
2. Adiciona o link na bio
3. Pede 10 reviews Google nos primeiros 30 dias

Qualquer dúvida, estou aqui.

Cumprimentos,
[Tu]
```

### Lidar com pedidos out-of-scope

```
"Esse pedido sai do scope inicial. Posso fazer:
- Solução A: ~3h, 90€
- Solução B (mais completa): ~8h, 240€
Qual preferes?"
```

**Regra de ouro:** sempre dar 2 opções e nunca fazer nada que não esteja escrito.

---

## 25. Propostas e Contratos

### Estrutura de proposta (1 página A4)

1. **Resumo executivo** (3 linhas: o que, prazo, preço)
2. **Funcionalidades incluídas** (checklist)
3. **Funcionalidades NÃO incluídas** (igualmente importante)
4. **Cronograma** (fases + datas)
5. **Investimento** (preço + condições pagamento)
6. **Garantia** (30 dias bugfixes)
7. **Próximos passos** (se aceitar)

### Modelos de pricing

#### Fixed-price (recomendado para inicial)
- Conheces bem o scope
- Cliente prefere certeza
- **Risco:** se subestimares o tempo, perdes

#### Hourly
- Para alterações pós-entrega
- Para projetos com scope incerto
- **Risco:** cliente vê o relógio a correr

#### Retainer mensal
- Para manutenção pós-entrega
- 4-10h/mês a preço fixo
- **Vantagem:** receita previsível

### Termos contratuais essenciais

- **Direitos autorais:** código transferido após pagamento integral
- **Conteúdo:** cliente responsável pela legalidade das fotos/textos
- **Prazos:** dependentes de cliente entregar materiais a tempo
- **Bugfixes:** 30 dias após entrega, gratuitos
- **Mudanças out-of-scope:** orçamentadas à parte
- **Cancelamento:** % do trabalho feito + 20% taxa
- **Sigilo:** mútuo

### Forma de pagamento

- **50% upfront / 50% na entrega** (mais comum)
- Para projetos >2000€: **40% / 30% / 30%** (fases)
- Para projetos >5000€: **6 parcelas mensais**
- **NUNCA começar trabalho sem 1ª parcela**

### Ferramentas
- **Faturação:** InvoiceXpress (PT, ~10€/mês)
- **Contratos:** Docusign / HelloSign (free tier)
- **Tracking horas:** Toggl / Harvest (free tier)

---

## 26. Snippets Reutilizáveis

### Smooth scroll com offset do navbar

```css
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
```

### Lazy load YouTube embed (poupa 1MB+)

```html
<lite-youtube videoid="XYZ" style="background-image: url(...)"></lite-youtube>
<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube"></script>
```

### Detectar inatividade (popup de saída)

```js
let timer;
document.addEventListener('mouseleave', () => {
  if (sessionStorage.getItem('popupShown')) return;
  showPopup();
  sessionStorage.setItem('popupShown', '1');
});
```

### Skeleton loader CSS-only

```css
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { to { background-position: -200% 0; } }
```

### Copy to clipboard

```js
async function copy(text) {
  await navigator.clipboard.writeText(text);
  showToast('Copiado!');
}
```

### Detectar país do visitante (via IP)
```js
const country = await fetch('https://api.country.is')
  .then(r => r.json()).then(d => d.country);
// Mostrar conteúdo personalizado por país
```

### Formatador de telefone PT
```js
function formatPhonePT(num) {
  return num.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}
```

### WhatsApp link com mensagem pré-preenchida
```html
<a href="https://wa.me/351963478677?text=Olá%2C%20gostava%20de%20saber%20mais">
  WhatsApp
</a>
```

### Click-to-call em mobile
```html
<a href="tel:+351963478677" class="md:pointer-events-none">+351 963 478 677</a>
```

---

## 27. Manutenção Pós-Entrega

### Acordo de manutenção (sugestão)

**Plano Essencial — 30€/mês**
- Updates de segurança
- Backup mensal
- Monitorização uptime
- 30min/mês de alterações pontuais

**Plano Standard — 80€/mês**
- Tudo do Essencial
- 2h/mês de alterações
- 1 post blog/mês (se aplicável)
- Relatório mensal Search Console

**Plano Premium — 200€/mês**
- Tudo do Standard
- 6h/mês de alterações
- Atualizações de design pontuais
- Gestão Google Business Profile
- Otimização SEO contínua

**Avulso:** 35€/h, mínimo 1h

### Tarefas mensais a recordar ao cliente

- [ ] Verificar Search Console (erros, queries novas)
- [ ] Atualizar fotos no Google Business Profile
- [ ] Responder a reviews novas
- [ ] Verificar uptime do site
- [ ] Backup do `client.config.ts`

### Tarefas trimestrais

- [ ] Auditoria Lighthouse (performance + a11y + SEO)
- [ ] Atualizar dependências (`npm outdated`)
- [ ] Verificar SSL não expirou (Vercel renova auto)
- [ ] Refresh content estático (datas, preços, equipa)

### Tarefas anuais

- [ ] Renovar domínio (lembrete antes de expirar)
- [ ] Renovar Mapbox token (se rotação configurada)
- [ ] Revisão completa de conteúdo
- [ ] Considerar refresh de design (a cada 2-3 anos)

---

## 28. Lições Aprendidas — Projeto Gerês

Pontos chave do projeto que vale a pena lembrar para o próximo:

### O que correu bem ✅

1. **client.config.ts como single source of truth** — torna adaptação a outro cliente trivial
2. **Bilingue desde o início** — mais fácil que adicionar depois
3. **Astro static** — performance incomparável
4. **Mapbox custom** — diferencia muito do Google Maps embed genérico
5. **Multi-step form** — converte muito melhor que form longo
6. **Pool de disponibilidade** — feature técnica sofisticada que pode-se vender bem
7. **Documentação extensiva** — facilita handover e venda

### O que correu menos bem ⚠️

1. **Coordenadas Mapbox inventadas** — fazer audit logo no início (3h vs descobrir tarde)
2. **Vercel project na conta do cliente cedo demais** — Hobby plan bloqueia deploy hooks de outros autores. Manter na tua conta até pagamento
3. **GitHub Actions cron unreliable** — substituir por cron-job.org desde o início
4. **Content-visibility CSS bug iOS** — testar SEMPRE em iPhone real, não emulador
5. **flatpickr locale undefined** — usar `'default'` em vez de `undefined` para inglês
6. **Vercel deploy hook + projeto cliente Hobby = falha** — workaround: manter projeto no developer, transferir após pagamento

### Decisões que valeu a pena defender

1. **Sem cookies** — diferenciador GDPR
2. **Sem Google Analytics** — performance + privacidade
3. **CTAs "Reservar" → form direto** (vs Informações) — UX mais simples
4. **`gerescascatasresidence.com` sem www** — mais moderno, mais curto
5. **2h cron iCal** — equilíbrio entre velocidade e quota

### Tempo real gasto vs estimado

| Fase | Estimado | Real |
|---|---|---|
| Setup + arquitetura | 5h | 7h |
| UI sections | 25h | 35h |
| Sistema reservas + iCal | 15h | 22h |
| Mapbox | 6h | 10h (audit POI) |
| Blog + i18n | 8h | 8h |
| GDPR + Schema.org | 5h | 8h |
| Mobile fixes + bugs | 5h | 15h |
| Deploy + cron + handover | 5h | 12h |
| Docs | 3h | 8h |
| **TOTAL** | **77h** | **125h** |

**Lição:** estimar +60% sobre o "ideal" para considerar bugs imprevistos e iterações com cliente.

---

## 29. Lições Aprendidas — Template Barbearia Nobre (Junho 2026)

### O que foi construído

Template de barbearia com back-end real:
- **Cal.com** embed para booking de slots (single barber, free tier)
- **Webhook** Cal.com → Supabase (sync automático de marcações)
- **Supabase Auth** com dashboard de cliente (ver/histórico marcações)
- **Twilio WhatsApp** para notificações ao admin
- **Google Maps embed** em vez de Mapbox
- Middleware Astro para auth redirect server-side
- Páginas auth completas: login, registo, reset-password, update-password

### Arquitectura back-end (diagrama)

```
Cliente faz marcação no Cal.com
          ↓
Cal.com dispara webhook (HMAC assinado)
          ↓
POST /api/webhook-cal (Vercel Serverless Function)
    ├─ Verifica assinatura HMAC
    ├─ Guarda/actualiza tabela appointments (Supabase, service_role)
    └─ Envia WhatsApp via Twilio (se configurado)
          ↓
Cliente autenticado vê marcações em /auth/dashboard
(Supabase anon key + RLS: só vê as suas)
```

### O que correu bem ✅

1. **Cal.com free tier para 1 barbeiro** — sem team, sem Pro, 0€/mês
2. **Google Maps iframe** em vez de Mapbox — build 7s vs 13s, zero token, zero JS
3. **`upsert` com `onConflict: 'cal_booking_uid'`** — idempotente, não duplica se webhook repetir
4. **`SUPABASE_SERVICE_ROLE_KEY` no webhook** — bypassa RLS sem complicar as políticas
5. **Middleware Astro** para redirect server-side — elimina flash de conteúdo no dashboard

### O que correu menos bem ⚠️

1. **Astro 6 migration forçada pelo Vercel** — `nodejs18.x` já não é suportado. Migração causou 3 ciclos de debug. Mitigar: começar sempre com Astro 6 + `@astrojs/vercel@latest` em projetos novos.
2. **`@astrojs/tailwind` descontinuado no Astro 6** — descoberto só no deploy. Fix: `postcss.config.mjs` direto.
3. **`.gitignore` em falta no primeiro commit** — `node_modules` entrou no repo (400MB). Fix: template já inclui `.gitignore`.
4. **Supabase novas chaves** — `sb_publishable_` e `sb_secret_` confundem quem está habituado às chaves antigas `anon`/`service_role`.
5. **Cal.com secret manual** — não é gerado automaticamente. Documentar claramente que és tu a definir o valor.

### Decisões que valeram a pena

1. **Google Maps embed** — para negócios com 1 localização fixa, o iframe é sempre a escolha certa. Mapbox só faz sentido com POIs, rotas ou tema muito customizado.
2. **`prerender = false` só nas páginas SSR** — API routes e auth pages. Resto fica static.
3. **`upsert` em vez de `insert`** — webhooks podem repetir o mesmo evento. Idempotência evita dados duplicados.

### Stack final deste template

| Camada | Tecnologia | Custo |
|---|---|---|
| Framework | Astro 6 | Grátis |
| Hosting | Vercel (Hobby) | Grátis |
| Booking | Cal.com Free (1 barbeiro) | Grátis |
| Base de dados + auth | Supabase Free | Grátis |
| Mapa | Google Maps embed | Grátis |
| Notificações | Twilio WhatsApp | ~0.05€/msg |
| Webhook glue | Astro API Route (Vercel Serverless) | Grátis |
| **Total mensal** | | **~0-5€** |

### Análise de concorrência — o que verificar antes de começar

Para qualquer barbearia nova, auditar o site do concorrente principal:

| O que verificar | Ferramenta |
|---|---|
| Secções e conteúdo | Ver com olhos + WebFetch |
| Reviews presentes? | Google Business Profile |
| Sistema de booking | Tentar fazer marcação |
| Velocidade | PageSpeed Insights |
| SEO técnico | search.google.com/test/rich-results |
| Headers de segurança | securityheaders.com |

**Lacunas mais comuns nos concorrentes de barbearias PT (2026):**
- ❌ Sem reviews/ratings no site (social proof)
- ❌ Galeria só com fotos do espaço, não de trabalhos
- ❌ Sem fotos antes/depois por barbeiro
- ❌ Sem FAQ (gera emails evitáveis)
- ❌ Sem email/WhatsApp de retenção pós-corte
- ❌ Booking só por WhatsApp manual (sem gestão de slots)

---

## 30. Lições Aprendidas — Template Alojamento Local com Temas (Junho 2026)

### O que foi construído

Template reutilizável **multi-tema** para alojamentos locais:
- **Repo:** `Dolphin-Digital-Studio/template-accommodation`
- **Stack:** Astro 5 + Tailwind CSS v3 (PostCSS) + TypeScript
- **Temas:** `rural` (completo) · `modern` (scaffold CSS pronto)
- **i18n:** PT + EN de raiz em todos os componentes
- **Secções:** Navbar, Hero, About, Accommodation, Wine, Amenities, Gallery, Location, Reviews, Contact, Footer
- **Schema.org:** `LodgingBusiness` com `aggregateRating`
- **Formulário:** Web3Forms (zero backend)
- **Mapa:** Google Maps iframe por default, Mapbox opcional

### Sistema de Temas com CSS Custom Properties ⭐ NOVO PADRÃO

A abordagem mais limpa para suportar múltiplos temas num único projecto Astro:

```
themes/
├── rural.css     ← :root { --color-primary: #3F6B3F; --font-heading: 'Playfair Display'; ... }
└── modern.css    ← :root { --color-primary: #1B3A5C; --font-heading: 'DM Sans'; ... }
```

`src/styles/global.css` importa o tema activo:
```css
/* Trocar aqui para mudar de tema — 1 linha */
@import '../../themes/rural.css';
/* @import '../../themes/modern.css'; */
```

`tailwind.config.mjs` usa as CSS vars como tokens:
```js
colors: {
  primary: 'var(--color-primary)',
  accent:  'var(--color-accent)',
  bg:      'var(--color-bg)',
  // ...
}
```

**Vantagens:**
- ✅ Trocar de tema = alterar 1 import + 1 import de fonte
- ✅ Todos os componentes funcionam sem tocar neles
- ✅ CSS variables resolvem em runtime → dark mode fácil de adicionar
- ✅ Sem duplicação de código Tailwind por tema

**Variáveis a definir por tema (mínimo):**

| Variável | Uso |
|---|---|
| `--color-primary` | Botões, links, destaques |
| `--color-primary-dark` | Hover estados |
| `--color-primary-light` | Backgrounds subtis |
| `--color-secondary` | Cor de suporte |
| `--color-accent` | Labels, badges, ornamentos |
| `--color-bg` | Fundo da página |
| `--color-surface` | Fundo de secções alternadas |
| `--color-surface-2` | Cards, inputs |
| `--color-text` | Texto principal |
| `--color-text-light` | Texto secundário |
| `--color-border` | Bordas |
| `--hero-overlay` | Overlay rgba do hero |
| `--font-heading` | Fonte de títulos |
| `--font-body` | Fonte de corpo de texto |
| `--shadow-sm/md/lg` | Sombras consistentes |
| `--radius-sm/md/lg` | Border-radius por tema |
| `--section-py` | Padding vertical das secções |

### Padrão "Ex-Líbris" — Secção de Destaque Visual ⭐ NOVO PADRÃO

Quando um negócio tem um **ex-líbris claro** (vinhos, piscina, spa, vista…), cria uma secção dedicada com:
- **Fundo contrastante** (escuro ou com textura) para se destacar do fluxo da página
- **Posição estratégica:** imediatamente após Accommodation (antes de Amenities)
- **3 blocos visuais:** intro/stats → produto/detalhe → experiências/CTA
- **Cores do tema invertidas** (texto claro, fundo escuro)

Exemplo aplicado: `Wine.astro` com fundo `#1C1008` e accent dourado.

**Template do padrão:**
```astro
<!-- Secção Ex-Líbris — fundo escuro para contraste -->
<section id="[ex-libris]" style="background: #1C1008;">
  <!-- Bloco 1: Intro + estatísticas numéricas (4 cards) -->
  <!-- Bloco 2: Cards do produto/serviço (3 colunas) -->
  <!-- Bloco 3: Experiências incluídas + CTA duplo -->
</section>
```

**Outros ex-líbris comuns e como tratar:**

| Ex-líbris | Bloco 1 | Bloco 2 | Bloco 3 |
|---|---|---|---|
| **Vinhos** (feito) | Stats da vinha | Cards dos labels | Provas + vindima |
| **Piscina/Spa** | m², temp., época | Tipos de piscina/tratamentos | Horários + reserva |
| **Gastronomia** | Chef, estrelas, anos | Pratos icónicos | Reserva mesa |
| **Vista/Natureza** | Altitude, área | Galeria especial da vista | Actividades outdoor |
| **Arquitectura histórica** | Ano, estilo, área | Detalhes históricos | Tour guiado |

### Componente Wine — Estrutura de Dados

Para quintas, adegas e turismo vínico, o bloco `wines` no `client.config.ts`:

```typescript
wines: {
  headline:    { pt, en },
  intro:       { pt, en },
  hectares:    number,
  altitude:    number,   // metros
  castas:      { pt, en },
  labels: [{
    id, name, year,
    type:        { pt, en },
    castas:      { pt, en },
    description: { pt, en },
    awards:      { pt, en } | null,
    image:       string,
    color:       string,   // hex da cor do vinho → usado no overlay + badge
  }],
  experiences: [{
    id, icon,
    title:       { pt, en },
    description: { pt, en },
    duration:    { pt, en },
    price:       { pt, en },   // pode ser 'Incluído na estadia'
  }],
  stats: [{ value: string, label: { pt, en } }],
}
```

### O que correu bem ✅

1. **CSS variables + tema file** — trocar de tema visual é literalmente 1 linha de CSS
2. **24 ícones SVG inline em `icons.ts`** — zero requests externos, estilizáveis via CSS
3. **`client.config.ts` tipado com `as const`** — autocomplete completo nos componentes
4. **Galeria com CSS Grid puro** — sem library extra, item :nth-child para layout masonry-like
5. **Secção vinhos com fundo escuro próprio** — destaca-se sem precisar de imagem especial
6. **Schema.org completo no Layout** — gerado dinamicamente do `client.config.ts`
7. **`npx astro check` como sanity check** — 0 errors antes de fazer push

### O que fazer diferente ⚠️

1. **`.gitattributes` em falta** — avisos LF→CRLF em todos os commits Windows. Adicionar desde o início:
   ```
   * text=auto
   *.astro text eol=lf
   *.ts text eol=lf
   *.css text eol=lf
   ```
2. **Imagens placeholder em falta** — em templates, incluir sempre imagens placeholder (mesmo que genéricas) para o cliente ver o layout real em localhost sem ter as fotos finais.
3. **`logo-white.png` necessário** — o Navbar usa `logo-white.png` para o estado transparente. Documentar claramente no briefing.
4. **Secção Blog não criada** — o `src/content/blog/` existe vazio e gera aviso Astro. Criar pelo menos 1 post de exemplo.

### Estimativa de esforço — usando este template

| Fase | Tempo |
|---|---|
| Clone + config inicial + `client.config.ts` | 1h |
| Trocar tema (cores, fontes, imagens) | 1-2h |
| Textos PT + EN (copywriting) | 3-6h |
| Fotos e galeria do cliente | 1-2h |
| Adaptar secção ex-líbris ao negócio | 3-5h |
| Mapa + POIs reais | 1h |
| Web3Forms + testes de form | 0.5h |
| Política privacidade + Schema.org | 1h |
| Deploy Vercel + DNS + Search Console | 1-2h |
| QA mobile + bugfixes | 2-3h |
| **TOTAL** | **15-24h** |

vs 27-47h do template anterior (poupança adicional de ~40%).

---

## 31. Lições Aprendidas — Açaí do Rei (Junho 2026)

### O que foi construído

Site de encomenda de açaí ao domicílio com builder interactivo:
- **Repo:** `Dolphin-Digital-Studio/acai-do-rei` + `andremacaes10/acai-do-rei`
- **Stack:** Astro 6 + Tailwind CSS + TypeScript (Astro static)
- **Builder:** seletor de tamanho, sabor, toppings, extras — SVG animado do copo
- **Pack Modal:** bottom sheet separado do builder regular (padrão Glovo/Uber Eats)
- **Multi-cup:** packs com 2 copos (Quinta Premiada) com configuração independente por copo
- **Entrega:** Google Maps Places Autocomplete + OSRM routing (distância real por estrada, grátis)
- **Referral:** sistema de códigos validados que removem taxa de entrega
- **Promoções:** cards por dia da semana, bloqueados fora da janela horária (15h-3h)
- **WhatsApp:** mensagem pré-preenchida completa com emojis, entrega, pagamento e referral
- **i18n:** PT + EN

---

### Arquitectura do Builder

O builder foi o componente central do projecto. Arquitectura em state machine pura (sem frameworks):

```
state = {
  size:          null,   // { id, price, label }
  flavor:        null,   // { id, label, color }
  toppings:      [],
  extras:        [],
  delivery:      null,   // { name, fee, km } — calculado por OSRM
  payment:       null,   // { id, label, emoji }
  pack:          null,   // { id, name, price, sizeId, cupCount, items, choice }
  cup2:          { flavor, toppings, extras },   // para packs com 2 copos
  activeCup:     1,
  referral:      '',
  referralValid: false,
}
```

**Padrão de eventos:** cada handler chama `updateCup()` + `updateSummary()`. O `updateSummary()` **não chama** `updateCup()` — evitar dupla chamada.

**Separação builder / packs:**
- `AcaiBuilder.astro` — builder regular (utilizador constrói o seu açaí do zero)
- `PackModal.astro` — modal separado para packs, com tamanho bloqueado e preço fixo
- Ambos partilham o mesmo `client.config.ts` e `define:vars`

---

### Patterns Novos ⭐

#### 1. Pack Modal como Bottom Sheet

```css
/* Mobile: sheet desliza de baixo para cima */
@media (max-width: 1023px) {
  #pack-modal { align-items: flex-end; overflow: hidden; }
  #pack-modal > .modal-sheet {
    width: 100%;
    max-height: 93svh;
    border-radius: 20px 20px 0 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    padding-bottom: max(16px, env(safe-area-inset-bottom));
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(.32,.72,0,1);
  }
  #pack-modal.sheet-open > .modal-sheet { transform: translateY(0); }
}
```

```js
function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  requestAnimationFrame(() => modal.classList.add('sheet-open'));
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('sheet-open');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }, 350);
}
```

**Swipe para fechar:**
```js
let startY = 0, startScroll = 0;
sheet.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
  startScroll = sheet.scrollTop;
}, { passive: true });
sheet.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - startY;
  if (dy > 80 && startScroll <= 0) closeModal();
}, { passive: true });
```

---

#### 2. Sticky Mobile Order Bar

Barra fixa na parte inferior do ecrã em mobile — sem precisar de scroll para encomendar:

```html
<!-- Fora da section, antes do </body> -->
<div id="mobile-order-bar"
     class="hidden fixed bottom-0 left-0 right-0 z-40
            bg-roxo-950/95 backdrop-blur-md border-t border-white/10
            px-4 py-3 lg:hidden"
     style="padding-bottom: max(12px, env(safe-area-inset-bottom))">
  <div class="flex items-center gap-3 max-w-lg mx-auto">
    <div class="flex-1 min-w-0">
      <p id="mob-bar-desc"  class="text-xs text-roxo-300 truncate"></p>
      <p id="mob-bar-total" class="font-display font-black text-lg"></p>
    </div>
    <button id="mob-bar-btn" class="btn-whatsapp px-4 py-3 text-sm" disabled>
      Encomendar
    </button>
  </div>
</div>
```

Actualizar em `updateSummary()`:
```js
const mobBar = document.getElementById('mobile-order-bar');
if (mobBar && state.size) {
  mobBar.classList.remove('hidden');
  document.getElementById('mob-bar-desc').textContent =
    [state.size?.label, state.flavor?.label].filter(Boolean).join(' · ');
  document.getElementById('mob-bar-total').textContent = fmt(total);
  const btn = document.getElementById('mob-bar-btn');
  btn.disabled = !canOrder;
}
```

---

#### 3. Auto-scroll por Passo (Mobile)

```js
function mobileScrollTo(id) {
  if (window.innerWidth >= 1024) return;  // só mobile
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 180);
}

// Em handleSizeClick:
mobileScrollTo('step-flavor-card');

// Em handleFlavorClick:
mobileScrollTo('step-toppings-card');
```

---

#### 4. Delivery por Distância Real (Google Places + OSRM)

Fluxo sem custos de routing:
1. **Google Places Autocomplete** dá o endereço + coordenadas (requer API key + Places API activada)
2. **OSRM** calcula distância por estrada grátis, sem chave
3. Taxa determinada por tiers no `client.config.ts`

```js
// Inicializar autocomplete (chamar quando necessário — lazy)
async function initAutocomplete(inputId, calcFn) {
  await loadGoogleMaps(googleMapsKey, lang);
  const input = document.getElementById(inputId);
  const ac = new window.google.maps.places.Autocomplete(input, {
    componentRestrictions: { country: 'pt' },
    fields: ['geometry', 'formatted_address'],
    types: ['address'],
  });
  ac.addListener('place_changed', () => {
    const place = ac.getPlace();
    if (place?.geometry?.location) {
      calcFn(place.geometry.location.lat(), place.geometry.location.lng());
    }
  });
}

// Calcular fee com OSRM (sem API key)
async function calcDeliveryFromCoords(destLat, destLng) {
  const url = `https://router.project-osrm.org/route/v1/driving/${hqLng},${hqLat};${destLng},${destLat}?overview=false`;
  const data = await (await fetch(url)).json();
  const km   = data.routes[0].distance / 1000;
  const fee  = deliveryTiers.find(t => km <= t.maxKm)?.fee ?? null;
  // null = fora da zona
}
```

**Config de tiers:**
```typescript
delivery: {
  hqLat: 41.38053,
  hqLng: -8.74692,
  tiers: [
    { maxKm: 3,  fee: 1.50 },
    { maxKm: 7,  fee: 2.50 },
    { maxKm: 15, fee: 4.00 },
    { maxKm: 25, fee: 6.00 },
  ],
},
```

**Loader partilhado de Google Maps (evita duplo carregamento):**
```js
function loadGoogleMaps(key, lang) {
  return new Promise(resolve => {
    if (window.google?.maps?.places) { resolve(); return; }
    if (window._gmapsPromise) { window._gmapsPromise.then(resolve); return; }
    window._gmapsPromise = new Promise(res => {
      window._gmapsCB = res;
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=${lang}&region=PT&callback=_gmapsCB`;
      s.async = true;
      document.head.appendChild(s);
    });
    window._gmapsPromise.then(resolve);
  });
}
```

**Google Maps Places Autocomplete — styling personalizado:**
```css
.pac-container {
  z-index: 9999 !important;
  background: #1a0a2e;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
}
.pac-item { color: #c4b5d4; padding: 10px 14px; cursor: pointer; }
.pac-item:hover, .pac-item-selected { background: rgba(245,158,11,0.12); }
.pac-item-query { color: #fff; font-weight: 600; }
.pac-matched { color: #f59e0b; }
.pac-icon { display: none; }
```

---

#### 5. Promoções com Janela Horária

Promoções válidas das 15h do dia até às 3h do dia seguinte:

```js
const dayMap = { 1:'segunda', 2:'terca', 3:'quarta', 4:'quinta' };
const now    = new Date();
const hour   = now.getHours();
const calDay = now.getDay();

let todayId;
if      (hour >= 15) todayId = dayMap[calDay];          // 15h-23h59: promo de hoje
else if (hour < 3)   todayId = dayMap[calDay === 0 ? 6 : calDay - 1]; // 0h-2h59: promo de ontem
else                 todayId = undefined;                // 3h-14h59: sem promo
```

---

#### 6. Sistema de Referral com Desconto

```typescript
// client.config.ts
referralCodes: ['SHEEM'],
```

```js
// define:vars: { referralCodes }
// No event listener (SEM TypeScript casts — ver Bug #1):
const raw = (e.target.value || '').trim().toUpperCase();
state.referralValid = referralCodes.includes(raw);

// Em updateSummary:
const deliveryFee = (state.delivery && !state.referralValid)
  ? state.delivery.fee
  : 0;  // referral válido → entrega grátis
```

---

#### 7. Multi-cup Builder (packs com 2 copos)

```typescript
// client.config.ts — adicionar cupCount por promo
{ id: 'quinta', sizeId: '25cl', cupCount: 2 as 1 | 2, ... }
```

Estado separado por copo:
```js
state = {
  flavor:    null,   // copo 1
  toppings:  [],     // copo 1
  cup2:      { flavor: null, toppings: [], extras: [] },
  activeCup: 1,
};
```

Handlers verificam `state.activeCup`:
```js
function handleFlavorClick(btn) {
  const fl = { id: btn.dataset.id, label: btn.dataset.label, color: btn.dataset.color };
  if (state.activeCup === 2) state.cup2.flavor = fl;
  else                       state.flavor      = fl;
}
```

`canOrder` inclui validação do copo 2:
```js
const needCup2 = state.pack?.cupCount === 2 && !state.cup2.flavor;
const canOrder = state.size && state.flavor && state.payment && !needCup2;
```

---

### O que correu bem ✅

1. **Builder como state machine pura** — zero frameworks, zero dependências runtime, Lighthouse 98+
2. **Pack Modal separado** — elimina confusão UX entre "construir do zero" e "escolher pack"
3. **Bottom sheet + swipe** — padrão mobile familiar (Glovo, Uber Eats); percepção de app nativa
4. **OSRM sem API key** — routing por estrada completamente grátis; só Google Places precisa de key
5. **Referral no config** — adicionar novo código = 1 linha em `client.config.ts`, sem código
6. **`define:vars` pattern** — passa toda a config necessária para o script sem globals

---

### O que correu menos bem ⚠️

1. **TypeScript em scripts `define:vars`** — causa SyntaxError que quebra TODO o script silenciosamente. Ver Bug #1 abaixo.
2. **`wa.me` em desktop** — redireccionamento intermédio perde encoding dos emojis. Ver Bug #2.
3. **Pack features no builder principal** — pack banner + cup selector + pack state no mesmo componente do builder regular criou confusão. Solução: `PackModal.astro` completamente separado desde o início.
4. **`updateSummary()` a chamar `updateCup()`** — os handlers chamavam ambos, causando dupla renderização. Remover `updateCup()` de dentro de `updateSummary()`.
5. **Animação `.topping-new` com dupla chamada** — quando `updateCup()` era chamado 2× por click, o segundo call encontrava o círculo já no DOM (`existingIds` actualizado) e não animava. Fix: garantir que `updateCup()` é chamado 1× por acção.

---

### Bugs Novos — Secção 9 (adicionar)

#### 🐛 TypeScript cast em `define:vars` script → SyntaxError silencioso

**Causa:** Scripts `<script define:vars={...}>` em Astro são injetados como inline scripts e **não passam pelo processador TypeScript do Vite**. Qualquer sintaxe TypeScript (type assertions, type annotations) fica como texto literal no HTML — o browser lança `SyntaxError` e o script inteiro falha sem aviso na consola.

**Sintoma:** Todos os event listeners param de funcionar após adicionar TypeScript a um `define:vars` script.

**Fix:**
```js
// ❌ Quebra — TypeScript num define:vars script
const raw = (e.target as HTMLInputElement).value;

// ✅ Funciona — JavaScript puro
const raw = (e.target.value || '').trim();
```

**Regra:** Em `<script define:vars>` → usar sempre JavaScript puro. TypeScript só em `<script>` normais (sem `define:vars`).

---

#### 🐛 WhatsApp Desktop: emojis quebrados via `wa.me`

**Causa:** `wa.me/PHONE?text=...` em desktop redireciona para uma página intermédia. Esse redirect (302) perde ou corrompe o encoding UTF-8 dos emojis na querystring.

**Fix:** Detectar mobile vs desktop e usar URL diferente:
```js
function sendWhatsApp(wa, msg) {
  const encoded  = encodeURIComponent(msg);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${wa}?text=${encoded}`
    : `https://web.whatsapp.com/send?phone=${wa}&text=${encoded}`;
  window.open(url, '_blank');
}
```

`web.whatsapp.com/send` abre o WhatsApp Web directamente, sem redirect, preservando emojis.

---

#### 🐛 `deliveryTiers.at(-1)` não funciona em browsers antigos

**Causa:** `Array.prototype.at()` é ES2022. Alguns browsers Android (Chrome < 92, Samsung Internet < 16) não suportam.

**Fix:** Usar índice directo:
```js
// ❌
deliveryTiers.at(-1).maxKm

// ✅
deliveryTiers[deliveryTiers.length - 1].maxKm
```

---

#### 🐛 Google Maps dropdown clipped dentro de modal overflow:hidden

**Causa:** O dropdown `.pac-container` é appendado ao `<body>` mas fica atrás do modal overlay se o modal tiver `z-index` menor.

**Fix:**
```css
.pac-container { z-index: 9999 !important; }
```

---

### Stack do Projecto

| Camada | Tecnologia | Custo |
|---|---|---|
| Framework | Astro 6 | Grátis |
| Hosting | Vercel (Hobby) | Grátis |
| Geocoding (UI) | Google Maps Places API | 0€ até $200/mês crédito |
| Routing distância | OSRM (open-source) | Grátis |
| WhatsApp ordering | `wa.me` / `web.whatsapp.com/send` | Grátis |
| Form backup | Web3Forms | Grátis até 250/mês |
| **Total mensal** | | **~0€** |

### Estimativa de Esforço — Site de Food Delivery / Ordering

| Fase | Tempo |
|---|---|
| Setup + config inicial | 1-2h |
| Builder interactivo (state + SVG) | 10-15h |
| Pack modal + multi-cup | 6-10h |
| Delivery com Google Places + OSRM | 4-6h |
| Promoções com janela horária | 2-3h |
| Sistema referral | 2-3h |
| Mobile UX (bottom sheet, sticky bar, auto-scroll) | 4-6h |
| WhatsApp message generation | 2-3h |
| i18n PT + EN | 2-3h |
| Deploy + DNS + API keys | 1-2h |
| QA + bugfixes | 4-6h |
| **TOTAL** | **38-59h** |

---

## Recursos & Links Úteis

### Documentação oficial
- [Astro Docs](https://docs.astro.build)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Cal.com Docs](https://cal.com/docs)
- [Schema.org](https://schema.org)

### Ferramentas de teste
- [Rich Results Test](https://search.google.com/test/rich-results) — validar Schema.org
- [PageSpeed Insights](https://pagespeed.web.dev) — Lighthouse online
- [Security Headers](https://securityheaders.com) — auditar headers
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [DNS Checker](https://dnschecker.org) — propagação DNS

### Inspiração de design
- [Awwwards — Hospitality](https://www.awwwards.com/websites/hotel-and-resort/)
- [Land-book](https://land-book.com/) — landing pages
- [Refero](https://refero.design/) — UI patterns

---

## Histórico de versões

| Versão | Data | Notas |
|---|---|---|
| 1.0 | Junho 2026 | Versão inicial baseada em Gerês Cascatas Residence |
| 1.1 | Junho 2026 | Template barbearia: Cal.com + Supabase + Twilio + Google Maps embed. Migração Astro 6. Bugs comuns de deploy adicionados. |
| 1.2 | Junho 2026 | Template alojamento multi-tema (`template-accommodation`). Sistema de temas CSS variables (rural/modern). Padrão "ex-líbris" com `Wine.astro`. Estimativa 15-24h com este template. |
| 1.3 | Junho 2026 | Projecto Açaí do Rei (food delivery + ordering). Patterns novos: builder interactivo com state machine, pack modal como bottom sheet, multi-cup, Google Places + OSRM, sticky mobile order bar, auto-scroll por passo, swipe para fechar. Bugs novos: TypeScript em `define:vars`, `wa.me` vs `web.whatsapp.com`, `.at(-1)` compatibilidade, `.pac-container` z-index. |

---

*Atualizar este documento a cada novo projeto entregue com lições aprendidas.*
