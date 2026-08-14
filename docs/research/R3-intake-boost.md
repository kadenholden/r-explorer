# R3 return — Intake, boost & the P2015 system

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope per the return's own header: VW Golf R Mk7
(2014, pre-facelift) · EA888 Gen 3 2.0 TSI · CJXC (CJXB/CYFB North
America) · IS38 turbo · DQ250 6-speed wet DSG.

## TL;DR

- The intake manifold on this engine is the **06L133201-series** (plastic,
  twin-shell, plastic-welded, with integral tumble/charge-motion flaps, the
  N316 flap actuator and the G336 potentiometer) — **NOT the 06K133201**
  number assumed in the brief (that is the throttle-flange gasket family,
  06K133073). The best-documented CJXC-fit dealer revision is
  **06L133201FP**; flap internals are not separately serviceable except
  G336, so P2015 is fundamentally a manifold-level repair or an adaptation
  problem.
- **P2015 sets by two mechanisms, both relevant to this car:** (1)
  carbon/mechanical binding of the flaps, and (2) the ECU failing the
  end-stop plausibility check after the walnut blast + EML clear disturbed
  and de-adapted the flap system. Mechanism (2) is fixed with **no new
  parts** by re-running the **intake-flap Basic Setting/adaptation (VCDS
  Group 142 or the UDS G336 guided adaptation)**, which cycles the flaps
  and relearns the closed/open end stops.
- The IS38 (IHI RHF5) turbo family spans revisions **06K145702H/J/M/N,
  06K145722A/H/T, 06K145874F/N** (Golf R most commonly shipped
  **06K145702J / 06K145874F**); the electric wastegate actuator (VW
  "charge pressure actuator" V465) must be mechanically pre-set (rod to
  contact, then **1.5 turns tighter per APR**) and then stop-learned in
  VCDS: Basic Settings → **"First Adaptation of charge pressure actuator"
  (IDE04304)** after any turbo/actuator swap, or the car throws **P2563
  (Turbocharger Boost Control Position Sensor Circuit – Implausible
  Signal) / EPC**.

## Key findings

### Designation corrections vs. the brief (verified against SSP 606 and dealer catalogues)

- **Intake manifold: 06L133201-series, not 06K.** The 06K133201 in the
  brief maps to the throttle-body/intake-flange gasket family (06K133073),
  not the manifold casting.
- **Flap actuator is N316** (intake-manifold flap air-flow control
  valve/motor); the **position sensor is G336** (potentiometer). "V157" is
  the older PQ-platform TDI designation; on this MQB petrol engine SSP 606
  and the VW fitting-location list call the actuator **N316**. Both are
  integral to the plastic manifold.
- **Two distinct "MAP" sensors: G31** = charge-pressure sender in the pipe
  between intercooler and throttle (Bosch, VW **06K906051E**); the
  manifold-side sensor is the combined **GX9 module = G71 (intake-manifold
  pressure) + G42 (intake-air temperature)**.
- **The electric wastegate actuator is VW "charge pressure
  actuator/positioner V465"** — a DC-motor electric actuator; there is no
  vacuum N75 solenoid on this engine.
- **The diverter/recirculation valve is N249** (turbocharger air
  recirculation valve), electric, mounted on the compressor housing.

### How this system works (air path + closed loops)

Fresh air enters the **airbox (5Q0129607-series)** through the front
duct/snorkel, passes the panel filter, and flows through the turbo
inlet/"muffler" pipe to the **IS38 compressor**. Compressed charge exits
into the plastic **turbo-outlet pipe**, down to the front-mount
**air-to-air intercooler (5Q0145803-series)**, then up the cold-side
charge pipe to the **throttle body (J338/GX3)** and into the **06L133201
manifold**. Inside each runner is a **tumble flap** on a common shaft; the
**N316** DC actuator drives the shaft and **G336** reports the angle. At
idle/low load the flaps close the lower part of each port to raise air
velocity and create tumble (better mixing, stable idle, lower emissions);
above a load/RPM threshold they open for maximum flow. The ECU (J623)
runs a **closed loop**: it commands a flap position, reads G336, and
compares to the learned end stops. If measured travel does not match the
adapted stops (carbon binding, broken linkage, OR post-service loss of
adaptation), it sets **P2015 (18447) – Intake Manifold Runner/Flap
Position Sensor Bank 1: Implausible Signal**.

