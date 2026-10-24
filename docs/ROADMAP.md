# Portfolio roadmap

Content source of truth: [cv.md](./cv.md). Workflow per task: **plan → execute → review** (screenshots at 1440 / 1280 / 820 / 390 px + `npm run build`).

## Diagnosis (2026-10-22)

| # | Area | Finding | Severity |
|---|------|---------|----------|
| D1 | Responsive | `.tv` has `min-width: 700px` and `html/body` are `overflow: hidden`. At 390px the page is 545px wide and the right side (including the only nav knob) is unreachable. | Critical |
| D2 | Navigation / a11y | The only navigation is an unlabeled knob link (no text, no `aria-label`, no focus style). Visitors can't tell it's clickable, can't jump to a section, and keyboard users can't tell where they are. | Critical |
| D3 | Content | Missing: Experience (zara.com!), Skills, Contact/links, Beyond work. The strongest selling points (zara.com, ICPC World Finals) are buried or absent. | High |
| D4 | Content accuracy | Hero says "Web Developer" while the CV says "Software Engineer". About says "4+ years" while the CV says "5+". | High |
| D5 | Typography | `.screen` applies `font-weight: bold` + `letter-spacing: .15em` to all text, which makes body paragraphs hard to read. Montserrat is declared but never loaded (falls back to system font). | Medium |
| D6 | Hero | The name is offset with `mr-[40%]` and there's no clear call to action. White text sits over a busy GIF (contrast varies). Infinite glitch animations. | Medium |
| D7 | Layout | Photos are absolutely positioned with negative offsets, so they clip at the screen edge (About) and run past the bottom (Education at 1280px). | Medium |
| D8 | Motion a11y | No `prefers-reduced-motion` handling: infinite glitch, static noise, cursor blink. | Medium |
| D9 | SEO / meta | Same `<title>` on every page, no meta description, no Open Graph image, no sitemap. | Medium |
| D10 | Code health | `.bg-static` + `@keyframes b` copied in 4 files; content hard-coded in markup; the page guard depends on heading text; unused imports (`EliHero3`); unused large assets (`mick-haupt…jpg` 6.8 MB, `test.jpg`, `flowers-paper-bg.jpg`); unused `@types/jquery`; global.css linked via `/src/...`. | Low |

## Creative direction: "Channels"

Lean further into the TV metaphor instead of fighting it:

- **On-screen display (OSD)**: a green `CH 03` label in the corner on every channel change, like an old TV.
- **Channel lineup** shown on the side panel (desktop) or as a remote control (mobile), so navigation is visible and labeled.
- **Keyboard**: ←/→ or ↑/↓ change channel, number keys jump straight to one.
- Each section gets a broadcast format that suits its content:
  - CH 01 **Home**: broadcast intro. Name, "Software Engineer", ICPC + zara.com badges, "press ▶ / turn the knob" hint.
  - CH 02 **About**: "interview" format (photos + short bio + highlight stat cards: 5+ yrs, ICPC WF, zara.com).
  - CH 03 **Experience**: "TV Guide" listings. Date ranges as time slots, projects as shows, stack tags as genres; expandable rows.
  - CH 04 **Skills**: Teletext / Ceefax page ("P100 SKILLS") with blocky colored headers.
  - CH 05 **Education & ICPC**: "Sports broadcast". ICPC as a match result card, plus a polaroid wall.
  - CH 06 **Contact**: "End credits" roll with links, CV download, languages.
  - 404: color bars (already done ✔).
- **Mobile**: a **pocket TV** (80s Watchman-style handheld) instead of the big set. Screen on top (~70% height), with the channel dial, prev/next, power and speaker grille below. Swiping the screen changes channel. Landscape phones get the big TV scaled down, with an optional non-blocking "rotate for the full TV" hint.

## Creative direction: "The room"

The TV lives in a cartoon living room. The scene uses the same flat style as the TV: thick dark outlines, flat colors, small offset highlights.

