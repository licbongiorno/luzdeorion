// Genera los recursos de marca estáticos en public/ (imagen Open Graph, íconos).
// Uso manual (no corre en el build de Vercel): `npm run assets`
// Requiere Playwright con Chromium (npx playwright install chromium).
import { createRequire } from "node:module";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  // Fallback a la instalación global
  const { execSync } = await import("node:child_process");
  const globalRoot = execSync("npm root -g").toString().trim();
  playwright = require(path.join(globalRoot, "playwright"));
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");

// Paleta "de la noche al amanecer" (misma que src/styles.css).
const C = { night: "#111731", night2: "#1b2243", night3: "#262e57", starlight: "#eac57e", starSoft: "#f3ddb0", moon: "#b9bcd6", rose: "#e3a99e", lilac: "#a99bd6", mist: "#ece8ef" };

// Cinturón y figura de Orión, estilizados (coordenadas en un lienzo 600x600)
const stars = [
  [180, 90, 7], [420, 110, 9], // Betelgeuse / Bellatrix (hombros)
  [270, 300, 6], [305, 290, 7], [340, 280, 6], // Cinturón
  [200, 510, 6], [440, 500, 9], // Saiph / Rigel
  [300, 30, 4], // cabeza
];
const lines = [[0, 7], [7, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]];
const constellation = () => `
  <defs><radialGradient id="glow"><stop offset="0" stop-color="${C.starSoft}" stop-opacity=".9"/><stop offset="1" stop-color="${C.starlight}" stop-opacity="0"/></radialGradient></defs>
  <g stroke="${C.moon}" stroke-width="1.6" opacity=".55" fill="none">
    ${lines.map(([a, b]) => `<line x1="${stars[a][0]}" y1="${stars[a][1]}" x2="${stars[b][0]}" y2="${stars[b][1]}"/>`).join("")}
  </g>
  ${stars.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r * 3.2}" fill="url(#glow)" opacity=".55"/>`).join("")}
  <g fill="${C.starSoft}">${stars.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r * 0.7}"/>`).join("")}</g>
  <g fill="${C.starlight}">${stars.slice(2, 5).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join("")}</g>`;

// Estrellas de fondo deterministas (sin Math.random, para que el resultado sea reproducible).
const dust = Array.from({ length: 90 }, (_, i) => {
  const x = (i * 397) % 1200, y = (i * 211) % 470, r = 0.6 + ((i * 37) % 10) / 10;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#eef0fa" opacity="${0.25 + ((i * 53) % 50) / 100}"/>`;
}).join("");

const fonts = `<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=block" rel="stylesheet">`;

const ogHtml = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:${C.night}}
  .wrap{position:relative;width:1200px;height:630px;font-family:'DM Sans',sans-serif;color:#eef0fa;
    background:linear-gradient(180deg,${C.night} 0%,${C.night2} 48%,${C.night3} 68%,#5b4f86 84%,${C.rose} 100%)}
  svg.dust{position:absolute;inset:0;width:1200px;height:630px}
  .horizon{position:absolute;left:-10%;right:-10%;bottom:-260px;height:420px;border-radius:50%;
    background:radial-gradient(ellipse at 50% 0%,rgba(243,221,176,.55),rgba(227,169,158,.25) 45%,rgba(17,23,49,0) 72%)}
  svg.c{position:absolute;right:80px;top:40px;width:500px;height:500px}
  .copy{position:absolute;left:90px;top:130px;width:640px}
  .eyebrow{font-size:20px;letter-spacing:.3em;color:${C.starlight};font-weight:600;text-transform:uppercase}
  h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:118px;line-height:.95;margin:22px 0 26px;letter-spacing:-.01em}
  h1 i{color:${C.starlight}}
  p{font-size:31px;line-height:1.35;margin:0;color:${C.moon};max-width:600px}
  p strong{color:#eef0fa;font-weight:600}
  .foot{position:absolute;left:90px;bottom:54px;font-size:19px;letter-spacing:.24em;color:${C.night};font-weight:600;text-transform:uppercase}
</style></head><body><div class="wrap">
  <svg class="dust" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">${dust}</svg>
  <div class="horizon"></div>
  <svg class="c" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">${constellation()}</svg>
  <div class="copy">
    <div class="eyebrow">✳ Marina · Sesiones integrativas</div>
    <h1>Luz de <i>Orión</i></h1>
    <p><strong>Bienestar holístico en Río Ceballos</strong>, Sierras Chicas, Córdoba.</p>
  </div>
  <div class="foot">Cuerpo · Energía · Emoción</div>
</div></body></html>`;

// Ícono: estrella de ocho puntas (✳) sobre cielo índigo
const iconSvg = (size = 512, rounded = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
<rect width="64" height="64" ${rounded ? 'rx="32"' : ""} fill="${C.night}"/>
<g stroke="${C.mist}" stroke-width="4" stroke-linecap="round">
<path d="M32 15v34M15 32h34M20 20l24 24M44 20 20 44"/>
</g><circle cx="32" cy="32" r="4.5" fill="${C.starlight}"/>
</svg>`;

const browser = await playwright.chromium.launch();
try {
  await mkdir(pub, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(ogHtml, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(pub, "og-image.png"), type: "png" });

  await writeFile(path.join(pub, "favicon.svg"), iconSvg(64) + "\n");
  for (const [name, size, rounded] of [["apple-touch-icon.png", 180, false], ["icon-192.png", 192, false], ["icon-512.png", 512, false], ["favicon-32x32.png", 32, true]]) {
    const p = await browser.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<html><body style="margin:0;background:transparent">${iconSvg(size, rounded)}</body></html>`);
    await p.screenshot({ path: path.join(pub, name), type: "png", omitBackground: true });
    await p.close();
  }
  console.log("Recursos de marca generados en public/");
} finally {
  await browser.close();
}
