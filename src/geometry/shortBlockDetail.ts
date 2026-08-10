import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'

/**
 * R1 research detail parts (2026-08-10): the Gen 3 bottom end is five
 * discrete main caps clamped by the structural upper sump — not a
 * one-piece ladder. These recipes model the caps, shells, seals, damper
 * and lubrication hardware the R1 return documented. Canonical frame
 * matches the block: crank axis along X, deck up +Y.
 */

/** One discrete lower main-bearing cap with its two bolt bosses. */
export function mainBearingCap(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.024, 0.048, 0.075)
  body.translate(0, -0.024, 0)
  parts.push(body)
  for (const zSign of [-1, 1]) {
    const boss = new THREE.CylinderGeometry(0.008, 0.008, 0.05, 12)
    boss.translate(0, -0.023, zSign * 0.028)
    parts.push(boss)
    // cross-bolt ear on each side face
    const ear = new THREE.BoxGeometry(0.022, 0.018, 0.008)
    ear.translate(0, -0.03, zSign * 0.0415)
    parts.push(ear)
  }
  return mergeParts(parts)
}

/** Half bearing shell arcing over the +Y side; rotate 180° about X for the cap side. */
export function bearingShell(params: GeometryParams): THREE.BufferGeometry {
  const r = mm(params, 'journalMm', 48) / 2 + 0.002
  const shell = new THREE.TorusGeometry(r, 0.0028, 8, 28, Math.PI)
  shell.rotateY(Math.PI / 2) // torus axis +Z → +X (crank axis)
  return shell
}

/** Flat semicircular thrust washer (axis Y as built; rotate in data to sit on the crank). */
export function thrustWasher(_params: GeometryParams): THREE.BufferGeometry {
  const washer = new THREE.TorusGeometry(0.0305, 0.0038, 6, 28)
  washer.scale(1, 1, 0.45)
  return washer
}

/** The three-ring pack sitting proud of the piston's ring lands (1.2/1.2/2.0 mm). */
export function pistonRingSet(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const r = 0.0421
  for (const [y, h] of [
    [0, 0.0024],
    [-0.0055, 0.0024],
    [-0.0125, 0.0038],
  ] as const) {
    const ring = new THREE.CylinderGeometry(r, r, h, 36)
    ring.translate(0, y, 0)
    parts.push(ring)
  }
  return mergeParts(parts)
}

/** Floating DLC wrist pin, 23 mm dia — axis along X like the crank. */
export function wristPin(_params: GeometryParams): THREE.BufferGeometry {
  const pin = new THREE.CylinderGeometry(0.0115, 0.0115, 0.052, 18)
  pin.rotateZ(Math.PI / 2)
  return pin
}

/** Vibration damper / poly-V crank pulley (axis Y as built; data rotates to X). */
export function vibrationDamper(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const ring = new THREE.CylinderGeometry(0.075, 0.075, 0.02, 36)
  parts.push(ring)
  for (const y of [-0.013, 0.013]) {
    const rib = new THREE.CylinderGeometry(0.0765, 0.0765, 0.004, 36)
    rib.translate(0, y, 0)
    parts.push(rib)
  }
  const hub = new THREE.CylinderGeometry(0.024, 0.024, 0.038, 20)
  parts.push(hub)
  return mergeParts(parts)
}

/** Timing/front cover (oil-pump cover) — thickness along X, hub over the crank nose. */
export function frontCover(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const plate = new THREE.BoxGeometry(0.012, 0.29, 0.21)
  parts.push(plate)
  const boss = new THREE.CylinderGeometry(0.042, 0.042, 0.016, 28)
  boss.rotateZ(Math.PI / 2)
  boss.translate(0.008, -0.06, 0)
  parts.push(boss)
  return mergeParts(parts)
}

/** Front crank seal — PTFE ring, axis along X as built. */
export function crankSeal(_params: GeometryParams): THREE.BufferGeometry {
  const seal = new THREE.TorusGeometry(0.032, 0.0045, 8, 28)
  seal.rotateY(Math.PI / 2)
  return seal
}

/** Gearbox-end sealing flange: plate + integrated PTFE rear main seal + sender ring. */
export function rearSealFlange(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const plate = new THREE.BoxGeometry(0.01, 0.16, 0.17)
  parts.push(plate)
  const seal = new THREE.CylinderGeometry(0.055, 0.055, 0.016, 28)
  seal.rotateZ(Math.PI / 2)
  seal.translate(-0.006, 0, 0)
  parts.push(seal)
  const sender = new THREE.CylinderGeometry(0.062, 0.062, 0.004, 36)
  sender.rotateZ(Math.PI / 2)
  sender.translate(-0.012, 0, 0)
  parts.push(sender)
  return mergeParts(parts)
}

/** Drive-in steel core (frost) plug — shallow cup, axis Y as built. */
export function corePlug(_params: GeometryParams): THREE.BufferGeometry {
  return new THREE.CylinderGeometry(0.017, 0.0162, 0.008, 20)
}

/** Dipstick + guide tube with pull loop (transverse-install per SSP). */
export function dipstickTube(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const tube = new THREE.CylinderGeometry(0.004, 0.004, 0.3, 12)
  parts.push(tube)
  const funnel = new THREE.CylinderGeometry(0.009, 0.005, 0.03, 12)
  funnel.translate(0, 0.135, 0)
  parts.push(funnel)
  const loop = new THREE.TorusGeometry(0.011, 0.0028, 8, 20)
  loop.translate(0, 0.162, 0)
  parts.push(loop)
  return mergeParts(parts)
}

/** Regulated two-stage oil pump: body, drive sprocket toward the flywheel end, snout. */
export function oilPumpTwoStage(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.09, 0.055, 0.07)
  parts.push(body)
  const sprocket = new THREE.CylinderGeometry(0.03, 0.03, 0.008, 22)
  sprocket.rotateZ(Math.PI / 2)
  sprocket.translate(-0.052, 0.008, 0)
  parts.push(sprocket)
  const snout = new THREE.CylinderGeometry(0.012, 0.012, 0.03, 12)
  snout.translate(0.02, -0.04, 0.012)
  parts.push(snout)
  return mergeParts(parts)
}

/** Small hydraulic solenoid valve (N428 / N522): body + connector. */
export function solenoidValve(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.009, 0.009, 0.028, 14)
  parts.push(body)
  const plug = new THREE.BoxGeometry(0.013, 0.01, 0.013)
  plug.translate(0, 0.018, 0)
  parts.push(plug)
  return mergeParts(parts)
}

/** Windage tray / oil baffle plate with louver ridges (lives inside the upper sump). */
export function windageTray(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const plate = new THREE.BoxGeometry(0.36, 0.004, 0.16)
  parts.push(plate)
  for (const x of [-0.1, 0, 0.1]) {
    const louver = new THREE.BoxGeometry(0.02, 0.006, 0.12)
    louver.translate(x, 0.004, 0)
    parts.push(louver)
  }
  return mergeParts(parts)
}

/** Small sealing O-ring, laid flat (axis Y). */
export function oRing(params: GeometryParams): THREE.BufferGeometry {
  const r = mm(params, 'ringDiameterMm', 32) / 2
  const ring = new THREE.TorusGeometry(r, 0.0028, 8, 24)
  ring.rotateX(Math.PI / 2)
  return ring
}
