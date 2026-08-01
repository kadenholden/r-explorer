import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mergeParts } from './shapes'

/**
 * DQ250 six-speed wet dual-clutch (0D9 AWD variant), transverse: the
 * gearbox hangs off the engine's flywheel end (−X). All recipes share the
 * engine's world frame — input axis along X at crank height.
 */

/** Main casing: bellhousing flange at the engine face, tapering case. */
export function dsgHousing(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []

  const bell = new THREE.CylinderGeometry(0.155, 0.165, 0.05, 28)
  bell.rotateZ(Math.PI / 2)
  bell.translate(0.155, -0.045, 0)
  parts.push(bell)

  const mainCase = new THREE.BoxGeometry(0.24, 0.3, 0.26)
  mainCase.translate(0, -0.045, 0)
  parts.push(mainCase)

  const endCase = new THREE.BoxGeometry(0.1, 0.24, 0.2)
  endCase.translate(-0.17, -0.06, 0)
  parts.push(endCase)

  // ribbing
  for (const x of [-0.08, 0, 0.08]) {
    const rib = new THREE.BoxGeometry(0.01, 0.28, 0.008)
    rib.translate(x, -0.045, 0.134)
    parts.push(rib)
  }
  // fill/drain bosses
  const boss = new THREE.CylinderGeometry(0.012, 0.012, 0.015, 10)
  boss.rotateX(Math.PI / 2)
  boss.translate(0.04, -0.16, 0.135)
  parts.push(boss)

  return mergeParts(parts)
}

/** Dual-mass damper on the crank output (torsional isolation for the DSG). */
export function dualMassDamper(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const primary = new THREE.CylinderGeometry(0.115, 0.115, 0.016, 32)
  primary.rotateZ(Math.PI / 2)
  parts.push(primary)
  const secondary = new THREE.CylinderGeometry(0.095, 0.095, 0.014, 32)
  secondary.rotateZ(Math.PI / 2)
  secondary.translate(-0.017, 0, 0)
  parts.push(secondary)
  // arc-spring windows hint
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4
    const spring = new THREE.BoxGeometry(0.012, 0.02, 0.05)
    spring.rotateX(a)
    spring.translate(-0.008, Math.sin(a) * 0.08, Math.cos(a) * 0.08)
    parts.push(spring)
  }
  const hub = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 18)
  hub.rotateZ(Math.PI / 2)
  hub.translate(-0.01, 0, 0)
  parts.push(hub)
  return mergeParts(parts)
}

/** Wet dual-clutch pack: K1 (outer drum, odd gears) and K2 (inner, even)
 *  concentric plate packs running in oil. */
export function dualClutchPack(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const outerDrum = new THREE.CylinderGeometry(0.105, 0.105, 0.055, 28, 1, true)
  outerDrum.rotateZ(Math.PI / 2)
  parts.push(outerDrum)
  const k1 = new THREE.CylinderGeometry(0.098, 0.098, 0.04, 28)
  k1.rotateZ(Math.PI / 2)
  k1.translate(0.005, 0, 0)
  parts.push(k1)
  const k2 = new THREE.CylinderGeometry(0.07, 0.07, 0.045, 24)
  k2.rotateZ(Math.PI / 2)
  k2.translate(-0.012, 0, 0)
  parts.push(k2)
  // plate slots suggestion: thin rings
  for (const dx of [-0.022, -0.002, 0.018]) {
    const ring = new THREE.CylinderGeometry(0.107, 0.107, 0.004, 28)
    ring.rotateZ(Math.PI / 2)
    ring.translate(dx, 0, 0)
    parts.push(ring)
  }
  const hub = new THREE.CylinderGeometry(0.024, 0.024, 0.075, 16)
  hub.rotateZ(Math.PI / 2)
  parts.push(hub)
  return mergeParts(parts)
}

/** Mechatronic unit J743: valve body + TCU in one finned block with a
 *  solenoid rank and the main connector. */
