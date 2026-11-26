import type { Metadata, Viewport } from "next";
import "./globals.css";
import { perfil } from "@/content/perfil";

export const metadata: Metadata = {
  title: `${perfil.nomeCompleto} | ${perfil.titulo}`,
  description: perfil.chamada,
  openGraph: {
    title: perfil.nomeCompleto,
    description: perfil.chamada,
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2624",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="grao min-h-full">{children}</body>
    </html>
  );
}
