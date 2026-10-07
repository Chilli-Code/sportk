import { drawPattern } from './patterns'
import type { PatternId } from '../types/kit'

const cache = new Map<string, string>()

/** Imagen (data URL) de un patrón sobre un rectángulo del mundo 3D. La usan las miniaturas de camisetas. */
export function patternImage(id: PatternId, base: string, accent: string, rect: { x0: number; x1: number; y0: number; y1: number }, w: number, h: number) {
  const key = `${id}${base}${accent}${rect.x0}${rect.y0}${w}${h}`
  if (!cache.has(key)) {
    const c = document.createElement('canvas'); c.width = w; c.height = h
    drawPattern(c.getContext('2d')!, id, base, accent, rect)
    cache.set(key, c.toDataURL())
  }
  return cache.get(key)!
}
