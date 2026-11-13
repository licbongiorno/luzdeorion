import { useEffect, useState } from "react";
import { wa } from "../data";
import { BeltMark } from "./Sky";

export type NavLink = { href: string; label: string };

export function Brand({ href, onClick, className = "" }: { href: string; onClick?: () => void; className?: string }) {
  return (
    <a className={`brand ${className}`} href={href} aria-label="Luz de Orión, inicio" onClick={onClick}>
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
  return (
    <header className={open ? "site-header is-open" : "site-header"}>
      <div className="header-inner">
        <Brand href={homeHref} onClick={close} />
        <button className="menu-toggle" type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-controls={navId} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav id={navId} className="site-nav" aria-label="Navegación principal">
          {links.map((link) => <a key={link.href} href={link.href} onClick={close}>{link.label}</a>)}
          <a className="nav-cta" href={wa(ctaMessage)} target="_blank" rel="noreferrer" onClick={close}>Hablemos <span className="ext" aria-hidden="true">↗</span><span className="sr-only"> (abre WhatsApp)</span></a>
        </nav>
      </div>
    </header>
  );
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

export function FloatingWhatsApp({ message }: { message: string }) {
  return (
    <a className="floating-whatsapp" href={wa(message)} target="_blank" rel="noreferrer" aria-label="Escribirle a Marina por WhatsApp">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
      <span>Hablemos</span>
    </a>
  );
}
