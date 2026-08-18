import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * Seals, gaskets and the sealed-joint hardware that the oil-leak map needs
 * to be able to point at. A leak map is only useful if every candidate
 * joint exists as a part you can click — these are the ones that were
 * missing (034Motorsport vacuum-pump kit; Alex's Autohaus and DAP on the
 * cam-bridge → upper-timing-cover drip path).
 */

/** Brake vacuum pump: bolts to the end face of the cylinder head, driven
 *  off a camshaft. Its gasket is in every Gen 3 reseal kit, which is
 *  exactly why it belongs on the leak map. */
export function vacuumPump(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  // mounting flange sealed against the head
  const flange = new THREE.CylinderGeometry(0.045, 0.045, 0.008, 20)
  flange.rotateZ(Math.PI / 2)
  parts.push(flange)
  // pump body standing off that face
  const body = new THREE.CylinderGeometry(0.036, 0.036, 0.055, 20)
  body.rotateZ(Math.PI / 2)
  body.translate(0.032, 0, 0)
  parts.push(body)
  // vacuum stub feeding the brake servo
  const stub = new THREE.CylinderGeometry(0.011, 0.011, 0.042, 12)
  stub.translate(0.03, 0.044, 0)
  parts.push(stub)
  for (const z of [-0.036, 0.036]) {
    const boss = new THREE.CylinderGeometry(0.009, 0.009, 0.014, 10)
    boss.rotateZ(Math.PI / 2)
    boss.translate(0.004, 0, z)
    parts.push(boss)
  }
  return mergeParts(parts)
}

/** The upper timing cover's sealing set: the big outer bead against the
 *  head (the usual culprit) plus the two O-rings around the cam-adjuster
 *  magnet openings. Drawn as the seal cord itself so highlighting it shows
 *  the actual leak path rather than the cover. */
export function timingCoverSeals(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const cord = 0.007
  const h = 0.235
  const w = 0.195
  for (const y of [-h / 2, h / 2]) {
    const bar = new THREE.BoxGeometry(0.01, cord, w)
    bar.translate(0, y, 0)
    parts.push(bar)
  }
  for (const z of [-w / 2, w / 2]) {
    const bar = new THREE.BoxGeometry(0.01, h, cord)
    bar.translate(0, 0, z)
    parts.push(bar)
  }
  // cam-adjuster magnet seals
  for (const z of [-0.055, 0.055]) {
    const ring = new THREE.TorusGeometry(0.026, 0.005, 8, 22)
    ring.rotateY(Math.PI / 2)
    ring.translate(0, 0.055, z)
    parts.push(ring)
  }
  return mergeParts(parts)
}

/** A flat gasket standing in the y–z plane: perimeter bead plus the ports
 *  it seals. Used for the oil filter housing / cooler joint to the block. */
export function housingGasket(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const cord = 0.006
  const h = 0.085
  const w = 0.085
  for (const y of [-h / 2, h / 2]) {
    const bar = new THREE.BoxGeometry(0.008, cord, w)
    bar.translate(0, y, 0)
    parts.push(bar)
  }
  for (const z of [-w / 2, w / 2]) {
    const bar = new THREE.BoxGeometry(0.008, h, cord)
    bar.translate(0, 0, z)
    parts.push(bar)
  }
  // the oil feed/return ports through the joint
  for (const z of [-0.02, 0.022]) {
    const port = new THREE.TorusGeometry(0.014, 0.004, 8, 20)
    port.rotateY(Math.PI / 2)
    port.translate(0, 0.004, z)
    parts.push(port)
  }
  return mergeParts(parts)
}
