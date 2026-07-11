export const site = {
  siteUrl: "https://agenciachucao.cl",
  siteName: "Agencia Chucao",
  defaultTitle: "Lead Engine para clinicas dentales en Santiago | Agencia Chucao",
  defaultDescription:
    "Sistema de captacion medible para clinicas dentales en Santiago: Google Ads, landing de conversion y seguimiento por WhatsApp.",
  language: "es",
  locale: "es_CL",
  defaultOgImage: "/images/og/og-image.webp",
  logo: "/images/assets/chucao-logo.svg",
  gtmId: "GTM-PZPX7SK9",
  contact: {
    email: "contacto@agenciachucao.cl",
    phone: "+56 9 2221 8674",
    whatsapp: "56922218674",
  },
  legal: {
    cookiePolicy: "/politica-de-cookies/",
  },
  organization: {
    name: "Agencia Chucao",
    type: "LocalBusiness",
    email: "contacto@agenciachucao.cl",
    telephone: "+56922218674",
    addressLocality: "Santiago",
    addressRegion: "Region Metropolitana",
    addressCountry: "CL",
    serviceType: ["Google Ads", "SEO Local", "Google Business Profile", "Lead Generation", "Conversion web"],
  },
} as const;

export type SiteConfig = typeof site;
