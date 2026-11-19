// Prerender estático post-build para buscadores y asistentes de IA.
//
// Corre después de `vite build` (ver "build" en package.json). Lee el contenido
// de src/data.ts (sin modificarlo), toma dist/index.html como plantilla y genera:
//   - dist/index.html                     (home con metadatos, JSON-LD y contenido estático)
//   - dist/practicas/<slug>/index.html    (una página por práctica)
//   - dist/404.html                       (página 404 estática, noindex)
//   - dist/sitemap.xml                    (home + prácticas, con lastmod)
//   - dist/llms-full.txt                  (todo el contenido en texto plano para IA)
//
// El contenido estático va dentro de <div id="root">: React (createRoot) lo
// reemplaza al montar, así que las personas ven la app y los bots sin JS ven texto real.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { transformWithEsbuild } from "vite";

const SITE = "https://luzdeorion.vercel.app";
const BRAND = "Luz de Orión";
const PHONE_E164 = "+5493546525509";
const PHONE_DISPLAY = "+54 9 3546 52-5509";
const OG_IMAGE = `${SITE}/og-image.png`;
const BUSINESS_ID = `${SITE}/#negocio`;
const PERSON_ID = `${SITE}/#marina`;
const WEBSITE_ID = `${SITE}/#sitio`;
const SESSION_ID = `${SITE}/#sesion-integrativa`;
const OG_IMAGE_ALT = `${BRAND}: bienestar holístico con Marina en Río Ceballos, Córdoba. Constelación de Orión en un cielo índigo que amanece.`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// ---------- Datos ----------
async function loadData() {
  const file = path.join(root, "src/data.ts");
  const src = await readFile(file, "utf8");
  const { code } = await transformWithEsbuild(src, file, { loader: "ts", format: "esm", target: "node18" });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}
const { practicePages, practiceGuides, wa, place, sessionFacts, sessionSteps, homeIntro, homeAbout, homeFaqs } = await loadData();

// Textos de la home: vienen de src/data.ts (misma fuente que usa la app).
const HOME = {
  h1: `Luz de Orión: bienestar holístico con Marina en ${place.city}, Sierras Chicas`,
  intro: homeIntro,
  about: homeAbout,
  faqs: homeFaqs,
  title: `Luz de Orión · Bienestar holístico en ${place.short}`,
  description: `Sesiones integrativas con Marina en ${place.city} (Sierras Chicas, Córdoba): masaje relajante y energético, cuencos y arte. Lunes a viernes con turno por WhatsApp.`,
};

// Frase definitoria, citable tal cual por buscadores y asistentes de IA (misma redacción en llms.txt).
const DEFINITION = `${BRAND} es el espacio de bienestar holístico de Marina, profesora de yoga y facilitadora de bienestar holístico, en ${place.city}, Córdoba, Argentina (zona ${place.zone}, Sierras Chicas). Ofrece sesiones integrativas y presenciales de 1 h 30 a 2 h que combinan, según cada persona, masaje relajante y energético, terapia sonora con cuencos, arte y expresión y otras prácticas.`;
const SESSION_DEFINITION = "Una sesión integrativa es un encuentro de bienestar que no se arma con una sola técnica: primero se conversa y después Marina propone, con acuerdo de la persona, qué herramientas combinar ese día.";

// "Datos clave": bloque de hechos verificables (home prerenderizada y llms-full.txt).
const KEY_FACTS = [
  ["Nombre", BRAND],
  ["Quién atiende", "Marina, profesora de yoga y facilitadora de bienestar holístico"],
  ["Dónde", `Presencial en ${place.city}, Córdoba, Argentina, zona ${place.zone} (Sierras Chicas), en un espacio propio con camilla. La dirección exacta se informa al coordinar el turno.`],
  ["Qué ofrece", "Sesiones integrativas de bienestar holístico (no técnicas sueltas)"],
  ["Herramientas principales", "Masaje relajante y energético, terapia sonora con cuencos, arte y expresión (arteterapia) y otras prácticas"],
  ["Duración", "Entre 1 h 30 y 2 h"],
  ["Días", "De lunes a viernes, con turno"],
  ["Valor", "Se informa por WhatsApp"],
  ["Turnos y consultas", `WhatsApp ${PHONE_DISPLAY}`],
  ["Encuadre", "Acompañamiento holístico complementario; no reemplaza la atención médica ni psicológica"],
];

