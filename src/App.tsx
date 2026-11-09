import { useEffect, useId, useRef, useState } from "react";
import "./styles.css";

const phone = "5493546525509";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
  { n: "01", slug: "cuencos-sonoros", title: "Cuencos sonoros", text: "Una invitación a escuchar las resonancias de los cuencos, respirar y regalarte un momento de pausa, sin expectativas.", tag: "Sonido & escucha", icon: "◖" },
  { n: "02", slug: "masajes-integrales", title: "Masajes integrales", text: "Distintas formas de trabajo corporal, conversadas con vos para cuidar tus preferencias, tu comodidad y tus límites.", tag: "Cuerpo & presencia", icon: "✺" },
  { n: "03", slug: "yoga", title: "Yoga & respiración", text: "Movimiento consciente, posturas adaptables y ejercicios de respiración para explorar la presencia y respetar los tiempos de cada cuerpo.", tag: "Movimiento consciente", icon: "〰" },
  { n: "04", slug: "arteterapia", title: "Arte & expresión", text: "Colores, formas y materiales como lenguajes para crear, explorar emociones y expresar aquello que a veces no encuentra palabras.", tag: "Creación & emoción", icon: "✳" },
  { n: "05", slug: "reiki", title: "Reiki y aromaterapia", text: "Un encuentro de quietud y exploración sensorial. Los aromas son opcionales y se conversan siempre con cuidado.", tag: "Energía & sentidos", icon: "❋" },
  { n: "06", slug: "exploracion-interior", title: "Exploración interior", text: "Prácticas simbólicas y de reflexión para explorar preguntas personales, imágenes y relatos desde una mirada abierta y sin respuestas impuestas.", tag: "Autoconocimiento", icon: "☾" },
];

const experiences = [
  { title: "Cuencos sonoros", subtitle: "Dejá que el sonido te encuentre", text: "Una experiencia de escucha profunda. Las vibraciones y resonancias de los cuencos crean un espacio para descansar, respirar y conectar con el momento presente.", symbol: "◖" },
  { title: "Arte y expresión", subtitle: "Hay cosas que encuentran su forma creando", text: "El arte como territorio de exploración: colores, formas, imágenes y materiales para abrir preguntas, jugar y expresar aquello que a veces no encuentra palabras.", symbol: "✳" },
  { title: "Yoga consciente", subtitle: "Moverte también puede ser una forma de volver", text: "Prácticas para conectar respiración y movimiento, respetando los tiempos y posibilidades de cada cuerpo.", symbol: "〰" },
];


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

function ServiceArtwork({ slug }: { slug: string }) {
  const page = practicePages.find((item) => item.slug === slug);
  if (!page) return <SoundArtwork />;
  return <PracticeArtwork page={page} />;
}


function ServiceIcon({ kind }: { kind: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, JSX.Element> = {
    "01": <><path d="M5 15.5h14l-1.5 3h-11z"/><path d="M7 15.5c.7-2.5 2.5-4 5-4s4.3 1.5 5 4"/><path d="M12 3v3M5.6 5.6l2.1 2.1M18.4 5.6l-2.1 2.1"/><path d="M3 11c1.2-1.2 2.3-1.2 3.5 0M17.5 11c1.2-1.2 2.3-1.2 3.5 0"/></>,
    "02": <><path d="M4 13c2.5-3 5-4.5 7-4.5 1.4 0 2.2.9 2.2 2.1 0 1.4-1.3 2.4-3 3.4"/><path d="M20 13c-2.5-3-5-4.5-7-4.5"/><path d="M5 16c2.3 2 4.5 3 7 3s4.7-1 7-3"/><path d="M8 6.5c1.2-1.2 2.5-1.8 4-1.8s2.8.6 4 1.8"/></>,
    "03": <><circle cx="12" cy="5" r="2"/><path d="M12 7v6m0-2-5 4m5-4 5 4M7 15l-2 4m10-4 2 4"/><path d="M4 20h16"/></>,
    "04": <><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.8 1.8 0 0 1 1.3-3.1H18A3 3 0 0 0 21 11.5 9 9 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="11" cy="7" r=".8"/><circle cx="16" cy="8.5" r=".8"/></>,
    "05": <><path d="M12 20c-4.5-2.5-7-5.7-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 3.3-2.5 6.5-7 9Z"/><path d="M12 17V9m0 4c-1.5-1.7-2.7-2.2-4-2.2m4 4c1.4-1.5 2.5-2 4-2"/></>,
    "06": <><path d="M17.5 3.8a8.5 8.5 0 1 0 2.7 14.5A9 9 0 0 1 17.5 3.8Z"/><path d="m7 5 .5 1.5L9 7l-1.5.5L7 9l-.5-1.5L5 7l1.5-.5L7 5Zm11 7 .6 1.4L20 14l-1.4.6L18 16l-.6-1.4L16 14l1.4-.6L18 12Z"/></>
  };
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...common}>{paths[kind] || paths["01"]}</svg>;
}


