import { useState } from "react";
import { site, whatsappUrl } from "../data/site";
import Icon from "./Icon";
export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Universo", "#universo"], ["Experiencias", "#experiencias"], ["Geometría", "#laboratorio"], ["Preguntas", "#preguntas"]];
  return <header className="site-header">
    <a className="brand" href="#inicio" aria-label="Luz de Orión, inicio">
      <span className="brand-mark"><img src="/illustrations/mandala.svg" alt="" /></span>
      <span><strong>Luz de</strong><strong>Orión</strong></span>
    </a>
    <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}><Icon name={open ? "close" : "menu"} /></button>
    <nav className={open ? "nav nav-open" : "nav"} aria-label="Navegación principal">
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Conectar <Icon name="arrow" /></a>
    </nav>
  </header>;
}