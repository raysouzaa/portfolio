/**
 * ============================================================
 *  TODO O CONTEÚDO DO SITE FICA AQUI.
 *  Edite este arquivo para trocar textos, projetos e experiências.
 *  Itens marcados com "PREENCHER" ainda precisam dos seus dados reais.
 * ============================================================
 */

export type Projeto = {
  slug: string;
  nome: string;
  contexto: string; // onde/para quem foi feito
  status?: "Em produção" | "Em desenvolvimento";
  resumo: string; // uma linha
  problema: string;
  feito: string[]; // o que você fez
  stack: string[];
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
  // Nome grande do topo do site
  nome: "Raiany Souza", // cada palavra vira uma linha no topo
  nomeCompleto: "Raiany Souza",
  titulo: "Desenvolvedora full stack",
  cidade: "Belém do Pará",
  coordenadas: "1°27′ S, 48°30′ W",

  chamada:
    "Desenvolvo sistemas para a área da saúde e faço eles conversarem entre si: do banco Oracle do MV até a tela à beira do leito.",

  sobre: [
    "Sou desenvolvedora full stack há mais de 7 anos. Hoje trabalho na Fundação Santa Casa de Misericórdia do Pará, onde construo os sistemas usados por enfermagem, médicos, farmácia, financeiro e banco de leite, e cuido dos bancos de dados que sustentam tudo isso.",
    "Meu dia a dia é integração: ler o que está no prontuário e no sistema hospitalar MV, transformar em telas simples para quem está no plantão e colocar no ar com Docker. Também passei cinco anos na Wing Solutions criando APIs, landing pages e chatbots de WhatsApp, e comecei na UFPA, desenvolvendo os sistemas da Pró-reitoria de Ensino.",
  ],

  // Foto: coloque o arquivo em /public (ex.: /public/foto.jpg) e troque null por "/foto.jpg"
  foto: null as string | null,

  // Contato
  email: "raydesouza52@gmail.com",
  linkedin: "https://www.linkedin.com/in/raianyr1/",
  whatsapp: "5591985166633", // deixe "" para esconder o botão

  // GitHub: usuário para listar os repositórios públicos automaticamente
  github: "raysouzaa",
  // Repositórios que você NÃO quer mostrar (nomes exatos)
  githubOcultar: [] as string[],
};

export const atuacao = [
  {
    termo: "Web e mobile",
    descricao:
      "Aplicações completas em Laravel, Node.js, React, Next.js e React Native, do banco à interface, com design system próprio.",
  },
  {
    termo: "Banco de dados",
    descricao:
      "Atuo como DBA em Oracle, PostgreSQL e MongoDB: consultas complexas, modelagem, acesso e manutenção.",
  },
  {
    termo: "Integração hospitalar",
    descricao:
      "Leitura e cruzamento de dados do MV (Soul e PEP) para alimentar sistemas novos sem retrabalho da equipe assistencial.",
  },
  {
    termo: "Infraestrutura",
    descricao:
      "Docker, servidores Linux, AWS, CI no Git e distribuição de apps em dispositivos da instituição.",
  },
];

