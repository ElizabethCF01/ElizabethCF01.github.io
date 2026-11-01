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

## Deployment

GitHub Pages, from the repo `ElizabethCF01/ElizabethCF01.github.io` (site served at the root, no `base`). `.github/workflows/deploy.yml` type checks, builds and deploys on every push to `main`, and only runs in that repo. Pages source must be set to "GitHub Actions". For a custom domain: update `site` in `astro.config.mjs` and add `public/CNAME`.

## Architecture

- **`src/layouts/Layout.astro`** holds the whole TV: antenna, body, screen, controls panel, and the page background pattern, all in scoped CSS (originally derived from a Uiverse.io design). Page content goes into `<slot />` inside `.screen > .screen-scroll`. It also enables Astro view transitions (`<ClientRouter />`), so navigation is client-side.
  - One markup, two devices. The **big TV** (default) is a grid (screen | side panel) sized from viewport width *and* height. Below `(max-width: 767px) and (orientation: portrait)` it becomes the **pocket TV** (Watchman-style): bezelled screen above; below it the brand plate, ◀ / LCD channel readout / ▶, slide power switch (on both TVs) and round speaker; thumb wheels on the sides; a single telescopic antenna. The channel knob is hidden there; the arrows navigate. Short landscape screens hide the antenna and legs. Pocket-only elements (`.pocket-btn`, `.wheel`) are `display: none` on the big TV.
  - **The room**: the wallpaper is `public/wallpaper.svg` (a 50s mint pinstripe tile) on `html`. `.table` is a child of `.tv`, placed `--table-offset` (leg height) below the cabinet, 100vw wide and running off-screen, so it always lines up with the legs. The screen's light on the wall is an outer `box-shadow` on `.tv` colored by `--glow` (each channel's `glow` RGB triplet in `channels.ts`).
  - `.tv` is a size container, so the TV parts use `cqi` units and scale with it. `.screen-scroll` is a named container (`screen`).
  - The Layout looks up the current page in `src/data/channels.ts` by `Astro.url.pathname`. That gives the page `<title>`, the channel knob pointer angle (`knob`, 0° = up; the channel numbers are printed at those angles around the knob), the LCD readout (`CH 02 · ABOUT`), and the link targets of the channel knob and the pocket ◀ ▶ buttons (next/previous channel, looping). The only prop is an optional `title` for pages outside the lineup (404).
  - Adding a channel means creating `src/pages/<name>.astro` and adding an entry (number, path, title, knob angle, glow) to `channels`. Array order is the knob's cycle order.
