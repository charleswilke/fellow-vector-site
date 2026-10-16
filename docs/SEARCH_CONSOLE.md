# Fellow Vector — Search Console

Include Fellow Vector alongside charleswilke.com and hausoftoots.com in ongoing Search Console checks.

- Property: `https://fellowvector.com/` (URL prefix).
- Sitemap: `https://fellowvector.com/sitemap-index.xml`.
- Ownership verification: Google meta tag in `src/layouts/BaseLayout.astro`. Keep this tag after verification.
- Domain property `sc-domain:fellowvector.com` also exists, but still requires DNS verification.

## Regular checks

Compare clicks, impressions, queries, landing pages, and average position against the previous check, noting the report date range. Check sitemap fetch/discovery, indexed and excluded pages, canonical or redirect issues, and HTTPS status. Record unavailable or processing reports as pending rather than zero.

## Change log

- October 15, 2026: Feed essay links now point to `https://charleswilke.com/read/<slug>` instead of Substack (commit `bde7d5f`). Applies to the Writing page and About sidebar. Substack RSS remains the source for new essays; subscription and archive links still lead to Substack.
- October 15, 2026: Added the Google ownership verification meta tag for the HTTPS property.
