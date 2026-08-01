import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm, numParam } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/** Coil spring as a true helix. */
function helix(r: number, height: number, turns: number, wireR: number): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = []
  const n = Math.ceil(turns * 16)
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const a = t * turns * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * r, t * height, Math.sin(a) * r))
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n * 2, wireR, 8)
}

/** Standalone coil spring (rear axle — spring separate from damper). */
export function coilSpring(params: GeometryParams): THREE.BufferGeometry {
  const height = mm(params, 'heightMm', 180)
  const r = mm(params, 'diameterMm', 110) / 2
  return helix(r, height, numParam(params, 'turns', 5), 0.007)
}

/** MacPherson strut: damper tube + rod, coil spring around it, top mount.
 *  Canonical: axis +Y from the knuckle clamp at the origin. */
export function strutFront(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const tube = new THREE.CylinderGeometry(0.024, 0.024, 0.2, 16)
  tube.translate(0, 0.1, 0)
  parts.push(tube)
  const rod = new THREE.CylinderGeometry(0.01, 0.01, 0.17, 10)
  rod.translate(0, 0.27, 0)
  parts.push(rod)
  const spring = helix(0.062, 0.19, 5, 0.0075)
  spring.translate(0, 0.12, 0)
  parts.push(spring)
  const seat = new THREE.CylinderGeometry(0.07, 0.07, 0.006, 18)
  seat.translate(0, 0.115, 0)
  parts.push(seat)
  const topMount = new THREE.CylinderGeometry(0.055, 0.065, 0.03, 18)
  topMount.translate(0, 0.36, 0)
  parts.push(topMount)
  const clamp = new THREE.BoxGeometry(0.05, 0.07, 0.05)
  clamp.translate(0, 0.01, 0)
  parts.push(clamp)
  return mergeParts(parts)
}

/** Rear passive damper (no DCC on this car). Canonical: axis +Y. */
export function damperRear(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.02, 0.02, 0.17, 14)
  body.translate(0, 0.085, 0)
  parts.push(body)
  const rod = new THREE.CylinderGeometry(0.008, 0.008, 0.14, 10)
  rod.translate(0, 0.23, 0)
  parts.push(rod)
  const topEye = new THREE.TorusGeometry(0.014, 0.007, 8, 14)
  topEye.translate(0, 0.31, 0)
  parts.push(topEye)
  const bottomEye = new THREE.TorusGeometry(0.014, 0.007, 8, 14)
  bottomEye.translate(0, 0, 0)
  parts.push(bottomEye)
  return mergeParts(parts)
}

/** Front lower control arm ("low wishbone"): plate arm with two inboard
 *  bushes and the outboard ball joint. Canonical: ball joint at +X. */
export function lowerControlArm(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const shape = new THREE.Shape()
  shape.moveTo(0, -0.1)
  shape.lineTo(0.34, -0.02)
  shape.lineTo(0.38, 0.02)
  shape.lineTo(0.3, 0.05)
  shape.lineTo(0.02, 0.1)
  shape.lineTo(-0.03, 0.05)
  shape.closePath()
  const plate = new THREE.ExtrudeGeometry(shape, { depth: 0.018, bevelEnabled: false })
  plate.rotateX(-Math.PI / 2)
  parts.push(plate)
  for (const [x, z] of [
    [0, -0.09],
    [0, 0.09],
  ] as const) {
    const bush = new THREE.CylinderGeometry(0.02, 0.02, 0.04, 12)
    bush.rotateX(Math.PI / 2)
    bush.translate(x, 0.01, z)
    parts.push(bush)
  }
  const ballJoint = new THREE.SphereGeometry(0.02, 12, 10)
  ballJoint.translate(0.37, 0.02, 0)
  parts.push(ballJoint)
  return mergeParts(parts)
}

/** Front steering knuckle / bearing housing: upright with hub boss,
 *  strut clamp on top, ball-joint taper below, steering arm.
 *  Canonical: hub axis +X (outboard), vertical +Y. */
export function steeringKnuckle(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const upright = new THREE.BoxGeometry(0.035, 0.3, 0.09)
  upright.translate(0, 0.02, 0)
  parts.push(upright)
  const hubBoss = new THREE.CylinderGeometry(0.062, 0.062, 0.05, 20)
  hubBoss.rotateZ(Math.PI / 2)
  hubBoss.translate(0.035, 0, 0)
  parts.push(hubBoss)
  const hubFlange = new THREE.CylinderGeometry(0.075, 0.075, 0.014, 20)
  hubFlange.rotateZ(Math.PI / 2)
  hubFlange.translate(0.068, 0, 0)
  parts.push(hubFlange)
  const strutClamp = new THREE.BoxGeometry(0.045, 0.07, 0.05)
  strutClamp.translate(0, 0.19, 0)
  parts.push(strutClamp)
  const bjTaper = new THREE.CylinderGeometry(0.012, 0.02, 0.04, 10)
  bjTaper.translate(0, -0.15, 0)
  parts.push(bjTaper)
  const steerArm = new THREE.BoxGeometry(0.025, 0.02, 0.11)
  steerArm.translate(0, -0.04, -0.075)
  parts.push(steerArm)
  return mergeParts(parts)
}

/** Rear wheel carrier: upright + hub boss (same canonical frame). */
export function wheelCarrier(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.035, 0.24, 0.12)
  parts.push(body)
  const hubBoss = new THREE.CylinderGeometry(0.06, 0.06, 0.045, 20)
  hubBoss.rotateZ(Math.PI / 2)
  hubBoss.translate(0.032, 0, 0)
  parts.push(hubBoss)
  const hubFlange = new THREE.CylinderGeometry(0.072, 0.072, 0.013, 20)
  hubFlange.rotateZ(Math.PI / 2)
  hubFlange.translate(0.062, 0, 0)
  parts.push(hubFlange)
  return mergeParts(parts)
}