// Títulos SEO de las prácticas: "<práctica> en Río Ceballos | Luz de Orión" (únicos, ~60 caracteres).
// Algunas prácticas usan el nombre con el que la gente las busca.
const SEO_NAME = {
  "cuencos-sonoros": "Terapia sonora con cuencos",
  "masajes-integrales": "Masaje relajante y energético",
  arteterapia: "Arte y expresión (arteterapia)",
  "respiracion-consciente": "Respiración consciente",
};
const seoTitle = (page) => `${SEO_NAME[page.slug] ?? page.title} en ${place.city} | ${BRAND}`;
const seoDescription = (page) => {
  const base = `${page.lead.replace(/\.?$/, ".")} ${page.title} como parte de una sesión integrativa con Marina en ${place.short}.`;
  const withCta = `${base} Turnos por WhatsApp.`;
  return truncate(withCta.length <= 158 ? withCta : base);
};

const GROUPS = {
  sonido: "Sonido y escucha",
  cuerpo: "Cuerpo y masajes",
  movimiento: "Movimiento y respiración",
  creatividad: "Arte y creatividad",
  energia: "Energía y sentidos",
  exploracion: "Exploración interior y prácticas simbólicas",
};
const groupLabel = (g) => GROUPS[g] ?? "Prácticas";

