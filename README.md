# FN Squad website (v6)

Static site for GitHub Pages. No build step, no third-party scripts.

## Brand system
Derived from the two logos in `assets/`:
- **FN Squad (main):** light grey `#d9d9d9` FN on black `#000000`. This sets the dark theme (background, text and primary buttons).
- **FN SMP:** graphite `#313131` FN with grey `#7d7d7d` SMP on `#f2f2f2`. This sets the light theme.
Colour tokens live at the top of `styles.css` (`:root` for light, `:root[data-theme="dark"]` for dark). Headlines use a Helvetica/Arial stack, close to the logo lettering. There is no warm accent colour.

`theme-color` values: `#f2f2f2` (light) and `#000000` (dark). They are set in each page head, in `app.js` and in `site.webmanifest`.

## Pages
- `index.html` Home. `freakynews.html` demo feed, labels, tips. `fn-smp.html` server details, joining, rules. `community.html` rules, safety, reporting, strikes (handbook Parts 0 to 9).

## Configure (`site-config.js`)
`whatsappChannelUrl`, `discordInviteUrl`, `minecraftServerAddress`, `minecraftEdition`, `minecraftVersion`. Empty values show "coming soon".

## Assets
`fn-squad-logo.webp` (hero), `fn-mark-128.webp` (header and footer mark), `fn-icon-192/512.png` (app icons), `og-fn-squad.png` and `og-fn-smp.png` (1200x630 social previews), `fn-smp-logo-*.webp`.

## Deploy
Push to `main`. Settings > Pages > Source = GitHub Actions. After deploying, reinstall the home-screen app so the new icon and colours load.

## Not published
Staff codenames and the team (handbook 10.3), internal case procedures, unconfirmed server details. Per handbook 10.1 the Creative Director approves brand assets, so confirm the new logo with Prometheus. The affiliation disclaimer in the footer is marked [DECIDE] (9.5).
