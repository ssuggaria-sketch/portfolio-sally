# Sugaria Designs — Sali Sukaria Portfolio

Personal portfolio site for Sali Sukaria — HR & hospitality, architecture, and
photography/content creation. Plain static HTML/CSS/JS, no build step, no
framework, deployed on Vercel.

## Structure

```
.
├── index.html          Home — hero, architecture feature, three pillars
├── architecture.html   Architecture projects (renders, plans, sections)
├── experience.html     Career timeline, education, skills
├── photography.html    Video editing samples, Instagram embeds, photo gallery
├── contact.html        Contact details + Formspree-powered contact form
├── style.css           All site styles (single shared stylesheet)
├── vercel.json          Deployment config (clean URLs, no build step)
└── assets/
    ├── img/
    │   ├── logo/        Brand mark (nav + featured versions)
    │   ├── architecture/ Architecture project renders & drawings
    │   └── photography/ DSLR + phone photo gallery images
    ├── video/           Uploaded video clips + poster frames
    └── js/
        └── main.js      Nav toggle, scroll reveals, lightbox, gallery filter
```

## Editing content

Everything is plain HTML — open any `.html` file and edit the text directly.
Each page repeats the same header/nav/footer markup (no templating), so a
global nav change means editing all 5 files. Styling lives entirely in
`style.css`, keyed off CSS custom properties defined at the top (`:root`) —
change a color there and it updates everywhere.

## Contact form

The form on `contact.html` posts to Formspree
(`https://formspree.io/f/ssuggaria@gmail.com`). The **first** real submission
triggers a one-time confirmation email — click the link in that email once,
and all future submissions land directly in the inbox.

## Instagram embeds

`photography.html` includes Instagram's official embed script
(`instagram.com/embed.js`) plus four `blockquote.instagram-media` elements
with public post permalinks. These render as live previews automatically;
if the script fails to load for any reason, each falls back to a plain
"View on Instagram" link so the layout never breaks.

## Deploying

This repo deploys to Vercel with zero configuration:

1. [vercel.com](https://vercel.com) → **Add New → Project**
2. **Import Git Repository** → select this repo
3. Leave all settings as default (Framework Preset: **Other**, no build
   command, output directory: leave blank) — `vercel.json` handles the rest
4. **Deploy**

To connect a custom domain afterward: **Project → Settings → Domains** → add
your domain → follow the DNS records Vercel provides → add them at your
domain registrar (e.g. GoDaddy's DNS management, not the hosting panel).

## Local preview

No build tools needed — just open `index.html` directly in a browser, or run
a tiny local server from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
