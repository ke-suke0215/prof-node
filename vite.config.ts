import { reactRouter } from '@react-router/dev/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import serverAdapter from 'hono-react-router-adapter/vite';
import adapter from '@hono/vite-dev-server/cloudflare';

export default defineConfig({
  plugins: [
    serverAdapter({
      adapter,
      entry: 'server/index.ts',
    }),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
