# Návod na nastavení a použití CMS Login

## 🔐 Jak nastavit heslo

### Pro lokální vývoj:

1. Vytvořte soubor `.env.local` v kořenové složce projektu
2. Přidejte do něj:

```env
ADMIN_PASSWORD=moje-silne-heslo-123
JWT_SECRET=vygenerujte-nahodny-retezec-min-32-znaku
```

3. Restartujte vývojový server (`npm run dev`)

### Pro produkci (Vercel):

1. Jděte do vašeho projektu na Vercel
2. Klikněte na **Settings** → **Environment Variables**
3. Přidejte:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: vaše silné heslo (např. `MojeSilneHeslo2024!`)
   - **Environment**: Production, Preview, Development
4. Přidejte také:
   - **Name**: `JWT_SECRET`
   - **Value**: náhodný řetězec (min 32 znaků)
   - **Environment**: Production, Preview, Development
5. Klikněte **Save**
6. Redeploy aplikace (automaticky se redeployne po změně env variables)

## 🔑 Jak se přihlásit do CMS

### Lokálně (vývoj):

1. Spusťte server: `npm run dev`
2. Otevřete: http://localhost:3000/admin-secret-2024/login
3. Zadejte heslo, které jste nastavili v `.env.local`
4. Klikněte "Přihlásit se"

### V produkci:

1. Jděte na: `https://vase-domena.vercel.app/admin-secret-2024/login`
2. Zadejte heslo, které jste nastavili v Vercel Environment Variables
3. Klikněte "Přihlásit se"

## 📝 Důležité poznámky

### Bezpečnost:
- ✅ Heslo je uloženo v environment variable (není v kódu)
- ✅ Tokeny expirují po 24 hodinách
- ✅ Tokeny jsou uloženy v httpOnly cookies (bezpečnější)
- ⚠️ **Použijte silné heslo!** (min. 12 znaků, kombinace písmen, čísel, symbolů)
- ⚠️ **Nesdílejte heslo s nikým!**

### Jak vygenerovat silné heslo:
- Použijte password manager (1Password, LastPass, atd.)
- Nebo online generátor: https://passwordsgenerator.net/
- Doporučená délka: 16+ znaků

### Jak vygenerovat JWT_SECRET:
1. Online: https://randomkeygen.com/ (CodeIgniter Encryption Keys)
2. Nebo v PowerShell:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## 🚪 Odhlášení

- V CMS klikněte na tlačítko **"Odhlásit se"** v pravém horním rohu
- Nebo vymažte cookies v prohlížeči
- Nebo počkejte 24 hodin (token expiruje)

## ❓ Řešení problémů

### "Nesprávné heslo"
- Zkontrolujte, že jste nastavili `ADMIN_PASSWORD` správně
- Zkontrolujte, že jste restartovali server (lokálně)
- Zkontrolujte, že jste redeployli aplikaci (Vercel)

### "Nemůžu se přihlásit"
- Zkontrolujte, že URL je správná: `/admin-secret-2024/login`
- Zkontrolujte console v prohlížeči (F12) pro chyby
- Zkontrolujte, že `JWT_SECRET` je také nastaveno

### "Token expiroval"
- Jednoduše se znovu přihlaste
- Tokeny expirují po 24 hodinách z bezpečnostních důvodů

## 📍 URL adresy

- **Login**: `/admin-secret-2024/login`
- **CMS**: `/admin-secret-2024` (přesměruje na login, pokud nejste přihlášeni)
