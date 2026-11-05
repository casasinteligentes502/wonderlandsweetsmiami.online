# Wonderland Sweets · Premium Bilingual Website Demo

A static, responsive, conversion-focused event planning website with no framework build step and no image CDN dependencies. The current demo is based on the supplied Wonderland Sweets ZIP, photos and business details.

## Open and publish

- **Open `index.html`** for English. Click **ES** to open `es/index.html` directly, including when viewing the files on a Windows PC without a web server. Click **EN** to return to `index.html`. Both pages are fully rendered in HTML for visitors and crawlers. **Do not click the `es` folder** in the browser: click `es/index.html`, or just use the ES button in the website.
- To deploy, upload the **contents** of this folder to the root of a GitHub Pages repository, Netlify static site or equivalent HTTPS hosting.
- **After you know the final live URL**, run `python tools/configure_domain.py https://your-real-domain.com/` from this folder. For project-level GitHub Pages, include the project path, e.g. `https://username.github.io/wonderland/`.
- Then upload the modified HTML plus `sitemap.xml` and `robots.txt`. This step establishes absolute `og:image` metadata (important for WhatsApp/Facebook sharing), canonical URL, English/Spanish `hreflang`, absolute JSON-LD image references, and a valid sitemap. Until this step, the preview banner is bundled locally but social crawlers may not resolve the relative image URL.
- You can submit the live sitemap to Google Search Console and verify your business listing separately.

## Branding and experience

Palette: 60% warm ivory/canvas, 30% deep plum/editorial structure, 10% rose accents; gold used sparingly. The theme toggle persists with `localStorage`. The Spanish page is a dedicated page, not a machine-translated overlay.

Includes lightweight scroll reveal, gallery filters, enlarged image carousel (keyboard arrows and Escape), responsive navigation, themed cards, mobile WhatsApp button, accessible focus states and reduced-motion behavior. There is no external analytics or tracking. Local WebP files in `assets/photos/` load efficiently. Original JPEG source photos are preserved in `assets/originals/` for future editing.

## WhatsApp and email lead handling

The quote form collects name, event type, date, guests, venue/area, service interests and notes. It opens `wa.me/17863122784` with a prefilled **unsent** message, so the visitor must press Send in WhatsApp. The site itself does not save the form data or send it to a server. Email, telephone and Instagram links are available throughout.

**Confirm with the client that +1 (786) 312-2784 is WhatsApp-enabled before going live.** The source specified a phone number, not an explicitly confirmed WhatsApp line. Update all appearances of `17863122784` in both HTML pages and `script.js` if the WhatsApp number is different.

## SEO / AEO / local discovery

- Separate English and Spanish static pages with descriptive headings, semantic `<section>` content, readable service explanations, and FAQs in both languages.
- `LocalBusiness` / `ProfessionalService`, `WebPage` and `FAQPage` structured data with only supplied information (Miami, FL 33155; telephone; email; Instagram). No invented street address, prices, customer reviews, or business hours.
- Proper alt text, Open Graph 1200×630 banner in `assets/og-wonderland-sweets.jpg`, responsive images, and social sharing.
- Answer-oriented FAQs are intended for customer clarity and machine readability; inclusion does **not** guarantee rich snippets or rankings. Google currently limits FAQ rich results largely to well-known authoritative government/health sites.
- Once public, update Google Business Profile and create genuine local citations. SEO/GEO/AEO support discoverability but cannot guarantee leads or daily sales.

## Assets

- `assets/photos/*.webp`: all optimized site photography, owned/provided by the user.
- `assets/originals/*.jpg`: archive of uploaded, previously enhanced JPEG assets.
- `assets/og-wonderland-sweets.jpg`: actual branded social preview, 1200×630.
- `assets/favicon.svg` and `assets/wonderland-logo.jpg`: local brand assets.
- `assets/photos-manifest.json`: original-to-optimized file mapping.

## Final client details to confirm

1. Whether the contact telephone is also the official WhatsApp line.
2. Business hours or appointment model (omitted until provided).
3. Exact operating/service radius beyond Miami, if offered (not invented).
4. Final public domain; necessary for reliable OG previews, sitemap and language indexing.
5. If there is a confirmed street-level location, only then add a real Maps pin and address to structured data.

## Privacy & accessibility

No backend, no booking calendar, and no payment processor. Form submission is via prefilled WhatsApp only. Animations respect `prefers-reduced-motion`. Buttons use visible focus styles; the gallery supports keyboard navigation and accessible labels.

## Corrección de idioma y enlace de Instagram (4 de noviembre de 2026)

- Problema corregido: antes el botón ES apuntaba a `es/` y el botón EN apuntaba a `../`; al abrir la web como `file:///D:/...`, algunos navegadores enseñaban el índice de la carpeta en lugar del sitio. Ahora apuntan directamente a `es/index.html` y `../index.html`.
- Instagram visible en menú principal, menú móvil, información de contacto y acceso flotante (lado izquierdo). Perfil oficial: https://www.instagram.com/_wonderland_sweets_/
- Para probar en Windows: extraiga el ZIP completo, entre a la carpeta y abra `index.html` (no abra solamente la carpeta `es`). Después haga clic en `ES` arriba a la derecha.
- Para publicar en GitHub Pages, suba **todos** los archivos y carpetas que acompañan a `index.html`, especialmente `es/`, `styles.css`, `script.js` y `assets/`.


Actualización adicional: se incorporaron dos fotografías nuevas de juegos inflables (basketball challenge y target toss), optimizadas para mayor nitidez y apariencia profesional. También se integraron dentro de la galería y en la tarjeta de entretenimiento infantil en inglés y español.