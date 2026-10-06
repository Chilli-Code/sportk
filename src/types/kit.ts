export type Garment = 'shirt' | 'shorts' | 'set'
export type Gender = 'men' | 'women'
export type PatternId = 'solid' | 'stripes' | 'pinstripe' | 'hoops' | 'sash' | 'halves' | 'chevron' | 'checker' | 'camo' | 'gradient'
export type ColorPart = 'primary' | 'accent' | 'sleeves' | 'collar' | 'secondary' | 'shorts'
/** primary = base · accent = color del patrón · secondary = detalles (dorsal) */
export type Colors = Record<ColorPart, string>
export type KitType = 'home' | 'away' | 'third'

export type Kit = { id: string; year: number; type: KitType; pattern: PatternId; sleevesPattern: boolean; colors: Colors }
export type Club = { id: string; name: string; country: string; kits: Kit[] }
