import Image from "next/image";
import { Suspense } from "react";
import Navegacao from "@/components/Navegacao";
import Hero from "@/components/Hero";
import Projetos from "@/components/Projetos";
import Repositorios from "@/components/Repositorios";
import CopiarEmail from "@/components/CopiarEmail";
import Grafismo from "@/components/Grafismo";
import { atuacao, conquistas, ferramentas, formacao, perfil, trajetoria, type Experiencia } from "@/content/perfil";

function Secao({
  id,
  titulo,
  intro,
  children,
  className = "",
}: {
  id: string;
  titulo: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`px-6 py-24 sm:px-10 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <h2 id={`${id}-titulo`} className="secao-titulo text-5xl text-nevoa sm:text-6xl">
          {titulo}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-musgo">{intro}</p>}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

function Linha({ itens }: { itens: Experiencia[] }) {
  return (
    <ol className="relative border-l border-margem">
      {itens.map((e) => (
        <li key={e.titulo + e.lugar} className="relative pb-12 pl-8 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-sedimento ring-4 ring-rio" />
          {e.periodo && <p className="text-sm tabular-nums text-musgo">{e.periodo}</p>}
          <h4 className="mt-1 text-xl font-semibold text-nevoa">{e.titulo}</h4>
          <p className="text-sedimento-claro">{e.lugar}</p>
          {e.descricao && <p className="mt-3 max-w-prose leading-relaxed text-nevoa/80">{e.descricao}</p>}
          {e.destaques && (
            <ul className="mt-3 space-y-1.5">
              {e.destaques.map((d) => (
                <li key={d} className="relative pl-5 text-nevoa/75">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-sedimento" />
                  {d}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  const inicial = perfil.nome.trim().charAt(0);

  return (
    <>
      <Navegacao />
      <main>
        <Hero />

        <Secao id="sobre" titulo="Sobre" className="bg-rio-fundo">
          <div className="grid gap-14 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-20">
            <figure className="relative mx-auto w-full max-w-xs self-start md:mx-0 md:max-w-none">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-sedimento/60" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mata">
                {perfil.foto ? (
                  <Image
                    src={perfil.foto}
                    alt={`Foto de ${perfil.nomeCompleto}`}
                    fill
                    sizes="(min-width: 768px) 22rem, 80vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="display text-[10rem] text-sedimento/70">{inicial}</span>
                  </div>
                )}
              </div>
            </figure>

            <div>
              <div className="space-y-5 text-xl leading-relaxed text-nevoa/90">
                {perfil.sobre.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[38rem]">
                    {p}
                  </p>
                ))}
              </div>
              <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {atuacao.map((a) => (
                  <div key={a.termo} className="border-t border-margem pt-4">
                    <dt className="font-semibold text-sedimento-claro">{a.termo}</dt>
                    <dd className="mt-2 leading-relaxed text-nevoa/75">{a.descricao}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Secao>

        <Secao
          id="projetos"
          titulo="Projetos"
          intro="Boa parte do que construo roda dentro de um hospital, então o código não é público. Aqui está o problema, o que eu fiz e com quais ferramentas."
        >
          <Projetos />
        </Secao>

        <Secao
          id="codigo"
          titulo="No GitHub"
          intro="Repositórios públicos, atualizados automaticamente."
          className="bg-rio-fundo"
        >
          <Suspense fallback={<p className="text-musgo">Carregando repositórios…</p>}>
            <Repositorios />
          </Suspense>
        </Secao>

        <Secao id="trajetoria" titulo="Trajetória">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-nevoa">Experiência</h3>
              <Linha itens={trajetoria} />
            </div>
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-nevoa">Formação</h3>
              <Linha itens={formacao} />
              <h3 className="mb-6 mt-16 text-2xl font-semibold text-nevoa">Competições e eventos</h3>
              <ul className="space-y-3">
                {conquistas.map((c) => (
                  <li key={c} className="relative pl-5 leading-relaxed text-nevoa/80">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-sedimento" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-semibold text-nevoa">Ferramentas</h3>
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3 xl:grid-cols-6">
              {ferramentas.map((f) => (
                <div key={f.grupo}>
                  <h4 className="border-b border-margem pb-3 text-sm font-semibold text-musgo">{f.grupo}</h4>
                  <ul className="mt-4 space-y-2 text-nevoa/85">
                    {f.itens.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Secao>

        <section id="contato" aria-labelledby="contato-titulo" className="bg-mata px-6 py-28 sm:px-10 md:py-40">
          <div className="mx-auto max-w-6xl">
            <h2 id="contato-titulo" className="secao-titulo max-w-4xl text-5xl text-nevoa sm:text-7xl">
              Tem um sistema que precisa conversar com outro?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-nevoa/80">
              Atendo projetos de desenvolvimento, integração de sistemas e gestão de TI. Conte o que você precisa por e-mail.
            </p>
            <a
              href={`mailto:${perfil.email}`}
              className="mt-12 inline-block break-all text-[clamp(1.6rem,5vw,3.5rem)] font-bold text-sedimento-claro underline decoration-sedimento/40 decoration-2 underline-offset-[0.2em] transition-colors hover:decoration-sedimento-claro"
              style={{ fontStretch: "85%" }}
            >
              {perfil.email}
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CopiarEmail email={perfil.email} />
              {perfil.linkedin && (
                <a href={perfil.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-nevoa/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-nevoa hover:bg-nevoa/5">
                  LinkedIn
                </a>
              )}
              {perfil.github && (
                <a href={`https://github.com/${perfil.github}`} target="_blank" rel="noreferrer" className="rounded-full border border-nevoa/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-nevoa hover:bg-nevoa/5">
                  GitHub
                </a>
              )}
              {perfil.whatsapp && (
                <a href={`https://wa.me/${perfil.whatsapp}`} target="_blank" rel="noreferrer" className="rounded-full border border-nevoa/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-nevoa hover:bg-nevoa/5">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-rio-fundo">
        <Grafismo className="block text-sedimento/35" />
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-musgo sm:flex-row sm:justify-between sm:px-10">
          <p>{perfil.nomeCompleto}</p>
          <p>Feito em Belém do Pará</p>
        </div>
      </footer>
    </>
  );
}
