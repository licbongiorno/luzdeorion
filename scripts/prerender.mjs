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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// ---------- Datos ----------
async function loadData() {
  const file = path.join(root, "src/data.ts");
  const src = await readFile(file, "utf8");
  const { code } = await transformWithEsbuild(src, file, { loader: "ts", format: "esm", target: "node18" });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}
const { practicePages, practiceGuides, wa } = await loadData();

// Textos de la home que viven en src/App.tsx. Mantener sincronizados si cambian allí.
const HOME = {
  h1: "Luz de Orión: un espacio de bienestar con Marina",
  intro: [
    "Hola, soy Marina. Creé Luz de Orión como un espacio cercano y luminoso donde podamos encontrarnos con tiempo. A través del sonido, el movimiento, la creatividad y otras prácticas de bienestar, te acompaño a hacer una pausa y prestar atención a lo que necesitás hoy.",
    "No hace falta venir con experiencia, respuestas ni una idea clara. Primero conversamos; tus preferencias, comodidad y límites son parte de la propuesta desde el comienzo.",
  ],
  about: [
    "Soy Marina, profesora de yoga y facilitadora de distintas prácticas de bienestar integral. Me gusta recibir a cada persona como llega, escuchar primero y construir juntas un espacio cuidado, sin apuro y con respeto por sus tiempos.",
    "En Luz de Orión reúno propuestas corporales, sonoras, creativas y de exploración. Me conmueven especialmente el arte y los cuencos: maneras distintas de hacer lugar a lo que sentimos, incluso cuando todavía no encontramos las palabras.",
    "Hay opciones presenciales y online. Escribime y vemos juntas qué formato está disponible para la propuesta que te interesa.",
  ],
  faqs: [
    { question: "¿Hay encuentros presenciales y online?", answer: "Sí, hay opciones presenciales y online. Consultá con Marina qué formato está disponible para la práctica que te interesa." },
    { question: "¿Cómo sé qué práctica elegir?", answer: "Podés contarle a Marina qué te interesa, qué buscás y si hay algo que preferís evitar. La consulta sirve para conocer la propuesta antes de decidir." },
    { question: "¿Puedo pedir ajustes o detener una experiencia?", answer: "Sí. Tus preferencias y límites se conversan antes, y podés pedir un cambio o detener la experiencia en cualquier momento." },
    { question: "¿Las prácticas reemplazan la atención médica o psicológica?", answer: "No. Son propuestas de bienestar y exploración; no reemplazan diagnósticos, tratamientos ni el acompañamiento de profesionales de salud." },
    { question: "¿Cómo consulto valores, duración y horarios?", answer: "Escribile a Marina por WhatsApp al +54 9 3546 52-5509. Consultar no te compromete a reservar." },
  ],
  title: "Luz de Orión | Espacio de bienestar con Marina",
  description: "Espacio de bienestar de Marina: cuencos sonoros, masajes, yoga, arte, Reiki, aromaterapia y exploración interior. Presencial y online, consultas por WhatsApp.",
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
    const iso = execSync("git log -1 --format=%cI -- src/data.ts", { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
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
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="es_AR" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${BRAND}, espacio de bienestar con Marina. Constelación de Orión sobre fondo crema." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...ld.map(jsonLd),
  ].filter(Boolean).join("\n    ");
}

// Estilos mínimos para el contenido estático (visible solo hasta que monta React o sin JS).
const PRERENDER_STYLE = `<style id="prerender-style">.prerender{max-width:760px;margin:0 auto;padding:32px 16px 64px;font:400 17px/1.65 'DM Sans',system-ui,sans-serif;color:#293b32;background:#f5f0e7}.prerender h1,.prerender h2,.prerender h3{font-family:'Playfair Display',Georgia,serif;font-weight:500;line-height:1.2}.prerender h1{font-size:clamp(32px,6vw,52px);margin:.4em 0 .3em}.prerender h2{font-size:clamp(24px,4vw,32px);margin:1.8em 0 .4em}.prerender h3{font-size:19px;margin:1.2em 0 .2em}.prerender a{color:#a96f50;text-decoration:underline}.prerender header{margin-bottom:28px}.prerender nav{margin:0 0 14px}.prerender nav a{margin-right:12px}.prerender .eyebrow{font-size:12px;letter-spacing:.18em;color:#b9785c;text-transform:uppercase;margin:0}.prerender .lead{font-size:21px;font-family:'Playfair Display',Georgia,serif;font-style:italic}.prerender .note{border-left:3px solid #b9785c;padding-left:14px;color:#526357}.prerender .cta{display:inline-block;margin-top:12px;padding:12px 20px;border-radius:999px;background:#293b32;color:#f5f0e7;text-decoration:none}.prerender ul{padding-left:20px}.prerender footer{margin-top:48px;font-size:14px;color:#77786d}</style>`;

const brandHeader = `<header><p><a href="/"><strong>${BRAND}</strong></a> · Cuerpo · Energía · Emoción</p><nav aria-label="Navegación principal"><a href="/#terapias">Prácticas</a><a href="/#marina">Sobre Marina</a><a href="/#preguntas">Preguntas frecuentes</a><a href="${esc(wa("Hola Marina, llegué desde la web de Luz de Orión."))}">WhatsApp</a></nav></header>`;
const brandFooter = `<footer><p>${BRAND} · Marina · WhatsApp <a href="https://wa.me/${PHONE_E164.slice(1)}">${PHONE_DISPLAY}</a> · Modalidad presencial y online.</p><p>Las prácticas son propuestas de bienestar y exploración: no reemplazan diagnósticos, tratamientos ni la atención de profesionales de salud.</p><p><a href="/llms.txt">Resumen para asistentes de IA</a> · <a href="/sitemap.xml">Mapa del sitio</a></p></footer>`;

// ---------- JSON-LD ----------
const businessRef = { "@type": "HealthAndBeautyBusiness", "@id": BUSINESS_ID, name: BRAND, url: `${SITE}/`, telephone: PHONE_E164 };

function homeLd() {
  const knowsAbout = practicePages.map((p) => p.title);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE}/`, name: BRAND, inLanguage: "es-AR", publisher: { "@id": BUSINESS_ID } },
      {
        "@type": "WebPage", "@id": `${SITE}/#webpage`, url: `${SITE}/`, name: HOME.title, description: HOME.description,
        inLanguage: "es-AR", isPartOf: { "@id": WEBSITE_ID }, about: { "@id": BUSINESS_ID }, primaryImageOfPage: OG_IMAGE,
      },
      {
        "@type": "HealthAndBeautyBusiness", "@id": BUSINESS_ID, name: BRAND, url: `${SITE}/`,
        description: "Espacio de bienestar de Marina con cuencos sonoros, masajes, yoga consciente, respiración, arte y expresión, Reiki, aromaterapia y prácticas de exploración interior. Modalidad presencial y online.",
        telephone: PHONE_E164, image: OG_IMAGE, logo: `${SITE}/icon-512.png`,
        founder: { "@id": PERSON_ID }, employee: { "@id": PERSON_ID },
        knowsAbout, knowsLanguage: "es",
        // TODO: agregar address / areaServed / geo / openingHoursSpecification / priceRange / sameAs cuando Marina los confirme (ver README).
        contactPoint: { "@type": "ContactPoint", contactType: "consultas y reservas", telephone: PHONE_E164, url: `https://wa.me/${PHONE_E164.slice(1)}`, availableLanguage: "es" },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Prácticas de bienestar",
          itemListElement: practicePages.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": `${urlFor(p.slug)}#servicio`, name: p.title, url: urlFor(p.slug) } })),
        },
      },
      {
        "@type": "Person", "@id": PERSON_ID, name: "Marina",
        jobTitle: "Profesora de yoga y facilitadora de prácticas de bienestar integral",
        image: `${SITE}/images/marina.webp`, url: `${SITE}/#marina`, worksFor: { "@id": BUSINESS_ID }, knowsAbout,
      },
      {
        "@type": "FAQPage", "@id": `${SITE}/#preguntas`,
        mainEntity: HOME.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
    ],
  };
}

