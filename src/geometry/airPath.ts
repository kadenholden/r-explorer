import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/** Airbox with inlet snorkel and outlet duct toward the turbo. */
export function airbox(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const box = new THREE.BoxGeometry(0.17, 0.13, 0.15)
  parts.push(box)
  const lidLip = new THREE.BoxGeometry(0.176, 0.012, 0.156)
  lidLip.translate(0, 0.02, 0)
  parts.push(lidLip)
  const snorkel = new THREE.BoxGeometry(0.05, 0.035, 0.09)
  snorkel.translate(0, 0.03, 0.11)
  parts.push(snorkel)
  const outlet = new THREE.CylinderGeometry(0.032, 0.032, 0.06, 16)
  outlet.rotateX(Math.PI / 2)
  outlet.translate(0.03, 0, -0.1)
  parts.push(outlet)
  return mergeParts(parts)
}

/** Front-mount air-to-air intercooler: core with fin lines + end tanks. */
export function intercooler(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const core = new THREE.BoxGeometry(0.5, 0.15, 0.05)
  parts.push(core)
  for (let i = 0; i < 9; i++) {
    const fin = new THREE.BoxGeometry(0.003, 0.15, 0.054)
    fin.translate(-0.2 + i * 0.05, 0, 0)
    parts.push(fin)
  }
  for (const x of [-0.28, 0.28]) {
    const tank = new THREE.BoxGeometry(0.065, 0.17, 0.07)
    tank.translate(x, 0, 0)
    parts.push(tank)
    const stub = new THREE.CylinderGeometry(0.021, 0.021, 0.04, 14)
    stub.rotateX(Math.PI / 2)
    stub.translate(x, 0.035, 0.045)
    parts.push(stub)
  }
  return mergeParts(parts)
}

/** Hot-side charge pipe: turbo compressor outlet → intercooler left tank.
 *  Authored in world coordinates (record sits at the origin). */
export function chargePipeHot(_params: GeometryParams): THREE.BufferGeometry {
  // front-mounted turbo down to the intercooler inlet — a short hot-side hop
  return tubeThrough(
    [
      [0.03, 0.02, 0.3],
      [0.12, -0.01, 0.42],
      [0.16, -0.04, 0.54],
    ],
    0.024,
  )
}

/** Cold-side charge pipe: intercooler right tank → throttle body. */
export function chargePipeCold(_params: GeometryParams): THREE.BufferGeometry {
  // intercooler outlet up the nearside and back over the gearbox to the
  // rear-mounted throttle body
  return tubeThrough(
    [
      [-0.16, -0.04, 0.54],
      [-0.3, 0.0, 0.38],
      [-0.33, 0.05, 0.05],
      [-0.28, 0.08, -0.24],
    ],
    0.024,
  )
}

/** Electronic throttle body: bore, mounting flange, actuator pod.
 *  Canonical: bore axis along X. */
export function throttleBody(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const bore = new THREE.CylinderGeometry(0.032, 0.032, 0.05, 20)
  bore.rotateZ(Math.PI / 2)
  parts.push(bore)
  const flange = new THREE.BoxGeometry(0.012, 0.085, 0.085)
  flange.translate(0.024, 0, 0)
  parts.push(flange)
  // butterfly hint inside the bore mouth
  const plate = new THREE.CylinderGeometry(0.028, 0.028, 0.003, 18)
  plate.rotateZ(Math.PI / 2)
  plate.rotateY(0.5)
  parts.push(plate)
  const motorPod = new THREE.CylinderGeometry(0.018, 0.018, 0.035, 14)
  motorPod.rotateX(Math.PI / 2)
  motorPod.translate(0, -0.042, 0)
  parts.push(motorPod)
  return mergeParts(parts)
}
