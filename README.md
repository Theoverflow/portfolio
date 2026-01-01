# Constellation Portfolio (Vite + React Router + MDX + R3F)

A fast static portfolio with a 3D particles background and **MDX content** stored in Git.
Designed for **GitHub Pages** deployments.

## Local development

```bash
npm install
npm run dev
```

## Content management (MDX)

- Projects: `src/content/projects/*.mdx`
- Articles: `src/content/writing/*.mdx`

Each MDX file exports a `meta` object:

```mdx
export const meta = {
  title: '...',
  slug: 'kebab-case',
  date: 'YYYY-MM-DD',
  tags: ['...'],
  summary: '...',
  featured: true,
  repo: 'https://...',
  demo: 'https://...'
};

## Heading

Your content...
```

Metadata is validated at build time with Zod (`src/content/schema.ts`).

## Deployment (GitHub Pages)

This repo includes a GitHub Actions workflow: `.github/workflows/deploy.yml`.

1. In GitHub: **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` and it deploys.

### Base path

- **Project pages** (`username.github.io/repo`): base should be `/<repo>/` (default)
- **User/Org pages** (`username.github.io`): base should be `/`

Override by setting a repo variable:

- **Settings → Secrets and variables → Actions → Variables**
- Add `BASE_PATH` with value `/`

### SPA routing on GitHub Pages

GitHub Pages doesn’t natively rewrite routes for SPA apps.
This template includes the standard `404.html` redirect workaround.

If you deploy to a **user/org page**, edit `public/404.html` and set:

```js
var segmentCount = 0;
```

For project pages keep `segmentCount = 1`.

## Customize

- Name / links: `src/app/Layout.tsx`
- Particle look/feel: `src/components/ParticlesField.tsx`
- Colors/typography: `src/styles/global.css` and `tailwind.config.ts`
