#!/bin/bash
set -e

INSTALL_DIR="$HOME/catalyst"
BASE_URL="https://get-catalyst.dev"

echo ""
echo "Catalyst Studio Installer"
echo "-------------------------"
echo "Installing to: $INSTALL_DIR"
echo ""

# Check Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Error: Docker is not installed or not in PATH."
  echo "Please install Docker first: https://docs.docker.com/get-docker/"
  exit 1
fi

# Create folder
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# Download files
echo "Downloading docker-compose.yml..."
curl -fsSL "$BASE_URL/downloads/docker-compose.yml" -o docker-compose.yml

echo "Downloading catalyst.config.json..."
curl -fsSL "$BASE_URL/downloads/catalyst.config.json" -o catalyst.config.json

echo ""
echo "Starting Catalyst Studio..."
docker compose up -d

# Wait for Camunda to be ready (slowest service)
echo ""
echo "Waiting for services to start (this may take a minute)..."
MAX_WAIT=120
ELAPSED=0
until curl -sf http://localhost:8090/engine-rest/engine > /dev/null 2>&1; do
  if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo ""
    echo "Services are taking longer than expected."
    echo "Check status with: docker compose ps"
    echo "Then visit http://localhost when ready."
    exit 0
  fi
  printf "."
  sleep 3
  ELAPSED=$((ELAPSED + 3))
done

echo ""
echo ""
echo "Catalyst Studio is ready!"
echo ""

# Open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost
else
  xdg-open http://localhost 2>/dev/null || echo "Open your browser and go to: http://localhost"
fi
