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
| `src/components/CRTIntro.astro` | Boot sequence overlay — the entry experience |
| `src/components/Nav.astro` | Fixed navigation with mobile toggle |
| `src/components/Footer.astro` | Footer with pulsing signal indicator |

---

## CRT Intro Animation

`CRTIntro.astro` runs a boot sequence on first page load per session.

- Uses `sessionStorage` key `fv_intro_seen` — set to `'1'` on dismiss
- To test again: DevTools → Application → Session Storage → delete the key
- Dismiss triggers on: click, keydown, touchstart, or auto after sequence completes
- **iOS note:** The collapse animation (`crt-collapse` keyframes) must NOT use
  `filter: brightness()` combined with `transform` — this breaks on WebKit.
  Current animation uses only `transform` + `opacity`.
- `animationend` has an 800ms fallback timeout in case the event doesn't fire (iOS).

---

## Persistent CRT Overlays

`body::before` (vignette) and `body::after` (scanlines) are `position: fixed` overlays.
They sit at z-index 9000–9001, above all page content but below the intro (99999).

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
