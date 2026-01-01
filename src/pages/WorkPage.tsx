import React from 'react';
import { Link } from 'react-router-dom';

import { listAllTags, projects } from '../content';
import { Card, CardBody, Input, Tag } from '../components/ui';

function includesCI(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function WorkPage() {
  const tags = React.useMemo(() => listAllTags(projects), []);
  const [q, setQ] = React.useState('');
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const query = q.trim();
    return projects.filter((p) => {
      if (activeTag && !p.meta.tags.includes(activeTag)) return false;
      if (!query) return true;
      const inTitle = includesCI(p.meta.title, query);
      const inSummary = includesCI(p.meta.summary, query);
      const inTags = p.meta.tags.some((t) => includesCI(t, query));
      return inTitle || inSummary || inTags;
    });
  }, [q, activeTag]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Work</h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            Projects are MDX files under <code>src/content/projects</code>. Each exports a typed <code>meta</code> object.
          </p>
        </div>
        <div className="w-full md:w-80">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" />
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

      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <Link key={p.meta.slug} to={p.url} className="group">
            <Card className="h-full group-hover:bg-white/[0.08] transition">
              <CardBody className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{p.meta.title}</h2>
                  <Tag>{p.meta.date.toISOString().slice(0, 10)}</Tag>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{p.meta.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {p.meta.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </section>

      {filtered.length === 0 ? <p className="text-white/60">No projects matched.</p> : null}
    </div>
  );
}
