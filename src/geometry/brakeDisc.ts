import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { GeometryParams } from './registry'
import { mm } from './registry'

/**
 * Schematic ventilated brake disc: friction ring + hat, authored with the
 * disc axis along +Y (data transforms orient it in the assembly). The vent
 * gap is suggested by splitting the ring into two thin cheeks.
 */
export function brakeDisc(params: GeometryParams): THREE.BufferGeometry {
  const outerR = mm(params, 'outerDiameterMm', 340) / 2
  const thickness = mm(params, 'thicknessMm', 30)
  const hatR = mm(params, 'hatDiameterMm', 150) / 2
  const hatDepth = mm(params, 'hatDepthMm', 45)

  const cheek = thickness * 0.38
  const gap = thickness - 2 * cheek

  const topCheek = new THREE.CylinderGeometry(outerR, outerR, cheek, 72)
  topCheek.translate(0, gap / 2 + cheek / 2, 0)
  const bottomCheek = new THREE.CylinderGeometry(outerR, outerR, cheek, 72)
  bottomCheek.translate(0, -(gap / 2 + cheek / 2), 0)
  // vane core between the cheeks, slightly inset so the split reads as vents
  const core = new THREE.CylinderGeometry(outerR * 0.97, outerR * 0.97, gap, 72)

  const hat = new THREE.CylinderGeometry(hatR, hatR, hatDepth, 48)
  hat.translate(0, thickness / 2 + hatDepth / 2 - 0.004, 0)

  // centre register on the hat face
  const register = new THREE.CylinderGeometry(hatR * 0.42, hatR * 0.42, 0.006, 32)
  register.translate(0, thickness / 2 + hatDepth - 0.001, 0)

  const merged = mergeGeometries([topCheek, bottomCheek, core, hat, register])
  if (!merged) throw new Error('brakeDisc: merge failed')
  return merged
}
