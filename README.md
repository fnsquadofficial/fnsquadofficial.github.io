# FN Squad website

A static-first, responsive website for FN Squad, with sections for FreakyNews and FN SMP. It uses plain HTML, CSS, and a small amount of JavaScript, with no runtime framework or third-party JavaScript dependencies.

## Run locally

You can open `index.html` directly in a browser for a quick preview. For a more representative local run, serve this folder over HTTP:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` from inside this folder.

## Before publishing

Edit `site-config.js` and add only official, verified values:

- `whatsappChannelUrl`: public WhatsApp channel URL.
- `minecraftServerAddress`: confirmed address for FN SMP.
- `minecraftEdition`: confirmed Java / Bedrock / cross-play information.
- `minecraftVersion`: confirmed game version.

The site intentionally leaves those fields unset instead of inventing links or server information. No live news feed is connected; the FreakyNews cards are labeled content slots and preview content. Connect a verified feed or publishing workflow before presenting headlines as current news.

If you know your production domain, update the canonical URL and social preview metadata as part of launch preparation. The current Open Graph image is a local site asset.

## Performance and compatibility notes

- Static-first architecture with no build step and no third-party scripts.
- Original logo is included as an optimized WebP asset; a compact high-contrast FN icon is provided for browser metadata.
- Responsive layouts use fluid CSS, flex/grid, viewport breakpoints, safe-area-aware toast positioning, and a short-landscape rule rather than hardcoded device models.
- Liquid Glass-inspired blur is limited to navigation surfaces and has a solid fallback.
- Motion honors `prefers-reduced-motion`.
- Theme preference is optional and stored locally when browser storage is available.
- The feed search and category filters run locally against included content slots; they do not fetch data.
- No performance score is claimed. Measure the deployed build with Lighthouse / PageSpeed Insights and real-device tests.

## Design research references

- Apple, Liquid Glass: https://developer.apple.com/documentation/technologyoverviews/liquid-glass
- Apple, Adopting Liquid Glass: https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass
- Android, Learn about foldables: https://developer.android.com/develop/adaptive-apps/guides/foldables/learn-about-foldables
- MDN, `backdrop-filter`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- MDN, `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion
- Google, Core Web Vitals: https://web.dev/articles/vitals
- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/

## Continuous FreakyNews feed

- `index.html` includes a deliberately clipped feed preview with a soft bottom fade and a partially visible next card as a scroll cue.
- `freakynews.html` contains the full, vertically continuous feed. It progressively appends entries in batches using `IntersectionObserver` and includes a keyboard-accessible **Load more stories** button.
- `feed-data.js` is the static content source. Its entries are marked as demonstrations and are not live headlines. Replace them with verified posts before publishing as current news. The feed loads only the records available in this file; it does not invent an endless stream or scrape WhatsApp.
- No backend or third-party JavaScript dependency is required, so this works on GitHub Pages.

After replacing the published files in the repository, wait for the GitHub Pages workflow/build to complete and verify both `/` and `/freakynews.html`.
