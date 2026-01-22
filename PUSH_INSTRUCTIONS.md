# Instrukce pro pushnutí na GitHub

## Rychlý postup:

### 1. Vytvořte repository na GitHub.com
- Jděte na https://github.com/new
- Název: `bmi-calculator`
- **NEPŘIDÁVEJTE** README, .gitignore, licenci
- Klikněte "Create repository"

### 2. Zkopírujte URL vašeho repozitáře
Např: `https://github.com/VASE_UZIVATELSKE_JMENO/bmi-calculator.git`

### 3. Spusťte tyto příkazy v PowerShell:

```powershell
# Nahraďte URL vaším repozitářem
git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/bmi-calculator.git
git branch -M main
git push -u origin main
```

### 4. Pokud budete požádáni o přihlášení:
- **Uživatelské jméno**: Vaše GitHub uživatelské jméno
- **Heslo**: Použijte **Personal Access Token** (ne heslo!)

#### Jak vytvořit Personal Access Token:
1. GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Vyberte oprávnění: `repo` (plný přístup)
5. Zkopírujte token a použijte ho jako heslo

---

## Alternativní způsob (pokud máte SSH klíč):

```powershell
git remote add origin git@github.com:VASE_UZIVATELSKE_JMENO/bmi-calculator.git
git branch -M main
git push -u origin main
```

---

## Co je připraveno k pushnutí:

✅ 3 commity s celým projektem
✅ BMI kalkulačka s volbou pohlaví
✅ Blog sekce
✅ CMS systém
✅ Rich text editor s nahráváním obrázků
✅ Google AdSense banner
✅ SEO optimalizace
