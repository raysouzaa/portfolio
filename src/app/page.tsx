import Image from "next/image";
import { Suspense } from "react";
import Navegacao from "@/components/Navegacao";
import Hero from "@/components/Hero";
import Projetos from "@/components/Projetos";
import Repositorios from "@/components/Repositorios";
import CopiarEmail from "@/components/CopiarEmail";
import Grafismo from "@/components/Grafismo";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import {
  FotoRevelada,
  Grupo,
  Item,
  LinhaDoTempo,
  Moldura,
  Surgir,
  TituloRevelado,
} from "@/components/Animacoes";
import { IconeEmail, IconeGithub, IconeLinkedin, IconeWhatsapp } from "@/components/Icones";
import {
  atuacao,
  conquistas,
  ferramentas,
  formacao,
  linkWhatsapp,
  perfil,
  trajetoria,
  type Experiencia,
} from "@/content/perfil";

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
        <TituloRevelado id={`${id}-titulo`} texto={titulo} className="secao-titulo text-5xl text-nevoa sm:text-6xl" />
        {intro && (
          <Surgir as="p" atraso={0.15} className="mt-5 max-w-2xl text-lg leading-relaxed text-musgo">
            {intro}
          </Surgir>
        )}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

function Marcador() {
  return <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-sedimento" />;
}