Boost is regulated by the **electric wastegate**: the ECU positions the
V465 actuator (closed-loop on charge pressure via G31 and the manifold
GX9/G71), so there is no vacuum N75 solenoid. On lift-off the ECU opens
the **N249 electric recirculation (diverter) valve** to vent compressor
pressure back to the inlet, preventing surge. Because the wastegate is
electric and position-referenced, the actuator's mechanical rod length
and its learned electrical end stops must agree — hence the mandatory
stop-learn after any turbo or actuator replacement.

**Why P2015 after a walnut blast:** removing the manifold (and any knock
to the flap linkage), plus clearing the ECU during the EML reset, can
wipe or invalidate the flap end-stop adaptation. On restart the ECU sees
flap travel outside the (now-default/implausible) learned window and sets
P2015 even though the hardware is fine. The correct remedy is to re-run
the **intake-flap adaptation/Basic Setting**, which cycles the flaps and
relearns the closed and open stops.

## Parts table

Transcribed from the return's pipe-delimited table. Format (the return's
own): name | oem_part_number | qty | parent assembly | sub-assembly |
material | torque | fitted-position | known failure modes | source.

### Intake manifold & P2015 system

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Intake manifold assembly (Gen3 EA888, CJXC) | 06L133201FP (CJXC-fit; supersedes 06L133201T/CM/EM/FA) | 1 | Intake system | Manifold casting | Glass-filled polyamide (two shells, plastic-welded) | Manifold-to-head bolts NONE FOUND (exact Nm; manual RG24 p.240 not extractable) — generic M6=10 Nm | Bolts to cylinder head intake face | Flap shaft seizes from carbon; runner-flap failure; P2015 | dealer catalogue (parts.vw.com, ecstuning 06L133201FP); workshop manual (Scribd 465533887) |
| Intake manifold (later supersession, incl. gasket+solenoid+sensor) | 06L133201FR (supersedes 06L133201FE) | 1 | Intake system | Manifold casting | Polyamide | as above | Later fitment; catalogue text "Includes: Gaskets, Solenoid & Sensor" | same | dealer catalogue (parts.vw.com 06L133201FR) |
| Tumble/charge-motion flap shaft + flaps | NONE FOUND (not sold separately) | 1 set | Intake manifold | Flap internals | Composite flaps on steel shaft | n/a | Inside runners | Carbon binding; worn bushings; broken linkage | vendor (tomorrowstechnician.com); workshop manual |
| Flap return spring / end-position stops | NONE FOUND (not sold separately) | 1 | Intake manifold | Flap internals | Spring steel | n/a | External linkage on manifold | Spring fatigue; stop wear → adaptation drift | vendor (tomorrowstechnician.com) |
| Intake manifold flap actuator/motor – N316 | NONE FOUND separately (integral; supplied with manifold) | 1 | Intake manifold | Actuator | DC motor + gear train | Mounting NONE FOUND | On manifold end | Motor stall/gear wear → P2015 | SSP 606 (Scribd 687811792); Ross-Tech wiki P2015 |
| Intake manifold runner position sensor – G336 | serviceable separately (bend-tab retained); standalone PN NONE FOUND (VW sells with manifold) | 1 | Intake manifold | Position sensor | Potentiometer | Push-fit, bend-aside retaining tabs | "Bend aside retaining tabs to allow pulling potentiometer out of intake manifold" | Wear/erratic signal; rare factory-defect on new manifolds → P2015 persists | workshop fitting-location list (vwts.ru); go-parts P2015 |
| Manifold-to-head gasket(s) | supplied with 06L133201FR ("Incl. Intake Manifold Gasket"); separate service gasket PN NONE FOUND | 4 (per-runner) | Intake manifold | Gasket | Rubber/elastomer | replace when disturbed | Manifold-to-head face | Hardening/leak → lean codes | dealer catalogue (parts.vw.com) |
| Injector cushion/seal rings (seat at head, adjacent) | WHT part family (verify) | 4 | Fuel rail/head | Injector seals | PTFE + support ring | per injector procedure | Injector-to-head, adjacent to manifold | Leaks after R&R | workshop manual (Scribd 465533887, §5.4) [link chip: ECS Tuning + 2] |

