# PROGRESS

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
