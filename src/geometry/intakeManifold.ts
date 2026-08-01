import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'
import { BORE_POSITIONS_X } from './engineBlock'

/**
 * Plastic variable-runner intake manifold (06L133201FP family): head
 * flange with four port openings, four curved runners dropping to the
 * plenum tube, throttle inlet flange on the plenum end, and the G336
 * sensor boss on the passenger side of the flange. The runner flaps,
 * V157 motor, and G336 sensor are separate parts so the P2015 story can
 * be told. Canonical: flange plane XY at z = 0 (head side), plenum at
 * −Y/+Z, runners along the block's X spacing.
 */
export function intakeManifold(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  // head flange with a slot the flap shaft lives in
  const flange = new THREE.BoxGeometry(0.38, 0.085, 0.014)
  parts.push(flange)

  // four curved runners: flange → plenum
  for (const x of BORE_POSITIONS_X) {
    const runner = tubeThrough(
      [
        [x, 0, 0.004],
        [x, -0.01, 0.045],
        [x, -0.045, 0.095],
        [x, -0.085, 0.135],
      ],
      0.0195,
    )
    parts.push(runner)
  }

  // plenum tube along X, closed with domed ends
  const plenum = new THREE.CylinderGeometry(0.048, 0.048, 0.36, 24)
  plenum.rotateZ(Math.PI / 2)
  plenum.translate(0, -0.095, 0.15)
  parts.push(plenum)
  for (const s of [-1, 1]) {
    const dome = new THREE.SphereGeometry(0.048, 16, 12)
    dome.translate(s * 0.18, -0.095, 0.15)
    parts.push(dome)
  }

  // throttle inlet flange on the −X plenum end
  const inlet = new THREE.CylinderGeometry(0.034, 0.034, 0.03, 18)
  inlet.rotateZ(Math.PI / 2)
  inlet.translate(-0.205, -0.095, 0.15)
  parts.push(inlet)

  // G336 sensor boss, passenger side of the flange
  const boss = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12)
  boss.rotateX(Math.PI / 2)
  boss.translate(0.172, -0.012, 0.012)
  parts.push(boss)

  return mergeParts(parts)
}

/**
 * Runner-flap unit: common shaft through all four runners with a
 * butterfly blade per runner. This part carries the `runner-flap` tag so
 * the viewer animates its rotation (flap sweep / P2015 stuck state).
 * Canonical: shaft along X at the origin; blades' normals along Z when
 * closed.
 */
export function runnerFlaps(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const shaft = new THREE.CylinderGeometry(0.004, 0.004, 0.36, 10)
  shaft.rotateZ(Math.PI / 2)
  parts.push(shaft)
  for (const x of BORE_POSITIONS_X) {
    const blade = new THREE.CylinderGeometry(0.0175, 0.0175, 0.0025, 18)
    blade.rotateX(Math.PI / 2) // disc normal → Z (blocks the runner when closed)
    blade.translate(x, 0, 0)
    parts.push(blade)
  }
  // actuating lever at the motor end
  const lever = new THREE.BoxGeometry(0.008, 0.024, 0.005)
  lever.translate(-0.185, -0.008, 0)
  parts.push(lever)
  return mergeParts(parts)
}

/** V157 intake-manifold flap motor: gearbox housing + motor can + link. */
export function flapMotorV157(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const gearbox = new THREE.BoxGeometry(0.05, 0.045, 0.028)
  parts.push(gearbox)
  const can = new THREE.CylinderGeometry(0.0145, 0.0145, 0.04, 14)
  can.rotateZ(Math.PI / 2)
  can.translate(0.04, -0.005, 0)
  parts.push(can)
  const link = new THREE.BoxGeometry(0.006, 0.028, 0.006)
  link.translate(-0.022, 0.02, 0)
  parts.push(link)
  const connector = new THREE.BoxGeometry(0.02, 0.012, 0.014)
  connector.translate(0, -0.028, 0)
  parts.push(connector)
  return mergeParts(parts)
}

/** G336 flap position sensor (06K907386D): puck + connector tab. */
export function sensorG336(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const puck = new THREE.CylinderGeometry(0.013, 0.013, 0.01, 16)
  puck.rotateX(Math.PI / 2)
  parts.push(puck)
  const tab = new THREE.BoxGeometry(0.016, 0.01, 0.012)
  tab.translate(0.014, 0.008, 0)
  parts.push(tab)
  return mergeParts(parts)
}
