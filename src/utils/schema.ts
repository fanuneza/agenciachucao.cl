import { makeIds, buildWebSite, buildWebPage, buildArticle, buildPiece } from "@jdevalk/seo-graph-core";

const SITE_URL = "https://agenciachucao.cl";

export function buildSchemaGraph(options: {
  pageType: "website" | "blogPost" | "webpage";
  url: string;
  title: string;
  description: string;
  publishDate?: Date;
  authorName?: string;
  featureImageUrl?: string;
  category?: string;
}) {
  const ids = makeIds({ siteUrl: SITE_URL });
  const pieces: Record<string, unknown>[] = [];
  const orgId = ids.organization("agencia-chucao");

  // 1. WebSite (Configurado con SearchAction de búsqueda interna)
  pieces.push(
    buildWebSite(
      {
        url: SITE_URL,
        name: "Agencia Chucao",
        description:
          "Sistema de captación medible para clínicas dentales en Santiago: Google Ads, landing de conversión y seguimiento por WhatsApp.",
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        } as never,
      },
      ids
    )
  );

  // 2. Organización / Autor / Persona
  pieces.push(
    buildPiece({
      "@type": "Organization",
      "@id": orgId,
      name: "Agencia Chucao",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    })
  );

  const authorId = `${SITE_URL}/#author-pepito`;
  pieces.push(
    buildPiece({
      "@type": "Person",
      "@id": authorId,
      name: options.authorName || "Pepito Perez",
      url: `${SITE_URL}/nosotros/`,
      knowsAbout: ["Google Ads", "SEO Local", "Google Business Profile", "Lead Generation", "Conversion web"],
    })
  );

  // 3. WebPage y/o Article (si aplica)
  pieces.push(
    buildWebPage(
      {
        url: options.url,
        name: options.title,
        description: options.description,
        isPartOf: { "@id": ids.website },
        breadcrumb: { "@id": ids.breadcrumb(options.url) },
        ...(options.publishDate ? { datePublished: options.publishDate } : {}),
      },
      ids
    )
  );

  if (options.pageType === "blogPost") {
    pieces.push(
      buildArticle(
        {
          url: options.url,
          isPartOf: { "@id": ids.webPage(options.url) },
          headline: options.title,
          description: options.description,
          datePublished: options.publishDate || new Date(),
          author: { "@id": authorId },
          publisher: { "@id": orgId },
          articleSection: options.category || "General",
        },
        ids,
        "BlogPosting"
      )
    );
  }

  return {
    "@context": "https://schema.org" as const,
    "@graph": pieces,
  };
}
