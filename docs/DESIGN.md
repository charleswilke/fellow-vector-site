# Fellow Vector — Design System

## Concept

The site aesthetic is built around one central metaphor: **entering through a CRT television**.
The static, fuzz, and electric feeling of passing through that membrane into the future.
Every visual and interaction decision traces back to this — the phosphor glow, the scanlines,
the first-visit signal accent, the imagery drawn from analog broadcast machinery.

The terminal is a familiar entry point for learning something new. Charles calls this the
**C-prompt lifestyle**: the curiosity of an Apple II, Math Blaster, or The Oregon Trail,
brought into a present-day conversation about AI. The nostalgia is intentional and welcoming.
Keep the phosphor glow, scanlines, typography, and machinery imagery. References should
invite experimentation without making prior computer experience a requirement.

---

## Color Tokens

Defined in `src/styles/global.css` as CSS custom properties:

```css
--bg:            #100d09   /* warm near-black */
--bg-surface:    #17120c   /* card/panel backgrounds */
--bg-raised:     #211a10   /* elevated surfaces */
--fg:            #f1e5cd   /* body text */
--fg-muted:      #c5b496   /* secondary text, labels */
--phosphor:      #ffbd59   /* primary accent — amber phosphor */
--phosphor-dim:  #996626   /* dimmed phosphor, borders */
--electric:      #f4d99a   /* secondary accent — pale gold */
--electric-dim:  #9e8150   /* dimmed electric */
--amber:         #ed9851   /* tertiary accent — burnt orange */
--border:        rgba(255, 189, 89, 0.12)
--border-hover:  rgba(255, 189, 89, 0.35)
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
- **Vignette**: radial gradient from transparent center to 30% black at edges

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
Always use the `//` prefix. Color is `--phosphor` at 0.85 opacity.

### Buttons
Two variants:
- `.btn.btn-primary` — filled amber phosphor, dark text
- `.btn.btn-ghost` — transparent, muted border, used for secondary actions

Buttons use `clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)`
for a subtle beveled corner effect.

Primary buttons wipe from amber to dark, left to right, on hover and keyboard focus,
with a 3px forward nudge. An angled overlay uses local difference blending to keep
the label readable throughout the sweep. Reduced motion skips the animated sweep
and nudge; keyboard focus also highlights the border in pale gold. A decorative
`>` appears after the wipe completes, with its space reserved to prevent layout shifts.
Under reduced motion, the final state and chevron appear immediately.

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

Section and CTA padding use `--section-space: clamp(2.5rem, 5vw, 4rem)`
(40–64px per side). Layout gutters use `--layout-gap: clamp(1.5rem, 4vw, 3rem)`.
Container max-width is `1100px`, with 20–32px responsive side padding.

Service sections use border separators rather than dividers with extra margins.
Their labels stack above the content below 960px. Keep section buttons sized to their
labels, and give anchored sections an 80px scroll offset for the fixed navigation.

Sub-page heroes use the same section spacing at every breakpoint. The homepage hero
has a bounded height instead of requiring a full viewport. Avoid adding large fixed
heights or combining section padding with generously spaced dividers.

---

## Glow Effects

```css
--glow-phosphor: 0 0 6px rgba(255, 189, 89, 0.5), 0 0 18px rgba(255, 189, 89, 0.15)
--glow-highlight:  0 0 6px rgba(244, 217, 154, 0.5), 0 0 18px rgba(244, 217, 154, 0.15)
```

Apply with utility classes `.glow-phosphor` and `.glow-highlight`. Use on headlines, active nav
links, and key UI moments. Don't overuse — glow should feel earned.

---

## What to Avoid

- Don't add rounded corners (`border-radius`) to structural elements. Hard edges are intentional.
- Don't use color backgrounds on sections except `--bg-surface` for alt sections.
- Don't introduce new fonts. The two-font system is load-efficient and aesthetically locked.
- Don't use CSS animations that combine `filter` and `transform` — breaks on iOS WebKit.
- Don't add emojis anywhere. Ever.


## Amber Terminal Palette (November 2026)

The primary glow is amber (#ffbd59), with pale-gold highlights and warm cream text.
Near-black brown surfaces keep the terminal contrast without the previous cool green cast.
Decorative machine imagery uses a light sepia treatment; portraits and speaking photos
retain their original colors. Keep the scanlines, restrained glow, and sharp edges.
