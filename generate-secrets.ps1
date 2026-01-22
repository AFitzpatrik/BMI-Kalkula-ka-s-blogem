# Skript pro generování silného hesla a JWT secret

Write-Host "`n=== Generování bezpečnostních klíčů ===" -ForegroundColor Cyan
Write-Host ""

# Generování silného hesla (24 znaků: písmena, čísla, symboly)
$passwordChars = (65..90) + (97..122) + (48..57) + (33,35,36,37,38,42,43,45,61,63,64)
$password = -join ($passwordChars | Get-Random -Count 24 | ForEach-Object {[char]$_})

# Generování JWT secret (40 znaků: písmena, čísla)
$jwtChars = (65..90) + (97..122) + (48..57)
$jwtSecret = -join ($jwtChars | Get-Random -Count 40 | ForEach-Object {[char]$_})

Write-Host "ADMIN_PASSWORD (silné heslo pro CMS):" -ForegroundColor Yellow
Write-Host $password -ForegroundColor Green
Write-Host ""
Write-Host "JWT_SECRET (pro podepisování tokenů):" -ForegroundColor Yellow
Write-Host $jwtSecret -ForegroundColor Green
Write-Host ""

Write-Host "=== Pro lokální vývoj (.env.local) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "ADMIN_PASSWORD=$password" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host ""

Write-Host "=== Pro Vercel (Environment Variables) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Nastavte tyto hodnoty v Vercel:" -ForegroundColor Yellow
Write-Host "  Name: ADMIN_PASSWORD" -ForegroundColor White
Write-Host "  Value: $password" -ForegroundColor Green
Write-Host ""
Write-Host "  Name: JWT_SECRET" -ForegroundColor White
Write-Host "  Value: $jwtSecret" -ForegroundColor Green
Write-Host ""

Write-Host "⚠️  DŮLEŽITÉ: Uložte si tyto hodnoty na bezpečné místo!" -ForegroundColor Red
Write-Host "⚠️  Pokud je ztratíte, budete muset vygenerovat nové." -ForegroundColor Red
Write-Host ""
