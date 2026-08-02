import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'

/**
 * Body-in-white and exterior (dossier §1): the MQB steel monocoque as an
 * illustrative cage (floor, rails, pillars, roof, sills, towers) plus the
 * bolt-on/welded exterior — 5-door, as the operator's car. All authored
 * in world coordinates around the existing chassis (records at origin
 * unless noted); the cabin sits between the engine bay and the rear axle.
 */

/** Floorpan with centre tunnel and rear floor step. */
export function floorpan(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const main = new THREE.BoxGeometry(1.9, 0.016, 1.15)
  main.translate(0, -0.28, -0.72)
  parts.push(main)
  const tunnel = new THREE.BoxGeometry(0.26, 0.11, 1.15)
  tunnel.translate(0, -0.23, -0.72)
  parts.push(tunnel)
  const rearFloor = new THREE.BoxGeometry(1.7, 0.016, 0.45)
  rearFloor.translate(0, -0.2, -1.42)
  parts.push(rearFloor)
  return mergeParts(parts)
}

/** Front longitudinals with crash boxes and the bumper beam. */
export function frontStructure(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  for (const s of [-1, 1]) {
    const rail = new THREE.BoxGeometry(0.07, 0.09, 0.85)
    rail.translate(s * 0.44, 0.02, 0.42)
    parts.push(rail)
    const crashBox = new THREE.BoxGeometry(0.09, 0.11, 0.14)
    crashBox.translate(s * 0.44, 0.02, 0.88)
    parts.push(crashBox)
  }
  const beam = new THREE.BoxGeometry(1.5, 0.1, 0.05)
  beam.translate(0, 0.02, 0.96)
  parts.push(beam)
  return mergeParts(parts)
}

/** Firewall/bulkhead between engine bay and cabin. */
export function bulkhead(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const wall = new THREE.BoxGeometry(1.7, 0.62, 0.02)
  wall.translate(0, 0.05, -0.3)
  parts.push(wall)
  const cowl = new THREE.BoxGeometry(1.7, 0.02, 0.14)
  cowl.translate(0, 0.37, -0.24)
  parts.push(cowl)
  return mergeParts(parts)
}

/** Strut tower: cone shell + top plate (one per side via instances). */
export function strutTower(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const cone = new THREE.CylinderGeometry(0.07, 0.12, 0.24, 18, 1, true)
  cone.translate(0, 0.12, 0)
  parts.push(cone)
  const plate = new THREE.CylinderGeometry(0.085, 0.085, 0.012, 18)
  plate.translate(0, 0.25, 0)
  parts.push(plate)
  return mergeParts(parts)
}

/** Pillar: hot-formed box section, `heightMm` long, lean via instance rotation. */
export function pillar(params: GeometryParams): THREE.BufferGeometry {
  const h = mm(params, 'heightMm', 520)
  const g = new THREE.BoxGeometry(0.055, h, 0.08)
  g.translate(0, h / 2, 0)
  return g
}

/** Roof panel with its two longitudinal rails. */
export function roofPanel(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const panel = new THREE.BoxGeometry(1.66, 0.014, 0.72)
  parts.push(panel)
  for (const s of [-1, 1]) {
    const rail = new THREE.BoxGeometry(0.06, 0.04, 0.72)
    rail.translate(s * 0.78, -0.02, 0)
    parts.push(rail)
  }
  return mergeParts(parts)
}

/** Sill / rocker box section (per side via instances). */
export function sillRail(_params: GeometryParams): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(0.07, 0.09, 1.15)
  return g
}

/** Rear structure: wheelhouses, rear panel, spare well. */
export function rearStructure(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  for (const s of [-1, 1]) {
    const house = new THREE.CylinderGeometry(0.4, 0.4, 0.24, 20, 1, true, 0, Math.PI)
    house.rotateZ(Math.PI / 2)
    house.rotateY(Math.PI / 2)
    house.translate(s * 0.88, 0, -1.13)
    parts.push(house)
  }
  const rearPanel = new THREE.BoxGeometry(1.6, 0.35, 0.02)
  rearPanel.translate(0, -0.05, -1.58)
  parts.push(rearPanel)
  const well = new THREE.CylinderGeometry(0.3, 0.26, 0.1, 20)
  well.translate(0, -0.26, -1.4)
  parts.push(well)
  return mergeParts(parts)
}

/** Bonnet with power bulge. */
export function bonnet(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const panel = new THREE.BoxGeometry(1.88, 0.014, 0.78)
  parts.push(panel)
  const bulge = new THREE.BoxGeometry(0.5, 0.02, 0.6)
  bulge.translate(0, 0.014, -0.02)
  parts.push(bulge)
  return mergeParts(parts)
}

/** Front wing with the real wheel-arch cut, panel in the ZY plane,
 *  thickness along X (outboard face at x=0). Arch centred `archZMm`
 *  along the panel. */
