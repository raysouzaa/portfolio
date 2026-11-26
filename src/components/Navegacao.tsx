"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/content/perfil";

const links = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#projetos", rotulo: "Projetos" },
  { href: "#trajetoria", rotulo: "Trajetória" },
  { href: "#contato", rotulo: "Contato" },
];

export default function Navegacao() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        rolou ? "border-b border-nevoa/10 bg-rio/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:px-10" aria-label="Principal">
        <a href="#inicio" className="whitespace-nowrap text-lg font-bold tracking-tight" style={{ fontStretch: "80%" }}>
          {perfil.nomeCompleto}
        </a>
        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {links.map((l) => (
            <li key={l.href} className={l.href === "#sobre" || l.href === "#trajetoria" ? "hidden sm:block" : ""}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-nevoa/75 transition-colors hover:bg-nevoa/5 hover:text-nevoa"
              >
                {l.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
