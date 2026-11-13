import { useId } from "react";
import type { PracticePageData } from "../data";

/* Line-art illustrations drawn in starlight on the night palette.
   Every stroke that carries class "draw" + pathLength=1 can be traced by GSAP. */

const GOLD = "#EAC57E";
const MOON = "#B9BCD6";
const ROSE = "#E3A99E";
const LILAC = "#A99BD6";

function Halo({ id, color = GOLD, r = 210 }: { id: string; color?: string; r?: number }) {
  return <>
    <defs><radialGradient id={id}><stop offset="0" stopColor={color} stopOpacity=".28" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
    <circle cx="260" cy="260" r={r} fill={`url(#${id})`} />
  </>;
}

export function SoundArtwork() {
  const id = useId().replace(/:/g, "");
  return <svg className="art art-sound" viewBox="0 0 520 520" role="img" aria-label="Un cuenco sonoro con ondas concéntricas de resonancia">
    <Halo id={`h${id}`} />
    <g className="sound-waves" fill="none" stroke={MOON} strokeWidth="1.1">
      <circle className="draw" pathLength={1} cx="260" cy="262" r="118" opacity=".55" />
      <circle className="draw" pathLength={1} cx="260" cy="262" r="160" opacity=".4" />
      <circle className="draw" pathLength={1} cx="260" cy="262" r="202" opacity=".28" strokeDasharray="3 9" />
    </g>
    <g fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path className="draw" pathLength={1} d="M164 268C172 350 214 372 260 372C306 372 348 350 356 268" />
      <ellipse className="draw" pathLength={1} cx="260" cy="268" rx="96" ry="19" />
      <ellipse className="draw" pathLength={1} cx="260" cy="268" rx="80" ry="11" opacity=".5" />
      <path className="draw" pathLength={1} d="M226 384H294" opacity=".7" />
    </g>
    <path className="draw" pathLength={1} d="M338 206L404 140" stroke={ROSE} strokeWidth="7" strokeLinecap="round" />
    <g fill={GOLD}><circle cx="260" cy="58" r="2.5" /><circle cx="440" cy="190" r="2" /><circle cx="86" cy="330" r="2.5" /></g>
  </svg>;
}

export function ArtArtwork() {
  return <svg className="art art-paint" viewBox="0 0 520 520" role="img" aria-label="Trazos de color que componen una obra abstracta">
    <circle cx="260" cy="260" r="206" fill="none" stroke={MOON} strokeOpacity=".2" />
    <path className="draw" pathLength={1} d="M112 304C106 182 214 92 314 122C390 144 422 220 382 286" fill="none" stroke={ROSE} strokeWidth="30" strokeLinecap="round" opacity=".85" />
    <path className="draw" pathLength={1} d="M136 366C206 430 330 404 386 322" fill="none" stroke={LILAC} strokeWidth="18" strokeLinecap="round" opacity=".85" />
    <path className="draw" pathLength={1} d="M170 142Q246 216 350 182" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
    <path d="M206 212C240 172 310 182 326 230C344 284 290 334 238 308C200 290 186 246 206 212Z" fill={GOLD} opacity=".22" />
    <g fill={GOLD}><circle cx="146" cy="222" r="4" /><circle cx="360" cy="130" r="3" /><circle cx="330" cy="392" r="4" /><circle cx="106" cy="340" r="2.5" /></g>
  </svg>;
}

export function YogaArtwork() {
  return <svg className="art art-yoga" viewBox="0 0 520 520" role="img" aria-label="Figura sentada en postura de yoga rodeada por un ciclo respiratorio">
    <g fill="none" stroke={MOON} strokeWidth="1.1">
      <circle className="draw breath-ring" pathLength={1} cx="260" cy="258" r="150" opacity=".5" />
      <circle className="draw" pathLength={1} cx="260" cy="258" r="196" opacity=".3" strokeDasharray="3 10" />
    </g>
    <g fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path className="draw" pathLength={1} d="M260 196Q228 228 210 274Q194 312 150 330" />
      <path className="draw" pathLength={1} d="M260 196Q292 228 310 274Q326 312 370 330" />
      <path className="draw" pathLength={1} d="M208 280Q206 336 260 360Q314 336 312 280" />
      <path className="draw" pathLength={1} d="M150 392Q260 424 370 392" />
    </g>
    <circle cx="260" cy="160" r="22" fill="none" stroke={GOLD} strokeWidth="2.4" />
    <path className="draw" pathLength={1} d="M104 258Q78 228 104 198M416 258Q442 228 416 198" fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" />
  </svg>;
}