- **Wall**: replace the current chevron pattern with retro cartoon wallpaper. Mid-century "atomic" starbursts or soft vertical stripes in mustard/cream/teal, so they complement the orange TV. Add a baseboard line, a framed picture (ICPC photo), and a wall clock showing the visitor's real time.
- **Lighting**: the TV screen casts a colored glow on the wall that changes per channel. Optional day/night: the room gets darker at the visitor's local night time and the glow gets stronger.
- **Wood table**: just the top edge of a wooden TV stand visible at the bottom of the viewport. CSS wood grain, cartoon outline, with the TV legs standing on it. Props on the table, each doing something:
  - **Remote control**: clickable, opens the channel list (it doubles as mobile nav).
  - **VHS tape labeled "CV"**: downloads the PDF.
  - **Coffee mug**: animated steam.
  - **Book stack**: spines read "Algorithms", "ICPC", "a11y".
  - **Small plant**.
- **Knobs that clearly say "I'm a control"**:
  - Engraved labels: `CHANNEL` on knob 1, `VOLUME` on knob 2.
  - Channel knob has numbered tick marks 1–6 around it and rotates with a spring to the current channel.
  - Hover/focus: knob lifts and the cursor becomes a grab hand; a tooltip says "next channel ▸".
  - First visit: a hand-drawn cartoon arrow + speech bubble "turn me!" that wiggles and disappears after the first use.
  - Drag to rotate (desktop): dragging the knob snaps to channels.
  - Volume knob toggles sound effects (static burst + "clunk" on channel change). Muted by default, with a visible state.
  - Power button: CRT shut-off animation (screen collapses to a dot) with a small easter egg behind it.
- **Channel change transition**: knob clunk → static burst → OSD `CH 04 SKILLS` → new content tunes in.
- **Easter eggs** (pick 1–2): click the antenna to wobble it and "fix the signal" (static clears); a cat sleeping on top of the TV with a swinging tail; Konami code turns on "ICPC mode" (green terminal theme).
- **Mobile**: the camera "zooms in" on the screen. The wall and table become a thin frame, and the remote on the table becomes the fixed bottom remote.

### Decisions (2026-10-22)
- Wallpaper: **atomic starbursts** (50s/60s cartoon).
- Easter eggs: **power button** (CRT shut-off to a dot) and **wobbly antenna** (clears the static).
- Mobile: **pocket TV** (Watchman-style handheld), never force rotation.
- Character: **drawn here in SVG/CSS**, playful and funny over realistic.
- Fonts load from Google Fonts (the npm registry blocks `@fontsource`).

## Tasks

### Phase 0: Foundations
- [x] **T0.1** Move CV content into a typed data file (`src/data/cv.ts`) used by every section.
- [x] **T0.2** Shared styles: extract `.bg-static`/keyframes into a global stylesheet imported properly; load fonts (DM Sans body, Space Mono headings, VT323 for the OSD) from Google Fonts; remove bold/letter-spacing from body text.
- [x] **T0.3** Channel registry (`src/data/channels.ts`: number, slug, title, knob angle) feeding Layout nav + `nextPage`/`prevPage` automatically.
- [x] **T0.4** Clean up unused assets/imports and `@types/jquery`.

### Phase 1: Responsive TV shell
- [x] **T1.1** One markup, two devices. **Big TV** (landscape/desktop/tablet): fluid size from viewport width *and* height, no 700px minimum; on short landscape phones the antenna and legs are hidden. **Pocket TV** (phones in portrait, < 768px): an 80s Watchman-style handheld that fills the viewport, with a telescopic antenna. Rotation is never required (WCAG 1.3.4).
- [x] **T1.2** Pocket TV details: dark screen bezel, side thumb wheels, "Elivision" brand plate, ◀ / green LCD channel readout (`CH 02 · ABOUT`) / ▶ (≥ 44px tap targets, labeled; no center knob), slide power switch (visual only until T1.9), round speaker grille. *Swipe left/right moved to T2.2 with keyboard switching.*
- [x] **T1.2b** Big TV detail pass: side panel with brand plate, LCD readout, labeled ridged CHANNEL/VOLUME knobs (channel numbers around the dial), and speaker grille. Screen in a recessed bezel with CRT glass (vignette, scanlines, glare). Stray curve glyph and vents removed; splayed wooden legs.
- [x] **T1.2d** Antenna mounted on the cabinet (light-orange plinth molded into the top edge; swivel joint on the pocket TV). Section roots are square-cornered so the screen clips them, and no static shows at the corners.
- [x] **T1.2c** Scrolling: native scrollbar hidden, bottom fade plus blinking `▼ MORE` hint (click scrolls), keyboard-focusable screen.
- [x] **T1.3** Make every section's internal layout stack on small screens (photos below text, no negative offsets).

