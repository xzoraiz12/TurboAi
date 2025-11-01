# TurboNotes.AI - EAS Build Fix Script for Windows
# This script clears caches and fixes common Windows EAS build issues

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "TurboNotes.AI EAS Build Fix" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear EAS cache
Write-Host "[1/4] Clearing EAS CLI cache..." -ForegroundColor Yellow
$easCachePath = "$env:LOCALAPPDATA\Temp\eas-cli-nodejs"
if (Test-Path $easCachePath) {
    Remove-Item -Path $easCachePath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ EAS cache cleared" -ForegroundColor Green
} else {
    Write-Host "✓ No EAS cache found" -ForegroundColor Green
}

# Step 2: Clear npm cache
Write-Host "[2/4] Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force | Out-Null
Write-Host "✓ npm cache cleared" -ForegroundColor Green

# Step 3: Check for locked files
Write-Host "[3/4] Checking for locked files..." -ForegroundColor Yellow
$nodeModulesPath = ".\node_modules"
if (Test-Path $nodeModulesPath) {
    Write-Host "⚠ node_modules directory exists" -ForegroundColor Yellow
    Write-Host "  If you have permission issues, you may need to delete it manually" -ForegroundColor Yellow
} else {
    Write-Host "✓ No node_modules found" -ForegroundColor Green
}

# Step 4: Clear Expo cache
Write-Host "[4/4] Clearing Expo cache..." -ForegroundColor Yellow
if (Test-Path ".\.expo") {
    Remove-Item -Path ".\.expo" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Expo cache cleared" -ForegroundColor Green
} else {
    Write-Host "✓ No Expo cache found" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Fix Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Close this terminal" -ForegroundColor White
Write-Host "2. Close your IDE (VS Code, Cursor, etc.)" -ForegroundColor White
Write-Host "3. Close any file explorers with the project open" -ForegroundColor White
Write-Host "4. Reopen terminal and run: npx eas-cli build -p android --profile preview" -ForegroundColor White
Write-Host ""

# Optional: Ask if user wants to rebuild now
$rebuild = Read-Host "Would you like to run EAS build now? (y/n)"
if ($rebuild -eq 'y' -or $rebuild -eq 'Y') {
    Write-Host ""
    Write-Host "Starting EAS build..." -ForegroundColor Cyan
    npx eas-cli build -p android --profile preview
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

