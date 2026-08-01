import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Grid, OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { ASSEMBLIES } from '../data/loader'
import { useAppStore } from '../store/useAppStore'
import { PartMesh } from './PartMesh'

interface CameraPreset {
  label: string
  position: [number, number, number]
  target: [number, number, number]
}

export const CAMERA_PRESETS: Record<string, CameraPreset> = {
  'front-three-quarter': { label: 'Front ¾', position: [0.62, 0.44, 0.76], target: [-0.04, 0.05, 0] },
  top: { label: 'Top', position: [0, 1.1, 0.03], target: [-0.04, 0, 0] },
  outboard: { label: 'Outboard', position: [0.03, 0.12, 1.05], target: [-0.04, 0.05, 0] },
  inboard: { label: 'Inboard', position: [-0.28, 0.18, -0.95], target: [-0.04, 0.05, 0] },
}

function CameraRig() {
  const preset = useAppStore((s) => s.cameraPreset)
  const nonce = useAppStore((s) => s.presetNonce)
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null

  useEffect(() => {
    const p = CAMERA_PRESETS[preset]
    if (!p || !controls) return
    camera.position.set(...p.position)
    controls.target.set(...p.target)
    controls.update()
  }, [preset, nonce, camera, controls])

  return null
}

export function Viewport() {
  const select = useAppStore((s) => s.select)
  const initial = CAMERA_PRESETS['front-three-quarter']

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: initial?.position, fov: 35, near: 0.01, far: 50 }}
      onPointerMissed={() => select(null)}
    >
      <color attach="background" args={['#141619']} />
      <hemisphereLight args={['#cfd6e4', '#25282e', 0.6]} />
      <directionalLight position={[2.5, 3, 2]} intensity={1.5} />
      <directionalLight position={[-2, 1.5, -2.5]} intensity={0.55} />
      <Grid
        position={[0, -0.26, 0]}
        infiniteGrid
        cellSize={0.1}
        sectionSize={0.5}
        cellThickness={0.5}
        sectionThickness={1}
        cellColor="#272b33"
        sectionColor="#343a45"
        fadeDistance={5}
        fadeStrength={2.5}
      />
      <ContactShadows position={[0, -0.255, 0]} opacity={0.5} scale={2.4} blur={2.4} far={0.9} resolution={512} />
      {ASSEMBLIES.map((a) => (
        <group key={a.assembly.id}>
          {a.parts.map((p) => (
            <PartMesh key={p.id} part={p} />
          ))}
        </group>
      ))}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={0.12}
        maxDistance={4}
        target={initial?.target}
      />
      <CameraRig />
    </Canvas>
  )
}