### Throttle body

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Throttle body module – J338 / GX3 | 06L133063-series (exact CJXC PN NONE FOUND; verify by VIN) | 1 | Intake | Throttle | Aluminium + plastic, drive-by-wire | Bolts NONE FOUND (RG24 p.241 not extractable) — M6 class ~7–9 Nm indicative | Between cold charge pipe and manifold | Carbon on plate; sticky idle; actuator wear | dealer catalogue; workshop manual (§4.3) |
| Throttle body gasket | 06K133073 | 1 | Throttle | Gasket | Elastomer/metal | replace when TB removed | TB-to-manifold | Leak after R&R | vendor (ngpracing 06K133073) |

### IS38 turbocharger

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Turbocharger IS38 (IHI RHF5), Golf R OEM | 06K145702J / 06K145874F (also 702H/702M/702N; 722A/722H/722T; 874N by revision) | 1 | Turbo | CHRA + housings | Cast iron turbine housing, alloy compressor housing | Turbo-to-head nuts 25 Nm (M8) | Bolts to integrated exhaust manifold on head | Wastegate rattle; journal-bearing/compressor-wheel failure on tuned/oil-starved cars | dealer/vendor (darksidedevelopments, maperformance); vendor DIY (fcpeuro) |
| Compressor wheel | part of CHRA; standalone PN NONE FOUND | 1 | Turbo | CHRA | Aluminium | n/a | Compressor housing | Wheel failure on overspeed | vendor (Unitronic "Project IS38": 45.2 / 58.0 mm inducer/exducer) |
| Turbine wheel | part of CHRA; standalone PN NONE FOUND | 1 | Turbo | CHRA | Inconel-type cast | n/a | Turbine housing | Shaft play; rattle | vendor (Unitronic: 47.4 / 54.7 mm) |
| Journal bearing (standard IS38) | part of CHRA | 1 | Turbo | CHRA | Plain journal | n/a | Center housing | Oil-starvation wear on tuned cars | vendor (mygolfmk7.com) |
| Electric wastegate actuator (V465 charge pressure actuator) | 06K145725T (cross-ref 06K145614G HANON) | 1 | Turbo | Actuator | DC motor + rod | Adjust rod, then VCDS stop-learn; SSP: actuator must be replaced after loosening the rod nuts | On compressor side, rod to wastegate lever | Rattle; seized rod; P2563/EPC | SSP 606 (Scribd 687811792); vendor (shopdap 06K145725T) |
| Wastegate flap + lever/link | part of turbine housing | 1 | Turbo | Wastegate | Steel | n/a | Turbine housing | Worn eye/link play → rattle & P0299 | TSB (NHTSA SB-10052519); forum (vwroc) |
| Turbo oil feed line | 06K145735-series (verify) | 1 | Turbo | Lubrication | Steel/braided | Fitting bolts 9 Nm (8 mm triple-square); O-ring, NOT banjo, on turbo side | Head oil gallery to turbo | Coking/blockage → bearing failure | vendor DIY (fcpeuro); seals WHT-006-113 ×2 |
| Turbo oil return line | 06K145757-series (verify) | 1 | Turbo | Lubrication | Steel + hose | Bolts 9 Nm | Turbo to block | Leak/gasket | vendor DIY (fcpeuro); gasket WHT-006-112 |
| Turbo coolant feed line | 06K121497-series (verify) | 1 | Turbo | Cooling | Steel | Fitting bolts 9 Nm; O-ring, NOT banjo | Coolant to turbo | Leak | vendor DIY (fcpeuro); seal WHT-006-114 |
| Turbo coolant return line | 06K121496-series (verify) | 1 | Turbo | Cooling | Steel + hose | 9 Nm (T30) | Turbo to coolant circuit | Leak | vendor DIY (fcpeuro); seal WHT-006-124 |
| Turbo-to-downpipe joint | V-band clamp; gasket 5Q0253115B | 1 | Turbo/exhaust | Clamp | Steel V-band | 6 mm hex locking bolt (Nm NONE FOUND) | Turbine outlet to downpipe | Leak if under-torqued | vendor DIY (fcpeuro) |
| Turbo heat shield | 06K145535-series (verify) | 1 | Turbo | Shielding | Stamped steel | small bolts NONE FOUND | Over turbine housing | n/a | dealer catalogue |

