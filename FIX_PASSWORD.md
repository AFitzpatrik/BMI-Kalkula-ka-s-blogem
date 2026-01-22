# 🔧 Oprava problému s heslem

## Problém
Heslo s speciálními znaky může způsobovat problémy při kopírování nebo v environment variables.

## ✅ Řešení - Použijte nové jednodušší heslo

### Nové heslo (bez speciálních znaků):
```
KJRSl0LEt6vpZfmaMuGW
```

### Nový JWT_SECRET:
```
L9YHA8shtnNJgcIMiFDXuZfwyEBkCWTjS612UR0V
```

---

## 📋 Krok za krokem - Oprava v Vercel

### 1. Jděte do Vercel projektu
- Otevřete váš projekt na https://vercel.com
- Klikněte na **Settings** → **Environment Variables**

### 2. Aktualizujte ADMIN_PASSWORD
- Najděte `ADMIN_PASSWORD`
- Klikněte na **Edit** (nebo **Delete** a vytvořte nový)
- **Value**: `KJRSl0LEt6vpZfmaMuGW`
- ⚠️ **DŮLEŽITÉ**: Zkopírujte přesně, bez mezer na začátku nebo konci!
- Klikněte **Save**

### 3. Aktualizujte JWT_SECRET (pokud ještě není nastaven)
- Najděte nebo vytvořte `JWT_SECRET`
- **Value**: `L9YHA8shtnNJgcIMiFDXuZfwyEBkCWTjS612UR0V`
- Klikněte **Save**

### 4. Redeploy aplikace
- Jděte do **Deployments**
- Najděte poslední deployment
- Klikněte na **⋯** (tři tečky) → **Redeploy**
- Nebo pushněte nový commit na GitHub (automaticky se redeployne)

### 5. Otestujte přihlášení
- Jděte na: `https://vase-domena.vercel.app/admin-secret-2024/login`
- Zadejte heslo: `KJRSl0LEt6vpZfmaMuGW`
- Mělo by to fungovat!

---

## ⚠️ Časté chyby

### 1. Mezery na začátku/konci
- ❌ Špatně: ` KJRSl0LEt6vpZfmaMuGW ` (s mezerami)
- ✅ Správně: `KJRSl0LEt6vpZfmaMuGW` (bez mezer)

### 2. Špatné kopírování
- Zkontrolujte, že jste zkopírovali celé heslo
- Zkuste znovu zkopírovat z tohoto souboru

### 3. Environment variable není nastavena
- Zkontrolujte, že `ADMIN_PASSWORD` existuje v Vercel
- Zkontrolujte, že je nastavena pro **Production** environment

### 4. Aplikace nebyla redeploynuta
- Po změně env variables je potřeba redeploy
- Vercel obvykle redeployne automaticky, ale někdy je potřeba manuálně

---

## 🔍 Jak zkontrolovat, že je heslo správně nastaveno

1. V Vercel: **Settings** → **Environment Variables**
2. Klikněte na `ADMIN_PASSWORD`
3. Zkontrolujte hodnotu - měla by být přesně: `KJRSl0LEt6vpZfmaMuGW`
4. Zkontrolujte, že je zaškrtnuté **Production**

---

## 💡 Tipy

- Použijte jednoduché heslo bez speciálních znaků (jako to nové)
- Zkopírujte heslo přímo z tohoto souboru
- Po změně env variable vždy redeploy aplikaci
- Pokud to stále nefunguje, zkuste vytvořit novou env variable (smazat starou a vytvořit novou)

---

## ✅ Po opravě

Měli byste se úspěšně přihlásit do CMS pomocí hesla: `KJRSl0LEt6vpZfmaMuGW`
