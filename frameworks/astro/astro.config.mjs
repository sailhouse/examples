import sailhouse from '@sailhouse/astro';
import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-sailhouse.netlify.app',
  output: 'hybrid',
  integrations: [sailhouse({
    token: import.meta.env.SAILHOUSE_TOKEN,
    schemaKey: 'astro-example',
    skipCreation: process.env.CONTEXT !== 'production'
  })],
  adapter: netlify()
});
