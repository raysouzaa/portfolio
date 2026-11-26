# Publicação em produção

Mesmo esquema do glam-financas-mais. O site roda num contêiner que escuta só em `127.0.0.1:3010`, e o Caddy do servidor cuida do domínio e do HTTPS.

- Pasta no servidor: `/var/www/html/portifolio`
- Endereço: `https://meu-portfolio.vyrasolutions.com.br`

## Primeira publicação

1. **DNS:** registro A `meu-portfolio` apontando para o IP do servidor, como DNS only (igual ao `glamfinancasmais`).
2. **Código e contêiner:**
   ```bash
   git clone https://github.com/raysouzaa/portifolio.git /var/www/html/portifolio
   cd /var/www/html/portifolio
   docker compose up -d --build
   curl -I http://127.0.0.1:3010
   ```
3. **Caddy:** acrescente ao `/etc/caddy/Caddyfile`
   ```
   meu-portfolio.vyrasolutions.com.br {
       encode gzip zstd
       reverse_proxy 127.0.0.1:3010
   }

   # endereços antigos: redirecionam para o novo sem perder links
   portifolio.vyrasolutions.com.br, meu-portifolio.vyrasolutions.com.br {
       redir https://meu-portfolio.vyrasolutions.com.br{uri} permanent
   }
   ```
   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile && sudo systemctl reload caddy
   ```

## Atualizar depois

**Automático:** todo push no `main` publica em produção pelo GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)). O andamento aparece na aba *Actions* do repositório, e dá para disparar à mão por lá (*Run workflow*).

**Manual**, no servidor (é o mesmo script que a pipeline roda):

```bash
cd /var/www/html/portifolio && scripts/deploy.sh
```

O script faz `git pull`, build, recria o contêiner e confere se o site responde `200`. Se o build falhar, o contêiner antigo continua no ar.

## Ligar o deploy automático

Feito uma vez só, no servidor, com o mesmo usuário que é dono de `/var/www/html/portifolio`.

**1. Gerar uma chave só para este projeto**

```bash
ssh-keygen -t ed25519 -f ~/portifolio-deploy -N "" -C portifolio-deploy
```

**2. Autorizar a chave com comando forçado**

Com ela só é possível rodar `scripts/deploy.sh`, sem terminal nem encaminhamento de portas:

```bash
echo "command=\"/var/www/html/portifolio/scripts/deploy.sh\",no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-pty $(cat ~/portifolio-deploy.pub)" >> ~/.ssh/authorized_keys
```

**3. Cadastrar os segredos no GitHub**

Em *Settings → Secrets and variables → Actions → New repository secret* do repositório `portifolio`:

| Segredo | Valor |
|---|---|
| `DEPLOY_SSH_KEY` | saída de `cat ~/portifolio-deploy` (a chave **privada**, inteira) |
| `DEPLOY_HOST` | IP ou domínio do servidor (o mesmo do glam) |
| `DEPLOY_USER` | usuário SSH (o mesmo do glam) |
| `DEPLOY_KNOWN_HOSTS` | saída de `ssh-keyscan -t ed25519 <servidor>` (o mesmo do glam) |

Depois de copiar a chave privada para o GitHub, apague-a do servidor:

```bash
rm ~/portifolio-deploy ~/portifolio-deploy.pub
```

**4. Testar**

Em *Actions → Deploy → Run workflow*. Sem os segredos, a pipeline só registra um aviso e não publica nada.

Para desligar o deploy automático, apague a linha `portifolio-deploy` do `~/.ssh/authorized_keys`.

## Opcional: token do GitHub

A seção de repositórios usa a API pública do GitHub (60 requisições por hora sem token). Para folga, crie um token sem nenhuma permissão e ponha num `.env` ao lado do `docker-compose.yml`:

```
GITHUB_TOKEN=ghp_...
```