type PracticePageData = {
  slug: string; title: string; eyebrow: string; lead: string;
  intro: string; details: string[]; note: string; group: string;
};
const practicePages: PracticePageData[] = [
  {slug:"cuencos-sonoros",title:"Cuencos sonoros",eyebrow:"SONIDO · VIBRACIÓN · ESCUCHA",lead:"Dejá que el sonido te encuentre.",intro:"Una experiencia de escucha y pausa en la que los sonidos y las resonancias de los cuencos invitan a aflojar el ritmo cotidiano y estar presente.",details:["El sonido como espacio de atención: escuchar, respirar y registrar lo que sucede en el cuerpo.","Una propuesta para regalarte un momento de quietud, sin exigencias ni expectativas.","Cada encuentro se adapta a la experiencia y a las necesidades conversadas previamente."],note:"La experiencia no reemplaza tratamientos médicos ni psicológicos. Si tenés sensibilidad auditiva o alguna condición que requiera cuidados, conversalo antes de coordinar.",group:"sonido"},
  {slug:"masajes-integrales",title:"Masajes integrales",eyebrow:"CUERPO · CONTACTO · DESCANSO",lead:"Un momento para volver al cuerpo.",intro:"Distintas técnicas de masaje y trabajo corporal para ofrecer un espacio de descanso, presencia y registro corporal. La modalidad se conversa antes de cada encuentro.",details:["La elección de la técnica considera tus preferencias, comodidad y el objetivo de bienestar que quieras explorar.","Podés conocer las distintas propuestas de masajes y conversar con Marina para elegir la más adecuada para vos.","El contacto se realiza siempre desde el consentimiento y el respeto por tus límites."],note:"Los masajes son prácticas de bienestar y no sustituyen la evaluación ni el tratamiento de profesionales de salud.",group:"cuerpo"},
  {slug:"masaje-oriental",title:"Masaje oriental",eyebrow:"CUERPO · PRESENCIA",lead:"Escuchar el cuerpo desde otra atención.",intro:"Una propuesta de trabajo corporal inspirada en técnicas orientales, orientada a crear un espacio de pausa y conexión con las sensaciones.",details:["La sesión se conversa previamente para conocer tus preferencias y límites.","La intensidad y el ritmo se ajustan a tu comodidad durante el encuentro."],note:"Consultá previamente si tenés lesiones, dolor persistente o alguna condición de salud.",group:"cuerpo"},
  {slug:"masaje-descontracturante",title:"Masaje descontracturante",eyebrow:"CUERPO · DESCANSO",lead:"Hacer una pausa en las tensiones cotidianas.",intro:"Una propuesta de masaje corporal que puede enfocarse en zonas de tensión percibida, siempre conversando antes sobre la intensidad y la comodidad.",details:["Se acuerdan las zonas a trabajar y la presión tolerable.","Podés pedir ajustes o detener la sesión en cualquier momento."],note:"No es un tratamiento médico ni reemplaza la consulta ante dolor agudo, persistente o lesión.",group:"cuerpo"},
  {slug:"masaje-relajante",title:"Masaje relajante",eyebrow:"CALMA · CUERPO · PAUSA",lead:"Bajar el ritmo. Habitar el presente.",intro:"Un encuentro pensado como un momento de descanso, con maniobras suaves y un ritmo tranquilo, adaptado a tus preferencias.",details:["La propuesta prioriza la comodidad y el clima de calma.","Antes de comenzar se conversa sobre preferencias, sensibilidad y límites."],note:"La experiencia es de bienestar y no constituye un tratamiento médico.",group:"cuerpo"},
  {slug:"masaje-con-pindas",title:"Masaje con pindas",eyebrow:"TRADICIÓN · AROMAS · CONTACTO",lead:"Una experiencia sensorial para regalarte una pausa.",intro:"Una modalidad de masaje que incorpora pindas, saquitos de tela utilizados en determinadas prácticas corporales. Los detalles de su aplicación se conversan antes de la sesión.",details:["Se revisan previamente aromas, temperatura y sensibilidad de la piel.","La experiencia se adapta a tus preferencias y comodidad."],note:"Informá alergias, sensibilidad cutánea o cualquier condición relevante antes de coordinar.",group:"cuerpo"},
  {slug:"masaje-con-bambu",title:"Masaje con bambú",eyebrow:"CUERPO · MOVIMIENTO",lead:"Otra manera de explorar el contacto corporal.",intro:"Una técnica que incorpora elementos de bambú en el masaje. La modalidad, las zonas y la intensidad se acuerdan antes de comenzar.",details:["Se conversa sobre expectativas, zonas de trabajo y límites personales.","La sesión se adapta a tu comodidad."],note:"Consultá previamente si tenés lesiones, fragilidad ósea o alguna condición que requiera cuidados.",group:"cuerpo"},
  {slug:"masaje-piedras-calientes",title:"Masaje con piedras calientes",eyebrow:"CALOR · CUERPO · DESCANSO",lead:"Una pausa alrededor de la sensación de calor.",intro:"Una propuesta corporal que incorpora piedras templadas como parte de la experiencia. La temperatura se verifica y adapta a la sensibilidad de cada persona.",details:["La temperatura y el contacto se acuerdan y revisan durante la sesión.","Se prioriza siempre la comodidad y la seguridad."],note:"No se recomienda sin consulta previa ante alteraciones de sensibilidad, problemas circulatorios, lesiones o embarazo.",group:"cuerpo"},
  {slug:"masaje-californiano",title:"Masaje californiano",eyebrow:"CONTACTO · FLUIDEZ · PRESENCIA",lead:"Un recorrido corporal continuo y consciente.",intro:"Una modalidad de masaje reconocida por sus movimientos amplios y fluidos. La sesión se adapta a tus preferencias, buscando una experiencia de contacto respetuosa y cómoda.",details:["Se conversa previamente sobre el tipo de contacto y las zonas que preferís incluir o evitar.","Podés comunicar cualquier incomodidad en todo momento."],note:"Es una práctica de bienestar corporal, no un tratamiento médico.",group:"cuerpo"},
  {slug:"yoga",title:"Yoga consciente",eyebrow:"MOVIMIENTO · RESPIRACIÓN · PRESENCIA",lead:"Moverte también puede ser una forma de volver.",intro:"Prácticas de yoga para conectar movimiento, respiración y atención, respetando los tiempos y posibilidades de cada cuerpo.",details:["La práctica propone una escucha atenta, sin competir ni forzar posturas.","Cada persona puede adaptar los movimientos a su experiencia y posibilidades.","El objetivo es construir un espacio de presencia y conexión corporal."],note:"Contale a Marina si tenés lesiones, dolor o alguna condición que requiera adaptar la práctica.",group:"movimiento"},
  {slug:"respiracion-consciente",title:"Respiración consciente y relajación",eyebrow:"RESPIRAR · PAUSAR · REGISTRAR",lead:"A veces, volver empieza con una respiración.",intro:"Prácticas de atención a la respiración y relajación para crear un momento de pausa y registrar el presente.",details:["Se exploran ejercicios sencillos de respiración y atención.","El ritmo se adapta a cada persona: no hace falta forzar ni sostener ninguna técnica que resulte incómoda."],note:"Si una práctica respiratoria genera mareo, angustia o incomodidad, se interrumpe. No reemplaza atención profesional.",group:"movimiento"},
  {slug:"arteterapia",title:"Arte y expresión",eyebrow:"ARTE · CREATIVIDAD · EMOCIÓN",lead:"Hay cosas que encuentran su forma creando.",intro:"Un espacio de exploración creativa a través de colores, formas, imágenes y materiales. Crear puede abrir otros modos de expresar y registrar lo que sentimos.",details:["No necesitás experiencia artística ni saber dibujar.","El proceso importa más que el resultado: explorar, jugar y encontrar un lenguaje propio.","La propuesta se adapta a los materiales y a la búsqueda de cada encuentro."],note:"La expresión artística se presenta como una práctica de exploración y bienestar; no se atribuyen resultados terapéuticos garantizados.",group:"creatividad"},
  {slug:"reiki",title:"Reiki",eyebrow:"ENERGÍA · PRESENCIA · PAUSA",lead:"Un encuentro para hacer espacio al descanso.",intro:"Una práctica de bienestar de tradición energética que se ofrece como un momento de quietud, atención y descanso.",details:["La modalidad del encuentro se explica antes de comenzar.","Se respetan tus preferencias respecto del contacto físico; también podés elegir una modalidad sin contacto."],note:"El Reiki no cuenta con evidencia suficiente para tratar enfermedades y no sustituye atención médica o psicológica.",group:"energia"},
  {slug:"aromaterapia",title:"Aromaterapia",eyebrow:"AROMAS · SENSACIONES · AMBIENTE",lead:"El aroma también puede invitarnos a una pausa.",intro:"Una propuesta que incorpora aromas como parte de una experiencia sensorial y de bienestar, atendiendo a las preferencias de cada persona.",details:["Se consultan previamente alergias, sensibilidad a fragancias, asma y preferencias personales.","El uso de aromas es opcional y se puede prescindir de ellos."],note:"Los aceites esenciales pueden producir irritación o reacciones. No se ingieren ni se aplican sobre la piel sin la orientación y dilución adecuadas.",group:"energia"},
  {slug:"exploracion-interior",title:"Exploración interior",eyebrow:"AUTOCONOCIMIENTO · SÍMBOLOS · REFLEXIÓN",lead:"Un espacio para abrir preguntas y explorar sentidos.",intro:"Distintas prácticas simbólicas y de exploración personal para acercarte a preguntas, relatos y experiencias internas desde una mirada respetuosa y sin respuestas prefabricadas.",details:["Registros y lecturas simbólicas para abrir preguntas y reflexionar sobre momentos personales.","Regresiones y visualizaciones como experiencias subjetivas, sin asumir que las imágenes sean recuerdos verificables.","Prácticas de inspiración chamánica, biodescodificación y lecturas de cartas o tarot, siempre con un encuadre claro y sin promesas de resultados."],note:"Estas propuestas no diagnostican ni tratan enfermedades, no predicen hechos con certeza y nunca sustituyen atención médica, psicológica o asesoramiento profesional.",group:"exploracion"},
  {slug:"regresiones",title:"Regresiones",eyebrow:"EXPLORACIÓN INTERIOR · RELATO",lead:"Un espacio para explorar imágenes y experiencias internas.",intro:"Una práctica de exploración subjetiva que puede trabajar con visualizaciones, recuerdos e imágenes personales. Se conversa previamente sobre el encuadre y las expectativas.",details:["La participación es voluntaria y podés detener el ejercicio en cualquier momento.","Las imágenes que aparecen no deben tomarse como prueba de hechos históricos ni como recuerdos necesariamente verificables."],note:"No es un procedimiento diagnóstico ni un método para recuperar recuerdos fiables. Si hay antecedentes de trauma o malestar intenso, es importante conversarlo antes.",group:"exploracion"},
  {slug:"registros",title:"Registros",eyebrow:"PREGUNTAS · SENTIDO · REFLEXIÓN",lead:"Abrir preguntas para escucharte de otra manera.",intro:"Una propuesta de exploración espiritual y simbólica que algunas personas utilizan para reflexionar sobre preguntas personales y momentos de transición.",details:["El encuentro parte de aquello que quieras explorar o poner en palabras.","La experiencia se aborda desde la reflexión personal, sin presentar interpretaciones como verdades objetivas."],note:"No sustituye decisiones informadas, asesoramiento profesional ni tratamientos de salud.",group:"exploracion"},
  {slug:"biodescodificacion",title:"Biodescodificación",eyebrow:"RELATO · SIGNIFICADOS · REFLEXIÓN",lead:"Explorar las historias y significados que construimos.",intro:"Una propuesta de conversación y reflexión sobre experiencias personales y los significados que cada persona les atribuye.",details:["Se trabaja desde el relato subjetivo, sin asumir que los síntomas o enfermedades tengan una causa emocional específica.","La escucha y el respeto por la historia de cada persona son centrales."],note:"La biodescodificación no es un método científico validado para diagnosticar o tratar enfermedades. Nunca reemplaza la atención médica ni debe generar culpa por enfermar.",group:"exploracion"},
  {slug:"chamanismo",title:"Prácticas de chamanismo",eyebrow:"RITUAL · SÍMBOLO · EXPERIENCIA",lead:"Explorar lo simbólico desde el respeto.",intro:"Prácticas de inspiración chamánica presentadas como experiencias simbólicas y de exploración personal, con atención al sentido que cada participante les da.",details:["El contenido y el encuadre se explican antes de cada encuentro.","La participación es voluntaria y se respetan las creencias y límites personales."],note:"No se realizan promesas de curación ni se reemplaza atención sanitaria por prácticas espirituales.",group:"exploracion"},
  {slug:"lectura-de-cartas-y-tarot",title:"Lectura de cartas y tarot",eyebrow:"SÍMBOLOS · PREGUNTAS · ORIENTACIÓN",lead:"Una lectura como espejo para abrir nuevas preguntas.",intro:"Un espacio de lectura simbólica y orientación personal a través de cartas o tarot. La propuesta invita a reflexionar, no a delegar las propias decisiones.",details:["Podés acercarte con una pregunta, una inquietud o simplemente curiosidad.","Las imágenes y símbolos se utilizan como disparadores de conversación y reflexión."],note:"La lectura no predice hechos con certeza ni reemplaza asesoramiento médico, psicológico, legal o financiero.",group:"exploracion"}
];

