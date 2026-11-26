"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projetos } from "@/content/perfil";

export default function Projetos() {
  const [ativo, setAtivo] = useState(0);
  const reduzir = useReducedMotion();
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const p = projetos[ativo];

  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    const teclas: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let prox: number | null = null;
    if (e.key in teclas) prox = (ativo + teclas[e.key] + projetos.length) % projetos.length;
    if (e.key === "Home") prox = 0;
    if (e.key === "End") prox = projetos.length - 1;
    if (prox === null) return;
    e.preventDefault();
    setAtivo(prox);
    abas.current[prox]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
      <div
        role="tablist"
        aria-label="Projetos"
        aria-orientation="vertical"
        onKeyDown={aoTeclar}
        className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {projetos.map((proj, i) => {
          const sel = i === ativo;
          return (
            <button
              key={proj.slug}
              ref={(el) => {
                abas.current[i] = el;
              }}
              role="tab"
              id={`aba-${proj.slug}`}
              aria-selected={sel}
              aria-controls="painel-projeto"
              tabIndex={sel ? 0 : -1}
              onClick={() => setAtivo(i)}
              className={`group relative shrink-0 snap-start rounded-full border px-4 py-2 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l lg:py-3 lg:pl-6 lg:pr-2 ${
                sel
                  ? "border-sedimento bg-sedimento/10 text-nevoa lg:border-margem lg:bg-transparent"
                  : "border-nevoa/15 text-nevoa/55 hover:text-nevoa lg:border-margem"
              }`}
            >
              {sel && (
                <motion.span
                  layoutId="marcador-projeto"
                  className="absolute -left-px top-0 hidden h-full w-[3px] bg-sedimento lg:block"
                  transition={reduzir ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
              <span className="block whitespace-nowrap text-base font-semibold lg:whitespace-normal lg:text-lg">
                {proj.nome}
              </span>
              <span className="hidden text-sm text-musgo lg:block">{proj.contexto}</span>
            </button>
          );
        })}
      </div>

      <div
        id="painel-projeto"
        role="tabpanel"
        aria-labelledby={`aba-${p.slug}`}
        tabIndex={0}
        className="min-h-[30rem] focus-visible:outline-offset-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={p.slug}
            initial={reduzir ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-musgo">
              <span>{p.contexto}</span>
              {p.status && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === "Em produção"
                      ? "bg-[#7ab0a3]/15 text-[#a9d3c8]"
                      : "bg-sedimento/15 text-sedimento-claro"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${p.status === "Em produção" ? "bg-[#7ab0a3]" : "bg-sedimento"}`}
                  />
                  {p.status}
                </span>
              )}
            </p>
            <h3 className="secao-titulo mt-3 text-4xl text-nevoa sm:text-5xl">{p.nome}</h3>
            <p className="mt-4 max-w-2xl text-xl leading-snug text-sedimento-claro">{p.resumo}</p>

            <div className="mt-10 grid gap-10 xl:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-musgo">O problema</h4>
                <p className="mt-3 max-w-prose leading-relaxed text-nevoa/85">{p.problema}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-musgo">O que eu fiz</h4>
                <ul className="mt-3 space-y-3">
                  {p.feito.map((f) => (
                    <li key={f} className="relative max-w-prose pl-5 leading-relaxed text-nevoa/85">
                      <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-sedimento" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tecnologias">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-margem bg-mata/60 px-3 py-1 text-sm text-nevoa/80">
                  {s}
                </li>
              ))}
            </ul>

            {p.link && (
              <a
                href={p.link.url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block font-semibold text-sedimento underline decoration-sedimento/40 underline-offset-4 hover:decoration-sedimento"
              >
                {p.link.rotulo}
              </a>
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
