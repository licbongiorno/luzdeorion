import { useEffect, useId, useRef, useState } from "react";
import "./styles.css";
import { phone, wa, services, experiences, practicePages, practiceGuides, pageForSlug, pageUrl, type PracticePageData, type PracticeGuide } from "./data";



function SoundArtwork() {
  const gradientId = useId().replace(/:/g, "");
  return <svg className="experience-svg sound-artwork" viewBox="0 0 520 520" role="img" aria-label="Ondas concéntricas que representan la resonancia de un cuenco sonoro">
    <defs><radialGradient id={`soundGlow-${gradientId}`}><stop offset="0" stopColor="#e8cda9" stopOpacity=".9"/><stop offset="1" stopColor="#e8cda9" stopOpacity="0"/></radialGradient><linearGradient id={`bowlMetal-${gradientId}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a87b59"/><stop offset=".48" stopColor="#e4c6a2"/><stop offset="1" stopColor="#8b684f"/></linearGradient></defs>
    <circle cx="260" cy="245" r="205" fill={`url(#soundGlow-${gradientId})`}/>
    <g className="sound-waves" fill="none" stroke="#8c9b83" strokeWidth="1.5"><circle cx="260" cy="240" r="95"/><circle cx="260" cy="240" r="132"/><circle cx="260" cy="240" r="170"/><circle cx="260" cy="240" r="202"/></g>
    <g className="sound-wave-dashes" fill="none" stroke="#b17d5d" strokeWidth="2" strokeLinecap="round"><path d="M80 240a180 180 0 0 1 360 0"/><path d="M112 240a148 148 0 0 1 296 0"/></g>
    <ellipse cx="260" cy="330" rx="105" ry="18" fill="#293b32" opacity=".10"/>
    <path d="M170 265 Q182 350 260 352 Q338 350 350 265 Z" fill={`url(#bowlMetal-${gradientId})`} stroke="#8e6d53" strokeWidth="2"/>
    <ellipse cx="260" cy="265" rx="90" ry="19" fill="#e7d2b6" stroke="#987252" strokeWidth="3"/>
    <ellipse cx="260" cy="265" rx="78" ry="11" fill="#6d7868"/>
    <path d="M182 291 Q260 318 338 291" fill="none" stroke="#f4e4cb" strokeWidth="3" opacity=".65"/>
    <circle cx="260" cy="240" r="5" fill="#b17d5d" className="sound-center"/>
    <g fill="#b17d5d"><circle cx="260" cy="52" r="3"/><circle cx="432" cy="165" r="3"/><circle cx="91" cy="350" r="3"/></g>
  </svg>;
}
function ArtArtwork() {
  const gradientId = useId().replace(/:/g, "");
  return <svg className="experience-svg art-artwork" viewBox="0 0 520 520" role="img" aria-label="Trazos y formas de colores que componen una obra abstracta">
    <defs><linearGradient id={`paintA-${gradientId}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c77f61"/><stop offset="1" stopColor="#e5b98e"/></linearGradient><linearGradient id={`paintB-${gradientId}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#758b77"/><stop offset="1" stopColor="#bdc2a1"/></linearGradient></defs>
    <circle cx="260" cy="260" r="202" fill="#e9dfcf" opacity=".55"/>
    <path className="paint-stroke stroke-one" d="M110 305 C105 180 215 90 315 120 C390 142 422 220 382 285" fill="none" stroke={`url(#paintA-${gradientId})`} strokeWidth="43" strokeLinecap="round"/>
    <path className="paint-stroke stroke-two" d="M135 365 C205 430 330 405 385 320" fill="none" stroke={`url(#paintB-${gradientId})`} strokeWidth="27" strokeLinecap="round"/>
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

function MassageArtwork() {
  return <svg className="experience-svg massage-artwork" viewBox="0 0 520 520" aria-hidden="true">
    <circle cx="260" cy="260" r="205" fill="#e9dfcf" opacity=".55"/>
    <g className="massage-rings" fill="none" stroke="#7b8d79" strokeWidth="2"><ellipse cx="260" cy="260" rx="78" ry="152"/><ellipse cx="260" cy="260" rx="125" ry="183"/><ellipse cx="260" cy="260" rx="173" ry="207"/></g>
    <path d="M170 300c38-82 142-82 180 0M190 330c28-50 112-50 140 0" fill="none" stroke="#b9785c" strokeWidth="9" strokeLinecap="round"/>
    <circle cx="260" cy="222" r="20" fill="#d2a581"/>
  </svg>;
}

function EnergyArtwork() {
  return <svg className="experience-svg energy-artwork" viewBox="0 0 520 520" aria-hidden="true">
    <defs><radialGradient id="energyGlow"><stop stopColor="#f4ddb0"/><stop offset="1" stopColor="#f4ddb0" stopOpacity="0"/></radialGradient></defs>
    <circle cx="260" cy="260" r="210" fill="url(#energyGlow)"/>
    <g className="energy-rings" fill="none" stroke="#82917a" strokeWidth="1.5"><circle cx="260" cy="260" r="70"/><circle cx="260" cy="260" r="112"/><circle cx="260" cy="260" r="158"/><circle cx="260" cy="260" r="198"/></g>
    <path d="M260 205c-42 0-68 27-68 61 0 39 33 72 68 112 35-40 68-73 68-112 0-34-26-61-68-61Z" fill="#bd8b91" opacity=".52"/>
    <circle cx="260" cy="260" r="8" fill="#b9785c"/>
  </svg>;
}

function BotanicalArtwork() {
  return <svg className="experience-svg botanical-artwork" viewBox="0 0 520 520" aria-hidden="true">
    <circle cx="260" cy="260" r="205" fill="#dfe4d5" opacity=".7"/>
    <path d="M260 410V180m0 150c-92-14-126-74-105-141 72 15 111 59 105 141Zm0-56c86-18 117-77 91-140-72 19-107 65-91 140Zm0-80c-55-31-65-77-41-119 47 26 63 65 41 119Z" fill="#71846f" opacity=".76" stroke="#637963" strokeWidth="2"/>
    <circle cx="260" cy="260" r="8" fill="#bf9161"/>
  </svg>;
}

function ExplorationArtwork() {
  return <svg className="experience-svg exploration-artwork" viewBox="0 0 520 520" aria-hidden="true">
    <circle cx="260" cy="260" r="202" fill="#e9dfcf" opacity=".6"/>
    <g className="exploration-orbits" fill="none" stroke="#87927d" strokeWidth="1.5"><ellipse cx="260" cy="260" rx="165" ry="75" transform="rotate(-35 260 260)"/><ellipse cx="260" cy="260" rx="165" ry="75" transform="rotate(35 260 260)"/><circle cx="260" cy="260" r="98"/></g>
    <path d="m260 175 18 55 58 2-46 35 16 56-46-33-46 33 16-56-46-35 58-2Z" fill="#b9785c" opacity=".72"/>
    <g fill="#bd925c"><circle cx="111" cy="180" r="5"/><circle cx="398" cy="323" r="4"/><circle cx="354" cy="122" r="3"/></g>
  </svg>;
}

function ArtExperience() {
  const [version, setVersion] = useState(0);
  return <div className="art-experience" key={version}>
    <ArtArtwork />
    <button type="button" className="art-replay" onClick={() => setVersion((value) => value + 1)}>Volver a trazar <span aria-hidden="true">↻</span></button>
  </div>;
}

function PracticeArtwork({ page }: { page: PracticePageData }) {
  let artwork = <ExplorationArtwork />;
  if (page.group === "sonido") artwork = <SoundArtwork />;
  else if (page.group === "cuerpo") artwork = <MassageArtwork />;
  else if (page.group === "movimiento") artwork = <YogaArtwork />;
  else if (page.group === "creatividad") artwork = <ArtArtwork />;
  else if (page.slug === "aromaterapia") artwork = <BotanicalArtwork />;
  else if (page.group === "energia") artwork = <EnergyArtwork />;
  return <div className={`practice-artwork practice-artwork-${page.group}`}>{artwork}</div>;
}

function ServiceArtwork({ kind }: { kind: string }) {
  return <ServiceIcon kind={kind} className="service-art-icon" />;
}


function ServiceIcon({ kind, className }: { kind: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, JSX.Element> = {
    "01": <><path d="M5 15.5h14l-1.5 3h-11z"/><path d="M7 15.5c.7-2.5 2.5-4 5-4s4.3 1.5 5 4"/><path d="M12 3v3M5.6 5.6l2.1 2.1M18.4 5.6l-2.1 2.1"/><path d="M3 11c1.2-1.2 2.3-1.2 3.5 0M17.5 11c1.2-1.2 2.3-1.2 3.5 0"/></>,
    "02": <><path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"/><path d="m2 15 6 6"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"/></>,
    "03": <><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></>,
    "04": <><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></>,
    "05": <><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/></>,
    "06": <><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/></>
  };
  return <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...common}>{paths[kind] || paths["01"]}</svg>;
}


function useBowlPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);

  useEffect(() => {
    const audio = new Audio("/audio/singing-bowl.ogg");
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;
    const updatePlaying = () => setIsPlaying(!audio.paused && !audio.ended);
    audio.addEventListener("play", updatePlaying);
    audio.addEventListener("pause", updatePlaying);
    audio.addEventListener("ended", updatePlaying);
    return () => {
      audio.pause();
      audio.removeEventListener("play", updatePlaying);
      audio.removeEventListener("pause", updatePlaying);
      audio.removeEventListener("ended", updatePlaying);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.currentTime = 0;
    void audio.play().catch(() => setIsPlaying(false));
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return { isPlaying, volume, setVolume, play, stop };
}
function PracticePage({ page }: { page: PracticePageData }) {
  useEffect(() => {
    document.title = `${page.title} | Luz de Orión`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", `${page.title}: ${page.intro} Luz de Orión · Cuerpo, energía y emoción.`);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://luzdeorion.vercel.app${pageUrl(page.slug)}`;
    const socialTitle = document.querySelector('meta[property="og:title"]');
    socialTitle?.setAttribute("content", `${page.title} | Luz de Orión`);
    const socialDescription = document.querySelector('meta[property="og:description"]');
    socialDescription?.setAttribute("content", `${page.title}: ${page.intro}`);
    const socialUrl = document.querySelector('meta[property="og:url"]');
    socialUrl?.setAttribute("content", canonical.href);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", `${page.title} | Luz de Orión`);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute("content", `${page.title}: ${page.intro}`);
  }, [page]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const related = practicePages.filter((item) => item.group === page.group && item.slug !== page.slug);
  const guide = practiceGuides[page.slug];
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="announcement"><span className="tiny-star">✳</span> Un espacio para volver a vos <span className="announcement-dot">·</span> Cuerpo · Energía · Emoción</div>
    <header className="header">
      <a className="brand" href="/" aria-label="Luz de Orión, inicio"><span className="brand-mark"><span>✳</span><i /></span><span className="brand-name">luz de <b>ori<em>ó</em>n</b></span></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-controls="practice-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button>
      <nav id="practice-navigation" className={menuOpen ? "nav practice-nav nav-open" : "nav practice-nav"} aria-label="Navegación principal"><a href="/#filosofia" onClick={() => setMenuOpen(false)}>El espacio</a><a href="/#terapias" onClick={() => setMenuOpen(false)}>Prácticas</a><a href="/#marina" onClick={() => setMenuOpen(false)}>Sobre Marina</a><a className="nav-cta" href={wa(`Hola Marina, quisiera conocer más sobre ${page.title}.`)} target="_blank" rel="noreferrer">Hablemos <span>↗</span></a></nav>
    </header>
    <main id="contenido" className="practice-page">
      <div className="practice-breadcrumb"><a href="/">Inicio</a><span> / </span><a href="/#terapias">Prácticas</a><span> / </span><span>{page.title}</span></div>
      <section className="practice-hero">
        <div className="practice-hero-copy"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title.split(" ").slice(0,-1).join(" ")} <i>{page.title.split(" ").slice(-1).join("")}</i></h1><p className="practice-lead">{page.lead}</p><p className="body-copy">{page.intro}</p><p className="practice-modality-note">Los encuentros pueden ser presenciales u online. Consultá con Marina qué formato está disponible, cuánto dura y cuál es su valor.</p><a className="button button-dark" href={wa(`Hola Marina, me interesa ${page.title}. ¿Me contás si está disponible en modalidad presencial u online, cuánto dura y cuál es su valor?`)} target="_blank" rel="noreferrer">Consultar disponibilidad y valor <span>↗</span></a></div>
        <div className={`practice-hero-art practice-hero-art-${page.group}`} aria-hidden="true"><div className="practice-art-orbit"/><div className="practice-art-orbit second"/><PracticeArtwork page={page}/><small>{page.eyebrow}</small></div>
      </section>
      <section className="practice-content">
        <p className="eyebrow">CONOCÉ LA PROPUESTA</p><h2>¿Qué es <i>esta práctica?</i></h2>
        <div className="practice-guide-grid">
          <article className="practice-guide-block"><span>01 · LA PROPUESTA</span><p>{guide.what}</p></article>
          <article className="practice-guide-block"><span>02 · ¿PARA QUÉ PUEDE SERVIR?</span><p>{guide.purpose}</p></article>
          <article className="practice-guide-block"><span>03 · ¿CÓMO ES UN ENCUENTRO?</span><p>{guide.session}</p></article>
          <article className="practice-guide-block"><span>04 · ¿A QUIÉN PUEDE INTERESARLE?</span><p>{guide.audience}</p></article>
        </div>
        <div className="practice-detail-intro"><p className="eyebrow">TAMBIÉN ES IMPORTANTE SABER</p><h3>Algunas claves de <i>la experiencia.</i></h3></div>
        <div className="practice-detail-grid">{page.details.map((detail,index)=><article className="practice-detail-card" key={detail}><span>0{index+1}</span><p>{detail}</p></article>)}</div>
        <p className="practice-note">{page.note}</p>
      </section>
      <section className="practice-faq"><p className="eyebrow">PREGUNTAS FRECUENTES</p><h2>Antes de <i>dar el primer paso.</i></h2>
        <div className="practice-faq-list">{guide.faqs.map((faq,index)=><details className="practice-faq-item" key={faq.question}><summary><span>0{index+1}</span>{faq.question}<b aria-hidden="true">+</b></summary><p>{faq.answer}</p></details>)}</div>
      </section>
      {related.length>0 && <section className="related-practices"><p className="eyebrow">TAMBIÉN PODÉS EXPLORAR</p><div>{related.map((item)=><a key={item.slug} href={pageUrl(item.slug)}>{item.title}<span>↗</span></a>)}</div></section>}
      <section className="practice-cta"><p className="eyebrow">LUZ DE ORIÓN · MARINA</p><h2>¿Querés conocer más<br/><i>sobre esta propuesta?</i></h2><p>Preguntá por modalidad, duración, valor y próximos horarios. Consultar no te compromete a reservar.</p><a className="button button-light" href={wa(`Hola Marina, me interesa ${page.title}. ¿Me contás modalidad, duración, valor y próximos horarios?`)} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="/"><span className="brand-mark"><span>✳</span><i/></span><span className="brand-name">luz de <b>ori<em>ó</em>n</b></span></a><p>Cuerpo · Energía · Emoción</p><a href={wa("Hola Marina, llegué desde la web de Luz de Orión.")} target="_blank" rel="noreferrer">Hablemos por WhatsApp ↗</a><span className="copyright">© {new Date().getFullYear()} Luz de Orión · Un espacio para volver a vos.</span></footer>
    <a className="floating-whatsapp" href={wa(`Hola Marina, quisiera recibir información sobre ${page.title}.`)} target="_blank" rel="noreferrer" aria-label="Contactar a Marina por WhatsApp"><span>✳</span> Hablemos</a>
  </>;
}

const aromaNotes = [
  { name: "Lavanda", note: "Floral y serena", tone: "lavender" },
  { name: "Azahar", note: "Cítrica y luminosa", tone: "orange-blossom" },
  { name: "Bosque", note: "Verde y amaderada", tone: "forest" },
];

function SensoryPause({ bowl }: { bowl: ReturnType<typeof useBowlPlayer> }) {
  const [aroma, setAroma] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale">("inhale");

  useEffect(() => {
    if (!isBreathing) return;
    const interval = window.setInterval(() => {
      setBreathPhase((phase) => phase === "inhale" ? "exhale" : "inhale");
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isBreathing]);

  return <section className="sensory-pause" id="pausa" aria-labelledby="sensory-title">
    <div className="sensory-copy">
      <p className="eyebrow">UN RESPIRO EN EL CAMINO</p>
      <h2 id="sensory-title">Este momento<br/><i>también es tuyo.</i></h2>
      <p className="body-copy">Si te hace bien, quedate un instante. Podés seguir el ritmo de la animación, escuchar una nota suave o elegir un paisaje aromático para imaginar.</p>
      <p className="sensory-note">Sin hacerlo perfecto. Si no te resulta cómodo, volvé a tu respiración natural o simplemente observá.</p>
    </div>
    <div className={`sensory-card ${isBreathing ? "is-breathing" : ""} ${bowl.isPlaying ? "is-sounding" : ""}`} data-aroma={aromaNotes[aroma].tone}>
      <div className="sensory-orb" aria-hidden="true"><span/></div>
      <p className="breath-cue">{isBreathing ? (breathPhase === "inhale" ? "Inhalá con suavidad" : "Exhalá sin apuro") : "A tu propio ritmo"}</p>
      <button className="sensory-breath-button" type="button" aria-pressed={isBreathing} onClick={() => { if (isBreathing) setBreathPhase("inhale"); setIsBreathing(!isBreathing); }}>{isBreathing ? "Terminar la pausa" : "Acompañar mi respiración"}</button>
      <div className="aroma-picker">
        <span className="aroma-label">UN PAISAJE AROMÁTICO</span>
        <div className="aroma-options" role="group" aria-label="Elegí una nota aromática para imaginar">
          {aromaNotes.map((item, index) => <button key={item.name} type="button" aria-pressed={aroma === index} onClick={() => setAroma(index)}>{item.name}</button>)}
        </div>
        <p className="aroma-description" aria-live="polite"><strong>{aromaNotes[aroma].name}</strong> · {aromaNotes[aroma].note}</p>
        <p className="aroma-disclaimer">Es una invitación a imaginar, no se aplica ni difunde ninguna fragancia. Podés disfrutar la pausa sin aromas.</p>
      </div>
      <div className="bowl-controls">
        <button className="sensory-sound-button" type="button" onClick={bowl.isPlaying ? bowl.stop : bowl.play}><span aria-hidden="true">◖</span> {bowl.isPlaying ? "Detener el cuenco" : "Escuchar el cuenco"}</button>
        <label className="bowl-volume" htmlFor="bowl-volume">Volumen <input id="bowl-volume" type="range" min="0" max="1" step="0.01" value={bowl.volume} onChange={(event) => bowl.setVolume(Number(event.target.value))} /></label>
        <a className="audio-credit" href="https://commons.wikimedia.org/wiki/File:SingingBowl1.ogg" target="_blank" rel="noreferrer">Grabación: BambooBeast · dominio público</a>
      </div>
    </div>
  </section>;
}

function GeneralFaq() {
  const questions = [
    { question: "¿Hay encuentros presenciales y online?", answer: "Sí, hay opciones presenciales y online. Consultá con Marina qué formato está disponible para la práctica que te interesa." },
    { question: "¿Cómo sé qué práctica elegir?", answer: "Podés contarle a Marina qué te interesa, qué buscás y si hay algo que preferís evitar. La consulta sirve para conocer la propuesta antes de decidir." },
    { question: "¿Puedo pedir ajustes o detener una experiencia?", answer: "Sí. Tus preferencias y límites se conversan antes, y podés pedir un cambio o detener la experiencia en cualquier momento." },
    { question: "¿Las prácticas reemplazan la atención médica o psicológica?", answer: "No. Son propuestas de bienestar y exploración; no reemplazan diagnósticos, tratamientos ni el acompañamiento de profesionales de salud." },
  ];
  return <section className="general-faq section-pad" id="preguntas" aria-labelledby="general-faq-title">
    <div className="general-faq-intro"><p className="eyebrow">ANTES DE ESCRIBIR</p><h2 id="general-faq-title">Unas respuestas<br/><i>para empezar.</i></h2><p className="body-copy">Si todavía tenés dudas, podés conversar con Marina antes de elegir.</p><a className="button button-dark" href={wa("Hola Marina, tengo algunas preguntas antes de elegir una práctica.")} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a></div>
    <div className="general-faq-list">{questions.map((item, index) => <details className="general-faq-item" key={item.question}><summary><span>0{index + 1}</span>{item.question}<b aria-hidden="true">+</b></summary><p>{item.answer}</p></details>)}</div>
  </section>;
}

const waysToBegin = [
  { id: "pausa", label: "Necesito una pausa", description: "Quizás te interese empezar por una experiencia de escucha o descanso corporal.", links: ["cuencos-sonoros", "masaje-relajante"] },
  { id: "movimiento", label: "Quiero moverme", description: "Podés explorar yoga y respiración con movimientos que se conversan según tus posibilidades.", links: ["yoga"] },
  { id: "crear", label: "Quiero expresarme", description: "El arte y la exploración creativa pueden ser una forma de jugar con imágenes, colores y materiales.", links: ["arteterapia"] },
  { id: "curiosidad", label: "Solo tengo curiosidad", description: "No hace falta elegir ahora. Podés contarle a Marina qué te gustaría explorar y preguntarle qué opciones ofrece.", links: [] },
];

function PracticeFinder() {
  const [choice, setChoice] = useState("");
  const selected = waysToBegin.find((item) => item.id === choice);
  const suggestions = selected?.links.map((slug) => practicePages.find((page) => page.slug === slug)).filter((page): page is PracticePageData => Boolean(page)) ?? [];
  return <section className="practice-finder reveal" aria-labelledby="practice-finder-title">
    <div className="practice-finder-copy"><p className="eyebrow">SI NO SABÉS POR DÓNDE EMPEZAR</p><h2 id="practice-finder-title">Podemos empezar<br/><i>por lo que necesitás hoy.</i></h2><p>Elegí lo que más se acerca a tu momento. Es solo una orientación: no es un diagnóstico ni tenés que tenerlo resuelto para escribir.</p></div>
    <div className="practice-finder-options" role="group" aria-label="¿Qué te gustaría explorar?">
      {waysToBegin.map((item) => <button key={item.id} type="button" aria-pressed={choice === item.id} onClick={() => setChoice(item.id)}>{item.label}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div className="practice-finder-result" key={selected?.id ?? "empty"} aria-live="polite" aria-atomic="true">
      {selected ? <><p>{selected.description}</p>{suggestions.length > 0 && <div className="finder-links">{suggestions.map((page) => <a key={page.slug} href={pageUrl(page.slug)}>{page.title}<span> ↗</span></a>)}</div>}<a className="finder-contact" href={wa(`Hola Marina, hoy me gustaría explorar: ${selected.label.toLowerCase()}. ¿Me contás qué opciones, modalidad, duración y valor están disponibles?`)} target="_blank" rel="noreferrer">Conversarlo con Marina <span>↗</span></a></> : <p className="finder-prompt">Podés elegir una opción y ver algunas ideas, sin compromiso.</p>}
    </div>
  </section>;
}

function EvidenceNotes() {
  return <section className="evidence-notes reveal" aria-labelledby="evidence-title">
    <p className="eyebrow">INFORMACIÓN CON LOS PIES EN LA TIERRA</p><h2 id="evidence-title">Cuidar también es<br/><i>hablar con honestidad.</i></h2>
    <p className="evidence-intro">Algunas prácticas se estudiaron como complemento de otros cuidados. Eso no garantiza un resultado individual ni convierte estas propuestas en tratamientos de salud.</p>
    <div className="evidence-grid">
      <article><span>01 · YOGA</span><p>Se estudió como complemento para distintos cuadros. Los resultados dependen del programa y la población; para trastornos de ansiedad, la evidencia aún no alcanza para conclusiones firmes.</p><a href="https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety" target="_blank" rel="noreferrer">Qué dice NCCIH sobre yoga ↗</a></article>
      <article><span>02 · MASAJE</span><p>La investigación sugiere alivio de corto plazo para ciertos dolores; en muchas situaciones la evidencia sigue siendo limitada.</p><a href="https://www.nccih.nih.gov/health/providers/digest/massage-therapy-for-health" target="_blank" rel="noreferrer">Qué dice NCCIH sobre masaje ↗</a></article>
      <article><span>03 · CUENCOS Y REIKI</span><p>Una revisión encontró pocos estudios sobre cuencos, con riesgo de sesgo y sin evidencia suficiente para recomendar su uso terapéutico. Reiki no ha demostrado eficacia para tratar problemas de salud.</p><a href="https://pubmed.ncbi.nlm.nih.gov/32507429/" target="_blank" rel="noreferrer">Revisión sobre cuencos ↗</a><a href="https://www.nccih.nih.gov/health/reiki" target="_blank" rel="noreferrer">Qué dice NCCIH sobre Reiki ↗</a></article>
    </div>
    <p className="evidence-footnote">Las demás propuestas de Luz de Orión se presentan como experiencias de bienestar, expresión o reflexión. La evidencia sobre arteterapia clínica no debe confundirse con una actividad creativa no clínica.</p>
  </section>;
}

function FirstContact() {
  return <section className="first-contact reveal" aria-labelledby="first-contact-title">
    <p className="eyebrow">UN PRIMER PASO, SIN PRESIÓN</p><h2 id="first-contact-title">Primero conversamos.<br/><i>Después elegís.</i></h2>
    <div className="first-contact-steps"><article><span>01</span><h3>Contale qué te interesa</h3><p>Podés escribir aunque todavía no sepas qué práctica elegir.</p></article><article><span>02</span><h3>Preguntá lo que necesitás</h3><p>Modalidad, duración, valor, disponibilidad y cualquier cuidado importante.</p></article><article><span>03</span><h3>Decidís con calma</h3><p>Coordinás si la propuesta te cierra. Consultar no te compromete a reservar.</p></article></div>
    <a className="button button-dark" href={wa("Hola Marina, estoy conociendo Luz de Orión. ¿Me contás qué propuestas, modalidades, duración, valores y horarios están disponibles?")} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a>
  </section>;
}


function PracticeNotFoundPage() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="announcement"><span className="tiny-star">✳</span> Un espacio para volver a vos <span className="announcement-dot">·</span> Cuerpo · Energía · Emoción</div>
    <header className="header">
      <a className="brand" href="/" aria-label="Luz de Orión, inicio"><span className="brand-mark"><span>✳</span><i/></span><span className="brand-name">luz de <b>ori<em>ó</em>n</b></span></a>
      <a className="nav-cta" href="/#terapias">Ver las prácticas <span>↗</span></a>
    </header>
    <main id="contenido" className="not-found">
      <p className="eyebrow">ESTE CAMINO NO APARECE</p>
      <h1>No encontramos<br/><i>esta página.</i></h1>
      <p className="body-copy">Puede que el enlace haya cambiado. Podés volver al inicio y explorar las prácticas disponibles.</p>
      <a className="button button-dark" href="/">Volver a Luz de Orión <span>↗</span></a>
    </main>
  </>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const bowl = useBowlPlayer();
  const currentSlug = window.location.pathname.match(/^\/practicas\/([^/]+)\/?$/)?.[1];
  const currentPage = currentSlug ? pageForSlug(currentSlug) : undefined;

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  if (currentPage) return <PracticePage page={currentPage} />;
  if (currentSlug) return <PracticeNotFoundPage />;

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
          <a href="#pausa" onClick={closeMenu}>Pausa</a>
          <a href="#terapias" onClick={closeMenu}>Prácticas</a>
          <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
          <a href="#marina" onClick={closeMenu}>Sobre Marina</a>
          <a className="nav-cta" href={wa("Hola Marina, quisiera conocer más sobre tus propuestas.")} target="_blank" rel="noreferrer">Hablemos <span>↗</span></a>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line"/> UN MOMENTO PARA VOS</p>
            <h1>Volver a vos.<br/><i>Habitar</i> tu luz.</h1>
            <p className="hero-lead">Hola, soy Marina. Qué lindo que estés acá. Este es un espacio cercano para hacer una pausa, escuchar cómo estás y explorar, a tu ritmo, qué puede acompañarte hoy.</p>
            <div className="hero-actions">
              <a className="button button-dark" href={wa("Hola Marina, quiero consultar por tus sesiones.")} target="_blank" rel="noreferrer">Encontrá tu espacio <span>↗</span></a>
              <a className="text-link" href="#experiencias">Explorar experiencias <span>↓</span></a>
            </div>
            <div className="hero-note"><span className="note-symbol">✳</span><span>Podés llegar con preguntas, curiosidad o cansancio.<br/><b>No hace falta saber por dónde empezar.</b></span></div>
          </div>
          <div className="hero-art" role="img" aria-label="Ilustración de un sol naciente entre colinas y plantas">
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
            <p className="eyebrow">UN ESPACIO DE BIENESTAR</p>
            <h2>Hay momentos en los que necesitamos <i>hacer silencio</i> para volver a escucharnos.</h2>
            <p className="body-copy">Hola, soy Marina. Creé Luz de Orión como un espacio cercano y luminoso donde podamos encontrarnos con tiempo. A través del sonido, el movimiento, la creatividad y otras prácticas de bienestar, te acompaño a hacer una pausa y prestar atención a lo que necesitás hoy.</p>
            <p className="body-copy">No hace falta venir con experiencia, respuestas ni una idea clara. Primero conversamos; tus preferencias, comodidad y límites son parte de la propuesta desde el comienzo.</p>
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
              {active === 0 ? <button className={`sound-bowl-button ${bowl.isPlaying ? "is-playing" : ""}`} type="button" onClick={bowl.isPlaying ? bowl.stop : bowl.play} aria-label={bowl.isPlaying ? "Detener el sonido del cuenco" : "Escuchar una grabación de cuenco"}><SoundArtwork /><span>{bowl.isPlaying ? "Detener el sonido" : "Escuchar el cuenco"}</span></button> : active === 1 ? <ArtExperience /> : <YogaArtwork />}
              </div>
              <div className="visual-rings"/><span className="visual-label">LUZ DE ORIÓN · EXPERIENCIAS</span>
              <span className="visual-art-caption">{active === 0 ? "RESONANCIA" : active === 1 ? "EXPRESIÓN" : "RESPIRACIÓN"}</span>
            </div>
            <div className="experience-detail" id="experience-panel" role="tabpanel" aria-labelledby={"experience-tab-" + active} aria-live="polite" aria-atomic="true">
              <div className="detail-count">0{active + 1} <span>— 03</span></div>
              <p className="eyebrow">{experiences[active].title.toUpperCase()}</p>
              <h3>{experiences[active].subtitle}</h3>
              <p className="body-copy">{experiences[active].text}</p>
              <a className="under-link" href={pageUrl(active === 0 ? "cuencos-sonoros" : active === 1 ? "arteterapia" : "yoga")}>Conocer esta experiencia <span>↗</span></a>
              <div className="experience-tabs" role="tablist" aria-label="Elegí una experiencia">
                {experiences.map((item, i) => <button key={item.title} id={"experience-tab-" + i} type="button" role="tab" aria-selected={active === i} aria-controls="experience-panel" tabIndex={active === i ? 0 : -1} className={active === i ? "experience-tab selected" : "experience-tab"} onClick={() => setActive(i)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { const next = (i + (event.key === "ArrowRight" ? 1 : -1) + experiences.length) % experiences.length; setActive(next); document.getElementById("experience-tab-" + next)?.focus(); } }}><span>0{i+1}</span>{item.title}<b>↗</b></button>)}
              </div>
            </div>
          </div>
        </section>

        <SensoryPause bowl={bowl} />

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
            {services.map((s) => <article className="service-card reveal" key={s.n}>
              <div className="service-top"><span>{s.n} / 06</span><span className="service-type-mark" aria-hidden="true">✳</span></div>
              <div className={`service-visual service-visual-${s.n}`} aria-hidden="true"><ServiceArtwork kind={s.n}/></div>
              <p className="service-tag">{s.tag}</p><h3>{s.title}</h3><p className="service-text">{s.text}</p>
              <div className="service-links"><a href={pageUrl(s.slug)} aria-label={"Conocer " + s.title}>Ver propuesta <span aria-hidden="true">↗</span></a>{s.n === "05" && <a href={pageUrl("aromaterapia")} aria-label="Conocer aromaterapia">Aromaterapia <span aria-hidden="true">↗</span></a>}</div>
            </article>)}
          </div>
          <p className="service-footnote">Modalidad presencial y online. Consultá con Marina para conocer cómo se adapta cada propuesta y elegir la que te resulte cómoda.</p>
        </section>

        <PracticeFinder />
        <EvidenceNotes />

        <section className="marina-section" id="marina">
          <div className="marina-art reveal"><img className="marina-portrait" src="/images/marina.webp" alt="Marina en un jardín, sosteniendo una pequeña flor junto a su rostro" loading="lazy" decoding="async"/><span className="portrait-caption">PRESENCIA · ESCUCHA · CREACIÓN</span></div>
          <div className="marina-copy reveal"><p className="eyebrow">UN POCO SOBRE MARINA</p><h2>Un camino que se construye <i>con presencia.</i></h2><p className="body-copy">Soy Marina, profesora de yoga y facilitadora de distintas prácticas de bienestar integral. Me gusta recibir a cada persona como llega, escuchar primero y construir juntas un espacio cuidado, sin apuro y con respeto por sus tiempos.</p><p className="body-copy">En Luz de Orión reúno propuestas corporales, sonoras, creativas y de exploración. Me conmueven especialmente el arte y los cuencos: maneras distintas de hacer lugar a lo que sentimos, incluso cuando todavía no encontramos las palabras.</p><p className="modality-note">Hay opciones presenciales y online. Escribime y vemos juntas qué formato está disponible para la propuesta que te interesa.</p><a className="button button-dark" href={wa("Hola Marina, me gustaría conocerte y conversar sobre tus propuestas.")} target="_blank" rel="noreferrer">Conectar con Marina <span>↗</span></a></div>
        </section>

        <GeneralFaq />
        <FirstContact />

        <section className="closing">
          <div className="closing-stars">✳　·　✧　·　✳</div>
          <p className="eyebrow">TU MOMENTO PUEDE EMPEZAR HOY</p>
          <h2>Podés empezar<br/><i>por una pausa.</i></h2>
          <p className="closing-copy">No hace falta tener todas las respuestas.<br/>Un momento de escucha también cuenta.</p>
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
