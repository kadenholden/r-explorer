import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { numParam } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/**
 * 4MOTION driveline (dossier §4): propshaft from the gearbox PTO back to
 * the rear final drive unit, where the Haldex Gen 5 coupling sits AHEAD
 * of the rear differential. Long items are authored in world coordinates
 * (records at the origin), like the exhaust line.
 */

/** Front propshaft section: PTO flange → centre bearing. */
export function propshaftFront(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  parts.push(
    tubeThrough(
      [
        [-0.51, -0.16, -0.16],
        [-0.35, -0.24, -0.35],
        [-0.12, -0.28, -0.58],
      ],
      0.019,
    ),
  )
  // flex-joint discs at both ends
  for (const [x, y, z] of [
    [-0.51, -0.16, -0.16],
    [-0.12, -0.28, -0.58],
  ] as const) {
    const disc = new THREE.CylinderGeometry(0.038, 0.038, 0.016, 16)
    disc.rotateX(Math.PI / 2)
    disc.translate(x, y, z)
    parts.push(disc)
  }
  return mergeParts(parts)
}

/** Centre support bearing with its rubber-mounted bracket. */
export function centerBearing(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const ring = new THREE.TorusGeometry(0.032, 0.012, 10, 20)
  parts.push(ring)
  const bracket = new THREE.BoxGeometry(0.11, 0.012, 0.05)
  bracket.translate(0, 0.045, 0)
  parts.push(bracket)
  return mergeParts(parts)
}

/** Rear propshaft section: centre bearing → Haldex input flange. */
export function propshaftRear(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  parts.push(
    tubeThrough(
      [
        [-0.08, -0.28, -0.64],
        [-0.02, -0.28, -1.0],
        [0, -0.27, -1.32],
      ],
      0.019,
    ),
  )
  const flange = new THREE.CylinderGeometry(0.04, 0.04, 0.016, 16)
  flange.rotateX(Math.PI / 2)
  flange.translate(0, -0.27, -1.32)
  parts.push(flange)
  return mergeParts(parts)
}

/** Rear final drive housing: Haldex section + diff bulge + cover. */
export function rduHousing(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const nose = new THREE.CylinderGeometry(0.065, 0.075, 0.09, 20)
  nose.rotateX(Math.PI / 2)
  nose.translate(0, 0, 0.06)
  parts.push(nose)
  const body = new THREE.SphereGeometry(0.095, 20, 14)
  body.scale(1, 0.85, 1)
  parts.push(body)
  const cover = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 18)
  cover.rotateX(Math.PI / 2)
  cover.translate(0, 0, -0.09)
  parts.push(cover)
  for (const s of [-1, 1]) {
    const stub = new THREE.CylinderGeometry(0.028, 0.028, 0.05, 14)
    stub.rotateZ(Math.PI / 2)
    stub.translate(s * 0.105, 0, -0.01)
    parts.push(stub)
  }
  return mergeParts(parts)
}

/** Haldex Gen 5 coupling internals: plate pack, annular piston, hub. */
export function haldexCoupling(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const drum = new THREE.CylinderGeometry(0.062, 0.062, 0.05, 24, 1, true)
  drum.rotateX(Math.PI / 2)
  parts.push(drum)
  for (const dz of [-0.015, 0, 0.015]) {
    const plate = new THREE.CylinderGeometry(0.058, 0.058, 0.006, 24)
    plate.rotateX(Math.PI / 2)
    plate.translate(0, 0, dz)
    parts.push(plate)
  }
  const piston = new THREE.TorusGeometry(0.045, 0.008, 10, 22)
  piston.translate(0, 0, 0.03)
  parts.push(piston)
  const hub = new THREE.CylinderGeometry(0.018, 0.018, 0.08, 14)
  hub.rotateX(Math.PI / 2)
  parts.push(hub)
  return mergeParts(parts)
}

/** Haldex electro-hydraulic charge pump (0CQ598549): motor can + snout. */
export function haldexPump(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const motor = new THREE.CylinderGeometry(0.024, 0.024, 0.05, 16)
  motor.rotateZ(Math.PI / 2)
  parts.push(motor)
  const snout = new THREE.CylinderGeometry(0.014, 0.014, 0.025, 12)
  snout.rotateZ(Math.PI / 2)
  snout.translate(0.037, 0, 0)
  parts.push(snout)
  const connector = new THREE.BoxGeometry(0.02, 0.012, 0.016)
  connector.translate(-0.02, 0.026, 0)
  parts.push(connector)
  return mergeParts(parts)
}

/** The fine-mesh filter/screen cartridge that clogs on hard-driven cars. */
export function haldexFilter(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const cartridge = new THREE.CylinderGeometry(0.02, 0.02, 0.014, 16)
  parts.push(cartridge)
  const mesh = new THREE.CylinderGeometry(0.016, 0.016, 0.018, 12, 1, true)
  parts.push(mesh)
  return mergeParts(parts)
}

/** Haldex controller (its own ECU on the coupling). */
export function haldexController(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const box = new THREE.BoxGeometry(0.07, 0.02, 0.055)
  parts.push(box)
  const connector = new THREE.BoxGeometry(0.028, 0.014, 0.02)
  connector.translate(0.04, -0.002, 0)
  parts.push(connector)
  return mergeParts(parts)
}

/** Rear differential gear set (crown wheel + carrier). */
export function rearDiffGears(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const crown = new THREE.CylinderGeometry(0.07, 0.07, 0.018, 22)
  crown.rotateZ(Math.PI / 2)
  crown.translate(0.015, 0, 0)
  parts.push(crown)
  const carrier = new THREE.CylinderGeometry(0.042, 0.042, 0.07, 18)
  carrier.rotateZ(Math.PI / 2)
  parts.push(carrier)
  return mergeParts(parts)
}

/** Driveshaft with inner plunge joint, outer Rzeppa CV, and boots.
 *  Authored along +X from the inner joint; `lengthMm` sets the shaft,
 *  `intermediateBearing: 1` adds the mid support (long front-right shaft). */
export function driveshaft(params: GeometryParams): THREE.BufferGeometry {
  const length = numParam(params, 'lengthMm', 450) / 1000
  const withBearing = numParam(params, 'intermediateBearing', 0) === 1
  const parts: THREE.BufferGeometry[] = []

  const inner = new THREE.CylinderGeometry(0.03, 0.03, 0.045, 16)
  inner.rotateZ(Math.PI / 2)
  parts.push(inner)

  const shaft = new THREE.CylinderGeometry(0.011, 0.011, length, 12)
  shaft.rotateZ(Math.PI / 2)
  shaft.translate(length / 2 + 0.02, 0, 0)
  parts.push(shaft)

  const outer = new THREE.SphereGeometry(0.026, 14, 10)
  outer.translate(length + 0.035, 0, 0)
  parts.push(outer)

  // boots as short cones at both joints
  const bootIn = new THREE.CylinderGeometry(0.013, 0.027, 0.04, 12)
  bootIn.rotateZ(Math.PI / 2)
  bootIn.translate(0.045, 0, 0)
  parts.push(bootIn)
  const bootOut = new THREE.CylinderGeometry(0.024, 0.012, 0.035, 12)
  bootOut.rotateZ(Math.PI / 2)
  bootOut.translate(length - 0.005, 0, 0)
  parts.push(bootOut)

  if (withBearing) {
    const ring = new THREE.TorusGeometry(0.018, 0.008, 8, 16)
    ring.rotateY(Math.PI / 2)
    ring.translate(length * 0.45, 0, 0)
    parts.push(ring)
  }
  return mergeParts(parts)
}
