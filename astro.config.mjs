// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Change this when the custom domain goes live
  site: 'https://elizabethcf01.github.io',
  integrations: [tailwind()]
});