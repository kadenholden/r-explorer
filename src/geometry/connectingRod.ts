import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * Cracked-cap connecting rod (36MnVS4): big-end eye with a visible cap
 * split line, I-beam shank, small end. Canonical: big-end centre at the
 * origin, small end up +Y, both eyes' axes along X (the crank/pin axis).
 */
export function connectingRod(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const centreDist = 0.144

  const bigEnd = new THREE.CylinderGeometry(0.031, 0.031, 0.017, 24)
  bigEnd.rotateZ(Math.PI / 2)
  parts.push(bigEnd)

  // cap split line: a thin proud seam ring below the eye centre
  const seam = new THREE.BoxGeometry(0.019, 0.0025, 0.065)
  seam.translate(0, -0.008, 0)
  parts.push(seam)

  // I-beam shank (web + two flanges)
  const web = new THREE.BoxGeometry(0.007, 0.1, 0.018)
  web.translate(0, 0.072, 0)
  parts.push(web)
  for (const z of [-0.008, 0.008]) {
    const fl = new THREE.BoxGeometry(0.014, 0.1, 0.004)
    fl.translate(0, 0.072, z)
    parts.push(fl)
  }

  const smallEnd = new THREE.CylinderGeometry(0.0155, 0.0155, 0.016, 20)
  smallEnd.rotateZ(Math.PI / 2)
  smallEnd.translate(0, centreDist, 0)
  parts.push(smallEnd)

  return mergeParts(parts)
}
