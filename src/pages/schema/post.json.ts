import { getCollection } from "astro:content";
import { createSchemaEndpoint } from "@jdevalk/astro-seo-graph";
import { buildSchemaGraph } from "../../utils/schema";

interface BlogPostEntry {
  id: string;
  body: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    author: string;
    category?: string;
    heroImage?: string;
  };
}

export const GET = createSchemaEndpoint({
  entries: () => getCollection("blog") as never,
  mapper: (post) => {
    const p = post as BlogPostEntry;
    const url = `https://agenciachucao.cl/blog/${p.id}/`;
    const graph = buildSchemaGraph({
      pageType: "blogPost",
      url,
      title: p.data.title,
      description: p.data.description,
      publishDate: p.data.pubDate,
      authorName: p.data.author,
      featureImageUrl: p.data.heroImage,
      category: p.data.category,
    });
    return graph["@graph"] as never;
  },
});
