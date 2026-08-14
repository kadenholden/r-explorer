import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/**
 * Engine ancillaries (dossier §2 — the Phase 2 build-order items caught
 * by the coverage audit): FEAD belt drive on the +X (accessory) end,
 * lubrication, PCV, ignition, and the three-point engine mounting.
 */

/**
 * Lubrication — modelled as the real two-piece sump so each leak path is
 * its own clickable part: aluminium UPPER sump bolting to the block
 * (carrying the pickup and level sensor), the sealed joint, and the
 * LOWER pan with the drain plug.
 */

/** Upper sump: aluminium casting, block-bottom flange, bellhousing-end
 *  buttress, pickup boss and level-sensor boss. */
export function upperSump(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const flange = new THREE.BoxGeometry(0.44, 0.012, 0.21)
  flange.translate(0, 0.024, 0)
  parts.push(flange)
  const body = new THREE.BoxGeometry(0.42, 0.05, 0.2)
  body.translate(0, -0.006, 0)
  parts.push(body)
  // lower mating flange (the joint that seals to the lower pan)
  const lowerFlange = new THREE.BoxGeometry(0.43, 0.01, 0.205)
  lowerFlange.translate(0, -0.036, 0)
  parts.push(lowerFlange)
  // stiffening buttress at the gearbox end
  const buttress = new THREE.BoxGeometry(0.03, 0.06, 0.19)
  buttress.translate(-0.2, -0.01, 0)
  parts.push(buttress)
  // pickup + level-sensor bosses
  const pickupBoss = new THREE.CylinderGeometry(0.018, 0.018, 0.03, 12)
  pickupBoss.translate(-0.09, -0.02, 0.05)
  parts.push(pickupBoss)
  const sensorBoss = new THREE.CylinderGeometry(0.014, 0.014, 0.02, 10)
  sensorBoss.translate(0.12, -0.02, -0.08)
  parts.push(sensorBoss)
  return mergeParts(parts)
}

/** The upper-to-lower sump sealing joint: a thin flange ring standing in
 *  for the sealant bead (VW seals this joint with sealant, not a gasket). */
export function sumpSealJoint(_params: GeometryParams): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-0.215, -0.1)
  shape.lineTo(0.215, -0.1)
  shape.lineTo(0.215, 0.1)
  shape.lineTo(-0.215, 0.1)
  shape.closePath()
  const hole = new THREE.Path()
  hole.moveTo(-0.2, -0.086)
  hole.lineTo(0.2, -0.086)
  hole.lineTo(0.2, 0.086)
  hole.lineTo(-0.2, 0.086)
  hole.closePath()
  shape.holes.push(hole)
  const g = new THREE.ExtrudeGeometry(shape, { depth: 0.004, bevelEnabled: false })
  g.rotateX(-Math.PI / 2)
  return g
}

/** Lower sump pan with drain boss. */
export function lowerSump(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const flange = new THREE.BoxGeometry(0.43, 0.01, 0.205)
  flange.translate(0, 0.03, 0)
  parts.push(flange)
  const body = new THREE.BoxGeometry(0.4, 0.045, 0.19)
  body.translate(0, 0.003, 0)
  parts.push(body)
  const deep = new THREE.BoxGeometry(0.22, 0.05, 0.165)
  deep.translate(-0.07, -0.04, 0)
  parts.push(deep)
  const drainBoss = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12)
  drainBoss.translate(-0.07, -0.068, 0)
  parts.push(drainBoss)
  return mergeParts(parts)
}

/** Drain plug with its crush washer. */
export function drainPlug(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const washer = new THREE.CylinderGeometry(0.012, 0.012, 0.002, 14)
  parts.push(washer)
  const head = new THREE.CylinderGeometry(0.009, 0.009, 0.012, 6)
  head.translate(0, -0.007, 0)
  parts.push(head)
  return mergeParts(parts)
}

