# FELLOW VECTOR
### fellowvector.com

> *The future is already broadcasting.*

Consulting, speaking, and webinar site for Fellow Vector — the practice of Charles Wilke.
Built on Astro with a CRT signal aesthetic: phosphor green, scanlines, boot sequences, and
imagery drawn from the inside of the machines that made the broadcast age possible.

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
    CRTIntro.astro    — boot sequence overlay, plays once per session
    Nav.astro         — fixed navigation
    Footer.astro      — site footer
  layouts/
    BaseLayout.astro  — HTML shell, meta tags, OG image, fonts
  pages/
    index.astro       — home
    services.astro    — consulting, speaking, webinars
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
    bulb.webp           — vacuum tube that peeks into CTAs and the footer
    cw4.webp, cw2.webp  — portrait (illustration + photo reveal)

public/                 — served as-is, no processing
  og.jpg              — OG / social share image (1200x630)
  favicon.svg         — phosphor waveform mark
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

---

## Signal active.
