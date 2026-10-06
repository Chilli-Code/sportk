import * as THREE from 'three'
import { drawPattern } from '../../../lib/patterns'
import type { PatternId } from '../../../types/kit'

type Line = { text: string; size: number; y: number; spacing?: number }
type Rect = { x0: number; x1: number; y0: number; y1: number }

/** Zonas del mundo 3D que cubre cada textura de patrón (las geometrías usan x,y como UV). */
export const TORSO_RECT: Rect = { x0: -2, x1: 2, y0: -2.2, y1: 2.2 }
export const SHORTS_RECT: Rect = { x0: -1.6, x1: 1.6, y0: 0.5, y1: 2.3 }

/** Dibuja nombre / dorsal en un canvas 2D y lo usa como textura. */
export function makeTextTexture(lines: Line[], color: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 512
  const ctx = c.getContext('2d')!
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const l of lines) {
    ctx.font = `800 ${l.size}px Manrope, Inter, sans-serif`
    ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${l.spacing ?? 0}px`
    ctx.fillText(l.text, 256 + (l.spacing ?? 0) / 2, l.y)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

export function makePatternTexture(id: PatternId, base: string, accent: string, r: Rect = TORSO_RECT) {
  const w = r.x1 - r.x0, h = r.y1 - r.y0
  const c = document.createElement('canvas')
  c.width = 640; c.height = Math.round((640 * h) / w)
  drawPattern(c.getContext('2d')!, id, base, accent, r)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  t.repeat.set(1 / w, 1 / h)
  t.offset.set(-r.x0 / w, -r.y0 / h)
  return t
}
