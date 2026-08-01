import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'
import { BORE_POSITIONS_X, boredPlate } from './engineBlock'

/**
 * EA888 Gen 3 cylinder head (AlSi10Mg): cross-flow with the exhaust
 * manifold INTEGRATED into the casting — four water-cooled runners merge
 * into a single turbo flange on the exhaust side (−Z). Intake ports +Z,
 * spark-plug wells on top, two cam-tunnel bulges. Canonical: same frame
 * as the block (crank axis X, up +Y), head centred at the origin,
 * combustion face at y = −0.065.
 */
export function cylinderHead(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  const body = new THREE.BoxGeometry(0.44, 0.13, 0.235)
  parts.push(body)

  // integrated exhaust manifold: four runners converging to one collector
  BORE_POSITIONS_X.forEach((x) => {
    const runner = new THREE.CylinderGeometry(0.019, 0.023, 0.075, 14)
    runner.rotateX(Math.PI / 2)
    // angle runners toward the centre collector
    runner.rotateY(-x * 1.6)
    runner.translate(x * 0.75, -0.015, -0.15)
    parts.push(runner)
  })
  const collector = new THREE.BoxGeometry(0.15, 0.075, 0.045)
  collector.translate(0, -0.015, -0.185)
  parts.push(collector)
  const turboFlange = new THREE.CylinderGeometry(0.042, 0.042, 0.014, 24)
  turboFlange.rotateX(Math.PI / 2)
  turboFlange.translate(0, -0.015, -0.213)
  parts.push(turboFlange)

  // intake ports (+Z side)
  BORE_POSITIONS_X.forEach((x) => {
    const port = new THREE.CylinderGeometry(0.018, 0.018, 0.05, 12)
    port.rotateX(Math.PI / 2)
    port.translate(x, 0.005, 0.14)
    parts.push(port)
  })

  // spark-plug wells on the top face
  BORE_POSITIONS_X.forEach((x) => {
    const well = new THREE.CylinderGeometry(0.009, 0.009, 0.02, 12)
    well.translate(x, 0.072, 0)
    parts.push(well)
  })

  // cam-tunnel bulges along the top
  for (const z of [-0.045, 0.045]) {
    const tunnel = new THREE.CylinderGeometry(0.026, 0.026, 0.42, 16)
    tunnel.rotateZ(Math.PI / 2)
    tunnel.translate(0, 0.065, z)
    parts.push(tunnel)
  }

  return mergeParts(parts)
}

/** Three-layer MLS head gasket: the block's bored deck plate, 3 mm thin. */
export function headGasket(_params: GeometryParams): THREE.BufferGeometry {
  return boredPlate(0.003, 0.0425)
}
