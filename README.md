[![VOID ECHO — immersive 3D web experiment](./docs/github-cover.png)](https://yns34-hub.github.io/void-echo/)

# VOID//ECHO

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-OPEN_VOID-8B5CF6?style=for-the-badge)](https://yns34-hub.github.io/void-echo/)
[![Deploy to GitHub Pages](https://github.com/YNS34-hub/void-echo/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/YNS34-hub/void-echo/actions/workflows/deploy-pages.yml)

**Live:** https://yns34-hub.github.io/void-echo/

An experimental web piece exploring **spatial UI, motion systems, and surreal digital storytelling**.

**Status:** visual / interaction study

---

## Concept

VOID//ECHO treats the page as a sequence of visual states rather than a conventional landing page. A persistent 3D scene sits behind the content while typography, scroll position, and interaction effects progressively alter the atmosphere.

The four narrative states are:

1. `DISTORTION` — the interface begins to destabilize
2. `FRAGMENT` — visual continuity splits
3. `CORRUPTION` — signal gives way to noise
4. `TRANSCEND` — the experience resolves into a final state

## Interaction system

- persistent real-time 3D scene
- scroll-driven narrative sections
- dedicated “void mode” state
- particle-style click feedback
- animated typography and transition choreography
- shader-driven geometry and particle motion
- pointer-reactive spatial movement
- responsive composition with native scroll tracking

## Stack

`Next.js 16` · `React 19` · `TypeScript` · `Three.js` · `React Three Fiber` · `Drei` · `Framer Motion` · `Tailwind CSS 4`

## Structure

```text
src/
├── app/            # page composition and application shell
├── components/     # 3D scene, UI, and narrative sections
├── hooks/          # interaction/state hooks
└── utils/          # shared constants, shaders, and utilities
```

## Quality gate

Every push and pull request runs an automated GitHub Actions check:

```text
npm ci → ESLint → production build
```

The procedural 3D layouts are deterministic so server/client rendering remains stable while preserving the intended visual variation.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Notes

This repository is intentionally an **experiment**, not a production product. The focus is visual systems, motion composition, and the relationship between 3D space and interface behavior.
