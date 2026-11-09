import { useEffect, useState } from "react";
import "./styles.css";

const phone = "5493546525509";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
  { n: "01", title: "Cuencos sonoros", text: "Terapia vibracional y baños de sonido para regalarte una pausa, escuchar y volver al centro.", tag: "Sonido & vibración", icon: "◖" },
  { n: "02", title: "Masajes integrales", text: "Masajes orientales, descontracturantes, relajantes, pindas, bambú, piedras calientes y californiano.", tag: "Cuerpo & presencia", icon: "✺" },
  { n: "03", title: "Yoga & respiración", text: "Prácticas de yoga, respiraciones conscientes y relajación para habitar el cuerpo con atención.", tag: "Movimiento consciente", icon: "〰" },
  { n: "04", title: "Arte & expresión", text: "Un espacio para explorar el lenguaje creativo, conectar con lo que sentís y darle forma a lo que te habita.", tag: "Creación & emoción", icon: "✳" },
  { n: "05", title: "Reiki & aromaterapia", text: "Prácticas de bienestar que integran presencia, aromas y trabajo energético.", tag: "Energía & calma", icon: "❋" },
  { n: "06", title: "Exploración interior", text: "Registros, regresiones, biodescodificación, prácticas de chamanismo y lecturas de orientación o tarot.", tag: "Autoconocimiento", icon: "☾" },
];

const experiences = [
  { title: "Cuencos sonoros", subtitle: "Dejá que el sonido te encuentre", text: "Una experiencia de escucha profunda. Las vibraciones y resonancias de los cuencos crean un espacio para descansar, respirar y conectar con el momento presente.", symbol: "◖" },
  { title: "Arte y expresión", subtitle: "Hay cosas que encuentran su forma creando", text: "El arte como territorio de exploración: colores, formas, imágenes y materiales para abrir preguntas, jugar y expresar aquello que a veces no encuentra palabras.", symbol: "✳" },
  { title: "Yoga consciente", subtitle: "Moverte también puede ser una forma de volver", text: "Prácticas para conectar respiración y movimiento, respetando los tiempos y posibilidades de cada cuerpo.", symbol: "〰" },
];


