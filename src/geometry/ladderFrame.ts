import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * Main-bearing ladder frame: perimeter frame with five main-bearing cap
 * webs tying the crankcase together. Canonical: crank axis along X,
 * frame plane horizontal.
 */
export function ladderFrame(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  for (const z of [-0.088, 0.088]) {
    const rail = new THREE.BoxGeometry(0.44, 0.024, 0.024)
    rail.translate(0, 0, z)
    parts.push(rail)
  }

  // five main-bearing webs with half-bore arches (suggested by side boxes)
  for (const x of [-0.176, -0.088, 0, 0.088, 0.176]) {
    for (const z of [-0.055, 0.055]) {
      const web = new THREE.BoxGeometry(0.026, 0.024, 0.066)
      web.translate(x, 0, z)
      parts.push(web)
    }
  }

  return mergeParts(parts)
}
