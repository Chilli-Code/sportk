import { useEffect, useState } from 'react'

/** portrait = hoja inferior · landscape = celular horizontal · desktop = 3 columnas */
export type LayoutMode = 'portrait' | 'landscape' | 'desktop'

const calc = (): LayoutMode => {
  const w = window.innerWidth, h = window.innerHeight
  if (h <= 500 && w > h) return 'landscape'
  return w >= 1024 ? 'desktop' : 'portrait'
}

export function useLayoutMode() {
  const [mode, setMode] = useState<LayoutMode>(calc)
  useEffect(() => {
    const f = () => setMode(calc())
    window.addEventListener('resize', f)
    window.addEventListener('orientationchange', f)
    return () => { window.removeEventListener('resize', f); window.removeEventListener('orientationchange', f) }
  }, [])
  return mode
}
