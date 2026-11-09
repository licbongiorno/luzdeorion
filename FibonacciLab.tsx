import { useState } from "react";
const sequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
export default function FibonacciLab() {
  const [step, setStep] = useState(7);
  const values = sequence.slice(0, step + 1);
  return <div className="fib-panel">
    <div className="fib-copy"><span className="eyebrow">SECUENCIA DE FIBONACCI</span><h3>El ritmo de sumar.</h3><p>Cada número nace de la suma de los dos anteriores. Esta secuencia matemática inspira patrones, escalas y composiciones.</p>
      <label className="control-label" htmlFor="fib-step">Explorar términos <strong>{step + 1}</strong></label>
      <input id="fib-step" type="range" min="3" max="10" value={step} onChange={e => setStep(Number(e.target.value))}/>
      <div className="fib-numbers">{values.map((n, i) => <span key={i} style={{ opacity: .45 + i / values.length * .55 }}>{n}</span>)}</div>
      <small>La proporción entre términos consecutivos se aproxima a φ cuando la secuencia crece.</small>
    </div>
    <div className="fib-visual" aria-label="Visualización de la sucesión de Fibonacci">
      {values.map((n, i) => <div key={i} className="fib-square" style={{ width: `${Math.max(10, Math.min(100, n * 5))}%`, aspectRatio: "1", opacity: .25 + i / values.length * .7 }}><span>{n}</span></div>)}
      <div className="fib-orbit"><img src="/illustrations/spiral.svg" alt="" /></div>
    </div>
  </div>;
}