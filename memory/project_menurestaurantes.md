---
name: project-menurestaurantes
description: Projeto de ementa digital via QR code para restaurantes — Astro 4 + Tailwind
metadata:
  type: project
---

Ementa digital para restaurante via QR code, construída com Astro 4 + Tailwind CSS.

**Why:** Cliente quer mostrar menu no telemóvel ao fazer scan de QR code em mesa/folheto — sem app, sem custo recorrente.

**How to apply:** Usa `client.config.ts` como source of truth para toda a ementa e dados do restaurante. Para adaptar para outro restaurante, só editar esse ficheiro.

Stack: Astro 4 + `@astrojs/tailwind` + Vercel (hosting gratuito).

Funcionalidades:
- Filtros por categoria (tabs sticky)
- Pesquisa em tempo real (nome + descrição)
- Badges de destaque, tags de alergénios (vegan, vegetariano, sem glúten, picante)
- Horários e morada com link para Google Maps
- Botões Ligar e WhatsApp no header
- Página `/qrcode` para o dono imprimir o QR code
- Schema.org Restaurant para SEO
- Mobile-first

Servidor dev: `npm run dev` → http://localhost:4321
