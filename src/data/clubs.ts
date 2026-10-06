import type { Club, Colors, Kit, KitType, PatternId } from '../types/kit'

// DATOS DE PRUEBA con equipos ficticios. Para equipos reales hacen falta licencias (nombres, escudos y diseños están protegidos).
const C = (primary: string, accent: string, sleeves: string, collar: string, secondary: string, shorts: string): Colors => ({ primary, accent, sleeves, collar, secondary, shorts })
const K = (club: string, year: number, type: KitType, pattern: PatternId, colors: Colors, sleevesPattern = false): Kit =>
  ({ id: `${club}-${year}-${type}`, year, type, pattern, colors, sleevesPattern })

export const KIT_TYPE_LABEL: Record<KitType, string> = { home: 'Local', away: 'Visitante', third: 'Tercera' }

export const CLUBS: Club[] = [
  { id: 'catalunya', name: 'FC Catalunya', country: 'España', kits: [
    K('catalunya', 2024, 'home', 'stripes', C('#004D98', '#A50044', '#004D98', '#EDBB00', '#EDBB00', '#14213D')),
    K('catalunya', 2024, 'away', 'solid', C('#F5F5F5', '#F5F5F5', '#F5F5F5', '#A50044', '#A50044', '#F5F5F5')),
    K('catalunya', 2022, 'home', 'hoops', C('#A50044', '#004D98', '#A50044', '#EDBB00', '#EDBB00', '#004D98')),
    K('catalunya', 2019, 'home', 'stripes', C('#A50044', '#004D98', '#004D98', '#EDBB00', '#EDBB00', '#14213D')),
    K('catalunya', 2019, 'away', 'sash', C('#EDBB00', '#A50044', '#EDBB00', '#A50044', '#A50044', '#A50044')),
    K('catalunya', 2019, 'third', 'pinstripe', C('#050505', '#737373', '#050505', '#FF4D00', '#FF4D00', '#050505')),
    K('catalunya', 2015, 'home', 'stripes', C('#A50044', '#004D98', '#A50044', '#EDBB00', '#EDBB00', '#004D98'), true),
  ] },
  { id: 'norte', name: 'Atlético del Norte', country: 'España', kits: [
    K('norte', 2023, 'home', 'stripes', C('#F5F5F5', '#C8102E', '#C8102E', '#14213D', '#14213D', '#14213D')),
    K('norte', 2021, 'away', 'halves', C('#14213D', '#C8102E', '#14213D', '#F5F5F5', '#F5F5F5', '#14213D')),
    K('norte', 2018, 'home', 'stripes', C('#F5F5F5', '#C8102E', '#F5F5F5', '#C8102E', '#14213D', '#14213D')),
    K('norte', 2018, 'away', 'chevron', C('#14213D', '#FF4D00', '#14213D', '#FF4D00', '#F5F5F5', '#14213D')),
    K('norte', 2016, 'home', 'stripes', C('#C8102E', '#F5F5F5', '#C8102E', '#F5F5F5', '#F5F5F5', '#C8102E'), true),
  ] },
  { id: 'lusitano', name: 'Sporting Lusitano', country: 'Portugal', kits: [
    K('lusitano', 2024, 'home', 'hoops', C('#18A957', '#F5F5F5', '#18A957', '#050505', '#050505', '#050505')),
    K('lusitano', 2020, 'home', 'hoops', C('#F5F5F5', '#18A957', '#F5F5F5', '#18A957', '#18A957', '#18A957'), true),
    K('lusitano', 2020, 'away', 'camo', C('#2F4A2A', '#6B8F4E', '#2F4A2A', '#F5F5F5', '#F5F5F5', '#2F4A2A'), true),
    K('lusitano', 2017, 'home', 'sash', C('#18A957', '#F5F5F5', '#18A957', '#F5F5F5', '#F5F5F5', '#F5F5F5')),
  ] },
  { id: 'torino', name: 'Juventud Torino', country: 'Italia', kits: [
    K('torino', 2023, 'home', 'stripes', C('#F5F5F5', '#050505', '#050505', '#050505', '#FF4D00', '#050505')),
    K('torino', 2023, 'away', 'solid', C('#FF8FB1', '#FF8FB1', '#FF8FB1', '#050505', '#050505', '#050505')),
    K('torino', 2019, 'home', 'pinstripe', C('#050505', '#F5F5F5', '#050505', '#F5F5F5', '#F5F5F5', '#050505')),
    K('torino', 2014, 'home', 'stripes', C('#F5F5F5', '#050505', '#F5F5F5', '#050505', '#050505', '#050505'), true),
  ] },
  { id: 'andino', name: 'Deportivo Andino', country: 'Colombia', kits: [
    K('andino', 2024, 'home', 'gradient', C('#FFC400', '#14213D', '#FFC400', '#14213D', '#14213D', '#14213D')),
    K('andino', 2022, 'away', 'camo', C('#14213D', '#3D5A80', '#14213D', '#FFC400', '#FFC400', '#14213D'), true),
    K('andino', 2018, 'home', 'solid', C('#FFC400', '#FFC400', '#FFC400', '#14213D', '#14213D', '#14213D')),
    K('andino', 2018, 'away', 'checker', C('#F5F5F5', '#14213D', '#14213D', '#FFC400', '#FFC400', '#14213D')),
    K('andino', 2012, 'home', 'chevron', C('#FFC400', '#E11D2E', '#FFC400', '#E11D2E', '#E11D2E', '#E11D2E')),
  ] },
]
