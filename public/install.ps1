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

# Download files
Write-Host "Downloading docker-compose.yml..."
Invoke-WebRequest -Uri "$baseUrl/downloads/docker-compose.yml" -OutFile "docker-compose.yml"

Write-Host "Downloading catalyst.config.json..."
Invoke-WebRequest -Uri "$baseUrl/downloads/catalyst.config.json" -OutFile "catalyst.config.json"

Write-Host "Downloading init-multi-db.sh..."
Invoke-WebRequest -Uri "$baseUrl/downloads/init-multi-db.sh" -OutFile "init-multi-db.sh"

Write-Host ""
Write-Host "Starting Catalyst Studio..."
docker compose up -d

# Wait for Camunda to be ready (slowest service)
Write-Host ""
Write-Host "Waiting for services to start (this may take a minute)..."
$maxWait = 120
$elapsed = 0
while ($elapsed -lt $maxWait) {
  try {
    $response = Invoke-WebRequest -Uri "http://localhost:8090/engine-rest/engine" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    if ($response.StatusCode -eq 200) { break }
  } catch {}
  Write-Host -NoNewline "."
  Start-Sleep -Seconds 3
  $elapsed += 3
}

Write-Host ""
Write-Host ""

if ($elapsed -ge $maxWait) {
  Write-Host "Services are taking longer than expected."
  Write-Host "Check status with: docker compose ps"
  Write-Host "Then visit http://localhost when ready."
  exit 0
}

Write-Host "Catalyst Studio is ready!"
Write-Host ""
Start-Process "http://localhost"
