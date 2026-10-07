import { useEffect } from 'react'
import { useStore } from 'zustand'
import { notify } from '../lib/notify'
import { useDesignStore } from '../stores/designStore'

const LABELS: Record<string, string> = {
  gender: 'Corte', garment: 'Prenda', pattern: 'Estilo de la camiseta', patternSleeves: 'Mangas con patrón',
  shortsPattern: 'Estilo del short', clubId: 'Camiseta de equipo', kitId: 'Camiseta de equipo', player: 'Dorsal',
}
const COLORS: Record<string, string> = {
  primary: 'Color base', accent: 'Color del patrón', sleeves: 'Color de las mangas', collar: 'Color del cuello',
  secondary: 'Color de los detalles', shorts: 'Color del short', shortsAccent: 'Patrón del short',
}

type Snap = Record<string, unknown> & { colors?: Record<string, string> }

/** Describe qué cambió entre dos estados, para el aviso "Deshecho: …". */
function describe(a: Snap, b: Snap) {
  if (JSON.stringify(a.kitId) !== JSON.stringify(b.kitId)) return 'Camiseta de equipo'
  const out = new Set<string>()
  for (const k of Object.keys(LABELS)) if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) out.add(LABELS[k])
  for (const k of Object.keys(COLORS)) if (a.colors?.[k] !== b.colors?.[k]) out.add(COLORS[k])
  return out.size === 1 ? [...out][0] : out.size > 1 ? 'Varios cambios' : undefined
}

function run(kind: 'undo' | 'redo') {
  const t = useDesignStore.temporal.getState()
  if (kind === 'undo' ? !t.pastStates.length : !t.futureStates.length) return
  const before = useDesignStore.getState() as unknown as Snap
  const old = JSON.parse(JSON.stringify(before)) as Snap
  kind === 'undo' ? t.undo() : t.redo()
  notify.info({ title: kind === 'undo' ? 'Deshecho' : 'Rehecho', description: describe(old, useDesignStore.getState() as unknown as Snap) })
}

export const undoWithToast = () => run('undo')
export const redoWithToast = () => run('redo')

/** Estado del historial del diseño (deshacer / rehacer). */
export function useHistory() {
  const past = useStore(useDesignStore.temporal, (s) => s.pastStates.length)
  const future = useStore(useDesignStore.temporal, (s) => s.futureStates.length)
  return { canUndo: past > 0, canRedo: future > 0, undo: undoWithToast, redo: redoWithToast }
}

// Dentro de campos de texto, Ctrl+Z deshace el texto (comportamiento normal del navegador).
const TEXT_FIELD = 'input:not([type=color]):not([type=checkbox]):not([type=range]), textarea, select, [contenteditable="true"]'

/** Atajos de teclado: Ctrl+Z (deshacer) · Ctrl+Shift+Z o Ctrl+Y (rehacer). En Mac, con ⌘. */
export function useUndoShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return
      if ((e.target as HTMLElement | null)?.closest?.(TEXT_FIELD)) return
      const k = e.key.toLowerCase()
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undoWithToast() }
      else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redoWithToast() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
