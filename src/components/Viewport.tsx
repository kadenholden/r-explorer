import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, GizmoHelper, GizmoViewcube, Grid, Html, OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { ASSEMBLIES } from '../data/loader'
import { VIEWS } from '../data/views'
import { useAppStore } from '../store/useAppStore'
import { PartMesh } from './PartMesh'

/** Ground markers so any view can be matched to the real car. UK terms:
 *  nearside = passenger/kerb side, offside = driver's side on a RHD car. */
function OrientationMarkers() {
  const show = useAppStore((s) => s.showOrientation)
  if (!show) return null
  const marks: [string, string, [number, number, number]][] = [
    ['FRONT', 'radiator end', [0, -0.3, 1.9]],
    ['REAR', 'tailgate end', [0, -0.3, -4.5]],
    ["DRIVER'S SIDE", 'offside · right', [1.7, -0.3, -1.3]],
    ['PASSENGER SIDE', 'nearside · left', [-1.7, -0.3, -1.3]],
  ]
  return (
    <>
      {marks.map(([label, sub, pos]) => (
        <Html key={label} position={pos} center zIndexRange={[5, 0]}>
          <div className="orient-label">
            <span>{label}</span>
            <em>{sub}</em>
          </div>
        </Html>
      ))}
    </>
  )
}

function CameraRig() {
  const preset = useAppStore((s) => s.cameraPreset)
  const nonce = useAppStore((s) => s.presetNonce)
  const focusPoint = useAppStore((s) => s.focusPoint)
  const focusDir = useAppStore((s) => s.focusDir)
  const focusNonce = useAppStore((s) => s.focusNonce)
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null

  // arrow keys pan the camera — the easiest possible escape from a view
  // that has something in the way
  useEffect(() => {
    if (!controls) return
    controls.keyPanSpeed = 14
    controls.listenToKeyEvents?.(window as unknown as HTMLElement)
  }, [controls])

  useEffect(() => {
    const p = VIEWS[preset]
    if (!p || !controls) return
    // views are authored in CAR space (+x = car's right); the scene is
    // mirrored for display, so flip x on the way to the camera
    camera.position.set(-p.position[0], p.position[1], p.position[2])
    controls.target.set(-p.target[0], p.target[1], p.target[2])
    controls.update()
  }, [preset, nonce, camera, controls])

  // fly-to-part: keep the current viewing direction, land the orbit target on
  // the part and step the camera in to a close working distance
  useEffect(() => {
    if (!focusPoint || !controls) return
    const target = new THREE.Vector3(-focusPoint[0], focusPoint[1], focusPoint[2])
    const dir = focusDir
      ? new THREE.Vector3(-focusDir[0], focusDir[1], focusDir[2])
          .normalize()
          .add(new THREE.Vector3(0, 0.3, 0))
      : camera.position.clone().sub(controls.target)
    if (dir.lengthSq() < 1e-6) dir.set(0.6, 0.4, 0.6)
    dir.normalize().multiplyScalar(0.7)
    controls.target.copy(target)
    camera.position.copy(target.clone().add(dir))
    controls.update()
  }, [focusPoint, focusDir, focusNonce, camera, controls])

  return null
}

/** True below the mobile breakpoint (kept in sync with styles.css). */
function useNarrow(): boolean {
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return narrow
}

export function Viewport() {
  const select = useAppStore((s) => s.select)
  const panMode = useAppStore((s) => s.panMode)
  const inspectorOpen = useAppStore((s) => s.inspectorOpen)
  const narrow = useNarrow()
  const initial = VIEWS['front-three-quarter']
  // the view cube sits in the bottom-right corner of the VISIBLE viewport —
  // i.e. left of the inspector when that is open, and above the bottom sheet
  // on a phone
  const gizmoMargin: [number, number] = narrow ? [60, 60] : [inspectorOpen ? 390 + 70 : 70, 84]

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: initial?.position, fov: 35, near: 0.01, far: 60 }}
      onPointerMissed={() => select(null)}
      gl={{ antialias: true }}
    >
      {/* light technical viewport: pale neutral ground, soft even light, so
          real part colours and ink edge lines read like a drawing */}
      <color attach="background" args={['#e7e9ec']} />
      <hemisphereLight args={['#ffffff', '#b9bec7', 1.0]} />
      <directionalLight position={[2.5, 4, 2]} intensity={1.05} />
      <directionalLight position={[-2, 1.5, -2.5]} intensity={0.4} />
      {/* underside fill — the sump/driveline views look up from below */}
      <directionalLight position={[0.6, -2.2, 1.2]} intensity={0.4} />
      <Grid
        position={[0, -0.33, 0]}
        infiniteGrid
        cellSize={0.1}
        sectionSize={0.5}
        cellThickness={0.45}
        sectionThickness={0.9}
        cellColor="#d5d8de"
        sectionColor="#c0c5cd"
        fadeDistance={8}
        fadeStrength={2}
      />
      <ContactShadows position={[0, -0.325, 0]} opacity={0.32} scale={3.4} blur={2.4} far={0.9} resolution={512} />
      {/* MIRROR (2026-08-15, operator photo-verified): part data is authored
          in CAR space where +x is the car's RIGHT (driver's side, RHD) — but
          with +z as the nose and +y up, that axis renders on the car's left.
          One mirror here puts every part on its true side, so the bonnet-up
          view matches the operator's own photos. */}
      <group scale={[-1, 1, 1]}>
        <OrientationMarkers />
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
      </group>
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={0.08}
        maxDistance={12}
        zoomToCursor
        screenSpacePanning
        panSpeed={1.1}
        mouseButtons={{
          LEFT: panMode ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: panMode ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        target={initial?.target}
      />
      {/* the view cube: faces are labelled in CAR terms. World +x is the
          car's LEFT because of the mirror above, so the face order
          (+x, −x, +y, −y, +z, −z) reads LEFT, RIGHT, TOP, BOTTOM, FRONT, REAR */}
      <GizmoHelper alignment={narrow ? 'top-right' : 'bottom-right'} margin={gizmoMargin}>
        <group scale={1.35}>
          <GizmoViewcube
            faces={['LEFT', 'RIGHT', 'TOP', 'UNDER', 'FRONT', 'REAR']}
            color="#ffffff"
            hoverColor="#cfdcf8"
            textColor="#1b1f27"
            strokeColor="#3a404c"
            opacity={1}
          />
        </group>
      </GizmoHelper>
      <CameraRig />
    </Canvas>
  )
}
