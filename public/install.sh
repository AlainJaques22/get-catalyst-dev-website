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

echo "Downloading init-multi-db.sh..."
curl -fsSL "$BASE_URL/downloads/init-multi-db.sh" -o init-multi-db.sh
chmod +x init-multi-db.sh

echo ""
echo "Pulling latest images..."
docker compose pull

echo ""
echo "Starting Catalyst Studio..."
docker compose up -d

# Wait for Caddy to be ready
echo ""
echo "Waiting for services to start (this may take a few minutes — all is fine)..."
MAX_WAIT=300
ELAPSED=0
until curl -sf http://localhost > /dev/null 2>&1; do
  if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo ""
    echo "Services are taking longer than expected — check logs below for details."
    break
  fi
  printf "."
  sleep 3
  ELAPSED=$((ELAPSED + 3))
done

echo ""
echo ""
echo "Catalyst Studio is ready! Opening http://localhost ..."
echo "Streaming logs below — press Ctrl+C to stop following (the stack keeps running)."
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost
else
  xdg-open http://localhost 2>/dev/null || true
fi

docker compose logs -f