function Linha({ itens }: { itens: Experiencia[] }) {
  return (
    <LinhaDoTempo>
      <Grupo as="ol" intervalo={0.16}>
        {itens.map((e) => (
          <Item as="li" lado key={e.titulo + e.lugar} className="relative pb-12 pl-8 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[4px] top-2 size-[9px] rounded-full bg-sedimento ring-4 ring-rio" />
            {e.periodo && <p className="text-sm tabular-nums text-musgo">{e.periodo}</p>}
            <h4 className="mt-1 text-xl font-semibold text-nevoa">{e.titulo}</h4>
            <p className="text-sedimento-claro">{e.lugar}</p>
            {e.descricao && <p className="mt-3 max-w-prose leading-relaxed text-nevoa/80">{e.descricao}</p>}
            {e.destaques && (
              <ul className="mt-3 space-y-1.5">
                {e.destaques.map((d) => (
                  <li key={d} className="relative pl-5 text-nevoa/75">
                    <Marcador />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </Item>
        ))}
      </Grupo>
    </LinhaDoTempo>
  );
}

const botaoContorno =
  "inline-flex items-center gap-2 rounded-full border border-nevoa/25 px-5 py-2.5 text-sm font-semibold text-nevoa transition-colors hover:border-nevoa hover:bg-nevoa/5";

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
              <Moldura className="absolute inset-0 rounded-sm border border-sedimento/60" />
              <FotoRevelada className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mata">
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
              </FotoRevelada>
            </figure>

            <div>
              <Grupo className="space-y-5 text-lg leading-relaxed text-nevoa/90 sm:text-xl" intervalo={0.12}>
                {perfil.sobre.map((p) => (
                  <Item as="p" key={p.slice(0, 24)} className="max-w-[38rem]">
                    {p}
                  </Item>
                ))}
              </Grupo>
              <Grupo as="dl" className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {atuacao.map((a) => (
                  <Item key={a.termo} className="border-t border-margem pt-4">
                    <dt className="font-semibold text-sedimento-claro">{a.termo}</dt>
                    <dd className="mt-2 leading-relaxed text-nevoa/75">{a.descricao}</dd>
                  </Item>
                ))}
              </Grupo>
            </div>
          </div>
        </Secao>

        <Secao
          id="projetos"
          titulo="Projetos"
          intro="Sistemas para hospital, e-commerce e projetos próprios. Os privados aparecem aqui por alto, sem expor nada de quem confiou o trabalho a mim."
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
              <Surgir as="div">
                <h3 className="mb-8 text-2xl font-semibold text-nevoa">Experiência</h3>
              </Surgir>
              <Linha itens={trajetoria} />
            </div>
            <div>
              <Surgir as="div">
                <h3 className="mb-8 text-2xl font-semibold text-nevoa">Formação</h3>
              </Surgir>
              <Linha itens={formacao} />
              <Surgir as="div">
                <h3 className="mb-6 mt-16 text-2xl font-semibold text-nevoa">Competições e eventos</h3>
              </Surgir>
              <Grupo as="ul" className="space-y-3">
                {conquistas.map((c) => (
                  <Item as="li" lado key={c} className="relative pl-5 leading-relaxed text-nevoa/80">
                    <Marcador />
                    {c}
                  </Item>
                ))}
              </Grupo>
            </div>
          </div>

          <div className="mt-24">
            <Surgir as="div">
              <h3 className="text-2xl font-semibold text-nevoa">Ferramentas</h3>
            </Surgir>
            <Grupo className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3 xl:grid-cols-6" intervalo={0.07}>
              {ferramentas.map((f) => (
                <Item key={f.grupo}>
                  <h4 className="border-b border-margem pb-3 text-sm font-semibold text-musgo">{f.grupo}</h4>
                  <ul className="mt-4 space-y-2 text-nevoa/85">
                    {f.itens.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </Item>
              ))}
            </Grupo>
          </div>
        </Secao>

        <section id="contato" aria-labelledby="contato-titulo" className="bg-mata px-6 py-28 sm:px-10 md:py-40">
          <div className="mx-auto max-w-6xl">
            <TituloRevelado
              id="contato-titulo"
              texto="Vamos tirar o seu sistema do papel?"
              className="secao-titulo max-w-4xl text-5xl text-nevoa sm:text-7xl md:text-8xl"
            />
            <Surgir as="p" atraso={0.2} className="mt-8 max-w-2xl text-xl leading-relaxed text-nevoa/85">
              Da ideia ao servidor: desenvolvo sistemas web, integrações e automações sob medida para hospitais,
              clínicas, escritórios e lojas. Me conte o que você precisa.
            </Surgir>

            <Surgir atraso={0.3} className="mt-12 flex flex-wrap items-center gap-4">
              {linkWhatsapp && (
                <a
                  href={linkWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-sedimento px-8 py-4 text-lg font-semibold text-rio transition-colors hover:bg-sedimento-claro"
                >
                  <IconeWhatsapp className="size-6" />
                  Conversar no WhatsApp
                </a>
              )}
              <a
                href={`mailto:${perfil.email}`}
                className="inline-flex items-center gap-3 rounded-full border border-nevoa/30 px-8 py-4 text-lg font-semibold text-nevoa transition-colors hover:border-nevoa hover:bg-nevoa/5"
              >
                <IconeEmail className="size-6" />
                Enviar e-mail
              </a>
            </Surgir>

            <Surgir
              atraso={0.4}
              className="mt-16 flex flex-col gap-6 border-t border-nevoa/15 pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <a
                href={`mailto:${perfil.email}`}
                className="break-all text-2xl font-bold text-sedimento-claro underline decoration-sedimento/40 decoration-2 underline-offset-[0.2em] transition-colors hover:decoration-sedimento-claro sm:text-3xl"
                style={{ fontStretch: "85%" }}
              >
                {perfil.email}
              </a>
              <div className="flex flex-wrap items-center gap-3">
                <CopiarEmail email={perfil.email} />
                {perfil.linkedin && (
                  <a href={perfil.linkedin} target="_blank" rel="noreferrer" className={botaoContorno}>
                    <IconeLinkedin className="size-4" />
                    LinkedIn
                  </a>
                )}
                {perfil.github && (
                  <a href={`https://github.com/${perfil.github}`} target="_blank" rel="noreferrer" className={botaoContorno}>
                    <IconeGithub className="size-4" />
                    GitHub
                  </a>
                )}
                {linkWhatsapp && (
                  <a href={linkWhatsapp} target="_blank" rel="noreferrer" className={botaoContorno}>
                    <IconeWhatsapp className="size-4" />
                    WhatsApp
                  </a>
                )}
              </div>
            </Surgir>
          </div>
        </section>
      </main>

      <footer className="bg-rio-fundo">
        <Grafismo className="block text-sedimento/35" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-musgo sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="text-nevoa/80">{perfil.nomeCompleto}</p>
            <p className="mt-1">{perfil.rodape}</p>
          </div>
          <ul className="flex items-center gap-2" aria-label="Redes">
            {perfil.linkedin && (
              <li>
                <a href={perfil.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full text-musgo transition-colors hover:bg-nevoa/5 hover:text-nevoa">
                  <IconeLinkedin />
                </a>
              </li>
            )}
            {perfil.github && (
              <li>
                <a href={`https://github.com/${perfil.github}`} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full text-musgo transition-colors hover:bg-nevoa/5 hover:text-nevoa">
                  <IconeGithub />
                </a>
              </li>
            )}
            {linkWhatsapp && (
              <li>
                <a href={linkWhatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full text-musgo transition-colors hover:bg-nevoa/5 hover:text-nevoa">
                  <IconeWhatsapp />
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>
      <BotaoFlutuante />
    </>
  );
}
