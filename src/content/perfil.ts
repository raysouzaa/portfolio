/**
 * ============================================================
 *  TODO O CONTEÚDO DO SITE FICA AQUI.
 *  Edite este arquivo para trocar textos, projetos e experiências.
 * ============================================================
 */

export type Projeto = {
  slug: string;
  nome: string;
  contexto: string; // onde/para quem foi feito
  status?: "Em produção" | "Em desenvolvimento";
  resumo: string;
  feito: string[];
  stack?: string[];
  link?: { rotulo: string; url: string };
};

export type Experiencia = {
  periodo: string;
  titulo: string;
  lugar: string;
  descricao: string;
  destaques?: string[];
};

export const perfil = {
  // Nome grande do topo do site (cada palavra vira uma linha)
  nome: "Raiany Souza",
  nomeCompleto: "Raiany Souza",
  titulo: "Desenvolvedora full stack e DBA",
  cidade: "Belém do Pará",
  coordenadas: "1°27′ S, 48°30′ W",

  chamada:
    "Há mais de 7 anos transformo processos complexos em sistemas simples de usar, para hospitais, escritórios e negócios, do banco de dados à tela.",

  sobre: [
    "Sou desenvolvedora full stack com mais de 7 anos de experiência. Atualmente, atuo na Fundação Santa Casa de Misericórdia do Pará, onde desenvolvo aplicações para as áreas de enfermagem, corpo clínico, farmácia, financeiro e banco de leite humano, com stack React, Tailwind, Laravel e FastAPI. Também atuo como DBA, administrando ambientes Oracle, PostgreSQL e MongoDB: modelagem, otimização de consultas, rotinas de backup e manutenção dos servidores Linux com Docker onde os serviços rodam.",
    "Meu foco é o desenvolvimento de soluções que otimizam os fluxos assistenciais e administrativos, integradas ao sistema de gestão hospitalar MV, ampliando o aproveitamento dos dados por todas as equipes.",
    "Antes disso, atuei por cinco anos na Wing Solutions, onde participei do desenvolvimento de plataformas de e-commerce, desde o fluxo de compra e checkout até os painéis administrativos de gestão de produtos, pedidos e clientes. Também desenvolvi módulos de venda e gestão de assinaturas, com cobrança recorrente e integração a gateways de pagamento, além de APIs REST, landing pages e soluções de automação de atendimento integradas ao WhatsApp. Iniciei minha trajetória na UFPA, no desenvolvimento de sistemas para a Pró-Reitoria de Ensino de Graduação.",
  ],

  // Foto em /public
  foto: "/foto.webp" as string | null,

  // Contato
  email: "raydesouza52@gmail.com",
  linkedin: "https://www.linkedin.com/in/raianyr1/",
  whatsapp: "5591985166633", // deixe "" para esconder os botões de WhatsApp
  mensagemWhatsapp: "Olá, Raiany! Vi seu portfólio e quero conversar sobre um projeto.",

  // GitHub: usuário para listar os repositórios públicos automaticamente
  github: "raysouzaa",
  // Repositórios que você NÃO quer mostrar (nomes exatos)
  githubOcultar: [] as string[],

  rodape: "Desenvolvido por RS Solutions – Belém, PA, Brasil",
};

// SEO: como o site aparece no Google e quando o link é compartilhado
export const seo = {
  url: "https://meu-portfolio.vyrasolutions.com.br",
  titulo: "Raiany Souza | Desenvolvedora Full Stack e DBA em Belém, PA",
  descricao:
    "Raiany Souza é desenvolvedora full stack e DBA em Belém do Pará. Cria sistemas web com React, Laravel e FastAPI, administra Oracle, PostgreSQL e MongoDB e integra sistemas hospitalares.",
  palavrasChave: [
    "Raiany Souza",
    "Raiany de Souza",
    "Ray Souza",
    "desenvolvedora full stack",
    "desenvolvedora full stack Belém",
    "desenvolvedora full stack Pará",
    "programadora Belém",
    "desenvolvedora de sistemas Belém do Pará",
    "DBA Belém",
    "DBA Oracle",
    "DBA PostgreSQL",
    "desenvolvedora React",
    "desenvolvedora Laravel",
    "desenvolvedora Next.js",
    "FastAPI",
    "sistemas hospitalares",
    "integração MV",
    "sistemas para saúde",
    "desenvolvimento de sistemas sob medida",
    "freelancer desenvolvimento web Belém",
    "Santa Casa do Pará",
  ],
};