// ---------- Utilidades ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const urlFor = (slug) => (slug ? `${SITE}/practicas/${slug}` : `${SITE}/`);
const truncate = (s, max = 158) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
};
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function lastModified() {
  try {
    const iso = execSync("git log -1 --format=%cI -- src/data.ts scripts/prerender.mjs", { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (iso) return iso.slice(0, 10);
  } catch {}
  return new Date().toISOString().slice(0, 10);
}
const LASTMOD = lastModified();

// ---------- Head ----------
function head({ title, description, url, type = "website", robots = "index,follow,max-image-preview:large,max-snippet:-1", ld = [] }) {
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    url ? `<link rel="canonical" href="${url}" />` : "",
    url ? `<link rel="alternate" hreflang="es-AR" href="${url}" />` : "",
    url ? `<link rel="alternate" hreflang="x-default" href="${url}" />` : "",
    `<meta name="geo.region" content="AR-X" />`,
    `<meta name="geo.placename" content="${esc(place.city)}, ${esc(place.province)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="es_AR" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    ...ld.map(jsonLd),
  ].filter(Boolean).join("\n    ");
}

// Estilos mínimos para el contenido estático (visible solo hasta que monta React o sin JS).
const PRERENDER_STYLE = `<style id="prerender-style">.prerender{max-width:760px;margin:0 auto;padding:32px 16px 64px;font:400 17px/1.65 'DM Sans',system-ui,sans-serif;color:#1b2140;background:#ece8ef}.prerender h1,.prerender h2,.prerender h3{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;line-height:1.2}.prerender h1{font-size:clamp(32px,6vw,52px);margin:.4em 0 .3em}.prerender h2{font-size:clamp(24px,4vw,32px);margin:1.8em 0 .4em}.prerender h3{font-size:19px;margin:1.2em 0 .2em}.prerender a{color:#7a4f16;text-decoration:underline}.prerender header{margin-bottom:28px}.prerender nav{margin:0 0 14px}.prerender nav a{margin-right:12px}.prerender .eyebrow{font-size:12px;letter-spacing:.18em;color:#7a4f16;text-transform:uppercase;margin:0}.prerender .lead{font-size:21px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic}.prerender .note{border-left:3px solid #7a4f16;padding-left:14px;color:#4a5070}.prerender .cta{display:inline-block;margin-top:12px;padding:12px 20px;border-radius:999px;background:#111731;color:#eac57e;text-decoration:none}.prerender ul{padding-left:20px}.prerender footer{margin-top:48px;font-size:14px;color:#4a5070}</style>`;

const brandHeader = `<header><p><a href="/"><strong>${BRAND}</strong></a> · Bienestar holístico en ${place.city}, Sierras Chicas · Cuerpo · Energía · Emoción</p><nav aria-label="Navegación principal"><a href="/#sesion">La sesión</a><a href="/#terapias">Herramientas</a><a href="/#marina">Sobre Marina</a><a href="/#preguntas">Preguntas frecuentes</a><a href="${esc(wa("Hola Marina, llegué desde la web de Luz de Orión."))}">WhatsApp</a></nav></header>`;
const brandFooter = `<footer><p>${BRAND} · Marina, bienestar holístico · ${place.city}, Córdoba, Argentina (zona ${place.zone}, Sierras Chicas) · WhatsApp <a href="https://wa.me/${PHONE_E164.slice(1)}">${PHONE_DISPLAY}</a> · Sesiones presenciales de lunes a viernes con turno.</p><p>Las sesiones son un acompañamiento holístico complementario: no reemplazan diagnósticos, tratamientos ni la atención de profesionales de la salud.</p><p><a href="/llms.txt">Resumen para asistentes de IA</a> · <a href="/sitemap.xml">Mapa del sitio</a></p></footer>`;

// ---------- JSON-LD ----------
const businessRef = { "@type": "HealthAndBeautyBusiness", "@id": BUSINESS_ID, name: BRAND, url: `${SITE}/`, telephone: PHONE_E164 };
// Sin calle ni número a pedido de Marina: solo localidad (la dirección exacta se pasa al coordinar el turno).
const ADDRESS = { "@type": "PostalAddress", addressLocality: place.city, addressRegion: place.province, addressCountry: "AR" };
const CORDOBA = { "@type": "AdministrativeArea", name: `Provincia de ${place.province}`, containedInPlace: { "@type": "Country", name: "Argentina" } };
const AREA_SERVED = [
  { "@type": "City", name: place.city, containedInPlace: CORDOBA },
  { "@type": "Place", name: "Sierras Chicas", description: `Región de ${place.province} donde está ${place.city}.`, containedInPlace: CORDOBA },
];
const sessionRef = { "@id": SESSION_ID };

function homeLd() {
  const knowsAbout = [...new Set(["Bienestar holístico", "Yoga", "Masaje relajante", "Masaje energético", "Terapia sonora con cuencos", "Arteterapia", ...practicePages.map((p) => p.title)])];
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE}/`, name: BRAND, inLanguage: "es-AR", publisher: { "@id": BUSINESS_ID } },
      {
        "@type": "WebPage", "@id": `${SITE}/#webpage`, url: `${SITE}/`, name: HOME.title, description: HOME.description,
        inLanguage: "es-AR", isPartOf: { "@id": WEBSITE_ID }, about: { "@id": BUSINESS_ID }, mainEntity: { "@id": BUSINESS_ID },
        primaryImageOfPage: OG_IMAGE, dateModified: LASTMOD,
      },
      {
        "@type": "HealthAndBeautyBusiness", "@id": BUSINESS_ID, name: BRAND, url: `${SITE}/`,
        description: `${DEFINITION} Turnos de lunes a viernes por WhatsApp. Acompañamiento complementario: no reemplaza la atención médica ni psicológica.`,
        slogan: "Cuerpo · Energía · Emoción",
        address: ADDRESS, areaServed: AREA_SERVED,
        telephone: PHONE_E164, image: [OG_IMAGE, `${SITE}/images/marina.webp`], logo: `${SITE}/icon-512.png`,
        founder: { "@id": PERSON_ID }, employee: { "@id": PERSON_ID },
        knowsAbout, knowsLanguage: "es",
        // TODO: priceRange y sameAs cuando Marina los confirme (ver README). Horario: lunes a viernes con turno, sin franja fija publicada.
        contactPoint: { "@type": "ContactPoint", contactType: "consultas y reservas", telephone: PHONE_E164, url: `https://wa.me/${PHONE_E164.slice(1)}`, availableLanguage: "es" },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Prácticas de bienestar",
          itemListElement: [
            { "@type": "Offer", itemOffered: sessionRef },
            ...practicePages.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": `${urlFor(p.slug)}#servicio`, name: p.title, url: urlFor(p.slug) } })),
          ],
        },
      },
      {
        "@type": "Service", "@id": SESSION_ID, name: "Sesión integrativa de bienestar holístico",
        serviceType: "Sesión integrativa de bienestar holístico", url: `${SITE}/#sesion`,
        description: `${SESSION_DEFINITION} Puede incluir masaje relajante y energético, terapia sonora con cuencos, arte y expresión y respiración. Presencial en ${place.city}, Córdoba; dura entre 1 h 30 y 2 h; turnos de lunes a viernes por WhatsApp.`,
        provider: { "@id": BUSINESS_ID }, areaServed: AREA_SERVED,
        availableChannel: { "@type": "ServiceChannel", serviceUrl: `${SITE}/#sesion`, servicePhone: { "@type": "ContactPoint", telephone: PHONE_E164 }, availableLanguage: "es" },
      },
      {
        "@type": "Person", "@id": PERSON_ID, name: "Marina",
        jobTitle: "Profesora de yoga y facilitadora de bienestar holístico",
        description: `Marina es profesora de yoga y facilitadora de bienestar holístico. Atiende de forma presencial en ${place.city}, Córdoba (zona ${place.zone}, Sierras Chicas), en ${BRAND}.`,
        image: `${SITE}/images/marina.webp`, url: `${SITE}/#marina`, worksFor: { "@id": BUSINESS_ID }, knowsAbout, knowsLanguage: "es",
      },
      {
        "@type": "FAQPage", "@id": `${SITE}/#preguntas`,
        mainEntity: HOME.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
    ],
  };
}

