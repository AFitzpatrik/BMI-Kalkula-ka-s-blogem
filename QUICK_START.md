# Rychlý start - Deployment do produkce

## 🚀 Krok 1: Nastavte Environment Variables

Vytvořte soubor `.env.local` (lokálně) nebo nastavte v Vercel:

```env
ADMIN_PASSWORD=vaše-silné-heslo-zde
JWT_SECRET=vygenerujte-náhodný-řetězec-min-32-znaků
```

**Jak vygenerovat JWT_SECRET:**
- Použijte: https://randomkeygen.com/ (CodeIgniter Encryption Keys)
- Nebo v PowerShell: `-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})`

## 🚀 Krok 2: Deploy na Vercel

1. **Připojte GitHub repo:**
   - Jděte na https://vercel.com
   - Přihlaste se pomocí GitHubu
   - Klikněte "Add New Project"
   - Vyberte váš `bmi-calculator` repository

2. **Nastavte Environment Variables:**
   - V sekci "Environment Variables" přidejte:
     - `ADMIN_PASSWORD` = vaše heslo
     - `JWT_SECRET` = váš náhodný řetězec
   - Vyberte: Production, Preview, Development

3. **Deploy:**
   - Klikněte "Deploy"
   - Počkejte na dokončení

4. **Váš web je online!**
   - URL: `https://vase-projekt.vercel.app`

## 🔐 Krok 3: Přístup do CMS

1. Jděte na: `https://vase-domena.com/admin-secret-2024/login`
2. Zadejte heslo z `ADMIN_PASSWORD`
3. Jste přihlášeni!

## 📝 Důležité poznámky

- ✅ CMS je chráněno heslem
- ✅ Tokeny expirují po 24 hodinách
- ✅ Middleware kontroluje každý request
- ⚠️ **Změňte výchozí heslo!**
- ⚠️ **Nesdílejte ADMIN_PASSWORD!**

## 📚 Více informací

Podrobnější návod: `PRODUCTION_DEPLOYMENT.md`
