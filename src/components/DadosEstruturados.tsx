import { linkWhatsapp, perfil, projetos, seo } from "@/content/perfil";

/**
 * Dados estruturados (schema.org) para o Google entender quem é a pessoa do site:
 * nome, profissão, cidade, onde trabalha, onde estudou e perfis nas redes.
 */
export default function DadosEstruturados() {
  const pessoa = {
    "@type": "Person",
    "@id": `${seo.url}/#pessoa`,
    name: perfil.nomeCompleto,
    alternateName: ["Raiany de Souza", "Ray Souza"],
    givenName: "Raiany",
    familyName: "Souza",
    url: seo.url,
    image: `${seo.url}${perfil.foto ?? ""}`,
    jobTitle: perfil.titulo,
    description: seo.descricao,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belém",
      addressRegion: "PA",
      addressCountry: "BR",
    },
    worksFor: {
      "@type": "Organization",
      name: "Fundação Santa Casa de Misericórdia do Pará",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidade Federal do Pará (UFPA)" },
      { "@type": "EducationalOrganization", name: "Faculdade Rocketseat" },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Desenvolvedora full stack",
      occupationLocation: { "@type": "City", name: "Belém" },
      skills:
        "React, Next.js, TypeScript, Tailwind CSS, Laravel, PHP, FastAPI, Python, Node.js, Oracle, PostgreSQL, MongoDB, MySQL, Docker, Linux, AWS",
    },
    knowsAbout: [
      "Desenvolvimento full stack",
      "Administração de banco de dados",
      "Oracle",
      "PostgreSQL",
      "MongoDB",
      "React",
      "Next.js",
      "Laravel",
      "FastAPI",
      "Docker",
      "Sistemas hospitalares",
      "Integração com o sistema MV",
      "E-commerce",
    ],
    knowsLanguage: "pt-BR",
    sameAs: [perfil.linkedin, perfil.github ? `https://github.com/${perfil.github}` : ""].filter(Boolean),
    ...(linkWhatsapp
      ? { contactPoint: { "@type": "ContactPoint", contactType: "Contato profissional", url: linkWhatsapp } }
      : {}),
  };

  const dados = {
    "@context": "https://schema.org",
    "@graph": [
      pessoa,
      {
        "@type": "ProfilePage",
        "@id": `${seo.url}/#pagina`,
        url: seo.url,
        name: seo.titulo,
        description: seo.descricao,
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${seo.url}/#pessoa` },
      },
      {
        "@type": "WebSite",
        "@id": `${seo.url}/#site`,
        url: seo.url,
        name: perfil.nomeCompleto,
        inLanguage: "pt-BR",
        publisher: { "@id": `${seo.url}/#pessoa` },
      },
      ...projetos
        .filter((p) => p.link)
        .map((p) => ({
          "@type": "SoftwareApplication",
          name: p.nome,
          description: p.resumo,
          url: p.link!.url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
          author: { "@id": `${seo.url}/#pessoa` },
        })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // conteúdo gerado por nós, sem entrada de usuário; "<" escapado por segurança
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}