### Diverter / recirc valve

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Turbocharger air recirculation valve – N249 | 06H145710-series (Gen3 turbo-mounted electric; Gen3-correct rev letter — see flag) | 1 | Turbo | Recirc valve | Plastic body, electric solenoid + piston/diaphragm | 3 × M6 screws, 4 mm hex, 9 Nm | On compressor housing | Torn diaphragm (early revs), cracked plastic, electrical fault → P0299/P0033 | SSP 606; vendor (fcpeuro, ecstuning, ctsturbo) |

### Charge-air / boost plumbing

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Turbo outlet pipe (hot side, turbo→IC) | 5Q0145770-series (e.g. 5Q0145770A) | 1 | Charge-air | Pipe | Plastic | clamps NONE FOUND | Turbo compressor to intercooler | Coupler blow-off under boost; pancake/muffler area leaks | dealer/vendor (ebay 5Q0145770A; ARM, CTS) |
| Cold-side charge pipe (IC→throttle) | 5Q0145762-series (verify) | 1 | Charge-air | Pipe | Plastic | clamps NONE FOUND | Intercooler to throttle body | Coupler failure; cracks | vendor (APR MS100194 replaces it); dealer catalogue |
| Silicone/rubber couplers | NONE FOUND (individual PNs) | several | Charge-air | Couplers | Reinforced rubber | n/a | At each pipe joint | Cracking, blow-off | vendor (HPS, ARM) |
| Spring/constant-tension clamps | NONE FOUND (individual PNs) | several | Charge-air | Clamps | Spring steel | n/a | At couplers | Loss of tension | vendor |
| Intercooler (front-mount, air-to-air) | 5Q0145803-series (S/P/L → AA → AE supersessions; Golf R/S3/GTI shared) | 1 | Cooling | Charge-air cooler | Aluminium core, plastic end tanks | mounts NONE FOUND | Front lower | Condensation → misfire in cold/humid; tank cracks | dealer catalogue (parts.vw.com 5Q0145803AE); vendor (urotuning) |

### Air intake

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Airbox assembly (with element) | 5Q0129607AC (supersedes 5Q0129607AG) | 1 | Air intake | Airbox | Plastic | clips/bolts NONE FOUND | LH engine bay | Cracks; loose lid → unmetered air | dealer catalogue (parts.vw.com 5Q0129607AC) |
| Air filter element | 5Q0129620-series (verify exact) | 1 | Air intake | Filter | Paper/synthetic | n/a | In airbox | Clogging | dealer catalogue |
| Intake duct/snorkel + resonator | 5Q0129617/5Q0129618-series (verify) | 1 | Air intake | Duct | Plastic | n/a | Front to airbox | Cracks | dealer catalogue [link chip: Volkswagen Parts] |

