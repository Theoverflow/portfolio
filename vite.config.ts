import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = (process.env.BASE_PATH || env.BASE_PATH || env.VITE_BASE_PATH || '/').trim();

  return {
    base: base.endsWith('/') ? base : `${base}/`,
    plugins: [
      react(),
      mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight]
      })
    ],
    build: {
      target: 'es2022',
      cssMinify: true,
      reportCompressedSize: false
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/tests/setup.ts']
    }
  };
});
