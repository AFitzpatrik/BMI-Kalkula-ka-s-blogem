# Návod na nasazení do produkce

## Krok 1: Příprava environment variables

### Lokálně vytvořte soubor `.env.local`:

```env
ADMIN_PASSWORD=vaše-silné-heslo-zde
JWT_SECRET=vygenerujte-náhodný-řetězec-min-32-znaků
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-vaše-id
NEXT_PUBLIC_ADSENSE_SLOT=vaše-slot-id
```

**Důležité:**
- `ADMIN_PASSWORD` - heslo pro přístup do CMS (změňte na silné heslo!)
- `JWT_SECRET` - náhodný řetězec pro podepisování tokenů (min. 32 znaků)
- AdSense proměnné jsou volitelné

### Jak vygenerovat JWT_SECRET:
```bash
# V PowerShell:
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Nebo použijte online generátor: https://randomkeygen.com/
```

## Krok 2: Deployment na Vercel (doporučeno)

### 2.1. Připojte GitHub repository

1. Jděte na [vercel.com](https://vercel.com) a přihlaste se pomocí GitHubu
2. Klikněte na **"Add New Project"**
3. Vyberte váš `bmi-calculator` repository
4. Klikněte **"Import"**

### 2.2. Nastavte Environment Variables

V sekci **"Environment Variables"** přidejte:

| Name | Value | Environment |
|------|-------|-------------|
| `ADMIN_PASSWORD` | Vaše silné heslo | Production, Preview, Development |
| `JWT_SECRET` | Náhodný řetězec (min 32 znaků) | Production, Preview, Development |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Vaše AdSense ID | Production, Preview, Development |
| `NEXT_PUBLIC_ADSENSE_SLOT` | Vaše AdSense Slot | Production, Preview, Development |

### 2.3. Deploy

1. Klikněte **"Deploy"**
2. Počkejte na dokončení buildu
3. Váš web bude dostupný na `https://vase-projekt.vercel.app`

### 2.4. Připojení vlastní domény (volitelné)

1. V projektu jděte do **Settings → Domains**
2. Přidejte svou doménu
3. Následujte instrukce pro DNS nastavení

## Krok 3: Aktualizace sitemap a robots.txt

Po nasazení aktualizujte doménu v:

### `app/sitemap.ts`:
```typescript
const baseUrl = 'https://vase-domena.com' // nebo vercel.app URL
```

### `app/robots.ts`:
```typescript
sitemap: 'https://vase-domena.com/sitemap.xml',
```

## Krok 4: Bezpečnost CMS

### Jak se přihlásit do CMS:

1. Jděte na: `https://vase-domena.com/admin-secret-2024/login`
2. Zadejte heslo, které jste nastavili v `ADMIN_PASSWORD`
3. Po přihlášení budete přesměrováni do CMS

### Důležité bezpečnostní poznámky:

- ✅ CMS je chráněno heslem
- ✅ Tokeny expirují po 24 hodinách
- ✅ Tokeny jsou uloženy v httpOnly cookies
- ✅ Middleware kontroluje přístup na každý request
- ⚠️ **Změňte výchozí heslo na silné!**
- ⚠️ **Nesdílejte ADMIN_PASSWORD s nikým!**

## Krok 5: Google AdSense (volitelné)

1. Získejte Publisher ID z [Google AdSense](https://www.google.com/adsense)
2. Vytvořte reklamní jednotku
3. Aktualizujte environment variables:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - `NEXT_PUBLIC_ADSENSE_SLOT`
4. Redeploy aplikace

## Krok 6: SEO optimalizace

1. Přidejte Google Search Console
2. Odešlete sitemap: `https://vase-domena.com/sitemap.xml`
3. Přidejte Google Analytics (volitelné)

## Troubleshooting

### CMS se nenačítá:
- Zkontrolujte, že `ADMIN_PASSWORD` je nastaveno
- Zkontrolujte, že `JWT_SECRET` je nastaveno
- Zkontrolujte console v prohlížeči pro chyby

### Build selhává:
- Zkontrolujte, že všechny environment variables jsou nastaveny
- Zkontrolujte build logy v Vercel dashboardu

### Banner se nezobrazuje:
- Zkontrolujte, že AdSense proměnné jsou nastaveny
- Zkontrolujte, že máte schválený AdSense účet

## Podpora

Pro problémy s deploymentem:
- [Vercel Dokumentace](https://vercel.com/docs)
- [Next.js Dokumentace](https://nextjs.org/docs)
