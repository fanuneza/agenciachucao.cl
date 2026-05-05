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
      "Captamos demanda activa de personas buscando implantes, ortodoncia o rehabilitación en Santiago. Solo búsquedas con intención real, sin audiencias frías.",
  },
  {
    idx: "02 · Conversión",
    label: "Landing de conversión",
    description:
      "Página específica por tratamiento, diseñada para convertir visitas en solicitudes de evaluación. Sin distracciones, sin menús innecesarios.",
  },
  {
    idx: "03 · Medición",
    label: "Medición y analytics",
    description:
      "Instrumentación completa desde el primer día: sabemos de dónde viene cada paciente, cuánto costó cada evaluación y qué canal está generando resultados.",
  },
  {
    idx: "04 · Contacto",
    label: "Seguimiento por WhatsApp",
    description:
      "Protocolo de contacto para que ningún lead quede sin respuesta en las primeras horas. La velocidad de contacto es el factor que más impacta el cierre.",
  },
  {
    idx: "05 · Local",
    label: "SEO local + Google Business Profile",
    description:
      "Optimización del perfil local para captar búsquedas de alta intención en tu zona. Categorías, reseñas, publicaciones y visibilidad en Maps.",
  },
  {
    idx: "06 · Directorios",
    label: "Optimización de directorios",
    description:
      "Perfil completo y activo en Doctoralia y otros directorios relevantes. Donde tu paciente busca antes de llamar, tu clínica debe aparecer bien.",
  },
];
