"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { projetos } from "@/content/perfil";

export default function Projetos() {
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [limites, setLimites] = useState({ inicio: true, fim: false });
  const arrasto = useRef({ ativo: false, x: 0, scroll: 0, moveu: false });

  const medir = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgresso(max > 0 ? el.scrollLeft / max : 0);
    setLimites({ inicio: el.scrollLeft < 8, fim: el.scrollLeft > max - 8 });
    const cartoes = Array.from(el.children) as HTMLElement[];
    const base = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
    let idx = 0;
    let menor = Infinity;
    cartoes.forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - base);
      if (d < menor) {
        menor = d;
        idx = i;
      }
    });
    setAtual(el.scrollLeft > max - 8 ? cartoes.length - 1 : idx);
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [medir]);

  const irPara = (i: number) => {
    const el = trilho.current;
    if (!el) return;
    const alvo = el.children[Math.max(0, Math.min(projetos.length - 1, i))] as HTMLElement;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const recuo = parseFloat(getComputedStyle(el).paddingLeft);
    el.scrollTo({ left: alvo.offsetLeft - el.offsetLeft - recuo, behavior: reduzir ? "auto" : "smooth" });
  };

  // arrastar com o mouse (toque e trackpad já rolam nativamente)
  const aoPressionar = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !trilho.current) return;
    arrasto.current = { ativo: true, x: e.clientX, scroll: trilho.current.scrollLeft, moveu: false };
  };
  const aoMover = (e: PointerEvent<HTMLUListElement>) => {
    const a = arrasto.current;
    if (!a.ativo || !trilho.current) return;
    const dx = e.clientX - a.x;
    if (Math.abs(dx) > 4 && !a.moveu) {
      a.moveu = true;
      trilho.current.setPointerCapture(e.pointerId);
      trilho.current.style.scrollSnapType = "none";
    }
    if (a.moveu) trilho.current.scrollLeft = a.scroll - dx;
  };
  const aoSoltar = () => {
    const a = arrasto.current;
    if (!a.ativo || !trilho.current) return;
    a.ativo = false;
    if (a.moveu) {
      trilho.current.style.scrollSnapType = "";
      irPara(atual);
    }
  };

  return (
    <div role="region" aria-roledescription="carrossel" aria-label="Projetos">
      <div className="mb-8 flex items-center justify-between gap-6">
        <p className="text-sm tabular-nums text-musgo" aria-live="polite">
          {atual + 1} de {projetos.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => irPara(atual - 1)}
            disabled={limites.inicio}
            aria-label="Projeto anterior"
            className="grid size-12 place-items-center rounded-full border border-nevoa/25 text-nevoa transition-colors hover:border-nevoa hover:bg-nevoa/5 disabled:pointer-events-none disabled:opacity-30"
          >
            <Seta direcao="esquerda" />
          </button>
          <button
            type="button"
            onClick={() => irPara(atual + 1)}
            disabled={limites.fim}
            aria-label="Próximo projeto"
            className="grid size-12 place-items-center rounded-full border border-nevoa/25 text-nevoa transition-colors hover:border-nevoa hover:bg-nevoa/5 disabled:pointer-events-none disabled:opacity-30"
          >
            <Seta direcao="direita" />
          </button>
        </div>
      </div>

      <ul
        ref={trilho}
        onScroll={medir}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onClickCapture={(e) => {
          if (arrasto.current.moveu) {
            e.preventDefault();
            e.stopPropagation();
            arrasto.current.moveu = false;
          }
        }}
        className="ml-[calc(50%-50vw)] flex w-screen snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.5rem,calc(50vw-36rem))] pb-4 [scroll-padding-inline:max(1.5rem,calc(50vw-36rem))] [scrollbar-width:none] sm:px-[max(2.5rem,calc(50vw-36rem))] sm:[scroll-padding-inline:max(2.5rem,calc(50vw-36rem))] [&::-webkit-scrollbar]:hidden"
      >
        {projetos.map((p, i) => (
          <li
            key={p.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${projetos.length}: ${p.nome}`}
            className="flex w-[84vw] max-w-[25rem] shrink-0 snap-start select-none flex-col rounded-xl border border-margem bg-mata/45 p-7 sm:w-[25rem] sm:p-8"
          >
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-musgo">
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

            <h3 className="secao-titulo mt-5 text-3xl text-nevoa">{p.nome}</h3>
            <p className="mt-3 text-lg leading-snug text-sedimento-claro">{p.resumo}</p>

            <ul className="mt-6 space-y-2.5">
              {p.feito.map((f) => (
                <li key={f} className="relative pl-5 leading-relaxed text-nevoa/80">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-sedimento" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              {p.stack && (
                <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md border border-margem bg-rio/60 px-2.5 py-1 text-sm text-nevoa/75">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              {p.link && (
                <a
                  href={p.link.url}
                  target="_blank"
                  rel="noreferrer"
                  draggable={false}
                  className="mt-6 inline-flex rounded-full bg-sedimento px-5 py-2.5 font-semibold text-rio transition-colors hover:bg-sedimento-claro"
                >
                  {p.link.rotulo}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 h-px w-full bg-margem" aria-hidden="true">
        <div
          className="h-px bg-sedimento transition-[width] duration-150"
          style={{ width: `${Math.max(8, progresso * 100)}%` }}
        />
      </div>
    </div>
  );
}

function Seta({ direcao }: { direcao: "esquerda" | "direita" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={direcao === "esquerda" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
