import type { Metadata, Viewport } from "next";
import "./globals.css";
import { perfil, seo } from "@/content/perfil";

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: { default: seo.titulo, template: `%s | ${perfil.nomeCompleto}` },
  description: seo.descricao,
  keywords: seo.palavrasChave,
  authors: [{ name: perfil.nomeCompleto, url: seo.url }],
  creator: perfil.nomeCompleto,
  publisher: perfil.nomeCompleto,
  applicationName: perfil.nomeCompleto,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: perfil.nomeCompleto,
    title: seo.titulo,
    description: seo.descricao,
    locale: "pt_BR",
    firstName: "Raiany",
    lastName: "Souza",
    gender: "female",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titulo,
    description: seo.descricao,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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
