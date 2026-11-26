"use client";

import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/content/perfil";

/** "Fale comigo" fixo no canto. Some no topo da página e quando a seção de contato está na tela. */
export default function BotaoFlutuante() {
  const [passouTopo, setPassouTopo] = useState(false);
  const [contatoVisivel, setContatoVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setPassouTopo(window.scrollY > window.innerHeight * 0.6);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    const contato = document.getElementById("contato");
    const io = contato
      ? new IntersectionObserver(([e]) => setContatoVisivel(e.isIntersecting), { threshold: 0.15 })
      : null;
    if (contato && io) io.observe(contato);

    return () => {
      window.removeEventListener("scroll", aoRolar);
      io?.disconnect();
    };
  }, []);

  const visivel = passouTopo && !contatoVisivel;
  const href = linkWhatsapp || "#contato";

  return (
    <a
      href={href}
      target={linkWhatsapp ? "_blank" : undefined}
      rel={linkWhatsapp ? "noreferrer" : undefined}
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-sedimento py-3.5 pl-4 pr-5 font-semibold text-rio shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-sedimento-claro motion-reduce:transition-none sm:bottom-7 sm:right-7 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12a8 8 0 1 1 3.3 6.48L4 19.5l1.02-3.2A7.96 7.96 0 0 1 4 12Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path d="M9 10.5h6M9 13.5h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
      Fale comigo
    </a>
  );
}
