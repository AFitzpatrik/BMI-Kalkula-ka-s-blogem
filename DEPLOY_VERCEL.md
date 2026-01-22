# Návod na nasazení na Vercel - Krok za krokem

## 🚀 Krok 1: Připojení GitHub repository

1. Jděte na **https://vercel.com**
2. Přihlaste se pomocí **GitHub** účtu
3. Klikněte na **"Add New..."** → **"Project"**
4. Najděte váš repository: **`AFitzpatrik/BMI-Kalkula-ka-s-blogem`**
5. Klikněte **"Import"**

## 🔐 Krok 2: Nastavení Environment Variables

### 2.1. Spusťte generátor hesel:

```powershell
powershell -ExecutionPolicy Bypass -File generate-secrets.ps1
```

Zkopírujte vygenerované hodnoty.

### 2.2. V Vercel projektu:

1. V sekci **"Configure Project"** najděte **"Environment Variables"**
2. Klikněte na **"Add"** a přidejte:

   **První proměnná:**
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: (vložte vygenerované heslo)
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development
   - Klikněte **"Save"**

   **Druhá proměnná:**
   - **Name**: `JWT_SECRET`
   - **Value**: (vložte vygenerovaný JWT secret)
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development
   - Klikněte **"Save"**

### 2.3. Volitelné - AdSense (pokud máte):

   - **Name**: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - **Value**: `ca-pub-vaše-id`
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

   - **Name**: `NEXT_PUBLIC_ADSENSE_SLOT`
   - **Value**: `vaše-slot-id`
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

## 🚀 Krok 3: Deploy

1. Zkontrolujte nastavení:
   - **Framework Preset**: Next.js (mělo by být automaticky)
   - **Root Directory**: `./` (nechte prázdné)
   - **Build Command**: `npm run build` (automaticky)
   - **Output Directory**: `.next` (automaticky)

2. Klikněte **"Deploy"**

3. Počkejte na dokončení buildu (obvykle 1-3 minuty)

## ✅ Krok 4: Ověření

1. Po dokončení buildu uvidíte **"Congratulations!"**
2. Klikněte na **"Visit"** nebo použijte URL: `https://vase-projekt.vercel.app`

3. Otestujte:
   - Hlavní stránka: `https://vase-projekt.vercel.app`
   - Blog: `https://vase-projekt.vercel.app/blog`
   - CMS Login: `https://vase-projekt.vercel.app/admin-secret-2024/login`

## 🔐 Krok 5: Přihlášení do CMS

1. Jděte na: `https://vase-projekt.vercel.app/admin-secret-2024/login`
2. Zadejte heslo, které jste nastavili v `ADMIN_PASSWORD`
3. Klikněte **"Přihlásit se"**
4. Měli byste být přihlášeni a vidět CMS!

## 📝 Důležité poznámky

### Bezpečnost:
- ✅ Heslo je uloženo v environment variables (není v kódu)
- ✅ Tokeny expirují po 24 hodinách
- ✅ Použijte silné heslo (vygenerované skriptem)
- ⚠️ **Uložte si heslo na bezpečné místo!**
- ⚠️ **Nesdílejte heslo s nikým!**

### Po nasazení:
- Každý push na GitHub automaticky triggeruje nový deploy
- Environment variables jsou bezpečně uloženy v Vercel
- Můžete změnit heslo kdykoliv v Settings → Environment Variables

### Vlastní doména (volitelné):
1. V projektu: **Settings** → **Domains**
2. Přidejte svou doménu
3. Následujte instrukce pro DNS nastavení

## ❓ Řešení problémů

### Build selhává:
- Zkontrolujte, že všechny environment variables jsou nastaveny
- Zkontrolujte build logy v Vercel dashboardu

### Nemůžu se přihlásit:
- Zkontrolujte, že `ADMIN_PASSWORD` je správně nastaveno
- Zkontrolujte, že `JWT_SECRET` je také nastaveno
- Zkontrolujte, že jste redeployli po změně env variables

### Banner se nezobrazuje:
- Zkontrolujte, že AdSense proměnné jsou nastaveny (pokud používáte AdSense)
- Banner se zobrazí jako placeholder, dokud není AdSense nastaveno

## 🎉 Hotovo!

Váš web je nyní online a dostupný na internetu!
