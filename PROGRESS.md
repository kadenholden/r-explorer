# PROGRESS

## R1 ingested — short block goes from skeleton to documented (2026-08-10)

The first deep-research return (R1, engine short block) landed and was
converted into the model — the data pipeline works end to end. The model
went **202 → 224 parts**, and OEM part-number coverage jumped **3 → ~30**.
Full transcription: `docs/research/R1-short-block.md`.

**Architecture corrections** (the return contradicted three things we had
modelled — all fixed):

- There is **no one-piece ladder frame**. The Gen 3 bottom end is five
  discrete main caps, cross-bolted at the sides, clamped from below by
  the structural aluminium upper sump (which carries the upper
  main-bearing supports, oil pump, pickup and baffle). The
  `main-bearing-ladder` record is gone; caps, vertical TTY bolts
  (N91118902, 65 Nm + 90°) and cross bolts (N91187501, torque still
  unverified) replaced it.
- The upper↔lower sump joint is a **rubber gasket** (06K103649H Elring),
  not a sealant bead — the liquid sealant is at the block joint. The
  lower-pan bolts are verified 8 Nm + 45°.
- The OEM drain plug is a **plastic quarter-turn bayonet** (no crush
  washer) — our threaded-plug-with-washer record was wrong.

**New records** (18 short block + 5 lubrication): main caps ×5, cap
bolts ×10, cross bolts ×10, main shells upper/lower ×5+5 (colour-graded
select-fit), rod shells ×8, thrust washers ×2 (launch-wear concern), rod
bolts ×8, ring sets ×4, wrist pins ×4, vibration damper + TTY centre
bolt (class-dependent torque), timing/front cover, front crank seal,
rear main seal flange + 8 alu bolts, core plugs ×4, dipstick; two-stage
oil pump, N428 + N522 solenoids, windage tray, N0282222 O-ring. Fifteen
new geometry recipes in `src/geometry/shortBlockDetail.ts`.

**Torques resolved** (erWin-derived per R1; still confirm before real
work): main caps 65+90, rods 45+90 (30 Nm = old-bolt measuring step
only), damper bolt 100+180 (10.9, DSG car), flywheel 60+90, flange
~15 alternating, sump 8+45, baffle 4+45, pump 8+90.

UNVERIFIED.md's short-block and sump sections collapsed to R1's five
open flags. R2 (head) carries the head-bolt torque conflict. Verified in
the dev preview: load clean, 224 parts, explode separates the new
bottom-end correctly, sump view shows the corrected stack.

## Next chapter: from skeleton to replica (2026-08-02)

Phase 7 merged — all ten dossier systems exist and the app machinery is
proven. Measured coverage at that point: **195 part records / 291 placed
instances, but only 3 OEM numbers and 15 torque specs.** The dossier's own
"every nut and cranny" estimate is 1,800–2,500 parts, so the constraint
from here is DATA, not code.

`docs/RESEARCH-BRIEFS.md` now holds 14 paste-ready deep-research briefs
(one per system plus fasteners, a fault/animation library, and geometry
sources) with a standard return format that maps onto the part schema.
Returns go in `docs/research/` and get converted into part records.

Operator's end goal, recorded: a digital replica of THIS car — every bolt
present and identifiable, lifelike geometry throughout (not just the
shell), and fault animations that explain how systems work and what goes
wrong.

## Phase 7 — complete (2026-08-02) — THE DOSSIER BUILD ORDER IS DONE

All ten dossier systems are now populated (195 parts). Final phase
added 29 records across five assemblies:

- **Brake hydraulics** (5): booster + master cylinder (~1.2 L DOT4,
  2–3 yr), Bosch MK-class ABS/ESC unit (ABS/ESC/EDS/XDS+/hill-hold +
  the AWD vectoring), hard lines to all four corners, wheel-speed
  sensors ×4, EPB control unit.
- **Cooling** (10): the N493 rotary thermal-management module with its
  full dossier story (two coupled rotary valves, 80–110 °C window,
  worm-drive DC motor, 1 kHz PWM) and its cracking-plastic-housing
  knownIssue (60–90k miles); balance-shaft-driven coolant pump; the
  front stack in dossier order (condenser → radiator → intercooler →
  fans); aux radiator; expansion tank; hoses + heater feed; DSG oil
  cooler; A/C lines.