type PracticeGuide = { what: string; purpose: string; session: string; audience: string; faqs: { question: string; answer: string }[] };
const practiceGuides: Record<string, PracticeGuide> = {
"cuencos-sonoros":{what:"Los cuencos son instrumentos que producen sonidos sostenidos y armónicos al ser percutidos o frotados suavemente. Una experiencia sonora combina sus resonancias con momentos de silencio y escucha atenta. No hace falta saber música ni meditar: la invitación es detenerse y percibir.",purpose:"Puede ser una pausa para quienes desean descansar del ritmo cotidiano, acompañar una meditación, explorar la percepción del sonido o regalarse un momento de quietud. Cada persona puede vivir la experiencia de manera diferente; no hay un resultado garantizado.",session:"Antes se conversa sobre expectativas, comodidad y sensibilidad auditiva. Durante el encuentro podés permanecer sentado o recostado, según la modalidad acordada, escuchar los sonidos y descansar. La intensidad, duración y distancia de los instrumentos deben adaptarse a cada persona.",audience:"Puede interesar a personas que disfrutan de la música, la meditación o las experiencias sensoriales. Si tenés tinnitus, hiperacusia, migraña sensible al sonido u otra condición que requiera cuidados, consultá previamente. Siempre podés pedir bajar el volumen o detener la experiencia.",faqs:[{question:"¿Tengo que saber meditar?",answer:"No. Podés simplemente escuchar, descansar o atender a tu respiración, sin exigirte nada."},{question:"¿Los cuencos curan enfermedades?",answer:"No hay evidencia suficiente para afirmarlo. Se ofrecen como experiencia sonora y de bienestar, no como tratamiento médico o psicológico."},{question:"¿Qué pasa si el sonido me resulta intenso?",answer:"Podés avisar en cualquier momento. La experiencia debe adaptarse a tu comodidad y podés interrumpirla."}]},
"masajes-integrales":{what:"Masajes integrales reúne distintas modalidades de trabajo corporal, cada una con maniobras, ritmos y recursos propios. La propuesta es elegir junto con Marina una experiencia coherente con tus preferencias y expectativas.",purpose:"Puede ofrecer un tiempo dedicado al descanso, al contacto corporal respetuoso y al registro de sensaciones. Algunas modalidades priorizan maniobras suaves; otras incorporan herramientas, calor o movimientos amplios.",session:"Se conversa sobre la técnica, zonas que preferís incluir o evitar, presión, temperatura, alergias y cuidados relevantes. El consentimiento y la posibilidad de pedir ajustes o detener el encuentro se mantienen durante toda la sesión.",audience:"Puede interesar a quienes buscan una experiencia de bienestar corporal. Si tenés dolor agudo, lesión reciente, fiebre, problemas circulatorios, alteraciones de sensibilidad o embarazo, consultá antes con un profesional de salud.",faqs:[{question:"¿Cómo elijo qué masaje hacer?",answer:"Contale a Marina qué experiencia buscás y qué preferencias tenés. La modalidad se define después de conversar."},{question:"¿Puedo pedir cambios durante la sesión?",answer:"Sí. La presión, las zonas y el ritmo deben respetar tus límites. Podés pedir un cambio o finalizar el encuentro."}]},
"masaje-oriental":{what:"El nombre masaje oriental reúne tradiciones y técnicas corporales diversas. Esta propuesta se inspira en prácticas de contacto y atención al cuerpo, sin atribuirle efectos médicos específicos.",purpose:"Puede ofrecer un espacio de pausa, percepción corporal y descanso. La experiencia concreta depende de la técnica utilizada y de lo que se acuerde previamente.",session:"Se conversa sobre maniobras, intensidad, zonas y preferencias. Durante el encuentro podés comunicar cualquier incomodidad y solicitar ajustes.",audience:"Puede interesar a quienes desean explorar otra modalidad de masaje. Si tenés lesiones, dolor persistente, embarazo o alguna condición de salud, consultá previamente.",faqs:[{question:"¿Necesito experiencia?",answer:"No. La propuesta puede conversarse desde cero y adaptarse a tus preferencias."},{question:"¿Es un tratamiento para el dolor?",answer:"No debe considerarse tratamiento médico. Ante dolor persistente o intenso, consultá a un profesional de salud."}]},
"masaje-descontracturante":{what:"Es una modalidad de masaje que suele enfocarse en zonas donde la persona percibe tensión o rigidez. La presión y las maniobras varían; por eso es importante conversar qué resulta cómodo.",purpose:"Puede ser una experiencia de bienestar para detenerse, prestar atención a las sensaciones y recibir contacto en áreas que sentís cargadas por las actividades cotidianas. No diagnostica ni resuelve por sí sola la causa de un dolor.",session:"Se acuerdan zonas, presión tolerable y cuidados necesarios. Podés hablar, pedir una pausa, modificar la intensidad o detener el masaje.",audience:"Puede interesar a quienes buscan una experiencia corporal focalizada. Ante dolor nuevo, intenso o persistente, lesión aguda o inflamación, consultá a un profesional de salud.",faqs:[{question:"¿Un masaje más fuerte es mejor?",answer:"No. La intensidad no debe provocar dolor ni malestar. No es necesario soportar molestias."},{question:"¿Tengo que indicar dónde siento tensión?",answer:"Podés señalar las zonas que te gustaría conversar; eso ayuda a acordar la sesión, pero no reemplaza una evaluación clínica."}]},
"masaje-relajante":{what:"El masaje relajante suele utilizar maniobras suaves, continuas y un ritmo tranquilo. El entorno, la temperatura y la comodidad también forman parte de la experiencia.",purpose:"Puede acompañar un momento de descanso y desconexión de las exigencias diarias. La intención es ofrecer bienestar corporal, sin prometer resultados sobre estrés, sueño o condiciones de salud.",session:"Se conversa sobre preferencias, presión, zonas a incluir o evitar y sensibilidades. La sesión se desarrolla a un ritmo acordado y podés pedir cambios en cualquier momento.",audience:"Puede interesar a quienes desean regalarse un momento de calma y contacto corporal respetuoso. Si tenés una condición de salud, lesión o sensibilidad particular, comentalo antes.",faqs:[{question:"¿Puedo quedarme en silencio?",answer:"Sí. Podés descansar en silencio o conversar si lo preferís."},{question:"¿Qué ropa tengo que llevar?",answer:"Consultá con Marina al reservar para conocer las indicaciones concretas de la modalidad."}]},
"masaje-con-pindas":{what:"Las pindas son saquitos de tela que pueden contener hierbas u otros materiales y se incorporan en determinadas prácticas de masaje. Según la modalidad, pueden utilizarse templadas y acompañar maniobras de contacto.",purpose:"Puede resultar atractiva para quienes disfrutan de experiencias sensoriales que combinan contacto, textura, temperatura y, si corresponde, aromas. No deben atribuirse propiedades medicinales a sus materiales.",session:"Se conversa sobre materiales, temperatura, aromas, alergias y sensibilidad de la piel. Cualquier aplicación debe probarse con cuidado y ajustarse a tu comodidad.",audience:"Puede interesar a quienes buscan una experiencia corporal diferente. Si tenés alergias, asma, piel sensible, embarazo o alteraciones de sensibilidad o circulación, consultá previamente.",faqs:[{question:"¿Las pindas tienen hierbas aromáticas?",answer:"Su contenido puede variar. Preguntá qué materiales se utilizan, especialmente si tenés alergias o sensibilidad a fragancias."},{question:"¿Se aplican calientes?",answer:"Depende de la modalidad. La temperatura debe explicarse y comprobarse antes del contacto."}]},
"masaje-con-bambu":{what:"El masaje con bambú incorpora piezas de bambú como herramientas para realizar movimientos de contacto y deslizamiento sobre el cuerpo. El tamaño de las piezas y la presión pueden variar.",purpose:"Puede ofrecer una experiencia corporal distinta para quienes desean explorar otras formas de contacto y movimiento. No elimina toxinas ni garantiza cambios físicos.",session:"Se acuerdan zonas, presión y características de las herramientas. Marina debe explicar cómo se utilizarán y comprobar que la sensación resulte cómoda.",audience:"Puede interesar a personas que buscan una modalidad diferente. Si tenés fragilidad ósea, várices dolorosas, lesión o alteraciones de sensibilidad, consultá antes.",faqs:[{question:"¿Se utiliza mucha presión?",answer:"No necesariamente. La presión debe adaptarse a tus preferencias y nunca producir dolor."},{question:"¿Puedo elegir las zonas?",answer:"Sí. Las zonas y los límites se conversan antes y se respetan durante la sesión."}]},
"masaje-piedras-calientes":{what:"Esta modalidad incorpora piedras templadas como parte del contacto y de las maniobras del masaje. La temperatura es central y debe controlarse cuidadosamente.",purpose:"Puede ser una experiencia sensorial para quienes disfrutan de la sensación de calor y buscan un momento de descanso. El calor no debe presentarse como tratamiento de lesiones o enfermedades.",session:"Se consulta por sensibilidad, circulación, embarazo y condiciones de salud. La temperatura se comprueba con prudencia y se ajusta durante la sesión; podés pedir retirar las piedras en cualquier momento.",audience:"Puede interesar a quienes toleran bien el calor. Consultá previamente si tenés diabetes con neuropatía, alteraciones de sensibilidad, problemas circulatorios, lesiones cutáneas o embarazo.",faqs:[{question:"¿Las piedras están muy calientes?",answer:"Deben estar templadas a una temperatura segura y comprobarse antes del contacto. Avisá si sentís demasiado calor."},{question:"¿Es recomendable para cualquiera?",answer:"No. Algunas condiciones requieren evitar el calor o consultar previamente con un profesional de salud."}]},
"masaje-californiano":{what:"El masaje californiano se caracteriza habitualmente por movimientos amplios, fluidos y continuos que recorren distintas zonas del cuerpo. La continuidad del contacto y el ritmo pausado son rasgos distintivos.",purpose:"Puede invitar a registrar el cuerpo de manera global y disfrutar de una experiencia de contacto sostenido y respetuoso. No implica resultados terapéuticos garantizados.",session:"Se conversa sobre tipo de contacto, zonas que preferís incluir o evitar, presión y límites. Podés pedir pausas o cambios cuando los necesites.",audience:"Puede interesar a quienes disfrutan de masajes de movimientos amplios y continuos. Si el contacto prolongado te resulta incómodo, podés conversarlo y elegir otra modalidad.",faqs:[{question:"¿Qué lo diferencia de un masaje relajante?",answer:"Suele distinguirse por sus movimientos largos y fluidos y por una continuidad mayor del contacto."},{question:"¿Puedo evitar algunas zonas?",answer:"Sí. Tus preferencias y límites se acuerdan antes y se respetan durante toda la sesión."}]},
"yoga":{what:"El yoga consciente propone explorar posturas, movimientos, respiración y atención. No se trata de alcanzar una postura perfecta: la práctica puede adaptarse a diferentes experiencias y posibilidades corporales.",purpose:"Puede ofrecer un momento para moverse con atención, observar la respiración y desarrollar una relación más consciente con las sensaciones. Cada persona vive la práctica de manera diferente.",session:"El encuentro puede incluir movimientos, posturas, pausas y relajación. Se invita a respetar los propios límites, utilizar variantes y descansar cuando sea necesario.",audience:"Puede interesar tanto a personas principiantes como a quienes ya tienen experiencia. Contale a Marina si tenés lesiones, dolor, embarazo o alguna condición que requiera adaptar movimientos.",faqs:[{question:"¿Necesito ser flexible?",answer:"No. La flexibilidad no es un requisito y la práctica puede adaptarse a principiantes."},{question:"¿Puedo participar si tengo una lesión?",answer:"Depende de la lesión y de las indicaciones de tu profesional de salud. Conversalo antes para evaluar adaptaciones."}]},
"respiracion-consciente":{what:"Son ejercicios de atención a la respiración y relajación que invitan a observar el aire, el ritmo respiratorio y las sensaciones presentes. No todas las técnicas son adecuadas para todas las personas.",purpose:"Puede servir como una pausa para registrar cómo estás y explorar formas suaves de dirigir la atención al presente. No se busca controlar la respiración a la fuerza.",session:"Se explica cada ejercicio y se avanza gradualmente. Podés respirar naturalmente, abrir los ojos, cambiar de postura o detenerte si aparece incomodidad.",audience:"Puede interesar a quienes desean incorporar pausas de atención y relajación. Si tenés afecciones respiratorias, antecedentes de pánico o una condición médica relevante, consultá antes.",faqs:[{question:"¿Hay que respirar profundo?",answer:"No necesariamente. Muchas prácticas comienzan observando la respiración natural. No fuerces inhalaciones ni retenciones."},{question:"¿Qué hago si me mareo?",answer:"Interrumpí el ejercicio, volvé a respirar naturalmente y avisá. La práctica debe detenerse ante mareo o malestar."}]},
"arteterapia":{what:"Arte y expresión es un espacio de exploración creativa que puede utilizar colores, imágenes, trazos, formas y distintos materiales. No se trata de producir una obra perfecta ni de demostrar habilidad artística.",purpose:"Crear puede ofrecer otros lenguajes para expresar ideas, recuerdos, preguntas o emociones. El proceso creativo puede abrir asociaciones, sin que cada imagen tenga un significado fijo o universal.",session:"Se propone una consigna o exploración libre con materiales. Luego, si la persona lo desea, puede conversar sobre lo que hizo. La interpretación no se impone desde afuera.",audience:"Puede interesar a personas curiosas por la creatividad y la expresión, incluso sin experiencia. El encuadre y la edad a la que se dirige la propuesta deben confirmarse con Marina.",faqs:[{question:"¿Tengo que saber dibujar?",answer:"No. No se evalúa la técnica ni el resultado. Lo importante es explorar el proceso a tu manera."},{question:"¿Es lo mismo que psicoterapia?",answer:"No necesariamente. Esta página describe una propuesta creativa y de bienestar; el encuadre clínico debe explicitarse por separado si correspondiera."}]},
"reiki":{what:"Reiki es una práctica de origen japonés que se inscribe en una tradición de trabajo energético. Una sesión suele desarrollarse en un ambiente tranquilo, con la persona sentada o recostada y una modalidad de contacto o no contacto acordada.",purpose:"Quienes lo eligen suelen buscar un momento de quietud, atención y bienestar subjetivo. Las sensaciones varían y no constituyen evidencia de cambios médicos o energéticos medibles.",session:"Antes se explica cómo se desarrolla la práctica y se acuerda si habrá contacto físico. Podés elegir una modalidad sin contacto, hacer preguntas o detener el encuentro.",audience:"Puede interesar a personas con curiosidad por prácticas de tradición energética como experiencia complementaria de bienestar. No reemplaza atención médica ni psicológica.",faqs:[{question:"¿Tengo que creer en la energía?",answer:"No. Podés acercarte con curiosidad y decidir si la experiencia te resulta cómoda."},{question:"¿El Reiki cura enfermedades?",answer:"No hay evidencia suficiente para considerarlo un tratamiento de enfermedades. No reemplaza diagnósticos ni atención profesional."}]},
"aromaterapia":{what:"La aromaterapia utiliza aromas, con frecuencia procedentes de aceites esenciales, como parte de una experiencia sensorial. La elección del aroma y la forma de exposición importan tanto como las preferencias personales.",purpose:"Puede acompañar un momento de bienestar ambiental y exploración de los sentidos. Los aromas pueden resultar agradables para algunas personas y molestos para otras; no se deben prometer efectos médicos.",session:"Se consulta por alergias, asma, migrañas, embarazo y sensibilidad a fragancias. El uso de aromas es opcional. Los aceites esenciales no deben ingerirse ni aplicarse puros sobre la piel.",audience:"Puede interesar a quienes disfrutan de experiencias olfativas. Si tenés asma, alergias o sensibilidad química, conversá alternativas sin difusión.",faqs:[{question:"¿Es obligatorio usar aceites esenciales?",answer:"No. El uso de aromas debe ser opcional y se puede realizar la experiencia sin fragancias."},{question:"¿Los aceites esenciales son inocuos por ser naturales?",answer:"No. Pueden causar irritación, alergias o molestias respiratorias. Requieren precauciones y dilución adecuada."}]},
"exploracion-interior":{what:"Exploración interior reúne propuestas simbólicas y de reflexión personal, como registros, regresiones, biodescodificación, prácticas de inspiración chamánica y lecturas de cartas. Cada una tiene supuestos y métodos diferentes.",purpose:"Algunas personas se acercan para poner en palabras preguntas, revisar relatos o explorar símbolos. La experiencia puede funcionar como disparador de reflexión, pero sus interpretaciones no son hechos comprobados ni diagnósticos.",session:"Se conversa sobre la práctica elegida, sus límites y tus expectativas. La participación es voluntaria y podés no responder preguntas, rechazar un ejercicio o detener el encuentro.",audience:"Puede interesar a personas adultas con curiosidad por enfoques simbólicos o espirituales. Ante malestar psicológico intenso o trauma, priorizá acompañamiento profesional basado en evidencia.",faqs:[{question:"¿Estas prácticas predicen qué va a pasar?",answer:"No permiten predecir el futuro con certeza. Las lecturas simbólicas pueden abrir preguntas, pero las decisiones siguen siendo tuyas."},{question:"¿Reemplazan una consulta de salud?",answer:"No. No diagnostican ni tratan enfermedades y no sustituyen atención médica o psicológica."}]},
"regresiones":{what:"Las regresiones suelen utilizar relajación, visualización o imaginación guiada para explorar escenas e imágenes subjetivas. Lo que aparece puede ser una construcción imaginativa y no debe interpretarse automáticamente como recuerdo real.",purpose:"Puede plantearse como experiencia de exploración narrativa o simbólica. No es un método validado para recuperar recuerdos exactos ni verificar acontecimientos del pasado.",session:"Se conversa sobre el encuadre y las expectativas. La persona conserva el control, puede mantener los ojos abiertos, rechazar una consigna o detener el ejercicio.",audience:"No es apropiada para todas las situaciones. Ante trauma, disociación, crisis o malestar intenso, consultá con un profesional de salud mental antes de considerar ejercicios de este tipo.",faqs:[{question:"¿Lo que aparece es un recuerdo verdadero?",answer:"No necesariamente. Las imágenes pueden surgir de imaginación, sugestión o asociaciones y no son prueba de hechos."},{question:"¿Puedo detener la experiencia?",answer:"Sí. La participación es voluntaria y el ejercicio debe detenerse si aparece angustia o incomodidad."}]},
"registros":{what:"Los registros, tal como se ofrecen en algunas tradiciones espirituales, son una práctica de consulta simbólica e introspectiva. Las creencias sobre su naturaleza pertenecen a ese marco espiritual y no son hechos verificables científicamente.",purpose:"Algunas personas los utilizan para reflexionar sobre preguntas, transiciones o decisiones personales. Pueden funcionar como disparadores de conversación, preservando el propio criterio y autonomía.",session:"Se parte de una pregunta o tema que quieras explorar. Antes se explica el enfoque, qué tipo de devolución se ofrece y cuáles son sus límites. No es necesario aceptar una interpretación como verdad.",audience:"Puede interesar a personas adultas con curiosidad por prácticas espirituales. No es un recurso para tomar decisiones médicas, legales o económicas ni sustituye asesoramiento profesional.",faqs:[{question:"¿Las respuestas son comprobables?",answer:"No. Es una práctica espiritual e interpretativa, no información verificable ni herramienta diagnóstica."},{question:"¿Puedo consultar por decisiones importantes?",answer:"Podés llevar preguntas para reflexionar, pero la práctica no debe decidir por vos ni reemplazar asesoramiento especializado."}]},
"biodescodificacion":{what:"La biodescodificación es un enfoque alternativo que propone relacionar síntomas o enfermedades con conflictos emocionales. Estas asociaciones no cuentan con respaldo científico suficiente y no forman parte de la medicina basada en evidencia.",purpose:"Si se aborda como conversación simbólica, puede servir para explorar relatos y significados personales, pero nunca para explicar la causa de una enfermedad ni responsabilizar a alguien por su padecimiento.",session:"Debe aclararse que no se realizarán diagnósticos ni indicaciones médicas. Cualquier conversación debe ser respetuosa, sin imponer interpretaciones ni atribuir culpas.",audience:"Quien tenga síntomas o enfermedad debe consultar a profesionales de salud. Esta práctica no debe utilizarse para decidir tratamientos, suspender medicación ni reemplazar psicoterapia.",faqs:[{question:"¿Las emociones causan enfermedades específicas?",answer:"No hay evidencia sólida para asignar enfermedades a conflictos emocionales específicos. Evitá explicaciones simplistas o culpabilizantes."},{question:"¿Puedo dejar un tratamiento?",answer:"No. Nunca suspendas ni modifiques un tratamiento indicado sin hablar con tu equipo de salud."}]},
"chamanismo":{what:"Las prácticas de inspiración chamánica reúnen tradiciones espirituales y rituales diversas. Su significado depende de la cultura y del contexto del que provienen; no existe una única práctica universal.",purpose:"En un encuadre contemporáneo y respetuoso, pueden proponerse como experiencias simbólicas, contemplativas o de conexión con la naturaleza. Sus interpretaciones no deben presentarse como hechos.",session:"La propuesta, los elementos utilizados y el sentido de cada actividad deben explicarse antes. La participación es voluntaria y no debe incluir sustancias ni prácticas riesgosas.",audience:"Puede interesar a personas adultas con curiosidad por prácticas rituales o espirituales. Cualquier actividad con ayuno, sustancias, privación de sueño o esfuerzo físico requiere especial cautela y no debe realizarse sin condiciones seguras.",faqs:[{question:"¿Todas las prácticas chamánicas son iguales?",answer:"No. Existen tradiciones culturales diferentes. Es importante conocer qué práctica concreta se ofrece y de dónde proviene."},{question:"¿Es un tratamiento de salud?",answer:"No debe presentarse como tratamiento médico o psicológico ni sustituir atención profesional."}]},
"lectura-de-cartas-y-tarot":{what:"La lectura de cartas y tarot utiliza imágenes y símbolos como disparadores de interpretación y conversación. Distintas tradiciones les atribuyen significados, pero esas lecturas son subjetivas y no constituyen predicciones verificables.",purpose:"Puede servir como invitación a mirar una pregunta desde otros ángulos, explorar asociaciones y ordenar inquietudes. No determina el futuro ni reemplaza el criterio personal.",session:"Podés acercarte con una pregunta o simplemente curiosidad. Se explica el enfoque de la lectura y se comparten interpretaciones como posibilidades para reflexionar, nunca como instrucciones que debas obedecer.",audience:"Puede interesar a personas adultas que disfrutan del lenguaje simbólico. No es un recurso para tomar decisiones médicas, legales o financieras ni sustituye asesoramiento.",faqs:[{question:"¿El tarot predice el futuro?",answer:"No hay evidencia de que pueda predecir hechos con certeza. La lectura se plantea como experiencia simbólica e interpretativa."},{question:"¿Tengo que llevar una pregunta?",answer:"No. Podés llevar una inquietud concreta o acercarte con curiosidad y conversar sobre el enfoque."}]}
};

