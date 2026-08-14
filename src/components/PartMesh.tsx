import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line, Outlines, useCursor, useGLTF } from '@react-three/drei'
import { damp, damp3 } from 'maath/easing'
import * as THREE from 'three'
import type { PartRecord, PartTransform } from '../types/parts'
import { systemDef } from '../data/taxonomy'
import { resolveRecipe } from '../geometry'
import { isPartVisible, prefersReducedMotion, useAppStore } from '../store/useAppStore'

export const ACCENT = '#4d7fe3' // Lapiz-derived interactive accent

const DEG = Math.PI / 180

/** One part record → one or more placed instances + a numbered callout. */
export function PartMesh({ part }: { part: PartRecord }) {
  const isGlb = part.geometryRef.endsWith('.glb')
  const geometry = useMemo(() => {
    if (isGlb) return null
    const recipe = resolveRecipe(part.geometryRef)
    if (!recipe) {
      console.warn(`No geometry recipe "${part.geometryRef}" for ${part.id} — placeholder used`)
      return new THREE.BoxGeometry(0.04, 0.04, 0.04)
    }
    return recipe(part.geometryParams ?? {})
  }, [part, isGlb])

  useEffect(() => () => geometry?.dispose(), [geometry])

  const hidden = useAppStore((s) => s.hidden)
  const isolated = useAppStore((s) => s.isolated)
  if (!isPartVisible(part, hidden, isolated)) return null

  return (
    <>
      {part.transforms.map((t, i) => (
        <PartInstance
          key={i}
          part={part}
          transform={t}
          geometry={geometry}
          isGlb={isGlb}
          withCallout={i === 0}
        />
      ))}
    </>
  )
}

interface InstanceProps {
  part: PartRecord
  transform: PartTransform
  geometry: THREE.BufferGeometry | null
  isGlb: boolean
  withCallout: boolean
}

function PartInstance({ part, transform, geometry, isGlb, withCallout }: InstanceProps) {
  const group = useRef<THREE.Group>(null)
  const spinGroup = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const selected = useAppStore((s) => s.selectedPartId === part.id)
  const select = useAppStore((s) => s.select)
  const setHoveredPart = useAppStore((s) => s.setHoveredPart)
  const explode = useAppStore((s) => s.explode)
  const p2015Fault = useAppStore((s) => s.p2015) && part.tags.includes('p2015')
  const pcvFault = useAppStore((s) => s.pcvTorn) && part.tags.includes('PCV')
  const faultActive = p2015Fault || pcvFault
  const isFlap = part.tags.includes('runner-flap')
  const isPcv = part.tags.includes('PCV')

  const focusOn = useAppStore((s) => s.focusOn)
  const focusHere = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    const g = group.current
    if (!g) return
    const w = g.getWorldPosition(new THREE.Vector3())
    select(part.id)
    focusOn([w.x, w.y, w.z], part.explodeVector.direction as [number, number, number])
  }

  const hoverOn = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setHovered(true)
    setHoveredPart(part.id)
  }
  const hoverOff = () => {
    setHovered(false)
    setHoveredPart(null)
  }

  const base = useMemo(() => new THREE.Vector3(...transform.position), [transform])
  const dir = useMemo(
    () => new THREE.Vector3(...part.explodeVector.direction),
    [part.explodeVector.direction],
  )
  const target = useMemo(() => new THREE.Vector3(), [])

  // AVS sliding elements shift axially (along the cam, +X) when toggled
  const avsShift = useMemo(() => {
    if (!part.tags.includes('avs-element')) return 0
    const raw = part.geometryParams?.['avsShiftMm']
    return (typeof raw === 'number' ? raw : 14) / 1000
  }, [part])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const state = useAppStore.getState()
    target.copy(dir).multiplyScalar(part.explodeVector.distance * state.explode).add(base)
    if (avsShift > 0 && state.avsLargeLobe) target.x += avsShift
    if (prefersReducedMotion) g.position.copy(target)
    else damp3(g.position, target, 0.18, delta)

    // runner-flap sweep: closed 0 → open ~80°; P2015 jams them mid-travel
    if (isFlap && spinGroup.current) {
      const angle = state.p2015 ? -0.62 : state.flapsOpen ? -1.38 : 0
      if (prefersReducedMotion) spinGroup.current.rotation.x = angle
      else damp(spinGroup.current.rotation, 'x', angle, 0.22, delta)
    }

    // torn PCV diaphragm: the module flutters as crankcase pressure hunts
    if (isPcv && spinGroup.current) {
      if (state.pcvTorn && !prefersReducedMotion) {
        const t = performance.now() / 1000
        spinGroup.current.scale.y = 1 + Math.sin(t * 26) * 0.05
      } else {
        spinGroup.current.scale.y = 1
      }
    }
  })

  const colorMode = useAppStore((s) => s.colorMode)
  const color =
    colorMode === 'system' ? systemDef(part.system).color : (part.color ?? '#8b929e')
  const rotation = useMemo(
    () =>
      new THREE.Euler(
        transform.rotationDeg[0] * DEG,
        transform.rotationDeg[1] * DEG,
        transform.rotationDeg[2] * DEG,
      ),
    [transform],
  )

  const showCallout = withCallout && (explode > 0.12 || selected)

  const FAULT_RED = '#d64f5c'
  return (
    <group ref={group} position={transform.position}>
      <group rotation={rotation}>
        <group ref={spinGroup}>
          {isGlb ? (
            <Suspense fallback={null}>
              <group
                onClick={(e) => {
                  e.stopPropagation()
                  select(part.id)
                }}
                onDoubleClick={focusHere}
                onPointerOver={hoverOn}
                onPointerOut={hoverOff}
              >
                <GlbPart
                  url={`${import.meta.env.BASE_URL}${part.geometryRef}`}
                  scale={
                    typeof part.geometryParams?.['scale'] === 'number'
                      ? (part.geometryParams['scale'] as number)
                      : 1
                  }
                  selected={selected}
                  hovered={hovered}
                />
              </group>
            </Suspense>
          ) : geometry ? (
            <mesh
              geometry={geometry}
              onClick={(e) => {
                e.stopPropagation()
                select(part.id)
              }}
              onDoubleClick={focusHere}
              onPointerOver={hoverOn}
              onPointerOut={hoverOff}
            >
              <meshStandardMaterial
                color={color}
                metalness={0.35}
                roughness={0.55}
                transparent={part.opacity !== null}
                opacity={part.opacity ?? 1}
                depthWrite={part.opacity === null}
                emissive={selected ? ACCENT : faultActive ? FAULT_RED : hovered ? color : '#000000'}
                emissiveIntensity={selected ? 0.4 : faultActive ? 0.32 : hovered ? 0.18 : 0}
              />
              {selected && <Outlines thickness={0.0035} color={ACCENT} />}
            </mesh>
          ) : null}
        </group>
      </group>
      {showCallout && <CalloutMarker part={part} selected={selected} onSelect={select} />}
    </group>
  )
}

