# Luz de Orión

Sitio web de Marina: un espacio cálido para explorar prácticas de bienestar, sonido, movimiento, creatividad y aromas. Construido con React, TypeScript y Vite.

## Ejecutar localmente

- Requisitos: Node.js 18 o superior y npm.
- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev`
- Compilar: `npm run build` (incluye `tsc`, `vite build` y el prerender estático de `scripts/prerender.mjs`)
- Vista previa: `npm run preview`

La compilación de producción genera `dist/`.

## Publicar en Vercel

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Personalización

- Contenido de servicios y prácticas, y teléfono de WhatsApp: `src/data.ts`; textos y estructura de la home: `src/App.tsx`
- Estilos, paleta, responsive y animaciones: `src/styles.css`
- Metadatos SEO base de la home: `index.html` (bloque entre `<!-- seo:start -->` y `<!-- seo:end -->`)
- Prerender, JSON-LD, sitemap y `llms-full.txt`: `scripts/prerender.mjs`
- Imagen Open Graph e íconos: `npm run assets` (`scripts/brand-assets.mjs`, requiere Playwright)

El acceso a WhatsApp de Marina está configurado en el componente principal. Si cambia el número, actualizar la constante `phone` en `src/data.ts` y `PHONE_E164`/`PHONE_DISPLAY` en `scripts/prerender.mjs` (y `public/llms.txt`).

## SEO y búsqueda con IA

URL canónica: `https://luzdeorion.vercel.app` (sin barra final en las prácticas: `/practicas/<slug>`).

- **Prerender estático.** Después de `vite build`, `scripts/prerender.mjs` lee `src/data.ts` (sin modificarlo) y escribe un HTML por ruta: `dist/index.html` y `dist/practicas/<slug>/index.html` (más una copia `dist/practicas/<slug>.html`). Cada página trae su `<title>`, descripción, canonical, Open Graph, Twitter y JSON-LD, y un bloque de contenido legible dentro de `#root` (título, introducción, qué es, cómo es un encuentro, preguntas frecuentes y enlace a WhatsApp). React reemplaza ese bloque al montar; los buscadores y asistentes de IA que no ejecutan JavaScript ven el texto real.
- **Textos de la home** (intro, sobre Marina, preguntas frecuentes, pasos y datos de la sesión) viven en `src/data.ts` y los usan tanto la app como `scripts/prerender.mjs`.
- **Búsqueda local.** Títulos de práctica con el formato `<práctica> en Río Ceballos | Luz de Orión` (ver `SEO_NAME` y `seoTitle()` en `scripts/prerender.mjs`); descripciones, encabezado y pie con la misma entidad: Luz de Orión · Marina · Río Ceballos, Córdoba (zona Ñu Porá, Sierras Chicas) · WhatsApp +54 9 3546 52-5509. Mantener exactamente estos datos en todos los perfiles externos.
- **Contenido citable para IA.** La home prerenderizada abre con una frase definitoria (`DEFINITION`), un bloque «Datos clave» (`KEY_FACTS`) y la definición de sesión integrativa; cada práctica tiene una frase local (`practiceDefinition()`). Las mismas frases están en `llms.txt` y `llms-full.txt`.
- **JSON-LD.** Home: `WebSite`, `WebPage`, `HealthAndBeautyBusiness` (Luz de Orión, solo localidad en la dirección, sin `geo`), `Service` «Sesión integrativa de bienestar holístico», `Person` (Marina) y `FAQPage`. Prácticas: `WebPage`, `Service` (con `provider` hacia el negocio e `isRelatedTo` hacia la sesión integrativa), `BreadcrumbList` de 3 niveles (Inicio › Herramientas › práctica, igual que la ruta visible) y `FAQPage`. Sin reseñas ni `aggregateRating` (no hay reseñas publicadas) y sin `openingHoursSpecification` (no hay franja horaria fija). FAQPage ya no genera resultados enriquecidos en Google; se mantiene porque describe contenido visible y ayuda a los asistentes de IA.
- **Archivos generados en el build:** `sitemap.xml` (home + 20 prácticas, `lastmod` = último commit de `src/data.ts` o `scripts/prerender.mjs`; la home incluye la foto de Marina), `llms-full.txt` y `404.html` (estática, `noindex`; Vercel la sirve con estado 404 para rutas inexistentes).
- **Archivos estáticos en `public/`:** `robots.txt` (permite todo, con permiso explícito a crawlers de IA), `llms.txt` (resumen en español para IA; el build falla si falta el enlace a alguna práctica), `og-image.png` (1200×630), íconos y `site.webmanifest`.
- **Vercel** (`vercel.json`): sirve los archivos prerenderizados con `cleanUrls` y `trailingSlash: false`; no hay reescritura general a `index.html`, así que una ruta inexistente devuelve 404 real. Si se agrega una ruta nueva en la app, hay que prerenderizarla en `scripts/prerender.mjs`.

### Datos pendientes de Marina

Nada de esto se inventó; se agrega al sitio, al JSON-LD (`homeLd()` en `scripts/prerender.mjs`, ver el `TODO`) y a `public/llms.txt` cuando esté confirmado:

