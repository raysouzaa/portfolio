#!/usr/bin/env bash
# Publica a versão mais recente do main neste servidor. Roda NO SERVIDOR, na pasta do projeto.
# É o mesmo script usado à mão e pela pipeline do GitHub Actions (.github/workflows/deploy.yml).
#
# Passos: git pull → build → recria o contêiner → teste de saúde.
# Se o build falhar, o contêiner antigo continua no ar.
set -euo pipefail

cd "$(dirname "$0")/.."

# Um deploy por vez.
exec 9> /tmp/portifolio-deploy.lock
flock -n 9 || { echo "Já existe um deploy em andamento." >&2; exit 1; }

antes="$(git rev-parse --short HEAD)"
git fetch --quiet origin main
git merge --ff-only --quiet origin/main
depois="$(git rev-parse --short HEAD)"
echo "==> Código: $antes → $depois"

echo "==> Build"
docker compose build --quiet

echo "==> Recriando contêiner"
docker compose up -d --force-recreate portfolio

echo "==> Teste de saúde"
codigo=000
for _ in $(seq 1 15); do
  codigo="$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3010/ || true)"
  [[ "$codigo" == "200" ]] && break
  sleep 2
done
[[ "$codigo" == "200" ]] || { echo "ERRO: o site respondeu $codigo depois do deploy." >&2; exit 1; }

docker image prune -f > /dev/null
echo "==> Publicado: $depois ($(git log -1 --format=%s))"
