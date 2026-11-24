#!/usr/bin/env bash
# Update situs setelah ada perubahan di GitHub.
# Pemakaian:  bash deploy/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> git pull"
git pull

echo "==> install dependencies"
npm ci

echo "==> build (static export)"
npm run build

echo "==> salin hasil build ke webroot"
mkdir -p /var/www/hari-guru
rm -rf /var/www/hari-guru/*
cp -r out/. /var/www/hari-guru/

echo "==> selesai — situs sudah ter-update"
