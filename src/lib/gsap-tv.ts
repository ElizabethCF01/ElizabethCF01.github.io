import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// ---------------------------------------------------------------------------
// Cleanup tracker
// ---------------------------------------------------------------------------
export function createCleanupTracker() {
  const items: (gsap.core.Timeline | gsap.core.Tween)[] = [];

  return {
    add<T extends gsap.core.Timeline | gsap.core.Tween>(tl: T): T {
      items.push(tl);
      return tl;
    },
    killAll() {
      items.forEach((t) => t.kill());
      items.length = 0;
    },
  };
}

const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------------
// CRT "Signal Tune-In"
// ---------------------------------------------------------------------------
export function addSignalTuneIn(
  tl: gsap.core.Timeline,
  contentEl: HTMLElement
): void {
  const failsafe = (window as any).__gsapFailsafe;
  if (failsafe) clearTimeout(failsafe);

  // Every channel's entrance runs at this speed: a change of channel should feel quick
  tl.timeScale(1.6);

  // Reduced motion: once the caller has finished building, jump to the final state
  if (prefersReducedMotion()) queueMicrotask(() => tl.progress(1));

  tl.fromTo(
    contentEl,
    { opacity: 0, scaleY: 0.005, scaleX: 1.2, transformOrigin: "center center" },
    { opacity: 1, scaleY: 1, scaleX: 1, duration: 0.4, ease: "power2.out" }
  );
}

// ---------------------------------------------------------------------------
// Typewriter
// ---------------------------------------------------------------------------
export function addTypewriter(
  tl: gsap.core.Timeline,
  el: HTMLElement,
  text: string,
  position: string,
  duration = 0.8
): void {
  const textSpan = document.createElement("span");
  const cursorSpan = document.createElement("span");
  cursorSpan.textContent = "_";
  cursorSpan.classList.add("typewriter-cursor");

  el.textContent = "";
  el.appendChild(textSpan);
  el.appendChild(cursorSpan);

  tl.to(
    textSpan,
    { text: { value: text, delimiter: "" }, duration, ease: "none" },
    position
  );

  if (prefersReducedMotion()) return;

  gsap.to(cursorSpan, {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "steps(1)",
  });
}

// ---------------------------------------------------------------------------
// Scanline reveal
// ---------------------------------------------------------------------------
export function addScanlineReveal(
  tl: gsap.core.Timeline,
  els: HTMLElement[],
  position: string,
  stagger = 0.15
): void {
  tl.fromTo(
    els,
    { clipPath: "inset(0 0 100% 0)", x: -8 },
    {
      clipPath: "inset(0 0 0% 0)",
      x: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger,
    },
    position
  );
}

// ---------------------------------------------------------------------------
// Broadcast slide-in
// ---------------------------------------------------------------------------
export function addBroadcastSlideIn(
  tl: gsap.core.Timeline,
  el: HTMLElement,
  position: string,
  from: gsap.TweenVars = { x: 120, opacity: 0, scale: 0.9 }
): void {
  tl.fromTo(
    el,
    { ...from },
    {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.4)",
    },
    position
  );
}

// ---------------------------------------------------------------------------
// Channel tune-in
// ---------------------------------------------------------------------------
export function addChannelTuneIn(
  tl: gsap.core.Timeline,
  els: HTMLElement[],
  position: string,
  stagger = 0.25
): void {
  tl.fromTo(
    els,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger,
    },
    position
  );
}

// ---------------------------------------------------------------------------
// Polaroid drop
// ---------------------------------------------------------------------------
export function addPolaroidDrop(
  tl: gsap.core.Timeline,
  els: HTMLElement[],
  position: string,
  stagger = 0.15
): void {
  tl.fromTo(
    els,
    { y: -60, opacity: 0, scale: 0.8 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(0.6, 0.4)",
      stagger,
    },
    position
  );
}

export { gsap, TextPlugin };
