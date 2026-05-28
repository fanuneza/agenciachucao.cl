import { site } from "@/config/site";

export type JsonLdNode = Record<string, unknown>;

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

export type StructuredDataInput = {
  canonicalUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  pathname: string;
  breadcrumbLabels?: Record<string, string>;
  extraNodes?: JsonLdNode | JsonLdNode[] | JsonLdGraph;
};

function normalizeUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function normalizeExtraNodes(extraNodes?: StructuredDataInput["extraNodes"]): JsonLdNode[] {
  if (!extraNodes) return [];
  if (Array.isArray(extraNodes)) return extraNodes;
  if ("@graph" in extraNodes && Array.isArray(extraNodes["@graph"])) return extraNodes["@graph"];

  const node = { ...extraNodes };
  delete node["@context"];
  return [node];
}

export function buildStructuredDataGraph(input: StructuredDataInput): JsonLdGraph {
  const siteUrl = normalizeUrl(site.siteUrl);
  const canonicalUrl = normalizeUrl(input.canonicalUrl);
  const logoUrl = new URL(site.logo, site.siteUrl).toString();
  const logoId = `${siteUrl}/#logo`;
  const imageId = `${canonicalUrl}#primaryimage`;
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  const graph: JsonLdNode[] = [
    {
      "@type": "ImageObject",
      "@id": logoId,
      url: logoUrl,
      contentUrl: logoUrl,
      caption: `${site.siteName} logo`,
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: input.imageUrl,
      contentUrl: input.imageUrl,
      caption: input.title,
    },
    {
      "@type": site.organization.type,
      "@id": organizationId,
      name: site.organization.name,
      url: site.siteUrl,
      logo: { "@id": logoId },
      image: { "@id": imageId },
      email: site.organization.email,
      telephone: site.organization.telephone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.organization.addressLocality,
        addressRegion: site.organization.addressRegion,
        addressCountry: site.organization.addressCountry,
      },
      serviceType: site.organization.serviceType,
      sameAs: site.socialProfiles,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.siteUrl,
      name: site.siteName,
      description: site.defaultDescription,
      inLanguage: site.locale,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: input.canonicalUrl,
      name: input.title,
      description: input.description,
      inLanguage: site.locale,
      isPartOf: { "@id": websiteId },
      publisher: { "@id": organizationId },
      primaryImageOfPage: { "@id": imageId },
    },
  ];

  const segments = input.pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    graph.push(buildBreadcrumbList(segments, input.breadcrumbLabels ?? {}));
  }

  graph.push(...normalizeExtraNodes(input.extraNodes));

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildBreadcrumbList(segments: string[], labels: Record<string, string> = {}): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${site.siteUrl}/` },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: labels[segment] ?? segment,
        item: `${site.siteUrl}/${segments.slice(0, index + 1).join("/")}/`,
      })),
    ],
  };
}

export function buildFaqPage(items: Array<{ question: string; answer: string }>): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
