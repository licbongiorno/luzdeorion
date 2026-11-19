import { useEffect, useRef, useState } from "react";
import { wa } from "../data";
import { BeltMark } from "./Sky";
import { gsap, ScrollTrigger, useGSAP, useBeltIgnite, MOTION_OK } from "../hooks/useMotion";

export type NavLink = { href: string; label: string };

export function Brand({ href, onClick, className = "", ignite = false }: { href: string; onClick?: () => void; className?: string; ignite?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useBeltIgnite(ref, ignite);
  return (
    <a ref={ref} className={`brand ${className}`} href={href} aria-label="Luz de Orión, inicio" onClick={onClick}>
      <BeltMark />
      <span className="brand-name">Luz de Orión</span>
    </a>
  );
}

export function SiteHeader({ homeHref, links, ctaMessage, navId }: { homeHref: string; links: NavLink[]; ctaMessage: string; navId: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const close = () => setOpen(false);
  const scrolled = useScrolled(12);
  const current = useCurrentSection(links);
  return (
    <header className={`site-header${open ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Brand href={homeHref} onClick={close} ignite />
        <button className="menu-toggle" type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-controls={navId} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav id={navId} className="site-nav" aria-label="Navegación principal">
          {links.map((link) => <a key={link.href} href={link.href} onClick={close} className={current === link.href ? "is-current" : undefined} aria-current={current === link.href ? "location" : undefined}>{link.label}</a>)}
          <a className="nav-cta" href={wa(ctaMessage)} target="_blank" rel="noreferrer" onClick={close}>Hablemos <span className="ext" aria-hidden="true">↗</span><span className="sr-only"> (abre WhatsApp)</span></a>
        </nav>
      </div>
    </header>
  );
}

/** True once the page has scrolled past `offset` px (header gets a lighter, deeper glass). */
function useScrolled(offset: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; setScrolled(window.scrollY > offset); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [offset]);
  return scrolled;
}

/** The in-page section (#hash links only) that currently sits in the middle band of the viewport. */
function useCurrentSection(links: NavLink[]) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const targets = links
      .filter((link) => link.href.startsWith("#"))
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
      const first = targets.find((el) => visible.has(el));
      setCurrent(first ? `#${first.id}` : null);
    }, { rootMargin: "-45% 0px -50% 0px" });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);
  return current;
}

export function SiteFooter({ homeHref, links }: { homeHref: string; links: NavLink[] }) {
  return (
    <footer className="site-footer is-night">
      <div className="footer-inner">
        <div className="footer-brand">
          <Brand href={homeHref} />
          <p>Un espacio para volver a vos: cuerpo, energía y emoción.</p>
        </div>
        <nav className="footer-nav" aria-label="Secciones">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="footer-contact">
          <a className="footer-wa" href={wa("Hola Marina, llegué desde la web de Luz de Orión.")} target="_blank" rel="noreferrer">Hablemos por WhatsApp <span aria-hidden="true">↗</span></a>
          <p className="footer-note">Las propuestas de Luz de Orión son prácticas de bienestar y exploración. No reemplazan diagnósticos, tratamientos ni el acompañamiento de profesionales de salud.</p>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Luz de Orión</p>
      </div>
    </footer>
  );
}

/**
 * Floating WhatsApp: rises in once the visitor has scrolled past the first
 * screen, then gives a soft starlight ring now and then (a few times only).
 * With reduced motion it is simply always there.
 */
export function FloatingWhatsApp({ message }: { message: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = ref.current;
      if (!el) return;
      const ring = el.querySelector(".wa-ring");
      gsap.set(el, { autoAlpha: 0, y: 18, scale: 0.94 });
      const show = gsap.to(el, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.6)", paused: true });
      const pulse = gsap.timeline({ paused: true, repeat: 4, repeatDelay: 14, delay: 3.5 });
      if (ring) pulse.fromTo(ring, { scale: 1, opacity: 0.55 }, { scale: 1.32, opacity: 0, duration: 1.8, ease: "sine.out" });
      ScrollTrigger.create({
        start: () => Math.min(window.innerHeight * 0.55, 520),
        end: "max",
        onEnter: () => { show.play(); pulse.play(); },
        onLeaveBack: () => { show.reverse(); pulse.pause(); },
      });
      const calm = () => pulse.progress(0).pause();
      el.addEventListener("pointerenter", calm);
      el.addEventListener("focus", calm);
      return () => { el.removeEventListener("pointerenter", calm); el.removeEventListener("focus", calm); };
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <a ref={ref} className="floating-whatsapp" href={wa(message)} target="_blank" rel="noreferrer" aria-label="Escribirle a Marina por WhatsApp">
      <span className="wa-ring" aria-hidden="true" />
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
      <span>Hablemos</span>
    </a>
  );
}