- **Fuel storage** (4): ~55 L tank, in-tank LPFP (~4–6 bar, ~400 WHP
  stock), the R's relocated filler neck, EVAP canister.
- **Electrical** (5): MED 17.5.2 ECU (with the verify-vs-SIMOS18
  flag), J533 gateway with the CAN topology story, EFB/AGM battery +
  recuperation, fuse box, main harness runs.
- **Interior, RHD** (5): dash + cluster + MIB2, steering wheel/column
  (EPS rack flipped RHD), DSG pedal box, console with the S-program
  selector, HVAC unit. Seats already live in the body-shell donor
  parts. RHD is an assumption from the operator's vocabulary — flag in
  CLAUDE.md, flip if wrong.

New Cabin camera preset (use with Body systems hidden). Verified
in-browser: all five assemblies render; cabin view shows dash/wheel/
console/HVAC correctly on the right-hand side.

**Remaining polish backlog (post-dossier):** re-cut schematic body
panels to real stations; exact R-front mesh; valvetrain followers;
search + x-ray modes; callout-density control at full explode; CAN
topology overlay (dossier recommendation); ECU/battery/paint-code
verification against the real car.

## Likeness upgrade — real body shell + true-dimension re-base (2026-08-02)

**Operator authorised sourcing a real mesh.** Found a genuine Mk7 Golf
GLB (via GitHub LFS; credited in README), compressed 83 MB → 2.6 MB
(draco + webp), and recoloured its 32×4 palette from red to the
operator's white. Integrated as its own `body-shell` assembly through
the geometryRef `.glb` path — the exact hero-mesh swap the
architecture was designed for. GlbPart now supports draco + a scale
param.

**Chassis re-based to the car's REAL dimensions** so the real-scale
shell drops on: wheelbase 2.62 m (rear axle z −2.57), track ±0.79,
every rear-cluster station moved by script (rear suspension, rear
brakes, wheels, Haldex RDU, driveshafts, propshaft, exhaust line),
driveshaft lengths/angles recomputed. Wheels now sit in the shell's
actual arches; default view is the white car over the full chassis.

**Known follow-ups:** (1) schematic body panels are default-hidden and
still cut for the old compressed stations — re-cut them to the real
stations if the panel view should return; (2) the donor mesh is
GTI-trim at the bumpers/badges — R-specific details could be swapped
later; (3) interior of the shell is hollow (Phase 7's interior fills
it).

## Phase 6 — complete (2026-08-02)

**Operator spec:** 5-door, WHITE (recorded in CLAUDE.md).

**Body-in-white (8 records):** floorpan + tunnel, front longitudinals/
crash boxes/beam, bulkhead (with the MQB fixed-dimension fact), strut
towers, A/B/C pillars in hot-formed ~1,000 MPa steel, roof + rails,
sills, rear wheelhouses/panel/spare well. Carries VW's own 23 kg BIW
weight-saving breakdown and the 66%→80% high-strength-steel jump.

**Exterior (15 records):** bonnet, both front wings with REAL wheel-arch
cuts over the Pretorias, R front bumper (enlarged intakes + splitter),
R rear bumper with diffuser over the quad tips, all four 5-door doors +
tailgate, roof spoiler, gloss-black mirror caps, side skirts, and
transparent windscreen/rear screen (new `opacity` render field).

Hide the two Body branches via the tree's eye icons to return to the
mechanical view. Overview preset widened to frame the whole car.
**Model: 152 parts.** Verified in-browser: white shell wraps the
chassis, glass is see-through, mechanicals visible through openings.

**Next (final): Phase 7** — electrics (ECU, gateway, battery, lighting,
harness nodes), cooling (N493 module, coolant pump, radiator stack),
brake hydraulics + ABS, fuel tank/LPFP, HVAC, interior, steering column.

## Coverage audit (2026-08-02, operator-prompted)

Operator asked "isn't there supposed to be a back suspension?" — the
rear multilink WAS built (9 parts) but had no camera preset, so it was
effectively invisible. Added a **Rear axle** preset. The full
taxonomy-vs-built sweep then caught one genuine miss and produced this
ledger:

