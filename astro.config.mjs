// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import feedHandler from './api/feed.js';

// Astro's static dev server does not execute Vercel's /api functions.
// Reuse the production handler locally so feed changes can be reviewed with real posts.
/** @type {import('astro').AstroIntegration} */
const localFeedPreview = {
  name: 'local-feed-preview',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use('/api/feed', (req, res, next) => {
        if (req.method !== 'GET') return next();
        const response = {
          setHeader: res.setHeader.bind(res),
          status(code) { res.statusCode = code; return response; },
          json(body) { res.end(JSON.stringify(body)); },
        };
        void feedHandler(req, response).catch(next);
      });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://fellowvector.com',
  integrations: [sitemap(), localFeedPreview],
});
