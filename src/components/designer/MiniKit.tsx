import { useId, useMemo } from 'react'
import { FIT, toPath } from '../../lib/fitShapes'
import { patternImage } from '../../lib/patternImage'
import type { Kit } from '../../types/kit'

const F = FIT.men
const RECT = { x0: -2, x1: 2, y0: -2.1, y1: 1.9 }

/** Miniatura del uniforme completo de una camiseta de equipo: camiseta, mangas, cuello y short. */
export default function MiniKit({ kit, className = '' }: { kit: Kit; className?: string }) {
  const id = useId().replace(/:/g, '')
  const { colors: c, pattern, sleevesPattern } = kit
  const img = useMemo(() => (pattern === 'solid' ? null : patternImage(pattern, c.primary, c.accent, RECT, 200, 200)), [pattern, c.primary, c.accent])
  return (
    <svg viewBox="0 0 400 600" className={className} aria-hidden>
      <defs>
        <clipPath id={`t${id}`}><path d={toPath(F.torso)} /></clipPath>
        <clipPath id={`m${id}`}><path d={toPath(F.left)} /><path d={toPath(F.right)} /></clipPath>
      </defs>
      <path d={toPath(F.torso)} fill={c.primary} />
      {img && <image href={img} x="0" y="30" width="400" height="400" preserveAspectRatio="none" clipPath={`url(#t${id})`} />}
      <path d={toPath(F.left)} fill={c.sleeves} /><path d={toPath(F.right)} fill={c.sleeves} />
      {img && sleevesPattern && <image href={img} x="0" y="30" width="400" height="400" preserveAspectRatio="none" clipPath={`url(#m${id})`} />}
      <path d="M160 30 Q200 76 240 30 Q200 18 160 30 Z" fill="#050505" />
      <path d="M146 34 Q200 98 254 34 L240 28 Q200 74 160 28 Z" fill={c.collar} />
      <g transform="translate(0 450)"><path d={toPath(F.shorts)} fill={c.shorts} /><rect x="110" y="0" width="180" height="14" fill={c.collar} /></g>
    </svg>
  )
}
