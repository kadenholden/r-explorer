import { useEffect } from 'react'
import * as THREE from 'three'
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
  'front-three-quarter': { label: 'Overview', position: [3.1, 1.3, 2.9], target: [0, 0.1, -1.0] },
  engine: { label: 'Engine', position: [0.7, 0.42, 0.95], target: [0, 0.12, 0] },
  intake: { label: 'Intake', position: [0.42, 0.95, 0.55], target: [0, 0.2, -0.18] },
  'engine-top': { label: 'Engine top', position: [0.02, 1.45, 0.06], target: [0, 0.1, 0] },
  'chain-end': { label: 'Chain end', position: [-0.6, 0.9, 0.55], target: [-0.28, 0.14, 0] },
  transmission: { label: 'Gearbox', position: [-0.9, -0.12, 1.05], target: [-0.45, -0.05, 0] },
  driveline: { label: 'Driveline', position: [1.35, 0.05, -0.55], target: [-0.05, -0.28, -1.5] },
  suspension: { label: 'Suspension', position: [1.6, 0.1, 1.15], target: [0.55, -0.08, 0.03] },
  'rear-axle': { label: 'Rear axle', position: [2.3, 0.45, -4.1], target: [0.2, -0.15, -2.55] },
  'exhaust-line': { label: 'Exhaust', position: [1.3, 0.2, -2.9], target: [0, -0.3, -1.8] },
  'brake-corner': { label: 'Brake corner', position: [1.75, 0.38, 0.72], target: [0.95, 0.05, 0.05] },
  cabin: { label: 'Cabin', position: [1.1, 1.7, 0.5], target: [0.15, 0.1, -0.75] },
  sump: { label: 'Sump', position: [0.72, -0.62, 0.62], target: [0, -0.22, 0] },
}

function CameraRig() {
  const preset = useAppStore((s) => s.cameraPreset)
  const nonce = useAppStore((s) => s.presetNonce)
  const focusPoint = useAppStore((s) => s.focusPoint)
  const focusDir = useAppStore((s) => s.focusDir)
  const focusNonce = useAppStore((s) => s.focusNonce)
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null

  useEffect(() => {
    const p = CAMERA_PRESETS[preset]
    if (!p || !controls) return
    camera.position.set(...p.position)
    controls.target.set(...p.target)
    controls.update()
  }, [preset, nonce, camera, controls])

  // fly-to-part: keep the current viewing direction, land the orbit target on
  // the part and step the camera in to a close working distance
  useEffect(() => {
    if (!focusPoint || !controls) return
    const target = new THREE.Vector3(...focusPoint)
    const dir = focusDir
      ? new THREE.Vector3(...focusDir).normalize().add(new THREE.Vector3(0, 0.3, 0))
      : camera.position.clone().sub(controls.target)
    if (dir.lengthSq() < 1e-6) dir.set(0.6, 0.4, 0.6)
    dir.normalize().multiplyScalar(0.7)
    controls.target.copy(target)
    camera.position.copy(target.clone().add(dir))
    controls.update()
  }, [focusPoint, focusDir, focusNonce, camera, controls])

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
      {/* underside fill — the sump/driveline views look up from below */}
      <directionalLight position={[0.6, -2.2, 1.2]} intensity={0.5} />
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
        minDistance={0.08}
        maxDistance={5}
        zoomToCursor
        screenSpacePanning
        panSpeed={0.9}
        target={initial?.target}
      />
      <CameraRig />
    </Canvas>
  )
}
