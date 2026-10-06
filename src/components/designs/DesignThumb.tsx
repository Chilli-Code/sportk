import { useId } from 'react'
import type { Design } from '../../types/design'

const TORSO = 'M122 38 L278 38 L300 70 L300 150 L304 404 Q200 420 96 404 L100 150 L100 70 Z'
const SL_L = 'M122 38 L98 66 L46 94 L8 188 L70 216 L100 150 L100 70 Z'
const SL_R = 'M278 38 L302 66 L354 94 L392 188 L330 216 L300 150 L300 70 Z'
const SHORTS = 'M110 0 H290 L314 150 H216 L200 66 L184 150 H86 Z'

/** Vista previa 2D de una prenda con los colores del diseño. Se reemplaza por render/3D más adelante. */
export default function DesignThumb({ design, className = '' }: { design: Design; className?: string }) {
  const id = useId().replace(/:/g, '')
  const { primary, sleeves, collar } = design.colors
  const ink = primary === '#F5F5F5' ? '#050505' : '#FFFFFF'
  const shirt = (
    <g>
      <path d={TORSO} fill={primary} /><path d={SL_L} fill={sleeves} /><path d={SL_R} fill={sleeves} />
      {[TORSO, SL_L, SL_R].map((d) => <path key={d} d={d} fill={`url(#s${id})`} />)}
      <path d="M160 30 Q200 76 240 30 Q200 18 160 30 Z" fill="#050505" />
      <path d="M146 34 Q200 98 254 34 L240 28 Q200 74 160 28 Z" fill={collar} />
      {design.player.number && <text x="200" y="262" textAnchor="middle" fontSize="120" fontWeight="800" fill={ink} fontFamily="Manrope, sans-serif">{design.player.number}</text>}
    </g>
  )
  const shorts = (
    <g>
      <path d={SHORTS} fill={primary} /><path d={SHORTS} fill={`url(#s${id})`} />
      <path d="M110 0 H290 V16 H110 Z" fill={collar} />
    </g>
  )
  const vb = design.garment === 'shirt' ? '0 0 400 440' : design.garment === 'shorts' ? '0 0 400 200' : '0 0 400 480'
  return (
    <svg viewBox={vb} className={className} aria-hidden>
      <defs>
        <linearGradient id={`s${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".45" /><stop offset=".35" stopColor="#000" stopOpacity="0" />
          <stop offset=".65" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
      </defs>
      {design.garment === 'shirt' && shirt}
      {design.garment === 'shorts' && <g transform="translate(0 20)">{shorts}</g>}
      {design.garment === 'set' && (<><g transform="translate(56 0) scale(.72)">{shirt}</g><g transform="translate(40 336) scale(.8)">{shorts}</g></>)}
    </svg>
  )
}
