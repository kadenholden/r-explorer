import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm, numParam } from './registry'
import { mergeParts, ringGeometry } from './shapes'

/**
 * Ventilated brake disc, dimensioned from the dossier: 340 × 30 mm friction
 * ring, 5×112 wheel-bolt pattern, 57.1 mm centre bore. Two friction cheeks
 * with real radial vanes between them, a hat skirt, and a drilled hat face
 * (bolt holes + centre bore are genuine holes). Canonical frame: disc in
 * the XY plane, axis along +Z, hat face toward +Z (outboard).
 */
export function brakeDisc(params: GeometryParams): THREE.BufferGeometry {
  const outerR = mm(params, 'outerDiameterMm', 340) / 2
  const thickness = mm(params, 'thicknessMm', 30)
  const ringInnerR = mm(params, 'ringInnerDiameterMm', 176) / 2
  const hatFaceR = mm(params, 'hatFaceDiameterMm', 144) / 2
  const hatDepth = mm(params, 'hatDepthMm', 45)
  const pcdR = mm(params, 'pcdMm', 112) / 2
  const boltHoleR = mm(params, 'boltHoleDiameterMm', 15) / 2
  const boreR = mm(params, 'centerBoreMm', 57.1) / 2
  const boltCount = numParam(params, 'boltHoleCount', 5)
  const ventCount = numParam(params, 'ventCount', 36)

  const cheek = thickness * 0.37
  const gap = thickness - 2 * cheek
  const parts: THREE.BufferGeometry[] = []

  // friction cheeks (annuli) either side of the vane gap
  const cheekOut = ringGeometry(ringInnerR, outerR, cheek)
  cheekOut.translate(0, 0, gap / 2)
  parts.push(cheekOut)
  const cheekIn = ringGeometry(ringInnerR, outerR, cheek)
  cheekIn.translate(0, 0, -(gap / 2 + cheek))
  parts.push(cheekIn)

  // radial cooling vanes in the gap
  for (let i = 0; i < ventCount; i++) {
    const vane = new THREE.BoxGeometry(outerR - ringInnerR - 0.006, 0.0045, gap)
    vane.translate((outerR + ringInnerR) / 2, 0, 0)
    vane.rotateZ((i / ventCount) * Math.PI * 2)
    parts.push(vane)
  }

  // hat skirt from the ring's outboard face up to the hat face
  const faceThickness = 0.007
  const skirtH = hatDepth - faceThickness
  const skirt = new THREE.CylinderGeometry(hatFaceR, hatFaceR + 0.004, skirtH, 48, 1, true)
  skirt.rotateX(Math.PI / 2)
  skirt.translate(0, 0, thickness / 2 + skirtH / 2)
  parts.push(skirt)

  // drilled hat face: centre bore + wheel-bolt circle as real holes
  const faceShape = new THREE.Shape()
  faceShape.absarc(0, 0, hatFaceR, 0, Math.PI * 2, false)
  const bore = new THREE.Path()
  bore.absarc(0, 0, boreR, 0, Math.PI * 2, true)
  faceShape.holes.push(bore)
  for (let i = 0; i < boltCount; i++) {
    const a = (i / boltCount) * Math.PI * 2
    const hole = new THREE.Path()
    hole.absarc(Math.cos(a) * pcdR, Math.sin(a) * pcdR, boltHoleR, 0, Math.PI * 2, true)
    faceShape.holes.push(hole)
  }
  const face = new THREE.ExtrudeGeometry(faceShape, {
    depth: faceThickness,
    bevelEnabled: false,
    curveSegments: 40,
  })
  face.translate(0, 0, thickness / 2 + skirtH)
  parts.push(face)

  return mergeParts(parts)
}
