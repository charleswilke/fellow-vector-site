# Fellow Vector — Image System

## Computer-Room Materials

The current homepage uses Charles's CW bulb, paper, and keyboard materials.
These alpha assets are in `src/assets/` and retain genuine transparency:

| File | Use |
|------|-----|
| `cw-bulb-amber.webp` | Character peeking above the service cards, closing invitation, and footer |
| `nav-keycap.webp` | Blank plastic texture beneath live navigation link labels |
| `floppy-disk-note-v1.webp` | Full 5.25-inch floppy holding the live-text note and portrait on its paper label |
| `floppy-label.webp` | Standalone note on mobile; also the paper texture reference |
| `cw4.webp` | Existing illustrated portrait, blended into the paper note as an author portrait |
| `cw2.webp` | Color photograph of Charles beside the homepage bio |

The built-in imagegen tool produced the bulb, keycap, and label assets. The bulb preserves
the original character; the paper and keycap were generated as blank surfaces. Full
generation prompts are tracked in [ASSET_PROMPTS.md](ASSET_PROMPTS.md). Production
files are resized WebP exports with alpha preserved, imported through Astro's asset pipeline.
The full floppy uses the original blank label as a built-in imagegen reference. Original
generated PNGs and preview studies remain local under the ignored `output/imagegen/` directory.

Keep labels and copy in HTML. Surface texture must not reduce readability. The amber bulb
needs no sepia filter or screen blending. Glass reflections and scanlines are CSS effects.
The original `splash.webp` and green `bulb.webp` remain as source/reference artwork.

## The Narrative Arc

The earlier atmospheric backgrounds were generated in Leonardo AI and follow a deliberate visual narrative.
Each background represents a different moment in the metaphor of "entering through a CRT television."

| Page / Section       | File             | Concept                                      |
|----------------------|------------------|----------------------------------------------|
| Former home hero     | `splash.webp`    | Outside the CRT glass — retained reference   |
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
Legacy atmospheric backgrounds come from **analog broadcast / signal technology**.
The current interface also draws on school computer-room materials described above:
- CRT television components (glass, electron guns, phosphor screens)
- Oscilloscopes, signal generators, frequency meters
- Radio equipment, tuner dials, patch bays, antenna hardware
- Optical elements (lenses, prisms, light paths)
- Long-exposure photography of CRT screens, phosphor trails, signal displays
- Vacuum tubes, circuit boards from the broadcast era

Avoid recognizably modern hardware in decorative imagery. Keep computer-room references
grounded in period keyboards, paper labels, and CRT glass; use them as useful interface
materials rather than filling the page with whole-object illustrations.

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

## Speaking Photography

`charles-speaking.jpg` is a user-supplied photograph of Charles presenting **Spectator to
Initiator**. It appears in the Services page's speaking section as a mounted photograph:
a close cream-paper border, slight tilt, and a caption naming the talk and Charles.
The caption links to the deck at `https://charleswilke.com/s2i`; the photograph itself
opens the original full-size image. On wider screens the mount sits alongside the
speaking details; below 700px it stacks above them.
Keep the full frame so the speaker, audience, and presentation remain
visible. Render it through Astro's `<Image>` component as responsive WebP, with descriptive
alt text and lazy loading. Documentary photography complements the analog backgrounds;
the generated-image subject and treatment rules above apply to backgrounds.

---

## OG Image

`public/og.jpg` (1200×630) is a full-bleed graphic inspired by vintage educational
software packaging. `scripts/og-template.html` uses the navigation’s
`fellow-vector-wordmark.svg` in burnt orange, with stripes fading to pale gold
and running to the edge of the cream header. Charles Wilke’s self-portrait
(`cw4-cutout-hexagon.webp`) sits in a circular frame over the dark halftone field
beside “Learn by doing” and the service line. The byline and site address share
a ruled nameplate with angled corners.

To regenerate from the repository root on macOS with Chrome installed:

```sh
mkdir -p output
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --allow-file-access-from-files --user-data-dir="$PWD/output/og-chrome-profile" \
  --screenshot="$PWD/output/og-preview.png" "file://$PWD/scripts/og-template.html" &&
node --input-type=module -e "import sharp from 'sharp'; await sharp('output/og-preview.png').jpeg({quality:90,mozjpeg:true}).toFile('public/og.jpg');"
```

Inspect the rendered image before shipping. `BaseLayout.astro` shares one versioned
absolute image URL across Open Graph and Twitter metadata, with dimensions and alt
text. Bump the image URL's version whenever the artwork changes to help refresh
cached previews. Existing shared posts may retain a platform's cached preview.
