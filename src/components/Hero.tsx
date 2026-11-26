"use client";

import { motion, useReducedMotion } from "motion/react";
import Correntes from "./Correntes";
import { perfil } from "@/content/perfil";

export default function Hero() {
  const reduzir = useReducedMotion();
  const linhas = perfil.nome.trim().split(/\s+/);

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Correntes className="absolute inset-0 -z-10 h-full w-full" />
      {/* véu à esquerda para dar leitura ao texto sobre as correntes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,38,36,0.85)_0%,rgba(15,38,36,0.35)_45%,rgba(15,38,36,0)_75%)]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pb-14 pt-28 sm:px-10 md:pb-20">
        <h1 className="display text-[clamp(4.5rem,30vw,14.5rem)] text-nevoa" aria-label={perfil.nome}>
          {linhas.map((linha, li) => (
            <span key={li} aria-hidden="true" className="flex overflow-hidden pb-[0.06em]">
              {Array.from(linha).map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduzir ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.25 + li * 0.18 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduzir ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 grid gap-8 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end"
        >
          <div>
            <p className="text-lg font-medium text-sedimento-claro sm:text-xl">{perfil.titulo}</p>
            <p className="mt-3 text-xl leading-snug text-nevoa/90 sm:text-2xl">{perfil.chamada}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projetos"
                className="rounded-full bg-sedimento px-6 py-3 font-semibold text-rio transition-colors hover:bg-sedimento-claro"
              >
                Ver projetos
              </a>
              <a
                href="#contato"
                className="rounded-full border border-nevoa/30 px-6 py-3 font-semibold text-nevoa transition-colors hover:border-nevoa hover:bg-nevoa/5"
              >
                Falar comigo
              </a>
            </div>
          </div>
          <p className="text-sm text-musgo md:justify-self-end md:text-right">
            {perfil.cidade}
            <br />
            <span className="tabular-nums">{perfil.coordenadas}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
