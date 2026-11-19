import { type RefObject, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };

/** Every animation lives behind this query: reduced-motion users get the static, fully drawn page. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

const DRAWN = { strokeDashoffset: 0 };
const UNDRAWN = { strokeDashoffset: 1 };
const { random } = gsap.utils;

const byData = (key: string) => (a: Element, b: Element) => Number((a as HTMLElement).dataset[key]) - Number((b as HTMLElement).dataset[key]);

/**
 * Orion builds itself star by star. Each star "ignites": a soft bloom of
 * glow, the core grows from nothing, a small four-point flare opens and
 * settles, and the star gives one tiny twinkle. The belt lights first
 * (data-ignite 0-2), then the rest of the figure; once every star is lit the
 * lines are traced in data-trace order, each one starting from the star that
 * lit first. Returns the time at which the constellation is complete.
 */
function buildOrion(svg: SVGSVGElement, tl: gsap.core.Timeline, at: number) {
  const stars = Array.from(svg.querySelectorAll<SVGGElement>("[data-ignite]")).sort(byData("ignite"));
  const lines = Array.from(svg.querySelectorAll<SVGLineElement>("[data-trace]")).sort(byData("trace"));
  const parts = (sel: string) => stars.map((star) => star.querySelector(sel)).filter(Boolean) as Element[];
  const cores = parts(".orion-core");
  const glows = parts(".orion-glow");
  const flares = parts(".orion-flare");
  const sword = svg.querySelectorAll(".orion-sword circle");

  // Take over from the CSS "pre-JS" hidden state (see .orion:not([data-live]) in styles.css).
  svg.setAttribute("data-live", "");
  gsap.set([...cores, ...glows, ...flares], { transformOrigin: "50% 50%" });
  gsap.set(cores, { scale: 0 });
  gsap.set(glows, { scale: 0, opacity: 0 });
  gsap.set(flares, { scale: 0.2, opacity: 0, rotation: -30 });
  gsap.set(lines, UNDRAWN);
  gsap.set(sword, { opacity: 0 });

  let t = at;
  stars.forEach((star, i) => {
    const core = star.querySelector(".orion-core");
    const glow = star.querySelector(".orion-glow");
    const flare = star.querySelector(".orion-flare") as SVGElement | null;
    const rest = Number(flare?.dataset.rest ?? 0);
    if (glow) {
      tl.to(glow, { scale: 1.9, opacity: 1, duration: 0.4, ease: "power2.out" }, t);
      tl.to(glow, { scale: 1, duration: 1.4, ease: "sine.inOut" }, t + 0.4);
    }
    if (core) {
      tl.to(core, { scale: 1, duration: 0.75, ease: "back.out(2.4)" }, t + 0.05);
      tl.to(core, { opacity: 0.5, duration: 0.14, repeat: 1, yoyo: true, ease: "sine.inOut" }, t + 0.7);
    }
    if (flare) {
      tl.to(flare, { opacity: 0.95, scale: 1.15, rotation: 0, duration: 0.45, ease: "power2.out" }, t + 0.08);
      tl.to(flare, { opacity: rest, scale: 1, duration: 1, ease: "sine.inOut" }, t + 0.53);
    }
    // The belt lights slowly, one breath per star; the rest follow a little quicker.
    t += i < 2 ? 0.42 : i === 2 ? 0.6 : 0.27;
  });
  // A short pause after the last star, then each line is drawn slowly and
  // fades in as it goes, one after another with a gentle overlap.
  const LINE_DURATION = 1.7;
  const LINE_STAGGER = 0.8;
  const linesAt = t + 0.6;
  tl.to(sword, { opacity: (i, el: Element) => Number(el.getAttribute("opacity") ?? 1), duration: 0.6, stagger: 0.12, ease: "sine.out" }, t - 0.6);
  tl.fromTo(lines, { opacity: 0 }, { opacity: 1, duration: LINE_DURATION * 0.7, stagger: LINE_STAGGER, ease: "sine.out" }, linesAt);
  tl.to(lines, { ...DRAWN, duration: LINE_DURATION, stagger: LINE_STAGGER, ease: "sine.inOut" }, linesAt);
  return linesAt + LINE_DURATION + LINE_STAGGER * Math.max(0, lines.length - 1);
}

