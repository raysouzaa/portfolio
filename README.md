# Portfólio

Site pessoal em Next.js 16 (App Router), Tailwind CSS 4 e Motion.
Identidade visual "Encontro das águas": duas correntes que correm lado a lado sem se misturar.

## Onde editar

Todo o conteúdo fica em **`src/content/perfil.ts`**: nome, textos, projetos, experiências, formação, ferramentas e contatos.
Procure por `PREENCHER` para ver o que ainda falta.

- **Foto:** coloque o arquivo em `public/` (ex.: `public/foto.jpg`) e defina `foto: "/foto.jpg"`.
- **GitHub:** preencha `github: "seu-usuario"`. Os repositórios públicos aparecem sozinhos (sem forks e arquivados) e são atualizados a cada hora. Use `githubOcultar` para esconder algum.
- **Projetos:** cada item do array `projetos` vira uma aba na seção Projetos. `link` é opcional.

## Rodar localmente

```bash
npm install
npm run dev
# http://localhost:3000
```

## Publicar no servidor

Mesmo esquema do glam-financas-mais: o site escuta só em `127.0.0.1:3010` e o Caddy do servidor cuida do domínio e do HTTPS.
Produção: `https://portifolio.vyrasolutions.com.br`, na pasta `/var/www/html/portifolio`.

1. **DNS:** crie um registro A `portifolio` apontando para o IP do servidor (igual ao `glamfinancasmais`).
2. **Código e contêiner:**
   ```bash
   sudo mkdir -p /var/www/html/portifolio && sudo chown "$USER" /var/www/html/portifolio
   git clone https://github.com/raysouzaa/portifolio.git /var/www/html/portifolio
   cd /var/www/html/portifolio
   docker compose up -d --build
   curl -I http://127.0.0.1:3010
   ```
3. **Caddy:** acrescente ao `/etc/caddy/Caddyfile`
   ```
   portifolio.vyrasolutions.com.br {
       encode gzip zstd
       reverse_proxy 127.0.0.1:3010
   }
   ```
   e rode `sudo caddy validate --config /etc/caddy/Caddyfile && sudo systemctl reload caddy`.

**Atualizar depois:** `cd /var/www/html/portifolio && git pull && docker compose up -d --build`.

Opcional: defina `GITHUB_TOKEN` (um token sem nenhuma permissão já basta) num arquivo `.env` ao lado do `docker-compose.yml`
para não esbarrar no limite de 60 requisições/hora da API do GitHub.

### Sem Docker

```bash
npm ci
npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
PORT=3000 node .next/standalone/server.js
```

## Estrutura

```
src/
  app/
    layout.tsx        metadados e fonte
    page.tsx          todas as seções
    globals.css       paleta e tipografia
  components/
    Correntes.tsx     canvas animado do topo (respeita "reduzir movimento")
    Hero.tsx          abertura
    Projetos.tsx      seletor de projetos (mouse e teclado)
    Repositorios.tsx  repositórios do GitHub
    Navegacao.tsx, CopiarEmail.tsx, Grafismo.tsx
  content/
    perfil.ts         << todo o conteúdo
```
