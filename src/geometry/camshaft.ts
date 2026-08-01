import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm, numParam } from './registry'
import { mergeParts } from './shapes'
import { BORE_POSITIONS_X } from './engineBlock'

/**
 * DOHC camshaft along X with two lobes per cylinder and the VVT
 * phaser/sprocket at the chain end (−X). The exhaust cam is built with
 * plain journals where the sliding AVS elements (separate parts) ride;
 * pass avsGaps: 1 to leave those sections bare.
 */
export function camshaft(params: GeometryParams): THREE.BufferGeometry {
  const avsGaps = numParam(params, 'avsGaps', 0) === 1
  const parts: THREE.BufferGeometry[] = []

  const shaft = new THREE.CylinderGeometry(0.0115, 0.0115, 0.42, 16)
  shaft.rotateZ(Math.PI / 2)
  parts.push(shaft)

  if (!avsGaps) {
    BORE_POSITIONS_X.forEach((x) => {
      for (const dx of [-0.012, 0.012]) {
        const lobe = new THREE.CylinderGeometry(0.019, 0.019, 0.011, 18)
        lobe.rotateZ(Math.PI / 2)
        lobe.translate(x + dx, 0.006, 0) // eccentric → reads as a cam lobe
        parts.push(lobe)
      }
    })
  } else {
    // AVS cam: splined carrier sections the sliding elements sit on
    BORE_POSITIONS_X.forEach((x) => {
      const spline = new THREE.CylinderGeometry(0.0135, 0.0135, 0.05, 8)
      spline.rotateZ(Math.PI / 2)
      spline.translate(x, 0, 0)
      parts.push(spline)
    })
  }

  // VVT phaser + sprocket at the chain (flywheel) end
  const phaser = new THREE.CylinderGeometry(0.041, 0.041, 0.02, 24)
  phaser.rotateZ(Math.PI / 2)
  phaser.translate(-0.222, 0, 0)
  parts.push(phaser)

  return mergeParts(parts)
}

/**
 * Sliding AVS cam element: a splined sleeve carrying TWO lobe sets side by
 * side — small lift (inner) and large lift (outer). The electromagnetic
 * actuator slides it axially; the model shifts it when the AVS toggle is
 * on. Canonical: sleeve centred at origin, axis X; small lobes at −x,
 * large at +x.
 */
export function avsCamElement(params: GeometryParams): THREE.BufferGeometry {
  const width = mm(params, 'widthMm', 44)
  const parts: THREE.BufferGeometry[] = []

  const sleeve = new THREE.CylinderGeometry(0.0155, 0.0155, width, 12)
  sleeve.rotateZ(Math.PI / 2)
  parts.push(sleeve)

  // small-lift lobe pair
  for (const dx of [-0.016, -0.006]) {
    const lobe = new THREE.CylinderGeometry(0.018, 0.018, 0.008, 16)
    lobe.rotateZ(Math.PI / 2)
    lobe.translate(dx, 0.004, 0)
    parts.push(lobe)
  }
  // large-lift lobe pair
  for (const dx of [0.006, 0.016]) {
    const lobe = new THREE.CylinderGeometry(0.021, 0.021, 0.008, 16)
    lobe.rotateZ(Math.PI / 2)
    lobe.translate(dx, 0.007, 0)
    parts.push(lobe)
  }
  // shift groove the actuator pin engages
  const groove = new THREE.CylinderGeometry(0.017, 0.017, 0.004, 12)
  groove.rotateZ(Math.PI / 2)
  groove.translate(width / 2 - 0.004, 0, 0)
  parts.push(groove)

  return mergeParts(parts)
}

/** Electromagnetic AVS actuator: solenoid body with the engagement pin. */
export function avsActuator(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.01, 0.01, 0.022, 14)
  parts.push(body)
  const pin = new THREE.CylinderGeometry(0.0025, 0.0025, 0.014, 8)
  pin.translate(0, -0.017, 0)
  parts.push(pin)
  const connector = new THREE.BoxGeometry(0.012, 0.008, 0.016)
  connector.translate(0, 0.014, 0.004)
  parts.push(connector)
  return mergeParts(parts)
}

/** Poppet valve: stem, spring-retainer step, and head. Canonical: stem up
 *  +Y from the head at the origin. Sodium-filled exhaust valves are the
 *  same form, smaller head. */
export function valve(params: GeometryParams): THREE.BufferGeometry {
  const headR = mm(params, 'headDiameterMm', 30) / 2
  const parts: THREE.BufferGeometry[] = []

  const head = new THREE.CylinderGeometry(headR, headR * 0.55, 0.005, 18)
  parts.push(head)
  const stem = new THREE.CylinderGeometry(0.003, 0.003, 0.095, 10)
  stem.translate(0, 0.05, 0)
  parts.push(stem)
  const retainer = new THREE.CylinderGeometry(0.009, 0.009, 0.005, 12)
  retainer.translate(0, 0.093, 0)
  parts.push(retainer)

  return mergeParts(parts)
}
