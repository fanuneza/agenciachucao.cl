import { getCollection, type CollectionEntry } from "astro:content";
import { createMarkdownEndpoint } from "@jdevalk/astro-seo-graph";

export const getStaticPaths = async () => {
  const posts: CollectionEntry<"blog">[] = await getCollection("blog");
  return posts.map((p) => ({ params: { slug: p.id } }));
};

export const GET = createMarkdownEndpoint({
  entries: () => getCollection("blog") as never,
  mapper: (post, slug) => {
    const p = post as CollectionEntry<"blog">;
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
