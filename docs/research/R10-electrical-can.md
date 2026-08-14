# R10 return — Electrical, CAN & sensors: 2014 pre-facelift VW Golf R Mk7 (5G, CJXC, DQ250, 4Motion)

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: electrical architecture, CAN/LIN topology,
ECU identity (MED 17.5.2 vs SIMOS 18 open question), gateway J533,
battery, lighting, harness failure points, and the full sensor/actuator
catalogue for the 2014 pre-facelift Golf R Mk7 (5G, CJXC, DQ250 DSG,
4Motion).

## TL;DR

- **The engine ECU is a Continental (Siemens VDO) SIMOS 18.1, part-number
  family 5G0906259 — NOT a Bosch MED 17.5.x.** ecufiles.com states
  verbatim: *"Volkswagen Golf 7 R 2.0 TSI was produced with CJXC engine
  and Siemens Continental Simos 18 ECU. The ECU production number is
  5G0906259F, and software number is SC800O3000000."* MED17.5.x is
  Bosch/older-era; the MED candidate is wrong for the R. (The S3 8V
  sibling uses 8V0906259.) [Ecufiles]
- The car is a pure **CAN + LIN architecture with no FlexRay**, with
  **Gateway J533 (5Q0907530 family)** as the hub routing between
  Powertrain, Convenience, Infotainment, Extended/driver-assist and
  Diagnostic CANs; the OBD-II port exposes only the Diagnostic CAN.
- The owner's **ACC heat-soak fault** is a well-documented Mk7 pattern.
  The pre-facelift R uses a **Bosch radar (J428)**; a real VCDS scan
  shows *"Part No SW: 5Q0 907 572 J HW: 3QF 907 572 … ACC BOSCH MQB"*
  with fault *"C1103 00 [009] [FAULT_ALIGNMENT_NOT_OK]"* — requiring
  VCDS/ODIS alignment after any disturbance. [Ross-Tech]

## Key Findings

### 1. ECU RESOLUTION (headline verdict)

- **ECU family/version: Continental SIMOS 18.1** (18.1/18.6 or 18.10
  sub-variants exist on siblings). Confirmed by tuner/primary sources —
  ecufiles.com and ziptuning.com list "CJXC + Siemens/Continental
  Simos 18, production number 5G0906259B/F"; APR and USP Motorsports list
  "Continental Simos 18" for the MQB 2.0T Gen3 R.
- **Hardware/part-number family: 5G0906259 (Golf R)** — e.g. 5G0906259B
  (software SC800H5100000) and 5G0906259F (software SC800O3000000). The
  **S3 8V uses 8V0906259** (e.g. 8V0906259K per an HPTuners S3 file).
  This prefix split is the key sibling-drift trap: R and S3 share the
  SIMOS 18 platform but carry different part-number prefixes.
  [ZipTuning + 2]
- **Why the MED candidate is wrong:** MED 17.5.x is Bosch and tied to the
  older PQ35/EA888 Gen1-2 era. Note a nuance for completeness: some
  databases (e.g. obdtotal.com) list the **Mk7 GTI also on Continental
  SIMOS 18.1 (5G0906259, calibration SC800F8400000)** rather than
  MED17.5.25 — so both the GTI and R can carry SIMOS 18.1 hardware with
  different calibrations. Either way, the R is **not** a MED17.5.x car;
  the "MED vs SIMOS" question resolves firmly to **SIMOS 18.1** for the
  CJXC R.
- **Tuning-protection/unlock reality:** SIMOS 18 is flashed over OBD
  (DirectPort/bench). Component/immobiliser protection means a used ECU
  from another variant (Skoda/GTI/S3) rejects Golf-R firmware until
  VIN/immo is unlocked online via ODIS and re-adapted; a bench mirror of
  the EEPROM is often required (multiple MHH Auto tuner threads).
  [Autoparts-24]

### 2. GATEWAY J533 + BUS TOPOLOGY

