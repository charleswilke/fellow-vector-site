# Fellow Vector — Design System

## Concept

The site aesthetic is built around one central metaphor: **entering through a CRT television**.
The static, fuzz, and electric feeling of passing through that membrane into the future.
Every visual and interaction decision traces back to this — the phosphor glow, the scanlines,
the boot sequence, the imagery drawn from analog broadcast machinery.

This is not a retro/nostalgia aesthetic. It's a **threshold aesthetic**. The CRT is the entry
point into something forward-looking, not a celebration of the past.

---

## Color Tokens

Defined in `src/styles/global.css` as CSS custom properties:

```css
--bg:            #08090f   /* near-black, slight blue-green tint */
--bg-surface:    #0e1018   /* card/panel backgrounds */
--bg-raised:     #141620   /* elevated surfaces */
--fg:            #dde1ec   /* body text */
--fg-muted:      #6b7390   /* secondary text, labels */
--phosphor:      #00ff88   /* primary accent — phosphor green */
--phosphor-dim:  #00804a   /* dimmed phosphor, borders */
--electric:      #00ccff   /* secondary accent — electric blue */
--electric-dim:  #006b88   /* dimmed electric */
--amber:         #ffb300   /* tertiary accent — warm amber */
--border:        rgba(0, 255, 136, 0.12)
--border-hover:  rgba(0, 255, 136, 0.35)
```

**Color usage rules:**
- `--phosphor` is the primary brand color. Use for headlines, active states, primary CTAs.
- `--electric` is secondary. Use for hover states, links, and the Speaking service.
- `--amber` is tertiary. Use sparingly — currently assigned to Webinars.
- Never use pure white (`#fff`) — always use `--fg` or lighter variants.
- Backgrounds should always be dark. This is a dark-only site.

---

## Typography

```css
--font-mono: 'Share Tech Mono', 'Courier New', monospace  /* body, UI, labels */
--font-crt:  'VT323', monospace                            /* headings, display text */
```

Loaded from Google Fonts in `src/layouts/BaseLayout.astro`.

**Usage:**
- All headings (`h1`–`h4`) use `VT323`. This is the CRT/terminal display font.
- All body copy, labels, nav, buttons use `Share Tech Mono`.
- Never use a sans-serif or serif. Monospace only throughout.
- Heading sizes scale with `clamp()` — responsive without breakpoints.
- Letter-spacing on labels: `0.14–0.18em`. On headings: `0.04–0.08em`.

---

## Persistent CRT Effects

Applied globally via `body::before` (vignette) and `body::after` (scanlines) in `global.css`.
These are `position: fixed` overlays that sit on top of all content at z-index 9000–9001.

- **Scanlines**: `repeating-linear-gradient` at 4px intervals, 7% opacity black
- **Vignette**: radial gradient from transparent center to 55% black at edges

These should never be removed. They're the connective tissue of the aesthetic.

---

## Component Patterns

### Page Hero (with background image)
Every page uses this pattern for its header:

```html
<section class="page-hero">
  <div class="page-hero-bg">
    <img src="/image.jpg" alt="" class="page-hero-splash" />
    <!-- ::after gradient overlay handled in CSS -->
  </div>
  <div class="container page-hero-inner">
    <div class="label">// section label</div>
    <h1>Page Title</h1>
    <p class="text-muted page-hero-sub">Subheading text.</p>
  </div>
</section>
```

The `::after` on `.page-hero-bg` applies a left-to-right gradient (dark left, transparent right)
plus a bottom gradient to blend into the page background. Opacity on the image is typically
`0.35–0.45`.

### CTA Section (with background image)
```html
<section class="cta-section">
  <div class="cta-bg">
    <img src="/image.jpg" alt="" class="cta-splash" />
  </div>
  <div class="container cta-inner">
    <h2>CTA Headline</h2>
    <p>Supporting text.</p>
    <a href="/book" class="btn btn-primary">CTA Button</a>
  </div>
</section>
```

CTA sections use a radial gradient overlay (dark edges, slightly lighter center).
Image opacity is typically `0.12–0.28` — subtle, atmospheric, not competing with text.

### Labels
Short uppercase identifiers that precede section headings:
```html
<div class="label">// section name</div>
```
Always use the `//` prefix. Color is `--phosphor` at 0.7 opacity.

### Buttons
Two variants:
- `.btn.btn-primary` — filled phosphor green, dark text
- `.btn.btn-ghost` — transparent, muted border, used for secondary actions

Buttons use `clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)`
for a subtle beveled corner effect.

### Cards
`.card` has a left border accent that animates height to 100% on hover.
Cards use `--bg-surface` background with `--border` border.

---

## Spacing Scale

```css
--sp-xs:  0.25rem
--sp-sm:  0.5rem
--sp-md:  1rem
--sp-lg:  2rem
--sp-xl:  4rem
--sp-2xl: 8rem
```

Section padding is always `var(--sp-2xl) 0`. Container max-width is `1100px`.

---

## Glow Effects

```css
--glow-green: 0 0 6px rgba(0, 255, 136, 0.5), 0 0 18px rgba(0, 255, 136, 0.15)
--glow-blue:  0 0 6px rgba(0, 204, 255, 0.5), 0 0 18px rgba(0, 204, 255, 0.15)
```

Apply with utility classes `.glow-green` and `.glow-blue`. Use on headlines, active nav
links, and key UI moments. Don't overuse — glow should feel earned.

---

## What to Avoid

- Don't add rounded corners (`border-radius`) to structural elements. Hard edges are intentional.
- Don't use color backgrounds on sections except `--bg-surface` for alt sections.
- Don't introduce new fonts. The two-font system is load-efficient and aesthetically locked.
- Don't use CSS animations that combine `filter` and `transform` — breaks on iOS WebKit.
- Don't add emojis anywhere. Ever.
