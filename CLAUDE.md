# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal portfolio site ("tv-portfolio") built with Astro 5 + Tailwind 3 + GSAP. The whole site is rendered inside a retro CRT television drawn in CSS; each page is a "channel" shown on the TV screen.

Note: `README.md` is the **GitHub profile README** (this repo is named after the GitHub user, so GitHub shows it on the profile page). It does not document the site. Don't treat it as project docs or edit it as part of site changes.

## Commands

```sh
npm run dev      # dev server (http://localhost:4321)
npm run build    # static build to dist/
npm run preview  # serve the built dist/
```

There are no tests, linter, or formatter configured. `npx astro check` does type checking (tsconfig extends `astro/tsconfigs/strict`).

## Architecture

- **`src/layouts/Layout.astro`** holds the whole TV: antenna, body, screen, controls panel, and the page background pattern, all in scoped CSS (originally derived from a Uiverse.io design). Page content goes into `<slot />` inside `.screen > .screen-scroll`. It also enables Astro view transitions (`<ClientRouter />`), so navigation is client-side.
  - One markup, two devices. The **big TV** (default) is a grid (screen | side panel) sized from viewport width *and* height. Below `(max-width: 767px) and (orientation: portrait)` it becomes the **pocket TV** (Watchman-style): bezelled screen above; below it the brand plate, ◀ / LCD channel readout / ▶, slide power switch and round speaker; thumb wheels on the sides; a single telescopic antenna. The channel knob is hidden there; the arrows navigate. Short landscape screens hide the antenna and legs. Pocket-only elements (`.pocket-btn`, `.brand`, `.lcd`, `.power-switch`, `.wheel`) are `display: none` on the big TV.
  - `.tv` is a size container, so the TV parts use `cqi` units and scale with it. `.screen-scroll` is a named container (`screen`).
  - The Layout looks up the current page in `src/data/channels.ts` by `Astro.url.pathname`. That gives the page `<title>`, the knob indicator angle, and the link target of the top knob (`.b1`, the next channel in the list, looping). The only prop is an optional `title` for pages outside the lineup (404).
  - Adding a channel means creating `src/pages/<name>.astro` and adding an entry (number, path, title, knob angle) to `channels`. Array order is the knob's cycle order.
- **`src/data/cv.ts`** holds all portfolio content (profile, experience, skills, education, links). It mirrors `docs/cv.md`. Sections read text from here instead of hard-coding it.
- **`src/pages/`** files are thin: each wraps one section component in `Layout`. `404.astro` renders TV color bars instead.
- **`src/styles/global.css`** is imported in Layout's frontmatter and holds shared styles (the `.bg-static` noise overlay). Fonts come from Google Fonts in Layout's `<head>` (the npm registry here blocks `@fontsource`) and are mapped in `tailwind.config.mjs`: `font-sans` DM Sans, `font-mono` Space Mono, `font-tv` VT323.
- `docs/ROADMAP.md` tracks the redesign plan and task status.
- **`src/components/*Section.astro` / `Hero.astro`**: each section's root element has the class `content` (dark, rounded screen fill with a `.bg-static` noise overlay). That class is what the animation code queries.
- **`src/lib/gsap-tv.ts`**: shared GSAP helpers with a TV theme (`addSignalTuneIn`, `addTypewriter`, `addScanlineReveal`, `addBroadcastSlideIn`, `addChannelTuneIn`, `addPolaroidDrop`) plus `createCleanupTracker`. Registers `ScrollTrigger` and `TextPlugin` and re-exports `gsap`.

### Animation lifecycle (important with view transitions)

Each component has a client `<script>` that follows the same pattern. Keep it when adding sections:

1. Listen on `document` for `astro:page-load`, not `DOMContentLoaded`, because the page is never fully reloaded.
2. Bundled scripts from every visited page stay active, so each handler **must check that its own markup is on the current page** before it runs. Each section's `.content` root has a `data-section` attribute (`hero`, `about`, `education`), and the handler returns early unless `content.dataset.section` matches.
3. Build one `gsap.timeline()`, register it with `createCleanupTracker()`, start it with `addSignalTuneIn(tl, content)`, and call `tracker.killAll()` on `astro:before-preparation` (with `{ once: true }`).
4. Wrap the whole thing in try/catch and on failure force `.content` visible.

`Layout.astro` sets a 2s failsafe timer (`window.__gsapFailsafe`) that forces `.content` visible. `addSignalTuneIn` clears it, so every section animation must call it first.

Elements to animate are found by `data-animate="..."` attributes (`typewriter` + `data-text`, `scanline`, `broadcast`, `channel-tune`, `polaroid`, etc.), not by class names.

## Gotchas

- `Hero.astro` references its GIF as `url("/src/assets/images/gf.gif")` in CSS. Vite rewrites it at build time, so it works in both dev and build. Images inside components should still be imported and rendered with `astro:assets` `<Image>` (as in the About/Education sections), or placed in `public/`.
- `.screen` no longer forces bold/letter-spacing/centered text. Headings set their own weight (`font-bold`) because Tailwind preflight resets `h1`–`h6` to inherit.
- `html`/`body` are fixed at `100vh` with `overflow: hidden`. Content that overflows scrolls inside `.screen-scroll`, not the page.
- Inside the screen, use the **`tv-sm:` / `tv-lg:`** Tailwind variants (container queries on the screen width: ≥ 30rem / ≥ 37.5rem, defined in `tailwind.config.mjs`), not `sm:`/`lg:`. The screen is much narrower than the window (e.g. ~620px on a 1280px laptop), so viewport breakpoints pick the wrong layout.
- Media queries in Layout's `<style>` that override base rules must come **after** those rules in the file (same specificity).