export const linkWhatsapp = perfil.whatsapp
  ? `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(perfil.mensagemWhatsapp)}`
  : "";

export const atuacao = [
  {
    termo: "Web e mobile",
    descricao:
      "Aplicações completas em React, Next.js, React Native, Laravel e FastAPI, do banco de dados à interface.",
  },
  {
    termo: "Banco de dados",
    descricao:
      "Administro Oracle, PostgreSQL e MongoDB: modelagem, otimização de consultas, backup e manutenção.",
  },
  {
    termo: "Integração hospitalar",
    descricao:
      "Soluções integradas ao sistema de gestão hospitalar MV, para os dados chegarem a todas as equipes.",
  },
  {
    termo: "Infraestrutura",
    descricao: "Servidores Linux com Docker, AWS, publicação automática e rotinas de backup.",
  },
];

// Projetos privados ficam descritos por alto, sem detalhes internos.
export const projetos: Projeto[] = [
  {
    slug: "enfermagem",
    nome: "Sistema para enfermagem",
    contexto: "Santa Casa do Pará",
    status: "Em produção",
    resumo: "Apoio à rotina da equipe de enfermagem, com as informações do paciente integradas ao sistema hospitalar.",
    feito: [
      "Telas pensadas para o ritmo do plantão",
      "Dados do paciente vindos do MV, sem digitação duplicada",
      "Acesso com a conta institucional",
    ],
    stack: ["React", "Tailwind", "Laravel", "Oracle"],
  },
  {
    slug: "banco-de-leite",
    nome: "Sistema para o banco de leite humano",
    contexto: "Santa Casa do Pará",
    resumo: "Aplicação sob medida para a rotina do banco de leite humano do hospital.",
    feito: [
      "Registro das rotinas do setor num só lugar",
      "Informações centralizadas para a equipe e a gestão",
    ],
    stack: ["React", "Tailwind", "Laravel", "PostgreSQL"],
  },
  {
    slug: "glam-financas",
    nome: "GlamFinanças",
    contexto: "Projeto pessoal",
    status: "Em produção",
    resumo: "Controle financeiro pessoal e familiar, no ar e aberto para qualquer pessoa criar sua conta.",
    feito: [
      "Receitas, despesas, cartões e parcelamentos com painel por mês, pessoa e categoria",
      "Cada conta com seus próprios dados, e lançamentos compartilháveis com outra pessoa",
      "Importação de planilhas e sincronização com o Google Sheets",
      "Publicação automática e backup diário do banco",
    ],
    stack: ["Laravel", "React", "Inertia.js", "PostgreSQL", "Docker"],
    link: { rotulo: "Acessar o GlamFinanças", url: "https://glamfinancasmais.vyrasolutions.com.br" },
  },
  {
    slug: "e-commerce",
    nome: "Plataformas de e-commerce",
    contexto: "Wing Solutions",
    resumo: "Lojas virtuais para uma operadora de telefonia, do carrinho ao painel de gestão.",
    feito: [
      "Fluxo de compra e checkout",
      "Painéis administrativos de produtos, pedidos e clientes",
      "APIs REST integradas a serviços da AWS",
    ],
    stack: ["React", "Next.js", "Laravel", "MySQL", "AWS"],
  },
  {
    slug: "assinaturas",
    nome: "Vendas por assinatura",
    contexto: "Wing Solutions",
    resumo: "Venda e gestão de assinaturas com cobrança recorrente.",
    feito: [
      "Módulos de venda e de gestão de planos e assinantes",
      "Cobrança recorrente integrada a gateways de pagamento",
    ],
    stack: ["Laravel", "React", "MySQL"],
  },
  {
    slug: "whatsapp",
    nome: "Atendimento no WhatsApp",
    contexto: "Wing Solutions",
    resumo: "Chatbots que automatizam o atendimento de empresas.",
    feito: [
      "Fluxos de atendimento automatizado integrados ao WhatsApp",
      "Integração com os sistemas internos dos clientes",
    ],
    stack: ["Laravel", "Node.js", "MySQL"],
  },
  {
    slug: "chatbot-opme",
    nome: "Chatbot de OPME",
    contexto: "Área da saúde",
    resumo: "Assistente com inteligência artificial para agilizar os processos de órteses, próteses e materiais especiais.",
    feito: ["Respostas rápidas para as dúvidas mais comuns do processo"],
    stack: ["IA generativa"],
  },
];

