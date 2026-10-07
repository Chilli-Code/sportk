import { useDeferredValue, useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FIT, type Pts } from '../../../lib/fitShapes'
import { useDesignStore } from '../../../stores/designStore'
import { makePatternTexture, makeTextTexture, SHORTS_RECT } from './textures'

/**
 * Prenda TEMPORAL hecha con geometría. Cuando exista el .glb, se reemplaza este
 * componente por <GarmentModel /> (useGLTF) manteniendo la misma lectura del store.
 */
const P = (x: number, y: number): [number, number] => [(x - 200) / 100, (220 - y) / 100]
const D = 0.32
const OPTS = { depth: D, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 3, curveSegments: 12 }

function poly(pts: Pts) {
  const s = new THREE.Shape()
  pts.forEach(([x, y], i) => (i ? s.lineTo(...P(x, y)) : s.moveTo(...P(x, y))))
  s.closePath()
  return s
}
function collar() {
  const s = new THREE.Shape()
  s.moveTo(...P(146, 34)); s.quadraticCurveTo(...P(200, 98), ...P(254, 34)); s.lineTo(...P(240, 28)); s.quadraticCurveTo(...P(200, 74), ...P(160, 28)); s.closePath()
  return s
}
function neck() {
  const s = new THREE.Shape()
  s.moveTo(...P(160, 30)); s.quadraticCurveTo(...P(200, 76), ...P(240, 30)); s.quadraticCurveTo(...P(200, 18), ...P(160, 30)); s.closePath()
  return s
}

/**
 * IMPORTANTE: el `key` fuerza un material nuevo cuando se pasa de liso a patrón (o al revés).
 * Three.js no recompila el shader al asignar `map` a un material que no lo tenía, y por eso
 * el patrón no aparecía hasta que la prenda se volvía a crear.
 */
function Mat({ color, map }: { color: string; map?: THREE.Texture | null }) {
  return <meshStandardMaterial key={map ? 'con-patron' : 'liso'} color={map ? '#ffffff' : color} map={map ?? undefined} roughness={0.78} metalness={0.02} />
}

function Shirt() {
  const colors = useDesignStore((s) => s.colors)
  const player = useDesignStore((s) => s.player)
  const pattern = useDesignStore((s) => s.pattern)
  const patternSleeves = useDesignStore((s) => s.patternSleeves)
  const gender = useDesignStore((s) => s.gender) ?? 'men'
  // useDeferredValue: al arrastrar el selector de color no se regenera la textura en cada fotograma
  const base = useDeferredValue(colors.primary)
  const accent = useDeferredValue(colors.accent)

  const geo = useMemo(() => ({ torso: poly(FIT[gender].torso), left: poly(FIT[gender].left), right: poly(FIT[gender].right), collar: collar(), neck: neck() }), [gender])
  const pat = useMemo(() => (pattern === 'solid' ? null : makePatternTexture(pattern, base, accent)), [pattern, base, accent])
  const front = useMemo(() => makeTextTexture([{ text: player.number || ' ', size: 300, y: 256 }], colors.secondary), [player.number, colors.secondary])
  const back = useMemo(() => makeTextTexture([
    { text: (player.name || ' ').slice(0, 12), size: 70, y: 110, spacing: 8 },
    { text: player.number || ' ', size: 300, y: 300 },
  ], colors.secondary), [player.name, player.number, colors.secondary])
  useEffect(() => () => { pat?.dispose() }, [pat])
  useEffect(() => () => { front.dispose() }, [front])
  useEffect(() => () => { back.dispose() }, [back])

  const z = D / 2 + 0.06
  return (
    <group>
      <mesh position-z={-D / 2}><extrudeGeometry args={[geo.torso, OPTS]} /><Mat color={colors.primary} map={pat} /></mesh>
      <mesh position-z={-D / 2}><extrudeGeometry args={[geo.left, OPTS]} /><Mat color={colors.sleeves} map={patternSleeves ? pat : null} /></mesh>
      <mesh position-z={-D / 2}><extrudeGeometry args={[geo.right, OPTS]} /><Mat color={colors.sleeves} map={patternSleeves ? pat : null} /></mesh>
      <mesh position-z={z}><shapeGeometry args={[geo.neck]} /><meshBasicMaterial color="#050505" /></mesh>
      <mesh position-z={z + 0.004}><shapeGeometry args={[geo.collar]} /><meshStandardMaterial color={colors.collar} roughness={0.7} /></mesh>
      <mesh position={[0, -0.25, z + 0.004]}><planeGeometry args={[2.1, 2.1]} /><meshBasicMaterial map={front} transparent depthWrite={false} /></mesh>
      <mesh position={[0, -0.25, -z - 0.004]} rotation-y={Math.PI}><planeGeometry args={[2.1, 2.1]} /><meshBasicMaterial map={back} transparent depthWrite={false} /></mesh>
    </group>
  )
}

/** El short tiene siempre su propio color y su propio estilo, solo o dentro de un uniforme. */
function Shorts() {
  const colors = useDesignStore((s) => s.colors)
  const pattern = useDesignStore((s) => s.shortsPattern)
  const player = useDesignStore((s) => s.player)
  const gender = useDesignStore((s) => s.gender) ?? 'men'
  const base = useDeferredValue(colors.shorts)
  const accent = useDeferredValue(colors.shortsAccent)

  const shape = useMemo(() => poly(FIT[gender].shorts), [gender])
  const band = useMemo(() => poly([[110, 0], [290, 0], [290, 16], [110, 16]]), [])
  const pat = useMemo(() => (pattern === 'solid' ? null : makePatternTexture(pattern, base, accent, SHORTS_RECT)), [pattern, base, accent])
  const num = useMemo(() => makeTextTexture([{ text: player.number || ' ', size: 300, y: 256 }], colors.secondary), [player.number, colors.secondary])
  useEffect(() => () => { pat?.dispose() }, [pat])
  useEffect(() => () => { num.dispose() }, [num])

  const z = D / 2 + 0.06
  return (
    <group>
      <mesh position-z={-D / 2}><extrudeGeometry args={[shape, OPTS]} /><Mat color={colors.shorts} map={pat} /></mesh>
      <mesh position-z={z}><shapeGeometry args={[band]} /><meshStandardMaterial color={colors.collar} roughness={0.7} /></mesh>
      <mesh position={[-0.62, 1.2, z + 0.004]}><planeGeometry args={[0.6, 0.6]} /><meshBasicMaterial map={num} transparent depthWrite={false} /></mesh>
    </group>
  )
}

export default function GarmentPlaceholder() {
  const garment = useDesignStore((s) => s.garment)
  const size = useThree((s) => s.size)
  // Ajusta el tamaño al ancho disponible (celular vertical, etc.)
  const visH = 2 * 9 * Math.tan(THREE.MathUtils.degToRad(16))
  const fit = Math.min(1, (visH * (size.width / size.height)) / 4.6) * 0.96

  return (
    <group scale={fit}>
      {garment === 'shirt' && <group position-y={0.1}><Shirt /></group>}
      {garment === 'shorts' && <group scale={1.5} position-y={-2.18}><Shorts /></group>}
      {garment === 'set' && (
        <>
          <group scale={0.72} position-y={0.75}><Shirt /></group>
          <group scale={0.8} position-y={-2.56}><Shorts /></group>
        </>
      )}
    </group>
  )
}
