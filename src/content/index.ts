import type React from 'react';

import { ArticleMetaSchema, ProjectMetaSchema, type ArticleMeta, type ProjectMeta } from './schema';

type MdxModule = {
  default: React.ComponentType;
  meta: unknown;
};

export type Project = {
  meta: ProjectMeta;
  Component: React.ComponentType;
  url: string;
  sourcePath: string;
};

export type Article = {
  meta: ArticleMeta;
  Component: React.ComponentType;
  url: string;
  sourcePath: string;
};

const includeDrafts = !import.meta.env.PROD;

function parseProject(path: string, mod: MdxModule): Project {
  const parsed = ProjectMetaSchema.safeParse(mod.meta);
  if (!parsed.success) {
    throw new Error(`Invalid project meta in ${path}: ${parsed.error.message}`);
  }
  const meta = parsed.data;
  return {
    meta,
    Component: mod.default,
    url: `/work/${meta.slug}`,
    sourcePath: path
  };
}

function parseArticle(path: string, mod: MdxModule): Article {
  const parsed = ArticleMetaSchema.safeParse(mod.meta);
  if (!parsed.success) {
    throw new Error(`Invalid article meta in ${path}: ${parsed.error.message}`);
  }
  const meta = parsed.data;
  return {
    meta,
    Component: mod.default,
    url: `/writing/${meta.slug}`,
    sourcePath: path
  };
}

const projectModules = import.meta.glob('./projects/*.mdx', { eager: true }) as Record<string, MdxModule>;
const articleModules = import.meta.glob('./writing/*.mdx', { eager: true }) as Record<string, MdxModule>;

export const projects: Project[] = Object.entries(projectModules)
  .map(([path, mod]) => parseProject(path, mod))
  .filter((p) => (includeDrafts ? true : !p.meta.draft))
  .sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());

export const articles: Article[] = Object.entries(articleModules)
  .map(([path, mod]) => parseArticle(path, mod))
  .filter((a) => (includeDrafts ? true : !a.meta.draft))
  .sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.meta.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.meta.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((p) => p.meta.featured).slice(0, limit);
}


export { listAllTags } from './utils';
