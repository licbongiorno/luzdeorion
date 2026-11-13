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

const C = { paper: "#f5f0e7", cream: "#e9dfcf", deep: "#293b32", clay: "#b9785c", sage: "#8b9b7a", gold: "#d4a77e" };

// Cinturón y figura de Orión, estilizados (coordenadas en un lienzo 600x600)
const stars = [
  [180, 90, 7], [420, 110, 9], // Betelgeuse / Bellatrix (hombros)
  [270, 300, 6], [305, 290, 7], [340, 280, 6], // Cinturón
  [200, 510, 6], [440, 500, 9], // Saiph / Rigel
  [300, 30, 4], // cabeza
];
const lines = [[0, 7], [7, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]];
const constellation = (s = 1) => `
  <g stroke="${C.clay}" stroke-width="${2 / s}" opacity=".75" fill="none">
    ${lines.map(([a, b]) => `<line x1="${stars[a][0]}" y1="${stars[a][1]}" x2="${stars[b][0]}" y2="${stars[b][1]}"/>`).join("")}
  </g>
  <g fill="${C.paper}" stroke="${C.clay}" stroke-width="${2.5 / s}">
    ${stars.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}
  </g>
  <g fill="${C.gold}">${stars.slice(2, 5).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</g>`;

const fonts = `<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600&family=Playfair+Display:ital,wght@0,500;1,500&display=block" rel="stylesheet">`;

const ogHtml = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  html,body{margin:0;width:1200px;height:630px;background:${C.paper};overflow:hidden}
  .wrap{position:relative;width:1200px;height:630px;font-family:'DM Sans',sans-serif;color:${C.deep}}
  .halo{position:absolute;right:-60px;top:-30px;width:690px;height:690px;border-radius:50%;background:radial-gradient(circle,${C.cream} 0%,${C.cream} 55%,rgba(233,223,207,0) 72%)}
  svg.c{position:absolute;right:70px;top:45px;width:540px;height:540px}
  .copy{position:absolute;left:90px;top:150px;width:600px}
  .eyebrow{font-size:20px;letter-spacing:.32em;color:${C.clay};font-weight:600;text-transform:uppercase}
  h1{font-family:'Playfair Display',Georgia,serif;font-weight:500;font-size:104px;line-height:1;margin:26px 0 24px;letter-spacing:-.01em}
  h1 i{color:${C.clay}}
  p{font-size:30px;line-height:1.35;margin:0;color:#3f5047;max-width:520px}
  .foot{position:absolute;left:90px;bottom:62px;font-size:20px;letter-spacing:.24em;color:${C.sage};font-weight:600;text-transform:uppercase}
  .bar{position:absolute;left:0;bottom:0;width:1200px;height:14px;background:${C.deep}}
</style></head><body><div class="wrap">
  <div class="halo"></div>
  <svg class="c" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">${constellation()}</svg>
  <div class="copy">
    <div class="eyebrow">✳ Espacio de bienestar · Marina</div>
    <h1>Luz de <i>Orión</i></h1>
    <p>Cuencos sonoros, masajes, yoga, arte y prácticas para hacer una pausa y volver a vos.</p>
  </div>
  <div class="foot">Cuerpo · Energía · Emoción</div>
  <div class="bar"></div>
</div></body></html>`;

// Ícono: estrella de ocho puntas (✳) sobre círculo verde profundo
const iconSvg = (size = 512, rounded = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
<rect width="64" height="64" ${rounded ? 'rx="32"' : ""} fill="${C.deep}"/>
<g stroke="${C.paper}" stroke-width="4" stroke-linecap="round">
<path d="M32 15v34M15 32h34M20 20l24 24M44 20 20 44"/>
</g><circle cx="32" cy="32" r="4.5" fill="${C.gold}"/>
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
