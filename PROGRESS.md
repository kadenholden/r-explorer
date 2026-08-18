# PROGRESS

## Engine dressing pack — the bit that makes it look real (2026-08-15)

Operator: "the top of the engine doesn't remind me of what mine looks
like… probably all the minor things missing like covers, cables." Exactly
right — every mechanical part was modelled before any of the stuff you
actually SEE. New `engine-dressing` assembly (7 parts, own branch so it
can be hidden to get back to bare mechanicals):

- **Engine top cover** — the single biggest visual item in the bay and it
  simply did not exist. Pulls off four ball mounts; the PCV guided job now
  animates it lifting away as step 2.
- **Wiring loom & conduit** — the corrugated runs across the cam cover that
  make up most of the visual "clutter", with the chafe-point warning.
- **Coil connectors ×4**, **rigid high-pressure fuel line**, **turbo heat
  shield** (with its rattle/chafe failure), **lifting eyes** (the tan hooks
  — useful landmarks when describing positions), and the **breather hose**
  whose splits mimic a failed PCV.

Model at 275 parts. Next dressing candidates, in visual-impact order: bay
periphery (slam-panel trim, battery cover, fuse-box lid, cowl and wiper
arms), then interior trim, then underbody trays.

## Operator's annotated engine diagram checked against the model (2026-08-15)

The operator produced an annotated overhead photo of their own bay with
13 components numbered. Cross-checked every one against the model: 12
were already present (including the oil filler cap and the turbo inlet
hose added earlier today). Added the one gap — **MAF sensor G70** in the
Racingline intake tract, with the over-oiled-filter contamination issue
and the "reads low when there's a leak downstream" trap. Also split the
**brake fluid reservoir** out as its own clickable part, since it is a
distinct thing owners look for and a service item in its own right
(level dropping with no leak usually just means worn pads).

OPEN QUESTION recorded rather than guessed: the annotated photo's own
labels disagree about which way round it is — the air filter box and the
brake fluid reservoir sit on the same side of that image, but on the real
car they are on opposite sides. So the diagram cannot settle which side
the oil filter housing is on, and nothing was moved on its basis. Asked
the operator the one decisive question: standing at the front of the car,
is the oil filter cap on the same side as the air box, or the opposite
side? Model currently has filter housing + dipstick + filler cap on the
driver's side (offside).

## Oil caps found, plus side labels so the model can be read (2026-08-15)

Operator couldn't find the oil cap or filter in the model and was
struggling to translate between the 3D view and the real bay.

- **The oil filler cap did not exist as a part.** Added from the photos:
  black cap on the OFFSIDE end of the cam cover (the one with the yellow
  oil-can symbol), carrying the free PCV diagnostic — lift it at idle and
  strong suction means a torn diaphragm.
- **The oil filter housing was too low.** IMG_7691 puts it high on the
  offside, just inboard of the engine-cover edge and directly above the
  alternator, reached from above — moved to match. Its cap also has
  **25 Nm moulded into it** in the photo, so that torque is now recorded
  as photo-verified rather than unknown.
- **Orientation labels**: FRONT / REAR / DRIVER'S SIDE (offside) /
  PASSENGER SIDE (nearside) now float around the car, inside the render
  mirror so they name the true physical sides. Toggle with the ⊕ Sides
  chip. This is the fix for "it's hard to convert" — every view now says
  which way round it is.

## Connection pass: pipes now actually join up (2026-08-15)

Final-touches QA before the next version. Wrote a script that extracts
every tube path baked into the geometry recipes, transforms the ends into
world space and measures them against the parts they are supposed to meet
— that turned up four real disconnects:

- **Charge pipes stopped 10 cm short of the intercooler.** Both runs now
  land within 7 mm of its end-tank stubs.
- **No intake pipe existed at all** between the airbox and the turbo. Added
  it (the Racingline hose on this car), routed down the nearside.
- **The turbo faced the wrong way for its own plumbing**: compressor inlet
  pointed offside while the airbox is nearside. Recipe mirrored so the
  compressor faces the intake and the turbine keeps its flange to the head;
  downpipe and pre-cat lambda moved to the turbine outlet to match.
- **The rear silencer was still sitting under the middle of the car** —
  legacy from before the chassis was re-based to real dimensions — leaving
  a 1.3 m gap to the tips. The whole rear section now runs over the rear
  axle to the valance, with a proper tail pipe; flap actuators and tips
  moved onto it. Link pipe and resonator also had 9–14 cm sideways steps
  against the cat; both pulled back to the centreline.

Verified numerically (endpoints within tolerance of their targets) and
visually from the engine, top and rear-axle views. Model at 265 parts.

