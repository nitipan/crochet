# Content guide

Edit these JSON files to update the site. After saving, push to Git — Vercel rebuilds automatically.

## Add a new product photo

1. Copy your JPG into `public/products/`  
   Example: `public/products/IMG_9999.JPG`

2. Open `content/products.json` and add an entry under the right category:

```json
{ "src": "IMG_9999.JPG", "alt": "Short description of the product" }
```

3. Commit and push:

```bash
git add public/products/IMG_9999.JPG content/products.json
git commit -m "Add new product photo"
git push
```

## Change hero, studio, or craft story image

In `content/products.json`:

- **Hero (top banner):** edit `"hero"`
- **Craft story side photo:** edit `"craftStory"`
- **Studio section:** edit the `"studio"` array

## Change text, social links, or SEO

Edit `content/site.json`:

| Field | What it controls |
|-------|------------------|
| `brandName`, `tagline` | Hero headline and tagline |
| `social.facebook`, `social.tiktok` | All follow buttons and footer links |
| `seo.domain` | Sitemap and metadata base URL (use your Vercel domain) |
| `seo.description`, `seo.ogImage` | Google and social preview |
| `sections.*` | Section headings and body copy |

## File reference

```
content/
  site.json       ← brand, social, SEO, section text
  products.json   ← all images and gallery categories
public/products/  ← image files (JPG)
```
