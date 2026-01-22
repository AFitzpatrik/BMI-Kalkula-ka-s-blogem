# Nastavení GitHub Repository

## Krok 1: Vytvoření repository na GitHubu

1. Jděte na [GitHub.com](https://github.com) a přihlaste se
2. Klikněte na tlačítko **"+"** v pravém horním rohu a vyberte **"New repository"**
3. Vyplňte:
   - **Repository name**: `bmi-calculator` (nebo jakýkoliv jiný název)
   - **Description**: "BMI Kalkulačka s blogem a CMS systémem"
   - **Visibility**: Public nebo Private (podle vašeho výběru)
   - **NEPŘIDÁVEJTE** README, .gitignore nebo licenci (už máme)
4. Klikněte na **"Create repository"**

## Krok 2: Připojení lokálního repozitáře k GitHubu

Po vytvoření repozitáře na GitHubu zkopírujte URL (např. `https://github.com/VASE_UZIVATELSKE_JMENO/bmi-calculator.git`)

Poté spusťte v terminálu:

```bash
git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/bmi-calculator.git
git branch -M main
git push -u origin main
```

## Alternativní způsob (pokud máte SSH klíč nastavený):

```bash
git remote add origin git@github.com:VASE_UZIVATELSKE_JMENO/bmi-calculator.git
git branch -M main
git push -u origin main
```

## Poznámky

- Pokud budete požádáni o přihlášení, použijte GitHub Personal Access Token místo hesla
- Token můžete vytvořit v GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Potřebujete oprávnění: `repo` (plný přístup k repozitářům)

## Co bylo commitnuto:

✅ Všechny soubory projektu
✅ BMI kalkulačka s volbou pohlaví
✅ Blog sekce
✅ CMS systém (neveřejný URL: /admin-secret-2024)
✅ Rich text editor s nahráváním obrázků
✅ Google AdSense banner
✅ SEO optimalizace
✅ Deployment konfigurace
