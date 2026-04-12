#!/bin/bash
set -e

# Idempotent PostgreSQL multi-database initialization script
# Safe to run on every container restart - will not error if databases already exist

# Create camunda7 database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'camunda7'" | grep -q 1 || \
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "CREATE DATABASE camunda7"

# Create operaton database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'operaton'" | grep -q 1 || \
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "CREATE DATABASE operaton"

echo "✓ Multi-database initialization complete (camunda7, operaton)"
