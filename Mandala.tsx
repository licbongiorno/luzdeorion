type Props = { petals?: number; color?: string; className?: string };
export default function Mandala({ petals = 12, color = "#b88758", className = "" }: Props) {
  return <svg className={`mandala-svg ${className}`} viewBox="0 0 500 500" role="img" aria-label="Mandala floral geométrico">
    <g transform="translate(250 250)" fill="none" stroke={color} strokeWidth="1.15">
      <circle r="220" opacity=".55"/><circle r="180" opacity=".5"/><circle r="135" opacity=".55"/><circle r="85" opacity=".55"/>
      {Array.from({ length: petals }, (_, i) => <g key={i} transform={`rotate(${i * 360 / petals})`}>
        <path d="M0 -218 C36 -174 35 -119 0 -82 C-35 -119 -36 -174 0 -218Z" fill="#d8a6a0" fillOpacity=".16"/>
        <path d="M0 -177 C25 -143 24 -102 0 -72 C-24 -102 -25 -143 0 -177Z" fill="#f2d8c5" fillOpacity=".25"/>
        <path d="M0 -132 Q55 -66 0 0 Q-55 -66 0 -132Z" strokeOpacity=".7"/>
      </g>)}
      <circle r="49" fill="#f3e4d6" stroke={color}/><circle r="29" fill="#a96e79" fillOpacity=".45"/><circle r="8" fill={color}/>
    </g>
  </svg>;
}