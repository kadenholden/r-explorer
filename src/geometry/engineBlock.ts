import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'

/**
 * EA888 Gen 3 cylinder block: closed-deck grey cast iron (GJL 250),
 * 82.5 mm bores on 88 mm spacing. The deck is an extruded plate with four
 * REAL bore openings (closed-deck: metal all around each bore); below it
 * the water-jacket body, crank case with skirt, and the flywheel-end
 * flange. Canonical frame: crank axis along X, deck up +Y, exhaust side −Z.
 */

export const BORE_POSITIONS_X = [-0.132, -0.044, 0.044, 0.132]

/** Deck-style plate with four bore holes — shared with the head gasket. */
export function boredPlate(thickness: number, boreR: number, l = 0.44, w = 0.24): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  const hl = l / 2
  const hw = w / 2
  shape.moveTo(-hl, -hw)
  shape.lineTo(hl, -hw)
  shape.lineTo(hl, hw)
  shape.lineTo(-hl, hw)
  shape.closePath()
  for (const x of BORE_POSITIONS_X) {
    const hole = new THREE.Path()
    hole.absarc(x, 0, boreR, 0, Math.PI * 2, true)
    shape.holes.push(hole)
  }
  const plate = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments: 32,
  })
  plate.rotateX(-Math.PI / 2) // extrusion +z → +y (plate horizontal, top at y=thickness... rotated: y ∈ [-thickness, 0] → shift below)
  plate.translate(0, thickness, 0)
  return plate
}

export function engineBlock(params: GeometryParams): THREE.BufferGeometry {
  const boreR = mm(params, 'boreMm', 82.5) / 2
  const parts: THREE.BufferGeometry[] = []

  // closed deck with real bore openings, top face at y 0.115
  const deck = boredPlate(0.012, boreR)
  deck.translate(0, 0.103, 0)
  parts.push(deck)

  // water-jacket body
  const body = new THREE.BoxGeometry(0.44, 0.19, 0.235)
  body.translate(0, 0.008, 0)
  parts.push(body)

  // crankcase / skirt, narrower
  const skirt = new THREE.BoxGeometry(0.44, 0.075, 0.19)
  skirt.translate(0, -0.125, 0)
  parts.push(skirt)

  // flywheel-end flange (the chain drive lives at this end, dossier §2)
  const flange = new THREE.BoxGeometry(0.014, 0.24, 0.25)
  flange.translate(-0.227, -0.02, 0)
  parts.push(flange)

  // ribbing suggestion: three shallow lateral ribs each side
  for (const x of [-0.088, 0, 0.088]) {
    const rib = new THREE.BoxGeometry(0.014, 0.16, 0.008)
    rib.translate(x, -0.01, 0.121)
    parts.push(rib)
    const rib2 = new THREE.BoxGeometry(0.014, 0.16, 0.008)
    rib2.translate(x, -0.01, -0.121)
    parts.push(rib2)
  }

  return mergeParts(parts)
}
