import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, sectorGeometry } from './shapes'

/**
 * Caliper carrier in the real H-form: curved rails either side of the disc
 * rim, joined by over-rim bridges at both ends, with radial arms running
 * down to the two mounting ears that bolt to the wheel bearing housing.
 * Same canonical frame as the caliper (centred over 90°, disc axis +Z).
 */
export function brakeCarrier(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  // inboard rail (wider — carries the guide-pin bores)
  const railIn = sectorGeometry(0.162, 0.184, 64, 116, 0.022)
  railIn.translate(0, 0, -0.058)
  parts.push(railIn)

  // outboard rail
  const railOut = sectorGeometry(0.162, 0.184, 68, 112, 0.016)
  railOut.translate(0, 0, 0.028)
  parts.push(railOut)

  // over-rim bridges joining the rails at both ends
  for (const [a0, a1] of [
    [64, 72],
    [108, 116],
  ] as const) {
    const bridge = sectorGeometry(0.166, 0.184, a0, a1, 0.102)
    bridge.translate(0, 0, -0.058)
    parts.push(bridge)
  }

  // radial arms down to the mounting ears, inboard side
  for (const aDeg of [66, 114]) {
    const a = THREE.MathUtils.degToRad(aDeg)
    const arm = new THREE.BoxGeometry(0.075, 0.028, 0.022)
    arm.translate(0.13, 0, 0)
    arm.rotateZ(a)
    arm.translate(0, 0, -0.047)
    parts.push(arm)
    const ear = new THREE.CylinderGeometry(0.014, 0.014, 0.026, 20)
    ear.rotateX(Math.PI / 2)
    ear.translate(Math.cos(a) * 0.096, Math.sin(a) * 0.096, -0.047)
    parts.push(ear)
  }

  return mergeParts(parts)
}
