# Nastavení automatického deploye z GitHubu

## ✅ Vercel automaticky deployuje po každém pushi!

Vercel má automatické deploymenty **ve výchozím nastavení**. Pokud to nefunguje, zkontrolujte:

## 🔍 Kontrola nastavení

### 1. Zkontrolujte GitHub Integration

1. Jděte do vašeho projektu na **Vercel**
2. Klikněte na **Settings** → **Git**
3. Měli byste vidět:
   - **Production Branch**: `main` (nebo `master`)
   - **Auto-deploy**: ✅ **Enabled**

### 2. Pokud Auto-deploy není zapnutý:

1. V **Settings** → **Git**
2. Najděte sekci **"Production Branch"**
3. Ujistěte se, že **"Auto-deploy"** je zapnuté (✅)
4. Pokud není, klikněte na přepínač

### 3. Zkontrolujte GitHub Webhook

Vercel automaticky vytváří webhook v GitHubu. Zkontrolujte:

1. Jděte na **GitHub** → váš repository
2. **Settings** → **Webhooks**
3. Měli byste vidět webhook od Vercel
4. Pokud není, Vercel ho vytvoří při prvním importu projektu

## 🚀 Jak to funguje

- **Push na `main` branch** → automaticky deploy na Production
- **Push na jinou branch** → automaticky deploy na Preview
- **Pull Request** → automaticky deploy na Preview

## ✅ Ověření

Po pushi na GitHub:

1. Jděte do **Vercel** → váš projekt
2. Klikněte na **Deployments**
3. Měli byste vidět nový deployment s:
   - **Status**: Building → Ready
   - **Source**: Git Commit
   - **Commit**: váš commit message

## 🔧 Pokud to nefunguje

### Možnost 1: Reconnect GitHub

1. Vercel → **Settings** → **Git**
2. Klikněte **"Disconnect"** u GitHubu
3. Pak **"Connect Git Repository"** znovu
4. Vyberte váš repository
5. Klikněte **"Import"**

### Možnost 2: Zkontrolujte GitHub Permissions

1. GitHub → **Settings** → **Applications** → **Authorized OAuth Apps**
2. Najděte **Vercel**
3. Zkontrolujte, že má přístup k vašemu repository

### Možnost 3: Manuální trigger

Pokud automatický deploy nefunguje, můžete manuálně:

1. Vercel → **Deployments**
2. Klikněte **"Redeploy"** u posledního deploymentu
3. Nebo použijte **"Deploy"** tlačítko

## 📝 Poznámky

- Deployment obvykle trvá 1-3 minuty
- Můžete sledovat progress v **Deployments** sekci
- Po dokončení se automaticky aktualizuje produkční URL

## ✅ Test

Zkuste udělat malou změnu a pushnout:

```bash
git commit --allow-empty -m "Test auto-deploy"
git push
```

Pak zkontrolujte Vercel Deployments - měl by se automaticky vytvořit nový deployment!
