# R6 return — Haldex Gen 5 & driveline

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: VW Golf R Mk7 (Pre-Facelift, UK/EU, EA888
Gen3 2.0 TSI CJXC 300 PS, DQ250/0D9 DSG, 4Motion Gen-5 Haldex).

Inline `[source]` tags reproduce the PDF's boxed citation links; full URLs
the PDF spelled out are in the diagram-URLs section.

## TL;DR

- **The brief's "accumulator + separate control solenoid" wording describes
  Gen 4, not Gen 5, and must be corrected.** BorgWarner's own literature is
  explicit: the fifth-generation (GenV) coupling *deleted* the accumulator,
  the filter AND the pressure-control/solenoid valve, replacing all three
  with a single centrifugal electro-hydraulic pump whose motor **speed**
  both generates and regulates clamp pressure. The correct Gen 5
  architecture is a wet multi-plate clutch, an annular working piston, a
  centrifugal pump with an integrated overflow/regulator valve, an
  integrated J492 controller, and an inlet strainer gauze — no pre-charge
  accumulator, no discrete control solenoid.
- **The Gen 5 has NO serviceable filter — only a strainer gauze on the pump
  inlet — and this is the single dominant failure point.** The strainer
  clogs with clutch debris, starves the pump, and kills it. VW's book
  position is "fluid change only," but competent UK practice (JCR, STR,
  VWROC consensus) is a ~3-year / ~30k-mile fluid change **with the
  strainer cleaned every time**.
- **The propshaft uses a rear rubber flex disc ("donut", PN 5Q0521307) plus
  a centre support bearing — not CV joints.** The rear diff is the
  0BR525010x family; the front/rear hub (axle) bolt is single-use 12-point
  WHT 005 437, torqued 200 Nm + 180°. User-supplied pump PN 0CQ598549 and
  controller family 0CQ907554J are both verified correct for this car.

## Gen 5 Architecture Correction (stated explicitly)

The brief lists "plate stack, annular piston, accumulator, control
solenoid." **The accumulator and the separate solenoid/pressure-control
valve are Gen 4 features that Gen 5 removed.** This is confirmed from
BorgWarner primary material in three places:

- BorgWarner *Next Generation AWD Actuators* knowledge-library paper
  (Christian Månsson, Måns Ranåker, Per Söderberg; published 21 May 2020),
  verbatim: *"As product sophistication increased, the differentially
  driven pump was removed in the fourth generation and replaced by an
  electrically driven pump, accumulator and control valve, which eliminated
  the need for a pressure sensor. For the fifth generation, the
  accumulator, filter and pressure control valve were all removed and
  replaced by the current centrifugal pump."* `[borgwarner]`
- BorgWarner GenV press release (Auburn Hills, 28 May 2019), verbatim:
  *"The fifth generation technology introduces a centrifugal pump, which
  replaces the accumulator, filter and pressure control valve in the
  previous generation."* `[BorgWarner]`
- BorgWarner drivetrain press material, verbatim: *"Using a centrifugal
  overflow valve integrated into the axial piston pump, a new
  electro-hydraulic clutch actuator renders the accumulator, solenoid valve
  and filter unnecessary."* `[BorgWarner]`

**Correct Gen 5 internals to model:**

- **Wet multi-plate clutch pack** — interleaved steel and friction discs
  between the input drum (driven by the propshaft) and the output hub to
  the rear-diff pinion. BorgWarner: *"A wet multi-disc clutch connects an
  ingoing and an outgoing shaft for torque transfer."* (Published per-disc
  counts/friction-material spec for the VAG unit: **NONE FOUND**.)
  `[borgwarner]`
- **Annular working piston** — retained; a hydraulic annular piston applies
  axial compression to the plate stack. BorgWarner: *"The hydraulic
  actuator … applies a variable force to the clutch package utilizing
  hydraulic pressure and a working piston."* `[borgwarner]`
- **Centrifugal Electro-Hydraulic (CEH) pump** — a 6-piston axial pump
  driven by a brushless DC motor. Its integrated centrifugal check/overflow
  valves create a near-linear relationship between motor speed and system
  pressure, so the motor's commanded speed *is* the pressure setpoint. No
  accumulator and no separate control valve exist as discrete serviceable
  items on Gen 5. `[borgwarner]`
