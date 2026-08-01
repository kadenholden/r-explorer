import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'

/**
 * 9.3:1 piston: crown with ring lands, two proud ring bands, slipper
 * skirt, pin bosses on the X axis (matching the rod small end). Canonical:
 * piston axis along Y, crown top at y = 0.
 */
export function piston(params: GeometryParams): THREE.BufferGeometry {
  const r = mm(params, 'boreMm', 82.5) / 2 - 0.0006
  const parts: THREE.BufferGeometry[] = []

  const crown = new THREE.CylinderGeometry(r, r, 0.02, 36)
  crown.translate(0, -0.01, 0)
  parts.push(crown)

  // ring bands (proud thin rings reading as the compression/oil rings)
  for (const y of [-0.024, -0.0295]) {
    const ring = new THREE.CylinderGeometry(r + 0.0006, r + 0.0006, 0.0028, 36)
    ring.translate(0, y, 0)
    parts.push(ring)
  }

  // slipper skirt: two arc panels thrust-side (±Z), not a full cylinder
  for (const zSign of [-1, 1]) {
    const skirt = new THREE.CylinderGeometry(
      r - 0.001,
      r - 0.001,
      0.038,
      18,
      1,
      true,
      zSign > 0 ? Math.PI * 0.15 : Math.PI * 1.15,
      Math.PI * 0.7,
    )
    skirt.translate(0, -0.053, 0)
    parts.push(skirt)
  }

  // pin bosses along X
  for (const xSign of [-1, 1]) {
    const boss = new THREE.CylinderGeometry(0.0125, 0.0125, 0.013, 18)
    boss.rotateZ(Math.PI / 2)
    boss.translate(xSign * 0.0295, -0.05, 0)
    parts.push(boss)
  }

  return mergeParts(parts)
}
