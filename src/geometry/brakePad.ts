import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { GeometryParams } from './registry'
import { numParam } from './registry'

/**
 * Schematic brake pad: an annular-sector backing plate with a slightly
 * smaller friction block. Authored in the disc plane (sector centred on
 * +Y, disc axis along Z). `facing` (+1 | −1) puts the friction material on
 * the +Z or −Z face, so left/right pads need no mirroring transforms.
 */

function sectorShape(rOuter: number, rInner: number, a0: number, a1: number): THREE.Shape {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, rOuter, a0, a1, false)
  shape.absarc(0, 0, rInner, a1, a0, true)
  shape.closePath()
  return shape
}

export function brakePad(params: GeometryParams): THREE.BufferGeometry {
  const facing = numParam(params, 'facing', 1) >= 0 ? 1 : -1
  const deg = THREE.MathUtils.degToRad

  const backingShape = sectorShape(0.158, 0.104, deg(55), deg(125))
  const backing = new THREE.ExtrudeGeometry(backingShape, { depth: 0.006, bevelEnabled: false })

  const frictionShape = sectorShape(0.152, 0.11, deg(59), deg(121))
  const friction = new THREE.ExtrudeGeometry(frictionShape, { depth: 0.011, bevelEnabled: false })

  if (facing === 1) {
    backing.translate(0, 0, -0.006)
    // friction already occupies z ∈ [0, 0.011]
  } else {
    friction.translate(0, 0, -0.011)
    // backing already occupies z ∈ [0, 0.006]
  }

  const merged = mergeGeometries([backing, friction])
  if (!merged) throw new Error('brakePad: merge failed')
  return merged
}
