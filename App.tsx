import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Icon from "./components/Icon";
import Reveal from "./components/Reveal";
import Mandala from "./components/Mandala";
import GoldenSpiral from "./components/GoldenSpiral";
import MandalaLab from "./components/MandalaLab";
import FibonacciLab from "./components/FibonacciLab";
import { experiences, faqs, whatsappUrl } from "./data/site";

function App() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  return <div id="inicio">
    <Header />
    <main>
      <section className="hero section-shell">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><i/> NATURALEZA <b>·</b> GEOMETRÍA <b>·</b> CONEXIÓN</span>
          <h1>Un universo<br/><em>lleno de luz.</em></h1>
          <p className="hero-lede">Un espacio para explorar, crear y conectar con la belleza de las formas que nos rodean.</p>
          <div className="hero-actions"><a className="button button-dark" href="#universo">Explorar el universo <Icon name="arrow"/></a><a className="quiet-link" href="#laboratorio">Descubrir el laboratorio <span>↓</span></a></div>
          <div className="hero-note"><span className="note-star">✳</span><span>La curiosidad también<br/>puede ser un camino.</span></div>
        </div>
        <div className="hero-art" aria-label="Ilustración floral con geometría áurea">
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
          <div className="mandala-halo"><Mandala petals={12}/></div>
          <GoldenSpiral/>
          <div className="hero-spark spark-a">✧</div><div className="hero-spark spark-b">✳</div>
          <span className="art-caption">φ · 1.618</span>
        </div>
        <div className="hero-bottom"><span>01 / UN COMIENZO</span><span>DESLIZÁ PARA EXPLORAR ↓</span></div>
      </section>

      <section className="intro-section section-shell" id="universo">
        <Reveal className="intro-heading"><span className="eyebrow">UN UNIVERSO EN EXPANSIÓN</span><h2>Lo sutil también<br/><em>tiene estructura.</em></h2></Reveal>
        <Reveal className="intro-text"><p>En la naturaleza conviven patrones, ciclos y formas que invitan a mirar de nuevo. Luz de Orión nace como un territorio creativo para explorar esas conexiones.</p><p>Una invitación a observar, experimentar y descubrir nuevas maneras de relacionarnos con lo que nos inspira.</p><a href="#experiencias" className="text-link">Conocer el universo <span>↗</span></a></Reveal>
        <div className="intro-decoration"><img src="/illustrations/orion-constellation.svg" alt="Ilustración estilizada de una constelación" /></div>
      </section>

      <section className="experience-section" id="experiencias">
        <div className="section-shell">
          <Reveal className="section-heading"><div><span className="eyebrow">PEQUEÑOS PORTALES</span><h2>Formas de <em>explorar.</em></h2></div><p>Distintas puertas para observar, imaginar y crear a tu propio ritmo.</p></Reveal>
          <div className="experience-grid">
            {experiences.map((item, i) => <Reveal key={item.number} className={`experience-card card-${i+1}`}>
              <div className="card-top"><span>{item.number}</span><span>{item.category}</span></div>
              <div className={`card-visual visual-${item.icon}`}>
                {item.icon === "geometry" ? <img src="/illustrations/spiral.svg" alt="Espiral geométrica" /> : item.icon === "mandala" ? <Mandala petals={10}/> : <div className="botanical-visual"><Icon name="leaf"/><span>✧</span><Icon name="leaf"/></div>}
              </div>
              <h3>{item.title}</h3><p>{item.text}</p><a href="#laboratorio" aria-label={`Explorar ${item.title}`} className="round-arrow"><Icon name="arrow"/></a>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="lab-section section-shell" id="laboratorio">
        <Reveal className="section-heading lab-heading"><div><span className="eyebrow">EXPERIMENTAR TAMBIÉN ES CONOCER</span><h2>Un pequeño <em>laboratorio.</em></h2></div><p>Jugá con la forma, el ritmo y la proporción. No hay una única manera de crear.</p></Reveal>
        <Reveal><MandalaLab/></Reveal>
        <Reveal className="fib-wrap"><FibonacciLab/></Reveal>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-wash"/>
        <Reveal className="manifesto-inner">
          <span className="eyebrow">UNA MIRADA EN MOVIMIENTO</span>
          <h2>Encontrar belleza<br/>en las <em>conexiones.</em></h2>
          <p>Entre lo que crece, lo que cambia y lo que permanece.</p>
          <div className="manifesto-orbit"><img src="/illustrations/mandala.svg" alt="" /></div>
          <a href={whatsappUrl} className="button button-light" target="_blank" rel="noreferrer">Conectar con Marina <Icon name="arrow"/></a>
        </Reveal>
      </section>

      <section className="faq-section section-shell" id="preguntas">
        <Reveal className="faq-intro"><span className="eyebrow">ANTES DE EMPEZAR</span><h2>Algunas <em>preguntas.</em></h2><p>Una guía breve para recorrer este espacio.</p></Reveal>
        <div className="faq-list">{faqs.map((faq, i) => <Reveal key={faq.q} className="faq-item">
          <button className="faq-question" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{faq.q}</span><span className="faq-plus">{faqOpen === i ? "−" : "+"}</span></button>
          <div className={`faq-answer ${faqOpen === i ? "faq-answer-open" : ""}`}><p>{faq.a}</p></div>
        </Reveal>)}</div>
      </section>

      <section className="contact-section section-shell" id="contacto">
        <Reveal className="contact-card">
          <div className="contact-flower"><Mandala petals={8}/></div>
          <div><span className="eyebrow">EL PRÓXIMO PASO</span><h2>¿Lo exploramos <em>juntos?</em></h2><p>Para conocer más sobre las propuestas, escribile a Marina.</p><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Abrir WhatsApp <Icon name="arrow"/></a></div>
          <div className="contact-star">✧</div>
        </Reveal>
      </section>
    </main>
    <Footer/>
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar a Marina por WhatsApp"><Icon name="whatsapp"/></a>
  </div>;
}
export default App;