/** Subframe: perimeter frame with mounting horns. `lengthMm` along Z. */
export function subframe(params: GeometryParams): THREE.BufferGeometry {
  const w = mm(params, 'widthMm', 840)
  const l = mm(params, 'lengthMm', 360)
  const parts: THREE.BufferGeometry[] = []
  for (const s of [-1, 1]) {
    const rail = new THREE.BoxGeometry(0.06, 0.05, l)
    rail.translate((s * w) / 2, 0, 0)
    parts.push(rail)
    const horn = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 10)
    horn.translate((s * w) / 2, 0.04, l / 2 - 0.03)
    parts.push(horn)
  }
  for (const zs of [-1, 1]) {
    const cross = new THREE.BoxGeometry(w, 0.045, 0.07)
    cross.translate(0, 0, (zs * (l - 0.07)) / 2)
    parts.push(cross)
  }
  return mergeParts(parts)
}

/** Anti-roll bar: U-shaped bar. `spanMm` across, `armMm` rearward arms. */
export function antiRollBar(params: GeometryParams): THREE.BufferGeometry {
  const span = mm(params, 'spanMm', 1000)
  const arm = mm(params, 'armMm', 220)
  return tubeThrough(
    [
      [-span / 2, 0.03, arm],
      [-span / 2, 0, arm * 0.35],
      [-span / 2 + 0.06, 0, 0],
      [span / 2 - 0.06, 0, 0],
      [span / 2, 0, arm * 0.35],
      [span / 2, 0.03, arm],
    ],
    0.012,
  )
}

/** ARB drop link: rod with eyes both ends, canonical +Y. */
export function dropLink(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const rod = new THREE.CylinderGeometry(0.006, 0.006, 0.1, 8)
  rod.translate(0, 0.05, 0)
  parts.push(rod)
  for (const y of [0, 0.1]) {
    const eye = new THREE.SphereGeometry(0.011, 10, 8)
    eye.translate(0, y, 0)
    parts.push(eye)
  }
  return mergeParts(parts)
}

/** Electromechanical progressive steering rack: housing, motor, boots.
 *  Canonical: rack axis along X. */
export function epsRack(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const housing = new THREE.CylinderGeometry(0.026, 0.026, 0.66, 16)
  housing.rotateZ(Math.PI / 2)
  parts.push(housing)
  const motor = new THREE.CylinderGeometry(0.042, 0.042, 0.09, 18)
  motor.rotateZ(Math.PI / 2)
  motor.translate(0.1, -0.04, 0.02)
  parts.push(motor)
  const pinion = new THREE.CylinderGeometry(0.02, 0.02, 0.07, 12)
  pinion.rotateX(-Math.PI / 5)
  pinion.translate(-0.12, 0.045, 0.02)
  parts.push(pinion)
  for (const s of [-1, 1]) {
    const boot = new THREE.CylinderGeometry(0.02, 0.032, 0.07, 10)
    boot.rotateZ(Math.PI / 2)
    boot.translate(s * 0.36, 0, 0)
    parts.push(boot)
  }
  return mergeParts(parts)
}

/** Tie rod + end: canonical along +X toward the knuckle. */
export function tieRod(params: GeometryParams): THREE.BufferGeometry {
  const length = mm(params, 'lengthMm', 380)
  const parts: THREE.BufferGeometry[] = []
  const rod = new THREE.CylinderGeometry(0.009, 0.009, length, 10)
  rod.rotateZ(Math.PI / 2)
  rod.translate(length / 2, 0, 0)
  parts.push(rod)
  const end = new THREE.SphereGeometry(0.016, 10, 8)
  end.translate(length, 0, 0)
  parts.push(end)
  return mergeParts(parts)
}

/** Rear lateral link (upper / lower-spring / toe): rod with bush eyes;
 *  the spring link variant carries a spring-seat plate. */
export function lateralLink(params: GeometryParams): THREE.BufferGeometry {
  const length = mm(params, 'lengthMm', 360)
  const seat = numParam(params, 'springSeat', 0) === 1
  const parts: THREE.BufferGeometry[] = []
  const rod = new THREE.BoxGeometry(length, 0.022, 0.045)
  rod.translate(length / 2, 0, 0)
  parts.push(rod)
  for (const x of [0, length]) {
    const bush = new THREE.CylinderGeometry(0.016, 0.016, 0.036, 12)
    bush.rotateX(Math.PI / 2)
    bush.translate(x, 0, 0)
    parts.push(bush)
  }
  if (seat) {
    const plate = new THREE.CylinderGeometry(0.06, 0.06, 0.008, 16)
    plate.translate(length * 0.62, 0.012, 0)
    parts.push(plate)
  }
  return mergeParts(parts)
}

/** Rear trailing (longitudinal) link: canonical along −Z from the body
 *  bush back to the carrier. */
export function trailingLink(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const bush = new THREE.CylinderGeometry(0.025, 0.025, 0.05, 12)
  bush.rotateZ(Math.PI / 2)
  parts.push(bush)
  const arm = new THREE.BoxGeometry(0.03, 0.045, 0.34)
  arm.translate(0, -0.005, -0.19)
  parts.push(arm)
  const flange = new THREE.BoxGeometry(0.02, 0.09, 0.09)
  flange.translate(0, 0, -0.34)
  parts.push(flange)
  return mergeParts(parts)
}
