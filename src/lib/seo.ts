import { site } from "@/config/site";

export type SeoInput = {
  title?: string;
  description?: string;
  canonical?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

export function buildTitle(title?: string) {
  if (!title) return site.defaultTitle;
  if (title === site.siteName || title.includes(site.siteName)) return title;
  return `${title} | ${site.siteName}`;
}

export function buildCanonical(input: Pick<SeoInput, "canonical" | "path"> = {}) {
  const target = input.canonical ?? input.path ?? "/";
  return new URL(target, site.siteUrl).toString();
}

export function buildSeo(input: SeoInput = {}) {
  const title = buildTitle(input.title);
  const description = input.description ?? site.defaultDescription;
  const canonical = buildCanonical(input);
  const image = new URL(input.image ?? site.defaultOgImage, site.siteUrl).toString();

  return {
    title,
    description,
    canonical,
    image,
    noindex: input.noindex ?? false,
  };
}
