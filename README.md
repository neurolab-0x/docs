# NeuroLab Docs

Documentation site for the NeuroLab platform, built with Next.js and MDX.

## Scope

This app currently documents the parts of the platform that are implemented and actively maintained in this repository. The navigation is intentionally limited to pages that exist.

Current coverage:
- platform introduction and quick start
- architecture overview
- backend installation
- AI service installation
- Docker and production setup
- core concepts for mental states and EEG processing
- backend and AI API overview pages

## Requirements

- Node.js 22+
- npm 10+

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run format
```

## Project structure

- `src/app/docs`: MDX documentation pages
- `src/components`: layout and UI components
- `src/config/docs.ts`: docs navigation config
- `.github/workflows`: CI workflows for lint, build, and dependency review

## CI

GitHub Actions validates this app with:
- `npm ci`
- `npm run lint`
- `npm run build`

Workflow files:
- `.github/workflows/docs-ci.yml`
- `.github/workflows/dependency-review.yml`

## Authoring rules

- Only add a route to `src/config/docs.ts` after the page exists.
- Keep architecture claims aligned with the actual codebase.
- Prefer removing placeholder UI over shipping non-functional features.
- Update this README and `TASKS.md` when documentation scope changes materially.
