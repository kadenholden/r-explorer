import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { GeometryParams } from './registry'

/**
 * Schematic single-piston floating caliper, authored straddling the disc
 * plane: disc axis along local Z, radially "up" along +Y. Outboard half at
 * +Z, inboard half (with piston boss) at −Z, joined by two bridge blocks.
 */
export function brakeCaliper(_params: GeometryParams): THREE.BufferGeometry {
  const outerHalf = new THREE.BoxGeometry(0.15, 0.09, 0.028)
  outerHalf.translate(0, 0, 0.036)

  const innerHalf = new THREE.BoxGeometry(0.15, 0.09, 0.028)
  innerHalf.translate(0, 0, -0.036)

  const piston = new THREE.CylinderGeometry(0.027, 0.027, 0.022, 28)
  piston.rotateX(Math.PI / 2)
  piston.translate(0, -0.006, -0.06)

  const bridgeLeft = new THREE.BoxGeometry(0.04, 0.03, 0.1)
  bridgeLeft.translate(-0.048, 0.043, 0)
  const bridgeRight = new THREE.BoxGeometry(0.04, 0.03, 0.1)
  bridgeRight.translate(0.048, 0.043, 0)

  // bleed nipple on the inboard top edge
  const bleed = new THREE.CylinderGeometry(0.004, 0.004, 0.018, 12)
  bleed.translate(0.045, 0.052, -0.036)

  const merged = mergeGeometries([outerHalf, innerHalf, piston, bridgeLeft, bridgeRight, bleed])
  if (!merged) throw new Error('brakeCaliper: merge failed')
  return merged
}