export function frontWing(params: GeometryParams): THREE.BufferGeometry {
  const len = mm(params, 'lengthMm', 780)
  const archZ = mm(params, 'archZMm', 380)
  const archR = mm(params, 'archRadiusMm', 365)
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.36)
  shape.lineTo(len, 0.36)
  shape.lineTo(len, -0.18)
  shape.lineTo(archZ + archR, -0.18)
  shape.absarc(archZ, -0.18, archR, 0, Math.PI, false)
  shape.lineTo(0, -0.18)
  shape.closePath()
  const g = new THREE.ExtrudeGeometry(shape, { depth: 0.015, bevelEnabled: false, curveSegments: 24 })
  // shape (x=along car Z, y=up) → rotate so length runs along −Z, thickness X
  g.rotateY(-Math.PI / 2)
  return g
}

/** Door shell: lower panel + window frame (opening left empty), panel in
 *  the ZY plane, thickness X, hinge edge at z=0 extending −Z. */
export function doorShell(params: GeometryParams): THREE.BufferGeometry {
  const len = mm(params, 'lengthMm', 450)
  const parts: THREE.BufferGeometry[] = []
  const lower = new THREE.BoxGeometry(0.016, 0.5, len)
  lower.translate(0, 0.05, -len / 2)
  parts.push(lower)
  // window frame: front upright, top rail (raked), rear upright
  const frontPost = new THREE.BoxGeometry(0.014, 0.32, 0.035)
  frontPost.translate(0, 0.45, -0.03)
  parts.push(frontPost)
  const rearPost = new THREE.BoxGeometry(0.014, 0.3, 0.035)
  rearPost.translate(0, 0.44, -len + 0.03)
  parts.push(rearPost)
  const topRail = new THREE.BoxGeometry(0.014, 0.035, len - 0.02)
  topRail.translate(0, 0.6, -len / 2)
  parts.push(topRail)
  const handle = new THREE.BoxGeometry(0.02, 0.025, 0.12)
  handle.translate(0.012, 0.2, -len + 0.14)
  parts.push(handle)
  return mergeParts(parts)
}

/** Tailgate: raked panel with integrated glass aperture frame. */
export function tailgate(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const lower = new THREE.BoxGeometry(1.45, 0.42, 0.018)
  lower.translate(0, 0.06, 0)
  parts.push(lower)
  const frame = new THREE.BoxGeometry(1.4, 0.42, 0.016)
  frame.rotateX(0.5)
  frame.translate(0, 0.44, 0.1)
  parts.push(frame)
  return mergeParts(parts)
}

/** R front bumper: body with gaping intakes and splitter lip. */
export function bumperFrontR(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(1.85, 0.4, 0.22)
  parts.push(body)
  // three dark intakes are separate visual insets
  for (const [x, w] of [
    [-0.6, 0.42],
    [0, 0.55],
    [0.6, 0.42],
  ] as const) {
    const intake = new THREE.BoxGeometry(w, 0.18, 0.03)
    intake.translate(x, -0.08, 0.11)
    parts.push(intake)
  }
  const splitter = new THREE.BoxGeometry(1.8, 0.02, 0.28)
  splitter.translate(0, -0.21, -0.01)
  parts.push(splitter)
  return mergeParts(parts)
}

/** R rear bumper with diffuser and the quad-tip cutout region. */
export function bumperRearR(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(1.85, 0.38, 0.2)
  parts.push(body)
  const diffuser = new THREE.BoxGeometry(1.1, 0.16, 0.24)
  diffuser.translate(0, -0.19, 0)
  parts.push(diffuser)
  return mergeParts(parts)
}

/** Roof spoiler over the tailgate. */
export function roofSpoiler(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const wing = new THREE.BoxGeometry(1.4, 0.02, 0.3)
  wing.rotateX(0.18)
  parts.push(wing)
  for (const s of [-1, 1]) {
    const side = new THREE.BoxGeometry(0.02, 0.06, 0.24)
    side.translate(s * 0.68, -0.04, 0)
    parts.push(side)
  }
  return mergeParts(parts)
}

/** Gloss-black mirror cap on its stalk (R signature). */
export function mirrorCap(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const housing = new THREE.BoxGeometry(0.1, 0.06, 0.14)
  parts.push(housing)
  const stalk = new THREE.BoxGeometry(0.06, 0.02, 0.05)
  stalk.translate(-0.07, -0.03, 0.02)
  parts.push(stalk)
  return mergeParts(parts)
}

/** Side skirt along the sill. */
export function sideSkirt(_params: GeometryParams): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(0.035, 0.1, 1.25)
  return g
}

/** Glass pane: thin plate, sized in mm, transparent via record opacity. */
export function glassPane(params: GeometryParams): THREE.BufferGeometry {
  const w = mm(params, 'widthMm', 1350)
  const h = mm(params, 'heightMm', 560)
  return new THREE.BoxGeometry(w, h, 0.012)
}