function practiceLd(page, guide, title, description) {
  const url = urlFor(page.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "es-AR", dateModified: LASTMOD,
        isPartOf: { "@id": WEBSITE_ID }, about: { "@id": `${url}#servicio` }, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: OG_IMAGE,
      },
      {
        "@type": "Service", "@id": `${url}#servicio`, name: page.title, serviceType: page.title, category: groupLabel(page.group),
        description: `${guide ? `${page.intro} ${guide.what}` : page.intro} En ${BRAND} se ofrece como parte de una sesión integrativa presencial en ${place.city}, Córdoba.`,
        url, provider: businessRef, areaServed: AREA_SERVED, isRelatedTo: sessionRef,
        availableChannel: { "@type": "ServiceChannel", serviceUrl: url, servicePhone: { "@type": "ContactPoint", telephone: PHONE_E164 } },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Herramientas", item: `${SITE}/#terapias` },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      },
      ...(guide?.faqs?.length ? [{
        "@type": "FAQPage", "@id": `${url}#preguntas`,
        mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      }] : []),
    ],
  };
}

// ---------- Contenido estático ----------
// Encabezado en forma de pregunta (mejor para fragmentos y respuestas de IA).
const WHAT = {
  "cuencos-sonoros": "¿Qué son los cuencos sonoros?", "masajes-integrales": "¿Qué son los masajes integrales?",
  regresiones: "¿Qué son las regresiones?", registros: "¿Qué son los registros?", chamanismo: "¿Qué son las prácticas de chamanismo?",
  reiki: "¿Qué es Reiki?", arteterapia: "¿Qué es Arte y expresión?",
};
const whatHeading = (page) => {
  if (WHAT[page.slug]) return WHAT[page.slug];
  const t = page.title.charAt(0).toLowerCase() + page.title.slice(1);
  return `¿Qué es ${/^(masaje|yoga)/.test(t) ? "el" : "la"} ${t}?`;
};
// Minúscula inicial salvo nombres propios (Reiki).
const lowerFirst = (t) => (/^Reiki/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1));
// Frase local y citable para cada práctica (sin concordancias verbales que dependan del título).
const practiceDefinition = (page) => `En ${BRAND}, Marina puede incluir ${lowerFirst(page.title)} dentro de sus sesiones presenciales de bienestar holístico en ${place.city}, Córdoba (zona ${place.zone}, Sierras Chicas). Las herramientas no se reservan por separado: se combinan después de conversar.`;
function practiceList(pages) {
  return `<ul>${pages.map((p) => `<li><a href="/practicas/${p.slug}">${esc(p.title)}</a>: ${esc(p.lead)}</li>`).join("")}</ul>`;
}

