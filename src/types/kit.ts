export type Garment = 'shirt' | 'shorts' | 'set'
export type Gender = 'men' | 'women'
export type PatternId = 'solid' | 'stripes' | 'pinstripe' | 'hoops' | 'sash' | 'halves' | 'chevron' | 'checker' | 'camo' | 'gradient'

/** Colores que define una camiseta de equipo (data/clubs.ts). */
export type KitColorPart = 'primary' | 'accent' | 'sleeves' | 'collar' | 'secondary' | 'shorts'
export type Colors = Record<KitColorPart, string>

/** Colores del diseño en edición: la camiseta y el short tienen cada uno su base y su patrón. */
export type ColorPart = KitColorPart | 'shortsAccent'
export type DesignColors = Record<ColorPart, string>

export type KitType = 'home' | 'away' | 'third'
export type Kit = { id: string; year: number; type: KitType; pattern: PatternId; sleevesPattern: boolean; colors: Colors }
export type Club = { id: string; name: string; country: string; kits: Kit[] }
