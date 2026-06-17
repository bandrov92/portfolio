# Deployment Notes

The production entry file is `index.html`.

Recommended hosting:
- Netlify: drag the whole folder into Netlify deploys, or connect the folder to a Git repository.
- GitHub Pages: publish the repository root. The `.nojekyll` file keeps GitHub Pages from processing the site with Jekyll.
- Vercel: deploy as a static site with no build command.

Before publishing:
- Keep `index.html`, `_headers`, `_redirects`, `.nojekyll`, and `robots.txt` in the deployed folder.
- Do not upload private certificate PDFs unless they are intended to be public.
- Test the published HTTPS link on desktop and mobile.
