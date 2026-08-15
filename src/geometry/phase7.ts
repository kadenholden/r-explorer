import * as THREE from 'three'
import type { GeometryParams } from './registry'
import { mm } from './registry'
import { mergeParts, tubeThrough } from './shapes'

/** Phase 7 recipes: brake hydraulics, cooling, fuel storage, electrics,
 *  and cabin — the dossier's final systems. */

/** Brake booster + tandem master cylinder + reservoir. */
export function boosterMaster(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const booster = new THREE.CylinderGeometry(0.11, 0.11, 0.07, 24)
  booster.rotateX(Math.PI / 2)
  parts.push(booster)
  const mc = new THREE.CylinderGeometry(0.022, 0.022, 0.14, 14)
  mc.rotateX(Math.PI / 2)
  mc.translate(0, 0, 0.1)
  parts.push(mc)
  const reservoir = new THREE.BoxGeometry(0.09, 0.06, 0.06)
  reservoir.translate(0, 0.06, 0.1)
  parts.push(reservoir)
  return mergeParts(parts)
}

/** ABS/ESC hydraulic unit: valve block + pump motor + ECU face. */
export function absUnit(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const block = new THREE.BoxGeometry(0.09, 0.08, 0.07)
  parts.push(block)
  const motor = new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16)
  motor.rotateX(Math.PI / 2)
  motor.translate(0, 0, 0.06)
  parts.push(motor)
  const ecu = new THREE.BoxGeometry(0.1, 0.09, 0.02)
  ecu.translate(0, 0, -0.045)
  parts.push(ecu)
  return mergeParts(parts)
}

/** Brake hard-line bundle: ABS unit out to all four corners (world coords). */
export function brakeLines(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const runs: [number, number, number][][] = [
    [[-0.38, 0.18, 0.05], [-0.6, -0.1, 0.05], [-0.72, -0.12, 0.05]],
    [[-0.38, 0.18, 0.05], [0.3, -0.05, 0.02], [0.6, -0.1, 0.05], [0.72, -0.12, 0.05]],
    [[-0.38, 0.18, 0.05], [-0.35, -0.2, -0.6], [-0.5, -0.24, -1.8], [-0.72, -0.15, -2.45]],
    [[-0.38, 0.18, 0.05], [-0.3, -0.22, -0.62], [0.35, -0.26, -1.8], [0.72, -0.15, -2.45]],
  ]
  for (const run of runs) parts.push(tubeThrough(run, 0.0035))
  return mergeParts(parts)
}

/** Wheel-speed sensor: probe + cable tail. */
export function wheelSpeedSensor(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const probe = new THREE.CylinderGeometry(0.007, 0.007, 0.025, 10)
  parts.push(probe)
  const head = new THREE.BoxGeometry(0.02, 0.015, 0.012)
  head.translate(0, 0.018, 0)
  parts.push(head)
  return mergeParts(parts)
}

/** N493 rotary-slide thermal-management module: housing with two barrel
 *  valves, worm-drive DC motor, and hose stubs. */
export function n493Module(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const housing = new THREE.BoxGeometry(0.13, 0.1, 0.09)
  parts.push(housing)
  for (const y of [0.02, -0.025]) {
    const barrel = new THREE.CylinderGeometry(0.032, 0.032, 0.12, 18)
    barrel.rotateZ(Math.PI / 2)
    barrel.translate(0.01, y, 0)
    parts.push(barrel)
  }
  const motor = new THREE.CylinderGeometry(0.02, 0.02, 0.05, 14)
  motor.translate(-0.05, 0.06, 0)
  parts.push(motor)
  for (const [y, z] of [
    [0.02, 0.055],
    [-0.025, 0.055],
    [0.02, -0.055],
  ] as const) {
    const stub = new THREE.CylinderGeometry(0.014, 0.014, 0.03, 10)
    stub.rotateX(Math.PI / 2)
    stub.translate(0.03, y, z)
    parts.push(stub)
  }
  return mergeParts(parts)
}