function SoundArtwork() {
  return <svg className="experience-svg sound-artwork" viewBox="0 0 520 520" role="img" aria-label="Ondas concéntricas que representan la resonancia de un cuenco sonoro">
    <defs><radialGradient id="soundGlow"><stop offset="0" stopColor="#e8cda9" stopOpacity=".9"/><stop offset="1" stopColor="#e8cda9" stopOpacity="0"/></radialGradient><linearGradient id="bowlMetal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a87b59"/><stop offset=".48" stopColor="#e4c6a2"/><stop offset="1" stopColor="#8b684f"/></linearGradient></defs>
    <circle cx="260" cy="245" r="205" fill="url(#soundGlow)"/>
    <g className="sound-waves" fill="none" stroke="#8c9b83" strokeWidth="1.5"><circle cx="260" cy="240" r="95"/><circle cx="260" cy="240" r="132"/><circle cx="260" cy="240" r="170"/><circle cx="260" cy="240" r="202"/></g>
    <g className="sound-wave-dashes" fill="none" stroke="#b17d5d" strokeWidth="2" strokeLinecap="round"><path d="M80 240a180 180 0 0 1 360 0"/><path d="M112 240a148 148 0 0 1 296 0"/></g>
    <ellipse cx="260" cy="330" rx="105" ry="18" fill="#293b32" opacity=".10"/>
    <path d="M170 265 Q182 350 260 352 Q338 350 350 265 Z" fill="url(#bowlMetal)" stroke="#8e6d53" strokeWidth="2"/>
    <ellipse cx="260" cy="265" rx="90" ry="19" fill="#e7d2b6" stroke="#987252" strokeWidth="3"/>
    <ellipse cx="260" cy="265" rx="78" ry="11" fill="#6d7868"/>
    <path d="M182 291 Q260 318 338 291" fill="none" stroke="#f4e4cb" strokeWidth="3" opacity=".65"/>
    <circle cx="260" cy="240" r="5" fill="#b17d5d" className="sound-center"/>
    <g fill="#b17d5d"><circle cx="260" cy="52" r="3"/><circle cx="432" cy="165" r="3"/><circle cx="91" cy="350" r="3"/></g>
  </svg>;
}
function ArtArtwork() {
  return <svg className="experience-svg art-artwork" viewBox="0 0 520 520" role="img" aria-label="Trazos y formas de colores que componen una obra abstracta">
    <defs><linearGradient id="paintA" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c77f61"/><stop offset="1" stopColor="#e5b98e"/></linearGradient><linearGradient id="paintB" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#758b77"/><stop offset="1" stopColor="#bdc2a1"/></linearGradient></defs>
    <circle cx="260" cy="260" r="202" fill="#e9dfcf" opacity=".55"/>
    <path className="paint-stroke stroke-one" d="M110 305 C105 180 215 90 315 120 C390 142 422 220 382 285" fill="none" stroke="url(#paintA)" strokeWidth="43" strokeLinecap="round"/>
    <path className="paint-stroke stroke-two" d="M135 365 C205 430 330 405 385 320" fill="none" stroke="url(#paintB)" strokeWidth="27" strokeLinecap="round"/>
    <path className="paint-stroke stroke-three" d="M170 140 Q245 215 350 180" fill="none" stroke="#b18b65" strokeWidth="8" strokeLinecap="round"/>
    <path d="M205 210 C240 170 310 180 327 230 C345 285 290 335 238 309 C200 290 185 245 205 210Z" fill="#d9a47f" opacity=".75" className="paint-blob"/>
    <path d="M130 150 Q170 125 190 160 M350 360 Q390 345 405 370" fill="none" stroke="#667966" strokeWidth="3" strokeLinecap="round"/>
    <g fill="#a96f50"><circle cx="145" cy="220" r="5"/><circle cx="360" cy="130" r="4"/><circle cx="330" cy="390" r="5"/><circle cx="105" cy="340" r="3"/></g>
  </svg>;
}
function YogaArtwork() {
  return <svg className="experience-svg yoga-artwork" viewBox="0 0 520 520" role="img" aria-label="Figura abstracta en postura de yoga rodeada por un ciclo respiratorio">
    <circle cx="260" cy="250" r="190" fill="#e9dfcf" opacity=".65"/>
    <g className="breath-rings" fill="none" stroke="#82917a" strokeWidth="2"><circle cx="260" cy="250" r="135"/><circle cx="260" cy="250" r="174" strokeDasharray="5 11"/></g>
    <g fill="none" stroke="#a97858" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
      <path d="M260 185 Q226 220 205 272 Q185 315 142 333"/>
      <path d="M260 185 Q294 220 315 272 Q335 315 378 333"/>
      <path d="M205 272 Q260 304 315 272"/>
      <path d="M205 272 Q200 335 260 365 Q320 335 315 272"/>
      <path d="M260 365 L260 405"/>
    </g>
    <circle cx="260" cy="145" r="28" fill="#c98d69" className="yoga-head"/>
    <path d="M150 405 Q260 435 370 405" fill="none" stroke="#a97858" strokeWidth="3" strokeLinecap="round"/>
    <path d="M105 250 Q75 220 105 190 M415 250 Q445 220 415 190" fill="none" stroke="#c38e6c" strokeWidth="3" strokeLinecap="round" className="breath-arrows"/>
  </svg>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) { nodes.forEach((node) => node.classList.add("visible")); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {\n    if (!menuOpen) return;\n    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };\n    window.addEventListener("keydown", onKeyDown);\n    return () => window.removeEventListener("keydown", onKeyDown);\n  }, [menuOpen]);\n\n  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="announcement"><span className="tiny-star">✳</span> Un espacio para volver a vos <span className="announcement-dot">·</span> Cuerpo · Energía · Emoción</div>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Luz de Orión, inicio" onClick={closeMenu}>
          <span className="brand-mark"><span>✳</span><i /></span>
          <span className="brand-name">luz de <b>ori<em>ó</em>n</b></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <nav id="primary-navigation" className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navegación principal">
          <a href="#filosofia" onClick={closeMenu}>El espacio</a>
          <a href="#experiencias" onClick={closeMenu}>Experiencias</a>
          <a href="#terapias" onClick={closeMenu}>Prácticas</a>
          <a href="#marina" onClick={closeMenu}>Sobre Marina</a>
          <a className="nav-cta" href={wa("Hola Marina, quisiera conocer más sobre tus propuestas.")} target="_blank" rel="noreferrer">Hablemos <span>↗</span></a>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-grain" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line"/> UN VIAJE HACIA TU INTERIOR</p>
            <h1>Volver a vos.<br/><i>Habitar</i> tu luz.</h1>
            <p className="hero-lead">Un espacio de sanación integral donde el cuerpo, la energía y la emoción encuentran nuevas formas de escucharse.</p>
            <div className="hero-actions">
              <a className="button button-dark" href={wa("Hola Marina, quiero consultar por tus sesiones.")} target="_blank" rel="noreferrer">Encontrá tu espacio <span>↗</span></a>
              <a className="text-link" href="#experiencias">Explorar experiencias <span>↓</span></a>
            </div>
            <div className="hero-note"><span className="note-symbol">✳</span><span>Un momento para vos.<br/><b>Sin apuro, sin exigencias.</b></span></div>
          </div>
          <div className="hero-art" aria-label="Ilustración abstracta de un sol naciente y formas orgánicas">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="sun-disc"><div className="sun-core"/><div className="sun-glow"/></div>
            <div className="hill hill-back"/><div className="hill hill-front"/>
            <div className="hero-plant plant-one"><i/><i/><i/><i/><b/></div>
            <div className="hero-plant plant-two"><i/><i/><i/><b/></div>
            <span className="art-star star-a">✳</span><span className="art-star star-b">✧</span><span className="art-star star-c">·</span>
            <div className="art-caption"><span>01 / 03</span><span>EL ARTE DE ESTAR PRESENTE</span></div>
          </div>
          <div className="hero-bottom"><span>CUERPO</span><i/> <span>ENERGÍA</span><i/> <span>EMOCIÓN</span><span className="scroll-cue">DESLIZÁ PARA EXPLORAR ↓</span></div>
        </section>

        <section className="intro section-pad" id="filosofia">
          <div className="intro-aside reveal"><span className="section-index">01 — LA INVITACIÓN</span><div className="hand-drawn">✳</div><p>Un regreso<br/>a lo esencial.</p></div>
          <div className="intro-main reveal">
            <p className="eyebrow">SANACIÓN INTEGRAL</p>
            <h2>Hay momentos en los que necesitamos <i>hacer silencio</i> para volver a escucharnos.</h2>
            <p className="body-copy">Luz de Orión es una invitación a hacer una pausa, conectar con tu mundo interior y explorar distintas prácticas de bienestar. Un espacio para encontrarte con el cuerpo, darle lugar a las emociones y descubrir tu propia manera de estar en equilibrio.</p>
            <a className="under-link" href="#terapias">Conocé las prácticas <span>↗</span></a>
          </div>
        </section>

        <section className="experience-section" id="experiencias">
          <div className="section-heading reveal">
            <div><p className="eyebrow">EXPERIENCIAS PARA SENTIR</p><h2>Un espacio para<br/><i>dejarte llevar.</i></h2></div>
            <p className="heading-note">Cada experiencia es diferente.<br/>Elegí la que resuene con vos.</p>
          </div>
          <div className="experience-layout reveal">
            <div className={"experience-visual experience-visual-" + active}>
              <div className="experience-art-stage" key={active}>
                {active === 0 ? <SoundArtwork /> : active === 1 ? <ArtArtwork /> : <YogaArtwork />}
              </div>
              <div className="visual-rings"/><span className="visual-label">LUZ DE ORIÓN · EXPERIENCIAS</span>
              <span className="visual-art-caption">{active === 0 ? "RESONANCIA" : active === 1 ? "EXPRESIÓN" : "RESPIRACIÓN"}</span>
            </div>
            <div className="experience-detail" id="experience-panel" role="tabpanel" aria-labelledby={"experience-tab-" + active} aria-live="polite" aria-atomic="true">
              <div className="detail-count">0{active + 1} <span>— 03</span></div>
              <p className="eyebrow">{experiences[active].title.toUpperCase()}</p>
              <h3>{experiences[active].subtitle}</h3>
              <p className="body-copy">{experiences[active].text}</p>
              <a className="under-link" href={wa("Hola Marina, quisiera consultar por " + experiences[active].title + ".")} target="_blank" rel="noreferrer">Consultar por esta experiencia <span>↗</span></a>
              <div className="experience-tabs" role="tablist" aria-label="Elegí una experiencia">
                {experiences.map((item, i) => <button key={item.title} id={"experience-tab-" + i} type="button" role="tab" aria-selected={active === i} aria-controls="experience-panel" tabIndex={active === i ? 0 : -1} className={active === i ? "experience-tab selected" : "experience-tab"} onClick={() => setActive(i)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { const next = (i + (event.key === "ArrowRight" ? 1 : -1) + experiences.length) % experiences.length; setActive(next); document.getElementById("experience-tab-" + next)?.focus(); } }}><span>0{i+1}</span>{item.title}<b>↗</b></button>)}
              </div>
            </div>
          </div>
        </section>

        <section className="quote-band">
          <span className="quote-mark">“</span>
          <p>El bienestar no es llegar a un lugar.<br/><i>Es aprender a habitar el camino.</i></p>
          <span className="quote-flower">✳</span>
        </section>

        <section className="services section-pad" id="terapias">
          <div className="section-heading reveal">
            <div><p className="eyebrow">CAMINOS DE EXPLORACIÓN</p><h2>Prácticas que<br/><i>te acompañan.</i></h2></div>
            <p className="heading-note">Distintas herramientas, una misma intención: abrir un espacio de conexión y cuidado.</p>
          </div>
          <div className="service-grid">
            {services.map((s) => <article className="service-card reveal" key={s.n}><div className="service-top"><span>{s.n} / 06</span><span className="service-icon" aria-hidden="true">{s.icon}</span></div><p className="service-tag">{s.tag}</p><h3>{s.title}</h3><p className="service-text">{s.text}</p><a href={wa("Hola Marina, quiero saber más sobre " + s.title + ".")} target="_blank" rel="noreferrer" aria-label={"Consultar por " + s.title}>↗</a></article>)}
          </div>
          <p className="service-footnote">Las propuestas se conversan de manera personal para encontrar la opción adecuada para cada momento.</p>
        </section>

        <section className="marina-section" id="marina">
          <div className="marina-art reveal"><div className="portrait-sun"/><div className="portrait-shape"><span> M </span></div><span className="portrait-caption">PRESENCIA · ESCUCHA · CREACIÓN</span><span className="portrait-flower">✳</span></div>
          <div className="marina-copy reveal"><p className="eyebrow">UN POCO SOBRE ESTE ESPACIO</p><h2>Un camino que se construye <i>con presencia.</i></h2><p className="body-copy">Soy Marina, profesora de yoga y facilitadora de distintas prácticas de bienestar integral. En Luz de Orión reúno herramientas corporales, sonoras, creativas y energéticas para ofrecerte un espacio de encuentro y exploración personal.</p><p className="body-copy">Me interesa especialmente el trabajo con el arte y los cuencos sonoros: dos lenguajes que invitan a experimentar, sentir y conectar más allá de las palabras.</p><a className="button button-dark" href={wa("Hola Marina, me gustaría conocerte y conversar sobre tus propuestas.")} target="_blank" rel="noreferrer">Conectar con Marina <span>↗</span></a></div>
        </section>

        <section className="closing">
          <div className="closing-stars">✳　·　✧　·　✳</div>
          <p className="eyebrow">TU MOMENTO PUEDE EMPEZAR HOY</p>
          <h2>¿Y si hoy te<br/><i>elegís a vos?</i></h2>
          <p className="closing-copy">No hace falta tener todas las respuestas.<br/>A veces, alcanza con dar el primer paso.</p>
          <a className="button button-light" href={wa("Hola Marina, quiero dar el primer paso y conocer tus propuestas.")} target="_blank" rel="noreferrer">Escribir por WhatsApp <span>↗</span></a>
          <span className="closing-orbit orbit-left"/><span className="closing-orbit orbit-right"/>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><span>✳</span><i/></span><span className="brand-name">luz de <b>ori<em>ó</em>n</b></span></a>
        <p>Cuerpo · Energía · Emoción</p>
        <a href={wa("Hola Marina, llegué desde la web de Luz de Orión.")} target="_blank" rel="noreferrer">Hablemos por WhatsApp ↗</a>
        <span className="copyright">© {new Date().getFullYear()} Luz de Orión · Un espacio para volver a vos.</span>
      </footer>
      <a className="floating-whatsapp" href={wa("Hola Marina, quisiera recibir información sobre tus propuestas.")} target="_blank" rel="noreferrer" aria-label="Contactar a Marina por WhatsApp"><span>✳</span> Hablemos</a>
    </>
  );
}

export default App;