export const projetos: Projeto[] = [
  {
    slug: "passagem-de-plantao",
    nome: "Passagem de Plantão",
    contexto: "Santa Casa do Pará",
    status: "Em produção",
    resumo: "A troca de turno da enfermagem e dos médicos, registrada e consultável.",
    problema:
      "A passagem de plantão dependia de papel e de conversa. As informações do paciente precisavam chegar ao próximo turno de forma completa, com o censo de leitos vindo direto do sistema hospitalar.",
    feito: [
      "Migrei o sistema de AdonisJS para Laravel 12 com Inertia, React e TypeScript.",
      "Criei módulos para enfermagem (internação e ambulatório), equipe médica e centro cirúrgico.",
      "Escrevi as consultas Oracle do censo de leitos e guardei os formulários em MongoDB.",
      "Montei a biblioteca de componentes que virou o padrão visual dos sistemas da GSIS.",
      "Login integrado ao Active Directory por um serviço FastAPI, e relatórios em PDF gerados no servidor.",
    ],
    stack: ["Laravel 12", "React", "TypeScript", "Inertia.js", "Oracle", "MongoDB", "FastAPI", "Docker"],
  },
  {
    slug: "totem-checkin",
    nome: "Totem de check-in",
    contexto: "Santa Casa do Pará",
    resumo: "Autoatendimento na chegada do paciente, com pulseira impressa na hora.",
    problema:
      "A recepção concentrava toda a identificação dos pacientes. O totem precisava confirmar o atendimento no MV e imprimir a pulseira sem depender de um atendente.",
    feito: [
      "Desenvolvi o front em React com Vite e a API em Laravel 11.",
      "Integrei com o MV para localizar o atendimento do paciente.",
      "Gerei as pulseiras em ZPL e mandei direto para impressoras Zebra.",
      "Registrei cada etapa da jornada do paciente para acompanhamento.",
    ],
    stack: ["React", "TypeScript", "Vite", "Laravel 11", "Oracle (MV)", "ZPL / Zebra"],
  },
  {
    slug: "beira-leito",
    nome: "Aplicação beira-leito",
    contexto: "Santa Casa do Pará",
    status: "Em desenvolvimento",
    resumo: "O registro diário do prontuário levado para perto do paciente.",
    problema:
      "Os dados do registro diário vivem no PEP do MV. Para construir uma aplicação nova à beira do leito era preciso entender essas tabelas sem documentação, só pelo banco.",
    feito: [
      "Mapeei as tabelas e os relacionamentos do registro diário do PEP no schema Oracle do MV.",
      "Estou construindo o backend da aplicação em cima desse mapeamento.",
    ],
    stack: ["Oracle", "MV PEP", "Laravel", "React"],
  },
  {
    slug: "comunicati",
    nome: "ComunicaTI",
    contexto: "Santa Casa do Pará",
    status: "Em produção",
    resumo: "Avisos da TI entregues direto nas estações de trabalho.",
    problema:
      "A TI precisava mandar comunicados para os computadores da instituição. A conexão original por socket TCP era frágil e difícil de manter.",
    feito: [
      "Construí o painel administrativo em Laravel, Inertia e React.",
      "Troquei o socket TCP por um modelo de polling HTTP entre o agente em C# e uma API FastAPI.",
      "Guardei o histórico completo das mensagens em PostgreSQL.",
    ],
    stack: ["Laravel", "React", "Inertia.js", "C# / .NET", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "portal-candidato",
    nome: "Portal do Candidato (PSS)",
    contexto: "Santa Casa do Pará",
    resumo: "Inscrições do processo seletivo da instituição.",
    problema:
      "O processo seletivo simplificado precisava de um portal próprio, publicado na infraestrutura interna.",
    feito: [
      "Coloquei a aplicação Laravel no ar em Oracle Linux 8 com Docker.",
      "Resolvi a imagem base do PHP e a liberação de acesso ao PostgreSQL junto ao banco.",
    ],
    stack: ["Laravel", "PostgreSQL", "Docker", "Oracle Linux"],
  },
  {
    slug: "coletores-android",
    nome: "App nos coletores Android",
    contexto: "Santa Casa do Pará",
    resumo: "Distribuição de um app interno em coletores de dados sem loja.",
    problema:
      "Os coletores Seuic da instituição precisavam de um app interno que não pode ir para a Play Store, e atualizar aparelho por aparelho não escala.",
    feito: [
      "Avaliei um MDM próprio em servidor Linux.",
      "Testei a atualização automática do app a partir de um APK hospedado no repositório Nexus da instituição.",
    ],
    stack: ["Android", "MDM", "Nexus", "Linux"],
  },
  {
    slug: "plataforma-cm",
    nome: "Plataforma CM",
    contexto: "Contamedical",
    status: "Em desenvolvimento",
    resumo: "Plataforma de gestão para escritórios de contabilidade médica, em duas marcas.",
    problema:
      "Vários projetos separados (frontend, IA e servidor) com nomes e fluxos diferentes, tudo dependente do Supabase. Era preciso unificar e ganhar controle da infraestrutura.",
    feito: [
      "Unifiquei os repositórios num monorepo, preservando o histórico de cada um.",
      "Montei publicação por item via CI e um ambiente de homologação igual ao de produção.",
      "Estou migrando o backend e o frontend do Supabase para Laravel, React e PostgreSQL em servidor próprio, começando pelo Contas a Receber.",
      "Mantenho o design system com tema por marca e modo claro e escuro.",
    ],
    stack: ["Laravel", "React", "TypeScript", "PostgreSQL", "Supabase", "Git CI"],
  },
  {
    slug: "atendimento-whatsapp",
    nome: "Atendimento no WhatsApp",
    contexto: "Wing Solutions",
    resumo: "Chatbots que automatizam o atendimento de empresas de telefonia e seguros.",
    problema:
      "Clientes de telefonia e seguros precisavam ser atendidos fora do horário comercial e sem fila, com os dados batendo com os sistemas internos das empresas.",
    feito: [
      "Desenvolvi chatbots e integrações com o WhatsApp para automatizar o atendimento.",
      "Criei as APIs REST em Laravel com MySQL, integradas a serviços da AWS.",
      "Cobri as regras de negócio com testes unitários.",
    ],
    stack: ["Laravel", "PHP 8", "MySQL", "AWS", "WhatsApp", "React"],
  },
  {
    slug: "helpti",
    nome: "HelpTI",
    contexto: "Contamedical",
    resumo: "Sistema de chamados de suporte de TI.",
    problema: "Os pedidos de suporte chegavam por canais soltos, sem fila, prioridade ou histórico.",
    feito: [
      "Desenvolvi o sistema de abertura e acompanhamento de chamados em Laravel com Inertia e React.",
      "Apliquei um redesign completo a partir de um protótipo próprio.",
    ],
    stack: ["Laravel", "Inertia.js", "React"],
  },
  {
    slug: "central-de-monitoramento",
    nome: "Central de monitoramento",
    contexto: "Projeto próprio",
    status: "Em desenvolvimento",
    resumo: "Alertas em tempo real sobre a operação de um hospital.",
    problema:
      "Gestores precisam saber de gargalos e riscos na hora em que acontecem, e não no relatório do dia seguinte.",
    feito: [
      "Estou desenhando o fluxo de notificações com dados fictícios.",
      "A arquitetura está pronta para receber os dados reais do sistema hospitalar depois.",
    ],
    stack: ["React", "TypeScript", "Laravel", "PostgreSQL"],
  },
];

export const trajetoria: Experiencia[] = [
  {
    periodo: "Abr 2024 – atual",
    titulo: "Desenvolvedora full stack",
    lugar: "Fundação Santa Casa de Misericórdia do Pará (Montreal)",
    descricao: "Sistemas web e mobile para a saúde, da API ao banco de dados.",
    destaques: [
      "Soluções para enfermagem, financeiro, farmácia e banco de leite",
      "APIs em Laravel, Node.js e FastAPI sobre Oracle, PostgreSQL e MongoDB",
      "Interfaces em React, Next.js e React Native",
      "Ambientes e deploy com Docker",
    ],
  },
  {
    periodo: "Jan 2021 – Fev 2026",
    titulo: "Desenvolvedora full stack",
    lugar: "Wing Solutions",
    descricao: "Sistemas para empresas de telefonia e seguros.",
    destaques: [
      "APIs REST em Laravel e MySQL integradas à AWS",
      "Chatbots e integrações com WhatsApp",
      "Landing pages em React, Next.js e Vite",
      "Testes unitários das regras de negócio",
    ],
  },
  {
    periodo: "Out 2018 – Jan 2021",
    titulo: "Estágio em desenvolvimento web full stack",
    lugar: "COTIC, Pró-reitoria de Ensino de Graduação, UFPA",
    descricao: "Sistemas internos para automatizar processos administrativos da pró-reitoria.",
    destaques: [
      "Laravel, MySQL e Vue.js",
      "Testes end-to-end com Cypress",
      "Página institucional da COTIC",
      "Suporte em Windows, Linux e rede de dados",
    ],
  },
  {
    periodo: "Dez 2019 – Mar 2020",
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
  { grupo: "Servidor", itens: ["Laravel (PHP 8)", "Node.js", "FastAPI (Python)", "APIs REST", "C# / .NET"] },
  { grupo: "Dados", itens: ["Oracle", "PostgreSQL", "MongoDB", "MySQL", "Supabase"] },
  { grupo: "Infra", itens: ["Docker", "Linux", "AWS", "Git CI", "Cloudflare Tunnel"] },
  { grupo: "Qualidade", itens: ["Testes unitários", "Cypress (E2E)", "Clean Code e SOLID", "Scrum e Kanban"] },
  { grupo: "Integrações", itens: ["MV Soul e PEP", "Active Directory", "Impressoras Zebra (ZPL)", "WhatsApp"] },
];