function practiceLd(page, guide, description) {
  const url = urlFor(page.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: `${page.title} | ${BRAND}`, description, inLanguage: "es-AR",
        isPartOf: { "@id": WEBSITE_ID }, about: { "@id": `${url}#servicio` }, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: OG_IMAGE,
      },
      {
        "@type": "Service", "@id": `${url}#servicio`, name: page.title, serviceType: page.title, category: groupLabel(page.group),
        description: guide ? `${page.intro} ${guide.what}` : page.intro, url, provider: businessRef,
        availableChannel: { "@type": "ServiceChannel", serviceUrl: url, servicePhone: { "@type": "ContactPoint", telephone: PHONE_E164 } },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: page.title, item: url },
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
function practiceList(pages) {
  return `<ul>${pages.map((p) => `<li><a href="/practicas/${p.slug}">${esc(p.title)}</a>: ${esc(p.lead)}</li>`).join("")}</ul>`;
}

function homeBody() {
  const groups = [...new Set(practicePages.map((p) => p.group))];
  return `<div class="prerender">${brandHeader}<main id="contenido">
<p class="eyebrow">Un espacio de bienestar</p>
<h1>${esc(HOME.h1)}</h1>
${HOME.intro.map((t) => `<p>${esc(t)}</p>`).join("\n")}
<p><a class="cta" href="${esc(wa("Hola Marina, quiero consultar por tus sesiones."))}">Consultar a Marina por WhatsApp</a></p>
<section id="terapias"><h2>Prácticas de bienestar en Luz de Orión</h2>
${groups.map((g) => `<h3>${esc(groupLabel(g))}</h3>${practiceList(practicePages.filter((p) => p.group === g))}`).join("\n")}
<p>Modalidad presencial y online. Consultá con Marina cómo se adapta cada propuesta y elegí la que te resulte cómoda.</p></section>
<section id="marina"><h2>Sobre Marina</h2>${HOME.about.map((t) => `<p>${esc(t)}</p>`).join("")}</section>
<section id="preguntas"><h2>Preguntas frecuentes</h2>${HOME.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}</section>
<section><h2>¿Cómo reservar o consultar?</h2><p>Escribile a Marina por WhatsApp al <a href="https://wa.me/${PHONE_E164.slice(1)}">${PHONE_DISPLAY}</a> para conocer modalidades, duración, valores y próximos horarios. Consultar no te compromete a reservar.</p></section>
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
<nav aria-label="Ruta de navegación"><a href="/">${BRAND}</a> › <a href="/#terapias">Prácticas</a> › <span aria-current="page">${esc(page.title)}</span></nav>
<p class="eyebrow">${esc(page.eyebrow)}</p>
<h1>${esc(page.title)}</h1>
<p class="lead">${esc(page.lead)}</p>
<p>${esc(page.intro)}</p>
<ul>${page.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
${sections.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t)}</p>`).join("\n")}
<p class="note">${esc(page.note)}</p>
${guide?.faqs?.length ? `<section><h2>Preguntas frecuentes: ${esc(page.title)}</h2>${guide.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}</section>` : ""}
<section><h2>¿Querés conocer más sobre esta propuesta?</h2><p>Preguntale a Marina por modalidad (presencial u online), duración, valor y próximos horarios. Consultar no te compromete a reservar.</p>
<p><a class="cta" href="${esc(wa(`Hola Marina, quisiera recibir información sobre ${page.title}.`))}">Consultar por WhatsApp</a></p></section>
<section><h2>Otras prácticas</h2>${practiceList(others)}<p><a href="/#terapias">Ver todas las prácticas de Luz de Orión</a></p></section>
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
  const title = `${page.title} | ${BRAND}`;
  if (titles.has(title)) throw new Error(`prerender: título duplicado "${title}"`);
  titles.add(title);
  const description = truncate(`${page.lead} ${page.intro}`);
  const html = render({
    headHtml: head({ title, description, url: urlFor(page.slug), ld: [practiceLd(page, guide, description)] }),
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[urlFor(""), ...practicePages.map((p) => urlFor(p.slug))].map((loc) => `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod></url>`).join("\n")}
</urlset>
`;
await write("sitemap.xml", sitemap);

// llms-full.txt
const full = [
  `# ${BRAND} — contenido completo`,
  "",
  `> ${BRAND} es el espacio de bienestar de Marina, profesora de yoga y facilitadora de prácticas de bienestar integral, en Argentina. Modalidad presencial y online. Consultas y reservas por WhatsApp: ${PHONE_DISPLAY} (https://wa.me/${PHONE_E164.slice(1)}).`,
  "",
  "Las prácticas son propuestas de bienestar y exploración. No reemplazan diagnósticos, tratamientos ni la atención de profesionales de salud. Valores, duración y horarios se informan por WhatsApp.",
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