**Caught & fixed now — engine ancillaries** (dossier §10 assigns them
to Phase 2; they were skipped): oil pan (lubrication weep notes), valve
cover with the failure-prone **PCV diaphragm** (knownIssue), coil-on-plug
ignition ×4, FEAD serpentine belt/pulleys/tensioner (with the
"coolant pump is NOT on this belt" trap), alternator, A/C compressor,
starter, and the three-point mounting (hydraulic engine + gearbox
mounts at the dossier's 60 Nm +90°, dogbone to the subframe). 10
records; engine system now 57 parts, model 129.

**Verified present (not missing):** rear multilink, all 4 brake
corners, both front driveshafts (unequal by design), full driveline.

**Deliberately deferred, now explicitly scheduled:**
- Phase 6 (body): BIW, closures, R exterior, glass. Needs 3dr/5dr.
- Phase 7: brake hydraulics (master cylinder, booster, ABS/ESC unit,
  EPB control unit, lines, wheel-speed sensors), steering column +
  intermediate shaft, engine cooling (N493 rotary module, coolant
  pump, radiator stack incl. relocating the Phase 2 intercooler into
  it), fuel tank + LPFP, all ECUs/harness/battery/lighting, HVAC,
  interior. Oil-pump internals stay unmodelled (inside the pan).

## Phase 5 — complete (2026-08-01)

**Alignment audit (operator-requested) first:** checked every mechanical
joint numerically. Fixed: front-right driveshaft was 21 cm short of its
hub; front-left overshot and drooped 19 cm below its hub; rear shafts
6 cm short. All four now land within ~5 mm of their hubs (and the short
left shaft correctly runs a steeper CV angle — the real torque-steer
geometry). Verified OK: diff flanges ↔ front shafts, PTO ↔ propshaft,
propshaft ↔ Haldex nose, turbo ↔ downpipe.

**Phase 5 — suspension, steering, wheels (23 records):**
- Front: MacPherson struts with true helical coil springs + passive
  sport dampers (no DCC), low-wishbone control arms, steering knuckles
  (hub/axle bolt 200 Nm +180° recorded), subframe, ARB + drop links,
  progressive-ratio EPS rack + tie rods.
- Rear: four-link axle — trailing link + upper/spring/toe lateral links
  per side, coil springs SEPARATE from the passive dampers (as on the
  real axle), subframe, ARB, wheel carriers.
- Wheels: 19" Pretoria five-twin-spoke alloys (8J×19) with 235/35 R19
  tyres at all four corners, ball-seat wheel-bolt rings at the dossier's
  120 Nm. Hide the Wheels branch in the tree to see the brakes.
- Suspension camera preset; ground plane dropped to tyre-contact height.
  The Overview now reads as a complete rolling chassis (119 parts).

**Next:** Phase 6 — body-in-white + closures + R-specific exterior
(needs: 3-door or 5-door?). Then Phase 7 electrics/cooling/interior.

## Phase 4 — complete (2026-08-01)

**What's done:** the 4MOTION driveline as a 12-part assembly (dossier
§4): two-piece propshaft with centre bearing from the DQ250's bevel box
to the rear final drive; the Haldex Gen 5 coupling (plates + annular
piston) ahead of the rear diff; the **charge pump with its real dossier
part number 0CQ598549** carrying the full service story (clogging
screen → pump death → silent FWD, fix = pump + fluid + filter + VCDS
pump-learn); the fine-mesh filter as its own part; Haldex controller;
rear diff gear set (separate GL-5 oil noted); rear driveshafts ×2 and
both unequal-length front driveshafts (right one with intermediate
bearing, reaching the modelled brake corner). Driveline camera preset.
Exhaust link pipe + resonator offset laterally so the propshaft no
longer passes through them (real cars route them side by side).