function homeBody() {
  const groups = [...new Set(practicePages.map((p) => p.group))];
  return `<div class="prerender">${brandHeader}<main id="contenido">
<p class="eyebrow">Bienestar holístico en ${esc(place.short)}</p>
<h1>${esc(HOME.h1)}</h1>
<p class="lead">${esc(DEFINITION)}</p>
${HOME.intro.map((t) => `<p>${esc(t)}</p>`).join("\n")}
<section id="datos-clave" aria-labelledby="datos-clave-titulo"><h2 id="datos-clave-titulo">Datos clave de ${BRAND}</h2>
<ul>${KEY_FACTS.map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join("")}</ul></section>
<p><a class="cta" href="${esc(wa("Hola Marina, quiero consultar por tus sesiones."))}">Consultar a Marina por WhatsApp</a></p>
<section id="sesion"><h2>¿Qué es una sesión integrativa y cómo es?</h2><p>${esc(SESSION_DEFINITION)} Cada sesión dura entre 1 h 30 y 2 h y es presencial en ${esc(place.city)}.</p>
<ol>${sessionSteps.map((st) => `<li><strong>${esc(st.title)}.</strong> ${esc(st.text)}</li>`).join("")}</ol>
<ul>${sessionFacts.map((f) => `<li><strong>${esc(f.label)}:</strong> ${esc(f.value)}</li>`).join("")}</ul></section>
<section id="terapias"><h2>Herramientas que pueden integrarse en una sesión</h2>
${groups.map((g) => `<h3>${esc(groupLabel(g))}</h3>${practiceList(practicePages.filter((p) => p.group === g))}`).join("\n")}
<p>No se reserva una técnica suelta: en cada sesión se combinan las que tienen sentido para cada persona.</p></section>
<section id="marina"><h2>Sobre Marina</h2>${HOME.about.map((t) => `<p>${esc(t)}</p>`).join("")}</section>
<section id="preguntas"><h2>Preguntas frecuentes</h2>${HOME.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}</section>
<section><h2>¿Cómo reservar un turno en ${esc(place.city)}?</h2><p>Escribile a Marina por WhatsApp al <a href="https://wa.me/${PHONE_E164.slice(1)}">${PHONE_DISPLAY}</a> para coordinar un turno (de lunes a viernes) y consultar el valor. Consultar no te compromete a reservar.</p></section>
</main>${brandFooter}</div>`;
}