- **Gateway J533, part family 5Q0907530** (also 3Q0907530 variants). Real
  Golf 7 scans show "GW MQB High" as **5Q0907530M** and **3Q0907530Q/D**.
  Located under the dash near the DLC (driver footwell). On replacement,
  the installation list must be coded (VCDS gateway coding / direct
  coding); for driver-assist retrofits the gateway software index must
  support the Extended CAN bus. [VagCode]
- **No FlexRay on Golf 7** — pure CAN + LIN. The OBD-II port exposes only
  the **Diagnostic CAN (500 kbaud, ISO 15765-4, 11-bit)**, which reaches
  all modules through J533. (SSP 517's own PDF text could not be
  extracted directly — host is bot-blocked/JS-gated — but the topology is
  corroborated by VW's reused CAN self-study text (SSP 269/470), a
  documented real Golf Mk7 CAN case study (TOPDON), and Golf 7 OBD/CAN
  research on GitHub. Treat "no FlexRay on Golf 7" as HIGH confidence but
  not SSP-517-verbatim.)

#### BUS TOPOLOGY OVERLAY TABLE

Format: bus | VCDS addr | module | J-designation | physical location |
fitted on UK 2014 R

**Powertrain/Drivetrain CAN (500 kbit/s, high-speed):**

| Bus | VCDS addr | Module | J-designation | Physical location | Fitted on UK 2014 R |
| --- | --- | --- | --- | --- | --- |
| Powertrain | 01 | Engine | J623 (CJXC) | engine bay, intake side | fitted |
| Powertrain | 02 | Auto trans/DSG | J743 mechatronic | on DQ250 gearbox | fitted |
| Powertrain | 03 | ABS/ESC | J104 (MK100) | engine bay, hydraulic unit | fitted |
| Powertrain | 13 | ACC / distance regulation | J428 | front bumper centre | fitted (ACC option) |
| Powertrain | 15 | Airbags | J234 | centre tunnel under console | fitted |
| Powertrain | 22 | AWD Haldex | J492 | on rear final drive/Haldex | fitted (**R-specific**) |
| Powertrain | 44 | Steering assist (EPS) | J500 | on steering rack | fitted |
| Powertrain | A5 | Front camera / driver-assist | R242 (J1121) | windscreen behind mirror | optional (Lane Assist) |

**Convenience CAN:**

| Bus | VCDS addr | Module | J-designation | Physical location | Fitted on UK 2014 R |
| --- | --- | --- | --- | --- | --- |
| Convenience | 09 | Central electrics / BCM | J519 | left A-pillar/dash left | fitted |
| Convenience | 08 | Climatronic | J255 | behind centre console | fitted (5G0907044) |
| Convenience | 05 | KESSY | J518 | column/dash | fitted (keyless) |
| Convenience | 10 | Park/steer assist (PLA/OPS) | J791 | rear, near bumper | fitted (park pilot) |
| Convenience | 16 | Steering column electronics | J527 | steering column (carries G85) | fitted |
| Convenience | 17 | Instrument cluster | J285 | dash | fitted |
| Convenience | 42 | Door electronics driver | J386 | driver door | fitted |
| Convenience | 52 | Door electronics passenger | J387 | passenger door | fitted |
| Convenience | 46 | Central convenience | J393 | under dash | if fitted |
| Convenience | 55 | Headlight range/AFS | J745 | on headlamp/dash | fitted (xenon) |

**Infotainment CAN:**

| Bus | VCDS addr | Module | J-designation | Physical location | Fitted on UK 2014 R |
| --- | --- | --- | --- | --- | --- |
| Infotainment | 5F | Information electronics head unit | J794 | centre dash | fitted |
| Infotainment | 47 | Sound-system amplifier | J525 | luggage/dash | optional (premium audio) |
| Infotainment | 75 | Telematics | J949 | — | optional |
| Infotainment | A9 | Structure-borne sound (Soundaktor) | J869 | scuttle/firewall | fitted (R/GTI) |

**Diagnostic CAN:** J533 gateway (19) ↔ OBD-II DLC, driver footwell.

**LIN sub-buses off BCM J519 (from real Golf 7 scan):** wiper motor CU
J400 (5G2955119A), rain/light sensor G397 (5Q0955547), alarm interior
monitor G273 (5Q0951172), alarm horn H8 (5Q0951605). **LIN off gateway
J533:** alternator voltage regulator + battery monitor J367.