- **Integrated control module J492** bolted to the coupling.
- **Strainer gauze** on the pump inlet in place of the Gen 4 replaceable
  filter.
- **A wording caution:** some VW MQB workshop/menu text still uses legacy
  labels (pump "V181", valve "N373"). The Gen-4 tech article
  (automotivetechinfo.com) describing an accumulator held at ~30 bar and an
  N373 "coupling opening control valve" is a **Gen 4** description — do
  not carry it into the Gen 5 model. On Gen 5, Ross-Tech notes any
  N373-type function is integral to J492 and not separately replaceable.
  `[Ross-Tech Wiki]`

## How the system works (torque path & control)

**Torque path:** DQ250 output → front final drive → **PTO/bevel box
(family 0CN409053, from R5)** turns drive through 90° → two-piece
**propshaft** (front flange, centre support bearing, rear rubber flex
disc) → **Haldex Gen 5 coupling input drum** → wet multi-plate clutch →
**rear final drive unit (RDU, 0BR525010x)** pinion → crown wheel →
spider/side gears → rear driveshafts.

Because there is no centre differential, the bevel-box step-up and the
rear-diff crown-wheel/pinion ratio are made equal-and-opposite so that,
with the clutch fully clamped, front and rear axle speeds match. (Exact
MQB tooth counts unconfirmed from a VW primary source — see open flags.)

**Control:** J492 continuously reads CAN data (four wheel speeds from
ABS/ESP, throttle, steering angle, yaw). Under light, steady load the pump
idles and the rear axle is effectively decoupled for economy. When slip is
predicted or rear torque is beneficial, J492 spins the pump; motor speed
sets clamp pressure and engages the plate stack **pre-emptively** (before
the fronts actually slip) as well as on demand. On MQB Golf R the coupling
also participates in four-wheel EDS/XDS brake-based torque steering. Under
braking the pump duty falls to ~0 so no rear torque is applied.
`[Jcr-leeds]` `[Jcr-leeds]`

**Temperature / overload protection:** the coupling monitors oil
temperature and, when the Haldex oil gets too hot (community-reported
reversion threshold ~100 °C on earlier generations; the controller
protects the stack and pump above that), it **opens the clutch and reverts
to FWD** — the classic "front wheelspin at the end of a hot track
session." Sustained maximum pump duty (e.g. an over-aggressive aftermarket
controller) overheats the clutch packs and can destroy the pump within a
single session.

## Fluids block (both circuits, exact)

### (a) Haldex coupling circuit

- **Spec:** G 060 175 A2 (850 ml bottle) is the current Gen-5/MQB Haldex
  fluid. It differs from the older **G 055 175 A2** used on Gen-2/4 cars
  (Mk5 R32, Mk6 R, Mk2 TT, B6 Passat 4Motion). Community consensus
  (audi-sport.net, VWVortex) is that the newer G 060 175 A2 is the correct
  fill for the Mk7 R; the confusion is only over bottle size/price.
  `[VAGPARTS Australia]` `[UroTuning]`
- **Capacity:** ~850 ml from dry / **~650–700 ml drain-and-refill.**
  Cross-confirmed: JCR-Leeds *"Oil Capacity / Refill Quantity 850ml /
  650ml"*; haldexrepairs.co.uk fill chart *"VAG Gen 5 = From Dry 0.85
  Litre (refill volume 0.65 Litre)."* `[Jcr-leeds]` `[Haldex Repairs]`
- **Drain plug:** N 910 827 01 (8 mm hex) — **32 Nm** with a new crush
  washer.
- **Fill plug:** N 902 818 02 (5 mm hex) — **15 Nm** with a new crush
  washer.
- **Interval:** UK independent standard ≈ every 3 years / ~30,000 km (JCR
  lists first service at 10k–20k mi, then every 10k mi / 24 months for
  hard use; ShopDAP lists 30k mi). VW's factory book position is a fluid
  change only.
- **No filter to change — strainer gauze only** (clean, do not replace).

### (b) Rear differential (RDU) circuit

- **Spec:** G 052 145 S2 (75W-90 synthetic, GL-5). Same oil as the front
  bevel box (verified in R5).
