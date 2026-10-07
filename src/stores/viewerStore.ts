import { create } from 'zustand'

export type ToolId = 'club' | 'garment' | 'pattern' | 'color' | 'player' | 'logo' | 'sponsor' | 'text'
export type View = 'front' | 'back' | 'side'
export type Target = 'shirt' | 'shorts'

// Estado del visor y la interfaz (NO se guarda con el diseño).
type ViewerState = {
  view: View
  tool: ToolId | null
  /** Qué prenda se está editando cuando el diseño es un uniforme completo. */
  target: Target
  setView: (v: View) => void
  setTool: (t: ToolId | null) => void
  setTarget: (t: Target) => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  view: 'front',
  tool: null,
  target: 'shirt',
  setView: (view) => set({ view }),
  setTool: (tool) => set({ tool }),
  setTarget: (target) => set({ target }),
}))
