import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/**
 * Exhaust line, authored in world coordinates (records sit at the
 * origin): car length runs along −Z from the turbo outlet toward the
 * rear silencer and the R's quad tips.
 */

/** Cast downpipe with the primary catalyst brick. */
export function downpipeCat(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const pipe = tubeThrough(
    [
      [-0.045, -0.03, -0.31],
      [-0.04, -0.14, -0.36],
      [-0.01, -0.25, -0.41],
      [0, -0.3, -0.47],
    ],
    0.03,
  )
  parts.push(pipe)
  const cat = new THREE.CylinderGeometry(0.055, 0.055, 0.19, 20)
  cat.rotateX(Math.PI / 2)
  cat.translate(0, -0.305, -0.57)
  parts.push(cat)
  const flange = new THREE.CylinderGeometry(0.042, 0.042, 0.012, 16)
  flange.rotateX(Math.PI / 2)
  flange.translate(-0.045, -0.028, -0.3)
  parts.push(flange)
  return mergeParts(parts)
}

/** Front/link pipe from the cat to the resonator. */
export function linkPipe(_params: GeometryParams): THREE.BufferGeometry {
  return tubeThrough(
    [
      [0, -0.305, -0.67],
      [0, -0.325, -0.92],
      [0, -0.33, -1.18],
    ],
    0.027,
  )
}

/** Centre resonator. */
export function resonator(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.052, 0.052, 0.26, 20)
  body.rotateX(Math.PI / 2)
  body.translate(0, -0.33, -1.32)
  parts.push(body)
  for (const z of [-1.46, -1.18]) {
    const stub = new THREE.CylinderGeometry(0.027, 0.027, 0.05, 14)
    stub.rotateX(Math.PI / 2)
    stub.translate(0, -0.33, z)
    parts.push(stub)
  }
  return mergeParts(parts)
}

/** Rear silencer with internal flap valves (separate parts) feeding the
 *  quad tips. */
export function rearSilencer(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.52, 0.17, 0.26)
  body.translate(0, -0.33, -1.59)
  parts.push(body)
  const inlet = new THREE.CylinderGeometry(0.027, 0.027, 0.08, 14)
  inlet.rotateX(Math.PI / 2)
  inlet.translate(0, -0.33, -1.44)
  parts.push(inlet)
  for (const x of [-0.17, 0.17]) {
    const outlet = new THREE.CylinderGeometry(0.024, 0.024, 0.05, 14)
    outlet.rotateX(Math.PI / 2)
    outlet.translate(x, -0.33, -1.74)
    parts.push(outlet)
  }
  return mergeParts(parts)
}

/** One chrome twin-tip outlet (the R has one per side = quad tips). */
export function exhaustTwinTip(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  for (const x of [-0.026, 0.026]) {
    const tip = new THREE.CylinderGeometry(0.021, 0.023, 0.09, 18)
    tip.rotateX(Math.PI / 2)
    tip.translate(x, 0, 0)
    parts.push(tip)
  }
  return mergeParts(parts)
}

/** Electric exhaust-flap actuator on the silencer. */
export function exhaustValveActuator(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const can = new THREE.CylinderGeometry(0.019, 0.019, 0.024, 14)
  parts.push(can)
  const arm = new THREE.BoxGeometry(0.005, 0.02, 0.005)
  arm.translate(0.012, -0.02, 0)
  parts.push(arm)
  return mergeParts(parts)
}
