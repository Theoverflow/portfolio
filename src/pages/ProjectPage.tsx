import { Link, useParams } from 'react-router-dom';

import { getProjectBySlug } from '../content';
import { Mdx } from '../components/Mdx';
import { Card, CardBody, Tag } from '../components/ui';

export function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="text-white/70">No project matches <code>{slug}</code>.</p>
        <Link to="/work" className="text-white underline decoration-white/25 hover:decoration-white/60">
          Back to Work
        </Link>
      </div>
    );
  }

  const { meta, Component } = project;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/work" className="text-white/70 hover:text-white transition">
          ← Back
        </Link>
        <div className="flex gap-3">
          {meta.demo ? (
            <a
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
              href={meta.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          ) : null}
          {meta.repo ? (
            <a
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-black/30 transition"
              href={meta.repo}
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          ) : null}
        </div>
      </div>

      <header className="space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{meta.title}</h1>
          <Tag>{meta.date.toISOString().slice(0, 10)}</Tag>
        </div>
        <p className="text-white/70 max-w-3xl">{meta.summary}</p>
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      <Card>
        <CardBody>
          <article className="prose prose-invert max-w-none">
            <Mdx>
              <Component />
            </Mdx>
          </article>
        </CardBody>
      </Card>
    </div>
  );
}
