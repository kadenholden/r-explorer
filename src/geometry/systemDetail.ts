import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/**
 * R3–R6 research detail parts (2026-08-14): turbo service lines, DSG
 * service items and Haldex propshaft hardware. Frame matches the engine:
 * crank axis X, +Z the intake side.
 */

/** Pair of thin service lines dropping to the turbo (oil or coolant, feed + return). */
export function turboLines(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const feed = tubeThrough(
    [
      [0, 0.09, 0.04],
      [0.01, 0.03, 0.01],
      [0, -0.03, 0],
    ],
    0.004,
  )
  parts.push(feed)
  const ret = tubeThrough(
    [
      [0.03, 0.07, 0.05],
      [0.045, 0.0, 0.015],
      [0.035, -0.05, 0],
    ],
    0.005,
  )
  parts.push(ret)
  return mergeParts(parts)
}

/** Small cylindrical cartridge (DSG oil filter, mechatronic accumulator). */
export function cartridge(params: GeometryParams): THREE.BufferGeometry {
  const r = ((params.radiusMm as number | undefined) ?? 32) / 1000
  const h = ((params.heightMm as number | undefined) ?? 85) / 1000
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(r, r, h, 20)
  parts.push(body)
  const cap = new THREE.CylinderGeometry(r * 0.55, r * 0.55, h * 0.18, 14)
  cap.translate(0, h * 0.55, 0)
  parts.push(cap)
  return mergeParts(parts)
}

/** Propshaft rubber flex disc (Giubo): thick ring with three bolt bosses. */
export function flexDisc(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const ring = new THREE.CylinderGeometry(0.055, 0.055, 0.028, 24)
  ring.rotateX(Math.PI / 2) // axis along Z (the propshaft line)
  parts.push(ring)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    const boss = new THREE.CylinderGeometry(0.012, 0.012, 0.034, 10)
    boss.rotateX(Math.PI / 2)
    boss.translate(Math.cos(a) * 0.038, Math.sin(a) * 0.038, 0)
    parts.push(boss)
  }
  return mergeParts(parts)
}
