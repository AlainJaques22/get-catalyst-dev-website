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
echo "Starting Catalyst Studio (press Ctrl+C to stop)..."
echo "Once services are running, open your browser at: http://localhost"
echo ""
docker compose up
