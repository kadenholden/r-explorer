import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { GeometryParams } from './registry'

/**
 * Schematic caliper carrier: two radial rails joined by cross bridges,
 * with guide-pin bosses on the inboard face. Same canonical frame as the
 * caliper (disc axis along local Z).
 */
export function brakeCarrier(_params: GeometryParams): THREE.BufferGeometry {
  const railLeft = new THREE.BoxGeometry(0.026, 0.115, 0.026)
  railLeft.translate(-0.058, 0, 0)
  const railRight = new THREE.BoxGeometry(0.026, 0.115, 0.026)
  railRight.translate(0.058, 0, 0)

  const bridgeTop = new THREE.BoxGeometry(0.142, 0.02, 0.026)
  bridgeTop.translate(0, 0.048, 0)
  const bridgeBottom = new THREE.BoxGeometry(0.142, 0.02, 0.026)
  bridgeBottom.translate(0, -0.048, 0)

  const bossLeft = new THREE.CylinderGeometry(0.011, 0.011, 0.03, 16)
  bossLeft.rotateX(Math.PI / 2)
  bossLeft.translate(-0.058, 0.048, -0.024)
  const bossRight = new THREE.CylinderGeometry(0.011, 0.011, 0.03, 16)
  bossRight.rotateX(Math.PI / 2)
  bossRight.translate(0.058, -0.048, -0.024)

  const merged = mergeGeometries([railLeft, railRight, bridgeTop, bridgeBottom, bossLeft, bossRight])
  if (!merged) throw new Error('brakeCarrier: merge failed')
  return merged
}
