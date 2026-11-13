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
- **Textos de la home** (sobre Marina y preguntas frecuentes) están copiados en `scripts/prerender.mjs` (constante `HOME`). Si cambian en `src/App.tsx`, actualizarlos también allí.
- **JSON-LD.** Home: `WebSite`, `WebPage`, `HealthAndBeautyBusiness` (Luz de Orión), `Person` (Marina) y `FAQPage`. Prácticas: `WebPage`, `Service` (con `provider` hacia el negocio), `BreadcrumbList` y `FAQPage`. FAQPage ya no genera resultados enriquecidos en Google; se mantiene porque describe contenido visible y ayuda a los asistentes de IA.
- **Archivos generados en el build:** `sitemap.xml` (home + 20 prácticas, `lastmod` = último commit de `src/data.ts`), `llms-full.txt` y `404.html` (estática, `noindex`; Vercel la sirve con estado 404 para rutas inexistentes).
- **Archivos estáticos en `public/`:** `robots.txt` (permite todo, con permiso explícito a crawlers de IA), `llms.txt` (resumen en español para IA; el build falla si falta el enlace a alguna práctica), `og-image.png` (1200×630), íconos y `site.webmanifest`.
- **Vercel** (`vercel.json`): sirve los archivos prerenderizados con `cleanUrls` y `trailingSlash: false`; no hay reescritura general a `index.html`, así que una ruta inexistente devuelve 404 real. Si se agrega una ruta nueva en la app, hay que prerenderizarla en `scripts/prerender.mjs`.

### Datos pendientes de Marina

Nada de esto se inventó; se agrega al sitio, al JSON-LD (`homeLd()` en `scripts/prerender.mjs`, ver el `TODO`) y a `public/llms.txt` cuando esté confirmado:

- [ ] Ciudad o zona donde atiende (y si viaja a domicilio: zonas cubiertas → `areaServed`).
- [ ] ¿Dirección pública de atención, sí o no? Si atiende en su casa, no publicarla; usar zona de servicio.
- [ ] Días y horarios de atención (`openingHoursSpecification`).
- [ ] Valores o rango de precios (`priceRange` / `offers`).
- [ ] Duración de cada práctica.
- [ ] Modalidad por práctica: presencial, online o ambas.
- [ ] Formación, títulos o certificaciones que quiera mostrar (yoga, Reiki, masajes, etc.).
- [ ] Apellido o nombre profesional, si quiere usarlo.
- [ ] Instagram, Facebook, YouTube u otros perfiles (`sameAs`).
- [ ] Perfil de Google Business (crear o reclamar; misma información de nombre, teléfono y zona).
- [ ] Dominio propio (al cambiarlo, actualizar `SITE` en `scripts/prerender.mjs`, `index.html`, `public/robots.txt`, `public/llms.txt` y la URL canónica de `src/App.tsx`).
- [ ] Fotos propias del espacio para la imagen Open Graph y las páginas de prácticas.

## Contenido

La página principal incluye experiencias interactivas: una grabación real de cuenco que solo suena al activarla, con control de volumen y detención; una pausa de respiración opcional; y una selección aromática imaginada. La propuesta de aromas es visual; no difunde fragancias. Las animaciones respetan la preferencia del sistema por reducir el movimiento. La composición usa la proporción áurea como guía flexible para las columnas principales.

Grabación del cuenco: [SingingBowl1.ogg](https://commons.wikimedia.org/wiki/File:SingingBowl1.ogg), de BambooBeast, publicada en dominio público.

La web presenta las prácticas compartidas por Marina: terapia vibracional con cuencos sonoros, masajes, yoga, aromaterapia, arteterapia, Reiki, regresiones y registros, biodescodificación, prácticas de chamanismo, respiración consciente, relajación y lecturas de orientación y tarot.

No se agregaron títulos profesionales, certificaciones, testimonios, direcciones, horarios ni precios que no hayan sido proporcionados.
