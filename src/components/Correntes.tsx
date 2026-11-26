"use client";

import { useEffect, useRef } from "react";

/**
 * "Encontro das águas": duas correntes de partículas correm lado a lado
 * sem se misturar. A de cima tem a cor da água escura do Rio Negro, a de
 * baixo a do sedimento do Solimões. O cursor desvia o fluxo como um remanso.
 */

type Particula = {
  x: number;
  y: number;
  px: number;
  py: number;
  rio: 0 | 1;
  vel: number;
  vida: number;
  fase: number;
};

const FUNDO = [15, 38, 36]; // --color-rio
const CORES = ["rgba(122, 176, 163, ALPHA)", "rgba(200, 161, 95, ALPHA)"];

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
    let dpr = 1;
    let particulas: Particula[] = [];
    let raf = 0;
    let visivel = true;
    let t = 0;
    const mouse = { x: -9999, y: -9999, ativo: false };

    // linha onde as duas águas se encontram
    const encontro = (x: number, tempo: number) =>
      h * 0.58 +
      Math.sin(x * 0.0032 + tempo * 0.00035) * h * 0.07 +
      Math.sin(x * 0.0081 - tempo * 0.0006) * h * 0.025;

    // largura de cada corrente diminui para a direita: os rios se apertam
    const largura = (x: number) => h * (0.36 - 0.18 * Math.min(1, x / Math.max(w, 1)));

    const nova = (rio: 0 | 1, emQualquerX = false): Particula => {
      const x = emQualquerX ? Math.random() * w : -10 - Math.random() * 80;
      const centro = encontro(x, t);
      const lado = rio === 0 ? -1 : 1;
      const y = centro + lado * (4 + Math.random() * largura(x));
      return {
        x,
        y,
        px: x,
        py: y,
        rio,
        vel: 0.7 + Math.random() * 1.5,
        vida: 0,
        fase: Math.random() * Math.PI * 2,
      };
    };

    const montar = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${FUNDO.join(",")})`;
      ctx.fillRect(0, 0, w, h);
      const total = Math.min(1400, Math.round((w * h) / 1200));
      particulas = Array.from({ length: total }, (_, i) => nova((i % 2) as 0 | 1, true));
    };

    const passo = () => {
      t += 16;
      // rastro: escurece levemente o quadro anterior
      ctx.fillStyle = `rgba(${FUNDO.join(",")}, 0.075)`;
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      for (const p of particulas) {
        p.px = p.x;
        p.py = p.y;
        const centro = encontro(p.x, t);
        const lado = p.rio === 0 ? -1 : 1;
        // cada partícula busca sua faixa dentro do próprio rio
        const faixa = centro + lado * (6 + ((Math.sin(p.fase) + 1) / 2) * largura(p.x));
        let vy = (faixa - p.y) * 0.02 + Math.sin(p.x * 0.012 + p.fase + t * 0.001) * 0.35;
        let vx = p.vel * (1 + 0.25 * Math.sin(p.y * 0.01 + t * 0.0005));

        if (mouse.ativo) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const raio = 150;
          if (d2 < raio * raio) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / raio) * 2.6;
            // remanso: empurra e gira em volta do cursor
            vx += (dx / d) * f - (dy / d) * f * 0.8;
            vy += (dy / d) * f + (dx / d) * f * 0.8;
          }
        }

        p.x += vx;
        p.y += vy;
        p.vida++;

        // a fronteira entre as águas é respeitada
        if (p.rio === 0 && p.y > centro - 1) p.y = centro - 1;
        if (p.rio === 1 && p.y < centro + 1) p.y = centro + 1;

        const alpha = Math.min(0.8, p.vida / 50) * (0.55 + 0.45 * (p.vel / 2.2));
        ctx.strokeStyle = CORES[p.rio].replace("ALPHA", alpha.toFixed(3));
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (p.x > w + 10 || p.y < -40 || p.y > h + 40) Object.assign(p, nova(p.rio));
      }
    };

    const loop = () => {
      if (visivel && !document.hidden) passo();
      raf = requestAnimationFrame(loop);
    };

    const estatico = () => {
      // movimento reduzido: desenha o rio já formado, sem animar
      for (let i = 0; i < 260; i++) passo();
    };

    montar();
    if (reduzir) estatico();
    else raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    io.observe(canvas);

    const aoMover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.ativo = mouse.y >= 0 && mouse.y <= r.height;
    };
    const aoSair = () => (mouse.ativo = false);
    let tm: ReturnType<typeof setTimeout>;
    const aoRedimensionar = () => {
      clearTimeout(tm);
      tm = setTimeout(() => {
        montar();
        if (reduzir) estatico();
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
