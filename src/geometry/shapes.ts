import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/** Shared 2D/merge helpers for procedural recipes. */

/** Annular sector in the XY plane, angles in radians. */
export function sectorShape(
  rInner: number,
  rOuter: number,
  a0: number,
  a1: number,
): THREE.Shape {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, rOuter, a0, a1, false)
  shape.absarc(0, 0, rInner, a1, a0, true)
  shape.closePath()
  return shape
}

/** Extruded annular sector: angles in degrees, extruded z ∈ [0, depth]. */
export function sectorGeometry(
  rInner: number,
  rOuter: number,
  a0Deg: number,
  a1Deg: number,
  depth: number,
): THREE.ExtrudeGeometry {
  const deg = THREE.MathUtils.degToRad
  return new THREE.ExtrudeGeometry(sectorShape(rInner, rOuter, deg(a0Deg), deg(a1Deg)), {
    depth,
    bevelEnabled: false,
  })
}

/** Full ring (annulus) extruded z ∈ [0, depth]. */
export function ringGeometry(rInner: number, rOuter: number, depth: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, rOuter, 0, Math.PI * 2, false)
  const hole = new THREE.Path()
  hole.absarc(0, 0, rInner, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 48 })
}

/** Tube following a smooth curve through the given points — pipes, hoses. */
export function tubeThrough(
  points: [number, number, number][],
  radius: number,
  closed = false,
): THREE.TubeGeometry {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    closed,
    'catmullrom',
    0.3,
  )
  return new THREE.TubeGeometry(curve, Math.max(24, points.length * 12), radius, 10, closed)
}

/** Merge primitives into one geometry, tolerating indexed + non-indexed mixes
 *  (ExtrudeGeometry is non-indexed; Cylinder/Box are indexed). */
export function mergeParts(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const flat = geometries.map((g) => (g.index ? g.toNonIndexed() : g))
  const merged = mergeGeometries(flat)
  if (!merged) throw new Error('geometry merge failed')
  return merged
}
