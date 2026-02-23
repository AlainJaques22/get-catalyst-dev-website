import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://get-catalyst.dev',
  output: 'static',
  integrations: [react(), tailwind()],
});
