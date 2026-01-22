# Debugování problému s loginem

## 🔍 Co bylo opraveno:

1. **Cookie handling** - Přidáno `credentials: 'include'` do fetch volání
2. **Redirect** - Změněno z `router.push` na `window.location.href` pro lepší cookie handling
3. **Middleware** - Odstraněn jsonwebtoken (nefunguje v Edge Runtime)
4. **SameSite** - Nastaveno na 'lax' místo 'none'
5. **Debug logging** - Přidáno více logování

## 🧪 Jak otestovat:

### 1. Počkejte na redeploy
- Vercel automaticky redeployne po pushi
- Nebo manuálně: Deployments → Redeploy

### 2. Otevřete Developer Tools
- F12 v prohlížeči
- Karta **Console** a **Network**

### 3. Zkuste se přihlásit
- URL: `https://vase-domena.vercel.app/admin-secret-2024/login`
- Heslo: `KJRSl0LEt6vpZfmaMuGW`
- Klikněte na ikonu oka, abyste viděli heslo

### 4. Zkontrolujte v Console:
- Měli byste vidět: `Login successful, token received: Yes`
- Pokud ne, zkontrolujte chyby

### 5. Zkontrolujte Cookies:
- F12 → **Application** → **Cookies**
- Měli byste vidět cookie `admin_token`
- Zkontrolujte:
  - **Value**: měl by být dlouhý token
  - **Domain**: měl by být vaše doména
  - **Path**: `/`
  - **HttpOnly**: ✅
  - **Secure**: ✅ (v produkci)
  - **SameSite**: `Lax`

### 6. Zkontrolujte Network tab:
- Najděte request `/api/admin/login`
- Zkontrolujte **Response Headers**:
  - Měl by obsahovat `Set-Cookie: admin_token=...`
- Zkontrolujte **Response**:
  - Měl by obsahovat `{"success":true,"token":"..."}`

## 🔧 Možné problémy a řešení:

### Problém: Cookie se neukládá
**Řešení:**
- Zkontrolujte, že používáte HTTPS (Vercel to má automaticky)
- Zkontrolujte, že `secure: true` je nastaveno v produkci
- Zkontrolujte, že `sameSite: 'lax'` je správně

### Problém: Redirect se děje, ale pak se vrátí na login
**Možné příčiny:**
- Cookie se neuložila včas
- Middleware kontroluje token dřív, než se cookie uloží
- Token není platný

**Řešení:**
- Zkontrolujte, že cookie je skutečně uložena (Application → Cookies)
- Zkontrolujte serverové logy v Vercel Functions

### Problém: "Nesprávné heslo" i když je správné
**Možné příčiny:**
- Mezery na začátku/konci
- Špatné kopírování
- Environment variable není správně nastavena

**Řešení:**
- Použijte ikonu oka, abyste viděli, co píšete
- Zkontrolujte délku hesla (mělo by být 20 znaků)
- Zkontrolujte Vercel Environment Variables

## 📊 Serverové logy

V Vercel můžete zkontrolovat logy:
1. Vercel → váš projekt → **Functions** → **Logs**
2. Najděte `/api/admin/login`
3. Měli byste vidět debug výpisy:
   - `=== LOGIN DEBUG ===`
   - `Received password length: X`
   - `Expected password length: X`
   - `Passwords match: true/false`

## ✅ Co by mělo fungovat:

1. Zadejte heslo
2. Klikněte "Přihlásit se"
3. Měli byste být přesměrováni na `/admin-secret-2024`
4. Měli byste vidět CMS s články

Pokud to stále nefunguje, zkontrolujte:
- Serverové logy v Vercel
- Cookies v Developer Tools
- Console v prohlížeči