function CalloutMarker({
  part,
  selected,
  onSelect,
}: {
  part: PartRecord
  selected: boolean
  onSelect: (id: string) => void
}) {
  const offset = part.calloutOffset ?? [0.05, 0.09, 0]
  return (
    <>
      <Line
        points={[
          [0, 0, 0],
          [offset[0], offset[1], offset[2]],
        ]}
        color="#8b95a8"
        lineWidth={1}
        transparent
        opacity={0.85}
      />
      <Html position={offset} center zIndexRange={[20, 0]}>
        <button
          type="button"
          className={`callout${selected ? ' is-selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(part.id)
          }}
          aria-label={`Select ${part.name}`}
        >
          {part.callout}
        </button>
      </Html>
    </>
  )
}

/** Real-mesh path: a .glb under public/ referenced by geometryRef.
 *  Draco-compressed meshes supported. Selection/hover tint the mesh's
 *  own materials with the accent emissive, restoring the authored look
 *  on deselect — same blue highlight as the schematic parts. */
function GlbPart({
  url,
  scale,
  selected,
  hovered,
}: {
  url: string
  scale: number
  selected: boolean
  hovered: boolean
}) {
  const { scene } = useGLTF(url, true)
  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const materials = new Set<THREE.Material>()
    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mats.forEach((m) => materials.add(m))
    })
    for (const m of materials) {
      const std = m as THREE.MeshStandardMaterial
      if (!(std.emissive instanceof THREE.Color)) continue
      if (std.userData['origEmissive'] === undefined) {
        std.userData['origEmissive'] = std.emissive.getHex()
        std.userData['origEmissiveIntensity'] = std.emissiveIntensity
      }
      if (selected) {
        std.emissive.set(ACCENT)
        std.emissiveIntensity = 0.38
      } else if (hovered) {
        std.emissive.set(ACCENT)
        std.emissiveIntensity = 0.14
      } else {
        std.emissive.setHex(std.userData['origEmissive'] as number)
        std.emissiveIntensity = std.userData['origEmissiveIntensity'] as number
      }
    }
  }, [cloned, selected, hovered])

  return <primitive object={cloned} scale={scale} />
}
