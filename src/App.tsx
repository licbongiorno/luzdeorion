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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="announcement"><span className="tiny-star">✳</span> Un espacio para volver a vos <span className="announcement-dot">·</span> Cuerpo · Energía · Emoción</div>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Luz de Orión, inicio" onClick={closeMenu}>
          <span className="brand-mark"><span>✳</span><i /></span>
          <span className="brand-name">luz de <b>ori<em>ó</em>n</b></span>
        </a>
        <button className="menu-toggle" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navegación principal">
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
            <div className="experience-visual">
              <div className={"experience-orb orb-" + active}><span>{experiences[active].symbol}</span></div>
              <div className="visual-rings"/><span className="visual-label">LUZ DE ORIÓN · EXPERIENCIAS</span>
            </div>
            <div className="experience-detail" aria-live="polite" aria-atomic="true">
              <div className="detail-count">0{active + 1} <span>— 03</span></div>
              <p className="eyebrow">{experiences[active].title.toUpperCase()}</p>
              <h3>{experiences[active].subtitle}</h3>
              <p className="body-copy">{experiences[active].text}</p>
              <a className="under-link" href={wa("Hola Marina, quisiera consultar por " + experiences[active].title + ".")} target="_blank" rel="noreferrer">Consultar por esta experiencia <span>↗</span></a>
              <div className="experience-tabs">
                {experiences.map((item, i) => <button key={item.title} type="button" aria-pressed={active === i} className={active === i ? "experience-tab selected" : "experience-tab"} onClick={() => setActive(i)}><span>0{i+1}</span>{item.title}<b>↗</b></button>)}
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
            {services.map((s) => <article className="service-card reveal" key={s.n}><div className="service-top"><span>{s.n} / 06</span><span className="service-icon">{s.icon}</span></div><p className="service-tag">{s.tag}</p><h3>{s.title}</h3><p className="service-text">{s.text}</p><a href={wa("Hola Marina, quiero saber más sobre " + s.title + ".")} target="_blank" rel="noreferrer" aria-label={"Consultar por " + s.title}>↗</a></article>)}
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
