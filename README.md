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

Passo a passo completo em [DEPLOY.md](DEPLOY.md): DNS, Caddy, deploy automático a cada push no `main` e atualização manual (`scripts/deploy.sh`).

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