- **Capacity:** ~0.9 L new fill (dealer/indie kits supply 1 L). NHTSA
  fluid-capacity charts list "Final Drive" as G 052 145 S2 on the AWD
  Golf. `[nhtsa]`
- **Plugs: N 90 281 802** — the same plug verified in R5 for the bevel
  box, and shared with the RDU (034Motorsport and WCT service kits list
  N90281802 for both front and rear diff on MQB 4Motion). **N 91 082 701**
  (M10×1×10) is also listed as a Haldex/AWD diff drain/fill plug.
  `[WCT Performance]` `[ShopDAP]`
- **Torque:** ~30 Nm (exact figure from a VW primary source **NONE
  FOUND** — treat as ~30 Nm pending erWin).
- **Lifetime vs serviceable:** VW nominally calls the rear diff a
  "lifetime fill," but the community strongly recommends servicing it
  (~every 20–40k mi). Real-world diff failures — whine, worn/broken
  crown-wheel teeth — are documented (VWVortex, golfmk7). `[VW Vortex]`

## Pump + strainer subsection (PN chain from 0CQ598549)

- **User's PN 0CQ598549 is CORRECT** — it is the genuine BorgWarner Gen 5
  Haldex pre-charge pump "repair kit" (pump + seal + bolts + connector
  plug), catalogued for 8V S3/A3/RS3, Mk7/7.5 Golf R, Tiguan, Atlas,
  Arteon, TT/TTS/TTRS. It is described as VIN-specific by some vendors.
  Function: *"pre-charges the oil inside the Haldex assembly to allow the
  coupling to engage faster."* `[UroTuning + 2]`
- **PN / supersession chain:** current pump kit = **0CQ598549**; pump
  SEAL/O-ring + BOLT kit alone = **0CQ598305**; pattern equivalents =
  Vaico **V10-6827 / V10-6592**; some clone listings cross to 4D0971992 (a
  connector/pigtail). No formal factory supersession beyond 0CQ598549 was
  found. `[UroTuning]`
- **No serviceable filter (verified officially):** BorgWarner/Cars-Ecu:
  *"Unlike Gen 4, the 5th generation Haldex system has no fine particle
  filter cartridge."* JCR: the filter is *"replaced with a larger strainer
  basket/Gauze fitted to the end of the CEH."* `[Cars-Ecu]` `[Jcr-leeds]`
- **Clogging failure chain:** strainer clogs with clutch debris → pump
  can't pass oil → pump strains/overheats → pump dies → rear drive is
  lost. A VWVortex teardown at only ~10k miles found the oil *"almost
  black"* with *"gunk … on the plastic screen/mesh filter."* `[VW Vortex]`
- **Clean-vs-replace debate:** Independent specialists (JCR, STR) clean
  the strainer at every service (T10 screws hold the gauze; brake-clean
  it). BorgWarner's reseller position (STR) is that a pump that has run
  strained should be **replaced**, not merely cleaned, because internal
  wear has already occurred; STR advises new-pump replacement "to
  guarantee correct operating pressure." Community view: clean early and
  often (10–20k mi) as cheap insurance, and replace the pump if any pump
  DTC or measurable current deviation is present.
- **Pump mounting bolts/torque:** new 10 mm-head pre-charge pump bolts,
  **9.5 Nm** (JCR), single-use. Removed with a 10 mm deep socket; the two
  controller bolts behind the module are also 10 mm.
- **Aftermarket options:** genuine BorgWarner (via 0CQ598549) strongly
  preferred; Vaico full-pump pattern (V10-6827); pattern seal kits
  (klifex, thefrugalfixer). Genuine unit is worth it for correct operating
  pressure.

## Controller (J492)

- **PN family: 0CQ907554x** for the Mk7/7.5 Golf R; current genuine
  revision **0CQ907554J** (supersedes **0CQ907554H**). Sibling revisions
  in the family: 0CQ907554A/C/D/E/H; Audi variants 0AY907554F/J/L/M.
  Applications include Golf VII R and R Facelift, 8V S3/A3, Alltrack,
  Sportwagen. `[ECS Tuning + 2]`
- **Connector/mounting:** module bolts to the coupling (2× ~10 mm behind
  the controller); the right-hand electrical plug is released with a
  pick/small flat. `[jcr-leeds]`
