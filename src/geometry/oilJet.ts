import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * Piston-cooling oil jet (electronically controlled on the R): mounting
 * body with an angled spray tube aimed up the bore. Canonical: body at
 * origin, nozzle pointing up +Y.
 */
export function oilJet(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  const body = new THREE.CylinderGeometry(0.006, 0.006, 0.014, 12)
  parts.push(body)

  const tube = new THREE.CylinderGeometry(0.0025, 0.0025, 0.03, 8)
  tube.rotateX(Math.PI / 12)
  tube.translate(0, 0.019, 0.004)
  parts.push(tube)

  return mergeParts(parts)
}
