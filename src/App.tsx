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
const pageForSlug = (slug: string) => practicePages.find((page) => page.slug === slug);
const pageUrl = (slug: string) => `/practicas/${slug}`;
let bowlAudioContext: AudioContext | null = null;
function playBowlSound() {
  try {
    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) return;
    bowlAudioContext ??= new AudioContextConstructor();
    const context = bowlAudioContext;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.32, now + 0.025);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);
    master.connect(context.destination);
    [174.61, 349.8, 523.9, 698.7, 1048].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const partial = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.detune.setValueAtTime(index % 2 === 0 ? -3 : 3, now);
      partial.gain.value = [0.72, 0.22, 0.105, 0.055, 0.022][index];
      oscillator.connect(partial);
      partial.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 4.25);
    });
    const noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.09), context.sampleRate);
    const channel = noiseBuffer.getChannelData(0);
    for (let i = 0; i < channel.length; i++) channel[i] = (Math.random() * 2 - 1) * (1 - i / channel.length);
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const tap = context.createGain();
    filter.type = "bandpass";
    filter.frequency.value = 1350;
    filter.Q.value = 0.8;
    tap.gain.setValueAtTime(0.0001, now);
    tap.gain.exponentialRampToValueAtTime(0.12, now + 0.004);
    tap.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
    noise.buffer = noiseBuffer;
    noise.connect(filter);
    filter.connect(tap);
    tap.connect(context.destination);
    noise.start(now);
    noise.stop(now + 0.09);
  } catch {
    // Si el navegador bloquea el audio, el resto de la experiencia sigue funcionando.
  }
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
  }, [page]);
  const related = practicePages.filter((item) => item.group === page.group && item.slug !== page.slug);
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
        <div className="practice-hero-copy"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title.split(" ").slice(0,-1).join(" ")} <i>{page.title.split(" ").slice(-1).join("")}</i></h1><p className="practice-lead">{page.lead}</p><p className="body-copy">{page.intro}</p><a className="button button-dark" href={wa(`Hola Marina, quisiera consultar por ${page.title}.`)} target="_blank" rel="noreferrer">Consultar por esta práctica <span>↗</span></a></div>
        <div className="practice-hero-art" aria-hidden="true"><div className="practice-art-orbit"/><div className="practice-art-orbit second"/><span>✳</span><small>CUERPO · ENERGÍA · EMOCIÓN</small></div>
      </section>
      <section className="practice-content"><p className="eyebrow">UN ESPACIO PARA VOS</p><h2>Una experiencia que se construye <i>a tu manera.</i></h2><div className="practice-detail-grid">{page.details.map((detail,index)=><article className="practice-detail-card" key={detail}><span>0{index+1}</span><p>{detail}</p></article>)}</div><p className="practice-note">{page.note}</p></section>
      {related.length>0 && <section className="related-practices"><p className="eyebrow">TAMBIÉN PODÉS EXPLORAR</p><div>{related.map((item)=><a key={item.slug} href={pageUrl(item.slug)}>{item.title}<span>↗</span></a>)}</div></section>}
      <section className="practice-cta"><p className="eyebrow">LUZ DE ORIÓN · MARINA</p><h2>¿Querés conocer más<br/><i>sobre esta propuesta?</i></h2><p>Podés escribirle a Marina y conversar sobre la experiencia.</p><a className="button button-light" href={wa(`Hola Marina, me interesa conocer más sobre ${page.title}.`)} target="_blank" rel="noreferrer">Conversar por WhatsApp <span>↗</span></a></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="/"><span className="brand-mark"><span>✳</span><i/></span><span className="brand-name">luz de <b>ori<em>ó</em>n</b></span></a><p>Cuerpo · Energía · Emoción</p><a href={wa("Hola Marina, llegué desde la web de Luz de Orión.")} target="_blank" rel="noreferrer">Hablemos por WhatsApp ↗</a><span className="copyright">© {new Date().getFullYear()} Luz de Orión · Un espacio para volver a vos.</span></footer>
    <a className="floating-whatsapp" href={wa(`Hola Marina, quisiera recibir información sobre ${page.title}.`)} target="_blank" rel="noreferrer" aria-label="Contactar a Marina por WhatsApp"><span>✳</span> Hablemos</a>
  </>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
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
                {active === 0 ? <button className="sound-bowl-button" type="button" onClick={(event) => { playBowlSound(); const button = event.currentTarget; button.classList.remove("is-playing"); void button.offsetWidth; button.classList.add("is-playing"); window.setTimeout(() => button.classList.remove("is-playing"), 1200); }} aria-label="Reproducir sonido del cuenco tibetano"><SoundArtwork /><span>Tocá el cuenco para escuchar</span></button> : active === 1 ? <ArtArtwork /> : <YogaArtwork />}
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
            {services.map((s) => <article className="service-card reveal" key={s.n}><div className="service-top"><span>{s.n} / 06</span><span className="service-icon" aria-hidden="true"><ServiceIcon kind={s.n} /></span></div><p className="service-tag">{s.tag}</p><h3>{s.title}</h3><p className="service-text">{s.text}</p><a href={pageUrl(["cuencos-sonoros","masajes-integrales","yoga","arteterapia","reiki","exploracion-interior"][Number(s.n)-1])} aria-label={"Conocer " + s.title}>↗</a></article>)}
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
