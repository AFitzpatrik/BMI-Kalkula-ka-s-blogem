# Návod na nasazení aplikace

## Deployment na Vercel (doporučeno)

Vercel je ideální platforma pro Next.js aplikace a nabízí bezplatný hosting.

### Krok 1: Příprava projektu

1. Ujistěte se, že máte účet na GitHubu
2. Vytvořte nový repository na GitHubu
3. Nahrajte svůj kód:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/VASE_REPO.git
git push -u origin main
```

### Krok 2: Nasazení na Vercel

1. Jděte na [vercel.com](https://vercel.com) a přihlaste se pomocí GitHubu
2. Klikněte na "New Project"
3. Vyberte váš repository
4. Vercel automaticky detekuje Next.js a nastaví konfiguraci
5. Klikněte na "Deploy"

### Krok 3: Aktualizace domény v sitemap

Po nasazení aktualizujte doménu v `app/sitemap.ts`:

```typescript
const baseUrl = 'https://vase-domena.vercel.app'
```

A také v `app/robots.ts`:

```typescript
sitemap: 'https://vase-domena.vercel.app/sitemap.xml',
```

### Krok 4: Připojení vlastní domény (volitelné)

1. V Vercel dashboardu jděte do Settings → Domains
2. Přidejte svou doménu
3. Následujte instrukce pro DNS nastavení

## Alternativní deployment

### Netlify

1. Přihlaste se na [netlify.com](https://netlify.com)
2. Připojte GitHub repository
3. Build command: `npm run build`
4. Publish directory: `.next`

### Vlastní server

1. Build aplikace: `npm run build`
2. Spusťte produkční server: `npm start`
3. Aplikace poběží na portu 3000

## SEO optimalizace

Aplikace obsahuje:
- ✅ Metadata pro všechny stránky
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Open Graph tags

Pro lepší SEO:
1. Přidejte Google Search Console
2. Odešlete sitemap do Google Search Console
3. Přidejte Google Analytics (volitelné)

## Poznámky

- Data se ukládají do `data/posts.json` - tento soubor se vytvoří automaticky
- Pro produkci zvažte použití databáze (PostgreSQL, MongoDB) místo JSON souboru
- CMS sekce je veřejně přístupná - pro produkci přidejte autentizaci