export function mechatronicJ743(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const block = new THREE.BoxGeometry(0.2, 0.14, 0.045)
  parts.push(block)
  for (let i = 0; i < 6; i++) {
    const solenoid = new THREE.CylinderGeometry(0.011, 0.011, 0.03, 10)
    solenoid.rotateX(Math.PI / 2)
    solenoid.translate(-0.075 + i * 0.03, -0.045, 0.03)
    parts.push(solenoid)
  }
  // pressure accumulator dome (the wear item)
  const accumulator = new THREE.CylinderGeometry(0.025, 0.025, 0.035, 16)
  accumulator.rotateX(Math.PI / 2)
  accumulator.translate(0.07, 0.03, 0.035)
  parts.push(accumulator)
  const connector = new THREE.BoxGeometry(0.05, 0.02, 0.02)
  connector.translate(0, 0.078, 0.01)
  parts.push(connector)
  return mergeParts(parts)
}

/** Two concentric input shafts: solid inner (K2/even… by convention here
 *  inner=odd) protruding beyond the hollow outer. */
export function inputShafts(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const outer = new THREE.CylinderGeometry(0.017, 0.017, 0.14, 16)
  outer.rotateZ(Math.PI / 2)
  outer.translate(0.035, 0, 0)
  parts.push(outer)
  const inner = new THREE.CylinderGeometry(0.009, 0.009, 0.26, 12)
  inner.rotateZ(Math.PI / 2)
  parts.push(inner)
  // splines hint at the clutch end
  const spline = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 8)
  spline.rotateZ(Math.PI / 2)
  spline.translate(0.115, 0, 0)
  parts.push(spline)
  return mergeParts(parts)
}

/** Output-shaft gear cluster: shaft with a run of different-size gears
 *  (low-segment cylinders read as toothed wheels). */
export function gearCluster(params: GeometryParams): THREE.BufferGeometry {
  const seed = typeof params['variant'] === 'number' ? (params['variant'] as number) : 0
  const radii = seed === 0 ? [0.052, 0.066, 0.043, 0.058] : [0.06, 0.045, 0.068, 0.05]
  const parts: THREE.BufferGeometry[] = []
  const shaft = new THREE.CylinderGeometry(0.011, 0.011, 0.24, 12)
  shaft.rotateZ(Math.PI / 2)
  parts.push(shaft)
  radii.forEach((r, i) => {
    const gear = new THREE.CylinderGeometry(r, r, 0.016, 20)
    gear.rotateZ(Math.PI / 2)
    gear.translate(-0.08 + i * 0.052, 0, 0)
    parts.push(gear)
  })
  return mergeParts(parts)
}

/** Integrated final drive: ring gear on the diff carrier with output
 *  flanges both sides (front axles run along X). */
export function finalDriveDiff(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const ring = new THREE.CylinderGeometry(0.088, 0.088, 0.022, 24)
  ring.rotateZ(Math.PI / 2)
  ring.translate(0.02, 0, 0)
  parts.push(ring)
  const carrier = new THREE.CylinderGeometry(0.055, 0.055, 0.09, 20)
  carrier.rotateZ(Math.PI / 2)
  parts.push(carrier)
  for (const s of [-1, 1]) {
    const flange = new THREE.CylinderGeometry(0.032, 0.032, 0.02, 16)
    flange.rotateZ(Math.PI / 2)
    flange.translate(s * 0.062, 0, 0)
    parts.push(flange)
  }
  return mergeParts(parts)
}

/** AWD power take-off (bevel box): 90° drive off the final drive with the
 *  propshaft flange facing rearward (−Z). Phase 4 hangs the driveline
 *  off this flange. */
export function ptoBevel(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const housing = new THREE.CylinderGeometry(0.055, 0.062, 0.07, 18)
  housing.rotateZ(Math.PI / 2)
  parts.push(housing)
  const neck = new THREE.CylinderGeometry(0.035, 0.035, 0.06, 16)
  neck.rotateX(Math.PI / 2)
  neck.translate(0, 0, -0.055)
  parts.push(neck)
  const flange = new THREE.CylinderGeometry(0.042, 0.042, 0.014, 16)
  flange.rotateX(Math.PI / 2)
  flange.translate(0, 0, -0.09)
  parts.push(flange)
  return mergeParts(parts)
}
