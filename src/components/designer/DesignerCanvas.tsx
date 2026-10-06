import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, ContactShadows, OrbitControls } from '@react-three/drei'
import GarmentPlaceholder from './three/GarmentPlaceholder'
import CameraRig from './three/CameraRig'

const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

/** Visor 3D. Optimizado para móvil: render solo al cambiar algo, resolución limitada, sin sombras en vivo. */
export default function DesignerCanvas() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: !coarse, powerPreference: 'high-performance' }}
      style={{ touchAction: 'none' }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} />
      <directionalLight position={[-4, 2, -5]} intensity={0.7} />
      <GarmentPlaceholder />
      <ContactShadows position={[0, -2.45, 0]} opacity={0.5} scale={9} blur={2.6} far={4} frames={1} />
      <CameraRig />
      <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.08} minDistance={5} maxDistance={13} />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
