import { create } from 'zustand'
import type { ColorPart, Colors, Garment, Gender, Kit, PatternId } from '../types/kit'

export type { ColorPart, Colors, Garment, Gender }

type DesignData = {
  name: string
  gender: Gender | null
  garment: Garment
  pattern: PatternId
  patternSleeves: boolean
  clubId: string | null
  kitId: string | null
  colors: Colors
  player: { name: string; number: string }
}

type DesignState = DesignData & {
  setName: (v: string) => void
  setGender: (v: Gender) => void
  setGarment: (v: Garment) => void
  setPattern: (v: PatternId) => void
  setPatternSleeves: (v: boolean) => void
  setColor: (part: ColorPart, v: string) => void
  setPlayer: (p: Partial<{ name: string; number: string }>) => void
  applyKit: (clubId: string, kit: Kit) => void
  clearKit: () => void
  /** Empieza un diseño en blanco (vuelve a preguntar hombre / mujer). */
  newDesign: () => void
}

const initial: DesignData = {
  name: 'Mi uniforme',
  gender: null,
  garment: 'shirt',
  pattern: 'solid',
  patternSleeves: false,
  clubId: null,
  kitId: null,
  colors: { primary: '#1F1F1F', accent: '#FF4D00', sleeves: '#FF4D00', collar: '#F5F5F5', secondary: '#F5F5F5', shorts: '#1F1F1F' },
  player: { name: 'LYAN', number: '10' },
}

// Fuente única del diseño: el visor 3D, los paneles y el guardado leen de aquí.
export const useDesignStore = create<DesignState>((set) => ({
  ...initial,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setGarment: (garment) => set({ garment }),
  setPattern: (pattern) => set({ pattern, kitId: null }),
  setPatternSleeves: (patternSleeves) => set({ patternSleeves, kitId: null }),
  setColor: (part, v) => set((s) => ({ colors: { ...s.colors, [part]: v }, kitId: null })),
  setPlayer: (p) => set((s) => ({ player: { ...s.player, ...p } })),
  applyKit: (clubId, k) => set({ clubId, kitId: k.id, pattern: k.pattern, patternSleeves: k.sleevesPattern, colors: { ...k.colors } }),
  clearKit: () => set({ clubId: null, kitId: null }),
  newDesign: () => set({ ...initial, colors: { ...initial.colors }, player: { ...initial.player } }),
}))