### Phase 1.5: The room
- [x] **T1.4** Atomic starburst wallpaper (`public/wallpaper.svg`) with a soft vignette, and per-channel screen glow on the wall (`glow` in `channels.ts`). *Baseboard dropped: the table covers the bottom of the wall.*
- [x] **T1.5** Wooden table (top surface, front edge, grain, contact shadow) across the full width; the big TV stands on it, and the pocket TV rests on its edge.
- [ ] **T1.6** Knob redesign: labels, numbered ticks, spring rotation to current channel, hover/focus states, first-visit "turn me!" hint.
- [ ] **T1.7** Channel-change transition (static burst + OSD) and optional sound (muted by default, volume knob toggles it).
- [ ] **T1.8** Table props: remote (opens channel list), VHS "CV" download, mug steam, books, plant.
- [ ] **T1.9** Extras: wall clock, framed photo, day/night lighting, power button, 1–2 easter eggs.

### Phase 1.6: Visual assets & cartoon character
- [ ] **T1.10** Photo pass: ICPC Luxor photo (`eli-hero-img-3`, currently unused) becomes the ICPC channel's main image; keep `freestyle-team` + `eli-hero-img-1`; drop or move `eli-hero-img-2`; replace the UCI / Harbour.Space building photos with cartoon logo stickers or drop them. Wanted from Elizabeth: Leagues of Code teaching photo, desk or office photo.
- [ ] **T1.11** Replace the hero GIF (likely third-party art, ~425 KB, not her) with the cartoon character scene.
- [ ] **T1.12** Cartoon "Eli" character in SVG, same flat outlined style as the TV, animated with GSAP. Source options: (1) drawn here in SVG, (2) illustrator/AI avatar from a photo, then traced to SVG, (3) Lottie/Rive (license check). Needs 2–3 traits from Elizabeth.
- [ ] **T1.13** Per-channel scenes: Home coding at a desk; About news anchor; ICPC sports broadcast with balloons popping per solved problem and a scoreboard; reactions to power-off and antenna static. Pause off-screen, static frame for reduced motion.

### Phase 2: Navigation & accessibility
- [ ] **T2.1** Labeled, focusable controls (`aria-label`, visible focus ring), `aria-current` on the active channel, skip link.
- [ ] **T2.2** Keyboard channel switching, swipe on the pocket TV screen, OSD channel indicator.
- [ ] **T2.3** `prefers-reduced-motion`: disable glitch/noise/typewriter and show final states.
- [ ] **T2.4** Contrast pass (hero text over GIF: add scrim/gradient).

### Phase 3: Content channels
- [ ] **T3.1** Hero rewrite (Software Engineer, badges, CTA hint).
- [ ] **T3.2** About update (5+ yrs, zara.com, a11y/perf focus, stat cards).
- [ ] **T3.3** Experience channel ("TV Guide").
- [ ] **T3.4** Skills channel ("Teletext").
- [ ] **T3.5** Education + ICPC channel refresh.
- [ ] **T3.6** Contact channel ("End credits") + downloadable CV PDF in `public/`.

### Phase 4: Polish & ship
- [ ] **T4.1** Per-page title/description, OG image, sitemap, favicon check.
- [ ] **T4.2** Performance: optimize GIF (→ looping WebM/MP4 or poster), image `sizes`, Lighthouse run.
- [ ] **T4.3** Final cross-viewport review + build/preview check.

## Open questions
- UCI "Graduated 2024": accurate? (Harbour.Space double M.Sc. confirmed completed; phone confirmed public.)
- Should the hero GIF stay (is it licensed / yours)?