**Spec correction:** operator DOES have Race mode (the "Sport" was the
DSG lever's S program) — mode list matches the dossier; DCC absence
stands confirmed. CLAUDE.md updated.

**Operator review additions:** all FOUR brake corners now modelled —
front-left mirror, and both rears (310 mm discs, thickness typical/
unverified; EPB motor-on-caliper actuators; R-specific pads with the
not-GTI-Performance-Pack trap as a knownIssue). The original corner was
relabelled front RIGHT (it's on the long-driveshaft side); rear
driveshafts lengthened/angled to reach the new rear hubs. Confirmed to
operator: ONE long + ONE short front driveshaft is correct (dossier §4
unequal-length transverse layout).

**Next:** Phase 5 — chassis: subframes, front struts (passive sport
dampers — no DCC), rear multilink, EPS rack, ARBs, hubs, 19" Pretoria
wheels; gives a rolling chassis.

## Phase 3 — complete (2026-08-01)

**Car spec confirmed by operator:** DSG → **DQ250** modelled; 19"
Pretoria wheels; DCC reportedly absent (modes seen: Eco/Normal/Sport —
dossier expects Eco/Normal/Individual/Race, re-verify in person).
Recorded in CLAUDE.md.

**What's done:** the DQ250 6-speed wet DSG (0D9 AWD) as a 9-part
assembly bolted to the engine's flywheel end — housing/bellhousing,
dual-mass damper, K1/K2 wet clutch pack (cold-launch warning), J743
mechatronic (pressure-accumulator known issue), concentric input
shafts, both output gear sets, integrated final drive/diff, and the
AWD power take-off whose rear-facing flange is Phase 4's attachment
point. New Gearbox camera preset. Verified in-browser assembled +
exploded; build clean.

**Merged earlier this session:** Phases 0–2 all live at
https://kadenholden.github.io/r-explorer/ (PR #1 + PR #3; PR #2's
content landed via #3 after a stacked-PR closure quirk). Brake corner
reoriented onto the real wheel axis (operator-spotted).

**Next:** Phase 4 — Haldex Gen 5 driveline (bevel box → propshaft →
coupling with pump/filter service story → rear diff, driveshafts).

## Phase 2 — complete (2026-08-01)

**What's done**

- **Intake & boost** (13 records): airbox → IHI IS38 turbo (voluted
  compressor/turbine, CHRA, wastegate-actuator and diverter valve as
  separate parts with their ECU-recalibration / 06K145xxx notes) →
  hot-side pipe → front-mount intercooler → cold-side pipe → throttle
  body (7 Nm T30s) → **the manifold unit**: plastic manifold with its
  real identity **06L133201FP** (supersession chain + original AH
  fitment documented), four curved runners, the runner-flap shaft, the
  **V157 flap motor** (no separate part number — documented why), the
  **G336 sensor with its own 06K907386D**, and the 9 Nm T30 flange bolts.
- **Signature feature — the P2015 fault demo**: flap controls appear on
  any manifold-unit part. Healthy mode sweeps the flaps closed↔open
  (animated butterflies on the shaft); the P2015 toggle jams them at 37%,
  glows every manifold-unit part fault-red, and raises the diagnosis
  card: Ross-Tech definition, MVB-142 specified-vs-actual mismatch, and
  the real repair tree (Output Test [03] → MVB 142 → 06K907386D sensor
  vs 06L133201FP manifold → Group 142 adaptation).
- **Dual-injection fuel** (6 records): cam-driven ~200 bar HPFP, DI rail
  + 4 in-chamber injectors + rail pressure sensor, port rail + 4 runner
  injectors, with the dossier's injection-strategy story in the
  descriptions. (Tank/LPFP deferred to Phase 7 fuel storage.)
- **Exhaust** (7 records): cast downpipe with primary cat, link pipe,
  centre resonator, rear silencer with electric flap actuators, the R's
  chrome quad tips, pre-turbine + post-cat lambdas. GPF build-date
  caveat recorded.
- New camera presets: Intake and Exhaust; Overview widened.

**Verified this session:** `npm run build` clean; in-browser: intake
side reads convincingly (black manifold, runners, shaft, V157, rail +
injectors), selection/breadcrumbs correct across all three new
assemblies, flap sweep animates, P2015 demo end-to-end (red glow +
overlay + jammed flaps + disabled command button).

## What's next — Phase 3 (on operator's go)

Transmission per dossier §3 — **needs the car-spec answer first**:
MQ350 6-speed manual (clutch, DMF, gear sets) or DQ250 6-speed wet DSG
(dual clutch pack, mechatronic J743, concentric input shafts)?

Running polish list: valvetrain followers; resting-fit overlaps at 0%
explode (schematic tolerance); search + x-ray mode; nested/per-assembly
explode; bundle code-splitting (~1.3 MB).

## Open questions

1. **Which gearbox does the car have (manual vs DSG)?** Blocks Phase 3's
   choice of assembly. Also: DCC? 18" Cadiz or 19" Pretoria? 3/5-door?
2. PR stack: #1 (Phase 0) → #2 (Phase 1) → #3 (Phase 2). Merge in order;
   GitHub retargets each as its base merges.
