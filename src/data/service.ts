/**
 * The operator's service reference (R5/R6/R8/R9/R12 research + dossier).
 * Every item can point the camera at the real parts via showTargets
 * (isolation node ids) + focusPartId. Torque conflicts and unverified
 * values are stated, never smoothed over — confirm flagged values in
 * erWin/Bentley before real work.
 */

export interface ServiceItem {
  id: string
  title: string
  interval: string
  fluid?: string
  capacity?: string
  torque?: string
  where: string
  notes?: string
  flags?: string
  /** Node ids (part ids or system/assembly nodes) to isolate. */
  showTargets: string[]
  /** Part whose position the camera flies to. */
  focusPartId?: string
}

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'engine-oil',
    title: 'Engine oil & filter',
    interval: 'VW: 10k miles / 1 yr — halve it on a tuned or hard-driven car',
    fluid: 'VW 502 00 (5W-30/5W-40 meeting the standard)',
    capacity: '5.7 L with filter (R9)',
    torque: 'OEM plastic bayonet drain plug: quarter-turn, torque UNVERIFIED; aftermarket steel-pan plug = 30 Nm',
    where:
      'Filter lives UP TOP in the filter housing on the block front (with the oil cooler) — no need to crawl under for it. The drain is the plastic quarter-turn bayonet in the lower sump pan; it has NO crush washer.',
    notes:
      'While the old oil drains, glance at the pan for curb damage — the lower pan is plastic (R1). The N522 solenoid screen behind the filter housing is where sludge does damage.',
    showTargets: ['oil-filter-housing', 'oil-drain-plug', 'lower-sump'],
    focusPartId: 'oil-drain-plug',
  },
  {
    id: 'haldex',
    title: 'Haldex oil + strainer clean',
    interval: '~3 yr / 30k — and the strainer EVERY time (VW’s book forgets it)',
    fluid: 'G 060 175 A2 (Haldex Gen 5 oil)',
    capacity: '~650–700 ml refill (850 ml dry) (R6)',
    torque: 'Drain plug N 910 827 01 (8 mm hex) = 32 Nm · fill plug N 902 818 02 (5 mm hex) = 15 Nm — new crush washers on both',
    where:
      'On the REAR DRIVE UNIT at the back axle. The DRAIN is the 8 mm hex plug at the bottom of the Haldex (clutch) housing on the front face of the unit; the FILL is the 5 mm hex plug higher on the same face — fill until it runs back out of the hole. The pump + strainer sit behind a small cover on the left of the housing (T10 screws).',
    notes:
      'The strainer gauze is CLEANED, not replaced — nothing to buy. Skipping it is what kills pumps: debris cakes the gauze → pump starves → rear drive gone (P16671-family codes).',
    showTargets: ['rdu-housing', 'haldex-pump', 'haldex-filter', 'haldex-coupling'],
    focusPartId: 'haldex-pump',
  },
  {
    id: 'rear-diff',
    title: 'Rear differential (final drive) oil',
    interval: 'No VW interval — sensible owners do it with the Haldex service',
    fluid: 'G 052 145 family — R5 says S2, R9’s chart says A1: CHECK THE LABEL',
    capacity: '~0.9 L class (verify)',
    torque: 'Plug ~30 Nm forum-grade; specialist sources conflict 19 vs 35 Nm — erWin needed',
    where:
      'The SAME rear drive unit has TWO separate oil chambers: the Haldex clutch oil (front face) and this GEAR oil for the crown wheel & pinion — its fill plug is on the REAR/side of the diff casing. Two different oils in one lump of metal; never mix them up.',
    flags: 'Fluid suffix and plug torque both carry recorded conflicts — verify before ordering.',
    showTargets: ['rdu-housing', 'rear-diff-gears'],
    focusPartId: 'rear-diff-gears',
  },
  {
    id: 'bevel-box',
    title: 'Front bevel box (angle drive) oil',
    interval: 'No VW interval — the most-forgotten fluid on 4Motion cars',
    fluid: 'G 052 145 S2 (R5)',
    capacity: '~0.9 L',
    torque: 'Plug N 90 281 802 — torque not captured, per erWin',
    where:
      'Bolted to the right side of the gearbox where the propshaft starts — the little box that turns drive 90° toward the rear axle. Fill plug on its rear face.',
    showTargets: ['pto-bevel'],
    focusPartId: 'pto-bevel',
  },
  {
    id: 'dsg',
    title: 'DSG fluid & filter (DQ250)',
    interval: '40k miles — at ~92k this car is due its THIRD change',
    fluid: 'G 052 182 A2 (= Pentosin FFL-2)',
    capacity: '~5.5 L at service (7.0–7.2 total); level set by OVERFLOW at 35–45 °C oil temp',
    torque: 'Drain plug 40 Nm (R5) — R12’s chart says 45: conflict, verify · pan bolts 8 Nm staged · filter housing on top of the box',
    where:
      'Drain plug under the gearbox pan (left side of the engine bay, under the battery); the spin-in filter 02E 305 051 C is on TOP of the gearbox. The level procedure needs the overflow standpipe and an oil-temp readout — it’s a garage job without VCDS.',
    showTargets: ['transmission/transmission-dq250'],
    focusPartId: 'dsg-drain-plug',
  },
  {
    id: 'coolant',
    title: 'Coolant',
    interval: 'Lifetime fill officially — change on any major cooling repair',
    fluid: 'G13 (TL-VW 774 J), superseded by mixable G12evo',
    capacity: '10.0 L total (R9)',
    where:
      'There is NO radiator drain screw on the Mk7 — VW drains at the lower hose and refills under VACUUM with VAS 6096, so a full coolant change is a garage job. Top-ups go in the expansion tank (cold!).',
    notes:
      'The leak-prone part is the N493 pump/thermostat module hiding under the intake manifold — its seep crusts white/pink before it drips (R9/R13).',
    showTargets: ['expansion-tank', 'n493-module', 'coolant-pump'],
    focusPartId: 'expansion-tank',
  },
  {
    id: 'brake-fluid',
    title: 'Brake fluid',
    interval: '2–3 yr (hygroscopic — it absorbs water and boils sooner)',
    fluid: 'DOT 4',
    capacity: '~1.2 L for a full flush',
    where:
      'Reservoir on the master cylinder at the back of the engine bay, driver’s side. Bleeding sequence and the ABS unit’s involvement make a pressure bleeder the sane tool.',
    showTargets: ['booster-master', 'abs-esc-unit'],
    focusPartId: 'booster-master',
  },
  {
    id: 'brakes',
    title: 'Brake pads & discs',
    interval: 'By wear: fronts 340×30 mm (min 28) · rears 310×22 mm (min 20)',
    torque:
      'Front guide bolts 30 Nm (Bentley; 35 Nm in vendor guides — conflict) · front carrier 15→200 Nm staged, renew · rear carrier 90 Nm + 90°, 12-pt, renew · rear guides 35 Nm + locker, renew',
    where:
      'Pads: fronts 5Q0698151K, rears 5Q0698451T (the R/S3-specific EPB pad — NOT the GTI-PP part). Discs: 5Q0615301C front, 5Q0615601E rear.',
    notes:
      'REAR PADS NEED THE SCAN TOOL: enter EPB "lining change mode" (VCDS/ODIS) before pushing the pistons — flat tool, never wound — or you strip the EPB spindle gears. There is no manual release.',
    showTargets: ['brakes/front-brake-corner', 'brakes/rear-brake-corner-right'],
    focusPartId: 'rear-brake-caliper-rr',
  },
  {
    id: 'plugs',
    title: 'Spark plugs',
    interval: '60,000 miles (sooner if tuned)',
    torque: '30 Nm into the aluminium head',
    where:
      'Down the plug wells under the coils on the cam cover — OEM 06K905601B = NGK PLFER7A8EG, gap 0.8 mm. Coil hold-down ~10 Nm.',
    showTargets: ['spark-plugs', 'ignition-coils'],
    focusPartId: 'spark-plugs',
  },
  {
    id: 'air-filter',
    title: 'Air filter',
    interval: '~40k miles / on inspection',
    where: 'Panel element in the airbox (5Q0129607AC), left side of the engine bay. Clips off by hand.',
    flags: 'Element part number is series-level (5Q0129620-…) — verify suffix.',
    showTargets: ['airbox'],
    focusPartId: 'airbox',
  },
  {
    id: 'pollen-filter',
    title: 'Pollen / cabin filter',
    interval: '1 yr / 20k miles',
    where: 'Behind the glovebox, in the HVAC unit intake. Part number not yet verified for this car.',
    flags: 'PN NONE FOUND so far — an R11 follow-up.',
    showTargets: ['hvac-unit'],
    focusPartId: 'hvac-unit',
  },
  {
    id: 'wheels',
    title: 'Wheels & tyres',
    interval: 'Torque-check after any wheel-off work',
    torque: '120 Nm (2014 owner’s manual — later manuals print 140: flagged; ball-seat M14×1.5)',
    where: '235/35 R19 on 8J×19 Pretorias, 5×112. TPMS is indirect (ABS-based) — no valve sensors to break.',
    showTargets: ['suspension/wheels-pretoria'],
    focusPartId: 'pretoria-wheels-right',
  },
  {
    id: 'battery',
    title: 'Battery',
    interval: 'On failure (~5–7 yr for AGM)',
    where:
      'Engine bay, left side, on top of the gearbox. AGM 68 Ah / 380 A (family 000915105) — like-for-like AGM only.',
    notes:
      'After a swap: 19-Gateway → Adaptation (battery replacement) per VW TSB 2053976 — no BMW-style registration, but skip it and start-stop misbehaves.',
    showTargets: ['battery'],
    focusPartId: 'battery',
  },
  {
    id: 'wipers',
    title: 'Wiper blades',
    interval: '~1 yr',
    where: 'Bosch A864S set — 650 mm driver / 450 mm passenger (R11; a minority of listings say 700 mm driver — 650/450 is primary).',
    showTargets: [],
  },
  {
    id: 'haldex-note',
    title: 'PCV / breather sanity check',
    interval: 'Any service: 30 seconds, free',
    where:
      'With the engine idling, lift the oil cap: strong suction + idle change = torn diaphragm. A whistle from the engine top is the classic tell. The module is a bolt-on (06K103495BL/BM).',
    notes: 'This car’s live leak suspect — see the fault demo on the PCV module.',
    showTargets: ['pcv-module'],
    focusPartId: 'pcv-module',
  },
]
