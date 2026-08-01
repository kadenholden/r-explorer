import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'

/**
 * Chain drive at the flywheel end (dossier §2: the EA888 chain runs at the
 * flywheel end). All parts are authored in the YZ plane (x = 0); the data
 * places them at the block's −X face.
 */

/** Closed chain loop around crank (bottom) and both cam sprockets (top),
 *  as a tube following a rounded triangular path. */
export function timingChain(_params: GeometryParams): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = []
  // circle helper: push arc samples around (y, z) centre
  const arc = (cy: number, cz: number, r: number, a0: number, a1: number, n: number) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n
      pts.push(new THREE.Vector3(0, cy + Math.sin(a) * r, cz + Math.cos(a) * r))
    }
  }
  // exhaust cam sprocket (top, −z), intake cam sprocket (top, +z), crank (bottom)
  arc(0.33, -0.048, 0.046, Math.PI, Math.PI * 1.75, 10)
  arc(0.33, 0.048, 0.046, Math.PI * 1.25, Math.PI * 2, 10)
  arc(0.0, 0, 0.052, Math.PI * 0.15, Math.PI * 0.85, 14)
  const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.1)
  return new THREE.TubeGeometry(curve, 96, 0.0045, 8, true)
}

/** Chain sprocket: toothed rim suggested by a low-segment outer ring. */
export function chainSprocket(params: GeometryParams): THREE.BufferGeometry {
  const r = mm(params, 'diameterMm', 90) / 2
  const parts: THREE.BufferGeometry[] = []
  const rim = new THREE.CylinderGeometry(r, r, 0.011, 16) // low segments → toothy
  rim.rotateZ(Math.PI / 2)
  parts.push(rim)
  const hub = new THREE.CylinderGeometry(r * 0.4, r * 0.4, 0.02, 18)
  hub.rotateZ(Math.PI / 2)
  parts.push(hub)
  return mergeParts(parts)
}

/** Hydraulic chain tensioner: body, plunger, and pivot shoe. */
export function chainTensioner(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.022, 0.055, 0.024)
  parts.push(body)
  const plunger = new THREE.CylinderGeometry(0.007, 0.007, 0.035, 12)
  plunger.rotateX(-Math.PI / 7)
  plunger.translate(0, 0.038, -0.008)
  parts.push(plunger)
  return mergeParts(parts)
}

/** Plastic chain guide rail: a gently curved blade. */
export function chainGuideRail(params: GeometryParams): THREE.BufferGeometry {
  const bow = mm(params, 'bowMm', 18)
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.quadraticCurveTo(bow, 0.17, 0, 0.34)
  shape.lineTo(0.012, 0.34)
  shape.quadraticCurveTo(bow + 0.012, 0.17, 0.012, 0)
  shape.closePath()
  const rail = new THREE.ExtrudeGeometry(shape, { depth: 0.016, bevelEnabled: false })
  // authored in the XY plane; stand it into the YZ chain plane
  rail.rotateY(Math.PI / 2)
  rail.translate(0.008, 0, 0)
  return rail
}