/** Mechanical coolant pump (balance-shaft belt driven). */
export function coolantPump(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.045, 0.05, 0.05, 18)
  body.rotateZ(Math.PI / 2)
  parts.push(body)
  const snout = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 12)
  snout.rotateX(Math.PI / 2)
  snout.translate(0, 0.01, 0.04)
  parts.push(snout)
  const beltWheel = new THREE.CylinderGeometry(0.032, 0.032, 0.014, 16)
  beltWheel.rotateZ(Math.PI / 2)
  beltWheel.translate(-0.032, 0, 0)
  parts.push(beltWheel)
  return mergeParts(parts)
}

/** Heat exchanger core with end tanks; `heightMm`/`widthMm` size it
 *  (radiator, condenser, aux radiator, gearbox cooler). */
export function heatExchanger(params: GeometryParams): THREE.BufferGeometry {
  const w = mm(params, 'widthMm', 620)
  const h = mm(params, 'heightMm', 380)
  const t = mm(params, 'thicknessMm', 30)
  const parts: THREE.BufferGeometry[] = []
  const core = new THREE.BoxGeometry(w, h, t)
  parts.push(core)
  for (let i = 0; i < 7; i++) {
    const fin = new THREE.BoxGeometry(0.003, h, t + 0.004)
    fin.translate(-w / 2 + ((i + 1) * w) / 8, 0, 0)
    parts.push(fin)
  }
  for (const s of [-1, 1]) {
    const tank = new THREE.BoxGeometry(0.045, h + 0.02, t + 0.01)
    tank.translate((s * (w + 0.04)) / 2, 0, 0)
    parts.push(tank)
  }
  return mergeParts(parts)
}

/** Twin cooling fans in their shroud. */
export function fanShroud(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const plate = new THREE.BoxGeometry(0.62, 0.4, 0.02)
  parts.push(plate)
  for (const x of [-0.155, 0.155]) {
    const ring = new THREE.TorusGeometry(0.13, 0.012, 10, 24)
    ring.translate(x, 0, 0.012)
    parts.push(ring)
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2
      const blade = new THREE.BoxGeometry(0.028, 0.1, 0.008)
      blade.translate(0, 0.065, 0)
      blade.rotateZ(a)
      blade.translate(x, 0, 0.016)
      parts.push(blade)
    }
    const hub = new THREE.CylinderGeometry(0.03, 0.03, 0.03, 14)
    hub.rotateX(Math.PI / 2)
    hub.translate(x, 0, 0.016)
    parts.push(hub)
  }
  return mergeParts(parts)
}

/** Expansion / degas tank with cap. */
export function expansionTank(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  // photo-matched (2026-08-15): a proper translucent tank standing in the
  // offside gutter, with the big round screw cap on its top face
  const body = new THREE.BoxGeometry(0.15, 0.19, 0.13)
  parts.push(body)
  const shoulder = new THREE.BoxGeometry(0.13, 0.04, 0.11)
  shoulder.translate(0, 0.105, 0)
  parts.push(shoulder)
  const cap = new THREE.CylinderGeometry(0.042, 0.042, 0.028, 20)
  cap.translate(0.01, 0.135, 0)
  parts.push(cap)
  const outlet = new THREE.CylinderGeometry(0.014, 0.014, 0.05, 12)
  outlet.rotateZ(Math.PI / 2)
  outlet.translate(-0.09, -0.06, 0)
  parts.push(outlet)
  return mergeParts(parts)
}

/** Main coolant hoses: N493/pump to radiator, heater core stubs. */
export function coolantHoses(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  parts.push(
    tubeThrough(
      [
        [0.33, -0.02, 0.11],
        [0.4, 0.05, 0.35],
        [0.28, 0.02, 0.58],
      ],
      0.016,
    ),
  )
  parts.push(
    tubeThrough(
      [
        [0.24, -0.07, 0.13],
        [-0.1, -0.15, 0.45],
        [-0.28, -0.02, 0.58],
      ],
      0.016,
    ),
  )
  parts.push(
    tubeThrough(
      [
        [0.32, 0.03, 0.05],
        [0.2, 0.2, -0.24],
      ],
      0.012,
    ),
  )
  return mergeParts(parts)
}

