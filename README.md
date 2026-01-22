# BMI Kalkulačka

Moderní webová aplikace pro výpočet BMI (Body Mass Index) s blogem a CMS systémem.

## Funkce

- 🧮 **BMI Kalkulačka** - Jednoduchá a přesná kalkulačka pro výpočet Body Mass Index
- 📝 **Blog** - Sekce s články o zdraví a výživě
- 🎨 **CMS** - Content Management System pro správu blogových článků
- 📱 **Responzivní design** - Funguje na všech zařízeních
- 🔍 **SEO optimalizace** - Připraveno pro vyhledávače

## Tech Stack

- **Next.js 14** - React framework s App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Moderní styling
- **JSON databáze** - Jednoduché ukládání článků

## Instalace

1. Nainstalujte závislosti:
```bash
npm install
```

2. Spusťte vývojový server:
```bash
npm run dev
```

3. Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči

## Deployment

Aplikace je připravena pro deployment na Vercel:

1. Vytvořte účet na [Vercel](https://vercel.com)
2. Připojte svůj GitHub repository
3. Vercel automaticky detekuje Next.js a nasadí aplikaci

Nebo použijte Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Struktura projektu

```
├── app/              # Next.js App Router
│   ├── api/         # API routes
│   ├── blog/        # Blog sekce
│   ├── admin/       # CMS sekce
│   └── page.tsx     # Hlavní stránka
├── components/      # React komponenty
├── lib/            # Utility funkce
└── data/           # JSON databáze (vytvoří se automaticky)
```

## Použití

### BMI Kalkulačka
Zadejte svou výšku (v cm) a váhu (v kg) a aplikace vypočítá vaše BMI s kategorií.

### Blog
Prohlížejte si články o zdraví a výživě. Články jsou automaticky řazeny od nejnovějších.

### CMS
V sekci CMS můžete:
- Přidávat nové články
- Upravovat existující články
- Mazat články

## Licence

MIT
