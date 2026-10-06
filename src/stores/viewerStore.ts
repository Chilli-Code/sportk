import { create } from 'zustand'

export type ToolId = 'club' | 'garment' | 'pattern' | 'color' | 'player' | 'logo' | 'sponsor' | 'text'
export type View = 'front' | 'back' | 'side'

// Estado del visor y la interfaz (NO se guarda con el diseño).
type ViewerState = {
  view: View
  tool: ToolId | null
  setView: (v: View) => void
  setTool: (t: ToolId | null) => void
}

export const useViewerStore = create<ViewerState>((set) => ({
  view: 'front',
  tool: null,
  setView: (view) => set({ view }),
  setTool: (tool) => set({ tool }),
}))
