import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.date(),
    author: z.string().default('Fabián'),
    service: z.enum([
      'redes-sociales',
      'seo',
      'desarrollo-web',
      'google-business',
      'contenido',
      'email-marketing',
      'publicidad',
      'default',
    ]).default('default'),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
