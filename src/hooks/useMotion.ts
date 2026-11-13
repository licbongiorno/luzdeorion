import { type RefObject, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Every animation lives behind this query: reduced-motion users get the static, fully drawn page. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

const DRAWN = { strokeDashoffset: 0 };
const UNDRAWN = { strokeDashoffset: 1 };

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

        /* 1 · Entrance: the sky appears, Orion is traced star by star, the words rise. */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const sky = all("[data-hero] .starfield");
        if (sky.length) tl.from(sky, { opacity: 0, duration: 2.6, ease: "sine.out" }, 0);
        const rings = all(".orion-rings .draw");
        if (rings.length) tl.fromTo(rings, UNDRAWN, { ...DRAWN, duration: 3.2, stagger: 0.3, ease: "power2.inOut" }, 0.1);
        const stars = all(".orion-star");
        if (stars.length) tl.from(stars, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%", duration: 1.1, stagger: 0.09, ease: "back.out(1.8)" }, 0.35);
        const lines = all(".orion-lines .draw");
        if (lines.length) tl.fromTo(lines, UNDRAWN, { ...DRAWN, duration: 1.3, stagger: 0.14, ease: "power1.inOut" }, 0.9);
        const nebula = all(".orion-nebula");
        if (nebula.length) tl.from(nebula, { opacity: 0, duration: 2.4, ease: "sine.inOut" }, 1.6);
        const heroArt = all("[data-hero] .art .draw");
        if (heroArt.length) tl.fromTo(heroArt, UNDRAWN, { ...DRAWN, duration: 1.8, stagger: 0.1, ease: "power2.inOut" }, 0.4);
        const heroLines = all("[data-hero-line]");
        if (heroLines.length) tl.from(heroLines, { yPercent: 55, opacity: 0, duration: 1.5, stagger: 0.16 }, 0.2);
        const heroFade = all("[data-hero-fade]");
        if (heroFade.length) tl.from(heroFade, { y: 16, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.75);

        /* 2 · Ambient: a handful of stars breathe; Orion's glows pulse very slowly. */
        all(".sky-star.twinkle").forEach((star) => {
          gsap.to(star, { opacity: 0.12, duration: gsap.utils.random(2.2, 4.8), repeat: -1, yoyo: true, ease: "sine.inOut", delay: gsap.utils.random(0, 4) });
        });
        const glows = all(".orion-glow");
        if (glows.length) gsap.to(glows, { scale: 1.22, transformOrigin: "50% 50%", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.7, from: "random" } });

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

        /* 5 · The three steps are joined like Orion's belt as you read them. */
        const belt = all("[data-belt-line]")[0];
        if (belt) {
          gsap.fromTo(belt, wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", transformOrigin: wide ? "0% 50%" : "50% 0%", scrollTrigger: { trigger: belt.parentElement, start: "top 78%", end: "bottom 62%", scrub: 1 } });
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