### Sensors

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Charge-pressure sender – G31 | 06K906051E (Bosch) | 1 | Charge-air | Pressure sensor | Bosch piezo | screws NONE FOUND (~2–4 Nm class) | In pipe between intercooler and throttle | Carbon fouling; drift | dealer/forum (shopdap; audiworld); SSP 606 |
| Combined intake sender – GX9 (= G71 MAP + G42 IAT) | 04E906051-series / 06K-series (verify) | 1 | Intake manifold | TMAP | Bosch | push-fit | On manifold | Implausible signal P0106 | workshop fitting-location (vwts.ru); SSP 606 |
| Throttle-position senders G187/G188 | integral to J338 | 1 | Throttle | TPS | Dual potentiometer/Hall | n/a | In throttle module | Signal fault | SSP 606 [link chip: AudiWorld] |

## G336 spec block (voltage curve + pinout)

- **Technology:** potentiometer (SSP 606 / tomorrowstechnician: "A
  potentiometer is used to measure the flap position (Intake Manifold
  Runner Position Sensor G336)").
- **Voltage curve:** per Go-Parts' P2015 (VW CC 2.0T) guide, "Intake
  Manifold Runner Position Sensor (G336) Voltage — expected: Approximately
  4.5V when flaps are closed (idle) and decreases as flaps open" (a
  companion Golf write-up gives ~1.2 V fully open). On older PQ TDI
  references the "healthy" resting window is ~0.76 V and P2015 sets below
  ~0.38 V — that is the **TDI motor/sensor unit, NOT the Gen3 petrol**;
  use the 4.5 V-closed → ~1.2 V-open figures for this engine but treat as
  forum-grade until confirmed against Bentley. [link chip: MyTurboDiesel]
- **VCDS reporting:** flap position shown as **actual % vs specified %**
  in Group 142 / Adv. Meas. Values; G336 raw voltage also viewable.
  Adaptation shows "ADT/ADP OK" on success; a value stuck ~20–70%
  indicates a fault.
- **Pinout:** exact TSI G336 pinout NONE FOUND; the TDI V157/G336
  combined-unit 5-pin reference (motor + potentiometer + ground) is
  diesel-specific — do not apply to this petrol manifold.

## N316 (V157-equivalent) internals note

A DC motor driving a reduction gear train onto the flap shaft, with the
G336 potentiometer for position feedback. On the Gen3 petrol manifold the
motor and sensor are integral to the plastic manifold and only G336 is
(barely) separately serviceable via its bend-aside retaining tabs. VW
does not sell a standalone flap motor for this manifold — a stuck motor
means manifold replacement.

## IS38 revision-history subsection

- **Turbo cartridge/complete-unit PNs across revisions:** 06K145702H,
  06K145702J, 06K145702M, 06K145702N; 06K145722A, 06K145722H, 06K145722T;
  06K145874F, 06K145874N (Golf R Mk7 pre-facelift most commonly shipped
  **06K145702J / 06K145874F**). Fitment explicitly shared with **Audi S3
  8V and TTS Mk3** — leverage Audi catalogue data where VW pages are thin.
- **Wastegate actuator PNs:** 06K145725T is the VW-listed actuation
  motor; HANON/Cooper-Standard cross-refs include 06K145614G /
  06L145614B / 06K145614D. The **"722S" UK-market revision reportedly
  uses the IS20-style actuator** — a documented point of confusion;
  verify by connector orientation (IS38 connector faces the turbo
  outlet/motor side; IS20 faces the inlet/firewall).
- **Wheel specs:** per Unitronic's "Project IS38 Wagon – Part Two", "the
  IS38 features a 45.2mm / 58.0mm compressor wheel and a 47.4mm / 54.7mm
  turbine wheel." Standard bearing is a plain journal bearing
  (ball-bearing only on aftermarket units).
- **Rattle TSB:** VAG issued wastegate-rattle service actions historically
  under TSB 2033120 (and Audi 2033013/2033014) using anti-rattle
  clips/springs; a separate NHTSA-hosted VAG bulletin (SB-10052519)
  covers P0299 from excessive wastegate link-plate play requiring turbo
  replacement. On the IS38 specifically, wastegate/actuator-rod play
  causing a cold rattle on accel/decel is widely documented on
  golfmk7/vwroc; some regions fitted an anti-rattle wave-spring/clip.

## Boost-pipe / coupler / clamp map