/**
 * After the build, a few stars breathe now and then: slow, small and out of
 * step with each other. Paused whenever the constellation is off screen.
 */
function idleTwinkle(svg: SVGSVGElement, startAt: number) {
  const stars = gsap.utils.shuffle(Array.from(svg.querySelectorAll<SVGGElement>("[data-ignite]")));
  const idle = gsap.timeline({ paused: true });
  stars.slice(0, 5).forEach((star, i) => {
    const glow = star.querySelector(".orion-glow");
    const core = star.querySelector(".orion-core");
    const up = random(0.9, 1.4);
    const down = random(1.6, 2.4);
    const loop = gsap.timeline({ repeat: -1, repeatDelay: random(3.5, 7.5) });
    if (glow) loop.to(glow, { keyframes: [{ scale: random(1.25, 1.45), duration: up, ease: "sine.inOut" }, { scale: 1, duration: down, ease: "sine.inOut" }] }, 0);
    if (core) loop.to(core, { keyframes: [{ opacity: 0.72, duration: up * 0.6, ease: "sine.inOut" }, { opacity: 1, duration: down * 0.6, ease: "sine.inOut" }] }, 0.2);
    idle.add(loop, i * random(1.1, 2.2) + random(0, 0.8));
  });
  let visible = true;
  let started = false;
  gsap.delayedCall(startAt, () => { started = true; if (visible) idle.play(); });
  ScrollTrigger.create({
    trigger: svg,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      visible = self.isActive;
      if (!started) return;
      if (visible) idle.play(); else idle.pause();
    },
  });
}

/** Ambient twinkle of a starfield, as one timeline that only runs while its section is on screen. */
function ambientSky(field: SVGSVGElement) {
  const section = field.parentElement ?? field;
  const twinkling = field.querySelectorAll(".sky-star.twinkle");
  if (twinkling.length) {
    const tl = gsap.timeline({ paused: true });
    twinkling.forEach((star) => tl.to(star, { opacity: 0.12, duration: random(2.2, 4.8), repeat: -1, yoyo: true, ease: "sine.inOut" }, random(0, 4)));
    ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) });
  }

  // A rare shooting star: one short streak every 12-26 s, only while visible.
  const meteor = field.querySelector(".shooting-star");
  if (!meteor) return;
  let sx = 0;
  let sy = 0;
  const fly = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatRefresh: true,
    delay: random(4, 9),
    repeatDelay: random(12, 26),
    onRepeat: () => { fly.repeatDelay(random(12, 26)); },
  });
  fly
    .set(meteor, { x: () => (sx = random(420, 1080)), y: () => (sy = random(50, 330)), opacity: 0 })
    .to(meteor, { x: () => sx + 280, y: () => sy + 102, duration: 1.15, ease: "power1.in" })
    .to(meteor, { keyframes: [{ opacity: 1, duration: 0.25, ease: "sine.out" }, { opacity: 0, duration: 0.7, ease: "sine.in", delay: 0.2 }] }, "<");
  ScrollTrigger.create({ trigger: section, start: "top 85%", end: "bottom 15%", onToggle: (self) => (self.isActive ? fly.play() : fly.pause()) });
}

/**
 * <details> accordions open and close with a measured height and the answer
 * fading in, instead of jumping. Native semantics stay: `open` is set before
 * the opening animation and removed after the closing one.
 */
