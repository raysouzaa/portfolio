"use client";

import { useEffect, useRef } from "react";

/**
 * "Encontro das águas": dois feixes de linhas de correnteza correm lado a lado
 * sem se misturar, como os rios vistos de cima. O de cima tem o tom da água
 * escura do Rio Negro, o de baixo o do sedimento do Solimões. O cursor abre
 * as linhas como um remanso.
 */

const POR_RIO = 22;
const PASSO = 7; // px entre pontos de cada linha
const CORES: [number, number, number][] = [
  [122, 176, 163], // Rio Negro
  [200, 161, 95], // Solimões
];

type Linha = { rio: 0 | 1; f: number; fase: number; vel: number; amp: number; alpha: number };

export default function Correntes({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visivel = true;
    let t = 0;
    // posição do cursor suavizada, para o remanso não "pular"
    const alvo = { x: -9999, y: -9999, forca: 0 };
    const mouse = { x: -9999, y: -9999, forca: 0 };

    const linhas: Linha[] = [];
    for (const rio of [0, 1] as const) {
      for (let i = 0; i < POR_RIO; i++) {
        const f = (i + 0.5) / POR_RIO; // 0 = junto do encontro, 1 = margem
        linhas.push({
          rio,
          f,
          fase: Math.random() * Math.PI * 2,
          vel: 0.6 + Math.random() * 0.6,
          amp: 3 + f * 9 + Math.random() * 3,
          alpha: 0.12 + (1 - f) * 0.42,
        });
      }
    }

    const encontro = (x: number) =>
      h * 0.6 + Math.sin(x * 0.0026 + t * 0.00022) * h * 0.06 + Math.sin(x * 0.0067 - t * 0.00035) * h * 0.02;
    const largura = (x: number) => h * (0.34 - 0.16 * Math.min(1, x / Math.max(w, 1)));

    const montar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (alvo.x - mouse.x) * 0.12;
      mouse.y += (alvo.y - mouse.y) * 0.12;
      mouse.forca += (alvo.forca - mouse.forca) * 0.06;
      const raio2 = 170 * 170;

      for (const l of linhas) {
        const lado = l.rio === 0 ? -1 : 1;
        const [r, g, b] = CORES[l.rio];
        // as linhas surgem suavemente da esquerda
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.18, `rgba(${r},${g},${b},${l.alpha * 0.6})`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},${l.alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},${l.alpha * 0.85})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = l.f < 0.15 ? 1.4 : 1;

        ctx.beginPath();
        for (let x = -PASSO; x <= w + PASSO; x += PASSO) {
          const centro = encontro(x);
          let y =
            centro +
            lado * (3 + l.f * largura(x)) +
            Math.sin(x * (0.005 + l.f * 0.003) - t * 0.0009 * l.vel + l.fase) * l.amp;

          if (mouse.forca > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < raio2 * 4) {
              // desvio suave: abre as linhas para cima e para baixo do cursor
              y += Math.tanh(dy / 40) * Math.exp(-d2 / raio2) * 46 * mouse.forca;
            }
          }
          // nenhuma linha atravessa para o outro rio
          y = lado < 0 ? Math.min(y, centro - 1) : Math.max(y, centro + 1);

          if (x === -PASSO) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      if (visivel && !document.hidden) {
        t += 16;
        desenhar();
      }
      raf = requestAnimationFrame(loop);
    };

    montar();
    if (reduzir) desenhar();
    else raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    io.observe(canvas);

    const aoMover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      alvo.x = e.clientX - r.left;
      alvo.y = e.clientY - r.top;
      alvo.forca = alvo.y >= 0 && alvo.y <= r.height ? 1 : 0;
    };
    const aoSair = () => (alvo.forca = 0);
    let tm: ReturnType<typeof setTimeout>;
    const aoRedimensionar = () => {
      clearTimeout(tm);
      tm = setTimeout(() => {
        montar();
        if (reduzir) desenhar();
      }, 150);
    };

    if (!reduzir) {
      window.addEventListener("pointermove", aoMover, { passive: true });
      document.addEventListener("pointerleave", aoSair);
    }
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("pointerleave", aoSair);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
