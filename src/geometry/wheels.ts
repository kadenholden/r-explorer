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
  // outer lip — open-ended ring, NOT a capped cylinder (a cap here would
  // wall off the whole wheel face)
  const lip = new THREE.CylinderGeometry(rimR + 0.008, rimR + 0.008, 0.012, 32, 1, true)
  lip.rotateZ(Math.PI / 2)
  lip.translate(width / 2, 0, 0)
  parts.push(lip)

  // Pretoria's five twin-spoke pairs, radiating in the face plane:
  // box along +Y at face depth, twinned with a tangential offset, then
  // spun about the wheel axis (X) into position
  const spokeLen = rimR - 0.075
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    for (const off of [-0.014, 0.014]) {
      const spoke = new THREE.BoxGeometry(0.016, spokeLen, 0.024)
      spoke.translate(width / 2 - 0.01, spokeLen / 2 + 0.06, off)
      spoke.rotateX(a)
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

/** 235/35 R19 tyre: an OPEN ring (hole through the middle for the alloy)
 *  — a lathed cross-section running bead → bulged sidewall → flat tread
 *  → sidewall → bead, so the rim and spokes stay visible inside it. */
export function tyre(params: GeometryParams): THREE.BufferGeometry {
  const rimR = mm(params, 'rimDiameterMm', 482.6) / 2
  const section = mm(params, 'sectionMm', 235)
  const outerR = rimR + section * 0.35
  const w2 = (section * 0.86) / 2
  const mid = (rimR + outerR) / 2

  // profile in (radius, axial) — lathed about the axis
  const profile = [
    new THREE.Vector2(rimR, -w2),
    new THREE.Vector2(mid, -w2 + 0.004),
    new THREE.Vector2(outerR - 0.006, -w2 + 0.022),
    new THREE.Vector2(outerR, -w2 + 0.045),
    new THREE.Vector2(outerR, w2 - 0.045),
    new THREE.Vector2(outerR - 0.006, w2 - 0.022),
    new THREE.Vector2(mid, w2 - 0.004),
    new THREE.Vector2(rimR, w2),
  ]
  const parts: THREE.BufferGeometry[] = []
  const carcass = new THREE.LatheGeometry(profile, 48)
  carcass.rotateZ(Math.PI / 2) // lathe axis Y → wheel axis X
  parts.push(carcass)

  // circumferential groove hints as open tube shells (no end caps)
  for (const dx of [-0.028, 0, 0.028]) {
    const groove = new THREE.CylinderGeometry(outerR + 0.001, outerR + 0.001, 0.004, 40, 1, true)
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
