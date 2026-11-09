export default function GoldenSpiral() {
  return <svg className="golden-spiral" viewBox="0 0 500 500" aria-hidden="true">
    <g fill="none" stroke="#bd925c" strokeWidth="1.4">
      <path d="M250 250 C250 235 265 235 265 250 C265 274 241 274 241 250 C241 212 279 212 279 250 C279 311 218 311 218 250 C218 153 315 153 315 250 C315 407 158 407 158 250 C158 -2 410 -2 410 250" strokeLinecap="round"/>
      <circle cx="250" cy="250" r="225" strokeDasharray="3 8" opacity=".4"/>
    </g>
  </svg>;
}