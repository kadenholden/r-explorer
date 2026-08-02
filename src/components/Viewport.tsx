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
  'front-three-quarter': { label: 'Overview', position: [1.7, 0.9, 1.9], target: [0.25, 0, -0.15] },
  engine: { label: 'Engine', position: [0.7, 0.42, 0.95], target: [0, 0.12, 0] },
  intake: { label: 'Intake', position: [0.55, 0.5, 1.3], target: [0, 0.1, 0.22] },
  'engine-top': { label: 'Engine top', position: [0.02, 1.45, 0.06], target: [0, 0.1, 0] },
  'chain-end': { label: 'Chain end', position: [-0.85, 0.3, 0.55], target: [-0.2, 0.1, 0] },
  transmission: { label: 'Gearbox', position: [-1.15, 0.22, 0.85], target: [-0.45, -0.08, 0] },
  driveline: { label: 'Driveline', position: [1.15, 0.05, -0.45], target: [-0.05, -0.28, -0.75] },
  suspension: { label: 'Suspension', position: [1.6, 0.1, 1.15], target: [0.55, -0.08, 0.03] },
  'rear-axle': { label: 'Rear axle', position: [1.45, 0.12, -1.95], target: [0.35, -0.15, -1.1] },
  'exhaust-line': { label: 'Exhaust', position: [1.05, 0.2, -1.5], target: [0, -0.28, -0.8] },
  'brake-corner': { label: 'Brake corner', position: [1.75, 0.38, 0.72], target: [0.95, 0.05, 0.05] },
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
        position={[0, -0.33, 0]}
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
      <ContactShadows position={[0, -0.325, 0]} opacity={0.5} scale={3.4} blur={2.4} far={0.9} resolution={512} />
      {ASSEMBLIES.map((a) => (
        <group
          key={a.assembly.id}
          position={a.assembly.origin}
          rotation={a.assembly.rotationDeg.map((d) => (d * Math.PI) / 180) as [number, number, number]}
        >
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
