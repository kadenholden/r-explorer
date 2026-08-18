import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/**
 * Engine "dressing" — the covers, looms, lines and shields that dominate
 * the view when you open the bonnet. The mechanicals were all modelled
 * before these, which is why the top of the engine didn't look like the
 * operator's own photos (docs/reference/bay-2026-08-15/IMG_7687, 7692).
 */

/** The moulded plastic top cover with its badge panel and ribbed skirt. */
export function engineCover(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.47, 0.05, 0.31)
  parts.push(body)
  // raised centre panel where the VW roundel and TSI badge sit
  const badge = new THREE.BoxGeometry(0.31, 0.024, 0.17)
  badge.translate(0, 0.034, 0.015)
  parts.push(badge)
  // ribbed lip along the front edge
  for (let i = 0; i < 10; i++) {
    const rib = new THREE.BoxGeometry(0.028, 0.014, 0.055)
    rib.translate(-0.198 + i * 0.044, 0.03, -0.115)
    parts.push(rib)
  }
  // side skirts that hide the cam cover edges
  for (const z of [-0.152, 0.152]) {
    const skirt = new THREE.BoxGeometry(0.47, 0.055, 0.018)
    skirt.translate(0, -0.045, z)
    parts.push(skirt)
  }
  // the four rubber ball-mount sockets underneath
  for (const x of [-0.17, 0.17]) {
    for (const z of [-0.1, 0.1]) {
      const socket = new THREE.CylinderGeometry(0.016, 0.016, 0.05, 10)
      socket.translate(x, -0.045, z)
      parts.push(socket)
    }
  }
  return mergeParts(parts)
}

/** Corrugated wiring conduit snaking across the top of the engine. */
export function wiringLoom(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  // main run along the cam cover, coil-side
  parts.push(
    tubeThrough(
      [
        [-0.26, 0.315, -0.09],
        [-0.1, 0.33, -0.075],
        [0.08, 0.33, -0.07],
        [0.24, 0.30, -0.06],
      ],
      0.014,
    ),
  )
  // branch dropping down the offside toward the sensors
  parts.push(
    tubeThrough(
      [
        [0.2, 0.30, -0.06],
        [0.27, 0.20, 0.0],
        [0.29, 0.08, 0.06],
      ],
      0.011,
    ),
  )
  // branch crossing forward over the manifold
  parts.push(
    tubeThrough(
      [
        [-0.12, 0.325, -0.08],
        [-0.16, 0.28, 0.06],
        [-0.19, 0.24, 0.16],
      ],
      0.011,
    ),
  )
  return mergeParts(parts)
}

/** Coil connector rail: the little plugs sitting on each coil. */
export function coilConnectors(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.026, 0.02, 0.03)
  parts.push(body)
  const tail = new THREE.CylinderGeometry(0.006, 0.006, 0.03, 8)
  tail.rotateZ(Math.PI / 2)
  tail.translate(0.022, 0, 0)
  parts.push(tail)
  return mergeParts(parts)
}

/** Rigid metal fuel line running across the head to the rail. */
export function rigidFuelLine(_params: GeometryParams): THREE.BufferGeometry {
  return tubeThrough(
    [
      [0.235, 0.255, -0.055],
      [0.12, 0.30, -0.02],
      [-0.02, 0.305, 0.0],
      [-0.16, 0.28, 0.02],
    ],
    0.006,
  )
}

/** Folded stainless heat shield over the turbo / integrated manifold. */
export function heatShield(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const top = new THREE.BoxGeometry(0.34, 0.008, 0.14)
  parts.push(top)
  const back = new THREE.BoxGeometry(0.34, 0.10, 0.008)
  back.translate(0, -0.05, -0.066)
  parts.push(back)
  // stiffening swages
  for (const x of [-0.1, 0, 0.1]) {
    const swage = new THREE.BoxGeometry(0.02, 0.014, 0.13)
    swage.translate(x, 0.008, 0)
    parts.push(swage)
  }
  return mergeParts(parts)
}

/** Engine lifting eye — the tan hooks bolted to the head. */
export function liftingEye(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const plate = new THREE.BoxGeometry(0.012, 0.05, 0.045)
  parts.push(plate)
  const hook = new THREE.TorusGeometry(0.021, 0.007, 8, 18, Math.PI * 1.2)
  hook.rotateY(Math.PI / 2)
  hook.translate(0, 0.035, 0)
  parts.push(hook)
  return mergeParts(parts)
}

/** Soft vacuum / breather hose loop. */
export function breatherHose(_params: GeometryParams): THREE.BufferGeometry {
  return tubeThrough(
    [
      [-0.05, 0.375, 0.05],
      [-0.16, 0.35, 0.12],
      [-0.24, 0.28, 0.1],
      [-0.28, 0.18, 0.02],
    ],
    0.012,
  )
}
