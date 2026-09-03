# Fellow Vector — Image System

## The Narrative Arc

Every image on the site was generated in Leonardo AI and follows a deliberate visual narrative.
Each image represents a different moment in the metaphor of "entering through a CRT television."

| Page / Section       | File             | Concept                                      |
|----------------------|------------------|----------------------------------------------|
| Home hero            | `splash.webp`    | Outside the CRT glass — the threshold        |
| Services hero        | `services.webp`  | Inside the electron gun — signal being made  |
| About hero           | `about.webp`     | Oscilloscope — the human reading the signal  |
| Book hero            | `book.webp`      | Radio tuner dial — finding the frequency     |
| Writing hero         | `writings.webp`  | Teletype internals — signal becoming language|
| Home: focus section  | `focus.webp`     | Precision lens — clarity from complexity     |
| Home: CTA            | `signal.webp`    | Phosphor light trails — pure transmission    |
| Services: CTA        | `patchbay.webp`  | Patch bay — connections waiting to be made   |

All of these live in `src/assets/` and are rendered through Astro's `<Image>` component
(`astro:assets`), which generates a responsive `srcset` at 480/800/1200/1600px and hashed
filenames at build time. Import the file in frontmatter and pass the import, not a path string.
`PageHero` takes the imported image as its `image` prop. Only `og.jpg` and the favicons stay in
`public/`, because social scrapers need a stable absolute URL.

**The arc:** threshold → machinery → interpretation → connection.
Each image moves the viewer further inside the signal world.

---

## Image Treatment

All background images follow this CSS pattern:

```css
.image-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
}

.image-bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: [0.07 – 0.55 depending on context];
}

.image-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: [gradient overlay];
}
```

**Opacity guide:**
- Full-page heroes: `0.35–0.55` (image is prominent)
- Section backgrounds: `0.07–0.28` (image is atmospheric, text must read clearly)

**Gradient overlays:**
- Page heroes: left-to-right dark-to-transparent + bottom-to-top dark fade
- CTA sections: radial gradient, dark edges, slightly open center

---

## Adding New Images

When generating new images for this site, follow these principles:

### Subject Matter
All images should come from the world of **analog broadcast / signal technology**:
- CRT television components (glass, electron guns, phosphor screens)
- Oscilloscopes, signal generators, frequency meters
- Radio equipment, tuner dials, patch bays, antenna hardware
- Optical elements (lenses, prisms, light paths)
- Long-exposure photography of CRT screens, phosphor trails, signal displays
- Vacuum tubes, circuit boards from the broadcast era

Avoid: computers, smartphones, fiber optics, anything recognizably modern or digital.
The aesthetic is specifically **analog signal era** — 1940s–1980s broadcast technology.

### Photography Style
- **Macro / extreme close-up** — get inside the object, not a wide shot of it
- **Dark background** — the subject should emerge from darkness
- **Shallow depth of field** — sharp foreground, dissolving bokeh background
- **Atmospheric lighting** — single warm source, or the object's own glow
- **No people, no text, no faces**
- **Cinematic, photorealistic**

### Color Temperature Guide
- CRT glass / screens: cool green-white (phosphor)
- Electron guns / circuit components: warm gold/copper + cool green bokeh
- Oscilloscopes: phosphor green on black
- Radio equipment: warm amber/tungsten

### Leonardo Prompt Structure
```
[Subject description], [shot type], [lighting], [depth of field],
[color temperature], [mood/feeling]. No text, no people, no faces.
Cinematic, photorealistic, [additional technical details].
```

**Output:** Always generate at 16:9 landscape, export as WebP at 1600px wide, and place in
`src/assets/` with a descriptive filename. The build handles the smaller sizes.

---

## Portrait

`cw4.webp` is an illustrated portrait of Charles Wilke (ink drawing style, cream background),
with `cw2.webp` (a photo) revealed underneath by glitch slices, hover, and click-to-flip.
Both are `<Image>` renders at 320/480/640px. The glitch slices paint `cw2` as a CSS background,
so `about.astro` resolves one optimized URL with `getImage()` and passes it as `--cw2-bg`.
It's displayed on the about page, floated into the body text, with:
- A vignette overlay (dark edges → natural cream center)
- Corner bracket markers in phosphor green
- A `// charles wilke` label footer
- A `--phosphor-dim` border

If the portrait is ever updated, maintain this treatment — it's intentional that it looks
like it's being received through a signal rather than displayed as a traditional photo.

---

## OG Image

`og.jpg` (1200×630) is the social share image. It was built from `og-template.html` which
lives in the project root. To regenerate:
1. Open `og-template.html` in Chrome
2. Set device dimensions to 1200×630 in DevTools
3. Capture full-size screenshot
4. Save as `public/og.jpg`

The template uses `splash.jpg` as the background. If the splash image ever changes,
regenerate the OG image.
