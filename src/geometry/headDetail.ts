import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * R2 research detail parts (2026-08-14): the valvetrain pieces the head
 * was missing — springs, roller-finger followers, hydraulic lash
 * adjusters — plus spark plugs, the upper timing cover and the bolt-on
 * PCV module (the Gen 3 "valve cover" is really a cam bearing bridge).
 * Frame matches the head: valve/spring axis Y, crank axis X.
 */

/** Single valve spring — stacked coil suggestion. */
export function valveSpring(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  for (let i = 0; i < 4; i++) {
    const coil = new THREE.TorusGeometry(0.0095, 0.0021, 6, 18)
    coil.rotateX(Math.PI / 2)
    coil.translate(0, i * 0.009, 0)
    parts.push(coil)
  }
  return mergeParts(parts)
}

/** Roller-finger cam follower: lever plate with the needle-bearing roller mid-span. */
export function fingerFollower(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const lever = new THREE.BoxGeometry(0.013, 0.005, 0.032)
  parts.push(lever)
  const roller = new THREE.CylinderGeometry(0.006, 0.006, 0.009, 14)
  roller.rotateZ(Math.PI / 2)
  roller.translate(0, 0.004, 0)
  parts.push(roller)
  return mergeParts(parts)
}

/** Hydraulic lash adjuster / support element — small oil-fed piston. */
export function hlaElement(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.006, 0.006, 0.026, 12)
  parts.push(body)
  const ball = new THREE.SphereGeometry(0.0045, 10, 8)
  ball.translate(0, 0.015, 0)
  parts.push(ball)
  return mergeParts(parts)
}

/** Spark plug: ceramic insulator, hex, threaded body, electrode tip down. */
export function sparkPlug(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const ceramic = new THREE.CylinderGeometry(0.0055, 0.0055, 0.03, 12)
  ceramic.translate(0, 0.024, 0)
  parts.push(ceramic)
  const hex = new THREE.CylinderGeometry(0.008, 0.008, 0.01, 6)
  ceramic.translate(0, 0, 0)
  hex.translate(0, 0.004, 0)
  parts.push(hex)
  const thread = new THREE.CylinderGeometry(0.007, 0.0065, 0.0265, 12)
  thread.translate(0, -0.014, 0)
  parts.push(thread)
  const tip = new THREE.CylinderGeometry(0.0012, 0.0012, 0.006, 8)
  tip.translate(0, -0.03, 0)
  parts.push(tip)
  return mergeParts(parts)
}

/** Plastic upper timing cover at the chain end — thickness along X. */
export function upperTimingCover(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const plate = new THREE.BoxGeometry(0.012, 0.24, 0.2)
  parts.push(plate)
  for (const z of [-0.06, 0, 0.06]) {
    const rib = new THREE.BoxGeometry(0.006, 0.2, 0.012)
    rib.translate(-0.008, 0, z)
    parts.push(rib)
  }
  return mergeParts(parts)
}

/** Bolt-on PCV / oil-separator module with diaphragm dome and breather stub. */
export function pcvModule(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.095, 0.028, 0.075)
  parts.push(body)
  const dome = new THREE.SphereGeometry(0.022, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2)
  dome.translate(0.015, 0.014, 0)
  parts.push(dome)
  const stub = new THREE.CylinderGeometry(0.008, 0.008, 0.035, 12)
  stub.rotateX(Math.PI / 2)
  stub.translate(-0.03, 0.006, 0.05)
  parts.push(stub)
  return mergeParts(parts)
}
