# AERIS Wind Energy Landing Page

[![Deploy to GitHub Pages](https://github.com/markdrobnyj-beep/aeris-wind-landing/actions/workflows/deploy-pages.yml/badge.svg?branch=aeris-site)](https://github.com/markdrobnyj-beep/aeris-wind-landing/actions/workflows/deploy-pages.yml)

**Live site:** [markdrobnyj-beep.github.io/aeris-wind-landing](https://markdrobnyj-beep.github.io/aeris-wind-landing/)

AERIS is a visual portfolio landing page for a wind energy studio. The page uses a landscape-led art direction, soft atmospheric motion, project stories, impact metrics, and a lightweight contact-form demo.

![AERIS landscape artwork](assets/hills.png)

## Highlights

- Responsive single-page layout with mobile navigation.
- Native dialog contact flow with accessible labels and status messaging.
- Reduced-motion support for ambient animation.
- Local landscape photography for the project cards.
- Annual clean-energy generation chart with a clearly marked forecast year.
- No framework or runtime dependency required.

## Tech stack

- Semantic HTML
- Modern CSS
- Vanilla JavaScript
- Node.js built-in test runner
- GitHub Pages via GitHub Actions

## Project structure

```text
.
├── assets/                # Landscape imagery used by the page
├── tests/site.test.mjs    # Structural and accessibility-oriented checks
├── index.html             # Page structure and content
├── script.js              # Navigation, dialog, and motion behavior
└── styles.css             # Layout, visual system, and responsive rules
```

## Run locally

Node.js 18+ is required for the test runner. Because the project is static, any local web server is enough:

```bash
python -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Test

```bash
node --test tests/site.test.mjs
```

## Deployment

Every push to the `aeris-site` branch runs the checks and publishes the repository root to GitHub Pages. The workflow can also be started manually from the **Actions** tab.

## Notes

The contact form is intentionally a front-end demo. It confirms the interaction locally and does not send messages to a backend.
