# Fellow Vector — Design System

## Concept

The site evokes **a warm CRT in a school computer room**: somewhere welcoming to try,
ask questions, and learn by doing. Amber phosphor, softly reflected window light,
tactile keyboard keys, and paper notes make that setting part of the interface.
The CW lightbulb is a small illustrated embodiment of Charles and peeks over the
service cards beside the homepage's “Build your capacity” introduction.
Charles's name and role sign the paper note beside his illustrated portrait; the
bulb is not given a separate floating identification caption.
The homepage hero pairs the headline, offer, and actions on the left with the
signed note mounted on a full 5.25-inch floppy at the right. Its square jacket
anchors the label, which carries live text and Charles's illustrated portrait.
Generous padding and column spacing let these elements breathe. Below 760px,
show the paper label alone after the copy and actions, keeping the note and
portrait larger while saving vertical space.
“Learn by doing” stays on one line, with its size responding to the copy column.
Keep the hero actions in one row; the longer primary label can wrap within its
button on narrow screens while “Book a Call” stays alongside it.
The bulb belongs to the following services section: crop its lower half at the
cards' top edge so it peeks into the introduction without covering text or links.

The terminal is a familiar entry point for learning something new. Charles calls this the
**C-prompt lifestyle**: the curiosity of an Apple II, Math Blaster, or The Oregon Trail,
brought into a present-day conversation about AI. The nostalgia is intentional and welcoming.
Keep the phosphor glow, scanlines, typography, and machinery imagery. References should
invite experimentation without making prior computer experience a requirement.

---

## Favicon

The favicon is a smiling amber pixel bulb on warm ink, simplified for tiny browser
tabs. `public/favicon.svg` is the source; the ICO contains 16, 32, and 48px versions,
and the Apple touch icon is 180px. Versioned icon links refresh the previous mark.

---

## Color Tokens

Defined in `src/styles/global.css` as CSS custom properties:

```css
--bg:            #241c13   /* warm smoked glass */
--bg-glow:       #392d1d   /* soft ambient illumination */
--bg-surface:    #2b2218   /* card/panel backgrounds */
--bg-raised:     #35291c   /* elevated surfaces */
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

- **Scanlines**: one horizontal line every 4px, 4.5% opacity black
- **Vignette**: radial gradient from transparent center to 18% warm black at edges
- **Glass reflections**: fixed, static, diffuse window highlights behind page content;
  decorative only, with no pointer tracking or input interception

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
The main navigation uses four equal-width keyboard keys with 1px seams and a close-fitting
beige moulding. The plastic texture is an alpha WebP; labels are native link text.
Key faces and labels travel 3px on press and rebound on release. Quick taps keep a brief
85ms pressed state; reduced motion uses shading without travel. Native navigation,
modified clicks, and keyboard activation continue to work normally.

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

The RSS feed uses cream paper reading cards with dark brown text, an inset article
image, publication/date metadata, and an always-visible reading link. Keep original
artwork colors; do not add thumbnail-specific scanlines, phosphor tints, or dimming
on top of the global CRT texture. The full feed is two columns above 700px and one
column below; the compact About feed uses smaller paper notes without thumbnails.

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
labels. Anchor offsets and sticky sidebars use `--nav-height` plus 16px.
The fixed header is 88px on desktop, 144px below 760px, and 200px below 480px, where
the four keys form a two-by-two keyboard. All four links stay visible.
The Fellow Vector wordmark includes the subtitle “AI Tutoring & Workshops” on every
page, set in smaller body type directly underneath the display lettering.

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

- Keep structural elements sharp. Small radii are reserved for the physical keyboard
  moulding and keycaps, following the approved computer-room reference.
- Don't use color backgrounds on sections except `--bg-surface` for alt sections.
- Don't introduce new fonts. The two-font system is load-efficient and aesthetically locked.
- Don't use CSS animations that combine `filter` and `transform` — breaks on iOS WebKit.
- Don't add emojis anywhere. Ever.


## Amber Terminal Palette (November 2026)

The primary glow is amber (#ffbd59), with pale-gold highlights and warm cream text.
Smoked-brown surfaces and diffuse reflections keep the terminal contrast while making
the space feel more warmly lit.
Decorative machine imagery uses a light sepia treatment; portraits and speaking photos
retain their original colors. Keep the scanlines, restrained glow, and sharp edges.
