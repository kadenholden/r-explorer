import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { GeometryParams } from './registry'
import { mm } from './registry'

/**
 * Shared fastener library — every assembly references these instead of
 * defining its own hardware. Recipes are parameterised by class dimensions
 * (mm); the part record carries the torque value as metadata.
 *
 * Canonical frame: origin at the joint face under the head, shank down −Y,
 * head up +Y.
 */

export function hexBolt(params: GeometryParams): THREE.BufferGeometry {
  const shankR = mm(params, 'shankDiameterMm', 8) / 2
  const shankL = mm(params, 'shankLengthMm', 30)
  const acrossFlats = mm(params, 'headAcrossFlatsMm', 13)
  const headR = acrossFlats / Math.sqrt(3)
  const headH = Math.max(shankR * 1.3, 0.004)

  const shank = new THREE.CylinderGeometry(shankR, shankR * 0.92, shankL, 20)
  shank.translate(0, -shankL / 2, 0)

  const flange = new THREE.CylinderGeometry(headR * 1.25, headR * 1.25, 0.002, 24)
  flange.translate(0, 0.001, 0)

  const head = new THREE.CylinderGeometry(headR, headR, headH, 6)
  head.translate(0, 0.002 + headH / 2, 0)

  const merged = mergeGeometries([shank, flange, head])
  if (!merged) throw new Error('hexBolt: merge failed')
  return merged
}
