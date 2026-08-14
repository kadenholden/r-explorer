# R8 return — Mk7 Golf R brakes (complete)

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). PDF title: "R8 — BRAKES (COMPLETE): 2014-plate
pre-facelift VW Golf R Mk7 (5G), EA888 Gen 3 CJXC, DQ250/0D9 DSG,
4Motion, ~92k miles". Bracketed labels like [Fitebc] / [ross-tech] are
the PDF's inline citation-link chips (target URLs not visible in the
screenshots).

## TL;DR

- **The rear-disc "22 mm guess" is RESOLVED as correct**: the Mk7 Golf R
  rear disc is **310 mm × 22 mm vented, minimum/wear thickness 20 mm**
  (PN **5Q0615601E**), confirmed by the Bentley book (CII 41 17" PR 1KW
  = 310/22/20) and OE cross-catalogues (JGP Automotive lists 5Q0615601E
  as "Thickness 22 mm … Minimum Thickness 20 mm … Outer Diameter 310 mm,
  Height 48.5 mm"). Front is **340 mm × 30 mm vented, minimum 28 mm**
  (PN 5Q0615301C/G). [Fitebc] [Fitebc]
- **The R-vs-GTI-PP rear pad distinction is real**: the Golf R rear pad
  is **5Q0698451T** (EPB-specific, shared with Audi S3 8V), NOT the GTI
  Performance Pack rear pad — the R's EPB caliper needs a pad with
  larger hooked guide tabs and a separate anti-rattle clip. Front pads
  (**5Q0698151K**) ARE shared across R / GTI-PP / S3 8V (EMD Auto:
  "Brake pad set for MK7 GTI (Performance Package), MK7 Golf R and 8V S3
  … OE part number 5Q0 698 151 K").
- **The rear EPB motors (3Q0998281 LH / 3Q0998281A RH) are separately
  replaceable**, and any rear pad/disc job REQUIRES electronic
  retraction via VCDS/ODIS ("Start lining change mode"). Ross-Tech is
  explicit: after retraction "the caliper pistons do not move back …
  they must be pushed in using a hand tool," and "there have been
  several reports of repair shops damaging the Electronic Parking Brake
  System when trying to do rear brakes."

## Key Findings

- **Rear disc resolution (headline):** PRIMARY source — Bentley "Golf,
  GTI & Golf R Quick Reference Specification Book" (Jan 2014, NHTSA PDF
  MC-10122270-9999.pdf, p.83) lists the **CII 41 17" rear brake
  (PR 1KW)** as: disc diameter 310 mm, thickness 22 mm, **wear limit
  20 mm**, caliper piston 41 mm. Corroborated by OE cross-catalogues:
  JGP Automotive and KillerBrakes both list 5Q0615601E as 310 × 22 mm,
  min 20 mm, height 48.5 mm. **The project's 22 mm guess is confirmed
  and now primary-sourced; minimum thickness is 20 mm.**
- **Front disc:** 340 mm × 30 mm vented, minimum **28 mm** (per AZ Car
  Parts VAG spec: "Brake Disc Diameter 340mm X 30mm; Brake Disc Minimum
  Thickness 28mm; Height 50mm"). PN **5Q0615301C** (supersession-family
  5Q0615301G; Audi cross 8V0615301). Shared with GTI Performance Pack,
  Clubsport, S3 8V. (Note: the Bentley Jan-2014 volume does not carry a
  distinct 340 mm R front table — its nearest large front disc is the
  FNR-G 345 mm × 30 mm / min 27 mm, PR 1ZK.)
- **Pads:** Front **5Q0698151K** (supersedes 5Q0698151G; Audi
  8V0698151C) — shared R / GTI PP / S3 8V (Parts4VWs application: "Fits
  Audi S3 15-20 / VW GTI 15-17 w/Performance Pack Brakes … 19+ VW MK7
  Golf R"). Rear (R, EPB) **5Q0698451T** (supersedes 5Q0698451P;
  equivalents 3Q0698451E/F, 8V0698451A) — shared with S3 8V, NOT GTI PP.
- **Calipers:** Front single-piston floating (TRW), black with R logo,
  **5G0615123D** (LH) / **5G0615124D** (RH) [Audi equiv
  8V0615125B/126B], **57 mm piston** (Bentley FNR-G table). Rear **ATE**
  single-piston (41 mm) floating with integrated EPB (KillerBrakes
  fitment: "Golf Mk7 … Turbo R 280BHP … Rear Brake Caliper: ATE; Disc
  Diameter 310"), family 5Q0615423/424 (also 3Q0615423F, 5QM615423).
  EPB motors 3Q0998281 (LH)/3Q0998281A (RH), 12-Torx, separately
  replaceable.
- **ABS/ESC:** Continental/ATE **MK100** (also MK100IPB) hydraulic ESC
  unit, PN family 5Q0614517-xx; Ross-Tech: "Coding for this Control
  Module is normally done via Software Version Management (SVM). If the
  old Control Module is still accessible read/copy its Coding and Paste
  it into the New coding line of the replacement Module."
- **Fluid:** VW 501 14 = low-viscosity DOT4 (DOT4 LV); meets DIN ISO
  4925 Class 4 / FMVSS 116 DOT4 (premium LV also ISO 4925 Class 6);
  ~1.2 L system; first change 3 years, then every 2.
- **Bleed order:** VW/erWin spec is **FL → FR → RL → RR**
  (nearest-to-furthest), ~2 bar pressure-bleed; VCDS ABS routine only
  needed after ABS/MC replacement.

## How the system works

The Mk7 Golf R uses a conventional vacuum-assisted, tandem
(dual-circuit) hydraulic brake system with a diagonally-split layout
(front-left/rear-right on one circuit, front-right/rear-left on the
other), so a single circuit failure still leaves braking on one front
and the opposite rear. Driver pedal effort acts through a pushrod/clevis
into a vacuum brake booster (servo); vacuum is supplied by the EA888
Gen 3's mechanical tandem vacuum pump on the cylinder head (the pump
itself was R2 head-scope — noted here only as the vacuum source),
backed by intake-manifold vacuum via a check valve so the servo holds
assist with the engine off. The booster amplifies pedal force into the
tandem master cylinder (bore 23.81 mm per Bentley), which pressurises
the two circuits.

Fluid passes through the Continental MK100 ESC hydraulic unit, which
for normal braking is transparent (fluid flows straight through).
During ABS/ESC/traction/XDS events the unit's solenoid valves and
internal return pump modulate individual wheel pressures. All four
corners use single-piston floating (sliding) cast-iron calipers:
hydraulic pressure pushes the piston against the inboard pad, and
reaction slides the caliper body on its guide pins to clamp the
outboard pad. On the rear, each caliper additionally carries an
electric parking-brake (EPB) actuator — a small DC gear-motor that
drives a spindle inside the piston to mechanically clamp the pads for
parking. Because the piston is driven by that spindle, servicing
requires electronic retraction (the motor first winds the spindle back)
— you cannot simply wind or press the piston in as on a cable caliper,
and forcing it damages the spindle. The MK100/ESC also underpins the
4Motion/XDS story from R6/R7: XDS is a software brake-vectoring
function that lightly brakes the inner wheel(s) in cornering to sharpen
turn-in, using the same ESC pump/valves; the same unit provides
EDL/ASR/ESP and the hill-hold that ties into the EPB. [Wikipedia]

## Disc-dimension block

- **FRONT:** 340 mm diameter × 30 mm thickness, vented; **minimum/wear
  thickness 28 mm** (3 mm total wear allowance). Height ~50 mm, centre
  bore 65 mm. PN 5Q0615301C / 5Q0615301G. Source: AZ Car Parts /
  Racingline / EBC VAG specs; Bentley book's nearest large front table
  is FNR-G 345 mm × 30 mm / min 27 mm (the book does not carry a
  distinct 340 mm R front table).
- **REAR (22 mm question RESOLVED):** 310 mm diameter × **22 mm
  thickness**, vented; **minimum/wear thickness 20 mm**. Height
  48.5 mm, centre bore 65 mm. PN 5Q0615601E. Source (PRIMARY): Bentley
  Jan-2014 book p.83, CII 41 17" PR 1KW = 310/22/20; corroborated by
  JGP Automotive ("Thickness 22 mm … Minimum Thickness 20 mm … Height
  48.5 mm … Outer Diameter 310 mm") and KillerBrakes. **Resolution
  statement: the rear disc is 22 mm new / 20 mm minimum — the guess was
  right, now primary-sourced.**

## Pad-resolution subsection (R rear vs GTI PP rear, side by side)

- **Golf R rear pad (EPB): 5Q0698451T** (supersedes 5Q0698451P;
  equivalents 3Q0698451E/F, 8V0698451A). Shared with Audi S3 8V.
  Designed for the EPB caliper — larger guide tabs with hooks, separate
  anti-rattle clip inserted into the carrier (no integrated spring).
  (FCP Euro: "the Golf R uses the electronic rear parking brake, and
  the pads have noticeably larger guide tabs with hooks.")
- **GTI Performance Pack rear pad (manual/cable handbrake): a DIFFERENT
  pad** — same ~friction area and same 310 mm disc, but the GTI PP uses
  a manual/cable parking brake, so the pad shape/backing differs
  (smaller tabs, integrated anti-rattle spring). **Exact
  GTI-PP-specific rear pad OEM PN: NONE FOUND** (confirmed distinct
  from 5Q0698451T; the difference is the EPB-vs-cable caliper
  interface, not the friction surface). FCP Euro states plainly: "they
  do not share the same rear brake pad." [FCP Euro]
- **Front pad sharing verdict:** R and GTI PP share the identical front
  pad **5Q0698151K** (and the 340 mm front discs). Verified via EMD
  Auto ("MK7 GTI Performance Package, MK7 Golf R and 8V S3 …
  5Q0 698 151 K") and Parts4VWs application list. This is the corner
  where sibling confusion does NOT bite; the rear is where it does —
  the classic real-world mis-order is fitting a GTI-PP rear pad to an
  EPB Golf R caliper.

## Calipers / EPB subsection

- **Front calipers:** 5G0615123D (LH) / 5G0615124D (RH), black with R
  logo, single floating **57 mm** piston, cast iron, TRW. Same casting
  family used across the 340 mm MQB family (GTI PP / S3 with
  appropriate finish/badging).
- **Rear calipers:** ATE floating with integrated EPB, 41 mm piston,
  family 5Q0615423 (LH) / 5Q0615424 (RH) — VIN-specific variants
  include 3Q0615423F and 5QM615423.
- **EPB motors separately replaceable:** 3Q0998281 (LH) / 3Q0998281A
  (RH); Audi-equiv 8V0998281 / 8V0998281A. Sold as a kit (motor + 2
  fixing bolts + sealing ring), 12-Torx fixings. Failure modes: motor
  gear wear/seizure, water ingress, DTCs for the parking-brake
  actuator; a seized caliper spindle can also present as an EPB fault.
  [JGP Automotive]

## EPB service / retract procedure (VCDS/ODIS)

Source: Ross-Tech Wiki "VW Golf VII (5G/AU) ABS Brakes."

Connect a battery charger. Run a full Auto-Scan first. Cycle the
parking brake ON then OFF. [ross-tech]

- **OPEN (retract):** [03 - ABS Brakes] → [Basic Settings - 04] →
  select **"Start lining change mode"** → [Go!]. Rear caliper motors
  run and wind the spindles back. Wait 30 s after "Not Running"/noise
  stops, then [Stop]. Fault **721152 - Brake pad replacement mode
  active** is stored (normal). CRITICAL NOTE (verbatim): "The caliper
  pistons do not move back into the caliper, they must be pushed in
  using a hand tool" — use a flat piston-pressing tool, NOT a wind-back
  tool. [ross-tech] [ross-tech]
- Fit new pads/discs. Reassemble all rear brake components.
- **CLOSE:** [03 - ABS Brakes] → [Basic Settings - 04] → select **"End
  lining change mode"** → [Go!]. Motors run to clamp. Wait 30 s after
  "Not Running", [Stop]. [ross-tech]
- Fault **C1011 - Brake pad replacement mode active** and a rapidly
  blinking EPB switch LED/cluster lamp are normal until you cycle the
  parking brake ON then OFF (holding the brake pedal) with everything
  reassembled — this is the function test.
- **If pads are changed WITHOUT the procedure:** forcing the piston
  back breaks the internal spindle/gear ("issues for which no
  documented resolutions exist" per Ross-Tech), typically requiring a
  new caliper. Ross-Tech explicitly warns: "Do not perform any of these
  Basic Settings while the brakes are disassembled," and documents
  shops damaging EPB systems and hiding it. [ross-tech]
- **Emergency-release reality (documented honestly):** on MQB there is
  NO manual cable release for these caliper-integrated EPB motors. If
  the electronics/motor fail with the brake applied, release requires a
  diagnostic tool (or restoring power in a dead-battery scenario).
  There is no under-console pull. (A no-VCDS pad change is possible
  only by "engaging" the ABS/EPB through repeated panic stops — not a
  sanctioned method.)

## Master cylinder / booster / ABS-unit block

- **Master cylinder:** Golf R dealer listing shows PN **1K1614019K**
  (PQ-carryover casting), tandem, bore **23.81 mm** (Bentley). (Note
  the RS3 catalogue shows a 5Q1614019-family MC — verify by VIN which
  casting your car carries.)
- **Booster (vacuum servo) + MC + reservoir assembly:
  5Q1614105-family** (e.g. 5Q1614105BQ; also 5Q1614105DA). Booster is
  ~10" (Bentley). Check valve in the vacuum line to the servo.
  Pushrod/clevis at the pedal box; MC-to-booster and
  booster-to-bulkhead use self-locking nuts (single-use, 25 Nm).
- **ABS/ESC:** Continental **MK100 / MK100IPB** hydraulic unit,
  hydraulic-block PN family **5Q0614517-xx** (e.g. 5Q0614517AQ,
  5Q0614517LBEF, 5Q0614517BJ, 5Q0614517CG); control-module side
  references **3Q0907379-family** (e.g. 3Q0907379AA/DB). VARIANT
  PROBLEM: suffixes differ by equipment (ACC, DCC/adaptive dampers,
  driver-assist, FWD vs 4Motion) and the unit must be
  coded/parameterised to the specific car. Ross-Tech: "Coding for this
  Control Module is normally done via Software Version Management
  (SVM). If the old Control Module is still accessible read/copy its
  Coding and Paste it into the New coding line of the replacement
  Module." Used-unit pitfalls: wrong hardware suffix won't code;
  VIN/immobiliser and long-coding must match (forum coding threads on
  Ross-Tech and digital-kaos's MK100 thread show many mismatched-part
  rejections, e.g. "ur part is not compatible change it with this
  number 5Q0907379DB").

## Lines & hoses

- **Front flexible hose:** 5Q0611701-family (5Q0611701B/C/D; Golf R
  dealer PN also **5WA611701**). **Rear flexible hose:** 5Q0611775L.
  Banjo/ring ends with copper crush washers at the caliper; union
  (flare) ends to rigid lines. [ebay]
- **Rigid lines:** steel, flare unions ~14 Nm. UK corrosion points:
  rear axle and underbody runs, and the union at the
  hose-to-rigid-line brackets — a classic UK MOT advisory area at ~92k
  miles.
- **Hose brackets/clips** retain the flex hose at the strut/subframe;
  hose-to-caliper banjo torque 35 Nm.

## Complete torque chart (PRIMARY source: Bentley Jan-2014 book unless noted)

- **Front caliper carrier (ribbed bolts) to knuckle:** ~200 Nm —
  Bentley FNR-G family staged: Step 1 = 15 Nm, Step 2 = 200 Nm (FN3 =
  190 Nm). Ribbed/stretch bolts — **replace**. (FCP Euro states 200 Nm
  for the R.) [nhtsa]
- **Front caliper guide/slider bolts: 30 Nm** (some vendor guides quote
  35 Nm; Bentley = 30 Nm).
- **Rear caliper carrier to hub (internal multipoint bolt): 90 Nm +
  90°, replace** (single-use, TTY).
- **Rear caliper-to-carrier (guide/self-locking) bolts: 35 Nm,
  replace**; thread-locker.
- **Disc set/retaining screw (T30 Torx): 4 Nm.**
- **Brake hose banjo/ring union at caliper: 35 Nm** (with new copper
  washers).
- **Rigid brake-line flare unions: 14 Nm.**
- **Master-cylinder-to-booster nuts: 25 Nm, replace.**
- **Booster-to-bulkhead / pedal-bracket nuts: 25 Nm, replace.**
- **Bleeder screw (bleed nipple): 10 Nm** (FNR-G front caliper 12 Nm) —
  do NOT overtorque; apply thin coat of assembly paste (G 052 150 A2)
  to threads.
- **ABS hydraulic-unit control-module inner Torx bolts:** 5.5 Nm (MK70)
  / 2 Nm + 0.8 Nm (MK60) — use new bolts. **The brake-line union torque
  AT the ESC unit is NOT stated in the Bentley book** (lines only
  illustrated) → NONE FOUND as an explicit ESC-unit figure; treat as
  the 14 Nm flare-union value with caution.
- **Reservoir screws:** NONE FOUND.
- **Single-use (replace) list:** front carrier ribbed bolts; rear
  carrier 90 + 90° bolts; rear caliper self-locking bolts;
  MC-to-booster nuts; booster-to-bulkhead nuts; ABS module inner Torx
  bolts.

## Fluid block

- **Spec:** VW 501 14 = low-viscosity DOT4 ("DOT4 LV"). VW owner's
  manual: "Brake fluid that is compliant with VW standard 501 14
  fulfils the requirements of DIN ISO 4925 CLASS 4 or US standard
  FMVSS 116 DOT 4." Premium LV fluids (Ravenol/Liqui-Moly SL6/Pentosin)
  also meet ISO 4925 **Class 6**. The LV formulation is specified for
  fast ESC valve response (smaller orifices) and cold-temperature
  viscosity. [VW Vortex]
- **Capacity:** ~1.2 L system. A full flush/bleed typically uses ~1 L+
  (allowing for waste purged at each corner).
- **UK interval:** first change 3 years after delivery, then every 2
  years thereafter (confirmed on VW/service sources for the Mk7).
- **Rationale:** brake fluid is hygroscopic; absorbed moisture lowers
  the boiling point and raises compressibility → soft pedal and fade.
  Regular flushing preserves ESC/EPB hydraulic components.

## Bleeding subsection

- **Official VW/erWin wheel order (RESOLVED — do NOT use classic
  RR-first): 1) Front-left, 2) Front-right, 3) Rear-left, 4)
  Rear-right** (nearest-to-furthest from master cylinder). Confirmed in
  erWin/service-manual excerpts quoted on multiple VAG forums (VW
  Vortex quoting the manual: "1 - Front left … 2 - Front right … 3 -
  Rear left … 4 - Rear right"). [VW Vortex]
- **Pressure bleeder:** pre-pressure ~2 bar (~30 psi). Pedal method
  possible as "subsequent bleeding" (5 firm strokes per caliper, second
  person).
- **VCDS/ODIS ABS/ESC bleed routine:** only required after
  hydraulic-unit or master-cylinder replacement (to cycle the ESC
  pump/valves and purge trapped air) — via [03 - ABS Brakes] Basic
  Settings/output-test bleed sequence. For a routine fluid change with
  the unit never opened, no VCDS step is needed.
- **EPB interaction:** no special EPB step during normal rear bleeding;
  but if the rear caliper was opened, run the EPB open/close procedure
  — and never cycle the EPB with a caliper disassembled.

## Wear-sensor resolution

The Mk7 R has **ONE** electric pad-wear sensor, **front-left inner pad
only**. PN **8V0615437** (one per vehicle — UroTuning: "Only one front
brake pad sensor required per vehicle"). When the pad wears to the
sensor loop, the dash shows a brake-pad warning. **Some Mk7 model
years/markets shipped without the sensor option** (notably some 2015
cars per FCP Euro); if absent, wear is judged visually. Connector is at
the front-left caliper/strut area; the loom routes up the inner wing.

## Failure modes (per part)

- **Guide pins seized/corroded (UK classic)** → uneven pad wear, drag,
  disc taper; clean/re-grease at every service.
- **Rear EPB piston seizure / motor failure** → EPB DTCs, blinking
  switch LED, brake imbalance; often needs a new caliper (motor
  3Q0998281 is worth testing first).
- **Disc corrosion lip at ~92k UK miles** → because minimums (28 mm
  front / 20 mm rear) are close to new, replace discs with pads.
- **Splash-shield rot** (front 5Q0615311F/312F, rear 5Q0615611S/612-)
  → rattles, disc-face rust.
- **Hose ageing/perishing** → spongy pedal, MOT advisory.
- **ABS/ESC unit faults (rare)** → coding pitfalls with used units
  (wrong suffix, SVM required).
- **Reservoir level-sender faults** → false low-fluid warning.
- **Booster check-valve leak** → hard pedal / loss of assist.
- **Brake-fluid neglect** → fade, ESC/EPB component corrosion.

## Parts table

(The PDF supplies this in pipe format with columns: name |
oem_part_number | qty | parent assembly | sub-assembly | material |
torque | fitted-position | known failure modes | source.)

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Front brake disc (340×30 vented, min 28) | 5Q0615301C (also 5Q0615301G) | 2 | Front brakes | Disc | Cast iron (HC) | set screw 4 Nm (T30) | Front axle L/R | corrosion lip; scrap <28 mm | dealer catalogue/OE supplier (AZ Car Parts) + Bentley FNR-G analog |
| Rear brake disc (310×22 vented, min 20) | 5Q0615601E | 2 | Rear brakes | Disc | Cast iron | set screw 4 Nm | Rear axle L/R | scrap <20 mm; corrosion | Bentley p.83 (PRIMARY) + JGP/KillerBrakes OE cross |
| Front brake pad set | 5Q0698151K (supersedes 5Q0698151G; equiv 8V0698151C) | 1 set | Front brakes | Pads | Friction/steel | n/a | Front axle | wear, squeal; min 2 mm | dealer catalogue (parts.vw) + EMD Auto/Parts4VWs |
| Rear brake pad set (EPB) | 5Q0698451T (supersedes 5Q0698451P; equiv 3Q0698451E/F, 8V0698451A) | 1 set | Rear brakes | Pads | Friction/steel | n/a | Rear axle (EPB caliper) | wear, EPB drag; min 2 mm | dealer catalogue (parts.vw) + FCP Euro |
| GTI PP rear pad (contrast, do NOT fit to R) | NONE FOUND (distinct, non-EPB) | — | Rear brakes | Pads | — | n/a | GTI PP only | mis-order risk vs R | FCP Euro (vendor/guide) |
| Front caliper LH (black, R logo) | 5G0615123D (equiv 8V0615125B) | 1 | Front brakes | Caliper (TRW, 57 mm piston) | Cast iron | via carrier/guide | Front L | piston/guide seize | dealer/used-parts catalogue (VDL, One Love) + Bentley |
| Front caliper RH | 5G0615124D (equiv 8V0615126B) | 1 | Front brakes | Caliper (TRW) | Cast iron | via carrier/guide | Front R | piston/guide seize | dealer/used-parts catalogue |
| Front caliper carrier + ribbed bolts | carrier w/caliper; bolt PN NONE FOUND | 2 bolt | Front brakes | Carrier | Steel (ribbed) | 200 Nm (15+200) replace | Front L/R | thread pull if reused | Bentley p.96–97 + FCP Euro |
| Front caliper guide/slider bolt | NONE FOUND | 2/side | Front brakes | Guide | Steel | 30 Nm | Front | seize/corrode | Bentley p.94/107 |
| Rear caliper LH (EPB, ATE) | 5Q0615423 (variants 3Q0615423F, 5QM615423) | 1 | Rear brakes | Caliper (ATE, 41 mm) | Cast iron | see below | Rear L | EPB/piston seize | dealer/vendor (coolairvw, europaparts) + KillerBrakes |
| Rear caliper RH (EPB, ATE) | 5Q0615424 | 1 | Rear brakes | Caliper (ATE, 41 mm) | Cast iron | see below | Rear R | EPB/piston seize | dealer/vendor |
| Rear caliper carrier bolt (to hub) | NONE FOUND | 2/side | Rear brakes | Carrier bolt (TTY) | Steel | 90 Nm + 90° replace | Rear L/R | single-use; snaps if reused | Bentley + golfmk7 forum |
| Rear caliper guide/self-locking bolt | NONE FOUND | 2/side | Rear brakes | Guide | Steel | 35 Nm replace + threadlock | Rear | seize | Bentley p.102 + golfmk6 forum |
| EPB actuator motor LH | 3Q0998281 (equiv 8V0998281) | 1 | Rear brakes | EPB motor | Plastic/metal | 12-Torx fixings | Rear L caliper | gear wear, water ingress, DTC | vendor (justgermanparts) + parts catalogues |
| EPB actuator motor RH | 3Q0998281A (equiv 8V0998281A) | 1 | Rear brakes | EPB motor | Plastic/metal | 12-Torx fixings | Rear R caliper | seizure, DTC | vendor + OE listings |
| Disc set/retaining screw (T30) | NONE FOUND (N-number) | 4 | Front/rear brakes | Fastener | Steel | 4 Nm | each disc to hub | strips easily | Bentley + FCP Euro |
| Front brake hose | 5Q0611701B/C/D (Golf R 5WA611701) | 2 | Hydraulic | Flex hose | Rubber/braid | banjo 35 Nm | Front L/R | perish, bulge | dealer catalogue + vendor |
| Rear brake hose | 5Q0611775L | 2 | Hydraulic | Flex hose | Rubber | banjo 35 Nm | Rear L/R | perish | dealer catalogue |
| Banjo bolt + copper washers | NONE FOUND (bolt); washers incl. | per hose | Hydraulic | Fastener | Steel/copper | 35 Nm | at caliper | leak if washers reused | vendor (Frentech) |
| Rigid brake-line union | n/a | — | Hydraulic | Pipe union | Steel | 14 Nm | throughout | UK corrosion | Bentley |
| Master cylinder | 1K1614019K | 1 | Hydraulic | MC (bore 23.81 mm) | Alloy | to booster 25 Nm replace | bulkhead | seal wear | dealer catalogue (parts.vw) |
| Booster + MC + reservoir assy | 5Q1614105BQ (also 5Q1614105DA) | 1 | Hydraulic | Servo (~10") | Steel | bulkhead 25 Nm replace | bulkhead | check-valve leak | dealer/used catalogue |
| Reservoir + cap + level sender | part of 5Q1614105 assy | 1 | Hydraulic | Reservoir | Plastic | NONE FOUND | on MC | sender fault | dealer catalogue |
| Vacuum check valve | NONE FOUND | 1 | Hydraulic | Vac supply | Plastic | n/a | booster line | leak | Bentley (illustrated) |
| ABS/ESC hydraulic unit (MK100) | 5Q0614517-xx (module 3Q0907379-xx) | 1 | ESC | Hydraulic unit | Alloy | module Torx 5.5 Nm new | engine bay | coding/variant faults | dealer/eBay + Ross-Tech/digital-kaos |
| Front pad wear sensor | 8V0615437 | 1 | Electrical | Sensor | Plastic/wire | n/a | Front-left inner pad | loom chafe, false warn | dealer catalogue + UroTuning/FCP Euro |
| Front splash shield LH/RH | 5Q0615311F / 5Q0615312F | 2 | Front brakes | Backing plate | Steel | ~10–12 Nm | Front L/R | rot | dealer/vendor (ShopDAP) |
| Rear splash shield LH/RH | 5Q0615611S / 5Q0615612- | 2 | Rear brakes | Backing plate | Steel | ~10–12 Nm | Rear L/R | rot | dealer catalogue (parts.vw) |
| Brake fluid | VW 501 14 (DOT4 LV) | ~1.2 L | Hydraulic | Fluid | Glycol | n/a | whole system | moisture uptake | VW owner manual + supplier |
| Bleeder screw + cap | NONE FOUND | 4 | Calipers | Bleed nipple | Steel | 10 Nm (12 FNR-G front) | each caliper | seize/round off | Bentley |

## Exploded-diagram / dimensioned-drawing URLs

- **Bentley brake overviews & torque tables (PRIMARY, exploded views
  pp.74–115):** https://static.nhtsa.gov/odi/tsbs/2016/MC-10122270-9999.pdf
  (chassis/brake volume). Companion engine/trans volume:
  https://static.nhtsa.gov/odi/tsbs/2014/MC-10073690-2280.pdf (contains
  NO brake section).
- **Ross-Tech Wiki EPB/ABS basic settings (open/close procedure
  verbatim):**
  https://wiki.ross-tech.com/wiki/index.php/VW_Golf_VII_(5G/AU)_ABS_Brakes
- **Dealer catalogue brake trees (exploded diagrams):** parts.vw.com
  Golf R brake pages (e.g. Disc-Brake-Pad-Set-Rear 5Q0698451T,
  Brake-Dust-Shield 5Q0615611S) and vw.oempartsonline.com Golf R
  brake-components pages.
- **FCP Euro Mk7 brake guide (photos of R-vs-GTI-PP pad differences):**
  https://www.fcpeuro.com/blog/the-definitive-guide-to-mk7-volkswagen-gti-brakes

## Recommendations

- **For the exploded model:** render the rear as EPB calipers
  (5Q0615423/424) with visible actuator motors (3Q0998281/A) on the
  caliper backs — this is the single most distinctive brake feature vs
  a GTI, and the correct 41 mm ATE rear vs 57 mm TRW front piston
  sizing is worth showing.
- **Ordering:** rear pads = 5Q0698451T, never a GTI-PP rear pad; front
  pads 5Q0698151K are safe to share across R/GTI-PP/S3. Discs: front
  5Q0615301C, rear 5Q0615601E.
- **Any real service:** retract EPB via VCDS ("Start lining change
  mode") before touching rear pads; push pistons with a flat tool (not
  a wind-back); replace all single-use bolts (front carrier ribbed
  15+200 Nm, rear carrier 90+90°, rear caliper 35 Nm, MC/booster nuts
  25 Nm); bleed FL→FR→RL→RR at ~2 bar with VW 501 14.
- **Used ABS unit:** match the 5Q0614517 suffix to equipment
  (4Motion/DCC/ACC) and copy coding via SVM before removing the old
  module.
- **Thresholds that change the plan:** front disc <28 mm or rear
  <20 mm → replace discs; fluid >2 years or high moisture → flush; any
  EPB DTC → test motor 3Q0998281 before condemning the caliper.

## Caveats / source disagreements / open flags

- **Bentley scope limit:** the Jan-2014 chassis volume does NOT carry a
  distinct 340 mm R front-disc table (nearest is FNR-G 345 mm × 30 mm /
  min 27 mm) and shows a CABLE parking brake throughout, not the EPB.
  Therefore the **front 340/28 mm figures and all EPB specifics are
  sourced from dealer/OE-supplier/Ross-Tech, not this Bentley volume.**
  The 310/22/20 rear IS in the book (CII 41 17", PR 1KW).
- **Front carrier torque:** FCP Euro/forums quote a flat 200 Nm;
  Bentley FNR-G table is staged 15 Nm then 200 Nm — treat as ~200 Nm
  staged, replace bolts.
- **Front guide-bolt torque:** Bentley 30 Nm vs some vendor guides
  35 Nm.
- **ABS-unit line-union torque:** not stated in Bentley → NONE FOUND as
  an explicit ESC-unit figure (only the 14 Nm generic flare-union and
  the 5.5 Nm module-to-block Torx are given).
- **Exact OEM PNs still NONE FOUND:** disc set-screw, banjo bolt,
  front/rear guide bolts, front carrier ribbed bolts, rear carrier TTY
  bolts, bleed nipple, splash-shield screws, reservoir screws.
- **GTI-PP-specific rear pad PN:** NONE FOUND (only the R/S3 EPB pad
  5Q0698451T confirmed) — but confirmed to be a different part.
- **Master cylinder:** the R dealer page shows PQ-carryover 1K1614019K
  while the booster assembly is 5Q1-family and the RS3 sibling uses a
  5Q1614019 MC — verify the exact MC casting by VIN.
- **Do not trust low-grade aggregator dimension/torque charts;** every
  critical figure above is primary (Bentley), OE-supplier (JGP,
  KillerBrakes, AZ Car Parts), dealer catalogue (parts.vw), or
  Ross-Tech.
- **Carried-open flags from R1–R7 (continuity only, not resolved
  here):** cam-carrier torque; VVT phaser range; Gen 3 DV revision;
  intake-manifold revision by VIN; DI rail PN; G247 suffix; exhaust-flap
  V-designation; fuel tank 55 vs 60 L; DQ250 mechatronic PN; 0CQ vs 0CN
  bevel box; DQ250 ratios forum-only; RDU/bevel numeric ratios NONE
  FOUND; propshaft-flange torques NONE FOUND; rear-diff plug torque
  ~30 Nm unverified; inner CV flange bolt torque NONE FOUND; Haldex
  fluid supersession TPI not obtained; front caster + rear-toe
  tolerance NONE FOUND; ball-joint/strut-clamp/top-mount/tie-rod
  torques NONE FOUND; rear ARB diameter vendor-only; wheel-bolt
  resolved to 120 Nm (2014 owner's manual).
