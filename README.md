# VOID//ECHO

> An experimental immersive web experience exploring 3D interaction, motion, and surreal digital storytelling.

**Status:** Experimental concept · not a production product

VOID//ECHO is a personal interface experiment built around a dark cyber-surreal visual language. The project combines a real-time 3D scene with scroll-driven narrative sections, motion systems, and interaction effects to explore how atmosphere and spatial UI can shape a web experience.

## What this project explores

- Real-time 3D scenes in the browser
- Scroll-driven visual storytelling
- Motion choreography and transition design
- Layered interaction effects and responsive UI
- Performance-aware composition of 3D, animation, and interface elements

## Tech stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Three.js**
- **React Three Fiber / Drei**
- **React Three Postprocessing**
- **Framer Motion**
- **GSAP**
- **Lenis**
- **Tailwind CSS 4**

## Interaction model

The experience is structured as a sequence of visual states:

1. **Distortion** — reality begins to destabilize
2. **Fragment** — perception splits into parallel visual streams
3. **Corruption** — signal and structure decay into noise
4. **Transcend** — the interface resolves into a final state

The page also includes a dedicated “void mode”, particle-style click feedback, animated typography, and a persistent 3D scene behind the content layer.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Production check:

```bash
npm run build
npm run lint
```

## Repository structure

```text
src/
├── app/            # application shell and page composition
├── components/     # 3D scene, UI, and content sections
├── hooks/          # interaction and state hooks
└── utils/          # shared utilities
```

## Scope

This repository is intentionally presented as a **visual and interaction experiment**. It is not intended to represent a finished commercial product. The main value of the project is the exploration of 3D web presentation, motion systems, and immersive interface design.

## Author

**Jie Tian**  
Mathematics master's student exploring AI-assisted research, interactive systems, and digital product experiments.

- Portfolio: https://yns34-hub.github.io/
- GitHub: https://github.com/YNS34-hub
