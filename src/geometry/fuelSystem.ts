import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'
import { BORE_POSITIONS_X } from './engineBlock'

/** Cam-driven high-pressure fuel pump (~200 bar): body, follower tower,
 *  outlet fitting. Canonical: follower down −Y onto the cam. */
export function hpfp(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.05, 0.05, 0.05)
  parts.push(body)
  const tower = new THREE.CylinderGeometry(0.016, 0.016, 0.03, 14)
  tower.translate(0, -0.038, 0)
  parts.push(tower)
  const damper = new THREE.CylinderGeometry(0.02, 0.02, 0.014, 14)
  damper.translate(0, 0.032, 0)
  parts.push(damper)
  const fitting = new THREE.CylinderGeometry(0.006, 0.006, 0.024, 10)
  fitting.rotateZ(Math.PI / 2)
  fitting.translate(-0.033, 0, 0)
  parts.push(fitting)
  return mergeParts(parts)
}

/** Fuel rail: bar with four injector ports (used for both DI and port
 *  rails via lengthMm/portSpacing defaults matched to the engine). */
export function fuelRail(params: GeometryParams): THREE.BufferGeometry {
  const length = mm(params, 'lengthMm', 380)
  const parts: THREE.BufferGeometry[] = []
  const bar = new THREE.CylinderGeometry(0.011, 0.011, length, 14)
  bar.rotateZ(Math.PI / 2)
  parts.push(bar)
  for (const x of BORE_POSITIONS_X) {
    const port = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 10)
    port.translate(x, -0.012, 0)
    parts.push(port)
  }
  const feed = new THREE.CylinderGeometry(0.005, 0.005, 0.03, 8)
  feed.rotateX(Math.PI / 2)
  feed.translate(length / 2 - 0.02, 0, 0.02)
  parts.push(feed)
  return mergeParts(parts)
}

/** Injector: body, tip, connector. `tipMm` differentiates the in-chamber
 *  DI injectors (longer, finer tip) from the manifold port injectors. */
export function injector(params: GeometryParams): THREE.BufferGeometry {
  const tip = mm(params, 'tipMm', 18)
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.0085, 0.0085, 0.035, 12)
  parts.push(body)
  const nozzle = new THREE.CylinderGeometry(0.004, 0.0028, tip, 10)
  nozzle.translate(0, -0.0175 - tip / 2, 0)
  parts.push(nozzle)
  const connector = new THREE.BoxGeometry(0.014, 0.01, 0.012)
  connector.translate(0.006, 0.02, 0)
  parts.push(connector)
  return mergeParts(parts)
}

/** Rail pressure sensor: hex body + barrel + connector. */
export function railPressureSensor(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const hex = new THREE.CylinderGeometry(0.009, 0.009, 0.008, 6)
  parts.push(hex)
  const barrel = new THREE.CylinderGeometry(0.007, 0.007, 0.016, 10)
  barrel.translate(0, 0.012, 0)
  parts.push(barrel)
  return mergeParts(parts)
}
