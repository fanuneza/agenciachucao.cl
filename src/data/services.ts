export interface OfferComponent {
  stage: string;
  label: string;
  description: string;
  tier: "core" | "support";
}

export const offerComponents: OfferComponent[] = [
  {
    stage: "Captación",
    label: "Google Search Ads",
    description:
      "Captamos demanda activa de personas que buscan implantes, ortodoncia o rehabilitación en Santiago. Solo búsquedas con intención real.",
    tier: "core",
  },
  {
    stage: "Conversión",
    label: "Landing de conversión",
    description:
      "Página específica por tratamiento, sin distracciones ni menús innecesarios. Diseñada para que el paciente solicite una evaluación.",
    tier: "core",
  },
  {
    stage: "Contacto",
    label: "WhatsApp y seguimiento",
    description:
      "Protocolo de contacto para que ningún lead quede sin respuesta en las primeras horas. La velocidad de contacto es lo que más impacta el cierre.",
    tier: "core",
  },
  {
    stage: "Presencia local",
    label: "SEO local y Google Business Profile",
    description:
      "Optimización del perfil local para captar búsquedas de alta intención en tu zona: categorías, reseñas y visibilidad en Maps.",
    tier: "support",
  },
  {
    stage: "Medición",
    label: "Medición y reportes",
    description:
      "Seguimiento de conversiones desde el primer día. Sabemos de dónde viene cada lead, cuánto costó y qué canal funciona.",
    tier: "support",
  },
  {
    stage: "Optimización",
    label: "Optimización mensual",
    description:
      "Revisión mensual de campañas, palabras clave y tasas de conversión. Ajustamos las señales débiles y potenciamos lo que funciona.",
    tier: "support",
  },
];
