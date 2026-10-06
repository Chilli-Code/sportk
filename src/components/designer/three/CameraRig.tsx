import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'
import { useViewerStore, type View } from '../../../stores/viewerStore'

const POS: Record<View, [number, number, number]> = { front: [0, 0, 9], back: [0, 0, -9], side: [9, 0, 0] }

/** Mueve la cámara con suavidad cuando se pulsa Frente / Espalda / Lado. */
export default function CameraRig() {
  const view = useViewerStore((s) => s.view)
  const { camera, invalidate } = useThree()
  const controls = useThree((s) => s.controls) as unknown as { update: () => void } | null
  const target = useRef(new THREE.Vector3(...POS.front))
  const moving = useRef(false)

  useEffect(() => { target.current.set(...POS[view]); moving.current = true; invalidate() }, [view, invalidate])

  useFrame((_, dt) => {
    if (!moving.current) return
    easing.damp3(camera.position, target.current, 0.25, dt)
    controls?.update()
    if (camera.position.distanceTo(target.current) < 0.03) moving.current = false
    invalidate()
  })
  return null
}