export const trajetoria: Experiencia[] = [
  {
    periodo: "2025 – atual",
    titulo: "Desenvolvedora full stack e DBA",
    lugar: "Fundação Santa Casa de Misericórdia do Pará",
    descricao:
      "Aplicações para enfermagem, corpo clínico, farmácia, financeiro e banco de leite humano, integradas ao sistema de gestão hospitalar MV.",
    destaques: [
      "Stack React, Tailwind, Laravel e FastAPI",
      "Administração de Oracle, PostgreSQL e MongoDB",
      "Servidores Linux com Docker",
    ],
  },
  {
    periodo: "2026", // ano em que começou a prestação de serviços
    titulo: "Desenvolvimento de sistemas (prestação de serviços)",
    lugar: "Escritório de contabilidade",
    descricao: "Plataforma de gestão do escritório e migração da infraestrutura para servidor próprio.",
  },
  {
    periodo: "2021 – 2026",
    titulo: "Desenvolvedora full stack e DBA",
    lugar: "Wing Solutions",
    descricao: "E-commerce, vendas por assinatura e automação de atendimento.",
    destaques: [
      "Fluxo de compra, checkout e painéis de produtos, pedidos e clientes",
      "Assinaturas com cobrança recorrente e gateways de pagamento",
      "APIs REST, landing pages e chatbots de WhatsApp",
    ],
  },
  {
    periodo: "2018 – 2021",
    titulo: "Estágio em desenvolvimento web full stack",
    lugar: "UFPA, Pró-Reitoria de Ensino de Graduação",
    descricao: "Sistemas internos para automatizar processos administrativos da pró-reitoria.",
    destaques: ["Laravel, MySQL e Vue.js", "Testes end-to-end com Cypress", "Página institucional da COTIC"],
  },
  {
    periodo: "2019 – 2020",
    titulo: "Estágio em desenvolvimento back-end",
    lugar: "Navtech Solutions",
    descricao: "API REST em PHP para um aplicativo mobile.",
  },
];

export const formacao: Experiencia[] = [
  {
    periodo: "Em andamento",
    titulo: "Pós-graduação Tech Developer 360",
    lugar: "Faculdade Rocketseat",
    descricao: "",
  },
  {
    periodo: "",
    titulo: "Bacharelado em Sistemas de Informação",
    lugar: "Universidade Federal do Pará (UFPA)",
    descricao: "",
  },
];

export const conquistas = [
  "3º lugar no Hackathon do 46º SEMISH (2019)",
  "3º lugar no Pará e 13º na Região Norte na 3ª Maratona de Programação do Norte (2019)",
  "Participação no XXXIX Congresso da Sociedade Brasileira de Computação (2019)",
  "Ignite Rocketseat em React (2024)",
];

export const ferramentas = [
  {
    grupo: "Interface",
    itens: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Inertia.js", "Material UI", "Sass"],
  },
  { grupo: "Servidor", itens: ["Laravel (PHP 8)", "Node.js", "FastAPI (Python)", "APIs REST"] },
  { grupo: "Dados", itens: ["Oracle", "PostgreSQL", "MongoDB", "MySQL"] },
  { grupo: "Infra", itens: ["Docker", "Linux", "AWS", "Caddy", "GitHub Actions"] },
  { grupo: "Qualidade", itens: ["Testes unitários", "Cypress (E2E)", "Clean Code e SOLID", "Scrum e Kanban"] },
  { grupo: "Integrações", itens: ["Sistema hospitalar MV", "Gateways de pagamento", "WhatsApp", "Google Sheets"] },
];