const pageForSlug = (slug: string) => practicePages.find((page) => page.slug === slug);
const pageUrl = (slug: string) => `/practicas/${slug}`;
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
  const related = practicePages.filter((item) => item.group === page.group && item.slug !== page.slug);
  const guide = practiceGuides[page.slug];
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="announcement"><span className="tiny-star">✳</span> Un espacio para volver a vos <span className="announcement-dot">·</span> Cuerpo · Energía · Emoción</div>
    <header className="header">
      <a className="brand" href="/" aria-label="Luz de Orión, inicio"><span className="brand-mark"><span>✳</span><i /></span><span className="brand-name">luz de <b>ori<em>ó</em>n</b></span></a>
      <nav className="nav practice-nav" aria-label="Navegación principal"><a href="/#filosofia">El espacio</a><a href="/#terapias">Prácticas</a><a href="/#marina">Sobre Marina</a><a className="nav-cta" href={wa(`Hola Marina, quisiera conocer más sobre ${page.title}.`)} target="_blank" rel="noreferrer">Hablemos <span>↗</span></a></nav>
    </header>
    <main id="contenido" className="practice-page">
      <div className="practice-breadcrumb"><a href="/">Inicio</a><span> / </span><a href="/#terapias">Prácticas</a><span> / </span><span>{page.title}</span></div>
      <section className="practice-hero">
        <div className="practice-hero-copy"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title.split(" ").slice(0,-1).join(" ")} <i>{page.title.split(" ").slice(-1).join("")}</i></h1><p className="practice-lead">{page.lead}</p><p className="body-copy">{page.intro}</p><p className="practice-modality-note">Los encuentros pueden ser presenciales u online. Consultá con Marina qué formato está disponible para esta práctica.</p><a className="button button-dark" href={wa(`Hola Marina, quisiera consultar por ${page.title}.`)} target="_blank" rel="noreferrer">Consultar por esta práctica <span>↗</span></a></div>
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
      <section className="practice-cta"><p className="eyebrow">LUZ DE ORIÓN · MARINA</p><h2>¿Querés conocer más<br/><i>sobre esta propuesta?</i></h2><p>Podés escribirle a Marina y conversar sobre la experiencia.</p><a className="button button-light" href={wa(`Hola Marina, me interesa conocer más sobre ${page.title}.`)} target="_blank" rel="noreferrer">Conversar por WhatsApp <span>↗</span></a></section>
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
          <div className="hero-grain" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line"/> UN MOMENTO PARA VOS</p>
            <h1>Volver a vos.<br/><i>Habitar</i> tu luz.</h1>
            <p className="hero-lead">Un espacio amable para hacer una pausa, escuchar el cuerpo y explorar prácticas de bienestar a tu ritmo.</p>
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
            <p className="eyebrow">UN ESPACIO DE BIENESTAR</p>
            <h2>Hay momentos en los que necesitamos <i>hacer silencio</i> para volver a escucharnos.</h2>
            <p className="body-copy">Luz de Orión es un espacio para bajar un poco el ritmo, escuchar cómo estás y acercarte a distintas prácticas de bienestar. Podés explorar el sonido, el movimiento, la creatividad y los aromas con curiosidad, sin apuro y a tu manera.</p>
            <p className="body-copy">No hace falta llegar con respuestas ni experiencia previa. Cada propuesta empieza conversando sobre lo que te resulta cómodo y lo que necesitás hoy.</p>
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
              <div className="service-top"><span>{s.n} / 06</span><span className="service-icon" aria-hidden="true"><ServiceIcon kind={s.n} /></span></div>
              <div className={`service-visual service-visual-${s.n}`} aria-hidden="true"><ServiceArtwork slug={s.slug}/></div>
              <p className="service-tag">{s.tag}</p><h3>{s.title}</h3><p className="service-text">{s.text}</p>
              <div className="service-links"><a href={pageUrl(s.slug)} aria-label={"Conocer " + s.title}>Ver propuesta <span aria-hidden="true">↗</span></a>{s.n === "05" && <a href={pageUrl("aromaterapia")} aria-label="Conocer aromaterapia">Aromaterapia <span aria-hidden="true">↗</span></a>}</div>
            </article>)}
          </div>
          <p className="service-footnote">Modalidad presencial y online. Consultá con Marina para conocer cómo se adapta cada propuesta y elegir la que te resulte cómoda.</p>
        </section>

        <section className="marina-section" id="marina">
          <div className="marina-art reveal"><img className="marina-portrait" src="/images/marina.webp" alt="Marina en un jardín, sosteniendo una pequeña flor junto a su rostro" loading="lazy" decoding="async"/><span className="portrait-caption">PRESENCIA · ESCUCHA · CREACIÓN</span></div>
          <div className="marina-copy reveal"><p className="eyebrow">UN POCO SOBRE MARINA</p><h2>Un camino que se construye <i>con presencia.</i></h2><p className="body-copy">Soy Marina, profesora de yoga y facilitadora de distintas prácticas de bienestar integral. En Luz de Orión reúno herramientas corporales, sonoras, creativas y energéticas para ofrecerte un espacio de encuentro y exploración personal.</p><p className="body-copy">Me interesa especialmente el trabajo con el arte y los cuencos sonoros: dos lenguajes que invitan a experimentar, sentir y conectar más allá de las palabras.</p><p className="modality-note">Hay opciones presenciales y online. Consultá con Marina cuál modalidad está disponible para la práctica que te interesa.</p><a className="button button-dark" href={wa("Hola Marina, me gustaría conocerte y conversar sobre tus propuestas.")} target="_blank" rel="noreferrer">Conectar con Marina <span>↗</span></a></div>
        </section>

        <GeneralFaq />

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
