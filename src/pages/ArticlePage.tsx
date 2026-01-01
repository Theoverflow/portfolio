import { Link, useParams } from 'react-router-dom';

import { getArticleBySlug } from '../content';
import { Mdx } from '../components/Mdx';
import { Card, CardBody, Tag } from '../components/ui';

export function ArticlePage() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <p className="text-white/70">No article matches <code>{slug}</code>.</p>
        <Link to="/writing" className="text-white underline decoration-white/25 hover:decoration-white/60">
          Back to Writing
        </Link>
      </div>
    );
  }

  const { meta, Component } = article;

  return (
    <div className="space-y-6">
      <Link to="/writing" className="text-white/70 hover:text-white transition">
        ← Back
      </Link>

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
