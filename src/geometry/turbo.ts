import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * IHI IS38 turbocharger: compressor volute (+X end, with inlet), turbine
 * volute at the head flange end, centre bearing cartridge between them,
 * and the downpipe outlet stub. The motorised wastegate actuator and the
 * diverter valve are separate parts. Canonical: shaft axis along X.
 */
export function is38Turbo(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  // compressor volute + axial inlet
  const compVolute = new THREE.TorusGeometry(0.042, 0.023, 12, 28)
  compVolute.rotateY(Math.PI / 2)
  compVolute.translate(0.045, 0, 0)
  parts.push(compVolute)
  const inlet = new THREE.CylinderGeometry(0.026, 0.032, 0.045, 20)
  inlet.rotateZ(Math.PI / 2)
  inlet.translate(0.095, 0, 0)
  parts.push(inlet)

  // centre housing (CHRA)
  const chra = new THREE.CylinderGeometry(0.028, 0.028, 0.05, 18)
  chra.rotateZ(Math.PI / 2)
  parts.push(chra)

  // turbine volute + inlet flange toward the head (+Z side) and outlet stub
  const turbVolute = new THREE.TorusGeometry(0.036, 0.021, 12, 28)
  turbVolute.rotateY(Math.PI / 2)
  turbVolute.translate(-0.045, 0, 0)
  parts.push(turbVolute)
  const inletFlange = new THREE.BoxGeometry(0.055, 0.05, 0.016)
  inletFlange.translate(-0.045, 0, 0.05)
  parts.push(inletFlange)
  const outlet = new THREE.CylinderGeometry(0.032, 0.038, 0.04, 18)
  outlet.rotateX(Math.PI / 2)
  outlet.translate(-0.045, -0.015, -0.055)
  parts.push(outlet)

  // oil feed line hint on top
  const oil = new THREE.CylinderGeometry(0.004, 0.004, 0.03, 8)
  oil.translate(0, 0.035, 0)
  parts.push(oil)

  return mergeParts(parts)
}

/** Motorised wastegate actuator (06K145xxx family): canister + rod. */
export function wastegateActuator(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const can = new THREE.CylinderGeometry(0.021, 0.021, 0.03, 16)
  can.rotateX(Math.PI / 2)
  parts.push(can)
  const rod = new THREE.CylinderGeometry(0.003, 0.003, 0.05, 8)
  rod.rotateZ(Math.PI / 3)
  rod.translate(-0.02, -0.018, 0.01)
  parts.push(rod)
  const connector = new THREE.BoxGeometry(0.018, 0.01, 0.014)
  connector.translate(0, 0.024, 0)
  parts.push(connector)
  return mergeParts(parts)
}

/** Electric recirculating diverter valve on the compressor housing. */
export function diverterValve(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.017, 0.017, 0.03, 14)
  parts.push(body)
  const cap = new THREE.CylinderGeometry(0.019, 0.019, 0.008, 14)
  cap.translate(0, 0.019, 0)
  parts.push(cap)
  const port = new THREE.CylinderGeometry(0.009, 0.009, 0.02, 10)
  port.rotateX(Math.PI / 2)
  port.translate(0, -0.008, 0.017)
  parts.push(port)
  return mergeParts(parts)
}

/** Lambda / oxygen sensor: threaded body + probe + wire tail. */
export function lambdaSensor(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const hex = new THREE.CylinderGeometry(0.008, 0.008, 0.008, 6)
  parts.push(hex)
  const probe = new THREE.CylinderGeometry(0.005, 0.004, 0.014, 10)
  probe.translate(0, -0.011, 0)
  parts.push(probe)
  const body = new THREE.CylinderGeometry(0.006, 0.006, 0.016, 10)
  body.translate(0, 0.012, 0)
  parts.push(body)
  return mergeParts(parts)
}