function smoothAccordions(ctx: gsap.Context, items: HTMLDetailsElement[]) {
  const cleanups: (() => void)[] = [];
  items.forEach((details) => {
    const summary = details.querySelector("summary");
    const answer = details.querySelector(":scope > :not(summary)");
    if (!summary) return;
    let tween: gsap.core.Timeline | null = null;
    let wantOpen = details.open;
    const toggle = ctx.add("toggle", (event: Event) => {
      event.preventDefault();
      wantOpen = !wantOpen;
      tween?.kill();
      const border = parseFloat(getComputedStyle(details).borderBottomWidth) || 0;
      const from = details.offsetHeight;
      if (wantOpen) {
        details.open = true;
        tween = gsap.timeline({ onComplete: () => { gsap.set(details, { clearProps: "height,overflow" }); } })
          .fromTo(details, { height: from, overflow: "hidden" }, { height: "auto", duration: 0.5, ease: "power2.inOut" });
        if (answer) tween.fromTo(answer, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", clearProps: "opacity,transform" }, 0.12);
      } else {
        tween = gsap.timeline({ onComplete: () => { details.open = false; gsap.set(details, { clearProps: "height,overflow" }); } })
          .fromTo(details, { height: from, overflow: "hidden" }, { height: summary.offsetHeight + border, duration: 0.4, ease: "power2.inOut" });
        if (answer) tween.to(answer, { opacity: 0, duration: 0.25, ease: "sine.in" }, 0);
      }
    }) as (event: Event) => void;
    // Keep our state in sync if something else opens it (e.g. find-in-page).
    const onNativeToggle = () => { if (!tween?.isActive()) wantOpen = details.open; };
    summary.addEventListener("click", toggle);
    details.addEventListener("toggle", onNativeToggle);
    cleanups.push(() => {
      summary.removeEventListener("click", toggle);
      details.removeEventListener("toggle", onNativeToggle);
      tween?.kill();
      gsap.set([details, answer].filter(Boolean), { clearProps: "all" });
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/**
 * Page-level choreography. One orchestrated entrance (night sky, constellation,
 * headline), then a few scroll-linked moments: line drawings that trace as you
 * read, a slow parallax on the sky and gentle reveals for key blocks.
 */
export function usePageMotion(scope: RefObject<HTMLElement>, key: string) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, wide: "(min-width: 760px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;
        const q = gsap.utils.selector(scope);
        const all = (sel: string) => q(sel) as Element[];

        /* 1 · Entrance: the sky appears, Orion builds itself star by star, the words rise. */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const sky = all("[data-hero] .starfield");
        if (sky.length) tl.from(sky, { opacity: 0, duration: 2.6, ease: "sine.out" }, 0);
        const rings = all(".orion-rings .draw");
        if (rings.length) tl.fromTo(rings, UNDRAWN, { ...DRAWN, duration: 3.6, ease: "power2.inOut" }, 0.1);
        const dots = all(".orion-ring-dots");
        if (dots.length) tl.from(dots, { opacity: 0, rotation: -20, svgOrigin: "214 270", duration: 4, ease: "sine.out" }, 0.4);
        const orion = all("[data-orion]")[0] as SVGSVGElement | undefined;
        if (orion) {
          const done = buildOrion(orion, tl, 0.35);
          idleTwinkle(orion, done + 0.8);
        }
        const nebula = all(".orion-nebula");
        if (nebula.length) tl.from(nebula, { opacity: 0, duration: 2.4, ease: "sine.inOut" }, 2.2);
        const heroArt = all("[data-hero] .art .draw");
        if (heroArt.length) tl.fromTo(heroArt, UNDRAWN, { ...DRAWN, duration: 1.8, stagger: 0.1, ease: "power2.inOut" }, 0.4);
        const heroLines = all("[data-hero-line]");
        if (heroLines.length) tl.from(heroLines, { yPercent: 55, opacity: 0, duration: 1.5, stagger: 0.16 }, 0.2);
        const heroFade = all("[data-hero-fade]");
        if (heroFade.length) tl.from(heroFade, { y: 16, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.75);

        /* 2 · Ambient: a handful of sky stars breathe and, rarely, one falls. Off-screen skies rest. */
        (all(".starfield") as SVGSVGElement[]).forEach(ambientSky);

        /* 3 · Parallax: the sky drifts slower than the page as you leave the hero. */
        const hero = all("[data-hero]")[0];
        if (hero) {
          const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
          if (sky.length) gsap.to(sky, { yPercent: 12, ease: "none", scrollTrigger: st });
          const figure = all("[data-hero] [data-parallax]");
          if (figure.length) gsap.to(figure, { yPercent: -10, ease: "none", scrollTrigger: st });
        }

        /* 4 · Line drawings trace themselves as they cross the viewport. */
        all("[data-draw]").forEach((svg) => {
          if (svg.closest("[data-hero]")) return;
          const strokes = svg.querySelectorAll(".draw");
          if (!strokes.length) return;
          gsap.fromTo(strokes, UNDRAWN, { ...DRAWN, ease: "none", stagger: 0.02, scrollTrigger: { trigger: svg, start: "top 90%", end: "center 40%", scrub: 1.2 } });
        });
        const mandala = all("[data-rotate]");
        mandala.forEach((el) => gsap.to(el, { rotation: 30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 } }));

        /* 5 · The three steps are joined like Orion's belt: each step's star ignites as the line reaches it. */
        const belt = all("[data-belt-line]")[0] as HTMLElement | undefined;
        if (belt) {
          const stepStars = all(".step-star");
          const beltTl = gsap.timeline({ scrollTrigger: { trigger: belt.parentElement, start: "top 78%", end: "bottom 62%", scrub: 1 } });
          beltTl.fromTo(belt, wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1, ease: "none", transformOrigin: wide ? "0% 50%" : "50% 0%" }, 0);
          const last = Math.max(1, stepStars.length - 1);
          stepStars.forEach((star, i) => {
            const at = Math.max(0, i / last - 0.06);
            beltTl.fromTo(star, { scale: 0.45, opacity: 0.35, "--step-glow": 0 }, { scale: 1, opacity: 1, "--step-glow": 1.8, duration: 0.09, ease: "power2.out" }, at);
            beltTl.to(star, { "--step-glow": 1, duration: 0.12, ease: "sine.inOut" }, at + 0.09);
          });
        }

        /* 6 · Quiet reveals for a few key blocks only (opacity keeps them in the a11y tree). */
        const reveal = all("[data-reveal]");
        if (reveal.length) {
          gsap.set(reveal, { opacity: 0, y: 26 });
          ScrollTrigger.batch(reveal, {
            start: "top 88%",
            once: true,
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power3.out", overwrite: true }),
          });
        }

        /* 7 · Accordions answer the click with a smooth height change. */
        return smoothAccordions(ctx, all(".accordion details") as HTMLDetailsElement[]);
      });
      return () => mm.revert();
    },
    { scope, dependencies: [key], revertOnUpdate: true },
  );
}

