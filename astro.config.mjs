import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://lipfooddrinks.pt',
  integrations: [tailwind()],
  output: 'static',
});