function practiceBody(page, guide) {
  const related = practicePages.filter((p) => p.group === page.group && p.slug !== page.slug);
  const others = related.length ? related : practicePages.filter((p) => p.slug !== page.slug).slice(0, 6);
  const sections = guide ? [
    [whatHeading(page), guide.what],
    ["¿Para qué puede servir?", guide.purpose],
    ["¿Cómo es un encuentro?", guide.session],
    ["¿Para quién es?", guide.audience],
  ] : [];
  return `<div class="prerender">${brandHeader}<main id="contenido">
<nav aria-label="Ruta de navegación"><a href="/">Inicio</a> › <a href="/#terapias">Herramientas</a> › <span aria-current="page">${esc(page.title)}</span></nav>
<p class="eyebrow">${esc(page.eyebrow)}</p>
<h1>${esc(page.title)}</h1>
<p class="lead">${esc(page.lead)}</p>
<p>${esc(practiceDefinition(page))}</p>
<p>${esc(page.intro)}</p>
<ul>${page.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
${sections.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t)}</p>`).join("\n")}
<p class="note">${esc(page.note)}</p>
${guide?.faqs?.length ? `<section><h2>Preguntas frecuentes: ${esc(page.title)}</h2>${guide.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}</section>` : ""}
<section><h2>¿Cómo se integra en una sesión?</h2><p>${esc(page.title)} puede formar parte de una sesión integrativa con Marina: presencial en ${esc(place.long)}, de 1 h 30 a 2 h, con turno de lunes a viernes. Primero se conversa y después se eligen juntas las herramientas. Valor y turnos por WhatsApp; consultar no te compromete a reservar.</p>
<p><a class="cta" href="${esc(wa(`Hola Marina, quisiera recibir información sobre ${page.title}.`))}">Consultar por WhatsApp</a></p></section>
<section><h2>Otras prácticas</h2>${practiceList(others)}<p><a href="/#sesion">Cómo es una sesión en Luz de Orión</a></p></section>
</main>${brandFooter}</div>`;
}

function notFoundBody() {
  return `<div class="prerender">${brandHeader}<main id="contenido">
<p class="eyebrow">Este camino no aparece</p>
<h1>No encontramos esta página</h1>
<p>Puede que el enlace haya cambiado. Podés volver al inicio o elegir una de las prácticas de Luz de Orión.</p>
<p><a class="cta" href="/">Volver a Luz de Orión</a></p>
<h2>Prácticas</h2>${practiceList(practicePages)}
</main>${brandFooter}</div>`;
}

// ---------- Ensamblado ----------
const template = await readFile(path.join(dist, "index.html"), "utf8");
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
const ROOT = /<div id="root"><\/div>/;
if (!SEO_BLOCK.test(template) || !ROOT.test(template)) {
  throw new Error("prerender: dist/index.html no tiene los marcadores <!-- seo:start --> ... <!-- seo:end --> o <div id=\"root\"></div>");
}
function render({ headHtml, body, stripScripts = false }) {
  let html = template
    .replace(SEO_BLOCK, headHtml)
    .replace("</head>", `  ${PRERENDER_STYLE}\n  </head>`)
    .replace(ROOT, `<div id="root">${body}</div>`);
  if (stripScripts) html = html.replace(/\s*<script type="module"[^>]*><\/script>/g, "").replace(/\s*<link rel="modulepreload"[^>]*>/g, "");
  return html;
}

const titles = new Set();
const written = [];
const write = async (rel, html) => {
  const file = path.join(dist, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  written.push(rel);
};

// Home
await write("index.html", render({
  headHtml: head({ title: HOME.title, description: HOME.description, url: `${SITE}/`, ld: [homeLd()] }),
  body: homeBody(),
}));
titles.add(HOME.title);

// Prácticas
for (const page of practicePages) {
  const guide = practiceGuides[page.slug];
  const title = seoTitle(page);
  if (titles.has(title)) throw new Error(`prerender: título duplicado "${title}"`);
  if (title.length > 65) console.warn(`prerender: título largo (${title.length}): "${title}"`);
  titles.add(title);
  const description = seoDescription(page);
  const html = render({
    headHtml: head({ title, description, url: urlFor(page.slug), ld: [practiceLd(page, guide, title, description)] }),
    body: practiceBody(page, guide),
  });
  // Mismo HTML en dos formatos: /practicas/<slug>/index.html y /practicas/<slug>.html.
  // Con "cleanUrls" de Vercel y el preview de Vite, /practicas/<slug> (sin barra final) resuelve siempre a un archivo real.
  await write(`practicas/${page.slug}/index.html`, html);
  await write(`practicas/${page.slug}.html`, html);
}

// 404 (Vercel la sirve con estado 404 para rutas inexistentes)
await write("404.html", render({
  headHtml: head({ title: `Página no encontrada | ${BRAND}`, description: "La página que buscás no existe. Volvé al inicio de Luz de Orión o elegí una práctica.", robots: "noindex,follow" }),
  body: notFoundBody(),
  stripScripts: true,
}));

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${urlFor("")}</loc><lastmod>${LASTMOD}</lastmod><image:image><image:loc>${SITE}/images/marina.webp</image:loc></image:image></url>
${practicePages.map((p) => urlFor(p.slug)).map((loc) => `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod></url>`).join("\n")}
</urlset>
`;
await write("sitemap.xml", sitemap);

