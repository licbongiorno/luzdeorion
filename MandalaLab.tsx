import { useMemo, useState } from "react";
import Mandala from "./Mandala";
export default function MandalaLab() {
  const [petals, setPetals] = useState(12);
  const [tone, setTone] = useState("#a96e79");
  const [rotation, setRotation] = useState(0);
  const colors = ["#a96e79", "#bd925c", "#7e8870", "#806078"];
  const label = useMemo(() => `${petals} pétalos · ${rotation}°`, [petals, rotation]);
  return <div className="lab-panel">
    <div className="lab-art" style={{ ["--lab-rotation" as string]: `${rotation}deg` }}><Mandala petals={petals} color={tone} /></div>
    <div className="lab-controls">
      <span className="eyebrow">TU COMPOSICIÓN</span>
      <h3>Un patrón, muchas posibilidades.</h3>
      <p>Explorá la simetría radial y creá una composición geométrica propia.</p>
      <label className="control-label" htmlFor="petals">Cantidad de pétalos <strong>{petals}</strong></label>
      <input id="petals" type="range" min="6" max="24" step="2" value={petals} onChange={e => setPetals(Number(e.target.value))}/>
      <label className="control-label" htmlFor="rotation">Rotación <strong>{rotation}°</strong></label>
      <input id="rotation" type="range" min="0" max="330" step="15" value={rotation} onChange={e => setRotation(Number(e.target.value))}/>
      <span className="control-label">Paleta</span>
      <div className="swatches">{colors.map(c => <button key={c} className={`swatch ${tone === c ? "selected" : ""}`} style={{ background: c }} onClick={() => setTone(c)} aria-label={`Elegir color ${c}`} />)}</div>
      <div className="lab-readout">{label}</div>
      <button className="button button-outline button-small" onClick={() => {setPetals(12);setRotation(0);setTone(colors[0]);}}>Reiniciar composición</button>
    </div>
  </div>;
}