- **Water ingress / connector corrosion:** documented failure mode — the
  module sits exposed under the car, and water ingress/pin corrosion
  causes intermittent faults and no-communication codes (e.g. **01324 –
  Control Module for All-Wheel Drive (J492): No Communications**, which
  also throws downstream ABS/CAN-gateway/TPMS codes). Auto Fault Finder
  Ltd (haldexrepairs.co.uk) repairs these modules. `[Haldex Repairs]`
- **Coding/flashing:** the controller **is** coded to the car; a
  replacement must be coded/adapted. A community report on a genuine unit
  noted it *"took a couple of restarts of the car and fault-code
  clearing"* before recognition; aftermarket vendors flag that units may
  need individual coding to make/year/model. `[Cars-Ecu]`

## VCDS / ODIS pump-learn & basic-settings section

Access via **Address 22 – AWD** (also reachable through the "Running gear"
group; the four-wheel-drive-with-Haldex controller on UDS).

- **Pre-drain temperature check:** read the Oil Temperature measuring
  value — it **must be 20–40 °C before draining** (JCR verbatim: *"The oil
  temperature must be between 20 and 40 °C before you empty the oil from
  the Haldex Coupling."*). `[Jcr-leeds]` `[jcr-leeds]`
- **Pump relearn / basic setting (after fluid change or pump R&R):**
  Address 22 → **Basic Settings (04)** → select **MAS02928 – Pump Motor**
  → Go. The pump cycles for ~30–60 s to prime/refill the space; completion
  message reads *"finished correctly."* (JCR procedure with VCDS
  screenshot.)
- **Measuring values to log:** pump current and pump duty %, clutch
  pressure/duty, and oil temperature. On a functional test the "pump
  percentage vs pump current" trace resembles a fuel-pump waveform.
  `[Automotive Tech Info]`
- **Functional (engagement) test:** on a lift or rollers, with the front
  wheels driven, engage drive and rev to ~1500 rpm; if the rear axle does
  not attempt to drive (try to push the car forward), the coupling is
  defective and needs further diagnosis. **NOTE (STR):** on Gen 5 the
  pump-motor output test is a diagnostic to open/test the pump motor only
  — it does **not** drain the oil.
- **After controller replacement:** code/adapt the new J492 to the car,
  clear codes, and expect several ignition cycles before the module is
  recognised.

## Propshaft subsection (joint question resolved)

- **PN family 5Q0521101** — documented variants 5Q0521101AB / AG / AJ / AT
  / BA / BJ (Golf 7/7.5 R, Alltrack, Audi S3 8V, TT 8S). Genuine listing
  example: 5Q0521101BA (parts.vw.com).
- **Two-piece shaft with a centre support bearing (confirmed) and a REAR
  rubber FLEX DISC ("donut"/guibo) at the differential end — NOT CV joints
  and NOT a Hardy-Spicer cross.** The brief's "flex disc" is therefore
  correct for the rear coupling: a single rubber flex disc bolts to the
  rear-diff flange (3 bolts), the front section bolts to the bevel box
  (3-bolt joint), and the centre bearing sits between the two sections
  (VWROC first-hand DIY: *"Undo the 3 bolts on propshaft that connect to
  the rear diff, undo the 2 middle bolts that hold propshaft in place"*).
  `[vwroc]` `[VW R Owners Club]`
- **Flex disc is separately serviceable: PN 5Q0521307** (also Febi/Meyle
  pattern; confirmed by VWROC member photo).
- **Centre bearing:** OE is generally supplied as part of the shaft
  assembly, which is why aftermarket carrier/bearing kits exist — JXB
  Performance offers a two-piece carrier that installs without removing
  the shaft, and RacingLine sells an alignment kit that shrinks the
  oversize factory M14 bracket holes to M8 to stop the carrier twisting (a
  known wear accelerator). `[JXB Performance]` `[RacingLine]`
- **Flex-disc / flange bolts:** stretch bolts **N 10329102** and **WHT 005
  179** — renew on assembly; forum reports of shearing if reused (VWROC,
  citing the 7zap diagram).
- **Flange torque figures: NONE FOUND from a VW primary source.** Do not
  use the "55 Nm" figure that circulates — it is from the longitudinal
  Audi C6 RS6, a different architecture. Obtain the correct value from
  erWin repair group 39.
- **Known failures:** centre-bearing wear → vibration/drone at speed;
  flex-disc perishing/cracking → clunk on take-up and eventual failure;
  misalignment from the oversize factory bracket holes accelerates both.

## Driveshaft + hub-bolt block (all four corners)

- **Front axle shafts:** family **5Q0407271 (LH) / 5Q0407272 (RH)** —
  verified variant 5Q0407271AP for the Mk7/7.5 Golf R LH. Outer joint =
  fixed-ball (Rzeppa) CV into the hub; inner joint = plunging tripod into
  the transmission/bevel-box flange.
- **Rear axle shafts:** family **5Q0501203 (LH) / 5Q0501204 (RH)** —
  verified 5Q0501203A for an RH rear. Inner = tripod/plunge into the
  rear-diff flange; outer = fixed-ball CV into the hub.
- **HUB (axle) BOLT — resolved from a workshop-grade source:** the MQB
  front hub/axle fastener is a **single-use 12-point stretch bolt,
  M16×1.5×70, PN WHT 005 437 (revised WHT 005 437 A)**, torqued **200 Nm +
  180°** for the standard non-ribbed bolt (technique: 200 Nm off the
  ground, then the 180° turn with the wheel on the ground). Confirmation:
  VW workshop-manual spec cited on Audi-Sport.net — *"Drive shaft to wheel
  hub 'twelve-point head bolt without ribbing' – Use new bolt 200 Nm +
  180°."* Two variant bolts exist and give different specs — a ribbed head
  takes 70 Nm + 90°, and a 12-point no-washer variant 70 Nm + ¼-turn — but
  the correct current Golf R spec is **200 Nm + 180°, single-use
  (TTY-behaviour, do not reuse).** The Mk7 R **rear** axle bolt is
  likewise 200 Nm + 180° (VWVortex Mk7 R rear wheel-bearing DIY).
  `[Audi-Sport]` `[Audi-Sport]`
- **Driveshaft-to-flange (inner CV) bolts:** triple-square (12-point),
  **renew on assembly**; known to loosen (community fits blue Loctite and
  re-checks after track use). Exact Nm from a primary source **NONE
  FOUND** (forum figures ~60–70 Nm for related cars are unverified).
  `[R32OC]`
- **Boot kits / clamps / circlips / flange gaskets:** available as
  joint-specific kits (outer CV boot kit, inner tripod boot kit + clamps);
  row-level OE PNs **NONE FOUND** for this exact car.

## Failure symptom → diagnosis → fix chains

- **(a) No/reduced rear drive + understeer / one-wheel peel → strainer
  clogged or pump dead.** DTCs seen (JCR fault table): **P16671** (pump
  for Haldex clutch — internal system fault), **P16668** (pump mechanical
  failure, intermittent), **P16666** (pump open circuit), **P16670** (AWD
  mechanical failure — pump and/or transfer box), **C111307** (mechanical
  malfunction, "typically blocked pump, clean out and relearn or possible
  transfer-box fault"); older labels throw 00448-type pump/basic-setting
  faults. Diagnosis: scan J492; log pump current & duty; inspect drained
  oil (black/gunky = overdue) and the strainer gauze; run the engagement
  test on rollers. **Fix chain, cheapest-first:** (1) fluid + strainer
  clean + pump relearn (~£150–£300 indie); (2) pump replacement 0CQ598549
  + fluid + relearn (~£400–£700 parts+labour; note some early cars had
  pumps replaced under warranty with "a newer revision pump"); (3) full
  coupling/RDU replacement if the clutch/diff is damaged (£1,000–£2,000+).
  `[jcr-leeds]`
- **(b) 4WD warning after water crossing / washing → J492 connector /
  water ingress.** Fault: **01324 – J492 No Communications** (+
  ABS/gateway knock-on codes). Fix: inspect and dry the connector and
  module seating; repair corroded pins; if the module is dead, repair
  (haldexrepairs.co.uk) or replace with 0CQ907554J and code to the car.
  `[Haldex Repairs]`
- **(c) Vibration / drone at speed → propshaft centre bearing (or perished
  flex disc).** Confirm: check the centre bearing for play/perished rubber
  and the flex disc for cracks. Fix options: OE shaft-only bearing
  replacement is awkward, so use an aftermarket carrier/bearing kit (JXB)
  or RacingLine alignment brackets; replace flex disc 5Q0521307 if
  cracked.
- **(d) Clunk on drive take-up → prop flex-disc / flange bolts / RDU or
  subframe bushes.** Check the flex disc and the 3-bolt flange joints
  (renew stretch bolts N10329102 / WHT005179), and the rear-diff/subframe
  bushes (5Q0505145E; performance inserts from CTS / 034 / Powerflex).
  Re-torque flange bolts.
- **(e) Rear diff whine → bearing / oil-starvation history.** Documented:
  worn or broken crown-wheel teeth rattling in the case
  (golfmk7/VWVortex — "teeth had worn down and some had broken").
  Diagnosis: drain and inspect for metal; a whine that tracks road speed.
  Fix: service the oil early if caught in time; if teeth are damaged,
  replace the RDU (0BR525010x) — no economical internal repair.
- **(f) Clicking on full lock → outer CV joint.** Clicking on lock under
  load = worn outer CV, usually following a split boot. Fix: re-boot
  early; replace the joint/shaft (5Q0407271/272 front) if worn.
- **(g) Overheat derate on track → temperature-protection behaviour.** The
  controller opens the clutch and reverts the car to FWD when Haldex oil
  gets too hot (community reversion threshold ~100 °C on earlier gens),
  producing front wheelspin. Mitigation: fresh fluid (annually for track
  use), let the system cool, and avoid sustained maximum pump duty; some
  tuners raise/monitor the temperature limit via aftermarket controllers.

## Parts table

(Transcribed from the PDF's pipe-delimited table; columns as in the PDF.)

| name | oem_part_number | qty | parent assembly | sub-assembly | material | torque (Nm + angle + TTY/replace?) | fitted-position note | known failure modes | source (category) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Haldex Gen 5 AWD coupling (AOC), complete | 0BR525554 / 0BR525554A | 1 | rear final drive assembly | Haldex coupling | cast-alloy housing + steel clutch | NONE FOUND | bolts to front face of RDU, ahead of rear diff | clutch wear, pump/strainer failure, overheat derate | vendor eBay / dealer FCP Euro |
| Multi-plate wet clutch pack | NONE FOUND (not sold separately) | 1 | Haldex coupling | clutch stack | interleaved steel/friction discs | n/a | inside input drum | wear from overheating/high duty | BorgWarner knowledge library (primary) |
| Annular working piston | NONE FOUND | 1 | Haldex coupling | hydraulic actuator | steel | n/a | applies axial load to plate stack | seal wear | BorgWarner knowledge library (primary) |
| Centrifugal electro-hydraulic pump (pre-charge pump) kit | 0CQ598549 | 1 | Haldex coupling | CEH pump | alloy body + BLDC motor | mounting bolts 9.5 Nm (renew) | mounts on coupling face | strainer clog → pump death | dealer ECS/FCP; indie JCR; BorgWarner |
| Pump seal + O-ring + bolt kit | 0CQ598305 | 1 | Haldex coupling | pump seals | rubber/steel | bolts 9.5 Nm (renew) | between pump & coupling | leaks if reused | indie JCR; dealer catalogue |
| Strainer gauze / basket | NONE FOUND (integral to pump) | 1 | Haldex coupling | pump inlet | wire/plastic mesh | T10 screws | on end of CEH pump | clogs with debris (primary Gen5 failure) | indie JCR; forum VWVortex |
| AWD control module J492 | 0CQ907554J (supersedes 0CQ907554H) | 1 | Haldex coupling | controller | plastic housing / PCB | 2× ~10 mm bolts | bolts to coupling; coded to car | water ingress/connector corrosion, 01324 no-comm | dealer ECS; indie haldexrepairs |
| Haldex drain plug | N 910 827 01 | 1 | Haldex coupling | drain | steel, 8 mm hex | 32 Nm + new crush washer | lowest point of coupling | strip if over-torqued | indie JCR; forum VWVortex |
| Haldex fill plug | N 902 818 02 | 1 | Haldex coupling | fill/level | steel, 5 mm hex | 15 Nm + new crush washer | side fill/level | — | indie JCR; forum VWVortex |
| Haldex fluid | G 060 175 A2 (850 ml) | 1 (≈650–700 ml used) | Haldex coupling | fluid | synthetic Haldex oil | n/a | coupling circuit | degrades fast (no filter) | dealer ShopDAP/ECS; NHTSA chart; indie JCR/haldexrepairs |
| Rear final drive unit (RDU) | 0BR525010Q (family 0BR525010/B/G/M/Q; later supersession 0CQ525010x) | 1 | rear axle | differential | cast alloy | NONE FOUND | subframe-mounted; Haldex bolts to its front face | tooth/bearing wear, output-seal seep | vendor eBay; salvage redlineautoparts |
| Rear diff drain/fill plug | N 90 281 802 | 2 | RDU | plugs | steel | ~30 Nm (verify) | drain + fill | — | vendor WCT/034; NHTSA chart |
| Rear diff fill plug (alt) | N 91 082 701 (M10×1×10) | 1 | RDU | plug | steel | ~30 Nm (verify) | fill/level | — | vendor ShopDAP |
| Rear diff fluid | G 052 145 S2 (75W-90 GL-5) | ~0.9 L | RDU | fluid | synthetic gear oil | n/a | diff circuit | whine if starved | dealer ECS/ShopDAP; NHTSA chart |
| Two-piece propshaft | 5Q0521101 (AB/AG/AJ/AT/BA/BJ) | 1 | driveline | propshaft | steel tube + rubber flex disc | flange NONE FOUND | bevel box → Haldex | centre-bearing wear, flex-disc crack | dealer parts.vw.com; vendor desshelleyshafts |
| Propshaft rear flex disc ("donut") | 5Q0521307 | 1 | propshaft | rear coupling | rubber/steel | NONE FOUND | rear (diff) end | perish/crack → clunk & vibration | forum VWROC; vendor (Febi/Meyle) |
| Propshaft centre support bearing | NONE FOUND (OE shaft-only; aftm kits) | 1 | propshaft | centre bearing | rubber/steel | 2 bolts NONE FOUND | mid-shaft | wear → vibration/drone | vendor JXB/RacingLine; forum VWROC |
| Flex-disc / flange bolts | N 10329102 ; WHT 005 179 | 6 | propshaft | flange bolts | steel (stretch) | NONE FOUND (renew) | front & rear flanges | shear if reused | forum VWROC (citing 7zap) |
| Front axle shaft LH | 5Q0407271 (e.g. 5Q0407271AP) | 1 | front axle | driveshaft | steel; tripod inner + ball outer | hub bolt 200 Nm + 180° | LH front | boot split, outer CV click | vendor eBay/oneloveauto; dealer |
| Front axle shaft RH | 5Q0407272 | 1 | front axle | driveshaft | steel; tripod inner + ball outer | hub bolt 200 Nm + 180° | RH front | boot split, outer CV click | vendor eBay; dealer |
| Rear axle shaft LH | 5Q0501203 (e.g. 5Q0501203A) | 1 | rear axle | driveshaft | steel; tripod inner + ball outer | hub bolt 200 Nm + 180° | LH rear | boot split, CV click | vendor eBay |
| Rear axle shaft RH | 5Q0501204 | 1 | rear axle | driveshaft | steel; tripod inner + ball outer | hub bolt 200 Nm + 180° | RH rear | boot split, CV click | vendor eBay |
| Front/rear hub (axle) bolt | WHT 005 437 (rev WHT 005 437 A); 12-pt M16×1.5×70 | 4 | hub | axle bolt | steel (stretch, single-use) | 200 Nm + 180° (never reuse) | one per corner | over-torque/reuse failure | forum Audi-Sport (workshop-manual spec); dealer supersession |
| Driveshaft-to-flange (inner CV) bolts | NONE FOUND (triple-square, renew) | 12 | axle | inner CV bolts | steel | NONE FOUND (~60–70 Nm forum, unverified) | at diff/box flanges | loosen on track | forum golfmk7/r32oc |
| Rear subframe (cradle) | 5Q0505235E / 5Q0505235J | 1 | rear axle | subframe | steel (alu post-~2019) | NONE FOUND | carries RDU + arms | bush wear → clunk | dealer parts.vw.com |
| Rear diff / subframe mounting bush | 5Q0505145E ; 5Q0198037A/B | var | rear subframe | bushes | rubber | NONE FOUND | diff-to-subframe & subframe-to-body | wear → clunk/vibration | vendor Powerflex/awesomegti |

## Exploded-diagram / dimensioned-drawing URLs

- **7zap propshaft & rear final-drive parts diagram (group 521):**
  https://volkswagen.7zap.com/en/rdw/golf+variant+4motion/golf/2016-763/5/521-521000/#9
  — dealer catalogue (may be Cloudflare-blocked).
- **BorgWarner *Next Generation AWD Actuators* PDF** (GenV/VI cutaways,
  piston-drum cross-section with centrifugal lever, pressure-vs-speed
  graph):
  https://www.borgwarner.com/docs/default-source/default-document-library/next-generation-awd-actuators.pdf
  — BorgWarner primary.
- **BorgWarner GenV AWD coupling press release:**
  https://www.borgwarner.com/newsroom/press-releases/2019/05/28/cutting-edge-driving-experience-supported-by-borgwarner-s-genv-awd-coupling
  — BorgWarner primary.
- **JCR Leeds Gen 5 service guide** (coupling cutaway illustrations,
  strainer photos, VCDS relearn screenshot, fault table):
  https://jcr-leeds.com/haldex-servicing-gen5/ — independent specialist.
- **VW SSP 891143C (2014 Golf)** — confirms Haldex Gen 5, "drive pinion
  for rear final drive," rear axle differential, J492:
  https://www.vaglinks.com/Docs/SSP/VWUSA.COM_SSP_891143C_2014_Golf.pdf
  — VW SSP primary. (SSP 515, "The Golf 2013 – Running Gear and
  Four-wheel Drive," is the document most likely to hold the numeric ratio
  table.) `[vaglinks]`
- **oempartsonline Golf R axle & differential tree:**
  https://vw.oempartsonline.com/v-2017-volkswagen-golf-r--base--2-0l-l4-gas/suspension--axle-and-differential
  — dealer catalogue.

## Source disagreements / open flags

- **Rear final-drive & bevel-box numeric ratios:** only the
  equal-and-opposite matching *principle* is confirmed; exact MQB tooth
  counts are **not verified** from a VW primary source (SSP 515 likely
  holds them). The older transverse TT/S3 example (17-tooth pinion /
  27-tooth output ≈ 1.588) is **not confirmed** for the MQB unit — do not
  treat it as this car's figure. `[JustAnswer]`
- **Propshaft flange torques (front to bevel box, rear to diff): NONE
  FOUND** from a VW primary source. The circulating "55 Nm" is a
  longitudinal Audi C6 RS6 figure and is rejected. Pull from erWin repair
  group 39.
- **Rear diff plug torque:** ~30 Nm assumed; not primary-sourced.
- **Driveshaft-to-flange (inner CV) bolt torque: NONE FOUND** primary;
  forum ~60–70 Nm unverified.
- **Haldex fluid supersession G 055 175 A2 → G 060 175 A2:** treated as
  correct for the Mk7 by strong community consensus; a formal VW TPI
  documenting the supersession was not obtained.
- **Rear-diff PN family: 0BR525010x** confirmed for the pre-facelift DSG
  Mk7 R; **0AV525xxx** appears only as an older cross-reference
  (aftermarket LSD marketing uses "0AV" loosely); **0CQ525010x** is the
  newer supersession. Haldex clutch unit itself is 0BR525554/A.
- **Hub-bolt variant caution:** three bolt types share the same location —
  non-ribbed 200 Nm + 180° (correct for the Golf R, WHT 005 437), ribbed
  70 Nm + 90°, and a 12-point no-washer variant 70 Nm + ¼-turn. Verify the
  physical bolt fitted before torquing.
- **Clutch-pack disc count / friction material** for the VAG Gen 5 unit:
  **NONE FOUND** in published material.
- **Carried-forward R1–R5 open flags (not resolved here, for
  continuity):** cam-carrier torque; VVT phaser range attribution; Gen3 DV
  revision; intake-manifold revision by VIN; DI rail exact PN; G247
  suffix; exhaust-flap V-designation; fuel tank 55 vs 60 L; DQ250
  mechatronic PN (02E927770AS vs 02E325025AS); 0CQ vs 0CN bevel-box
  family; DQ250 gear ratios forum-only; mount/driveshaft-flange torques
  NONE FOUND.
