import { Link } from 'react-router-dom';

import { getFeaturedProjects, projects } from '../content';
import { Card, CardBody, Tag } from '../components/ui';

export function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <div className="space-y-10">
      <section className="pt-6">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Designing and building products
          <span className="text-white/60"> with speed, taste, and rigor.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70">
          Portfolio as a single, continuous scene: a 3D particle field that subtly reacts as you explore work and writing.
          Content is managed as MDX files — simple, fast, git-native.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/work"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
          >
            View Work
          </Link>
          <Link
            to="/writing"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-black/30 transition"
          >
            Read Writing
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <Link key={p.meta.slug} to={p.url} className="group">
            <Card className="h-full group-hover:bg-white/[0.08] transition">
              <CardBody className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{p.meta.title}</h2>
                  <Tag>{p.meta.date.toISOString().slice(0, 10)}</Tag>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{p.meta.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {p.meta.tags.slice(0, 4).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </section>

      <section id="about" className="scroll-mt-24">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              Replace this with your story: what you build, what you optimize for, and the edge you bring.
              This template is tuned for GitHub Pages (fast CI/CD, static hosting) while keeping a premium feel.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>React</Tag>
              <Tag>Vite</Tag>
              <Tag>R3F</Tag>
              <Tag>MDX</Tag>
              <Tag>GitHub Pages</Tag>
            </div>

            <p className="mt-6 text-sm text-white/50">
              Total projects in content directory: <span className="text-white/70">{projects.length}</span>
            </p>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