Turbo compressor outlet → (turbo outlet pipe 5Q0145770A) → intercooler
hot-side inlet → intercooler → cold-side charge pipe (5Q0145762-series) →
throttle body. **Known weak points:** the turbo-muffler/"pancake" area
coupler and the charge-pipe-to-intercooler couplers are the classic MQB
boost-leak/blow-off locations under raised boost; OEM plastic pipes and
rubber couplers with spring clamps are the failure items that vendors
(CTS, ARM, HPS, APR) replace with 2.5" aluminium + silicone + T-bolt
clamps. [link chips: Top Gear Solutions; HPS Performance]

## Torque section

- **Turbo-to-head (integrated exhaust manifold) nuts (M8): 25 Nm**
  (vendor DIY, FCP Euro; corroborated ~26 Nm on 1.8T-era lists). Treat
  self-locking nuts as replace.
- **All turbo oil & coolant line fitting bolts: 9 Nm** (8 mm
  triple-square / T30). O-ring fittings on the turbo side — **NOT banjo
  bolts** on OEM MQB (banjo bolts appear only on aftermarket line kits).
- **Diverter/recirc valve N249: 3 × M6 (4 mm hex) at 9 Nm.**
- **Turbo-to-downpipe: V-band clamp**, 6 mm hex locking bolt (Nm NONE
  FOUND).
- **Generic table (verbatim from manual):** M6 = 10 Nm, M8 = 20 Nm,
  M10 = 45 Nm, M12 = 65 Nm. [link chip: Scribd]
- **Intake manifold-to-head bolts, throttle-body bolts, G31 screws,
  charge-pipe clamp torques: NONE FOUND** (manual RG24 pp.234–241 torque
  tables not extractable; Bentley Golf R spec book needed). Flag as OPEN.
- **TTY/replace rule:** manual states always renew self-locking
  bolts/nuts and any bolt tightened with a specified angle.

## Full VCDS procedure set (MQB/UDS, engine controller J623, selected by name)

All under [01-Engine]. MQB uses UDS so procedures are selected by name,
but **Group 142 still appears and remains current** for intake-flap
adaptation on 06K/06L TSI engines.

- **(a) Intake manifold flap OUTPUT/actuator test:** [Output Tests – 03]
  → "Intake Manifold Flap" — commands N316 to cycle so you can verify
  motion, motor and G336 response (Ross-Tech wiki P2015; go-parts).
- **(b) Intake flap ADAPTATION / Basic Setting (clears P2015 after
  cleaning/walnut blast):** Per Go-Parts' VW Golf P2015 guide,
  "[01-Engine] → [Basic Settings – 04] → Group 142 — This function is
  used to run an adaptation of the intake manifold flaps. It cycles the
  flaps from open to closed to allow the ECM to learn the end-stop
  positions." Run with the engine idling; on success it reports "ADT/ADP
  OK"; then key off ~60 s, restart, clear codes. On UDS/guided cars the
  equivalent is the **"Intake Manifold Runner Position Sensor – G336,
  checking the adjustment"** guided adaptation in ODIS. This relearns the
  end stops — the exact remedy for the post-walnut-blast P2015 scenario.
- **(c) Throttle valve adaptation:** [Basic Settings – 04] → "Throttle
  Body Adaptation" (a.k.a. "Throttle Valve Adaptation") after
  cleaning/removing the throttle body.
- **(d) Charge-pressure actuator (wastegate) stop-learn after
  IS38/actuator replacement:** First set the rod mechanically — per APR's
  "IS38 Wastegate Settings", turn the rod until the wastegate door just
  contacts the turbine housing, mark it, then "turn the rod one and a
  half times, tightening the wastegate" and tighten the jam nut. With key
  ON/engine as instructed, watch **Adv. Meas. Values → "Charge air
  pressure control valve uncond voltage sensor"** and adjust the rod
  until ≈ **3.6 V** (consensus window **3.5–3.9 V**; above ~3.9 V the
  adaptation aborts "for safety reasons"). Then [Basic Settings – 04] →
  **"First Adaptation of charge pressure actuator"** (newer VCDS:
  "Initial adaptation of charge pressure actuator"; ODIS/IDE =
  **IDE04304**). Adaptation stores lower stop **IDE03934** (~3.37–3.40 V)
  and upper stop **IDE03935** (~0.13–0.57 V); acknowledgment voltage
  **IDE00396** should sit ~3.4–3.6 V. Clears **P2563 – Turbocharger Boost
  Control Position Sensor Circuit – Implausible Signal / EPC**.
