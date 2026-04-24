export interface PortfolioProject {
  name: string;
  category: 'Desarrollo Web' | 'SEO Técnico';
  description: string;
  url?: string;
  screenshot?: string;
  comingSoon?: boolean;
}

export const portfolio: PortfolioProject[] = [
  {
    name: 'TRX Concept',
    category: 'Desarrollo Web',
    description: 'Sitio web corporativo para TRX Concept, empresa de entrenamiento funcional profesional. Diseño orientado a conversión con foco en captación de nuevos alumnos.',
    url: 'https://trxconcept.cl',
    screenshot: '/images/portfolio/trxconcept.webp',
  },
  {
    name: 'Proyecto Matriz',
    category: 'Desarrollo Web',
    description: 'Plataforma web para Proyecto Matriz, espacio de cowork y servicios profesionales. Arquitectura de contenidos pensada para múltiples audiencias objetivo.',
    url: 'https://matriz.agenciachucao.cl',
    screenshot: '/images/portfolio/matriz.webp',
  },
  {
    name: 'Fiberpole',
    category: 'SEO Técnico',
    description: 'Auditoría técnica y estrategia de posicionamiento orgánico para Fiberpole, empresa de instalación de fibra óptica. Mejora de visibilidad en búsquedas locales.',
    url: 'https://fiberpole.cl',
    screenshot: '/images/portfolio/fiberpole.webp',
  },
  {
    name: 'Invenio',
    category: 'SEO Técnico',
    description: 'Estrategia SEO y estructura técnica para Invenio. Corrección de problemas de indexación y optimización on-page para búsquedas de servicios profesionales.',
    url: 'https://invenio.cl',
    screenshot: '/images/portfolio/invenio.webp',
  },
  {
    name: 'Próximamente',
    category: 'Desarrollo Web',
    description: 'Nuevo proyecto en desarrollo.',
    comingSoon: true,
  },
  {
    name: 'Próximamente',
    category: 'SEO Técnico',
    description: 'Nuevo proyecto en desarrollo.',
    comingSoon: true,
  },
];
