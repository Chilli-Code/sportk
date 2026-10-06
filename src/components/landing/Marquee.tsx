const items = ['ROPA DEPORTIVA PERSONALIZADA', 'DISEÑA TU IDENTIDAD', 'HECHO PARA COMPETIR']
export default function Marquee() {
  const row = Array.from({ length: 4 }).flatMap((_, r) => items.flatMap((t, i) => [<span key={`t${r}${i}`}>{t}</span>, <b key={`d${r}${i}`}>•</b>]))
  return <div className="mq" aria-hidden><div>{row}</div></div>
}
