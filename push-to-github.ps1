# Skript pro pushnutí kódu na GitHub
# Nahraďte VASE_UZIVATELSKE_JMENO a bmi-calculator vašimi údaji

Write-Host "Přidávám remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/bmi-calculator.git

Write-Host "Přejmenovávám branch na main..." -ForegroundColor Yellow
git branch -M main

Write-Host "Pushuji kód na GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "Hotovo! Váš kód je nyní na GitHubu." -ForegroundColor Green