export function MassageArtwork() {
  return <svg className="art art-body" viewBox="0 0 520 520" aria-hidden="true">
    <g fill="none" stroke={MOON} strokeWidth="1.1">
      <ellipse className="draw" pathLength={1} cx="260" cy="260" rx="80" ry="150" opacity=".5" />
      <ellipse className="draw" pathLength={1} cx="260" cy="260" rx="126" ry="182" opacity=".35" />
      <ellipse className="draw" pathLength={1} cx="260" cy="260" rx="172" ry="206" opacity=".22" />
    </g>
    <path className="draw" pathLength={1} d="M170 304C208 222 312 222 350 304M192 334C220 284 300 284 328 334" fill="none" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="260" cy="222" r="16" fill={ROSE} opacity=".8" />
  </svg>;
}

export function EnergyArtwork() {
  const id = useId().replace(/:/g, "");
  return <svg className="art art-energy" viewBox="0 0 520 520" aria-hidden="true">
    <Halo id={`h${id}`} r={200} />
    <g fill="none" stroke={MOON} strokeWidth="1.1">
      {[70, 112, 158, 198].map((r, i) => <circle key={r} className="draw" pathLength={1} cx="260" cy="260" r={r} opacity={0.55 - i * 0.1} />)}
    </g>
    <path className="draw" pathLength={1} d="M260 202C218 202 192 230 192 264C192 302 225 336 260 376C295 336 328 302 328 264C328 230 302 202 260 202Z" fill="none" stroke={ROSE} strokeWidth="2.2" />
    <circle cx="260" cy="262" r="6" fill={GOLD} />
  </svg>;
}

export function BotanicalArtwork() {
  return <svg className="art art-botanical" viewBox="0 0 520 520" aria-hidden="true">
    <circle cx="260" cy="260" r="200" fill="none" stroke={MOON} strokeOpacity=".3" />
    <g fill="none" stroke={GOLD} strokeWidth="2" strokeLinejoin="round">
      <path className="draw" pathLength={1} d="M260 412V178" strokeLinecap="round" />
      <path className="draw" pathLength={1} d="M260 330C168 316 134 256 155 189C227 204 266 248 260 330Z" />
      <path className="draw" pathLength={1} d="M260 274C346 256 377 197 351 134C279 153 244 199 260 274Z" />
      <path className="draw" pathLength={1} d="M260 194C205 163 195 117 219 75C266 101 282 140 260 194Z" />
    </g>
    <circle cx="260" cy="262" r="5" fill={ROSE} />
  </svg>;
}

export function ExplorationArtwork() {
  return <svg className="art art-explore" viewBox="0 0 520 520" aria-hidden="true">
    <g fill="none" stroke={MOON} strokeWidth="1.1">
      <ellipse className="draw" pathLength={1} cx="260" cy="260" rx="168" ry="74" transform="rotate(-35 260 260)" opacity=".5" />
      <ellipse className="draw" pathLength={1} cx="260" cy="260" rx="168" ry="74" transform="rotate(35 260 260)" opacity=".5" />
      <circle className="draw" pathLength={1} cx="260" cy="260" r="100" opacity=".35" />
    </g>
    <path className="draw" pathLength={1} d="M260 178L276 236L334 244L286 270L300 328L260 294L220 328L234 270L186 244L244 236Z" fill="none" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
    <g fill={GOLD}><circle cx="110" cy="180" r="3.5" /><circle cx="398" cy="324" r="3" /><circle cx="354" cy="122" r="2.5" /></g>
  </svg>;
}

export function PracticeArtwork({ page }: { page: PracticePageData }) {
  if (page.group === "sonido") return <SoundArtwork />;
  if (page.group === "cuerpo") return <MassageArtwork />;
  if (page.group === "movimiento") return <YogaArtwork />;
  if (page.group === "creatividad") return <ArtArtwork />;
  if (page.slug === "aromaterapia") return <BotanicalArtwork />;
  if (page.group === "energia") return <EnergyArtwork />;
  return <ExplorationArtwork />;
}

export function ServiceIcon({ kind, className }: { kind: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, JSX.Element> = {
    "01": <><path d="M5 15.5h14l-1.5 3h-11z" /><path d="M7 15.5c.7-2.5 2.5-4 5-4s4.3 1.5 5 4" /><path d="M12 3v3M5.6 5.6l2.1 2.1M18.4 5.6l-2.1 2.1" /><path d="M3 11c1.2-1.2 2.3-1.2 3.5 0M17.5 11c1.2-1.2 2.3-1.2 3.5 0" /></>,
    "02": <><path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" /><path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95" /><path d="m2 15 6 6" /><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" /></>,
    "03": <><circle cx="12" cy="5" r="1" /><path d="m9 20 3-6 3 6" /><path d="m6 8 6 2 6-2" /><path d="M12 10v4" /></>,
    "04": <><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /></>,
    "05": <><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" /><circle cx="12" cy="8" r="2" /><path d="M12 10v12" /><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" /><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" /></>,
    "06": <><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></>,
  };
  return <svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" {...common}>{paths[kind] || paths["01"]}</svg>;
}
