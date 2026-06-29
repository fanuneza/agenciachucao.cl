import { getCollection } from "astro:content";
import { createMarkdownEndpoint } from "@jdevalk/astro-seo-graph";

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

export const getStaticPaths = async () => {
  const posts = (await getCollection("blog")) as unknown as BlogPostEntry[];
  return posts.map((p) => ({ params: { slug: p.id } }));
};

export const GET = createMarkdownEndpoint({
  entries: () => getCollection("blog") as never,
  mapper: (post, slug) => {
    const p = post as BlogPostEntry;
    return p.id !== slug
      ? null
      : {
          frontmatter: {
            title: p.data.title,
            canonical: `https://agenciachucao.cl/blog/${p.id}/`,
            pubDate: p.data.pubDate,
            author: p.data.author,
            description: p.data.description,
            category: p.data.category,
          },
          body: p.body ?? "",
        };
  },
});