/** Oil pickup: strainer box on its tube up to the pump. */
export function oilPickup(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const strainer = new THREE.BoxGeometry(0.09, 0.018, 0.06)
  parts.push(strainer)
  const tube = new THREE.CylinderGeometry(0.011, 0.011, 0.075, 12)
  tube.rotateZ(-0.25)
  tube.translate(0.022, 0.045, 0)
  parts.push(tube)
  const flange = new THREE.CylinderGeometry(0.018, 0.018, 0.006, 12)
  flange.translate(0.04, 0.082, 0)
  parts.push(flange)
  return mergeParts(parts)
}

/** Oil filter housing / cooler module on the block — the classic
 *  "looks like a sump leak" culprit because it drips downward. */
export function oilFilterHousing(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.09, 0.08, 0.08)
  parts.push(body)
  // Gen 3 cartridge filter stands UP out of the housing — the cap faces the
  // sky and is changed from above with a 32 mm socket (operator-verified
  // correction: it previously hung downward like an old spin-on)
  const canister = new THREE.CylinderGeometry(0.042, 0.042, 0.075, 18)
  canister.translate(0, 0.06, 0)
  parts.push(canister)
  const cap = new THREE.CylinderGeometry(0.04, 0.04, 0.016, 6)
  cap.translate(0, 0.106, 0)
  parts.push(cap)
  // oil-to-coolant cooler stack on the side
  const cooler = new THREE.BoxGeometry(0.02, 0.055, 0.07)
  cooler.translate(0.055, 0.005, 0)
  parts.push(cooler)
  return mergeParts(parts)
}

/** Oil level / temperature sensor puck in the sump floor. */
export function oilLevelSensor(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const puck = new THREE.CylinderGeometry(0.016, 0.016, 0.012, 14)
  parts.push(puck)
  const connector = new THREE.BoxGeometry(0.018, 0.012, 0.014)
  connector.translate(0, -0.012, 0)
  parts.push(connector)
  return mergeParts(parts)
}

/** Valve/cam cover with the integrated PCV diaphragm dome. */
export function valveCoverPcv(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const cover = new THREE.BoxGeometry(0.43, 0.045, 0.21)
  parts.push(cover)
  for (const z of [-0.05, 0.05]) {
    const ridge = new THREE.CylinderGeometry(0.028, 0.028, 0.42, 14)
    ridge.rotateZ(Math.PI / 2)
    ridge.translate(0, 0.02, z)
    parts.push(ridge)
  }
  // PCV valve dome + breather hose stub — THE diaphragm that fails
  const dome = new THREE.CylinderGeometry(0.032, 0.036, 0.022, 16)
  dome.translate(0.1, 0.038, 0.055)
  parts.push(dome)
  const hose = new THREE.CylinderGeometry(0.009, 0.009, 0.05, 10)
  hose.rotateX(Math.PI / 2)
  hose.translate(0.1, 0.04, 0.1)
  parts.push(hose)
  return mergeParts(parts)
}

/** Ignition coil ("pencil" coil-on-plug): head, body, plug tube. */
export function ignitionCoil(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const head = new THREE.BoxGeometry(0.03, 0.02, 0.036)
  head.translate(0, 0.036, 0)
  parts.push(head)
  const body = new THREE.CylinderGeometry(0.012, 0.012, 0.03, 12)
  body.translate(0, 0.012, 0)
  parts.push(body)
  const tube = new THREE.CylinderGeometry(0.008, 0.008, 0.045, 10)
  tube.translate(0, -0.026, 0)
  parts.push(tube)
  return mergeParts(parts)
}

/** FEAD: serpentine belt band looping crank, alternator and A/C pulleys
 *  (with the pulleys and auto-tensioner), in the +X accessory-end plane.
 *  Authored in world coordinates. */
