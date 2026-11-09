import { site, whatsappUrl } from "../data/site";
export default function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div className="brand footer-brand"><span className="brand-mark"><img src="/illustrations/mandala.svg" alt="" /></span><span><strong>Luz de</strong><strong>Orión</strong></span></div>
      <p>Un universo para explorar,<br/>conectar y transformar.</p>
      <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Escribir a {site.contactName} ↗</a>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Luz de Orión</span><span>Diseñado con calma y curiosidad.</span><a href="#inicio">Volver arriba ↑</a></div>
  </footer>;
}