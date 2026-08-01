import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts } from './shapes'
import { BORE_POSITIONS_X } from './engineBlock'

/**
 * Forged flat-plane I4 crankshaft: five 48 mm main journals, four crank
 * pins at the 92.8 mm-stroke radius (pins 1+4 up, 2+3 down, firing order
 * 1-3-4-2), webs with counterweights, chain-drive snout at the flywheel
 * end (−X) and output flange. Canonical: crank axis along X at the origin.
 */
export function crankshaft(params: GeometryParams): THREE.BufferGeometry {
  const mainR = mm(params, 'mainJournalMm', 48) / 2
  const throwR = mm(params, 'strokeMm', 92.8) / 2
  const pinR = 0.021
  const parts: THREE.BufferGeometry[] = []

  // five main journals between/outside the four throws
  for (const x of [-0.176, -0.088, 0, 0.088, 0.176]) {
    const j = new THREE.CylinderGeometry(mainR, mainR, 0.026, 24)
    j.rotateZ(Math.PI / 2)
    j.translate(x, 0, 0)
    parts.push(j)
  }

  // crank pins + webs with counterweights per throw
  BORE_POSITIONS_X.forEach((x, i) => {
    const up = i === 0 || i === 3 ? 1 : -1 // flat-plane: 1 & 4 up, 2 & 3 down
    const pinY = up * throwR

    const pin = new THREE.CylinderGeometry(pinR, pinR, 0.024, 20)
    pin.rotateZ(Math.PI / 2)
    pin.translate(x, pinY, 0)
    parts.push(pin)

    for (const side of [-1, 1]) {
      const web = new THREE.CylinderGeometry(0.052, 0.052, 0.012, 24)
      web.rotateZ(Math.PI / 2)
      web.translate(x + side * 0.019, pinY * 0.25, 0)
      parts.push(web)
      // counterweight lump opposite the pin
      const cw = new THREE.BoxGeometry(0.012, 0.05, 0.07)
      cw.translate(x + side * 0.019, -up * 0.055, 0)
      parts.push(cw)
    }
  })

  // chain-drive snout (flywheel end, −X) and output flange
  const snout = new THREE.CylinderGeometry(0.015, 0.015, 0.055, 18)
  snout.rotateZ(Math.PI / 2)
  snout.translate(-0.219, 0, 0)
  parts.push(snout)
  const flange = new THREE.CylinderGeometry(0.047, 0.047, 0.016, 28)
  flange.rotateZ(Math.PI / 2)
  flange.translate(0.198, 0, 0)
  parts.push(flange)

  return mergeParts(parts)
}