- **(e) Advanced Measuring Values to watch:** intake flap actual % vs
  specified % (Group 142 / "Intake Flap Set Point"); G336 voltage (4.5 V
  closed → ~1.2 V open); charge-air pressure specified **IDE00190** vs
  actual **IDE00191** (bar); charge-air pressure sensor unconditioned
  voltage **IDE03276** (G31); wastegate actual position **IDE03931** /
  specified **IDE03932**; "Charge air pressure control valve uncond
  voltage sensor" (wastegate acknowledgment).
- **(f) After DV (N249) or sensor replacement:** clear codes and re-run
  readiness; N249 is closed-loop and generally needs no adaptation, but
  confirm no P0299/P0033 and let readiness monitors reset. After any
  G336/manifold work, always re-run (b).

## CJXB vs CJXC note (this subsystem)

For intake/boost hardware the North American car and the rest-of-world
CJXC are effectively identical: same intake manifold family (06L133201),
same IS38 turbo family, same intercooler (5Q0145803), same N249/G31/GX9
sensors. The difference is calibration/rating and market emissions kit,
not intake hardware. Note the North American engine-code nuance: per FCP
Euro's Mk7 Golf R buyer's guide, "Peak power numbers for the
American-spec car come in at 292 hp and 280 lb-ft of torque," whereas the
VW UK press pack states "the version fitted to the Golf R produces 300 PS
from 5,500 to 6,200 rpm and 380 Nm"; Wikipedia's VW petrol-engine list
splits these as **CYFB (North America, 292 PS, lacks MPI/port
injection)** versus **CJXC/CJXA (Europe, 300 PS)** — i.e. "CJXB" as used
colloquially for the US car is, strictly, the CYFB/related NA code. Where
a PN is verified only against the US catalogue (parts.vw.com), the same
casting/revision applies to CJXC; treat those rows as such.

## Exploded-diagram / dimensioned-drawing URLs

- **Workshop manual (erWin EA888 Gen3, Ed. 12.2019)** exploded views RG21
  (turbocharging)/RG24 (mixture prep, intake manifold) — Scribd doc
  465533887; mirror
  pdfcoffee.com/engine-tfsi-ea888-gen3-service-manual-eng-pdf-pdf-free.html
  (intake manifold §4.1, charge-air system §3.1, hose connections §3.2,
  turbo §2, throttle valve module §4.3).
- **Audi SSP 606** (EA888 Gen 3 1.8/2.0 TFSI) — Scribd 687811792 — flap
  system, charge-air path, sensor cutaways
  (G31/GX9/G71/G42/N316/G336/N249/V465).
- **Dealer catalogue diagram trees:** vw.oempartsonline.com 2016 Golf R
  (fuel-system--intake / throttle-body / turbo-charger / intercooler;
  air-and-fuel-delivery--sensors / switches-solenoids-and-actuators).
- **IS38 teardown/wheel dimensions:** Unitronic "Project IS38 Wagon –
  Part Two"; mambatek IS38 wheel pages.

## Recommendations

1. **Model the manifold as 06L133201FP** (CJXC-fit) with integral N316
   actuator and separately-removable G336 potentiometer (bend-tab mount).
   Show the tumble flaps on a common shaft with the external return
   spring/linkage and end-stop, since these are the physical elements the
   adaptation relearns — this is the highest-fidelity choice for the
   P2015 fault-mode assembly. **Benchmark to change:** if a VIN/ETKA
   check shows the 2014 CJXC car actually carried an earlier casting
   (e.g. T/EM/FA) or the later FR, switch the modelled revision
   accordingly.
