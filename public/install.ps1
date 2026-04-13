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
Write-Host "Pulling latest images..."
docker compose pull

Write-Host ""
Write-Host "Starting Catalyst Studio (press Ctrl+C to stop)..."
Write-Host "Once services are running, open your browser at: http://localhost"
Write-Host ""
docker compose up