/**
 * Traces an illustration's strokes when it changes (a person picked another
 * experience or asked to redraw it). The first drawing waits for the panel to
 * scroll into view.
 */
export function useDrawIn(ref: RefObject<HTMLElement>, deps: unknown[]) {
  const firstRun = useRef(true);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const isFirst = firstRun.current;
      firstRun.current = false;
      mm.add(MOTION_OK, () => {
        const el = ref.current;
        if (!el) return;
        const strokes = el.querySelectorAll(".draw");
        const tl = gsap.timeline(isFirst ? { scrollTrigger: { trigger: el, start: "top 75%", once: true } } : {});
        tl.from(el, { opacity: 0, scale: 0.97, duration: 0.8, ease: "power2.out" }, 0);
        if (strokes.length) tl.fromTo(strokes, UNDRAWN, { ...DRAWN, duration: 1.6, stagger: 0.08, ease: "power2.inOut" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: deps, revertOnUpdate: true },
  );
}

/**
 * Micro-animation for the brand mark (Orion's belt): the three stars light in
 * sequence once on load. Hover/focus replays a lighter shimmer in CSS.
 */
export function useBeltIgnite(ref: RefObject<HTMLElement>, enabled: boolean) {
  useGSAP(
    () => {
      if (!enabled) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const dots = ref.current?.querySelectorAll(".belt-dot");
        if (!dots?.length) return;
        gsap.fromTo(dots, { opacity: 0.15, scale: 0.35, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.24, delay: 0.3, ease: "back.out(2.2)", clearProps: "opacity,transform" });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
}
