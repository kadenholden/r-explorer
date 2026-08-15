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

/** Pre-MOT walk-round: UK class-4 test items, tuned to THIS car's known
 *  weak points from the research. `interval` carries the pass/fail rule. */
export const MOT_ITEMS: ServiceItem[] = [
  {
    id: 'mot-warning-lights',
    title: 'Dashboard warning lights',
    interval: 'FAIL if EML, ABS, airbag, EPS or brake warning stays lit with engine running',
    where:
      'Turn the ignition on: every lamp should light, then go out after start. THIS CAR’S TRAP: a P2015 intake-flap code relights the EML and is an instant fail — and the fix after a clean is usually the free VCDS Group 142 adaptation, not parts.',
    notes: 'An "ACC not available" message is NOT an MOT item — but see the fault demo before spending money on it.',
    showTargets: ['intake-manifold', 'sensor-g336'],
    focusPartId: 'sensor-g336',
  },
  {
    id: 'mot-lights',
    title: 'All exterior lights',
    interval: 'FAIL for any lamp out, wrong colour, or headlamp aim off',
    where:
      'Walk-round with a helper (or a wall/reflection): dipped, main, DRLs, indicators front/rear/side, both brake lights PLUS the high-level, number-plate lamps, rear fog, reverse. Xenon cars must have working washers.',
    flags: 'R10 left one open: the reverse-lamp bulb is W16W vs P21W by holder — check yours before buying spares.',
    showTargets: [],
  },
  {
    id: 'mot-screen-wipers',
    title: 'Windscreen, wipers & washers',
    interval: 'FAIL: chip/crack >10 mm in the driver’s sweep zone, >40 mm anywhere swept; smearing wipers; dry washers',
    where:
      'Check the glass low in the driver’s wiper arc where stone chips hide. Blades are Bosch A864S (650/450 mm) — a tenner now beats an advisory later. Fill the washer bottle before the test.',
    showTargets: ['windscreen'],
    focusPartId: 'windscreen',
  },
  {
    id: 'mot-tyres',
    title: 'Tyres & wheels',
    interval: 'FAIL below 1.6 mm across the central ¾ of the tread, or any cut/bulge/cord',
    where:
      '235/35 R19 — and CHECK THE INNER EDGES with the wheel on lock or a phone camera: the R’s camber eats inner shoulders while the outside still looks legal. Match tyres across each axle. Wheel bolts 120 Nm after any wheel-off check.',
    showTargets: ['suspension/wheels-pretoria'],
    focusPartId: 'tyres-right',
  },
  {
    id: 'mot-brakes',
    title: 'Brakes',
    interval: 'FAIL: efficiency/imbalance on the rollers, pads at metal, discs below limits, leaks, perished hoses',
    where:
      'Look through the Pretorias: decent pad meat on ALL four (rears wear faster than people expect with the EPB), discs not lipped/scored below limits (fronts min 28 mm, rears min 20). Squeeze the flexi hoses — no cracks or bulges. EPB must hold on the roller test; pull it with the engine running.',
    notes: 'If pads are borderline, do them BEFORE the test — and remember rears need the scan-tool lining-change mode.',
    showTargets: ['brakes/front-brake-corner', 'brakes/rear-brake-corner-right'],
    focusPartId: 'front-brake-pad-outer',
  },
  {
    id: 'mot-suspension',
    title: 'Suspension knocks & wear',
    interval: 'FAIL: broken spring, leaking damper, excessive play in any bush/joint',
    where:
      'THE Mk7 advisory list (R7): front LCA rear console bushes (knock + vague steering — the classic), drop links (rattle over small bumps), strut top mounts (creak on full lock), rear trailing-arm bushes. Bounce each corner — one clean rebound. Torch the springs for the snapped-coil surprise.',
    showTargets: ['suspension/suspension-front', 'suspension/suspension-rear'],
    focusPartId: 'front-lcas',
  },
  {
    id: 'mot-steering',
    title: 'Steering',
    interval: 'FAIL: free play, split rack gaiters, torn track-rod-end boots, EPS warning lamp',
    where:
      'Rock the wheel with the car on the ground — no clonks or dead spot. On lock, look behind each front wheel: rack gaiters and track-rod-end boots must be untorn (a split boot is a cheap part but a guaranteed fail).',
    showTargets: ['eps-rack', 'front-tie-rods'],
    focusPartId: 'front-tie-rods',
  },
  {
    id: 'mot-exhaust-emissions',
    title: 'Exhaust & emissions',
    interval: 'FAIL: blowing joints, missing cat, emissions over petrol limits',
    where:
      'Cold start it the morning of the test and get it HOT before you arrive — a fully-lit cat is the difference on the gas bench. Listen for blow at the V-band, flex section and sleeve joints; rattly rear-box flaps are an advisory-magnet but not a fail.',
    notes: 'A tired PCV or heavy carbon can push idle emissions — the 30-second oil-cap check costs nothing (see Service tab).',
    showTargets: ['engine/engine-exhaust'],
    focusPartId: 'downpipe-cat',
  },
  {
    id: 'mot-leaks',
    title: 'Fluid leaks',
    interval: 'FAIL only for a MAJOR leak (dripping); weeps and misting = advisory',
    where:
      'This car’s specialist subject. The full suspect map from the research: PCV module and cam-bridge sealant up top, oil-filter housing/cooler mid-height (mimics a rear-main leak), sump joints and the plastic bayonet drain plug below, N493 coolant seep hiding under the intake manifold. Wipe everything clean a week before the test so fresh weeps show their true origin.',
    showTargets: ['pcv-module', 'oil-filter-housing', 'upper-sump', 'lower-sump', 'n493-module'],
    focusPartId: 'oil-filter-housing',
  },
  {
    id: 'mot-cabin',
    title: 'Seatbelts, horn, mirrors, doors',
    interval: 'FAIL: frayed/non-latching belt, dead horn, missing/insecure mirror, door that won’t open',
    where:
      'Tug-test every belt (they must lock on a sharp pull) and check webbing edges for fraying. Horn works, both door mirrors secure (the R’s satin caps rattle when clips break), doors open from inside AND outside, tailgate stays up.',
    flags: 'Kessy handles with water ingress can make a door intermittent from outside (R11) — test all four before the tester does.',
    showTargets: ['mirror-caps'],
    focusPartId: 'mirror-caps',
  },
  {
    id: 'mot-plates-vin',
    title: 'Number plates & VIN',
    interval: 'FAIL: illegible/incorrectly-spaced plates, unreadable VIN',
    where: 'Both plates clean, correct font/spacing, both plate lamps working. VIN readable at the windscreen base.',
    showTargets: [],
  },
  {
    id: 'mot-battery-wiring',
    title: 'Battery & visible wiring',
    interval: 'FAIL: insecure battery, exposed/chafing wiring, leaking battery',
    where:
      'The AGM battery on top of the gearbox must be clamped tight — testers check. Glance over visible looms in the bay for chafe, especially near the strut towers.',
    showTargets: ['battery'],
    focusPartId: 'battery',
  },
]

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
      'Reservoir with the yellow DOT 4 cap at the back-right (offside) of the bay behind the coolant tank — photo-verified. Bleeding sequence and the ABS unit’s involvement make a pressure bleeder the sane tool.',
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
    id: 'screenwash',
    title: 'Screen wash',
    interval: 'Top up monthly; proper mix year-round (plain water cracks the bottle in frost)',
    where:
      'Blue-capped filler at the front-right of the bay — but the BOTTLE and pump hide behind the right-front arch liner, which is why leaks "can\'t be found" from above. A bottle that empties overnight is almost always the pump grommet — see the guided job.',
    showTargets: [
      'washer-filler-neck',
      'washer-bottle',
      'washer-pump',
      'washer-pump-headlight',
      'washer-level-sender',
      'headlight-washer-jets',
    ],
    focusPartId: 'washer-bottle',
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
