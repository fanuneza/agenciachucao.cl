export interface OfferComponent {
  idx: string;
  label: string;
  description: string;
}

export const offerComponents: OfferComponent[] = [
  {
    idx: "01 · Captación",
    label: "Google Search Ads",
    description:
      "Captamos demanda activa de personas que buscan implantes, ortodoncia o rehabilitación en Santiago. Solo búsquedas con intención real.",
  },
  {
    idx: "02 · Conversión",
    label: "Landing de conversión",
    description:
      "Página específica por tratamiento, sin distracciones ni menús innecesarios. Diseñada para que el paciente solicite una evaluación.",
  },
  {
    idx: "03 · Contacto",
    label: "WhatsApp y seguimiento",
    description:
      "Protocolo de contacto para que ningún lead quede sin respuesta en las primeras horas. La velocidad de contacto es lo que más impacta el cierre.",
  },
  {
    idx: "04 · Local",
    label: "SEO local y Google Business Profile",
    description:
      "Optimización del perfil local para captar búsquedas de alta intención en tu zona. Categorías, reseñas, publicaciones y visibilidad en Maps.",
  },
  {
    idx: "05 · Medición",
    label: "Medición y reportes",
    description:
      "Seguimiento de conversiones desde el primer día. Sabemos de dónde viene cada lead, cuánto costó y qué canal funciona.",
  },
  {
    idx: "06 · Mejora",
    label: "Optimización mensual",
    description:
      "Revisión mensual de campañas, palabras clave y tasas de conversión. Ajustamos lo que muestra señales débiles y potenciamos lo que funciona.",
  },
];
