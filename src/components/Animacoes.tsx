"use client";

/**
 * Animações de entrada das seções. Todas disparam uma vez, quando o bloco
 * entra na tela, e ficam desligadas para quem pede "reduzir movimento".
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const SUAVE = [0.16, 1, 0.3, 1] as const;
const VISTA = { once: true, margin: "0px 0px -12% 0px" } as const;

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
  figure: motion.figure,
};
type Tag = keyof typeof tags;

/** Título que sobe palavra por palavra, como o nome no topo. */
const palavraSobe: Variants = {
  oculto: { y: "110%" },
  visivel: (i: number) => ({ y: 0, transition: { duration: 0.9, delay: i * 0.06, ease: SUAVE } }),
};

export function TituloRevelado({
  texto,
  id,
  className,
  as = "h2",
}: {
  texto: string;
  id?: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const reduzir = useReducedMotion();
  const H = as === "h2" ? motion.h2 : motion.h3;
  const palavras = texto.split(" ");
  // o gatilho fica no título inteiro: as palavras escondidas pela máscara
  // não contam como "na tela" para o navegador
  return (
    <H
      id={id}
      className={className}
      aria-label={texto}
      initial={reduzir ? false : "oculto"}
      whileInView="visivel"
      viewport={VISTA}
    >
      {palavras.map((p, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" custom={i} variants={palavraSobe}>
            {p}
            {i < palavras.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </H>
  );
}

/** Bloco que aparece subindo de leve. */
export function Surgir({
  children,
  className,
  atraso = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
  as?: Tag;
}) {
  const reduzir = useReducedMotion();
  const M = tags[as];
  return (
    <M
      className={className}
      initial={reduzir ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VISTA}
      transition={{ duration: 0.8, delay: atraso, ease: SUAVE }}
    >
      {children}
    </M>
  );
}

const grupo: Variants = { oculto: {}, visivel: { transition: { staggerChildren: 0.09 } } };
const itemSobe: Variants = {
  oculto: { opacity: 0, y: 22 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SUAVE } },
};
const itemLado: Variants = {
  oculto: { opacity: 0, x: -18 },
  visivel: { opacity: 1, x: 0, transition: { duration: 0.7, ease: SUAVE } },
};

/** Lista cujos itens entram um depois do outro. */
export function Grupo({
  children,
  className,
  as = "div",
  intervalo,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  intervalo?: number;
}) {
  const reduzir = useReducedMotion();
  const M = tags[as];
  return (
    <M
      className={className}
      initial={reduzir ? false : "oculto"}
      whileInView="visivel"
      viewport={VISTA}
      variants={
        intervalo ? { oculto: {}, visivel: { transition: { staggerChildren: intervalo } } } : grupo
      }
    >
      {children}
    </M>
  );
}

export function Item({
  children,
  className,
  as = "div",
  lado = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  lado?: boolean;
}) {
  const M = tags[as];
  return (
    <M className={className} variants={lado ? itemLado : itemSobe}>
      {children}
    </M>
  );
}

/** Foto revelada de baixo para cima, como a água subindo. */
export function FotoRevelada({ children, className }: { children: ReactNode; className?: string }) {
  const reduzir = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduzir ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VISTA}
      transition={{ duration: 1.3, ease: SUAVE }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduzir ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={VISTA}
        transition={{ duration: 1.6, ease: SUAVE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Moldura deslocada que desliza para o lugar depois da foto. */
export function Moldura({ className }: { className?: string }) {
  const reduzir = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={reduzir ? false : { opacity: 0, x: -12, y: -12 }}
      whileInView={{ opacity: 1, x: 12, y: 12 }}
      viewport={VISTA}
      transition={{ duration: 1, delay: 0.6, ease: SUAVE }}
    />
  );
}

/** Linha vertical da trajetória, que corre de cima para baixo como um rio. */
export function LinhaDoTempo({ children, className }: { children: ReactNode; className?: string }) {
  const reduzir = useReducedMotion();
  return (
    <div className={`relative ${className ?? ""}`}>
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px origin-top bg-margem"
        initial={reduzir ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VISTA}
        transition={{ duration: 1.6, ease: SUAVE }}
      />
      {children}
    </div>
  );
}
