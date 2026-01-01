import { z } from 'zod';

export const DateISO = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD')
  .transform((s) => new Date(`${s}T00:00:00Z`));

export const ProjectMetaSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Use kebab-case'),
  date: DateISO,
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  summary: z.string().min(1),
  cover: z.string().optional(),
  demo: z.string().url().optional(),
  repo: z.string().url().optional(),
  draft: z.boolean().default(false)
});

export type ProjectMeta = z.infer<typeof ProjectMetaSchema>;

export const ArticleMetaSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Use kebab-case'),
  date: DateISO,
  tags: z.array(z.string().min(1)).default([]),
  summary: z.string().min(1),
  draft: z.boolean().default(false)
});

export type ArticleMeta = z.infer<typeof ArticleMetaSchema>;
