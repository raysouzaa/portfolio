# syntax=docker/dockerfile:1

# ---- build: instala dependências e gera a saída standalone ----
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
# GITHUB_TOKEN é opcional: aumenta o limite da API do GitHub no build
ARG GITHUB_TOKEN
RUN GITHUB_TOKEN=$GITHUB_TOKEN npm run build && mkdir -p public

# ---- runtime enxuto: Node do Alpine sem npm, npx, yarn e corepack ----
FROM node:22-alpine AS runtime-base
RUN rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx \
           /usr/local/bin/corepack /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-* \
           /usr/local/include /usr/local/share/doc /usr/local/share/man /root/.npm /tmp/* \
 && addgroup -S app -g 1001 && adduser -S app -u 1001 -G app

# Achata tudo numa camada só, para os arquivos apagados acima não pesarem.
FROM scratch
COPY --from=runtime-base / /
ENV PATH=/usr/local/bin:/usr/bin:/bin \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
CMD ["node", "server.js"]
