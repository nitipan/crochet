# Design Philosophy — Tosaporn Pompan

**Status: approved look (locked).** Reference this before any UI work. The site is a **premium Japanese artisan showcase** whose primary goal is to earn **Facebook and TikTok followers** — not e-commerce.

---

## Approved aesthetic (what “look good” means)

| Quality | Expression |
|---------|------------|
| **Mood** | Quiet luxury — a small Japanese craft atelier, warm and editorial |
| **Contrast** | Deep charcoal + antique gold + warm ivory |
| **Photography** | Real studio product shots; UI stays out of the way |
| **Hero** | Full-screen doll photo as **background**; brand welcome text **overlaid** |
| **Rhythm** | Light ↔ dark sections; gold label lines; serif headlines |
| **Motion** | Slow fade-up, gentle Ken Burns on hero, scroll-reveal below fold |
| **Conversion** | Facebook + TikTok follow buttons — sticky bar, hero, footer |

**Not this:** loud kawaii, busy nav, shopping cart, thick frames on hero, side-by-side hero product cards, neon accents, Tailwind.

---

## Brand & tone

| | |
|---|---|
| **Brand** | Tosaporn Pompan |
| **Voice** | Quiet luxury, handmade warmth, editorial restraint |
| **Language** | English (`content/site.json`) |
| **Tagline** | *Handcrafted crochet, made with care* |
| **Accent text** | 手作り (*tezukuri*) — decorative only, above hero title |

---

## Visual identity

### Palette (`app/globals.css`)

| Token | Hex | Use |
|-------|-----|-----|
| `--color-ivory` | `#f7f2ea` | Light sections |
| `--color-cream` / `--color-cream-dark` | `#efe8dc` / `#e3dace` | Warm alternates |
| `--color-charcoal` / `--color-charcoal-deep` | `#1e1c1a` / `#121010` | Dark sections, overlays, footer |
| `--color-gold` / `--color-gold-light` | `#c4a35a` / `#dbc48a` | Labels, rules, frames, hovers |
| `--color-ink` / `--color-ink-soft` | `#141210` / `#4a4540` | Body on light bg |

### Typography

| Role | Font |
|------|------|
| Headings, quotes, labels | **Noto Serif JP** — wide letter-spacing, weight 400 |
| Body | **Zen Kaku Gothic New** |
| Taglines | Serif + italic |
| Buttons | Uppercase, `letter-spacing: 0.12em` |

### Section rhythm

```
Sticky bar (dark glass, gold brand)
  ↓
Hero — full-bg photo + overlaid welcome text
  ↓
Craft story — ivory + gold-framed detail photo
  ↓
Gallery — charcoal (sectionDark) + gold-framed thumbnails
  ↓
Studio — cream + gold-framed atmosphere shots
  ↓
Follow CTA — dark card, luxury social buttons
  ↓
Footer — charcoal-deep, gold accent line
```

Section headers: `.sectionLabel` (gold flanking lines) → `.sectionTitle` → `.sectionIntro`

---

## Hero (locked — do not regress)

**Image:** `content/products.json` → `hero.src` = **`IMG_3598.JPG`** (landscape studio pair)

**Structure** (`components/Hero.tsx` + `Hero.module.css`):

1. **Background layer** — `Image` with `fill`, `object-fit: cover`, `object-position: center 38%`, slow Ken Burns (scale 1 → 1.06, 24s)
2. **Overlay layer** — dual gradient for readability:
   - Desktop: dark left → lighter right (text sits in dark zone; dolls visible right)
   - Mobile: strong bottom gradient; content anchored toward bottom
3. **Content layer** — 手作り → `<h1>` brand → gold rule → italic tagline → `SocialButtons variant="luxury"`
4. **No** separate product card, border, or side-by-side image box on hero

**Text on hero:** ivory title, gold accent, italic tagline with subtle text-shadow.

---

## Photography & frames

| Area | Treatment |
|------|-----------|
| **Hero** | Full-bleed background only — no frame |
| **Gallery** | Gold-gradient padding frame, hover lift |
| **Craft story / Studio** | Gold outer frame (`.frame` / `.luxFrame`) |
| **All gallery images** | `alt` in `content/products.json` |

Hero: `priority` load. Below fold: lazy load.

---

## Social buttons

Three placements, same URLs from `content/site.json`:

1. Sticky `SocialBar`
2. Hero — **`variant="luxury"`** (gold outline on dark)
3. Follow CTA + footer links

Variants in `SocialButtons.tsx`: `filled` | `outline` | `luxury`

---

## Motion

- Hero: staggered `fadeUp` on load (accent → title → tagline → CTA)
- Below fold: `ScrollReveal` (Intersection Observer)
- Gallery lightbox: soft fade-in
- Hover: gentle lift / scale — never bouncy

---

## Content & code map

| Concern | Location |
|---------|----------|
| Design tokens | `app/globals.css` |
| Copy, social, SEO | `content/site.json` |
| Images, gallery, hero | `content/products.json` |
| Sections | `components/Hero`, `CraftStory`, `Gallery`, `Studio`, `FollowCta`, `Footer` |

Edit JSON → push → Vercel rebuilds. See `content/README.md`.

---

## Technical

- Next.js App Router, `output: 'export'`, deploy on Vercel
- `npm run dev` / `npm run build` auto-clear `.next` cache
- SEO: `app/layout.tsx`, `public/robots.txt`, `public/sitemap.xml`

---

## Do / Don't

| Do | Don't |
|----|-------|
| Full-bg hero photo + overlaid welcome text | Side card, bordered hero box, portrait-only crop |
| Charcoal + gold + ivory luxury palette | Bright kawaii / neon colors |
| Gold-framed gallery & studio images | Thick frame on hero background |
| Facebook + TikTok CTAs in 3 places | Instagram or checkout without asking |
| JSON content files | Hardcoded copy or image lists in components |
| CSS modules + existing variables | Tailwind or new design system |
| Match approved section alternation | Cram sections or remove whitespace |

---

*Approved look captured: full-background hero (IMG_3598), overlaid luxury text, dark/gold artisan theme.*
