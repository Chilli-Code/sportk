import { create } from 'zustand'
import { temporal } from 'zundo'
import { createJSONStorage, persist } from 'zustand/middleware'
import { draftStorage, onDraftRestored } from '../lib/draftStorage'
import type { ColorPart, DesignColors, Garment, Gender, Kit, PatternId } from '../types/kit'

export type { ColorPart, DesignColors as Colors, Garment, Gender }

type DesignData = {
  name: string
  gender: Gender | null
  garment: Garment
  /** Estilo de la camiseta */
  pattern: PatternId
  patternSleeves: boolean
  /** Estilo del short (independiente del de la camiseta) */
  shortsPattern: PatternId
  clubId: string | null
  kitId: string | null
  colors: DesignColors
  player: { name: string; number: string }
}

type DesignState = DesignData & {
  setName: (v: string) => void
  setGender: (v: Gender) => void
  setGarment: (v: Garment) => void
  setPattern: (v: PatternId) => void
  setShortsPattern: (v: PatternId) => void
  setPatternSleeves: (v: boolean) => void
  setColor: (part: ColorPart, v: string) => void
  setPlayer: (p: Partial<{ name: string; number: string }>) => void
  applyKit: (clubId: string, kit: Kit) => void
  clearKit: () => void
  /** Empieza un diseño en blanco (vuelve a preguntar hombre / mujer). */
  newDesign: () => void
}

const lum = (h: string) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); return 0.299 * r + 0.587 * g + 0.114 * b }
const far = (a: string, b: string) => Math.abs(lum(a) - lum(b)) > 60
const pickAccent = (base: string, ...options: string[]) => options.find((c) => far(base, c)) ?? (lum(base) > 128 ? '#050505' : '#F5F5F5')

const initial: DesignData = {
  name: 'Mi uniforme',
  gender: null,
  garment: 'shirt',
  pattern: 'solid',
  patternSleeves: false,
  shortsPattern: 'solid',
  clubId: null,
  kitId: null,
  colors: { primary: '#1F1F1F', accent: '#FF4D00', sleeves: '#FF4D00', collar: '#F5F5F5', secondary: '#F5F5F5', shorts: '#1F1F1F', shortsAccent: '#FF4D00' },
  player: { name: 'LYAN', number: '10' },
}

// Fuente única del diseño: el visor 3D, los paneles y el guardado leen de aquí.
export const useDesignStore = create<DesignState>()(persist(temporal((set) => ({
  ...initial,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setGarment: (garment) => set({ garment }),
  setPattern: (pattern) => set((s) => ({
    pattern, kitId: null,
    colors: far(s.colors.primary, s.colors.accent) ? s.colors : { ...s.colors, accent: pickAccent(s.colors.primary, s.colors.secondary, s.colors.collar) },
  })),
  setShortsPattern: (shortsPattern) => set((s) => ({
    shortsPattern, kitId: null,
    colors: far(s.colors.shorts, s.colors.shortsAccent) ? s.colors : { ...s.colors, shortsAccent: pickAccent(s.colors.shorts, s.colors.secondary, s.colors.accent, s.colors.collar) },
  })),
  setPatternSleeves: (patternSleeves) => set({ patternSleeves, kitId: null }),
  setColor: (part, v) => set((s) => ({ colors: { ...s.colors, [part]: v }, kitId: null })),
  setPlayer: (p) => set((s) => ({ player: { ...s.player, ...p } })),
  // Una camiseta de equipo define TODO el uniforme: camiseta, mangas y short.
  applyKit: (clubId, k) => set({
    clubId, kitId: k.id, pattern: k.pattern, patternSleeves: k.sleevesPattern, shortsPattern: 'solid',
    colors: { ...k.colors, shortsAccent: pickAccent(k.colors.shorts, k.colors.secondary, k.colors.accent, k.colors.collar) },
  }),
  clearKit: () => set({ clubId: null, kitId: null }),
  newDesign: () => {
    set({ ...initial, colors: { ...initial.colors }, player: { ...initial.player } })
    useDesignStore.temporal.getState().clear()
  },
}), {
  limit: 100,
  // Solo se recuerda el diseño (no el nombre ni la interfaz)
  partialize: (s) => ({ gender: s.gender, garment: s.garment, pattern: s.pattern, patternSleeves: s.patternSleeves, shortsPattern: s.shortsPattern, clubId: s.clubId, kitId: s.kitId, colors: s.colors, player: s.player }),
  equality: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  // Los cambios seguidos (arrastrar un color, escribir) cuentan como UN paso: solo se guarda
  // el estado anterior si pasaron más de 600 ms desde el último cambio.
  handleSet: (handleSet) => {
    let last = 0
    return ((...args: Parameters<typeof handleSet>) => {
      const now = Date.now()
      if (now - last > 600) handleSet(...args)
      last = now
    }) as typeof handleSet
  },
}),
{
  // Guardado automático del borrador (hoy en el navegador; luego se sincroniza con el servidor)
  name: 'lyan-draft',
  version: 1,
  storage: createJSONStorage(() => draftStorage),
  partialize: (s) => ({ name: s.name, gender: s.gender, garment: s.garment, pattern: s.pattern, patternSleeves: s.patternSleeves, shortsPattern: s.shortsPattern, clubId: s.clubId, kitId: s.kitId, colors: s.colors, player: s.player }),
  // Si cambia la estructura del diseño, se sube la versión y los borradores viejos se descartan
  migrate: (persisted, version) => (version === 1 ? (persisted as DesignState) : ({} as DesignState)),
  // Mezcla segura: un borrador incompleto o dañado nunca deja la app rota
  merge: (persisted, current) => {
    const p = (persisted ?? {}) as Partial<DesignData>
    return { ...current, ...p, colors: { ...current.colors, ...p.colors }, player: { ...current.player, ...p.player } }
  },
  onRehydrateStorage: () => (state) => {
    onDraftRestored(!!state?.gender)
    queueMicrotask(() => useDesignStore.temporal.getState().clear())
  },
}))