/** Fuel tank (saddle) with straps. */
export function fuelTank(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.95, 0.17, 0.5)
  parts.push(body)
  const saddle = new THREE.BoxGeometry(0.3, 0.06, 0.5)
  saddle.translate(0, -0.11, 0)
  parts.push(saddle)
  for (const x of [-0.3, 0.3]) {
    const strap = new THREE.BoxGeometry(0.02, 0.2, 0.52)
    strap.translate(x, -0.02, 0)
    parts.push(strap)
  }
  return mergeParts(parts)
}

/** In-tank LPFP / sender module (top-hat flange). */
export function lpfpModule(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const flange = new THREE.CylinderGeometry(0.055, 0.055, 0.015, 18)
  parts.push(flange)
  const body = new THREE.CylinderGeometry(0.035, 0.035, 0.1, 14)
  body.translate(0, -0.055, 0)
  parts.push(body)
  const fitting = new THREE.CylinderGeometry(0.008, 0.008, 0.03, 8)
  fitting.rotateZ(Math.PI / 2)
  fitting.translate(0.05, 0.005, 0)
  parts.push(fitting)
  return mergeParts(parts)
}

/** Filler neck from the right rear quarter down to the tank. */
export function fillerNeck(_params: GeometryParams): THREE.BufferGeometry {
  return tubeThrough(
    [
      [0.82, 0.12, -1.72],
      [0.6, -0.05, -1.8],
      [0.4, -0.18, -1.85],
    ],
    0.02,
  )
}

/** EVAP charcoal canister. */
export function evapCanister(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.CylinderGeometry(0.05, 0.05, 0.14, 16)
  body.rotateZ(Math.PI / 2)
  parts.push(body)
  const port = new THREE.CylinderGeometry(0.007, 0.007, 0.02, 8)
  port.translate(0.05, 0.055, 0)
  parts.push(port)
  return mergeParts(parts)
}

/** Battery with terminals on its tray. */
export function batteryTray(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const tray = new THREE.BoxGeometry(0.3, 0.02, 0.2)
  tray.translate(0, -0.09, 0)
  parts.push(tray)
  const body = new THREE.BoxGeometry(0.27, 0.17, 0.17)
  parts.push(body)
  for (const x of [-0.09, 0.09]) {
    const post = new THREE.CylinderGeometry(0.012, 0.012, 0.02, 10)
    post.translate(x, 0.095, -0.05)
    parts.push(post)
  }
  return mergeParts(parts)
}

/** Finned ECU-style box (ECU / gateway / fuse box / EPB CU via size). */
export function ecuBox(params: GeometryParams): THREE.BufferGeometry {
  const w = mm(params, 'widthMm', 220)
  const h = mm(params, 'heightMm', 45)
  const d = mm(params, 'depthMm', 160)
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(w, h, d)
  parts.push(body)
  for (let i = 0; i < 5; i++) {
    const fin = new THREE.BoxGeometry(w * 0.9, 0.004, 0.006)
    fin.translate(0, h / 2 + 0.003, -d / 2 + ((i + 1) * d) / 6)
    parts.push(fin)
  }
  const connector = new THREE.BoxGeometry(w * 0.5, h * 0.6, 0.02)
  connector.translate(0, 0, d / 2 + 0.01)
  parts.push(connector)
  return mergeParts(parts)
}

/** Main harness loom: engine bay → bulkhead → cabin → rear (world). */
export function harnessLoom(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  parts.push(
    tubeThrough(
      [
        [-0.6, 0.32, 0.25],
        [-0.45, 0.3, -0.1],
        [-0.35, 0.2, -0.28],
        [-0.4, -0.1, -0.6],
        [-0.45, -0.18, -1.5],
        [-0.4, -0.1, -2.3],
      ],
      0.012,
    ),
  )
  parts.push(
    tubeThrough(
      [
        [-0.45, 0.3, -0.05],
        [0.1, 0.32, 0.05],
        [0.5, 0.25, 0.1],
      ],
      0.009,
    ),
  )
  return mergeParts(parts)
}