## Camera panning made obvious (2026-08-15)

Operator: "it pivots only — I want to move the camera to the right."
Right-drag panning existed but nobody finds it, so panning is now a
first-class mode: an **⟳ Orbit / ✥ Pan** chip by the explode bar swaps
what left-drag does (and swaps one-finger touch to pan on mobile), and
the **arrow keys always pan** regardless of mode (keyPanSpeed 14).
Right-drag / two-finger drag still pan as before, pan speed nudged up.
Hint text rewritten to lead with pan mode. Verified: arrow keys visibly
slide the view, and the chip lights up when pan mode is active.

## Screen-wash system researched and rebuilt (2026-08-15)

The operator is fixing a washer leak first, so this got proper research
(notes + sources in docs/reference/washer-system-notes.md) rather than
assumption. Two corrections and a lot of missing hardware:

- The operator was right that you pour straight into a tank: the Mk7
  reservoir is TWO parts — an UPPER tank in the offside gutter with the
  blue cap on top, feeding the big LOWER tank behind the arch liner.
  Redrew the bay piece as that upper tank (was a funnel + hose).
- The system was missing everything except one pump. Added: headlight
  washer pump V11 (this car has xenons, so it has headlamp washers —
  MOT-relevant), washer level sender G33, and the telescopic headlamp
  jets in the bumper. The existing pump is correctly V59 and, usefully,
  feeds BOTH windscreen and rear screen from two colour-coded outlets.
- Guided job rewritten around the real procedure: wheel off + T25 liner
  fixings (VW's bumper-and-headlight route is only for swapping the whole
  reservoir), leak triage that tells you what's leaking from WHEN it
  leaks, the grommet-into-the-tank trap, and a proof step that exercises
  front, rear and headlamp washers before closing up.

Capacity ~3.7 L. Side confirmed offside from the operator's photos (one
VW manual page says otherwise; the photos win, and that's recorded).

## Expansion tank redrawn as an actual tank (2026-08-15)

Operator: "why does the expansion tank look like a completely different
part now?" — fair. My photo-match pass had replaced the old squashed
sphere with a plain rectangular slab, which read as a grey box rather
than a coolant bottle. Redrawn from IMG_7689 as a blow-moulded
translucent bottle: oval-in-plan body with domed top and rounded base,
the big filler neck offset toward the engine, and the two hose stubs low
down. The record now carries `opacity: 0.72` and a milky colour so it
reads as translucent plastic like the real one.

Split the black screw cap out as its own part (one part = one colour, and
the cap is genuinely serviceable): it carries the pressure-cap story —
holds ~1.4–1.6 bar to raise the boiling point, NEVER open hot, and a
perished seal causes pressure loss, weeping and phantom overheating.

## THE MODEL WAS MIRRORED — fixed globally (2026-08-15)

The operator: "you're putting things on the (uk) passenger side, but the
coolant and wash fluid are on the driver's side and the battery on the
passenger." Tested it properly this time — put the model camera exactly
where their photo was taken (front, bonnet up) and compared: the blue
washer cap sat on the RIGHT of frame in the model and the LEFT in the
photo. Mirrored.

Root cause, and it was systemic: part data is authored as "+x = the car's
RIGHT" (CLAUDE.md), but with +z as the nose in a Y-up right-handed scene
that axis renders on the car's LEFT. Every internal relationship was
already correct (gearbox under the battery, coolant opposite it, steering
column with the coolant) — the whole car was simply built as its own
mirror image, i.e. displayed as LHD.

Fix is one transformation rather than 20 files of sign-flips: `Viewport`
wraps the scene in `scale={[-1,1,1]}`, `CameraRig` flips x for presets and
focus points, `PartMesh.focusHere` converts the rendered position back to
car space, and materials (procedural + GLB) render DoubleSide because the
mirror flips triangle winding. Net effect: every "right/left" label in the
data — brake corners, driver's-side rack, RHD interior — becomes truthful
at once, and the bonnet-up view matches the operator's photos.

Verified by isolating five markers in the front view: coolant tank + blue
washer filler LEFT, battery + intake RIGHT, steering wheel on the coolant
side (RHD). Body shell re-checked for inside-out faces: clean. PCV also
nudged slightly to the passenger half per IMG_7692/7693. The frame rule is
now written into CLAUDE.md so it cannot recur.

## Photo round 2: tank/washer were out by the arch — fixed properly (2026-08-15)

