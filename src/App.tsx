import { type RefObject, useEffect, useRef, useState } from "react";
import "./styles.css";
import { wa, services, experiences, practicePages, practiceGuides, pageForSlug, pageUrl, type PracticePageData } from "./data";
import { Starfield, OrionConstellation, GoldenSpiral, Mandala } from "./components/Sky";
import { SoundArtwork, ArtArtwork, YogaArtwork, PracticeArtwork, ServiceIcon } from "./components/Artworks";
import { SiteHeader, SiteFooter, FloatingWhatsApp, type NavLink } from "./components/SiteChrome";
import { usePageMotion, useDrawIn } from "./hooks/useMotion";

const HOME_LINKS: NavLink[] = [
  { href: "#filosofia", label: "El espacio" },
  { href: "#experiencias", label: "Experiencias" },
  { href: "#pausa", label: "Pausa" },
  { href: "#terapias", label: "Prácticas" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#marina", label: "Sobre Marina" },
];
const PAGE_LINKS: NavLink[] = [
  { href: "/#filosofia", label: "El espacio" },
  { href: "/#terapias", label: "Prácticas" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: "/#marina", label: "Sobre Marina" },
];

const GROUPS: { id: string; label: string }[] = [
  { id: "sonido", label: "Sonido" },
  { id: "cuerpo", label: "Cuerpo y masajes" },
  { id: "movimiento", label: "Movimiento y respiración" },
  { id: "creatividad", label: "Arte y expresión" },
  { id: "energia", label: "Energía y sentidos" },
  { id: "exploracion", label: "Exploración interior" },
];

/** "SONIDO · VIBRACIÓN · ESCUCHA" → ["Sonido", "Vibración", "Escucha"] */
const themesOf = (eyebrow: string) => eyebrow.split("·").map((part) => part.trim().toLocaleLowerCase("es")).filter(Boolean).map((part) => part.charAt(0).toLocaleUpperCase("es") + part.slice(1));

function ExternalMark() {
  return <><span className="ext" aria-hidden="true">↗</span><span className="sr-only"> (abre WhatsApp)</span></>;
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
  const rootRef = useRef<HTMLDivElement>(null);
  usePageMotion(rootRef, page.slug);
  const related = practicePages.filter((item) => item.group === page.group && item.slug !== page.slug);
  const guide = practiceGuides[page.slug];
  const guideBlocks = [
    { title: "La propuesta", text: guide.what },
    { title: "¿Para qué puede servir?", text: guide.purpose },
    { title: "¿Cómo es un encuentro?", text: guide.session },
    { title: "¿A quién puede interesarle?", text: guide.audience },
  ];
  return <div ref={rootRef}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <SiteHeader homeHref="/" links={PAGE_LINKS} navId="practice-navigation" ctaMessage={`Hola Marina, quisiera conocer más sobre ${page.title}.`} />
    <main id="contenido" className="practice-page">
      <section className="practice-hero is-night" data-hero>
        <Starfield seed={page.slug.length * 13 + 3} count={90} />
        <div className="wrap practice-hero-grid">
          <div className="practice-hero-copy">
            <nav className="breadcrumb" aria-label="Ruta de navegación" data-hero-fade>
              <ol><li><a href="/">Inicio</a></li><li><a href="/#terapias">Prácticas</a></li><li aria-current="page">{page.title}</li></ol>
            </nav>
            <h1 className="display" data-hero-line>{page.title}</h1>
            <p className="practice-lead" data-hero-fade>{page.lead}</p>
            <ul className="theme-list" aria-label="Temas de la práctica" data-hero-fade>{themesOf(page.eyebrow).map((theme) => <li key={theme}>{theme}</li>)}</ul>
            <p className="practice-intro" data-hero-fade>{page.intro}</p>
            <p className="practice-modality" data-hero-fade>Los encuentros pueden ser presenciales u online. Consultá con Marina qué formato está disponible, cuánto dura y cuál es su valor.</p>
            <div data-hero-fade><a className="btn btn-primary" href={wa(`Hola Marina, me interesa ${page.title}. ¿Me contás si está disponible en modalidad presencial u online, cuánto dura y cuál es su valor?`)} target="_blank" rel="noreferrer">Consultar disponibilidad y valor <ExternalMark /></a></div>
          </div>
          <div className={`practice-hero-art art-${page.group}`} aria-hidden="true" data-parallax>
            <PracticeArtwork page={page} />
          </div>
        </div>
        <div className="horizon" aria-hidden="true" />
      </section>

      <section className="practice-guide is-light" aria-labelledby="guide-title">
        <div className="wrap">
          <h2 id="guide-title" className="section-title" data-reveal>¿Qué es esta práctica?</h2>
          <div className="guide-grid">
            {guideBlocks.map((block) => <article className="guide-block" key={block.title} data-reveal><h3>{block.title}</h3><p>{block.text}</p></article>)}
          </div>
          <div className="keys">
            <h2 className="keys-title" data-reveal>Algunas claves de la experiencia</h2>
            <ul className="keys-list">{page.details.map((detail) => <li key={detail} data-reveal>{detail}</li>)}</ul>
            <aside className="care-note" aria-label="Importante"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M12 10.5v6M12 7.4v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg><p>{page.note}</p></aside>
          </div>
        </div>
      </section>

      <section className="practice-faq is-paper" aria-labelledby="practice-faq-title">
        <div className="wrap faq-layout">
          <div className="faq-intro"><h2 id="practice-faq-title" className="section-title">Antes de dar el primer paso</h2><p className="muted">Preguntas frecuentes sobre {page.title.toLocaleLowerCase("es")}.</p></div>
          <div className="accordion">{guide.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span className="acc-icon" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      {related.length > 0 && <section className="related is-light" aria-labelledby="related-title">
        <div className="wrap"><h2 id="related-title" className="small-title">También podés explorar</h2><ul className="chip-links">{related.map((item) => <li key={item.slug}><a href={pageUrl(item.slug)}>{item.title}</a></li>)}</ul></div>
      </section>}

      <section className="closing is-night" aria-labelledby="practice-cta-title">
        <Starfield seed={41} count={80} />
        <div className="wrap closing-inner">
          <h2 id="practice-cta-title" className="display closing-title" data-reveal>¿Querés conocer más sobre esta propuesta?</h2>
          <p data-reveal>Preguntá por modalidad, duración, valor y próximos horarios. Consultar no te compromete a reservar.</p>
          <div data-reveal><a className="btn btn-primary" href={wa(`Hola Marina, me interesa ${page.title}. ¿Me contás modalidad, duración, valor y próximos horarios?`)} target="_blank" rel="noreferrer">Consultar por WhatsApp <ExternalMark /></a></div>
        </div>
      </section>
    </main>
    <SiteFooter homeHref="/" links={PAGE_LINKS} />
    <FloatingWhatsApp message={`Hola Marina, quisiera recibir información sobre ${page.title}.`} />
  </div>;
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

  return <section className="pause is-night" id="pausa" aria-labelledby="sensory-title">
    <Starfield seed={23} count={70} />
    <div className="wrap pause-grid">
      <div className="pause-copy" data-reveal>
        <p className="kicker">Un respiro en el camino</p>
        <h2 id="sensory-title" className="section-title">Este momento también es tuyo.</h2>
        <p>Si te hace bien, quedate un instante. Podés seguir el ritmo de la animación, escuchar una nota suave o elegir un paisaje aromático para imaginar.</p>
        <p className="muted">Sin hacerlo perfecto. Si no te resulta cómodo, volvé a tu respiración natural o simplemente observá.</p>
      </div>
      <div className={`pause-card ${isBreathing ? "is-breathing" : ""} ${bowl.isPlaying ? "is-sounding" : ""}`} data-aroma={aromaNotes[aroma].tone}>
        <div className="moon" aria-hidden="true"><span /><i /></div>
        <p className="breath-cue" aria-live="polite">{isBreathing ? (breathPhase === "inhale" ? "Inhalá con suavidad" : "Exhalá sin apuro") : "A tu propio ritmo"}</p>
        <button className="btn btn-primary" type="button" aria-pressed={isBreathing} onClick={() => { if (isBreathing) setBreathPhase("inhale"); setIsBreathing(!isBreathing); }}>{isBreathing ? "Terminar la pausa" : "Acompañar mi respiración"}</button>
        <div className="aroma">
          <p className="aroma-label" id="aroma-label">Un paisaje aromático</p>
          <div className="segmented" role="group" aria-labelledby="aroma-label">
            {aromaNotes.map((item, index) => <button key={item.name} type="button" aria-pressed={aroma === index} onClick={() => setAroma(index)}>{item.name}</button>)}
          </div>
          <p className="aroma-description" aria-live="polite"><strong>{aromaNotes[aroma].name}:</strong> {aromaNotes[aroma].note.toLocaleLowerCase("es")}</p>
          <p className="fine-print">Es una invitación a imaginar: no se aplica ni difunde ninguna fragancia. Podés disfrutar la pausa sin aromas.</p>
        </div>
        <div className="bowl-controls">
          <button className="btn btn-ghost" type="button" onClick={bowl.isPlaying ? bowl.stop : bowl.play}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">{bowl.isPlaying ? <rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" /> : <path d="M4 13h16l-1.3 3.2a3 3 0 0 1-2.8 1.8H8.1a3 3 0 0 1-2.8-1.8L4 13Zm4-3c1-1.3 2.4-2 4-2s3 .7 4 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}</svg>
            {bowl.isPlaying ? "Detener el cuenco" : "Escuchar el cuenco"}
          </button>
          <label className="volume" htmlFor="bowl-volume">Volumen <input id="bowl-volume" type="range" min="0" max="1" step="0.01" value={bowl.volume} onChange={(event) => bowl.setVolume(Number(event.target.value))} /></label>
          <a className="fine-print credit" href="https://commons.wikimedia.org/wiki/File:SingingBowl1.ogg" target="_blank" rel="noreferrer">Grabación: BambooBeast, dominio público</a>
        </div>
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
  return <section className="faq is-paper" id="preguntas" aria-labelledby="general-faq-title">
    <div className="wrap faq-layout">
      <div className="faq-intro" data-reveal>
        <h2 id="general-faq-title" className="section-title">Unas respuestas para empezar</h2>
        <p className="muted">Si todavía tenés dudas, podés conversar con Marina antes de elegir.</p>
        <a className="btn btn-dark" href={wa("Hola Marina, tengo algunas preguntas antes de elegir una práctica.")} target="_blank" rel="noreferrer">Consultar por WhatsApp <ExternalMark /></a>
      </div>
      <div className="accordion">{questions.map((item) => <details key={item.question}><summary>{item.question}<span className="acc-icon" aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </div>
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
  return <section className="finder is-light" aria-labelledby="practice-finder-title">
    <div className="wrap finder-grid">
      <div className="finder-copy" data-reveal>
        <h2 id="practice-finder-title" className="section-title">Si no sabés por dónde empezar</h2>
        <p className="muted">Elegí lo que más se acerca a tu momento. Es solo una orientación: no es un diagnóstico ni tenés que tenerlo resuelto para escribir.</p>
      </div>
      <div className="finder-panel" data-reveal>
        <p className="finder-question" id="finder-question">¿Qué te gustaría hoy?</p>
        <div className="finder-options" role="group" aria-labelledby="finder-question">
          {waysToBegin.map((item) => <button key={item.id} type="button" aria-pressed={choice === item.id} onClick={() => setChoice(item.id)}>{item.label}</button>)}
        </div>
        <div className="finder-result" aria-live="polite" aria-atomic="true">
          {selected ? <>
            <p>{selected.description}</p>
            {suggestions.length > 0 && <ul className="chip-links">{suggestions.map((page) => <li key={page.slug}><a href={pageUrl(page.slug)}>{page.title}</a></li>)}</ul>}
            <a className="text-link" href={wa(`Hola Marina, hoy me gustaría explorar: ${selected.label.toLowerCase()}. ¿Me contás qué opciones, modalidad, duración y valor están disponibles?`)} target="_blank" rel="noreferrer">Conversarlo con Marina <ExternalMark /></a>
          </> : <p className="muted">Elegí una opción para ver algunas ideas, sin compromiso.</p>}
        </div>
      </div>
    </div>
  </section>;
}

function EvidenceNotes() {
  const notes = [
    { title: "Yoga", text: "Se estudió como complemento para distintos cuadros. Los resultados dependen del programa y la población; para trastornos de ansiedad, la evidencia aún no alcanza para conclusiones firmes.", links: [{ href: "https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety", label: "Qué dice NCCIH sobre yoga" }] },
    { title: "Masaje", text: "La investigación sugiere alivio de corto plazo para ciertos dolores; en muchas situaciones la evidencia sigue siendo limitada.", links: [{ href: "https://www.nccih.nih.gov/health/providers/digest/massage-therapy-for-health", label: "Qué dice NCCIH sobre masaje" }] },
    { title: "Cuencos y Reiki", text: "Una revisión encontró pocos estudios sobre cuencos, con riesgo de sesgo y sin evidencia suficiente para recomendar su uso terapéutico. Reiki no ha demostrado eficacia para tratar problemas de salud.", links: [{ href: "https://pubmed.ncbi.nlm.nih.gov/32507429/", label: "Revisión sobre cuencos" }, { href: "https://www.nccih.nih.gov/health/reiki", label: "Qué dice NCCIH sobre Reiki" }] },
  ];
  return <section className="evidence is-paper" aria-labelledby="evidence-title">
    <div className="wrap">
      <div className="evidence-head" data-reveal>
        <h2 id="evidence-title" className="section-title">Cuidar también es hablar con honestidad</h2>
        <p className="muted">Algunas prácticas se estudiaron como complemento de otros cuidados. Eso no garantiza un resultado individual ni convierte estas propuestas en tratamientos de salud.</p>
      </div>
      <div className="evidence-grid">
        {notes.map((note) => <article key={note.title} data-reveal><h3>{note.title}</h3><p>{note.text}</p>{note.links.map((link) => <a key={link.href} className="source-link" href={link.href} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</article>)}
      </div>
      <p className="fine-print evidence-foot">Las demás propuestas de Luz de Orión se presentan como experiencias de bienestar, expresión o reflexión. La evidencia sobre arteterapia clínica no debe confundirse con una actividad creativa no clínica.</p>
    </div>
  </section>;
}

function FirstContact() {
  const steps = [
    { title: "Contale qué te interesa", text: "Podés escribir aunque todavía no sepas qué práctica elegir." },
    { title: "Preguntá lo que necesitás", text: "Modalidad, duración, valor, disponibilidad y cualquier cuidado importante." },
    { title: "Decidís con calma", text: "Coordinás si la propuesta te cierra. Consultar no te compromete a reservar." },
  ];
  return <section className="steps is-light" aria-labelledby="first-contact-title">
    <div className="wrap">
      <h2 id="first-contact-title" className="section-title steps-title" data-reveal>Primero conversamos. Después elegís.</h2>
      <div className="steps-track">
      <span className="steps-line" aria-hidden="true" data-belt-line />
      <ol className="steps-list">
        {steps.map((step, index) => <li key={step.title} data-reveal><span className="step-star" aria-hidden="true" /><span className="step-n">Paso {index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
      </ol>
      </div>
      <div className="steps-cta" data-reveal><a className="btn btn-dark" href={wa("Hola Marina, estoy conociendo Luz de Orión. ¿Me contás qué propuestas, modalidades, duración, valores y horarios están disponibles?")} target="_blank" rel="noreferrer">Consultar por WhatsApp <ExternalMark /></a></div>
    </div>
  </section>;
}

function PracticeNotFoundPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageMotion(rootRef, "404");
  return <div ref={rootRef}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <SiteHeader homeHref="/" links={PAGE_LINKS} navId="notfound-navigation" ctaMessage="Hola Marina, quisiera conocer más sobre tus propuestas." />
    <main id="contenido" className="not-found is-night" data-hero>
      <Starfield seed={404} count={110} />
      <div className="wrap">
        <h1 className="display" data-hero-line>No encontramos esta página</h1>
        <p data-hero-fade>Puede que el enlace haya cambiado. Podés volver al inicio y explorar las prácticas disponibles.</p>
        <div data-hero-fade><a className="btn btn-primary" href="/">Volver a Luz de Orión</a></div>
      </div>
    </main>
  </div>;
}

function ExperienceStage({ active, bowl }: { active: number; bowl: ReturnType<typeof useBowlPlayer> }) {
  const [artVersion, setArtVersion] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  useDrawIn(stageRef, [active, artVersion]);
  return <div className="experience-visual is-night" data-experience={active}>
    <div className="experience-stage" ref={stageRef} key={`${active}-${artVersion}`}>
      {active === 0 ? <button className={`bowl-button ${bowl.isPlaying ? "is-playing" : ""}`} type="button" onClick={bowl.isPlaying ? bowl.stop : bowl.play} aria-label={bowl.isPlaying ? "Detener el sonido del cuenco" : "Escuchar una grabación de cuenco"}><SoundArtwork /><span className="stage-action">{bowl.isPlaying ? "Detener el sonido" : "Tocá para escuchar el cuenco"}</span></button>
        : active === 1 ? <div className="art-experience"><ArtArtwork /><button type="button" className="stage-action" onClick={() => setArtVersion((value) => value + 1)}>Volver a trazar <span aria-hidden="true">↻</span></button></div>
        : <YogaArtwork />}
    </div>
    <span className="stage-caption" aria-hidden="true">{active === 0 ? "Resonancia" : active === 1 ? "Expresión" : "Respiración"}</span>
  </div>;
}

function App() {
  const [active, setActive] = useState(0);
  const bowl = useBowlPlayer();
  const rootRef = useRef<HTMLDivElement>(null);
  const currentSlug = window.location.pathname.match(/^\/practicas\/([^/]+)\/?$/)?.[1];
  const currentPage = currentSlug ? pageForSlug(currentSlug) : undefined;

  if (currentPage) return <PracticePage page={currentPage} />;
  if (currentSlug) return <PracticeNotFoundPage />;
  return <Home rootRef={rootRef} active={active} setActive={setActive} bowl={bowl} />;
}

function Home({ rootRef, active, setActive, bowl }: { rootRef: RefObject<HTMLDivElement>; active: number; setActive: (value: number) => void; bowl: ReturnType<typeof useBowlPlayer> }) {
  usePageMotion(rootRef, "home");
  const experienceSlug = active === 0 ? "cuencos-sonoros" : active === 1 ? "arteterapia" : "yoga";
  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <SiteHeader homeHref="#inicio" links={HOME_LINKS} navId="primary-navigation" ctaMessage="Hola Marina, quisiera conocer más sobre tus propuestas." />

      <main id="contenido">
        <section className="hero is-night" id="inicio" data-hero aria-labelledby="hero-title">
          <Starfield seed={7} count={170} />
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="kicker" data-hero-fade>Luz de Orión, con Marina</p>
              <h1 id="hero-title" className="display hero-title"><span className="line" data-hero-line>Volver a vos.</span> <span className="line indent" data-hero-line>Habitar tu luz.</span></h1>
              <p className="hero-lead" data-hero-fade>Hola, soy Marina. Qué lindo que estés acá. Este es un espacio cercano para hacer una pausa, escuchar cómo estás y explorar, a tu ritmo, qué puede acompañarte hoy.</p>
              <div className="hero-actions" data-hero-fade>
                <a className="btn btn-primary" href={wa("Hola Marina, quiero consultar por tus sesiones.")} target="_blank" rel="noreferrer">Escribile a Marina <ExternalMark /></a>
                <a className="text-link on-dark" href="#experiencias">Explorar experiencias</a>
              </div>
              <p className="hero-note" data-hero-fade>Podés llegar con preguntas, curiosidad o cansancio. <strong>No hace falta saber por dónde empezar.</strong></p>
            </div>
            <figure className="hero-figure" data-parallax>
              <OrionConstellation />
              <figcaption data-hero-fade>Tres estrellas alineadas, como el cinturón de Orión: cuerpo, energía y emoción.</figcaption>
            </figure>
          </div>
          <div className="horizon" aria-hidden="true" />
        </section>

        <section className="intro is-light" id="filosofia" aria-labelledby="intro-title">
          <div className="wrap intro-grid">
            <div className="intro-art" aria-hidden="true"><GoldenSpiral /><p>Un regreso a lo esencial.</p></div>
            <div className="intro-main">
              <h2 id="intro-title" className="statement" data-reveal>Hay momentos en los que necesitamos hacer silencio para volver a escucharnos.</h2>
              <div className="intro-body" data-reveal>
                <p>Hola, soy Marina. Creé Luz de Orión como un espacio cercano y luminoso donde podamos encontrarnos con tiempo. A través del sonido, el movimiento, la creatividad y otras prácticas de bienestar, te acompaño a hacer una pausa y prestar atención a lo que necesitás hoy.</p>
                <p>No hace falta venir con experiencia, respuestas ni una idea clara. Primero conversamos; tus preferencias, comodidad y límites son parte de la propuesta desde el comienzo.</p>
                <a className="text-link" href="#terapias">Conocé las prácticas</a>
              </div>
            </div>
          </div>
        </section>

        <section className="experiences is-paper" id="experiencias" aria-labelledby="experiences-title">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2 id="experiences-title" className="section-title">Un espacio para dejarte llevar</h2>
              <p className="muted">Cada experiencia es diferente. Elegí la que resuene con vos.</p>
            </div>
            <div className="experience-layout">
              <ExperienceStage active={active} bowl={bowl} />
              <div className="experience-detail">
                <div className="experience-tabs" role="tablist" aria-label="Elegí una experiencia">
                  {experiences.map((item, i) => <button key={item.title} id={"experience-tab-" + i} type="button" role="tab" aria-selected={active === i} aria-controls="experience-panel" tabIndex={active === i ? 0 : -1} className="experience-tab" onClick={() => setActive(i)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); const forward = event.key === "ArrowRight" || event.key === "ArrowDown"; const next = (i + (forward ? 1 : -1) + experiences.length) % experiences.length; setActive(next); document.getElementById("experience-tab-" + next)?.focus(); } }}>{item.title}</button>)}
                </div>
                <div className="experience-panel" id="experience-panel" role="tabpanel" aria-labelledby={"experience-tab-" + active} aria-live="polite" aria-atomic="true">
                  <h3>{experiences[active].subtitle}</h3>
                  <p>{experiences[active].text}</p>
                  <a className="text-link" href={pageUrl(experienceSlug)}>Conocer {experiences[active].title.toLocaleLowerCase("es")}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SensoryPause bowl={bowl} />

        <section className="quote is-light" aria-label="Una idea que guía el espacio">
          <div className="quote-mandala" aria-hidden="true" data-rotate><Mandala /></div>
          <blockquote className="wrap">
            <p>El bienestar no es llegar a un lugar. Es aprender a habitar el camino.</p>
          </blockquote>
        </section>

        <section className="practices is-paper" id="terapias" aria-labelledby="practices-title">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2 id="practices-title" className="section-title">Prácticas que te acompañan</h2>
              <p className="muted">Distintas herramientas, una misma intención: abrir un espacio de conexión y cuidado.</p>
            </div>
            <ul className="practice-rows">
              {services.map((s) => <li className="practice-row" key={s.n} data-reveal>
                <span className="row-icon" aria-hidden="true"><ServiceIcon kind={s.n} /></span>
                <div className="row-main">
                  <h3><a href={pageUrl(s.slug)}>{s.title}</a></h3>
                  <p className="row-tag">{s.tag}</p>
                </div>
                <p className="row-text">{s.text}</p>
                <div className="row-links">
                  <span className="row-more" aria-hidden="true">Ver propuesta</span>
                  {s.n === "05" && <a className="row-extra" href={pageUrl("aromaterapia")}>Aromaterapia</a>}
                </div>
              </li>)}
            </ul>
            <div className="practice-index" data-reveal>
              <h3 className="small-title">Todas las propuestas</h3>
              <div className="index-groups">
                {GROUPS.map((group) => <div key={group.id} className="index-group"><p>{group.label}</p><ul>{practicePages.filter((page) => page.group === group.id).map((page) => <li key={page.slug}><a href={pageUrl(page.slug)}>{page.title}</a></li>)}</ul></div>)}
              </div>
            </div>
            <p className="fine-print">Modalidad presencial y online. Consultá con Marina para conocer cómo se adapta cada propuesta y elegir la que te resulte cómoda.</p>
          </div>
        </section>

        <PracticeFinder />
        <EvidenceNotes />

        <section className="marina is-light" id="marina" aria-labelledby="marina-title">
          <div className="wrap marina-grid">
            <figure className="marina-photo" data-reveal>
              <div className="arch"><img src="/images/marina.webp" alt="Marina en un jardín, sosteniendo una pequeña flor junto a su rostro" loading="lazy" decoding="async" width="490" height="496" /></div>
              <figcaption>Presencia, escucha y creación.</figcaption>
            </figure>
            <div className="marina-copy" data-reveal>
              <p className="kicker">Sobre Marina</p>
              <h2 id="marina-title" className="section-title">Un camino que se construye con presencia</h2>
              <p>Soy Marina, profesora de yoga y facilitadora de distintas prácticas de bienestar integral. Me gusta recibir a cada persona como llega, escuchar primero y construir juntas un espacio cuidado, sin apuro y con respeto por sus tiempos.</p>
              <p>En Luz de Orión reúno propuestas corporales, sonoras, creativas y de exploración. Me conmueven especialmente el arte y los cuencos: maneras distintas de hacer lugar a lo que sentimos, incluso cuando todavía no encontramos las palabras.</p>
              <p className="muted">Hay opciones presenciales y online. Escribime y vemos juntas qué formato está disponible para la propuesta que te interesa.</p>
              <a className="btn btn-dark" href={wa("Hola Marina, me gustaría conocerte y conversar sobre tus propuestas.")} target="_blank" rel="noreferrer">Conectar con Marina <ExternalMark /></a>
            </div>
          </div>
        </section>

        <GeneralFaq />
        <FirstContact />

        <section className="closing is-night" aria-labelledby="closing-title">
          <Starfield seed={31} count={120} />
          <div className="wrap closing-inner">
            <h2 id="closing-title" className="display closing-title" data-reveal>Podés empezar por una pausa.</h2>
            <p data-reveal>No hace falta tener todas las respuestas. Un momento de escucha también cuenta.</p>
            <div data-reveal><a className="btn btn-primary" href={wa("Hola Marina, quiero dar el primer paso y conocer tus propuestas.")} target="_blank" rel="noreferrer">Escribir por WhatsApp <ExternalMark /></a></div>
          </div>
        </section>
      </main>

      <SiteFooter homeHref="#inicio" links={HOME_LINKS} />
      <FloatingWhatsApp message="Hola Marina, quisiera recibir información sobre tus propuestas." />
    </div>
  );
}

export default App;