- [x] Zona: Río Ceballos, Córdoba, zona Ñu Porá. Atiende en su casa, en un espacio propio con camilla.
- [x] Dirección: no se publica (solo localidad en el JSON-LD; la dirección se pasa al coordinar el turno).
- [x] Días: lunes a viernes con turno a coordinar (sin franja horaria fija, por eso no hay `openingHoursSpecification`).
- [ ] Valores o rango de precios (`priceRange` / `offers`): Marina todavía los está definiendo.
- [x] Duración: sesiones integrativas de 1 h 30 a 2 h.
- [x] Modalidad: presencial. Pendiente confirmar si el tarot o una primera entrevista podrían ser online.
- [ ] Formación, títulos o certificaciones que quiera mostrar (yoga, Reiki, masajes, etc.).
- [ ] Apellido o nombre profesional, si quiere usarlo.
- [ ] Instagram, Facebook, YouTube u otros perfiles (`sameAs`).
- [ ] Perfil de Google Business (crear o reclamar; misma información de nombre, teléfono y zona).
- [ ] Dominio propio (al cambiarlo, actualizar `SITE` en `scripts/prerender.mjs`, `index.html`, `public/robots.txt`, `public/llms.txt` y la URL canónica de `src/App.tsx`).
- [x] Testimonios: Marina prefiere no publicarlos.
- [ ] Fotos: por ahora solo ilustraciones; más adelante, fotos profesionales del espacio.
- [ ] Confirmar qué prácticas del índice siguen apareciendo (las sesiones son integrativas; no se ofrecen técnicas sueltas).

### Próximos pasos SEO fuera del sitio

Lo que más pesa en la búsqueda local y en las respuestas de IA está fuera de la web. Usar siempre el mismo nombre (Luz de Orión), la misma zona (Río Ceballos, Córdoba · Sierras Chicas) y el mismo WhatsApp.

1. **Perfil de Empresa de Google (Google Business Profile).** Crearlo con la categoría más cercana (por ejemplo «Centro de bienestar» o «Terapeuta holístico») y el WhatsApp. Como la dirección no se publica, configurarlo como empresa de área de servicio con la dirección oculta y Río Ceballos como zona. Nota: Google pide mostrar la dirección cuando la gente va al lugar; ocultarla protege la privacidad pero reduce la visibilidad en Maps. Es una decisión de Marina. Agregar descripción, servicios (sesión integrativa, masaje relajante y energético, terapia sonora con cuencos, arte y expresión), fotos del espacio y el enlace al sitio.
2. **Google Search Console.** Verificar `https://luzdeorion.vercel.app` (o el dominio propio), enviar `sitemap.xml` y pedir indexación de la home y de las prácticas principales.
3. **Bing Webmaster Tools.** Importar desde Search Console y enviar el sitemap. La búsqueda de ChatGPT y Copilot se apoya en el índice de Bing. Opcional: Bing Places con los mismos datos.
4. **Instagram (y otras redes).** Bio con «Bienestar holístico en Río Ceballos, Córdoba», enlace al sitio y el WhatsApp. Cuando existan perfiles, agregarlos a `sameAs` en `homeLd()` (`scripts/prerender.mjs`).
5. **Listados consistentes.** Directorios locales de Sierras Chicas o de bienestar en Córdoba, con exactamente los mismos datos. Menciones en medios o blogs locales ayudan a que la IA reconozca la entidad.
6. **Reseñas.** Si en algún momento Marina decide pedirlas, que sean en el Perfil de Google. No se marcan en el sitio con datos estructurados mientras no haya reseñas reales visibles.
7. **Dominio propio.** Conviene para la marca y para la confianza; al cambiarlo, seguir la lista de «Datos pendientes» y redirigir el dominio de Vercel.
8. **Medición.** Probar cada tanto en ChatGPT, Perplexity, Gemini y Google consultas como «masajes en Río Ceballos», «terapia con cuencos en Sierras Chicas» o «bienestar holístico en Río Ceballos» y anotar si aparece Luz de Orión y qué fuente citan.

## Contenido

La página principal incluye experiencias interactivas: una grabación real de cuenco que solo suena al activarla, con control de volumen y detención; una pausa de respiración opcional; y una selección aromática imaginada. La propuesta de aromas es visual; no difunde fragancias. Las animaciones respetan la preferencia del sistema por reducir el movimiento. La composición usa la proporción áurea como guía flexible para las columnas principales.

Grabación del cuenco: [SingingBowl1.ogg](https://commons.wikimedia.org/wiki/File:SingingBowl1.ogg), de BambooBeast, publicada en dominio público.

La web presenta las prácticas compartidas por Marina: terapia vibracional con cuencos sonoros, masajes, yoga, aromaterapia, arteterapia, Reiki, regresiones y registros, biodescodificación, prácticas de chamanismo, respiración consciente, relajación y lecturas de orientación y tarot.

No se agregaron títulos profesionales, certificaciones, testimonios, direcciones, horarios ni precios que no hayan sido proporcionados.
