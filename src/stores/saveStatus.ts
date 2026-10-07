import { create } from 'zustand'

type SaveStatus = {
  status: 'idle' | 'saving' | 'saved' | 'error'
  /** Última vez que se guardó */
  savedAt: number | null
  /** Se recuperó un borrador al abrir la página */
  restored: boolean
  /** Cuándo se editó por última vez el borrador recuperado */
  restoredAt: number | null
  dismissRestore: () => void
}

// Estado del guardado automático (solo para mostrarlo en pantalla).
export const useSaveStatus = create<SaveStatus>((set) => ({
  status: 'idle',
  savedAt: null,
  restored: false,
  restoredAt: null,
  dismissRestore: () => set({ restored: false }),
}))