// llms-full.txt
const full = [
  `# ${BRAND} — contenido completo`,
  "",
  `> ${DEFINITION} Turnos de lunes a viernes por WhatsApp: ${PHONE_DISPLAY} (https://wa.me/${PHONE_E164.slice(1)}).`,
  "",
  `Sitio: ${SITE}/ · Idioma: español rioplatense (Argentina) · Actualizado: ${LASTMOD}`,
  "",
  "## Datos clave",
  "",
  ...KEY_FACTS.map(([k, v]) => `- ${k}: ${v}`),
  "",
  "Las sesiones no ofrecen técnicas sueltas: primero se conversa y después se combinan herramientas como masaje relajante y energético, terapia sonora con cuencos y arte. Son un acompañamiento holístico complementario y no reemplazan diagnósticos, tratamientos ni la atención de profesionales de la salud. El valor se informa por WhatsApp.",
  "",
  "## Qué es una sesión integrativa y cómo es",
  "",
  SESSION_DEFINITION,
  "",
  ...sessionSteps.map((st, i) => `${i + 1}. ${st.title}: ${st.text}`),
  "",
  ...sessionFacts.map((f) => `- ${f.label}: ${f.value}`),
  "",
  "## Sobre Marina",
  "",
  ...HOME.about,
  "",
  "## Preguntas frecuentes",
  "",
  ...HOME.faqs.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ...practicePages.flatMap((p) => {
    const g = practiceGuides[p.slug];
    return [
      `## ${p.title}`, "", `URL: ${urlFor(p.slug)}`, `Categoría: ${groupLabel(p.group)}`, "", `${p.lead} ${p.intro}`, "",
      practiceDefinition(p), "",
      ...p.details.map((d) => `- ${d}`), "",
      ...(g ? [`### Qué es`, "", g.what, "", `### Para qué puede servir`, "", g.purpose, "", `### Cómo es un encuentro`, "", g.session, "", `### Para quién es`, "", g.audience, "",
        ...g.faqs.flatMap((f) => [`### ${f.question}`, "", f.answer, ""])] : []),
      `Importante: ${p.note}`, "",
    ];
  }),
].join("\n");
await write("llms-full.txt", full);

// ---------- Comprobaciones ----------
const llms = await readFile(path.join(dist, "llms.txt"), "utf8").catch(() => "");
const missing = practicePages.filter((p) => !llms.includes(urlFor(p.slug)));
if (missing.length) throw new Error(`prerender: public/llms.txt no enlaza estas prácticas: ${missing.map((p) => p.slug).join(", ")}`);
for (const rel of written.filter((r) => r.endsWith(".html"))) {
  const html = await readFile(path.join(dist, rel), "utf8");
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
}
console.log(`prerender: ${written.length} archivos generados (${practicePages.length} prácticas en /practicas/<slug>/index.html y /practicas/<slug>.html, lastmod ${LASTMOD}).`);
