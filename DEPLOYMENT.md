# Deployment Notes

The production entry file is `index.html`.

Recommended hosting:
- Cloudflare Pages: connect this repository (or upload the folder). Build command: leave empty. Output directory: `/` (project root).
- Netlify: drag the whole folder into Netlify deploys, or connect the folder to a Git repository.
- GitHub Pages: publish the repository root. The `.nojekyll` file keeps GitHub Pages from processing the site with Jekyll.
- Vercel: deploy as a static site with no build command.

Folder layout:
- `index.html` — home
- `project.html` — dynamic project case-study page, reads `?slug=` and fetches `data/projects/<slug>.json`
- `certificates.html` — training certificates hub, built from `data/certificates.json`
- `licenses.html` — professional licenses & accreditations hub, built from `data/licenses.json`
- `badges.html` — digital badges hub (live Credly embeds), built from `data/badges.json`
- `data/projects/*.json` — one file per project (folder collection, for Decap CMS)
- `data/certificates.json`, `data/licenses.json`, `data/badges.json` — each a `{ "<key>": [...] }` object (single-file collections, for Decap CMS)
- `main.js` — shared theme/language/navigation logic for all pages
- `css/site.css` — design system
- `css/pages.css` — multi-page layout using the same tokens
- `assets/images/` — logo, project WebP gallery, cert/license/badge images
- `fonts/` — optional Thmanyah font files
- `projects/project-template.html` — retired case-study template, kept aside pending removal

## Content editing (Decap CMS)

`admin/index.html` + `admin/config.yml` provide a browser-based content editor at `/admin/` — no code editing needed to add/update projects, certificates, licenses, or badges. Requires one-time setup:

1. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps → New OAuth App). Homepage URL and Authorization callback URL both = the site's root URL (e.g. `https://bandaralasmari.com`).
2. In Cloudflare Pages project settings → Environment variables, add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` from that OAuth App.
3. `functions/api/auth.js` and `functions/api/callback.js` (Cloudflare Pages Functions, deployed automatically — no build step) handle the OAuth handshake, since GitHub's backend needs a server component that Netlify normally provides for free but Cloudflare Pages does not.
4. Visit `/admin/` and log in with the GitHub account that has write access to this repo. Saving a change there commits directly to this repository and triggers a normal redeploy.

Before publishing:
- Keep `index.html`, `_headers`, `_redirects`, `.nojekyll`, and `robots.txt` in the deployed folder.
- Do not upload private certificate PDFs unless they are intended to be public.
- Replace `assets/images/projects/gallery-0*.webp` with real screenshots.
- Test the published HTTPS link on desktop and mobile.
