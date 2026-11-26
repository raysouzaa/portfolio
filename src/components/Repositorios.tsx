import { cacheLife } from "next/cache";
import { perfil } from "@/content/perfil";
import { Grupo, Item } from "./Animacoes";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const CORES_LINGUAGEM: Record<string, string> = {
  TypeScript: "#7ab0a3",
  JavaScript: "#e2c48f",
  PHP: "#a98bb5",
  Python: "#c8a15f",
  "C#": "#9cc59a",
  Blade: "#d98f6a",
  Vue: "#7fc4a0",
  Shell: "#8ba39a",
};

// Busca os repositórios públicos e guarda por algumas horas.
// Para mais limite de requisições, defina GITHUB_TOKEN no ambiente.
async function buscarRepos(usuario: string): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");
  if (!usuario) return [];
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(usuario)}/repos?sort=pushed&per_page=30`,
      { headers, signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return [];
    const dados = (await res.json()) as Repo[];
    return dados
      .filter((r) => !r.fork && !r.archived && !perfil.githubOcultar.includes(r.name))
      .slice(0, 8);
  } catch {
    return [];
  }
}

const formatarData = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(iso));

export default async function Repositorios() {
  const repos = await buscarRepos(perfil.github);

  if (repos.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <p className="rounded-md border border-dashed border-margem p-6 text-musgo">
        Os repositórios aparecem aqui quando o campo <code className="text-nevoa">github</code> estiver preenchido em{" "}
        <code className="text-nevoa">src/content/perfil.ts</code>. Esta nota só aparece em desenvolvimento.
      </p>
    );
  }

  return (
    <div>
      <Grupo as="ul" intervalo={0.06} className="grid border-t border-margem md:grid-cols-2">
        {repos.map((r, i) => (
          <Item
            as="li"
            key={r.name}
            className={`border-b border-margem ${i % 2 === 0 ? "md:border-r md:pr-8" : "md:pl-8"}`}
          >
            <a href={r.html_url} target="_blank" rel="noreferrer" className="group block py-6">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-lg font-semibold text-nevoa transition-colors group-hover:text-sedimento-claro">
                  {r.name}
                </span>
                {r.stargazers_count > 0 && (
                  <span className="shrink-0 text-sm tabular-nums text-musgo">
                    {r.stargazers_count} {r.stargazers_count === 1 ? "estrela" : "estrelas"}
                  </span>
                )}
              </span>
              {r.description && (
                <span className="mt-1.5 block max-w-prose leading-relaxed text-nevoa/70">{r.description}</span>
              )}
              <span className="mt-3 flex items-center gap-4 text-sm text-musgo">
                {r.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ background: CORES_LINGUAGEM[r.language] ?? "#8ba39a" }}
                    />
                    {r.language}
                  </span>
                )}
                <span>Atualizado em {formatarData(r.pushed_at)}</span>
              </span>
            </a>
          </Item>
        ))}
      </Grupo>
      <a
        href={`https://github.com/${perfil.github}`}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block font-semibold text-sedimento underline decoration-sedimento/40 underline-offset-4 hover:decoration-sedimento"
      >
        Ver perfil completo no GitHub
      </a>
    </div>
  );
}
