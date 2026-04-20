#!/bin/bash
# Self-heal CRLF: if this file was downloaded on Windows it may have \r\n line endings.
# Detect that, write a clean copy, and re-exec so bash runs the corrected version.
if grep -ql $'\r' "$0" 2>/dev/null; then
  tmp=$(mktemp)
  sed 's/\r//' "$0" > "$tmp" && exec bash "$tmp" "$@"
fi
set -e

# Idempotent PostgreSQL multi-database initialization script
# Safe to run on every container restart - will not error if databases already exist

# Create camunda7 database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'camunda7'" | grep -q 1 || \
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d postgres -c "CREATE DATABASE camunda7"

# Create operaton database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'operaton'" | grep -q 1 || \
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d postgres -c "CREATE DATABASE operaton"

echo "✓ Multi-database initialization complete (camunda7, operaton)"
