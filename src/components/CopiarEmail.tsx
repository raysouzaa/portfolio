"use client";

import { useState } from "react";
import { IconeCopiar, IconeOk } from "./Icones";

export default function CopiarEmail({ email }: { email: string }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-full border border-nevoa/25 px-5 py-2.5 text-sm font-semibold text-nevoa transition-colors hover:border-nevoa hover:bg-nevoa/5"
    >
      {copiado ? <IconeOk className="size-4 text-sedimento-claro" /> : <IconeCopiar className="size-4" />}
      <span aria-live="polite">{copiado ? "E-mail copiado" : "Copiar e-mail"}</span>
    </button>
  );
}