export function feadBelt(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const PLANE_X = 0.245
  // pulleys: [y, z, radius]
  const pulleys: [number, number, number][] = [
    [-0.09, 0, 0.075], // crank
    [0.06, 0.12, 0.038], // alternator
    [-0.14, 0.13, 0.045], // A/C compressor
  ]
  for (const [y, z, r] of pulleys) {
    const pulley = new THREE.CylinderGeometry(r, r, 0.022, 22)
    pulley.rotateZ(Math.PI / 2)
    pulley.translate(PLANE_X, y, z)
    parts.push(pulley)
  }
  // tensioner idler
  const idler = new THREE.CylinderGeometry(0.028, 0.028, 0.018, 16)
  idler.rotateZ(Math.PI / 2)
  idler.translate(PLANE_X, -0.02, 0.16)
  parts.push(idler)
  // belt band approximated as a loop around the pulley centres
  const belt = tubeThrough(
    [
      [PLANE_X, 0.1, 0.11],
      [PLANE_X, 0.05, 0.16],
      [PLANE_X, -0.02, 0.19],
      [PLANE_X, -0.14, 0.176],
      [PLANE_X, -0.185, 0.09],
      [PLANE_X, -0.165, -0.05],
      [PLANE_X, -0.05, -0.075],
      [PLANE_X, 0.05, -0.02],
      [PLANE_X, 0.098, 0.08],
    ],
    0.006,
    true,
  )
  parts.push(belt)
  return mergeParts(parts)
}

/** Alternator: body, rear vents, pulley on +X face. */
export function alternator(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.055, 0.055, 0.09, 20)
  body.rotateZ(Math.PI / 2)
  parts.push(body)
  const pulley = new THREE.CylinderGeometry(0.038, 0.038, 0.02, 16)
  pulley.rotateZ(Math.PI / 2)
  pulley.translate(0.056, 0, 0)
  parts.push(pulley)
  const lug = new THREE.BoxGeometry(0.07, 0.02, 0.02)
  lug.translate(0, -0.062, 0)
  parts.push(lug)
  return mergeParts(parts)
}

/** A/C compressor: stubbier drum with clutch pulley and ports. */
export function acCompressor(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.052, 0.052, 0.11, 18)
  body.rotateZ(Math.PI / 2)
  parts.push(body)
  const pulley = new THREE.CylinderGeometry(0.045, 0.045, 0.024, 18)
  pulley.rotateZ(Math.PI / 2)
  pulley.translate(0.067, 0, 0)
  parts.push(pulley)
  for (const z of [-0.02, 0.02]) {
    const port = new THREE.CylinderGeometry(0.009, 0.009, 0.02, 10)
    port.translate(-0.03, 0.056, z)
    parts.push(port)
  }
  return mergeParts(parts)
}

/** Starter motor: main body + solenoid barrel + nose. */
export function starterMotor(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.034, 0.034, 0.11, 16)
  body.rotateZ(Math.PI / 2)
  parts.push(body)
  const solenoid = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 12)
  solenoid.rotateZ(Math.PI / 2)
  solenoid.translate(0.01, 0.045, 0)
  parts.push(solenoid)
  const nose = new THREE.CylinderGeometry(0.024, 0.03, 0.03, 12)
  nose.rotateZ(Math.PI / 2)
  nose.translate(0.068, 0, 0)
  parts.push(nose)
  return mergeParts(parts)
}

/** Hydraulic engine/transmission mount: rubber-hydraulic puck + bracket. */
export function hydraulicMount(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const puck = new THREE.CylinderGeometry(0.05, 0.055, 0.05, 18)
  parts.push(puck)
  const plate = new THREE.BoxGeometry(0.13, 0.012, 0.09)
  plate.translate(0, 0.03, 0)
  parts.push(plate)
  const arm = new THREE.BoxGeometry(0.09, 0.03, 0.035)
  arm.translate(0.08, 0.02, 0)
  parts.push(arm)
  return mergeParts(parts)
}

/** Dogbone / pendulum torque arm down to the subframe. */
export function dogboneMount(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const arm = new THREE.BoxGeometry(0.045, 0.028, 0.16)
  arm.translate(0, 0, -0.06)
  parts.push(arm)
  for (const z of [0, -0.14]) {
    const bush = new THREE.CylinderGeometry(0.024, 0.024, 0.045, 14)
    bush.rotateZ(Math.PI / 2)
    bush.translate(0, 0, z)
    parts.push(bush)
  }
  return mergeParts(parts)
}
