# R7 return — Suspension, Steering & Wheels: 2014 VW Golf R Mk7 (5G, pre-facelift, UK/EU)

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: 2014 Mk7 Golf R (5G, pre-facelift, UK/EU) —
suspension, steering & wheels: struts, arms, subframes, ARBs, EPS, wheels/
TPMS. Operator note (not from the PDF): this car has NO DCC adaptive
dampers — the DCC rows below are transcribed as returned for completeness.
Bracketed names like [ManualsLib] are the return's inline citation chips,
preserved where they appeared.

## TL;DR

- The car uses an MQB **MacPherson-strut front / four-link rear** chassis
  lowered by **exactly 20 mm** on "R sport suspension" (5 mm lower than a
  GTI, per VW), with two damper families: standard sport struts (front
  5Q0413031EC, w/o DCC) or **second-generation DCC adaptive dampers**
  (front 5Q0413031ED); DCC presence is set by PR code and the J250
  controller lives behind the left luggage-compartment trim.
- Steering is **electromechanical rack-mounted APA (parallel-axis) EPS
  with PROGRESSIVE (variable-ratio) rack as standard** (2.1 turns / 380°
  lock-to-lock vs 2.75 turns / 500° on lesser Golfs, confirmed by VW);
  rack family 5Q1423051/053, control unit J500 integrated, requiring
  coding + G85 basic setting after any alignment or rack replacement.
