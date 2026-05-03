export interface PortfolioProject {
  name: string;
  category: "Desarrollo Web" | "SEO Técnico" | "Gestión de Redes Sociales";
  description: string;
  url?: string;
  screenshot?: string;
  comingSoon?: boolean;
}

export const portfolio: PortfolioProject[] = [
  {
    name: "TRX Concept",
    category: "Desarrollo Web",
    description:
      "Sitio web para Nicolás Echeverría, entrenador personal certificado en TRX con más de diez años de experiencia. Diseño orientado a conversión con foco en reserva de clases y captación de nuevos alumnos en Santiago.",
    url: "https://trxconcept.cl",
    screenshot: "/images/portfolio/trxconcept.webp",
  },
  {
    name: "Proyecto Matriz",
    category: "Desarrollo Web",
    description:
      "Visualizador de proyectos de energía renovable en Chile. Herramienta web que permite explorar la composición y distribución de la matriz energética nacional de forma simple y directa.",
    url: "https://matriz.agenciachucao.cl",
    screenshot: "/images/portfolio/matriz.webp",
  },
  {
    name: "Fiberpole",
    category: "SEO Técnico",
    description:
      "Auditoría técnica y estrategia SEO para Fiberpole, empresa chilena fabricante de postes de fibra de vidrio para iluminación y distribución eléctrica. Trabajo de posicionamiento orgánico en un mercado industrial de nicho.",
    url: "https://fiberpole.cl",
    screenshot: "/images/portfolio/fiberpole.webp",
  },
  {
    name: "Invenio",
    category: "SEO Técnico",
    description:
      "Auditoría SEO y optimización técnica para Invenio, empresa con más de 60 años fabricando equipos en FRP para industrias de alta corrosividad. Corrección de problemas de indexación y mejora de visibilidad en búsquedas industriales especializadas.",
    url: "https://invenio.cl",
    screenshot: "/images/portfolio/invenio.webp",
  },
  {
    name: "Fundo La Monja",
    category: "Gestión de Redes Sociales",
    description:
      "Creación de perfil en Instagram, identidad visual y producción de contenido para Fundo La Monja, pequeño negocio gastronómico artesanal. Incluye diseño de logo, reels, publicaciones y stories.",
    url: "https://www.instagram.com/fundolamonja/",
    screenshot: "/images/portfolio/fundolamonja.webp",
  },
  {
    name: "Próximamente",
    category: "Desarrollo Web",
    description: "Nuevo proyecto en desarrollo.",
    comingSoon: true,
  },
  {
    name: "Próximamente",
    category: "SEO Técnico",
    description: "Nuevo proyecto en desarrollo.",
    comingSoon: true,
  },
];