2. **For the P2015 fault-mode narrative in the model, depict BOTH
   triggers:** carbon-jammed flap (mechanical) and post-service
   end-stop-adaptation loss (electronic) — the latter is exactly this
   owner's scenario after the walnut blast + EML clear, resolved by Group
   142 / G336 guided adaptation, not parts. Represent the flaps
   mid-travel with the ECU "commanded vs measured" mismatch to make the
   fault legible.
3. **Model the IS38 as 06K145702J / 06K145874F** with the electric V465
   actuator and its adjustable rod + jam nut clearly visible (compressor
   45.2/58.0 mm, turbine 47.4/54.7 mm wheels), since the
   rod-set-then-stop-learn calibration is a headline feature of this
   system.
4. **Close the OPEN torque items** (intake-manifold bolts/sequence,
   throttle-body bolts, G31, charge-pipe clamps) against the **Bentley
   Golf R spec book** (NHTSA-hosted PDFs MC-10073690-2280 /
   MC-10122270-9999) or the un-truncated manual pages 234–241 before
   finalising any torque callouts on the model.
5. **Threshold:** do not print a numeric torque on the model for these
   four items until a workshop-manual or Bentley figure is obtained —
   leave "per WSM" placeholders.

## Caveats & open flags

- **Manifold PN precision:** 06L133201 has many revisions (N, T, CM, EM,
  FA, FP, FR…) shared across the whole Gen3 range (Golf
  R/GTI/S3/A4/A5/Arteon). FP is the best-documented Golf-R/Gen3 fit; FR
  is a later supersession that explicitly includes gasket + solenoid +
  sensor. Confirm the exact casting on a 2014 CJXC by VIN before
  ordering.
- **N316 vs V157 / G336 naming:** SSP 606 uses N316 for the petrol flap
  valve and G336 for the potentiometer; older Ross-Tech/TDI material uses
  V157. Both describe the same functional pair — label the MQB
  designation (N316) on the model.
- **Diverter valve revision for Gen3 — genuine source disagreement:** the
  "Rev D" 06H145710D piston valve is the classic EA888.1/.2 upgrade;
  multiple sources state Rev D does NOT fit EA888 Gen 3, and Gen3 cars
  shipped **06H145710C** (and later J). Confirm the Gen3-correct revision
  before modelling the DV internals.
- **Turbo oil/coolant lines are O-ring/bracket fittings at 9 Nm, NOT
  banjo bolts on OEM MQB; turbo-to-downpipe is a V-band, not nuts.** The
  brief's banjo-bolt assumption applies only to aftermarket line kits —
  flagged as a correction to the R3 scope.
- **G336 voltage curve** (4.5 V closed → ~1.2 V open) is forum-grade for
  the TSI; the 0.76/0.38 V figures circulating online are the TDI unit.
  Confirm against Bentley.
- **Do NOT trust aggregator torque charts** (e.g. Gumtree) — they
  returned inconsistent EA888 "generic" figures (40 Nm vs 60 Nm+angle
  head bolts) and are unreliable on this engine. [link chip: Gumtree]
- **Carried R1/R2 open flags (not resolved here, for continuity):**
  cam-carrier torque 8 Nm+90° vs 10/15/20 Nm generic; VVT phaser range
  attribution intake 30°/exhaust 60° vs inverse.
- **TSB numbers** for IS38 rattle vary by market/era (2033120 / Audi
  2033013-4 clip actions; SB-10052519 for P0299 link-plate play). Cite by
  category and verify the exact bulletin against the car's VIN/market.
- **Sourcing transparency:** several torque figures (turbo-to-head 25 Nm;
  all oil/coolant line bolts 9 Nm; N249 9 Nm) are vendor-DIY (FCP Euro)
  shop-verified values, not verbatim manual quotes — the manual's
  RG21/RG24 torque tables could not be extracted from the available
  mirror. Treat as strong indicative values pending Bentley/WSM
  confirmation.
