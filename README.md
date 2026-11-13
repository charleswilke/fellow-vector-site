# FELLOW VECTOR
### fellowvector.com

> *The future is already broadcasting.*

AI tutoring, role-focused workshops, and speaking site for Fellow Vector — the practice of Charles Wilke.
Built on Astro with a warm school-computer-room aesthetic: amber phosphor, gentle
scanlines, tactile keyboard navigation, paper labels, and Charles's CW bulb character.

---

## Stack

- **Framework** — Astro (static)
- **Fonts** — VT323, Share Tech Mono (Google Fonts)
- **Styling** — Pure CSS with custom properties, no framework
- **Deployment** — Vercel, connected to this repo (auto-deploys on push to `main`)

---

## Structure

```
src/
  components/
    CRTIntro.astro    — silent first-visit navigation accent, plays once per 30 days
    Nav.astro         — fixed navigation
    Footer.astro      — site footer
  layouts/
    BaseLayout.astro  — HTML shell, meta tags, OG image, fonts
  pages/
    index.astro       — home
    services.astro    — tutoring, speaking, role-focused workshops
    about.astro       — about Charles
    book.astro        — booking page
  styles/
    global.css        — design system, CRT texture, component styles
  assets/             — images rendered through astro:assets <Image> (responsive srcset, hashed)
    splash.webp         — hero background (CRT glass, home)
    services.webp       — services header (electron gun)
    about.webp          — about header (oscilloscope)
    book.webp           — book header (radio tuner dial)
    writings.webp       — writing header (teletype internals)
    focus.webp          — services grid background (lens)
    signal.webp         — CTA background (phosphor light trails)
    patchbay.webp       — services CTA background (patch bay)
    cw-bulb-amber.webp   — CW character peeking above service cards, CTAs, and footer
    floppy-disk-note-v1.webp — full disk behind the desktop hero note
    floppy-label.webp   — standalone mobile note
    nav-keycap.webp     — tactile keyboard texture
    cw4.webp, cw2.webp  — illustrated label portrait and bio photograph

public/                 — served as-is, no processing
  og.jpg              — striped social graphic with Charles's drawn portrait (1200x630)
  favicon.svg         — smiling amber pixel bulb, also supplied as ICO
  apple-touch-icon.png — home-screen version of the smiling bulb
  fonts/, audio/      — self-hosted fonts, CRT power-on sound
```

---

## Dev

```sh
npm install
npm run dev       # localhost:4321
npm run build     # production build to ./dist
npm run preview   # preview production build locally
```

---

## Documentation

| Doc | Contents |
|-----|---------|
| [`docs/DESIGN.md`](docs/DESIGN.md) | Design system, tokens, components, CRT effects |
| [`docs/VOICE.md`](docs/VOICE.md) | Brand voice, copy principles, Charles's background |
| [`docs/IMAGES.md`](docs/IMAGES.md) | Visual narrative, image prompting guide, treatments |
| [`docs/TECHNICAL.md`](docs/TECHNICAL.md) | Architecture, iOS gotchas, deployment, patterns |
| [`docs/SEARCH_CONSOLE.md`](docs/SEARCH_CONSOLE.md) | Search Console property, sitemap, ongoing checks, and SEO change log |

---

## Signal active.