- Wheels: pre-facelift UK standard was the 18″ **Cadiz** (225/40 R18); the
  19″ **Pretoria** (5G0601025AJ/CK, 8J×19 ET50, 5×112, 57.1 CB, ~9.3 kg)
  with 235/35 R19 was the factory option; wheel bolt torque is **120 Nm**
  (owner's manual) and the Mk7 uses **indirect (ABS-based) TPMS** — there
  are NO in-wheel sensor part numbers to model.

## Key Findings

- **DCC vs standard**: Both exist on the Mk7 R. Dealer catalogues split
  parts explicitly into "w/DCC Suspension" and "w/o DCC Suspension."
  Standard sport front strut = 5Q0413031EC; DCC front strut =
  5Q0413031ED (also FL/FM supersessions). DCC is optional
  (second-generation unit); progressive steering is standard.
- **Alignment (Bentley 2014 book)**: Front camber −44′ ± 30′ (DCC/R
  column), max side difference 30′; front total toe 10′ ± 10′; rear
  camber −1°45′ ± 30′; rear total toe +10′. Front camber essentially
  non-adjustable; rear camber/toe adjustable via eccentric bolts. **G85
  steering angle sensor basic setting mandatory after alignment.**
- **Key torques**: subframe-to-body & console-to-body 70 Nm + 180° (TTY
  renew); rear tie-rod eccentric nut 95 Nm (renew, re-align after); rear
  lower transverse link 90 Nm + 90° (renew); track-rod end 20 Nm + 90°;
  steering rack-to-subframe 50 Nm + 90° (renew); strut piston-rod nut
  60 Nm; front hub-to-knuckle 70 Nm + 90°; steering UJ pinch bolt 30 Nm
  (renew); front drop-link nut 65 Nm (renew); rear stabilizer link nut
  45 Nm; wheel bolts 120 Nm. [ManualsLib] [ManualsLib]

## Details

### How the system works

The Mk7 R sits on VW's MQB running gear (SSP 515, "The Golf 2013 –
Running Gear and Four-wheel Drive"). The **front axle** is a MacPherson
strut with a single L-shaped lower control arm per side (stamped/sheet
steel on the R, part 5Q0407151J/R left, mirror right), a bolt-in ball
joint into the "bionic-design" swivel bearing (steering knuckle), and a
coil-over strut. The **rear axle** is a four-link (multi-link)
arrangement on the 4Motion: a large trapezoidal lower "spring link" that
carries the coil spring, an upper transverse link, a separate tie/toe
link with an eccentric adjuster for toe, and a trailing arm (control arm)
bolted to a body bracket. This layout lets camber and toe be tuned
independently and reduces unsprung weight. (Note on VW's weight claim:
VW's "up to 11 kg" saving figure applies to the *modular lightweight
torsion-beam* rear axle versus the multi-link performance suspension — it
is **not** a four-link-vs-four-link saving; the four-link performance
axle used on the R is the heavier of VW's two Mk7 rear-axle designs and
is fitted specifically for its independent multi-link geometry and
4Motion packaging.)

The R's sport suspension lowers the car **by exactly 20 mm** versus the
base Golf (VW Newsroom, "Sport suspension of the Golf R," 21 Jan 2014:
"its ride height was lowered by 20 mm, which makes the Golf R 5 mm lower
than the GTI"). DCC (Dynamic Chassis Control), when fitted, replaces the
passive dampers with **continuously variable dampers** using proportional
solenoid valves that regulate oil flow within milliseconds. Per VW
Newsroom, this is the **second generation of DCC**, which "takes input
signals from wheel displacement sensors and accelerometers as well as
vehicle information from the Chassis-CAN bus," with "damping forces …
selectively applied to the four wheels individually." The J250 control
unit chooses Comfort/Normal/Sport characteristics per corner.

**Progressive steering**: unlike a constant-ratio rack, the R's rack has
a **variable-pitch toothing** — the rack teeth are cut with progressively
increasing spacing toward the ends, so steering gets more direct as you
turn more. VW Newsroom confirms it is standard on the R: "Like the Golf
GTI, the Golf R is equipped with the newly developed progressive steering
system as standard … it takes 2.1 turns of the wheel (380°) to reach the
end stop; with the standard steering system of less powerful Golf models
it takes 2.75 turns (500°)." The EPS motor (APA parallel-axis drive) and
control unit J500 are integrated on the rack.

**Load paths**: front vertical loads pass wheel → hub/bearing → knuckle
→ strut → body strut tower (top mount), with lateral/longitudinal loads
via the control arm and ball joint into the front subframe (axle
carrier), which bolts to the body with TTY bolts. The subframe must be
precisely located on alignment pins or the car will pull/steer
off-centre. At the rear, spring loads go spring link → subframe → body;
damper loads go to the body shock mount; lateral loads spread across the
upper/tie links; braking/accel loads through the trailing arm into its
body bracket.

### DCC vs standard resolution (how to tell which the car has)

- **PR codes**: The alignment tables group the running gear under PR
  numbers **G02, G05, G07, G33, G58, 2UC**. DCC
  (adaptive/electronically-controlled damping) is its own PR family; the
  Bentley column that pairs "Golf R with Adaptive Chassis DCC" indicates
  the R can be optioned with or without it. The most reliable check is
  the vehicle's PR sticker / build data and a VCDS scan for module
  **J250** — if J250 is present and codes, the car has DCC. Physically,
  DCC struts carry an electrical connector to each damper. [ManualsLib]
- **Standard sport front strut**: 5Q0413031EC (dealer: "Golf R; w/o DCC
  Suspension"). [Scottvw]
- **DCC front strut/damper**: 5Q0413031ED (dealer: "Golf R; w/DCC
  Suspension"); commonly seen supersessions/cross-refs 5Q0413031FL and
  5Q0413031FM. [My VW Part]
- **DCC controller J250**: 5Q0907376 family (e.g. 5Q0907376B /
  5Q0907376BZ00 "Active Suspension Control Module"), located behind the
  **left luggage-compartment side trim** (trunk, left side under carpet;
  VW workshop text: "electronically controlled damping control unit
  -J250- is installed behind left luggage compartment side trim").
  [Volkswagen Parts]
- **DCC failure modes**: leaking adaptive damper (oil weep at seal), DTCs
  for damper valve open/short circuit and implausible signal, and high
  replacement cost (genuine DCC struts are far dearer than passive).
  After replacing a DCC damper, J250 adaptations should be run.

## Parts table

The PDF delivers this pipe-delimited with schema: `name | oem_part_number
| qty | parent assembly | sub-assembly | material | torque (Nm + angle +
TTY/replace?) | fitted-position note | known failure modes | source`.
Transcribed 1:1 below (row boundaries reconstructed from the run-on
text; two rows with anomalous field counts are footnoted). Table block
ends with citation chip [ManualsLib + 2].

| Part | OEM number | Qty | Parent assembly | Sub-assembly | Material | Torque (Nm + angle + TTY/replace?) | Fitted-position note | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Front lower control arm (L) | 5Q0407151J (also 5Q0407151R; superseded 5WA407151) | 1 | Front suspension | Control arm | Sheet/stamped steel (R) | LCA-to-subframe front bolt N10640501 M12×1.5×80; rear/console 70 Nm+180° (TTY renew) | Front left, L-shaped | Rear (console) bush wear = MOT advisory, knock | dealer catalogue (vw.oempartsonline.com / eBay OE); UroTuning |
| Front lower control arm (R) | 5Q0407152J (mirror of 151J) | 1 | Front suspension | Control arm | Sheet/stamped steel | as above | Front right | as above | dealer catalogue (inferred mirror) — verify |
| Front control arm front bush | part of arm / Powerflex PFF85-501 aftmkt | 2 | Front suspension | Bush | Rubber | n/a | Forward pivot | wear less common than rear | vendor (Powerflex/Awesome GTI) |
| Front control arm rear (console) bush | 5Q0407183-family (NONE FOUND exact) / aftmkt PFF85-502 | 2 | Front suspension | Console bush | Rubber (hydraulic on some) | console-to-body 70 Nm+180° TTY | Rearward, vertical console | Classic MOT advisory wear → knock/steering vagueness | vendor (Powerflex); forum (VWROC) |
| Front ball joint | 5Q0407365/366-family (NONE FOUND verbatim for R) | 2 | Front suspension | Ball joint | Steel | ball-joint-to-arm nut N10332002 M10 (cast vs sheet steel differ — NONE FOUND verbatim); pinch/clamp into knuckle | Bolts to LCA, clamps into knuckle | play → knock, MOT fail | dealer catalogue; Bentley (nut renew) |
| Front control-arm hardware kit | N10640501 (bolt), N01508 16/14 (nut), N90226501, N10332002 (M10 BJ nut) | 1 set | Front suspension | Fasteners | Steel | LCA bolts / BJ nuts (single-use) | — | — | vendor (UroTuning genuine kit) |
| Front strut/damper – standard sport (w/o DCC) | 5Q0413031EC | 2 | Front suspension | Strut | Steel/gas | strut rod nut 60 Nm (M14×1.5); strut-to-knuckle clamp NONE FOUND verbatim | Front L/R, ~20 mm lower | wear/leak | dealer (parts.vw.com) |
| Front strut/damper – DCC | 5Q0413031ED (supersessions FL/FM) | 2 | Front suspension | Adaptive strut | Steel/gas + solenoid | strut rod nut 60 Nm; damper accel-sensor bolt 15 Nm+90° renew | Front L/R w/DCC | DCC leak, valve DTC, cost | dealer (parts.vw.com); vdladelaide |
| Front coil spring | PN by suspension code (NONE FOUND exact for R); spring rate NONE FOUND | 2 | Front suspension | Spring | Steel | n/a | Over strut | sag at high mileage | dealer catalogue |
| Front strut top mount / bearing | 5Q0412331-family + axial ball bearing (NONE FOUND exact R) | 2 | Front suspension | Top mount + bearing | Rubber/steel | top-mount-to-body nuts NONE FOUND verbatim | Strut tower | creak/knock on full lock (known) | Bentley (strut overview); forum |
| Front bump stop + dust boot | included w/ strut service kit (NONE FOUND exact) | 2 | Front suspension | Bump stop/boot | Foam/rubber | n/a | On piston rod | torn boot → damper wear | dealer catalogue |
| Front subframe / axle carrier | 5Q0199369-family (NONE FOUND verified R-specific) | 1 | Front suspension | Subframe | Steel | subframe-to-body 70 Nm+180° (TTY renew) | Cradles engine/LCAs/rack | must be aligned on locating pins | Bentley; 034 subframe guide |
| Front knuckle / swivel bearing (L/R) | 5Q0407255/256-family (NONE FOUND verbatim R) | 2 | Front suspension | Wheel bearing housing | Cast (bionic) | hub bolts 70 Nm+90°; BJ clamp; strut clamp | Carries hub, strut, BJ, caliper | — | dealer; SSP 515 |
| Front wheel bearing/hub unit | 5Q0407621F (also 8S0498625A, 8V0498625A; 80 vs 85 mm VIN split) | 2 | Front suspension | Hub/bearing | Steel | hub-to-knuckle 70 Nm+90° (4-bolt); ABS sensor bolt 8 Nm | Bolt-on; VIN-split 80/85 mm | drone by corner | dealer; UroTuning; NGP |
| Rear wheel bearing/hub unit | 5WA407621 (supersedes 5WA407621D/A) | 2 | Rear suspension | Hub/bearing | Steel | bolt-on to stub housing | Bolt-on unit | drone | dealer (parts.vw.com) |
| Rear spring (lower/trapezoidal) link | 5Q0505311/312-family (NONE FOUND verbatim R) | 2 | Rear suspension | Spring link | High-strength steel | lower link nut 90 Nm+90° (renew) | Carries coil spring | bush wear | Bentley; dealer |
| Rear upper transverse link | 5Q0505323/324-family (NONE FOUND verbatim R) | 2 | Rear suspension | Upper link | Steel/alu | link nut 90 Nm+90° (renew) | Upper lateral | bush wear | Bentley; dealer |
| Rear tie/toe link (adjustable) | 5Q0505541-family (NONE FOUND verbatim R) | 2 | Rear suspension | Toe link | Steel | eccentric nut 95 Nm (renew, re-align after) | Toe adjust via eccentric | eccentric seizes (UK corrosion) | Bentley; dealer |
| Rear trailing arm (control arm) | 5Q0505435/436-family (NONE FOUND verbatim R) | 2 | Rear suspension | Trailing arm | Steel/alu | bracket-to-body 50 Nm+90° (renew); arm bolt 90 Nm+90° | To body bracket | trailing-arm bush wear | Bentley; dealer |
| Rear trailing-arm body bracket / bush | 5Q0505145E (bush, carried from R6) | 2 | Rear suspension | Bracket/bush | Steel/rubber | 50 Nm+90° renew | Body mount | bush wear | Bentley; R6 fixed point |
| Rear damper – standard | 5Q0513045-family (NONE FOUND verbatim R) | 2 | Rear suspension | Shock | Steel/gas | upper 180 Nm; lower 50 Nm+90° (renew) | Separate from spring | leak | Bentley; dealer |
| Rear damper – DCC | 5Q0513049-family (NONE FOUND verbatim R) | 2 | Rear suspension | Adaptive shock | Steel/gas+solenoid | upper 180 Nm; lower 50 Nm+90°; accel-sensor bolt 5 Nm renew | w/DCC | DCC leak/DTC | Bentley; dealer |
| Rear coil spring [^1] | PN by code (NONE FOUND); rate NONE FOUND | 2 | Rear suspension | Spring | Steel | — [^1] | on spring link | sag | dealer |
| Rear bump stop / top mount | 5Q0512131-family (NONE FOUND exact) | 2 | Rear suspension | Mount/stop | Rubber | bonded-bush nut 45 Nm renew | Body shock mount | — | Bentley |
| Front anti-roll bar | 5Q0411303-family, Ø ~23.2 mm (4WD) | 1 | Front suspension | Stabilizer bar | Spring steel | clamp bolts (see chart) | Front subframe | — | vendor (Powerflex/Awesome GTI); forum |
| Front ARB clamp bush | 5Q0411314-family / Powerflex PFF85-803-23.2 | 2 | Front suspension | ARB bush | Rubber/PU | clamp bolt | Ø23.2 mm | perished bush → knock | vendor (Awesome GTI) |
| Front drop link | 5Q0411315-family | 2 | Front suspension | Coupling rod | Steel | 65 Nm (renew) | Strut to ARB | knock when worn | Bentley; dealer |
| Rear anti-roll bar | 5Q0511305-family (R ~21.7 mm; verify) | 1 | Rear suspension | Stabilizer bar | Spring steel | clamp 25 Nm+90° (renew) | Rear subframe (AWD) | — | vendor; Bentley |
| Rear ARB clamp bush | 5Q0511327-family | 2 | Rear suspension | ARB bush | Rubber/PU | 25 Nm+90° | — | perished | vendor |
| Rear drop link | 5Q0505465-family; bolt WHT000226 | 2 | Rear suspension | Coupling rod | Steel | stabilizer link nut 45 Nm | ARB to wheel-bearing housing | knock | dealer (vwnanuet WHT000226); Bentley |
| Rear subframe | 5Q0505235E / 5Q0505235J (carried from R6) | 1 | Rear suspension | Subframe | Steel | (per R6) | Carries rear diff + links | — | R6 fixed point |
| Steering rack (progressive EPS, R) | 5Q1423051-family / 5Q1423053AF (w/harness) | 1 | Steering | Rack + EPS | Alu/steel | rack-to-subframe 50 Nm+90° (renew) | Rack-mounted APA drive | rack knock/clonk (TSB) | dealer; datadrivenmqb |
| Steering EPS control unit J500 | integrated w/ rack (harness 5Q1971111-family) | 1 | Steering | Control unit | — | n/a | On rack | fault → loss of assist | dealer; Ross-Tech |
| Steering column assembly | 5Q1419502-family (NONE FOUND exact) | 1 | Steering | Column | Steel | UJ pinch bolt 30 Nm (renew) | Adjustable column | column clunk | Bentley |
| Intermediate/steering shaft + UJ | 5Q1419501-family (NONE FOUND exact) | 1 | Steering | Shaft | Steel | UJ pinch bolt 30 Nm M8×35 (renew) | Column to rack | clunk | Bentley |
| Inner tie rod | 5Q0423810-family (NONE FOUND verbatim) | 2 | Steering | Inner tie rod | Steel | to rack NONE FOUND verbatim | Screws into rack | — | dealer |
| Track-rod end (outer, L/R) | 5Q0423811 (L) / 5Q0423812 (R)-family | 2 | Steering | Tie rod end | Steel | 20 Nm+90° (renew); locknut NONE FOUND verbatim | Outer, into knuckle | play → knock, MOT | Bentley; dealer |
| Steering rack boot/gaiter kit | 5Q0423831-family (NONE FOUND exact) | 2 | Steering | Gaiter | Rubber | clamp | Both ends | torn → contamination | dealer |
| 19″ Pretoria alloy (silver) | 5G0601025AJ | 4 (as fitted) | Wheels | Alloy wheel | Cast aluminium | wheel bolt 120 Nm | 8J×19 ET50, 5×112, 57.1 CB, ~9.3 kg | kerb/crack, refurb | dealer/eBay OE; alloyhub |
| 19″ Pretoria alloy (black/gloss) | 5G0601025CK (AJ finishes AX1 black, Z49 grey metallic) | 4 | Wheels | Alloy wheel | Cast aluminium | 120 Nm | as above | crack on potholes | alloyhub; shopdap |
| 18″ Cadiz alloy (pre-FL UK std) | 5G0601025-family (Cadiz) | 4 | Wheels | Alloy wheel | Cast aluminium | 120 Nm | 18×7.5 ET51 (also 18×8 ET50/45) | — | VW UK press info; forum |
| Wheel bolt | N-family M14×1.5, ball/radius seat (NONE FOUND exact PN) | 20 | Wheels | Bolt | Steel | 120 Nm | Hub-centric 57.1; box spanner | corroded → replace | owner's manual (vwgolf.org) |
| Hub bolt (driveshaft) | WHT 005 437 (carried from R6) | 4 | Driveline/hub | 12-point bolt | Steel | 200 Nm + 180° (single-use) | M16×1.5 | — | R6 fixed point |
| Centre cap | 5G0601171 | 4 | Wheels | Cap | Plastic | push-fit | Wheel centre | — | shopdap |
| TPMS [^2] | NONE (indirect ABS-based) | 0 | Wheels | — | — | — | reset via infotainment/SET; No in-wheel sensors on UK/EU Mk7 | false alerts after pressure change | owner's manual/forum |

[^1]: PDF row printed with 9 fields (one short) — no torque field was
given for the rear coil spring; "on spring link" is its fitted-position
note as printed.
[^2]: PDF row printed with 11 fields (one extra): "reset via
infotainment/SET" and "No in-wheel sensors on UK/EU Mk7" appeared as
separate fields; merged into the fitted-position cell here.

## Complete bolt/torque chart (verbatim from Bentley 2014 book unless noted)

**Rule: chassis/suspension bolts with rubber bushes are torqued at ride
height (curb weight on wheels), not hanging — final-tighten link/arm
pivots with the car at normal ride height so the bushes are not preloaded
off-centre.**

- Front subframe to body: **70 Nm + 180°** — TTY, always replace
- Front console (control-arm bracket) to body: **70 Nm + 180°** — TTY,
  always replace [ManualsLib]
- Front stabilizer-bar drop-link nut: **65 Nm** — always replace
- Front subframe mounting-bracket bolt: **50 Nm + 90°**
- Front strut piston-rod / bearing nut: **60 Nm** (M14×1.5) [ManualsLib]
- DCC front damper acceleration-sensor bolt: **15 Nm + 90°** — always
  replace [ManualsLib]
- Front hub/bearing to knuckle (4-bolt): **70 Nm + 90°** [ManualsLib]
- ABS wheel-speed sensor bolt: **8 Nm** (M6×16)
- Driveshaft-to-hub 12-point (ribbed): 70 Nm + 90°; (non-ribbed / R):
  **200 Nm + 180°** — always replace (= WHT 005 437, R6 fixed point)
- Ball-joint-to-control-arm nut (M10): NONE FOUND verbatim (cast vs
  sheet-steel distinction not captured)
- Ball-joint-to-knuckle clamp bolt: NONE FOUND verbatim
- Strut-to-knuckle clamp (pinch) bolt: NONE FOUND verbatim
- Strut top-mount-to-body nuts: NONE FOUND verbatim
- Rear lower transverse (spring) link nut: **90 Nm + 90°** — always replace
- Rear upper transverse link nut: **90 Nm + 90°** — always replace (a
  link-bolt sequence appears on some MQB tables: 90 Nm+90°, loosen one
  turn, 90 Nm+180°)
- Rear tie/toe link eccentric nut: **95 Nm** — always replace; perform
  alignment after [ManualsLib]
- Rear trailing-arm bracket-to-body bolt: **50 Nm + 90°** — always replace
- Rear trailing-arm bolt: **90 Nm + 90°** — always replace [ManualsLib]
- Rear bonded-rubber-bush nut: **45 Nm** — always replace [ManualsLib]
- Rear shock upper bolt: **180 Nm** [ManualsLib]
- Rear shock lower bolt: **50 Nm + 90°** — always replace
- Rear stabilizer-bar clamp bolt (AWD, multi-point): **25 Nm + 90°** —
  always replace [ManualsLib]
- Rear stabilizer link to wheel-bearing housing nut: **45 Nm**
- Steering rack-to-subframe bolt: **50 Nm + 90°** — always replace
  [ManualsLib]
- Track-rod end to knuckle nut: **20 Nm + 90°** — always replace
- Steering-shaft universal-joint pinch bolt: **30 Nm** (M8×35) — always
  replace
- Inner tie rod to rack: NONE FOUND verbatim
- Track-rod-end locknut: NONE FOUND verbatim
- Wheel bolts: **120 Nm** (owner's manual)

**Single-use / renew list**: subframe-to-body, console-to-body, front
drop-link nut, DCC accel-sensor bolt, driveshaft hub bolt, all rear
link/arm inner+outer nuts (90+90°), rear tie-rod eccentric nut,
trailing-arm bracket bolt, rear shock lower bolt, rear stabilizer clamp
bolt, rack-to-subframe bolt, track-rod-end nut, steering UJ pinch bolt,
hub bolt WHT 005 437.

## Alignment specs (Bentley 2014, PR G02/G05/G07/G33/G58/2UC)

- **Front camber (straight-ahead)**: −44′ ± 30′ (DCC/R column); adjacent
  column −45′ ± 30′. **Max permissible L/R difference: 30′.** [ManualsLib]
- **Front total toe**: 10′ ± 10′. [ManualsLib]
- **Front caster**: NONE FOUND verbatim from this book (forum reads of
  the same table cite ~7°45′ ± 30′; treat as unconfirmed).
- **Rear camber**: −1°45′ ± 30′ (one column) / −1°20′ ± 30′ (other); max
  L/R difference 30′. [ManualsLib]
- **Rear total toe**: +10′ (tolerance truncated / NONE FOUND).
- **Adjustable?** Front camber essentially **non-adjustable** (only via
  aftermarket camber bolts/plates or leaning the strut on the slotted
  holes); front toe adjustable at the track-rod ends; caster
  non-adjustable (only via subframe shift). Rear **camber and toe
  adjustable via eccentric bolts** on the links.
- **Mandatory after any alignment or steering work**:
  steering-angle-sensor **G85 basic setting / calibration** via VCDS/ODIS
  ("Steering angle sensor basic setting," the ESP/steering zero-point
  adaptation), else ESP/lane-assist faults.

## Steering subsection

Progressive (variable-ratio) steering is **standard** on the R — VW
Newsroom: "Like the Golf GTI, the Golf R is equipped with the newly
developed progressive steering system as standard … 2.1 turns of the
wheel (380°) to reach the end stop." Rack family for the R is 5Q1423051 /
5Q1423053AF (the AF unit is sold used with harness for Mk7/7.5 R). The
EPS control unit **J500** is integrated with the rack; after any rack
replacement the unit must be **coded and the G85 basic setting run**, and
the car brought online to ODIS for component protection/adaptation. Known
failures: (1) **rack knock/clonk over bumps** — a documented MQB
rack-rattle measure/TSB; note a related front-end knock is sometimes the
wheel bearing moving in the carrier (dealer fix uses retaining adhesive).
(2) Steering **column clunk** (UJ/shaft). (3) J500 faults →
loss/reduction of assist.

## Wheels / tyres block

- **19″ Pretoria**: 5G0601025AJ (silver/sterling), 5G0601025CK (gloss
  black); other finishes seen: AJZ49 (grey metallic), AJAX1 (black).
  Confirmed **8J × 19 ET50, 5×112, centre bore 57.1 mm**, weight ~9.3 kg
  (bare rim). OE tyre 235/35 R19 (Bridgestone Potenza S001 and similar as
  OE fitments). Centre cap 5G0601171. Per VW UK Golf R Press Information
  (March 2016): "The standard wheels are 18-inch 'Cadiz' alloys with
  225/40 tyres, while 19-inch 'Pretoria' alloys are optional." [ebay]
  [ebay]
- **18″ Cadiz** (pre-facelift UK standard): 225/40 R18; 18×7.5 ET51 (also
  seen 18×8 ET50). Included for completeness.
- **Bolt pattern 5×112, centre bore 57.1 mm** — confirmed; hub-centric.
- **Wheel bolt**: M14×1.5, tapered/ball-radius seat; **torque 120 Nm**
  per the VW Golf owner's manual ("The tightening torque for wheel bolts
  for steel and alloy wheels is 120 Nm"). Note: some later Mk7/Mk8 R
  sources print 140 Nm; for a 2014 Mk7 the owner's-manual value is
  120 Nm. [Volkswagen]
- **TPMS**: UK/EU Mk7 uses **indirect TPMS** (tyre-pressure monitoring
  via ABS wheel-speed comparison) — NO in-wheel sensors, therefore no
  sensor part numbers to model. Reset/store is done via the infotainment
  "Set-up → Tyres" menu (or SET button) after adjusting pressures.
  (Direct-sensor TPMS was used on some other markets/models but not the
  standard UK/EU Mk7 Golf; if modelling a non-UK car, verify against
  build data.)

## Exploded diagrams / drawings / SSP

- **SSP 515** "The Golf 2013 – Running Gear and Four-wheel Drive
  Concept" — hosted PDF:
  https://www.volkswagenclub.net/manual_download.php?id=1639 (also
  procarmanuals.com). Architecture + cutaways for suspension, DCC,
  progressive steering.
- **Bentley 2014** "Golf, GTI & Golf R Quick Reference Specification
  Book" — https://static.nhtsa.gov/odi/tsbs/2014/MC-10073690-2280.pdf and
  ManualsLib mirror
  https://www.manualslib.com/manual/2857351/Volkswagen-Golf-2014.html
  (overview exploded diagrams pp. 22–79: wheel-bearing assembly,
  suspension strut, transverse-link/tie-rod, stabilizer-bar AWD,
  electro-mechanical steering gear).
- **Dealer catalogue exploded trees**: https://vw.oempartsonline.com and
  https://parts.vw.com Golf R front-suspension / rear-suspension /
  steering / wheels categories.

## Failure-mode notes

- **Front LCA rear (console) bush**: classic MOT advisory; wear → knock
  over bumps, steering vagueness.
- **Drop-link knock**: worn front/rear links rattle over rough roads.
- **Top-mount creak/clunk on full lock**: known Mk7 complaint; sometimes
  the strut bearing, sometimes strut-in-mount movement.
- **Rear trailing-arm bush wear**: high-mileage rear knock/tramlining.
- **DCC damper leak + DTCs**: oil weep, valve open/short codes; expensive
  genuine replacement; run J250 adaptation after.
- **EPS rack knock**: documented MQB rack-rattle TSB/measure;
  differentiate from wheel-bearing-in-carrier movement (adhesive fix).
- **Intermediate-shaft clunk**: UJ wear.
- **Wheel-bearing drone**: diagnose by corner (load-shift test on gentle
  S-curves — noise changes as load transfers off the bad bearing).
- **Eccentric bolts seized**: UK corrosion reality at high mileage
  (~92k) — heat/penetrant, often replace the toe link.
- **Corroded/kerbed Pretoria refurbishment**: the Pretoria is a
  **painted** wheel (not diamond-cut), so full refurbishment is
  straightforward; inspect for cracks near the spoke roots — these
  forged/cast wheels can crack on potholes and are sometimes
  weld-repaired.

## Recommendations

- **Confirm DCC vs standard first** via the PR sticker + a VCDS scan for
  J250; this determines every damper PN in the model (EC vs ED family).
  If no J250 module, model the passive sport strut 5Q0413031EC. Given
  this is a 2014 pre-facelift with 19″ Prets, DCC is plausible but must
  be verified, not assumed.
- **Model the four-link rear accurately**: spring link (carries the
  coil), a separate upper transverse link, a tie/toe link with the
  eccentric adjuster, and a trailing arm to its body bracket — four
  distinct links per side, not a simple wishbone.
- **Use the verbatim torques** in the chart above; where marked NONE
  FOUND (ball-joint clamp, strut clamp, top-mount nuts, inner tie rod,
  track-rod-end locknut, front caster/rear-toe tolerance), pull the exact
  figure from erWin or a full-resolution Bentley page scan (pp. 71–79)
  before finalising fastener callouts and the alignment block.
- **Wheels**: model the 19″ Pretoria 5G0601025AJ (silver) / CK (black) at
  8J×19 ET50, 57.1 CB; note the 18″ Cadiz as the pre-facelift UK
  standard. No TPMS sensors to model — leave the wheels sensor-free and
  document indirect-TPMS reset instead.
- **Benchmarks that change the plan**: if the car's PR list contains no
  DCC code, treat all dampers as passive (EC family); if a build-data
  check shows a non-UK origin, re-verify TPMS architecture and wheel-bolt
  torque; if the car is a genuine early-2014 build, default to **120 Nm**
  wheel bolt and indirect TPMS unless build data says otherwise.

## Caveats & open flags (source disagreements)

- **Wheel-bolt torque 120 vs 140 Nm**: the Mk7 Golf owner's manual states
  **120 Nm**; some Mk7/Mk8 R forum posts and later manuals cite 140 Nm.
  Resolved to **120 Nm** for a 2014 Mk7 from the owner's manual; flagged.
  (Aggregator charts unreliable — primary source used.)
- **Front caster & rear-toe tolerance**: NONE FOUND verbatim from the
  Bentley book (search-snippet truncation of pp. 72–74); forum figure
  ~7°45′ caster unconfirmed — read the PDF page images/OCR to close.
- **Ball-joint, strut-clamp, top-mount, inner-tie-rod, track-rod-locknut
  torques**: NONE FOUND verbatim — do not guess; source from erWin.
- **Many rear-link and knuckle PNs** given as families (NONE FOUND
  verbatim R-specific) because 7zap/ETKA were Cloudflare-blocked; verify
  exact suffix in ETKA/erWin.
- **Rear ARB diameter** for the R (~21.7 mm) is from vendor/forum, not a
  VW source — verify. **Front ARB 23.2 mm (4WD)** is from
  Powerflex/Awesome GTI bush sizing — verify against a VW figure.
- **VW "11 kg" weight claim** corrected: it refers to the modular
  lightweight torsion-beam axle vs the multi-link performance axle,
  **not** a four-link-vs-four-link saving. The R uses the (heavier)
  multi-link performance axle.
- **Rear damper/spring, top-mount, front subframe, knuckle PNs**:
  family-level only; confirm in dealer catalogue with VIN.
- Carried-open flags from R1–R6 remain unresolved (cam-carrier torque;
  VVT phaser range; Gen3 DV revision; intake manifold revision by VIN;
  DI rail PN; G247 suffix; exhaust flap V-designation; fuel tank
  55/60 L; DQ250 mechatronic PN; 0CQ vs 0CN bevel box; DQ250 ratios
  forum-only; RDU/bevel ratios NONE FOUND; propshaft flange torques NONE
  FOUND; rear-diff plug torque unverified; inner CV flange bolt torque
  NONE FOUND; Haldex fluid supersession TPI not obtained).