The operator called it again: "the expansion tank seems near the wheel
and I can't see the screen wash at all." Cropping IMG_7687/7689 settled
it — the offside gutter runs brake reservoir (bulkhead) → coolant tank
(mid-bay) → blue washer filler (forward), all tucked BETWEEN the engine
and the inner wing. I'd had the tank at x=0.52 with the strut tower at
x=0.69, i.e. jammed against the arch, and the washer neck was a thin
tube swallowed by the wing.

Fixed: tank → x=0.44, y=0.10, z=0.22; washer filler → x=0.42, z=0.46
(ahead of the tank, as photographed); bottle + pump moved with them
behind the RF arch liner. Both recipes redrawn to match the photo — the
tank is now a proper moulded tank with its big round screw cap, and the
filler is the chunky funnel with the prominent blue cap instead of a
hairline tube. Verified from a temporary QA camera at the same angle as
the operator's photo (scaffolding removed before commit).

## GROUND TRUTH ARRIVES: operator's bay photos (2026-08-15)

Eight photos of the real car with the bonnet up — kept permanently in
`docs/reference/bay-2026-08-15/` with an index README. They settled
every open placement question at once and beat two of my "fixes":

- Engine INTAKE-FORWARD, turbo behind the coils at the bulkhead —
  confirmed (the day-old revert was right).
