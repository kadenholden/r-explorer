import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * Balance shaft (spheroidal graphite cast iron, runs at 2× crank speed):
 * shaft with two eccentric counterweight segments and the drive gear at
 * the flywheel end. Canonical: axis along X.
 */
export function balanceShaft(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  const shaft = new THREE.CylinderGeometry(0.0115, 0.0115, 0.34, 16)
  shaft.rotateZ(Math.PI / 2)
  parts.push(shaft)

  // eccentric counterweights (half-moon reading via offset cylinders)
  for (const x of [-0.07, 0.09]) {
    const weight = new THREE.CylinderGeometry(0.028, 0.028, 0.052, 20)
    weight.rotateZ(Math.PI / 2)
    weight.translate(x, -0.014, 0)
    parts.push(weight)
  }

  // drive gear, flywheel end (−X)
  const gear = new THREE.CylinderGeometry(0.034, 0.034, 0.012, 24)
  gear.rotateZ(Math.PI / 2)
  gear.translate(-0.182, 0, 0)
  parts.push(gear)

  return mergeParts(parts)
}
