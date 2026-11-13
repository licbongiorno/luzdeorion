import { useId, useMemo } from "react";

/** Deterministic PRNG so the starfield is identical on every render/visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; r: number; o: number; twinkle: boolean; warm: boolean };

/**
 * A quiet, seeded field of stars. Density thins towards the horizon so the
 * lower part of a night section stays calm behind text.
 */
export function Starfield({ seed = 7, count = 150, className = "" }: { seed?: number; count?: number; className?: string }) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => {
      const y = Math.pow(rand(), 1.45) * 900;
      const big = rand() > 0.93;
      return {
        x: rand() * 1440,
        y,
        r: big ? 1.3 + rand() * 0.9 : 0.45 + rand() * 0.75,
        o: big ? 0.85 : 0.25 + rand() * 0.5,
        twinkle: rand() > 0.82,
        warm: rand() > 0.86,
      };
    });
  }, [seed, count]);
  return (
    <svg className={`starfield ${className}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {stars.map((s, i) => (
        <circle key={i} className={s.twinkle ? "sky-star twinkle" : "sky-star"} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} fill={s.warm ? "#F3D9A6" : "#E4E6F5"} opacity={s.o.toFixed(2)} />
      ))}
    </svg>
  );
}

/* Orion, roughly as seen from the southern hemisphere's evening sky, but kept
   in the familiar orientation (Betelgeuse upper left, Rigel lower right). */
const ORION = {
  meissa: [206, 74],
  betelgeuse: [118, 146],
  bellatrix: [292, 164],
  alnitak: [176, 290],
  alnilam: [207, 274],
  mintaka: [238, 258],
  saiph: [138, 428],
  rigel: [318, 404],
} as const;
type StarName = keyof typeof ORION;
const LINES: [StarName, StarName][] = [
  ["meissa", "betelgeuse"],
  ["meissa", "bellatrix"],
  ["betelgeuse", "alnitak"],
  ["bellatrix", "mintaka"],
  ["alnitak", "alnilam"],
  ["alnilam", "mintaka"],
  ["alnitak", "saiph"],
  ["mintaka", "rigel"],
];
const STAR_STYLE: Record<StarName, { r: number; color: string; glow: number }> = {
  betelgeuse: { r: 6.5, color: "#F4B27A", glow: 34 },
  rigel: { r: 6.5, color: "#E3EAFF", glow: 34 },
  bellatrix: { r: 4.6, color: "#E9ECFF", glow: 20 },
  saiph: { r: 4.2, color: "#E9ECFF", glow: 18 },
  alnitak: { r: 4.6, color: "#F5E6C4", glow: 22 },
  alnilam: { r: 5, color: "#F5E6C4", glow: 24 },
  mintaka: { r: 4.6, color: "#F5E6C4", glow: 22 },
  meissa: { r: 3.4, color: "#E9ECFF", glow: 14 },
};

export function OrionConstellation({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className={`orion ${className}`} viewBox="0 0 420 520" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`glow-${uid}`}>
          <stop offset="0" stopColor="#F6DDA8" stopOpacity=".55" />
          <stop offset=".35" stopColor="#EAC57E" stopOpacity=".16" />
          <stop offset="1" stopColor="#EAC57E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`nebula-${uid}`}>
          <stop offset="0" stopColor="#E7A9A0" stopOpacity=".5" />
          <stop offset="1" stopColor="#9C8FC4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Guide rings: the golden-ratio circles that echo the mandala motif */}
      <g className="orion-rings" fill="none" stroke="#B9BCD6" strokeWidth=".8">
        <circle className="draw" pathLength={1} cx="214" cy="270" r="200" opacity=".22" />
        <circle className="draw" pathLength={1} cx="214" cy="270" r="124" opacity=".18" strokeDasharray="2 7" />
      </g>
      <ellipse className="orion-nebula" cx="204" cy="350" rx="26" ry="34" fill={`url(#nebula-${uid})`} />
      <g className="orion-lines" fill="none" stroke="#EAC57E" strokeWidth="1.1" strokeLinecap="round" opacity=".75">
        {LINES.map(([a, b]) => (
          <line key={`${a}-${b}`} className="draw" pathLength={1} x1={ORION[a][0]} y1={ORION[a][1]} x2={ORION[b][0]} y2={ORION[b][1]} />
        ))}
      </g>
      <g className="orion-sword" fill="#E9ECFF">
        <circle cx="200" cy="322" r="1.6" opacity=".8" />
        <circle cx="204" cy="346" r="2.2" opacity=".9" />
        <circle cx="203" cy="368" r="1.5" opacity=".7" />
      </g>
      {(Object.keys(ORION) as StarName[]).map((name) => {
        const [x, y] = ORION[name];
        const s = STAR_STYLE[name];
        return (
          <g key={name} className={`orion-star orion-${name}`} transform={`translate(${x} ${y})`}>
            <circle r={s.glow} fill={`url(#glow-${uid})`} className="orion-glow" />
            {s.r > 6 && <path d="M0 -22V22M-22 0H22" stroke={s.color} strokeWidth=".7" opacity=".55" />}
            <circle r={s.r} fill={s.color} />
          </g>
        );
      })}
    </svg>
  );
}

/** Logarithmic golden spiral, computed rather than hand-drawn. */
export function GoldenSpiral({ className = "" }: { className?: string }) {
  const d = useMemo(() => {
    const phi = (1 + Math.sqrt(5)) / 2;
    const b = Math.log(phi) / (Math.PI / 2);
    const pts: string[] = [];
    const turns = 4.25 * Math.PI;
    for (let i = 0; i <= 220; i++) {
      const t = (i / 220) * turns;
      const r = 3.6 * Math.exp(b * t);
      pts.push(`${(250 + r * Math.cos(t + Math.PI)).toFixed(1)} ${(250 - r * Math.sin(t + Math.PI)).toFixed(1)}`);
    }
    return `M${pts.join("L")}`;
  }, []);
  return (
    <svg className={`spiral ${className}`} viewBox="0 0 500 500" aria-hidden="true" focusable="false" data-draw>
      <g fill="none" strokeLinecap="round">
        <circle className="draw" pathLength={1} cx="250" cy="250" r="226" stroke="currentColor" strokeWidth=".8" opacity=".35" />
        <circle className="draw" pathLength={1} cx="250" cy="250" r="140" stroke="currentColor" strokeWidth=".8" opacity=".25" strokeDasharray="2 6" />
        <path className="draw" pathLength={1} d={d} stroke="currentColor" strokeWidth="1.4" />
      </g>
      <circle cx="250" cy="250" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function Mandala({ petals = 12, className = "" }: { petals?: number; className?: string }) {
  return (
    <svg className={`mandala ${className}`} viewBox="0 0 500 500" aria-hidden="true" focusable="false" data-draw>
      <g transform="translate(250 250)" fill="none" stroke="currentColor" strokeWidth=".9">
        <circle className="draw" pathLength={1} r="232" opacity=".45" />
        <circle className="draw" pathLength={1} r="186" opacity=".35" />
        <circle className="draw" pathLength={1} r="92" opacity=".5" />
        {Array.from({ length: petals }, (_, i) => (
          <g key={i} transform={`rotate(${(i * 360) / petals})`}>
            <path className="draw" pathLength={1} d="M0 -228C38 -182 36 -124 0 -88C-36 -124 -38 -182 0 -228Z" opacity=".6" />
            <path className="draw" pathLength={1} d="M0 -138Q54 -70 0 -6Q-54 -70 0 -138Z" opacity=".45" />
          </g>
        ))}
        <circle r="38" opacity=".6" />
        <circle r="5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** Brand mark: Orion's belt — three aligned stars inside a quiet ring. */
export function BeltMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`belt-mark ${className}`} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1" />
      <g fill="#EAC57E">
        <circle cx="9.2" cy="20.4" r="2.1" />
        <circle cx="16" cy="16" r="2.5" />
        <circle cx="22.8" cy="11.6" r="2.1" />
      </g>
    </svg>
  );
}
