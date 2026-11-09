# Fellow Vector — Technical Notes

## Stack

- **Astro v6** — static site generator, no framework adapter needed
- **Pure CSS** — no Tailwind, no CSS modules, scoped styles in `.astro` files + `global.css`
- **TypeScript** — used in Astro component `<script>` blocks
- **Google Fonts** — VT323 + Share Tech Mono, loaded via `<link>` in `BaseLayout.astro`
- **Vercel** — auto-deploys on push to `main`

---

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/BaseLayout.astro` | HTML shell, all meta/OG tags, font loading, CRTIntro |
| `src/styles/global.css` | Design tokens, global resets, persistent CRT effects |
| `src/components/CRTIntro.astro` | Subtle first-visit navigation accent |
| `src/components/Nav.astro` | Fixed navigation with four equal-width tactile keys |
| `src/components/Footer.astro` | Footer with pulsing signal indicator |

---

## CRT Intro Animation

`CRTIntro.astro` adds a silent, 2.2-second phosphor sweep beneath the navigation,
a soft logo glow, and a small “signal acquired” note beneath the logo. Content is
visible and interactive throughout; the effect has no overlay, canvas, audio, or input handlers.

- Plays once per 30 days: `localStorage` key `fv_intro_seen` holds an expiry timestamp.
- Existing expiry timestamps from the old intro remain valid.
- Skipped on `/book` and under `prefers-reduced-motion`, even with `?intro`.
- `?intro` replays the accent elsewhere for review. The old audio variants are no longer used.
- Storage failures never block the page; the accent can run without persistence.
- The animation attribute is removed after 2.3 seconds.

---

## Persistent CRT Overlays

`body::before` (vignette) and `body::after` (scanlines) are `position: fixed` overlays.
They sit at z-index 9000–9001, above page content, and do not intercept input.
Scanlines are one pixel tall at four-pixel intervals, at 4.5% opacity. The fixed
`.crt-glass` layer sits behind the content at z-index 0 and supplies static window
reflections. Main content and footer sit at z-index 1.

The shared `--nav-height` token controls main-content padding, sticky sidebars, and
anchor offsets. Header heights are 88px, 144px below 760px, and 200px below 480px.
Navigation stays visible as a two-by-two keyboard on small phones.

**iOS safe area:** The overlays use explicit `top/left/right/bottom` instead of `inset`
and `bottom: env(safe-area-inset-bottom, 0)` to prevent a gap at the bottom on iPhone.
The meta viewport tag uses `viewport-fit=cover` to enable safe area support.

---

## Signal Ticker

The scrolling ticker on the home page (`index.astro`) uses 4 identical copies of the
content in HTML, animated with `translateX(0)` to `translateX(-25%)`. This ensures the
loop seam is always off-screen on any viewport width. Do NOT use JavaScript duplication
(previous approach) — it causes a visible snap on loop.

---

## RSS Feed

`SubstackFeed.astro` loads `/api/feed` and renders full reading cards on Writing or
compact paper notes on About. Styles live in `src/styles/feed.css` because the
post markup is created at runtime. Loading and error states preserve an archive
link; hidden states must remain hidden despite the list's flex/grid styling.

In production, Vercel runs `api/feed.js`. The `local-feed-preview` Astro integration
in `astro.config.mjs` adapts that same handler to the local dev server. It runs only
in the dev-server setup hook and uses the same upstream RSS, parser, and reader links.

## Image Backgrounds

All section background images follow this structure:
```
<div class="bg-wrapper">         position: absolute, top/left/width/height (NOT inset)
  <img class="bg-img" />         width/height 100%, object-fit: cover
  <!-- ::after overlay -->        position: absolute, top/left/width/height (NOT inset)
</div>
```

Use explicit `top: 0; left: 0; width: 100%; height: 100%` on both the wrapper and `::after`
pseudo-element rather than `inset: 0`. Some mobile browsers handle these differently.

For CTA sections that butt up against the footer: remove `margin-top` from `#site-footer`
in `Footer.astro`. The footer's `border-top` handles visual separation.

---

## Adding a New Page

1. Create `src/pages/[name].astro`
2. Import and use `BaseLayout` with `title` and `description` props
3. Follow the page hero pattern (see `DESIGN.md`)
4. Add the route to `Nav.astro` `navLinks` array
5. Add a footer link if appropriate

---

## Deployment

Vercel is connected to the GitHub repo `charleswilke/fellow-vector-site`.
Every push to `main` triggers an automatic redeploy. No manual deploy steps needed.

Custom domain: `fellowvector.com` (registered at GoDaddy)
DNS: A record → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`

---

## Known Gotchas

- **Don't combine `filter` and `transform` in the same CSS keyframe animation** — iOS WebKit
  will either skip the animation or leave the element in a broken state.
- **`animationend` is unreliable on iOS** — always add a timeout fallback.
- **The `og-template.html` in the project root is not deployed** — it's a dev utility for
  regenerating the OG image. It's safe to ignore in production.
- **CRLF warnings on commit** — normal on Windows, harmless. Git is configured to handle
  line ending conversion automatically.
