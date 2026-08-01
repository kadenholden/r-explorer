import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, sectorGeometry } from './shapes'

/**
 * Single-piston floating caliper following the disc's curvature, like the
 * real TRW-style unit: curved outboard face with a raised emblem plate,
 * deeper inboard body carrying the piston boss, two bridge ribs arching
 * over the disc rim (leaving the pad window between them), guide-pin ears
 * at both ends, and a bleed nipple. Canonical frame: disc in the XY plane,
 * axis +Z (outboard), caliper centred over the 90° (12 o'clock) position —
 * assembly data rotates it into place.
 */
export function brakeCaliper(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  // outboard face plate
  const outerFace = sectorGeometry(0.106, 0.178, 60, 120, 0.018)
  outerFace.translate(0, 0, 0.028)
  parts.push(outerFace)

  // raised emblem plate on the outboard face (the "R" plate area)
  const emblem = sectorGeometry(0.126, 0.16, 77, 103, 0.005)
  emblem.translate(0, 0, 0.046)
  parts.push(emblem)

  // inboard body (hydraulic side)
  const innerBody = sectorGeometry(0.1, 0.18, 62, 118, 0.03)
  innerBody.translate(0, 0, -0.062)
  parts.push(innerBody)

  // piston boss on the inboard body
  const piston = new THREE.CylinderGeometry(0.03, 0.03, 0.014, 28)
  piston.rotateX(Math.PI / 2)
  piston.translate(0, 0.138, -0.069)
  parts.push(piston)

  // two bridge ribs over the disc rim — the window between them is the
  // pad-inspection opening of the real caliper
  for (const [a0, a1] of [
    [77, 87],
    [93, 103],
  ] as const) {
    const rib = sectorGeometry(0.148, 0.183, a0, a1, 0.06)
    rib.translate(0, 0, -0.032)
    parts.push(rib)
  }

  // guide-pin ears at both ends of the inboard body
  for (const aDeg of [57, 123]) {
    const a = THREE.MathUtils.degToRad(aDeg)
    const x = Math.cos(a) * 0.13
    const y = Math.sin(a) * 0.13
    const ear = new THREE.BoxGeometry(0.036, 0.026, 0.02)
    ear.rotateZ(a - Math.PI / 2)
    ear.translate(x, y, -0.044)
    parts.push(ear)
    const boss = new THREE.CylinderGeometry(0.009, 0.009, 0.024, 16)
    boss.rotateX(Math.PI / 2)
    boss.translate(x, y, -0.05)
    parts.push(boss)
  }

  // bleed nipple, inboard top edge
  const bleed = new THREE.CylinderGeometry(0.0035, 0.0035, 0.016, 10)
  bleed.rotateX(Math.PI / 2)
  bleed.translate(0.054, 0.148, -0.058)
  parts.push(bleed)

  return mergeParts(parts)
}

/** Electronic-parking-brake actuator (motor-on-caliper, rear axle):
 *  motor can + gear housing + connector. Canonical: can axis along Z
 *  (pointing inboard when fitted on the caliper's piston side). */
export function epbActuator(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const gearbox = new THREE.BoxGeometry(0.045, 0.04, 0.028)
  parts.push(gearbox)
  const can = new THREE.CylinderGeometry(0.017, 0.017, 0.04, 16)
  can.rotateX(Math.PI / 2)
  can.translate(0, -0.005, -0.032)
  parts.push(can)
  const connector = new THREE.BoxGeometry(0.018, 0.01, 0.014)
  connector.translate(0, 0.024, -0.01)
  parts.push(connector)
  return mergeParts(parts)
}
