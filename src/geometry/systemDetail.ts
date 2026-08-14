import type * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/**
 * R3/R4 research detail parts (2026-08-14): turbo service lines and other
 * small system hardware. Frame matches the engine: crank axis X, +Z the
 * intake side, turbo low on the exhaust side.
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
