$ErrorActionPreference = "Stop"

$installPath = "$HOME\catalyst"
$baseUrl = "https://get-catalyst.dev"

Write-Host ""
Write-Host "Catalyst Studio Installer"
Write-Host "-------------------------"
Write-Host "Installing to: $installPath"
Write-Host ""

# Check Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host "Error: Docker is not installed or not in PATH."
  Write-Host "Please install Docker first: https://docs.docker.com/get-docker/"
  exit 1
}

# Create folder
New-Item -ItemType Directory -Force -Path $installPath | Out-Null
Set-Location $installPath

# Clean up any existing stack (removes DB volumes for a fresh init, preserves user-files/)
if (Test-Path "docker-compose.yml") {
  Write-Host "Removing existing stack..."
  docker compose down -v 2>$null
}

# Download files
# Cloudflare blocks PowerShell's default user agent — set a browser UA for all requests.
$headers = @{"User-Agent" = "Mozilla/5.0"}

Write-Host "Downloading docker-compose.yml..."
Invoke-WebRequest -Uri "$baseUrl/downloads/docker-compose.yml" -UseBasicParsing -Headers $headers -OutFile "docker-compose.yml"

Write-Host "Downloading catalyst.config.json..."
Invoke-WebRequest -Uri "$baseUrl/downloads/catalyst.config.json" -UseBasicParsing -Headers $headers -OutFile "catalyst.config.json"

Write-Host "Downloading init-multi-db.sh..."
Invoke-WebRequest -Uri "$baseUrl/downloads/init-multi-db.sh" -UseBasicParsing -Headers $headers -OutFile "init-multi-db.sh"

Write-Host ""
Write-Host "Pulling latest images..."
docker compose pull

Write-Host ""
Write-Host "Starting Catalyst Studio..."
docker compose up -d

# Wait for Caddy to be ready
Write-Host ""
Write-Host "Waiting for services to start (this may take a few minutes - all is fine, please be patient)..."
$maxWait = 300
$elapsed = 0
$ready = $false
while ($elapsed -lt $maxWait) {
  try {
    $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    if ($response.StatusCode -eq 200) { $ready = $true; break }
  } catch {}
  Write-Host -NoNewline "."
  Start-Sleep -Seconds 3
  $elapsed += 3
}

Write-Host ""
Write-Host ""

if (-not $ready) {
  Write-Host "Services are taking longer than expected — check logs below for details."
}

Write-Host "Catalyst Studio is ready! Opening http://localhost ..."
Write-Host "Streaming logs below — press Ctrl+C to stop following (the stack keeps running)."
Write-Host ""
Start-Process "http://localhost"
docker compose logs -f
