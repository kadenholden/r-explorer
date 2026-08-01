import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'

/**
 * 19" Pretoria wheel (8J×19) and 235/35 R19 tyre — the operator's
 * confirmed fitment. Canonical: wheel axis along X, outboard face +X.
 */

export function pretoriaWheel(params: GeometryParams): THREE.BufferGeometry {
  const rimR = mm(params, 'rimDiameterMm', 482.6) / 2
  const width = mm(params, 'widthMm', 203) // 8J
  const parts: THREE.BufferGeometry[] = []

  // rim barrel
  const barrel = new THREE.CylinderGeometry(rimR, rimR, width, 32, 1, true)
  barrel.rotateZ(Math.PI / 2)
  parts.push(barrel)
  // outer lip
  const lip = new THREE.CylinderGeometry(rimR + 0.008, rimR + 0.008, 0.012, 32)
  lip.rotateZ(Math.PI / 2)
  lip.translate(width / 2, 0, 0)
  parts.push(lip)

  // Pretoria's five twin-spoke pairs
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    for (const off of [-0.02, 0.02]) {
      const spoke = new THREE.BoxGeometry(0.018, rimR - 0.05, 0.02)
      spoke.translate(0, (rimR - 0.05) / 2 + 0.045, off)
      spoke.rotateX(a)
      spoke.translate(width / 2 - 0.012, 0, 0)
      spoke.rotateZ(-Math.PI / 2)
      spoke.rotateY(Math.PI / 2)
      parts.push(spoke)
    }
  }

  // centre with hub bore and cap
  const centre = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 20)
  centre.rotateZ(Math.PI / 2)
  centre.translate(width / 2 - 0.02, 0, 0)
  parts.push(centre)
  const cap = new THREE.CylinderGeometry(0.028, 0.028, 0.01, 16)
  cap.rotateZ(Math.PI / 2)
  cap.translate(width / 2 - 0.002, 0, 0)
  parts.push(cap)

  return mergeParts(parts)
}

/** 235/35 R19 tyre: sidewall profile 35% of 235 mm section. */
export function tyre(params: GeometryParams): THREE.BufferGeometry {
  const rimR = mm(params, 'rimDiameterMm', 482.6) / 2
  const section = mm(params, 'sectionMm', 235)
  const outerR = rimR + section * 0.35
  const parts: THREE.BufferGeometry[] = []

  const carcass = new THREE.CylinderGeometry(outerR, outerR, section * 0.86, 40)
  carcass.rotateZ(Math.PI / 2)
  parts.push(carcass)
  // shoulder chamfers
  for (const s of [-1, 1]) {
    const shoulder = new THREE.CylinderGeometry(
      s > 0 ? outerR - 0.004 : outerR,
      s > 0 ? outerR : outerR - 0.004,
      0.014,
      40,
    )
    shoulder.rotateZ(Math.PI / 2)
    shoulder.translate((s * section * 0.9) / 2, 0, 0)
    parts.push(shoulder)
  }
  // circumferential groove hints
  for (const dx of [-0.028, 0, 0.028]) {
    const groove = new THREE.CylinderGeometry(outerR + 0.001, outerR + 0.001, 0.004, 40)
    groove.rotateZ(Math.PI / 2)
    groove.translate(dx, 0, 0)
    parts.push(groove)
  }
  return mergeParts(parts)
}

/** Ring of five ball-seat wheel bolts (14×1.5) on the 112 mm PCD. */
export function wheelBoltRing(params: GeometryParams): THREE.BufferGeometry {
  const pcdR = mm(params, 'pcdMm', 112) / 2
  const parts: THREE.BufferGeometry[] = []
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    const head = new THREE.CylinderGeometry(0.012, 0.012, 0.014, 6)
    head.rotateZ(Math.PI / 2)
    const seat = new THREE.SphereGeometry(0.0135, 10, 8)
    seat.translate(-0.008, 0, 0)
    head.translate(0, Math.sin(a) * pcdR, Math.cos(a) * pcdR)
    seat.translate(0, Math.sin(a) * pcdR, Math.cos(a) * pcdR)
    parts.push(head, seat)
  }
  return mergeParts(parts)
}
