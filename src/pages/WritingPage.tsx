import React from 'react';
import { Link } from 'react-router-dom';

import { articles, listAllTags } from '../content';
import { Card, CardBody, Input, Tag } from '../components/ui';

function includesCI(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function WritingPage() {
  const tags = React.useMemo(() => listAllTags(articles), []);
  const [q, setQ] = React.useState('');
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const query = q.trim();
    return articles.filter((a) => {
      if (activeTag && !a.meta.tags.includes(activeTag)) return false;
      if (!query) return true;
      const inTitle = includesCI(a.meta.title, query);
      const inSummary = includesCI(a.meta.summary, query);
      const inTags = a.meta.tags.some((t) => includesCI(t, query));
      return inTitle || inSummary || inTags;
    });
  }, [q, activeTag]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Writing</h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            Articles are MDX files under <code>src/content/writing</code>. Add diagrams, code blocks, or even small React
            components.
          </p>
        </div>
        <div className="w-full md:w-80">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={[
            'rounded-full border px-3 py-1 text-xs transition',
            !activeTag ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
          ].join(' ')}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
            className={[
              'rounded-full border px-3 py-1 text-xs transition',
              activeTag === t
                ? 'bg-white/15 border-white/20 text-white'
                : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </div>

      <section className="grid gap-4">
        {filtered.map((a) => (
          <Link key={a.meta.slug} to={a.url} className="group">
            <Card className="group-hover:bg-white/[0.08] transition">
              <CardBody className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{a.meta.title}</h2>
                  <Tag>{a.meta.date.toISOString().slice(0, 10)}</Tag>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{a.meta.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {a.meta.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </section>

      {filtered.length === 0 ? <p className="text-white/60">No articles matched.</p> : null}
    </div>
  );
}
