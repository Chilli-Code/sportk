import type { Gender } from '../types/kit'

export type Pts = [number, number][]
const mirror = (p: Pts): Pts => p.map(([x, y]) => [400 - x, y])

// Siluetas en un lienzo de 400 de ancho. Cada corte (hombre / mujer) tiene su propia forma.
const menLeft: Pts = [[122, 38], [98, 66], [46, 94], [8, 188], [70, 216], [100, 150], [100, 70]]
const womenLeft: Pts = [[132, 38], [108, 68], [64, 96], [34, 172], [84, 196], [108, 150], [110, 72]]

export const FIT: Record<Gender, { torso: Pts; left: Pts; right: Pts; shorts: Pts }> = {
  men: {
    torso: [[122, 38], [278, 38], [300, 70], [300, 150], [304, 404], [250, 414], [200, 417], [150, 414], [96, 404], [100, 150], [100, 70]],
    left: menLeft, right: mirror(menLeft),
    shorts: [[110, 0], [290, 0], [314, 150], [216, 150], [200, 66], [184, 150], [86, 150]],
  },
  women: {
    torso: [[132, 38], [268, 38], [290, 72], [292, 150], [280, 270], [296, 404], [250, 412], [200, 414], [150, 412], [104, 404], [120, 270], [108, 150], [110, 72]],
    left: womenLeft, right: mirror(womenLeft),
    shorts: [[120, 0], [280, 0], [298, 120], [214, 120], [200, 60], [186, 120], [102, 120]],
  },
}

export const toPath = (p: Pts) => 'M' + p.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z'
