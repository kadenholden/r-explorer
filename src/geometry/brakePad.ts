import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { numParam } from './registry'
import { mergeParts, sectorGeometry } from './shapes'

/**
 * Brake pad: annular-sector steel backing plate with end lugs (the tabs
 * that locate in the carrier abutments) and a slightly smaller bonded
 * friction block. Authored in the disc plane, sector centred on +Y.
 * `facing` (+1 | −1) puts the friction material on the +Z or −Z face, so
 * the two pads of a corner need no mirroring transforms.
 */
export function brakePad(params: GeometryParams): THREE.BufferGeometry {
  const facing = numParam(params, 'facing', 1) >= 0 ? 1 : -1
  const backingT = 0.006
  const frictionT = 0.011
  const parts: THREE.BufferGeometry[] = []

  // backing occupies z ∈ [−backingT, 0] for facing +1, [0, backingT] for −1;
  // friction sits on the facing side of it
  const backingZ = facing === 1 ? -backingT : 0
  const frictionZ = facing === 1 ? 0 : -frictionT

  const backing = sectorGeometry(0.104, 0.158, 55, 125, backingT)
  backing.translate(0, 0, backingZ)
  parts.push(backing)

  const friction = sectorGeometry(0.11, 0.152, 59, 121, frictionT)
  friction.translate(0, 0, frictionZ)
  parts.push(friction)

  // end lugs on the backing plate (carrier-abutment tabs)
  for (const aDeg of [52, 128]) {
    const a = THREE.MathUtils.degToRad(aDeg)
    const lug = new THREE.BoxGeometry(0.024, 0.013, backingT)
    lug.rotateZ(a - Math.PI / 2)
    lug.translate(Math.cos(a) * 0.131, Math.sin(a) * 0.131, backingZ + backingT / 2)
    parts.push(lug)
  }

  return mergeParts(parts)
}
