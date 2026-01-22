# Generování jednoduššího hesla bez speciálních znaků (pro snadnější kopírování)

Write-Host "`n=== Generování jednoduššího hesla ===" -ForegroundColor Cyan
Write-Host ""

# Generování hesla bez speciálních znaků (pouze písmena a čísla)
$passwordChars = (65..90) + (97..122) + (48..57)
$password = -join ($passwordChars | Get-Random -Count 20 | ForEach-Object {[char]$_})

# Generování JWT secret
$jwtChars = (65..90) + (97..122) + (48..57)
$jwtSecret = -join ($jwtChars | Get-Random -Count 40 | ForEach-Object {[char]$_})

Write-Host "ADMIN_PASSWORD (bez speciálních znaků):" -ForegroundColor Yellow
Write-Host $password -ForegroundColor Green
Write-Host ""
Write-Host "JWT_SECRET:" -ForegroundColor Yellow
Write-Host $jwtSecret -ForegroundColor Green
Write-Host ""

Write-Host "=== Pro Vercel ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "ADMIN_PASSWORD=$password" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host ""