- Coolant tank: OFFSIDE front corner (I had it wrong TWICE — the
  operator's doubt was correct).
- Screen-wash filler: OFFSIDE too, inboard of the coolant tank (also
  wrong twice — moved back; job/service texts now say offside + full
  LEFT lock; pump/bottle/animation mirrored back).
- Battery: nearside mid-bay in a felt jacket, fuse box directly behind
  it — positions adjusted.
- The car runs a RACINGLINE aftermarket intake, not the stock airbox —
  record renamed and described honestly (stock PN removed).
- PCV module: the round diaphragm dome mid-cam-cover with the coils in a
  row BEHIND it, HPFP right, oil-filler left — repositioned + job text
  rewritten to what the photo shows.
- Brake reservoir: offside rear behind the coolant tank — service text
  fixed.

Lesson (recorded in memory): the operator's eyes and phone beat model
priors AND my web-derived corrections. Photos first, always.

## CORRECTION: the engine flip was wrong — reverted (2026-08-15)

The operator kept pushing ("downpipe too low and at the front", "turbo
needs a 180", "isn't the turbo behind the engine?") and they were right
every time: the Mk7 EA888 is INTAKE-FORWARD. The intake manifold faces
the radiator (that's the black plastic you see bonnet-up, and why the
walnut blast is done from the front), and the TURBO hangs at the REAR
against the bulkhead — FCP Euro's IS38 guide says it plainly: "reach
behind the cylinder head" for the turbo nuts. The 2026-08-14
"exhaust-forward" flip was built on my false memory and has been fully
reverted: all engine-side z-swaps undone, turbo rotation and
wastegate/DV positions restored, original downpipe + charge-pipe
geometry restored from git, lambdas and N493/coolant-pump back, intake
camera restored. KEPT because they were independently correct: washer
system nearside, expansion tank right (still operator-confirm),
battery/fusebox/ECU rear-left, airbox front-left, upright oil filter.
Process lesson recorded in memory: when the operator doubts a position,
verify with sources before defending the model — owner eyes beat model
priors, now four times running.

## Downpipe re-route, manifold verify, interior build-out (2026-08-14)

Operator flagged the downpipe "too low and at the front" — correct
catch: the orientation flip had yaw-mirrored the OLD rear-turbo path,
leaving it jutting forward. Redrawn properly for the exhaust-forward
car: off the front turbo, straight down behind the radiator pack, cat
in the down-swept run under the engine's front, then rearward under the
sump to the link pipe; both charge pipes redrawn the same honest way
(hot = short front hop turbo→IC; cold = up the nearside and over the
gearbox to the rear throttle); lambdas repositioned on the new path.
Intake-manifold move double-checked and verified visually: manifold +
flaps + N316 + G336 + throttle + both fuel rails all at the bulkhead
side, HPFP on the (now front) exhaust cam — consistent with SSP
exhaust-forward layout and the operator's own walnut-blast experience.

NEXT BIG BUILD started — interior: 9 new records (instrument cluster
w/ immobiliser-coding note, MIB head unit w/ component protection,
driver/passenger/curtain airbags + front belts & pretensioners with the
never-DIY SRS warning and MOT tug-test, rear bench w/ ISOFIX, front +
rear door cards w/ Kessy-access route). New reusable `simpleBox`
recipe. Interior 5 → 14 records; model at 260 parts.

## Operator QA round 2: THE BAY WAS BACKWARDS (2026-08-14)

The operator's washer-side and expansion-tank catches unravelled a
systemic error: the engine was modelled INTAKE-FORWARD, but the real
Mk7 EA888 sits EXHAUST-FORWARD — turbo and downpipe face the radiator,
the intake manifold sits against the bulkhead (exactly why the walnut
blast and P2015 flap work are hard on the real car). Fixed with a
selective side-swap across engine files: cams/valves/seals/AVS/N205 and
cam sensors swapped sides; manifold + flaps + N316 + G336 + GX9 +
throttle to the rear; turbo + wastegate + DV + service lines to the
front; HPFP follows the exhaust cam; DI/MPI rails + N80 to the rear;
PCV and starter rearward; charge pipes and downpipe yaw-mirrored;
lambdas repositioned. Kept at the front deliberately (correct in
reality): dipstick, oil filter housing, core plugs. Bay accessories to
their real corners: expansion tank RIGHT by the strut tower, battery +
fusebox + ECU rear-left against the bulkhead, airbox front-left, washer
system mirrored to the NEARSIDE (filler front-left, bottle behind LF
arch liner) with job/service texts updated (full RIGHT lock now).
Intake camera re-aimed over the top. Also enriched from R10's bulb
chart: headlight record (5G1998753D, D3S, AFS module + failures) and
tail-light record (full bulb map + connector-corrosion issue).

## Liftable bonnet + guided jobs (2026-08-14, operator-requested)

The app now works like the car: an **Open bonnet** chip hinges the real
shell hood about its true rear-edge line (pivot computed from the GLB's
bounding box — world (0, 0.60, -0.21)), revealing the bay exactly as the
operator sees it. New **Guided jobs** tab (Service panel): step-by-step
procedures where every step drives the 3D scene — isolation, camera
fly-to, the bonnet, and per-part lift animations. Two jobs shipped:
**PCV module replacement** (7 steps, the module physically lifts off the
cam bridge; torque honesty preserved — screw size/figure flagged
unverified) and **screen-wash leak trace** (5 steps — built after the
operator asked; required modelling the washer system first: filler
neck, bottle and pump/grommet now exist in engine-cooling, with the
behind-the-arch-liner access story and the grommet-is-the-leak wisdom).
Screen wash added to the Service tab. Debug lesson recorded: draco GLB
decode takes several seconds after a dev-server restart — a "missing"
shell is usually just still loading.

## Orientation fix, free-roam camera, Pre-MOT tab (2026-08-14, operator QA)

The operator caught the oil filter hanging DOWNWARD like an old spin-on
— on the real Gen 3 the cartridge cap faces UP and is changed from above
with a 32 mm socket. Recipe fixed (hex cap up); other service-part
orientations audited clean (DSG filter up, plugs down, spark plugs
vertical). Camera freed up: zoom-to-cursor (scroll dives at what you
point at), screen-space panning, wider zoom range — and part fly-tos now
approach along the part's EXPLODE DIRECTION, so a drain plug is viewed
from below and glass from outside instead of wherever the camera
happened to be. New PRE-MOT CHECK tab beside Servicing: 12 walk-round
cards with pass/fail rules and this car's known weak points (P2015
relights the EML = fail; inner-edge tyre wear; the R7 advisory bush
list; the full leak-suspect map), each with Show-me. Isolation now
overrides hidden state so MOT cards can show default-hidden panels like
the windscreen.

## Service tab (2026-08-14, operator-requested)

New SERVICE button in the top bar opens the owner's service reference:
15 cards (engine oil, spark plugs, air/pollen filters, DSG fluid+filter,
HALDEX OIL + STRAINER, REAR DIFF OIL, front bevel-box oil, coolant,
brake fluid, pads/discs w/ EPB warning, wheels, battery, wipers, PCV
check) with fluids, capacities, plug part numbers, torques and intervals
from the research — conflicts flagged, never smoothed. Each card's
"Show me" isolates the involved parts and flies the camera to them —
built specifically because the operator couldn't find the Haldex and
rear-diff fill/drain locations on the real car. Data in
src/data/service.ts; UI in ServicePanel.tsx.

## QA pass + camera & isolation overhaul (2026-08-14, operator-requested)

**Audit (programmatic + visual, all 23 data files):** three real errors
found and fixed — the ACC radar was floating 1 m in front of the car
(z 2.05 → 0.86, behind the bumper), the Haldex strainer poked below
ground, and the schematic body panels sat ~10 cm too wide (pulled to the
real 0.895 m half-width; mirrors kept at the true ±1.01 m mirror span).
Also verified clean: callout numbering (no duplicates anywhere), the
sump stack order, lambda placements, DMF-to-seal-flange spacing, and
the head's new valvetrain stack (seals → springs → followers → cams).

**Camera:** interior presets now auto-hide the body shell (and re-derive
that rule on reload), so no view ever opens inside a white panel. The
chain-end preset was re-aimed from above (the cam chain is physically
between engine and gearbox — a side view can never see it; the new view
shows the serviceable chain-end items: N205, cam sensors, upper timing
cover). The gearbox preset now approaches from front-low, under the
battery that genuinely sits on top of the DSG. Plus: **Focus camera** on
every part plate and **double-click any part** to fly the orbit target
to it.

**Isolation UX:** isolation is now a STACKING multi-set — Isolate
part / Isolate assembly buttons on every part plate, tree isolate
toggles add rather than replace, and an "Isolating N — show all" chip
next to the explode bar clears everything in one click.
## R2–R11 batch ingested — the whole car is documented (2026-08-14)

All remaining research returns landed as image PDFs, were transcribed by
parallel agents into `docs/research/`, and ingested across five PRs
(#9–#13), one system chunk each. Coverage moved from **224 parts / ~30
OEM numbers** to **248 records / 482 placed instances / 82 OEM numbers /
58 torque specs** — and more importantly, almost every carried question
is now answered:

- **R2**: head-bolt torque RESOLVED (six stages, 40→80→slacken→50→90→90,
  renew); "valve cover" corrected to cam bridge + separate PCV module;
  followers/HVAs/springs/seals/plugs/N205/sensors/timing-cover added.
- **R3+R4**: dual injection CONFIRMED for the EU car (overturns R2's
  DI-only); N316/V465/N249 designations fixed; both P2015 mechanisms
  recorded; electric exhaust flaps 4H0133246J; both lambdas numbered;
  G336 dossier number flagged as conflicted.
- **R5+R6**: DQ250 ratios/capacities/380 Nm clutch/mechatronic map +
  accumulator failure; Haldex Gen 5 architecture corrected (strainer +
  CEH pump, no accumulator/filter/valve), flex-disc propshaft joint.
- **R7+R8**: rear disc 22 mm guess CONFIRMED primary-sourced; EPB motors
  + lining-change-mode; R-specific rear pad 5Q0698451T; subframe TTY +
  alignment pins; ride-height rule; front guide-bolt 30-vs-35 conflict.
- **R9–R11**: N493 = the pump module (LEFT-HAND-thread pulley bolt!);
  oil cooler integral to filter housing (mimics rear-main leak); ECU
  RESOLVED as SIMOS 18.1; ACC radar added w/ catch-all warning; paint
  Pure White LC9A/0Q0Q pending sticker check.

Cross-return conflicts are recorded on the parts themselves and in
UNVERIFIED.md rather than silently resolved.

**R13 + R14 landed later the same day**, completing the batch. R13
(12-fault library) merged in PR #14 together with the first new fault
demo built from it — the PCV diaphragm (the operator's live fault):
store flag, fluttering module, info-plate toggle and a diagnosis
overlay. Eleven more faults are transcribed and ready to become demos
the same way (water-pump leak stages, Haldex strainer clog, DSG
accumulator, three IS38 modes, EPB service mode…).

**Hero-mesh plan (from R14)** — in licence-safety order, since the repo
and site are public:

1. **Backbone: photogrammetry of the operator's OWN car** (Polycam /
   RealityScan on a phone) — engine bay, wheels/calipers, interior.
   Owner-generated = zero licence risk and exact-this-car likeness; R14
   calls it the recommended backbone. NEEDS THE OPERATOR (10–15 min of
   slow phone panning per area, good even light).
2. **Free cross-section references** to sharpen the procedural recipes:
   SSP 606/522/515/308 + Google Patents US8708123B2 (Haldex pump),
   US9103243B2 (Valvelift), US9726074B2 (IHI turbo) — public documents.
3. **TraceParts DIN/ISO STEP fasteners** as dimensional reference for
   the R12 library (reference only — no redistribution).
4. **Sketchfab MK7 Golf R intake scan** (CC-BY-SA — viral licence, keep
   OUT of the shipped bundle; reference/tracing only).
5. **Never ship**: GrabCAD (private/non-commercial), PARTcommunity
   (contract bans redistribution AND AI-training), store meshes with
   no-redistribution clauses; TurboSquid VW-branded assets carry
   editorial caveats. Reference-only, originals redrawn.
**Polish backlog (new)**: chain-end and driveline camera presets sit
inside the body-shell panels — add shell auto-hide for interior presets
or move the cameras.

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
