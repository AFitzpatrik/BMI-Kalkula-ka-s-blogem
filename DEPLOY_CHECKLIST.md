# ✅ Deployment Checklist - Vercel

## 🔐 Bezpečnostní klíče (Uložte si je!)

**ADMIN_PASSWORD:**
```
&-mvBlJ!2sXa?ZT=dxV*kL%c
```

**JWT_SECRET:**
```
6JSEKHPvaFj15Wi42q8OLpDxuoYUAgGXmVIwyNez
```

---

## 📋 Krok za krokem - Deployment na Vercel

### ✅ Krok 1: Připojení GitHub
- [ ] Jít na https://vercel.com
- [ ] Přihlásit se pomocí GitHubu
- [ ] Kliknout "Add New..." → "Project"
- [ ] Vybrat: `AFitzpatrik/BMI-Kalkula-ka-s-blogem`
- [ ] Kliknout "Import"

### ✅ Krok 2: Environment Variables
V sekci "Environment Variables" přidat:

**ADMIN_PASSWORD:**
- [ ] Name: `ADMIN_PASSWORD`
- [ ] Value: `&-mvBlJ!2sXa?ZT=dxV*kL%c`
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development
- [ ] Kliknout "Save"

**JWT_SECRET:**
- [ ] Name: `JWT_SECRET`
- [ ] Value: `6JSEKHPvaFj15Wi42q8OLpDxuoYUAgGXmVIwyNez`
- [ ] Environment: ✅ Production, ✅ Preview, ✅ Development
- [ ] Kliknout "Save"

### ✅ Krok 3: Deploy
- [ ] Zkontrolovat Framework: Next.js (automaticky)
- [ ] Kliknout "Deploy"
- [ ] Počkat na dokončení buildu (1-3 minuty)

### ✅ Krok 4: Ověření
- [ ] Otevřít URL: `https://vase-projekt.vercel.app`
- [ ] Otestovat hlavní stránku
- [ ] Otestovat blog: `/blog`
- [ ] Otestovat CMS login: `/admin-secret-2024/login`
- [ ] Přihlásit se do CMS (heslo: `&-mvBlJ!2sXa?ZT=dxV*kL%c`)

---

## 🎯 Po nasazení

### Testování CMS:
1. URL: `https://vase-projekt.vercel.app/admin-secret-2024/login`
2. Heslo: `&-mvBlJ!2sXa?ZT=dxV*kL%c`
3. Měli byste se přihlásit a vidět CMS

### Co funguje:
- ✅ BMI kalkulačka s volbou pohlaví
- ✅ Blog sekce
- ✅ CMS s autentizací
- ✅ Rich text editor
- ✅ Nahrávání obrázků
- ✅ Reklamní banner (placeholder)
- ✅ SEO optimalizace

---

## 📝 Poznámky

- **Heslo je silné a bezpečné** (24 znaků, mix písmen, čísel, symbolů)
- **JWT_SECRET je bezpečný** (40 znaků)
- Environment variables jsou uloženy bezpečně v Vercel
- Každý push na GitHub automaticky triggeruje nový deploy

---

## ❓ Pokud něco nefunguje

### Build selhává:
- Zkontrolujte build logy v Vercel
- Zkontrolujte, že všechny env variables jsou nastaveny

### Nemůžu se přihlásit:
- Zkontrolujte, že `ADMIN_PASSWORD` je správně zkopírováno
- Zkontrolujte, že `JWT_SECRET` je také nastaveno
- Zkontrolujte, že jste redeployli po změně env variables

---

## 🚀 Jste připraveni!

Vše je připraveno k nasazení. Stačí následovat checklist výše.
