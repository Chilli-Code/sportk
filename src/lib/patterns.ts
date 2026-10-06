import type { PatternId } from '../types/kit'

export const PATTERNS: { id: PatternId; label: string }[] = [
  { id: 'solid', label: 'Liso' },
  { id: 'stripes', label: 'Rayas verticales' },
  { id: 'pinstripe', label: 'Rayas finas' },
  { id: 'hoops', label: 'Rayas horizontales' },
  { id: 'sash', label: 'Banda cruzada' },
  { id: 'halves', label: 'Mitades' },
  { id: 'chevron', label: 'Chevron' },
  { id: 'checker', label: 'Cuadros' },
  { id: 'camo', label: 'Militar (camuflaje)' },
  { id: 'gradient', label: 'Degradado' },
]

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
export const mix = (a: string, b: string, t: number) =>
  '#' + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, '0')).join('')

const rng = (seed: number) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }

type Rect = { x0: number; x1: number; y0: number; y1: number }

/** Dibuja el patrón en unidades del mundo 3D (y hacia arriba). Lo usan el modelo 3D y las miniaturas. */
export function drawPattern(ctx: CanvasRenderingContext2D, id: PatternId, base: string, accent: string, r: Rect) {
  const c = ctx.canvas
  const sx = c.width / (r.x1 - r.x0), sy = c.height / (r.y1 - r.y0)
  ctx.setTransform(sx, 0, 0, -sy, -r.x0 * sx, r.y1 * sy)
  ctx.fillStyle = base
  ctx.fillRect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0)
  ctx.fillStyle = accent
  ctx.strokeStyle = accent
  const K = Array.from({ length: 13 }, (_, i) => i - 6)
  switch (id) {
    case 'stripes': K.forEach((k) => ctx.fillRect(k * 0.52 - 0.13, -3, 0.26, 6)); break
    case 'pinstripe': K.concat(K.map((k) => k + 13)).forEach((k) => ctx.fillRect(k * 0.16 - 1.1, -3, 0.035, 6)); break
    case 'hoops': K.forEach((k) => ctx.fillRect(-3, k * 0.7 - 0.17, 6, 0.35)); break
    case 'halves': ctx.fillRect(0, -3, 3, 6); break
    case 'sash': ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(-2.2, 2.3); ctx.lineTo(2.2, -2.5); ctx.stroke(); break
    case 'chevron':
      ctx.lineWidth = 0.3
      for (let k = 0; k < 7; k++) { const y = 2.6 - k * 0.75; ctx.beginPath(); ctx.moveTo(-2.2, y); ctx.lineTo(0, y - 1); ctx.lineTo(2.2, y); ctx.stroke() }
      break
    case 'checker': for (let i = -9; i < 9; i++) for (let j = -10; j < 10; j++) if ((i + j) % 2 === 0) ctx.fillRect(i * 0.28, j * 0.28, 0.28, 0.28); break
    case 'camo': {
      const rand = rng(7), tones = [accent, mix(accent, '#000000', 0.45), mix(base, '#000000', 0.35)]
      for (let i = 0; i < 90; i++) {
        ctx.fillStyle = tones[i % 3]; ctx.beginPath()
        ctx.ellipse(rand() * 5 - 2.5, rand() * 5.4 - 2.7, 0.12 + rand() * 0.3, 0.08 + rand() * 0.2, rand() * Math.PI, 0, Math.PI * 2); ctx.fill()
      }
      break
    }
    case 'gradient': { const g = ctx.createLinearGradient(0, 2.2, 0, -2.2); g.addColorStop(0, base); g.addColorStop(0.5, base); g.addColorStop(1, accent); ctx.fillStyle = g; ctx.fillRect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0); break }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

const cache = new Map<string, string>()
/** Miniatura (data URL) de un patrón con los colores indicados. */
export function patternSwatch(id: PatternId, base: string, accent: string, size = 96) {
  const key = `${id}${base}${accent}${size}`
  if (!cache.has(key)) {
    const c = document.createElement('canvas'); c.width = c.height = size
    drawPattern(c.getContext('2d')!, id, base, accent, { x0: -1.1, x1: 1.1, y0: -1.1, y1: 1.1 })
    cache.set(key, c.toDataURL())
  }
  return cache.get(key)!
}