- **`src/data/cv.ts`** holds all portfolio content (profile, experience, skills, education, links). It mirrors `docs/cv.md`. Sections read text from here instead of hard-coding it.
- **`src/pages/`** files are thin: each wraps one section component in `Layout`. `404.astro` renders TV color bars instead.
- **`src/styles/global.css`** is imported in Layout's frontmatter and holds shared styles (the `.bg-static` noise overlay). Fonts come from Google Fonts in Layout's `<head>` (the npm registry here blocks `@fontsource`) and are mapped in `tailwind.config.mjs`: `font-sans` DM Sans, `font-mono` Space Mono, `font-tv` VT323.
- **Knob interactions** (script in Layout): the channel knob is a link to the next channel, but dragging it rotates the cap and, on release, navigates (`navigate()` from `astro:transitions/client`) to the channel whose `knob` angle is nearest; a drag suppresses the click. Stops come from the knob's `data-stops`. `html[data-hint]` shows the first-visit "turn me!" / "tap me!" bubbles until the first `astro:before-preparation`, remembered in `localStorage` (`elivision:tuned`, wrapped in try/catch). The handwriting font is Caveat.
- **Channel change** (script in Layout): `astro:before-preparation` adds `.tuning` to the old `.screen` (full static via `.tune-static`) and plays the sound; on the next `astro:page-load` the new screen gets a 260ms `.tuning` burst and `.osd-on` for 2s (the `.osd` corner label). First loads and reloads show neither. Sound uses Web Audio only (no files), is off by default, and is toggled by the `.volume-knob` button (`aria-pressed`, `localStorage` `elivision:sound`). Stacking: `.tune-static` z 3, `.osd` z 4.
- **Table props** live in `src/components/TableProps.astro`, rendered inside `.tv` and sized in `cqi`. Each prop's bottom rests on the table top (`bottom: calc(-1 * (var(--table-offset) + 0.7rem))`). They're hidden on the pocket TV and short landscape screens, and the plant is hidden below a 31:20 aspect ratio. Keep props clear of the TV legs (9% from each side) and short enough not to cover the screen. The plant and mug size themselves from the free wall beside the TV (`clamp()` on `100vw - 109cqi`).
- **TV Guide**: `#channel-guide` is a native `popover` at the end of `<body>`, opened by the remote and by the `.lcd` readout (both `popovertarget`). It's closed on `astro:before-preparation`. `html`/`body` use `overflow: clip`, not `hidden`, so opening it (or focusing anything) can't scroll the page down to the off-screen table.
- The CV PDF is `public/elizabeth-calzadilla-cv.pdf` (public on purpose, phone number included). The VHS link has a `download` attribute, which Astro's router skips.
- **Keyboard and swipe** (scripts in Layout, registered once on `document`, not per page load): ← → follow the pocket ◀ ▶ links, number keys follow the guide links, ↑ ↓ PgUp PgDn scroll `.screen-scroll` when focus is outside it and walk the list when the guide is open. On the pocket TV a horizontal touch swipe on the screen changes channel; `touch-action: pan-y pinch-zoom` keeps vertical scrolling and zoom. `.skip-link` moves focus to `main#channel` (`.screen-scroll`). Its focus ring is on `.screen` via `:has()`, because the section inside paints over a ring on the scroller itself.
- **Easter eggs** (scripts in Layout): `.power-switch` toggles `html[data-tv-off]`, which collapses `.screen-scroll` (`crt-off`, ending `visibility: hidden` so it can't take focus), shows `.crt-dot` and the `.crt-msg` text, sets `--glow-on: 0`, and dims the room (`body::after`). It's never persisted: changing channel or reloading turns the TV back on. `.antenna` is a button: `.wobbling` springs the rods (each sets its resting angle in `--r`), `.interference` flashes `.tune-static`, then `.signal-clear` removes the noise, glass and hero glitch and shows `.osd-signal` for 5s.
- **Experience channel** (`ExperienceSection.astro`): the blue guide look lives on its own `.guide-screen` root. Rows are native `<details name="experience-guide">`, so only one is open at a time and no script is needed. Its scoped CSS switches layout with `@container screen (min-width: 37.5rem)`, the same breakpoint as `tv-lg:`.
- **Contact channel** (`ContactSection.astro`): `.credits` rolls up once via GSAP and stops at `y: 0`. `pointerdown` or `focusin` jumps the timeline to its end so links never move under the user, and the roll is skipped for `prefers-reduced-motion`.
- **Home** (`Hero.astro`): the typing scene sits beside the text from `tv-sm` up. Pitch and cards come from `pitch` and `highlights` in `cv.ts`.
- **Character** (`Character.astro`, prop `pose`): inline SVG with all parts positioned around (200, 130). Add a pose by adding an entry to `poses` plus any props. All motion is GSAP in the component script, inside a `gsap.context` that reverts on `astro:before-preparation`; push looping tweens into `loops` so they pause off-screen. Elements GSAP animates should be nested inside any `<g>` that has a `transform` attribute, and `svgOrigin` uses that local coordinate space. Hidden extras (`.shipped`, `.note`, `.confetti`) start at `opacity="0"`, so reduced motion shows a plain still pose. It renders once per page since it defines `id`s.
- **Skills channel** (`SkillsSection.astro`): teletext look. Rows with `data-animate="tt-row"` appear one by one. The header clock is filled by the script and its interval is cleared on `astro:before-preparation`. The `.fastext` links are real channel links, so give each a matching color class.
- **Education channel** (`EducationSection.astro`): sports-broadcast look. The scoreboard only shows facts from `cv.ts` (no invented rank or score). Balloons (`data-animate="balloon"`) are decorative SVGs popped in by GSAP. The ticker's CSS marquee wraps as static text under `prefers-reduced-motion`.
- `docs/ROADMAP.md` tracks the redesign plan and task status.
- **`src/components/*Section.astro` / `Hero.astro`**: each section's root element has the class `content` (dark, rounded screen fill with a `.bg-static` noise overlay). That class is what the animation code queries.
- **`src/lib/gsap-tv.ts`**: shared GSAP helpers with a TV theme (`addSignalTuneIn`, `addTypewriter`, `addScanlineReveal`, `addBroadcastSlideIn`, `addChannelTuneIn`, `addPolaroidDrop`) plus `createCleanupTracker`. Registers `ScrollTrigger` and `TextPlugin` and re-exports `gsap`.

### Animation lifecycle (important with view transitions)

Each component has a client `<script>` that follows the same pattern. Keep it when adding sections:

1. Listen on `document` for `astro:page-load`, not `DOMContentLoaded`, because the page is never fully reloaded.
2. Bundled scripts from every visited page stay active, so each handler **must check that its own markup is on the current page** before it runs. Each section's `.content` root has a `data-section` attribute (`hero`, `about`, `experience`, `skills`, `education`, `contact`), and the handler returns early unless `content.dataset.section` matches.
3. Build one `gsap.timeline()`, register it with `createCleanupTracker()`, start it with `addSignalTuneIn(tl, content)`, and call `tracker.killAll()` on `astro:before-preparation` (with `{ once: true }`).
4. Wrap the whole thing in try/catch and on failure force `.content` visible.

Reduced motion is handled centrally: `addSignalTuneIn` jumps the timeline to its end once the caller has built it, and a blanket rule in `global.css` ends CSS animations and transitions. New sections get both for free, but any extra loop started outside the timeline needs its own check.

`Layout.astro` sets a 2s failsafe timer (`window.__gsapFailsafe`) that forces `.content` visible. `addSignalTuneIn` clears it, so every section animation must call it first.

Elements to animate are found by `data-animate="..."` attributes (`typewriter` + `data-text`, `scanline`, `broadcast`, `channel-tune`, `polaroid`, etc.), not by class names.

## Gotchas

- Images inside components should be imported and rendered with `astro:assets` `<Image>` (as in the About/Education sections), or placed in `public/`.
- `.screen` no longer forces bold/letter-spacing/centered text. Headings set their own weight (`font-bold`) because Tailwind preflight resets `h1`–`h6` to inherit.
- `html`/`body` are fixed at `100dvh` with `overflow: clip`. Content that overflows scrolls inside `.screen-scroll`, not the page. Its scrollbar is hidden on purpose. Instead, a script in Layout sets `data-more-below` on `.screen` while there is content below, which shows a bottom fade (`.screen::before`) and a blinking `▼ MORE` button (`.osd-more`) that scrolls by 80% of the screen. `.screen-scroll` is focusable for keyboard scrolling.
- `.screen` itself is plain black; the static behind the content is `.screen-static`, inset 3px so it can't leak through the antialiased corners.
- Section roots (`.content`) must not set their own border radius or border. `.screen-scroll` clips them to the screen's inner corners; a bigger radius leaves gaps where the static behind shows through.
- The antenna's `.mount` sits at `bottom: calc(100% - 2px)` to cover the cabinet's top border, so the antenna reads as part of the TV. Keep that overlap if you resize it.
- Stacking inside `.screen`: `.screen-scroll` is `z-index: 1`, the fade is 2, the glass is 3 and `▼ MORE` is 4. Section roots use `z-10`, which only works because `.screen-scroll` forms its own stacking layer. Don't remove that `z-index`.
- Inside the screen, use the **`tv-sm:` / `tv-lg:`** Tailwind variants (container queries on the screen width: ≥ 30rem / ≥ 37.5rem, defined in `tailwind.config.mjs`), not `sm:`/`lg:`. The screen is much narrower than the window (e.g. ~620px on a 1280px laptop), so viewport breakpoints pick the wrong layout.
- Media queries in Layout's `<style>` that override base rules must come **after** those rules in the file (same specificity).
