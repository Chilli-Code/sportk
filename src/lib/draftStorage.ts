import type { StateStorage } from 'zustand/middleware'
import { useSaveStatus } from '../stores/saveStatus'

/**
 * Almacenamiento del borrador. HOY: localStorage del navegador.
 * MÁS ADELANTE (backend): aquí es el único lugar que cambia. `getItem` pide el borrador al
 * servidor y `setItem` lo envía (ya llega con pausa de 400 ms); el store no se toca.
 * Zustand admite getItem/setItem asíncronos (devuelven Promesas).
 */
const status = useSaveStatus.setState
const DELAY = 400

let timer: ReturnType<typeof setTimeout> | undefined
let pending: { name: string; value: string } | null = null

function flush() {
  clearTimeout(timer)
  if (!pending) return
  const { name, value } = pending
  pending = null
  try {
    localStorage.setItem(name, value)
    localStorage.setItem(`${name}:at`, String(Date.now()))
    status({ status: 'saved', savedAt: Date.now() })
  } catch {
    // Modo privado o almacenamiento lleno
    status({ status: 'error' })
  }
}

// Si la pestaña se oculta (cambiar de app en el celular, cerrar) se guarda al instante.
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => { if (document.hidden) flush() })
  window.addEventListener('pagehide', flush)
}

export const draftStorage: StateStorage = {
  getItem: (name) => {
    try {
      const at = localStorage.getItem(`${name}:at`)
      if (at) status({ savedAt: Number(at), restoredAt: Number(at) })
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    pending = { name, value }
    status({ status: 'saving' })
    clearTimeout(timer)
    timer = setTimeout(flush, DELAY)
  },
  removeItem: (name) => {
    pending = null
    clearTimeout(timer)
    try { localStorage.removeItem(name); localStorage.removeItem(`${name}:at`) } catch { /* nada */ }
  },
}

/** Lo llama el store al terminar de leer el borrador guardado. */
export function onDraftRestored(hasDraft: boolean) {
  if (hasDraft) useSaveStatus.setState({ restored: true })
}