/** Dashboard with binnacle and centre screen. */
export function dashboard(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(1.55, 0.16, 0.4)
  parts.push(body)
  const top = new THREE.BoxGeometry(1.55, 0.03, 0.44)
  top.translate(0, 0.09, 0)
  parts.push(top)
  const binnacle = new THREE.BoxGeometry(0.34, 0.1, 0.06)
  binnacle.translate(0.35, 0.13, 0.1)
  parts.push(binnacle)
  const screen = new THREE.BoxGeometry(0.24, 0.14, 0.02)
  screen.translate(0, 0.06, 0.2)
  parts.push(screen)
  return mergeParts(parts)
}

/** Steering wheel + column stalk (RHD). */
export function steeringWheelColumn(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const rim = new THREE.TorusGeometry(0.17, 0.02, 12, 28)
  parts.push(rim)
  const hub = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16)
  hub.rotateX(Math.PI / 2)
  parts.push(hub)
  for (const a of [0, 2.1, -2.1]) {
    const spoke = new THREE.BoxGeometry(0.03, 0.15, 0.02)
    spoke.translate(0, 0.08, 0)
    spoke.rotateZ(a)
    parts.push(spoke)
  }
  const column = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 12)
  column.rotateX(Math.PI / 2.6)
  column.translate(0, -0.12, 0.16)
  parts.push(column)
  return mergeParts(parts)
}

/** Pedal box: brake + accelerator on their arms (DSG — no clutch). */
export function pedalBox(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  for (const [x, w] of [
    [-0.05, 0.06],
    [0.05, 0.04],
  ] as const) {
    const arm = new THREE.BoxGeometry(0.015, 0.16, 0.02)
    arm.translate(x, 0.08, 0)
    parts.push(arm)
    const pad = new THREE.BoxGeometry(w, 0.05, 0.015)
    pad.translate(x, 0, 0.012)
    parts.push(pad)
  }
  return mergeParts(parts)
}

/** Centre console with the DSG selector. */
export function consoleShifter(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.24, 0.1, 0.55)
  parts.push(body)
  const gate = new THREE.BoxGeometry(0.1, 0.02, 0.16)
  gate.translate(0, 0.06, 0.1)
  parts.push(gate)
  const lever = new THREE.CylinderGeometry(0.012, 0.012, 0.1, 10)
  lever.rotateX(-0.3)
  lever.translate(0, 0.11, 0.1)
  parts.push(lever)
  const knob = new THREE.SphereGeometry(0.025, 12, 10)
  knob.translate(0, 0.16, 0.115)
  parts.push(knob)
  return mergeParts(parts)
}

/** HVAC box (blower + evaporator + heater core housing) behind the dash. */
export function hvacBox(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  const body = new THREE.BoxGeometry(0.5, 0.28, 0.24)
  parts.push(body)
  const blower = new THREE.CylinderGeometry(0.09, 0.09, 0.1, 18)
  blower.rotateZ(Math.PI / 2)
  blower.translate(0.32, -0.02, 0)
  parts.push(blower)
  for (const x of [-0.15, 0, 0.15]) {
    const duct = new THREE.CylinderGeometry(0.03, 0.03, 0.08, 10)
    duct.rotateX(Math.PI / 2)
    duct.translate(x, 0.1, -0.14)
    parts.push(duct)
  }
  return mergeParts(parts)
}

/** A/C refrigerant lines: compressor → condenser → bulkhead (world). */
export function acLines(_params: GeometryParams): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  parts.push(
    tubeThrough(
      [
        [0.29, -0.16, 0.2],
        [0.32, -0.1, 0.5],
        [0.25, -0.05, 0.66],
      ],
      0.009,
    ),
  )
  parts.push(
    tubeThrough(
      [
        [-0.25, -0.05, 0.66],
        [-0.3, 0.1, 0.2],
        [-0.15, 0.22, -0.26],
      ],
      0.009,
    ),
  )
  return mergeParts(parts)
}