### 3. BATTERY + REGISTRATION

- **Factory battery for a UK R with start-stop: AGM, 68 Ah / 380 A
  (DIN), H6 size.** SSP 517 (quoted on golfmk7.com) lists, for cars WITH
  Start/Stop: *"59Ah/320A (DIN), H5 size, EFB … 69Ah/360A (DIN), H6
  size, EFB … 68Ah/380A (DIN), H6 size, AGM type."* The performance/S-S
  R takes the AGM. parts.vw.com confirms the R battery part: *"Part
  Number: 000915105FC … Vehicle Battery. 420 CCA … Fits Golf R (2015 -
  2019)."* (Part-number family **000915105**; note some CCA figures
  differ by market/rating — 380 A DIN ≈ 420 CCA SAE.) Battery monitor
  **J367** sits on the negative-terminal clamp, on LIN. [GOLFMK7]
  [Volkswagen Parts]
- **Registration/adaptation resolution (honestly):** VAG does **not** use
  BMW-style hard "registration" that immobilises a mismatched battery.
  However, when the battery or J367 is replaced, VW requires the new
  battery data to be adapted so the energy-management charging profile is
  correct. VCDS offers this via **19-Gateway → Adaptation** (nominal
  capacity, manufacturer/technology code = e.g. "Fleece" for AGM, serial
  number). A like-for-like same-capacity/technology swap will *run*
  without coding, but start-stop may misbehave and the charging profile
  stays sub-optimal until the old battery data is reset/adapted. VW TSB
  (Transaction 2053976 / 27-19-01) states the battery or J367 *"must be
  adapted to the vehicle. Failure to do so will compromise the operation
  of the charging system … The test plan can be found in AW19 Gateway >
  GF > adapt battery."* Jump-start points: the underhood positive post
  and a body earth stud (per owner's manual); the battery negative clamp
  carries J367 — do not clamp jump leads directly to the negative post.
  [VAG Coding] [nhtsa]

### 4. FUSE/RELAY MAPS

- Carriers: engine-bay **E-box / electronics box** (left of engine bay);
  the **dash-end fusebox** behind a flap on the driver side (right-hand
  end of dash on RHD cars — mirror-image vs LHD documentation); plus
  supplementary carriers under the dash and in the luggage area on
  optioned cars.
- Map sources: owner's manual (mirrored at vwgolf.org) + erWin fuse/relay
  assignment tables + SSP 517. Full verbatim per-fuse rows (SA/SB/SC
  engine-bay rows and SF interior rows): **NONE FOUND** extractable at
  required fidelity — structure documented; recommend pulling the erWin
  assignment table for the exact VIN.
- Main relays: terminal-30/15 supply relays in the E-box; fuel-pump
  control via **J538** (R4 fixed point); Motronic/engine supply relay
  **J271** family.

### 5. HARNESS SECTIONS + FAILURE POINTS

- Loom sections: engine-bay harness, engine harness, main/interior
  harness, door harnesses (LIN-based), roof harness, bumper/PDC/ACC
  pigtails, battery + earth cables. Main earth points at the
  A-pillar/E-box and body shell.
- **Known failure — Mk7 tailgate loom:** repeated flexing at the
  body-to-tailgate rubber conduit breaks wires, causing loss of reverse
  camera, number-plate lights, rear wiper, rear fog and
  central-locking/boot-release (VW dealers acknowledge it as a
  design-related issue; well documented across Golf generations). On the
  R this is the prime suspect for "reverse camera not opening / black
  screen" (B110231-type faults on VWROC/OBDeleven). [Stuartdalby]
- **Front-bumper ACC pigtail:** disturbing/unplugging it (bumper or
  grille removal) reliably triggers Front Assist/ACC faults needing
  recalibration.

### 6. LIGHTING + BULB CHART

- **Standard on UK pre-facelift R: bi-xenon headlights with LED DRL and
  dynamic cornering/AFS.** Euro R xenon+LED-DRL housing set is listed as
  **5G1998753D** (ShopDAP); associated parts: **D3S igniter 8K0941597E**,
  **AFS/auto-leveling module 3D0941329A** (ShopDAP/ECS). AFS control
  module **J745**; auto-leveling via axle height sensors. Housing base
  family 5G1941xxx. [ShopDAP]
- Rear lights (pre-facelift R): conventional bulb, dark-tinted (the
  facelift went full LED). Individual L/R inner/outer PN families:
  **NONE FOUND** verified.

**BULB CHART — pre-facelift R** (AutoInstruct + AGM Vision):

- Low/high beam (xenon): **D3S 35W**
- Cornering: **H7 55W**
- Front turn signal: **PWY24W / PY24W**
- Front position: integrated LED DRL
- Front fog: **H11 55W** (fogs are fitted in the R bumper)
- Brake light: **W21W** (some markets P21W) 21W
- Rear fog: **W21W** 21W
- Reverse: **W16W 16W** (note: one VWROC owner of a 2014 car found a
  P21W-type holder — verify per car)
- Rear indicator: **WY21W 21W**
- Number plate: **W5W 5W**
- High-level (3rd) brake: proprietary LED
- Interior map/dome: **W5W**; boot: **C10W**; glovebox: **W3W**

Known failures: xenon ballast/igniter death, AFS motor faults, headlamp
condensation, tail-light connector corrosion.

### 7. VCDS/DIAGNOSTIC NOTES

- Auto-scan: **UDS everywhere.** Long-coding vs adaptation split; on
  ~2018+ BCMs coding is via Adaptation not Coding. **SVM/online coding**
  needed for ABS (MK100) and infotainment; **component protection** is
  carried on the **infotainment head unit (5F)** and can also apply to
  the cluster/KESSY set on replacement. [Ross-Tech Wiki]
- Security-access codes (from primary sources): ABS basic setting uses
  **40168** — Ross-Tech wiki: *"[Security Access - 16] Enter 40168, to
  enable the basic setting … The Lateral Acceleration Sensor (G200) and
  Longitudinal Acceleration Sensor (G251) are calibrated at the same time
  using one operation."* ACC misalignment reset uses **14117** in
  Module 13 — golfmk7.com (2014 car): *"if you go Security Access 16 and
  type the code 14117 it will allow to perform the 'Reset in misalignment
  angle'."* [Ross-Tech Wiki + 2]
- Useful output tests for the app narrative (cross-referenced fixed
  points): radiator fan (R9), intake/charge flaps (R3), EPB (R8), Haldex
  pump (R6), DSG basic settings (R5).

### 8. FAILURE MODES (per node)

- **ACC radar heat-soak / intermittent "ACC/Front Assist not available"**
  (owner's live issue) — see highlighted-node section.
- Gateway J533 faults: rare; when they occur, look for water ingress.
- **BCM J519 water ingress via scuttle/plenum drain blockage** — a known
  Mk7 issue producing multiple electrical faults.
- Tailgate loom breakage (above).
- Xenon ballast death; wheel-speed sensor faults + reluctor-ring
  corrosion; door-lock module failure; KESSY antenna faults; **parasitic
  battery drain** (infotainment or gateway not entering sleep) — diagnose
  with a current-draw/sleep test and gateway installation-list check.

## ACC RADAR — HIGHLIGHTED NODE (owner's fault)

- Community evidence (VWROC "ACC Error" thread) shows *"ACC and Front
  Assist Not Available"* is a **catch-all** message. Documented root
  causes in that thread: **loose sensor mounting** (*"Investigation has
  revealed the sensor mounting is loose … Three hours needed for the
  recalibration"*), **misalignment while cornering against a
  wall/tunnel** (*"only when exiting the Tyne Tunnel northbound … the car
  throws up a fault"*), and — crucially — **unrelated drivetrain
  faults**: multiple owners' ACC errors traced to a faulty **cam
  adjuster/actuator** (fixed under warranty). One poster summarised:
  *"anything that decreases the performance of the engine in any way
  results in acc:error. The dist regulation module simply responds to any
  drivetrain issue with an error."* This is the mechanism to model in the
  app: the radar itself may be fine. [vwroc + 2]
- **Pre-facelift R radar = Bosch.** A real VCDS scan (Ross-Tech Forums
  36111) reads: *"Part No SW: 5Q0 907 572 J HW: 3QF 907 572 … Component:
  ACC BOSCH MQB … C1103 00 [009] [FAULT_ALIGNMENT_NOT_OK]."* Controller
  family **5Q0907572** (5Q0907572J/P); radar/sensor-housing family
  **5Q0907541** on pre-facelift. (The **5Q0907561** Continental unit is
  the **facelift** part — do not fit it to a pre-facelift R.) Adjustment
  via two screws behind the front badge/grille on pre-facelift.
  [Ross-Tech] [Partshaus Ltd]
- **Calibration after replacement/disturbance (fault C1103):**
  VAG-Coding.net: *"The perfect setting is 0.00. The tolerance is between
  -0.80 and 0.80 degrees … One turn of the adjustment screw is equivalent
  to 1 degree."* Ross-Tech Forums (resolved): *"Park the car at 120cm
  from the wall perpendicular to the wall (needs to be very precise).
  Then run calibrate radar in basic settings."* Procedure name:
  ACC/Front-Assist radar **basic setting / misalignment-angle
  calibration**. Pre-facelift cars can often be cleared with mechanical
  screw adjustment + basic setting; facelift generally requires ODIS with
  a calibration target. [VAG Coding + 2]

## HOW IT WORKS (narrative)

Gateway **J533** is the hub. It bridges the **Powertrain CAN**
(500 kbit/s, hard real-time: engine J623, DSG J743, ABS J104, Haldex
J492, EPS J500, ACC J428), the **Convenience CAN** (BCM J519, doors,
HVAC, cluster, park assist), the **Infotainment CAN** (head unit J794,
amp, telematics) and the **Diagnostic CAN** (the only bus on the OBD
port). UDS diagnostics reach every module through J533. The BCM **J519**
is a LIN master to its slaves (wiper motor, rain/light sensor, alarm
horn, interior monitor); the gateway hosts a LIN for the alternator
regulator and battery monitor **J367**, which drives energy management
(start-stop enable, charging profile). For **ACC braking**, the radar
J428 detects a target and sends a deceleration request over the
Powertrain CAN; the ESC J104 executes braking and the engine ECU J623
cuts torque — so any fault degrading engine performance (e.g. a cam
adjuster) makes J428 flag "ACC not available." That cooperation is
exactly why the owner's ACC message can appear even when the radar is
healthy.

## DIAGRAM / SOURCE-DOCUMENT LIST

- Ross-Tech wiki "VW Golf VII (5G/AU)" and per-address pages (module
  addresses, ABS/ESC and EPS basic settings, CAN Gateway
  transport-mode/coding): wiki.ross-tech.com.
- **SSP 517 "The Golf 2013 Electrical System"** — bus topology, energy
  management (hosts: carworklog.com, volkswagenclub.net, scribd; note
  bot-blocking on some).
- **SSP 516** (driver assist / ACC), **SSP 518/519** (infotainment).
- **vwgolf.org** mirrored owner's/repair manual — bulb chart, ACC and
  front-camera calibration, fuse/relay locations.
- **erWin** current-flow diagrams (fuse/relay assignment + connector
  pinouts) — recommended primary for VIN-exact fuse maps and pinouts.
- Ross-Tech reference scans (threads 24336, 36111/36116, 20137) and
  golfmk7.com/vwroc.com Golf R auto-scan threads for module part numbers.

## PARTS TABLE

(Transcribed from the PDF's pipe-delimited table. Format: name |
oem_part_number | qty | parent assembly | sub-assembly | material |
torque | fitted-position | known failure modes | source(category).)

| Name | OEM part number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source (category) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Engine ECU (Continental SIMOS 18.1) | 5G0906259B / 5G0906259F | 1 | powertrain electrics | ECU box | plastic/PCB | n/a | engine bay, air-box area | immo/component protection on swap | tuner (ecufiles/ziptuning/APR) |
| Gateway J533 | 5Q0907530 family (5Q0907530M/AC; 3Q0907530Q) | 1 | body electrics | data-bus interface | plastic/PCB | n/a | under dash near DLC | rare; water ingress | dealer + real scan (vagcode.info) |
| DSG mechatronic J743 | 0D9300012 | 1 | transmission | mechatronic | steel/alloy | n/a | on DQ250 gearbox | R5 fixed | forum/real R scan |
| ABS/ESC J104 (MK100) | 5Q0907379-family | 1 | brakes | ESC hydraulic unit | alloy/PCB | n/a | engine bay | R8 fixed; SVM coding | Ross-Tech (real scan) |
| Haldex controller J492 | 0CQ907554D | 1 | driveline | AWD controller | plastic/PCB | n/a | rear final drive | R6 fixed | real R scan |
| EPS assist J500 | rack family (5Q2423xxx) | 1 | steering | assist ECU | alloy | n/a | steering rack | R7 fixed | real R scan |
| Airbag ECU J234 | 5Q0959655BJ | 1 | restraints | airbag ECU | PCB | n/a | centre tunnel | — | real scan / eBay |
| BCM J519 | 5Q0937084-family (ACC car 5Q0937086AA) | 1 | body electrics | onboard supply CU | PCB | n/a | left A-pillar/dash | water ingress via scuttle | real ACC-car scan (Ross-Tech 14359) |
| Climatronic J255 | 5G0907044 | 1 | HVAC | climate ECU | PCB | n/a | centre console | R9 fixed | real scan |
| Instrument cluster J285 | 5G6920xxx (R digital 5G1920791B) | 1 | dash | cluster | PCB/glass | n/a | dash | — | real scan / parts listing |
| KESSY J518 | 5Q0959435A | 1 | access | start authorisation | PCB | n/a | column/dash | antenna faults | real scan |
| Head unit J794 (MIB) | 5G0035021A (variant) | 1 | infotainment | MIB head unit | PCB/alloy | n/a | centre dash | component protection | real scan |
| ACC radar controller J428 (Bosch) | 5Q0907572J / 5Q0907572P (HW 3QF907572) | 1 | driver assist | radar module | plastic/PCB | n/a | front bumper centre | heat-soak/misalignment C1103 | real ACC-car scan (Ross-Tech 36111) |
| ACC radar/sensor housing (pre-fl Bosch) | 5Q0907541-family | 1 | driver assist | radar head | plastic | n/a | front bumper centre | as above; do NOT fit facelift 5Q0907561 | dealer/eBay |
| Battery monitor J367 | 5Q0915181 family (e.g. 5Q0915181K) | 1 | energy mgmt | LIN slave | plastic | n/a | negative terminal clamp | adaptation needed on swap | real scan (vagcode.info) |
| Battery (AGM) | 000915105 family (000915105FC) | 1 | energy mgmt | 12V AGM 68Ah/380A (DIN) H6 | lead-acid AGM | clamp base bolt | battery tray, engine bay | heat life; needs adaptation | dealer (parts.vw.com) + SSP 517 |
| Wiper motor CU J400 | 5G2955119A | 1 | wipers | LIN slave | PCB | n/a | scuttle | — | real scan |
| Rain/light sensor G397 | 5Q0955547 | 1 | comfort | LIN slave | plastic | n/a | windscreen behind mirror | — | real scan |
| Alarm interior monitor G273 | 5Q0951172 | 1 | security | LIN slave | plastic | n/a | roof/console | — | real scan |
| Alarm horn H8 | 5Q0951605 | 1 | security | LIN slave | plastic/metal | n/a | engine bay | — | real scan |
| Wheel-speed sensor (active) | WHT003857C | 4 | brakes | ABS sensor | plastic/steel | low Nm (5 mm hex, micro-encapsulated bolt) | hub carriers | reluctor corrosion, wire break | dealer (parts.vw.com) |
| PDC ultrasonic sensor (painted) | 5Q0919275 family (e.g. 5Q0919275BGRU) | 4 rear (+4 front if front PDC) | park assist | ultrasonic sensor | plastic | n/a | bumpers | water ingress/paint fault | dealer (parts.vw.com)/eBay |
| Headlight bi-xenon+LED DRL (R) | 5G1941xxx / housing set 5G1998753D | 2 | lighting | bi-xenon AFS | plastic/glass | n/a | front corners | ballast/igniter/AFS/condensation | vendor (ShopDAP/ECS) |
| Xenon igniter (D3S) | 8K0941597E | 2 | lighting | igniter | plastic | n/a | in headlamp | igniter failure | vendor |
| AFS/auto-leveling module | 3D0941329A | 1-2 | lighting | AFS control | plastic/PCB | n/a | headlamp/axle | motor fault | vendor |
| Tailgate wiring loom section | NONE FOUND | 1 | body harness | tailgate loom | copper/rubber conduit | n/a | tailgate-to-body hinge | wire break → camera/locking/wiper loss | forum |

## SENSOR CATALOGUE

(Transcribed from the PDF's pipe-delimited catalogue. Format: name |
oem_part_number | location | connector/pinout | source.)

| Name | OEM part number | Location | Connector/pinout | Source |
| --- | --- | --- | --- | --- |
| Crank speed G28 | (R1 fixed) | block | — | R1 |
| Cam position G40/G300 | (R2 fixed) | cylinder head | — | R2 |
| Charge-pressure G31 | 06K906051E | intake/turbo | — | R3 |
| Manifold press/temp GX9 (G71/G42) | (R3 fixed) | intake manifold | — | R3 |
| Lambda G39/G130 | 06K906262C / 8S0906262B | exhaust | — | R4 |
| Fuel pressure G247/G410 | (R4; G247 suffix OPEN) | rail | — | R4 |
| Oil level/temp G266 | (R1 fixed) | sump | — | R1 |
| Coolant G62 | 04E906455 | engine | — | R9 |
| Radiator-out G83 | (R9 fixed) | radiator | — | R9 |
| Steering angle G85 | integrated in J527 | steering column | — | R7 (calibrated in Addr 44) |
| Pad-wear sensor | 8V0615437 | front-left caliper | 2-pin | R8 |
| TPMS | indirect (no wheel sensors) | — | — | R7 |
| Wheel-speed ×4 (active) | WHT003857C | hub carriers | 2-pin | dealer (parts.vw.com) |
| ESP yaw/lateral/longitudinal G200/G201/G251 | integrated in MK100 ESC unit | engine bay | internal | Ross-Tech (calibrated in Addr 03, code 40168) |
| Brake pedal switch/sender (F/F63) | NONE FOUND | pedal box | — | — |
| Accelerator pedal module G79/G185 | NONE FOUND | pedal | 6-pin | — |
| Ambient/outside temp G17 | NONE FOUND | front bumper/mirror | — | — |
| Rain/light sensor G397 | 5Q0955547 | windscreen behind mirror | LIN (off J519) | real scan |
| Sunlight sensor G107 | NONE FOUND | dash top | LIN | — |
| Humidity sensor (Climatronic) | NONE FOUND | mirror base/HVAC | — | — |
| Interior monitor G273 | 5Q0951172 | roof/console | LIN (off J519) | real scan |
| Bonnet/door microswitches | NONE FOUND | latches | — | — |
| Washer-fluid level sensor | NONE FOUND | washer bottle | — | — |
| Fuel-level senders | (R4 fixed) | tank | — | R4 |
| PDC ultrasonic ×4-8 | 5Q0919275 family (5Q0919275BGRU) | front/rear bumpers | 3-pin | dealer/eBay |
| ACC radar J428 (Bosch) | 5Q0907572J/P (HW 3QF907572) / housing 5Q0907541-family | front bumper centre | — | real scan (Ross-Tech 36111) |
| Front camera R242 (Lane/Front Assist) | NONE FOUND | windscreen behind mirror | — | optional (Addr A5) |

## Recommendations (staged, with thresholds)

- **For the app's ECU node:** label it unambiguously **"Continental
  SIMOS 18.1 — 5G0906259 (Golf R)"** and add a callout that the S3 uses
  8V0906259 and that MED17.5.x is the wrong family for this car. Trigger
  to revise: a genuine VCDS scan of *this* VIN showing a different SW/HW
  block (record the exact string).
- **For the ACC highlighted node:** model it as a **catch-all fault** —
  animate three fix paths in priority order: (a) reseat/secure the radar
  bracket and run the basic-setting/misalignment reset (code 14117 in
  Addr 13); (b) mechanical screw alignment to 0.00° (±0.80°, 1 turn = 1°)
  against a 120 cm target; (c) if the fault only appears under load/heat
  with no misalignment, investigate the **engine side** (cam
  adjuster/actuator) because the distance-regulation module mirrors any
  drivetrain fault. Escalate to radar replacement only after (a)–(c). Use
  the pre-facelift Bosch part (5Q0907572-family / 5Q0907541 housing) —
  flag the 5Q0907561 as facelift-only.
- **For the battery node:** show AGM 68Ah/380A H6, J367 on the negative
  clamp, and a coding step: **19-Gateway → Adaptation → adapt battery**
  (capacity + technology "Fleece" + serial). Note that a like-for-like
  swap runs uncoded but degrades start-stop/charging until adapted.
- **For harness/failure overlays:** highlight the **tailgate conduit**
  and **front-bumper ACC pigtail** as the two highest-value fault
  animations, plus **BCM scuttle water ingress** and **parasitic drain**
  (gateway/infotainment sleep).
- **To close open flags:** pull **erWin** for this exact VIN to get the
  verbatim fuse/relay rows and connector pinouts, and capture a full
  **VCDS auto-scan of the actual car** to lock down the addr-10
  park-pilot, addr-16/42/44/52 part numbers, cluster part, and confirm
  which optional modules (A5 camera, 47 amp, 75 telematics) are present.

## Caveats & source-disagreement / open-flag list

- **SSP 517 verbatim not obtained** — its PDF host is
  bot-blocked/JS-gated. Bus names, "no FlexRay," and LIN topology are
  corroborated from VW's reused CAN self-study text (SSP 269/470), a real
  Golf Mk7 CAN case study (TOPDON), and Golf 7 OBD/CAN research (GitHub).
  High confidence, but not an SSP-517 direct quote. Battery options *are*
  quoted from SSP 517 via golfmk7.com.
- **GTI ECU nuance:** some databases list the Mk7 GTI on Continental
  SIMOS 18.1 (5G0906259) rather than Bosch MED17.5.25. Either way the R
  is SIMOS 18.1; the MED candidate is excluded. Flagged as a source
  disagreement on the GTI, not the R.
- **Battery CCA:** SSP 517 gives 380 A DIN; parts.vw.com lists 420 CCA
  (SAE) for 000915105FC — different rating standards, not a
  contradiction.
- **Module part numbers** for engine (5G0906259B/F), DSG (0D9300012),
  Haldex (0CQ907554D), ACC (5Q0907572J), airbag (5Q0959655BJ) are from
  **real Golf R / real ACC-equipped MQB scans**; BCM 5Q0937086AA is from
  a real well-optioned UK ACC car. **Addr 10 (park pilot), 16, 42, 44, 52
  detailed SW/HW: NONE FOUND in an accessible R scan** — names/status
  only.
- **Radar part number:** subagent-cited 5Q0907572P vs enricher/real-scan
  5Q0907572J — both are valid suffixes within the same pre-facelift Bosch
  controller family; confirm the exact suffix from this car's scan.
- **Reverse bulb:** AutoInstruct/AGM list W16W, but a 2014-car owner
  reported a P21W-type holder — verify on the actual car.
- **Rear light L/R inner/outer PNs, fuse per-row maps,
  pedal-module/ambient/sunlight/humidity/washer-level sensor PNs,
  brake-pedal switch PN, front camera PN, tailgate loom PN: NONE FOUND**
  — genuinely unverified from primary sources.
- Carried R1–R9 open flags remain open (not re-researched here): G247
  suffix, DI-rail PN, DQ250 mechatronic PN, 0CQ vs 0CN bevel-box, various
  chassis torques, CJXC coolant-pump suffix, etc.
