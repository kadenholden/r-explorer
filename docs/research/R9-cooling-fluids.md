# R9 return — Cooling, HVAC & fluids: VW Golf R Mk7 (5G, 2014 pre-facelift, CJXC/CYFB, EA888 Gen 3, DQ250 0D9 DSG, 4Motion, ~92k mi)

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF, 8 pages; transcribed here). Scope: cooling system, HVAC & master
fluids — N493 rotary thermal module, coolant pump, radiators, oil
cooler, fans, A/C, capacities/specs.

## TL;DR

**The 2014 CJXC DOES carry the N493 "engine temperature regulation
actuator."** It is standard on ALL EA888 Gen 3 engines (not just the
later evo/Gen 3B), integrated into the belt-driven
coolant-pump/rotary-valve module (06L121111 housing family). The
infamous leak-prone plastic pump/thermostat unit **is** the N493 module
— there is no separate mechanical map-thermostat on this car. Coolant is
electronically mapped **85–107 °C** (SSP 606, p.32: "engine temperatures
varying between 85 °C and 107 °C are achievable"), not fixed by a wax
pellet; a wax "safety" thermostat is a fallback only, opening at 113 °C
if N493 dies.

The **DSG Golf R carries TWO auxiliary corner radiators** (Mishimoto
R&D: "VW delivers the Golf R with one or two auxiliary coolers from the
factory, depending on your transmission choice") plus the main radiator;
the **pre-facelift UK car uses R134a, 500 ± 15 g** (VW official Fluid
Capacity Chart), NOT R1234yf. Engine oil is **VW 502 00, 5.7 L with
filter**; coolant is factory-fill **G13 (TL-VW 774 J, pink), 10.0 L
total**, superseded in service by **G12evo (TL 774-L)**, which VW states
is backward-compatible and mixable with G13.

## Key findings

### N493 vs CJXC architecture — RESOLVED (stated explicitly)

The project's concern about designation drift does not bite here. Both
**Audi SSP 606** ("EA888 3rd generation") and the **erWin "EA888 Gen3
Service Manual" Ed. 12.2019, Rep. Gr. 19 §3.7 "Removing and installing
actuator for engine temperature regulation N493"** confirm N493 is
fitted to the standard 1.8/2.0 Gen 3 — including the CJXC. It is **not**
exclusive to the evo. N493 is a rotary-slide-valve ("RCV") assembly
integrated INTO the coolant-pump/thermostat module, containing:

- a **mechanical impeller** driven by a toothed belt off the **balance
  shaft** (runs whenever the engine runs);
- **two mechanically-linked rotary valves** (valve 1 =
  oil-cooler/head/main-radiator flow; valve 2 = cylinder-block circuit);
- a **DC actuator motor** (PWM-driven, 1000 Hz, digital CAN-like control
  signal);
- a **rotary-position sensor** (monitors valve 1); and
- a **wax "safety" thermostat** bypass that opens at **113 °C** if N493
  fails.

So the CJXC has a **map/electrically-controlled thermostat**, contrary
to any assumption of a simple wax unit. What the CJXC does NOT have is
the *evo's* single-piece "rotary-valve integrated thermal management"
refinement — but the functional N493 rotary-valve concept is present
from the start of Gen 3.

### Pump/thermostat-module revision history & metal/reinforced aftermarket options

**OE supersession chain (housing/thermostat):** 06L121111 → …F, G, H, J,
K, M, N → current **06L121111P**.
**Pump (impeller) sub-unit:** 06L121012 family → …A, H, K, L → current
**06L121012M**. VW revised the module repeatedly because early revisions
**weep from the composite housing** (heat-cycle cracking) and **from the
pump-to-block gasket** (drying/shrinking, or swelling from oil
contamination). This is the Gen 3 classic leak and is directly relevant
to this owner's leak-hunting history: the seep hides under the intake
manifold and is routinely mistaken for a rear-main or other leak.

**CJXC caveat (market/era bite):** WPD/vendor data explicitly warns the
common 06L121012 main pump "does not fit some high-output versions of
this engine, as found in cars like the Arteon or Mk7 Golf R."
**VIN-verify the exact suffix before ordering** the R's module/pump.

**Metal / reinforced options (honest assessment):**

- **USP Motorsport metal-impeller kit** (06L121111H-KT1 / -KT2):
  replaces the OE plastic impeller with metal — directly addresses the
  impeller-detaches-from-shaft failure. Still bolts to a plastic
  housing.
- **BAR-TEK RACE water pump**: full-metal impeller + metal pump cover;
  their fitment list explicitly includes CJXC. Best mechanical
  robustness of the impeller/cover, but again the main thermostat
  housing is still composite.
- **Hepu / Graf** (OE suppliers): supply metal-impeller pumps (e.g. Graf
  PA-series) — good OE-equivalent quality for the pump element.
- **Honest bottom line:** the metal-impeller kits solve the *impeller*
  failure, but the *housing* remains the primary weep point on all of
  them. Full billet **housings** for this exact Gen 3 module are far
  less common than marketing implies (billet housings are more prevalent
  for older engines and for the oil-filter housing). Treat any "billet
  Golf R thermostat module" claim skeptically and verify fitment; the
  pragmatic reality (per Grassroots Motorsports on the Mk7) is that the
  field replacement is often "an identically flawed [OE] unit," so the
  metal-impeller kit is the sensible upgrade.

### Thermostat behaviour map (N493, mapped) — cold start → high load

- **Cold start / static pre-heat:** valve 1 ≈ 160°; block circuit
  (valve 2) closed; oil-cooler & main-radiator return closed; after-run
  pump **V51 not energised**. Coolant stagnates in the head and heats
  fast (≤ ~90 °C).
- **Warm-up / low-flow:** valve 1 → ~145°; valve 2 begins opening the
  block; small flow through head + turbo. The water-cooled **Integrated
  Exhaust Manifold (IEM, R2 fixed point)** dumps exhaust heat into head
  coolant to accelerate warm-up and, later, cools under load
  (eliminating enrichment for EGT control).
- **Oil-cooler pre-heat:** valve 1 → ~120°; oil-cooler return opens;
  block flow rising.
- **Normal → high load:** seamless transition to main-radiator
  regulation, valve 1 working 0–85°. **Low speed/load → coolant held at
  107 °C** (minimises friction); **as load rises, dropped to a minimum
  of ~85 °C** (SSP 606: "85 °C and 107 °C are achievable"). At 0°,
  main-radiator return fully open.
- **After shutdown:** valve 1 to "continuous position" (160–255°);
  **V51 after-run pump + N422 A/C-coolant shutoff valve activated for up
  to 15 min** to prevent turbo/head coolant boil.
- **Emergency:** if N493 is dead, the wax safety thermostat opens the
  main-radiator bypass at **113 °C** for limp-home.

### Auxiliary radiator count — RESOLVED

VW fits the Golf R with **one or two auxiliary corner radiators
depending on transmission**. The **DSG car gets TWO**: left lower grille
= supplemental transmission/DSG-circuit cooler; right = supplemental
engine-coolant radiator. Mishimoto R&D: "VW delivers the Golf R with one
or two auxiliary coolers from the factory, depending on your
transmission choice… VW strategically placed an additional heat
exchanger in the left lower grille for supplemental engine cooling." CSF
(SKU 8132) confirms OE numbers **5Q0121253H** (left, DSG) and
**5Q0121251HA** (right, engine water).

### Fans + control

Twin electric fans on one shroud: **large fan ~370 mm (5Q0959455AM)** +
**small fan ~295 mm (5Q0959455AH)** (VDL Adelaide breaker listing, GTI/R
MQB). On MQB there is **no separate bolt-on fan control module** — the
controller (referred to as J293, or J671 in newer VAG docs) is a **PWM
controller built into the large fan motor**, which drives the second fan
and communicates with the ECU over **LIN-bus**; modern assemblies are
brushless. **Failure modes:** controller death → no fans → overheat in
stationary traffic; bearing whine. **DTC example:** P1946 (4523 "Control
Module 1 for Coolant"). **VCDS:** address 08/engine → Output Tests to
command fan stages.

### HVAC + refrigerant — RESOLVED

- **Refrigerant: R134a, 500 ± 15 g** (VW official 2015 Golf R Fluid
  Capacity Chart, NHTSA MC-10127687: "Refrigerant · Use only R134a ·
  Refrig. Capacity · 500 ± 15 grams (17.6 ± 0.5 oz.)"). The pre-facelift
  Golf 7 retained R134a because the Golf 7's type approval predates the
  2017 R1234yf mandate for *new* type approvals; R1234yf appears only on
  later (≈2019+) Golf R builds. **Do not label this car R1234yf.**
- **PAG oil (from official chart):** Sanden compressor → **G 052 154
  A2, 75 ± 10 cc**; Denso/Delphi → **G 052 300 A2, 110 ± 10 cc**.
  Identify the compressor brand first — N280 control valves are **not
  interchangeable** between Sanden and Denso (VW TSB 87-16-16 /
  2044165).
- **Compressor:** clutchless **variable-displacement** unit, pulley
  always driven; output set by the **N280 refrigerant-control valve** (a
  common, cheap failure that mimics a dead compressor — warm air with no
  noise). Golf R PN **5Q0816803H** (5Q0820803-family cross-refs).
  Internal seizure produces "black death" contamination requiring full
  system flush + drier + TXV.
- **Climatronic dual-zone** standard on UK R; control module
  **5G0907044** family (…AF etc.). Flap actuators (temp L/R, air
  distribution, recirculation) in the **5Q0907511** family — typically
  ~4–5 servos on a dual-zone box.
- **Flap-motor calibration (VCDS basic setting):** required after
  **battery disconnect, Climatronic module replacement, or flap-motor
  replacement**. Ross-Tech: "The basic setting needs to be performed
  when the Climatronic control module (J255) or flap motor(s) have been
  replaced." Run via VCDS address **08 → Basic Settings** (flap
  adaptation/run-in), or the hardware method (ignition on, hold **AC +
  recirc/defrost** buttons until the panel enters calibration). Fault
  when it fails: e.g. **B108D** (flap calibration).

## Parts table

PDF format (pipe-delimited): name | oem_part_number | qty | parent
assembly | sub-assembly | material | torque | fitted-position | known
failure modes | source (category). (The PDF closes this table with a
collapsed source-link chip reading "USP Motorsport + 13".)

| Part | OEM number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Failure modes | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Coolant pump / thermostat module (with N493) | 06L121111P (supersedes …F/G/H/J/K/M/N; CJXC suffix VIN-verify) | 1 | engine cooling | pump + thermostat + N493 | composite plastic housing + metal impeller | module bolts 9 Nm (Gen3 sequence); TTY not required | front of block, under intake manifold | housing crazing/weep; pump-to-block gasket leak; N493 electrical fault (P2681/P00B7) | erWin Rep.Gr.19 (workshop manual); SSP 606 (SSP); FCP Euro (vendor) |
| Coolant pump impeller sub-unit | 06L121012M family (NOT the generic 06L121012 for Golf R — verify) | 1 | pump module | impeller | metal shaft + plastic (OE) or metal (USP/BAR-TEK) | see module | in module | OE plastic impeller detaches from shaft → overheat | WPD (vendor); USP (vendor) |
| Coolant pump toothed drive belt | supplied in OE pump/belt kit (NONE FOUND confirmed standalone PN) | 1 | pump drive | toothed belt | rubber | n/a | off balance shaft | wear at high mileage — replace with pump | Awesome GTI (vendor) |
| Water-pump pulley + reverse-thread bolt | pulley kit (BAR-TEK/OE) | 1 | pump drive | pulley | metal | **10 Nm + 90°, LEFT-hand thread — renew bolt** | balance-shaft nose | bolt reuse risk; belt/pulley wear | BAR-TEK (vendor); erWin (manual) |
| N493 actuator | integral to 06L121111 module (NONE FOUND as separate part) | 1 | pump module | DC motor + twin rotary valves + position sensor | plastic/metal | n/a | cold side of pump | stuck valve; coolant ingress to motor; P00B7/P2681/P125700 | SSP 606 (SSP); AudiWorld (forum) |
| After-run / turbo circulation pump V51 | 5Q0965567 family (5Q0965567J confirmed on sibling; **VIN-verify R**) | 1 | aux coolant | electric pump | plastic | NONE FOUND | near main pump / below turbo | post-shutdown coolant boil; DTC P190E/P125700 | Go-Parts (vendor); VW UK forum (forum) |
| Charge-air/intercooler electric pump (2nd) | **N/A — Golf R intercooler is AIR-TO-AIR (R3); no low-temp electric pump on CJXC** | 0 | — | — | — | — | — | — | R3 fixed point; Mishimoto (vendor) |
| A/C coolant shut-off valve N422 | NONE FOUND exact R PN | 1 | aux coolant | solenoid valve | plastic | n/a | coolant circuit | after-run circuit fault | SSP 606 (SSP) |
| Main radiator | 5Q0121251GN | 1 | front cooling pack | radiator | aluminium core / plastic tanks | shroud/mount bolts NONE FOUND (~8–10 Nm typical) | front centre | end-tank cracks, stone damage | parts.vw.com (dealer); Amazon (vendor) |
| Auxiliary radiator, LEFT (DSG circuit) | 5Q0121253H | 1 | front cooling pack | corner radiator | aluminium | NONE FOUND | left lower grille | leaks, stone chips | parts.vw.com (dealer); CSF (vendor) |
| Auxiliary radiator, RIGHT (engine circuit) | 5Q0121251HA | 1 | front cooling pack | corner radiator | aluminium | NONE FOUND | right lower grille | leaks, stone chips | parts.vw.com (dealer); ShopDAP (vendor) |
| A/C condenser (integrated receiver/drier cartridge) | 5Q0816411AR (supersedes AB/AP; also 5QM816411) | 1 | front cooling pack | condenser + drier | aluminium | NONE FOUND | ahead of radiator | stone-chip leaks; drier saturation after open system | parts.vw.com (dealer); Hyoung (vendor) |
| Engine oil cooler (water/oil) | integral to oil-filter housing (family 06L117021 — **VIN-verify**) | 1 | oil-filter housing | oil/coolant cooler | plastic housing / metal core | NONE FOUND; cover screws single-use | engine valley under intake | plastic housing cracks → oil leak (mimics rear-main); gasket hardening | FCP Euro (vendor); import-car (vendor) |
| Expansion tank | 5Q0121407G (later 5Q0121407M, no silica bag) | 1 | cooling | header tank | plastic (ABS) | screws NONE FOUND | LH engine bay | crazing/cracking at high mileage; **silica desiccant bag splits → heater-matrix clog** | parts.vw.com (dealer); eBay (vendor) |
| Expansion tank cap | supplied with tank / separate (NONE FOUND exact PN); ~1.4–1.6 bar rating **(unconfirmed vs primary)** | 1 | expansion tank | pressure cap | plastic | hand-tight | on tank | seal failure → pressure loss/overheat | vwgolf.org (manual) |
| Coolant level sender | integral to expansion tank | 1 | expansion tank | level sender | — | n/a | in tank | false low-level warning | dealer catalogue (dealer) |
| Coolant temp sender G62 | 04E906455 (EA888 Gen 3 MQB; 06L/04L family cross-ref — **VIN-verify**) | 1 | coolant housing | NTC sensor | plastic (4-pin) | hand + clip | coolant/thermostat housing, rear of head area | drift → fans-on/EML | BAR-TEK (vendor); VWVortex (forum) |
| Radiator-outlet temp sender G83 | in lower-hose coupler (5Q0122291T family) — **present on Mk7** | 1 | lower hose | NTC sensor | plastic | clip | radiator outlet | open circuit ("Coolant Sensor 2") | vwgolf.org (manual); Audizine (forum) |
| Upper radiator hose | 5Q0122101EA (quick-connect) | 1 | cooling | hose | rubber + QC coupler | quick-connect (no torque) | radiator to coupling | QC clip failure; chafing (watch aftermarket intake filters) | ECS (vendor); parts.vw.com (dealer) |
| Lower radiator hose (DSG/auto variant) | 5Q0122051AN (manual uses 5Q0122051CT) | 1 | cooling | hose | rubber + QC coupler | quick-connect | radiator lower | QC leak | ECS (vendor) |
| Coolant distribution coupler / thermostat hose | 5Q0122291DA / 5Q0122291T | 1 | cooling | coupler pipe | plastic | NONE FOUND | pump/distribution area | O-ring leak | ECS (vendor) |
| Heater-core feed/return hoses | NONE FOUND exact PN (5Q0122xxx family) | 2 | cooling | heater hoses | rubber + QC | quick-connect | bulkhead | QC/O-ring leak | dealer catalogue (dealer) |
| Turbo coolant feed/return | **R4 FIXED POINT** — O-ring fittings, **9 Nm** (reference only, do not re-open; NOT banjo) | — | turbo | — | — | 9 Nm | turbo | — | R4 |
| DSG oil cooler | **R5 FIXED POINT** — 02E409061B/C, **20 Nm + 90°** (reference only) | — | DSG | — | — | 20 Nm + 90° | on DSG | — | R5 |
| Intercooler | **R3 FIXED POINT** — 5Q0145803-family, **air-to-air** (reference only) | — | charge air | — | — | — | front | — | R3 |
| Twin cooling fan — large (with PWM controller) | 5Q0959455AM (~370 mm) | 1 | fan shroud | fan + integral controller | plastic | shroud bolts NONE FOUND | behind radiator | controller death → overheat; bearing whine; DTC P1946 | VDL Adelaide (vendor); Ross-Tech (forum) |
| Twin cooling fan — small | 5Q0959455AH (~295 mm) | 1 | fan shroud | fan | plastic | — | behind radiator | bearing whine | VDL Adelaide (vendor) |
| Fan shroud / frame | supplied with fan assembly (e.g. 5Q0121205-family) | 1 | front cooling | shroud | plastic | NONE FOUND | behind radiator | mounting-pin cracks | BreakerYard (vendor) |
| A/C compressor (clutchless variable-displacement) | 5Q0816803H (Golf R; 5Q0820803-family cross-ref) | 1 | HVAC | compressor | aluminium | bolts NONE FOUND | front of block | N280 valve fault; internal "black death" | okcvwparts (dealer); UroTuning (vendor) |
| A/C compressor control valve N280 | separate serviceable valve (brand-specific; NONE FOUND exact R PN) | 1 | compressor | RCV solenoid | metal/plastic | NONE FOUND | on compressor | warm air / no cooling (TSB 87-16-16, Sanden) | VW TSB MC-10107210 (TSB); Go-Parts (vendor) |
| Blower motor | 5Q2819021 family (…A/B/C/D) | 1 | HVAC case | blower + wheel | plastic | clip | under glovebox | bearing noise; failure | GlobalParts (vendor); eBay (vendor) |
| Blower regulator / controller | 5Q0907521F / 5QD907521 | 1 | HVAC case | PWM regulator | plastic/PCB | screws NONE FOUND | at blower | overheat/fire risk; loss of fan speeds | White Plains VW (dealer); Amazon (vendor) |
| Heater core / matrix | 5Q0819031A (supersedes to …B; Denso vs Valeo box — not interchangeable) | 1 | HVAC case | heater core | aluminium | n/a | centre dash | **silica-gel clog → lukewarm heat; bypass design NOT flushable → replace (dash-out)** | ECS/Uro (vendor); VWROC (forum) |
| Evaporator | 5Q1820102D (Valeo, with integral TXV) | 1 | HVAC case | evaporator | aluminium | n/a | centre dash | leaks; odour | ECS (vendor); IDParts (vendor) |
| A/C expansion valve (TXV) | 5Q0816679B (separate serviceable) | 1 | HVAC | TXV | metal | NONE FOUND | at evaporator inlet | icing/underperformance | IDParts (vendor) |
| Receiver/drier | **integral cartridge in condenser 5Q0816411AR (NONE FOUND as separate VW PN)** | 1 | condenser | desiccant cartridge | desiccant | n/a | condenser end tank | saturation after open system | parts.vw.com (dealer) |
| Climatronic control unit (dual-zone) | 5G0907044 family (…AF etc.) | 1 | dash | HVAC ECU | PCB | screws | centre dash | flap-calibration faults (B108D) | dealer catalogue (dealer); MHH (forum) |
| Flap actuator motors (temp L/R, distribution, recirc) | 5Q0907511 family (multiple suffixes) | ~4–5 | HVAC case | servo motors | plastic gearset | clip | on HVAC case | clicking; wrong temp; require basic-setting after replace/battery | Ross-Tech wiki (wiki) |
| Cabin/pollen filter | 5Q0819644 (particulate) / 5Q0819653 (charcoal) / 5Q0819669 (later combined) | 1 | HVAC intake | filter | paper / activated carbon | n/a | behind glovebox | clogging; **UK interval every 20k mi** | golfmk7 (forum); parts.vw.com (dealer) |
| Washer fluid reservoir | NONE FOUND exact PN (5Q0955xxx family) | 1 | body front | reservoir + pump | plastic | n/a | LH front | pump failure; cracks | dealer catalogue (dealer) |

## Master fluids table (item 9 deliverable)

PDF format: fluid | VW standard | capacity | interval | source. (The
fuel-tank row in the PDF ends with "nhtsa" source-link chips.)

| Fluid | VW standard | Capacity | Interval | Source |
| --- | --- | --- | --- | --- |
| Engine oil | **VW 502 00** (5W-40 or 5W-30; UK fixed-interval regime typical on R) | **5.7 L (6.0 qt) with filter** | UK: fixed 1 yr / 10k mi (Mk7 R factory-filled 5W-40; 7.5 R later moved to 504 00 0W-30) | VW Golf R Fluid Capacity Chart (official/workshop) |
| Coolant (factory fill) | **G13, TL-VW 774 J** (pink), PN G 013 A8J | **10.0 L (10.5 qt) total** | "lifetime" — practical change ~ every 5–7 yr, and always with a pump job | VW Golf R 2017 Fluid Chart, NHTSA MC-10130147 (official) |
| Coolant (service supersession) | **G12evo, TL 774-L** — VW states backward-compatible & mixable with G13 (both pink) | as above | G13 no longer produced; use G12evo | kuehlfluessigkeit / VWROC (vendor/forum) |
| A/C refrigerant | **R134a** (pre-facelift) | **500 ± 15 g** | on leak/service | VW Golf R Fluid Chart, NHTSA MC-10127687 (official) |
| A/C PAG oil | **G 052 154 A2** (Sanden) **or G 052 300 A2** (Denso/Delphi) | **75 cc / 110 cc** (±10) | with compressor service | VW Golf R Fluid Chart (official) |
| DSG oil (R5 fixed) | G 052 182 A2 | 5.2–5.5 L service / 6.9–7.2 L fill | 40k mi | R5 / VW chart |
| Front bevel box (R5 fixed) | G 052 145 S2 | ~0.9 L | lifetime | R5 / VW chart |
| Haldex Gen 5 (R6 fixed) | G 060 175 A2 | ~0.655 L | 3 yr, no filter | R6 / VW chart |
| Rear final drive (R6 fixed) | G 052 145 S2 (per R6) — **VW chart shows G 052 145 A1: FLAG** | ~0.9 L | lifetime | VW chart / R6 |
| Brake fluid (R8 fixed) | VW 501 14 DOT4 LV | ~1.2 L | first at 3 yr, then every 2 yr | R8 |
| Power steering | **none** — electromechanical EPS | — | — | R7 |
| Washer fluid | screenwash | 3–5 L | as needed | VW chart |
| Fuel tank | — | **55 vs 60 L OPEN FLAG (R4)** | — | R4 (nhtsa) |

## Cooling filling / bleeding procedure

- **Drain:** the Mk7 has **NO radiator drain screw** (confirmed by
  multiple owner/manual sources). Drain by disconnecting a **lower
  quick-connect hose** / lower-hose-off (some tip the radiator when
  removing).
- **Fill (correct method):** VW specifies **vacuum-fill** with the
  **VAS 6096 cooling-system charge unit** because the cylinder head can
  sit below the expansion-tank neck, trapping air. Verify concentration
  with refractometer **T10007A**.
- **Fill (gravity/burp fallback):** 50/50 mix to MAX, cap off, **heater
  set to MAX hot with blower on low**, run to temp, top up as air
  purges; squeezing flexible hoses helps.
- **After-run pump during bleed:** on N493 cars the ECU can cycle the
  **V51 after-run pump** to help purge air; this can be commanded via
  **VCDS output test**.

## Torque list (with single-use status)

- Coolant pump/thermostat **module bolts: 9 Nm** (Gen 3, in sequence) —
  erWin. *(Note: Gen1/Gen2 pumps were 10 Nm; use 9 Nm for this Gen 3
  car.)*
- Water-pump **pulley bolt: 10 Nm + 90°, LEFT-hand thread, RENEW** —
  BAR-TEK / erWin.
- Turbo coolant fittings: **9 Nm** (R4 fixed, O-ring, not banjo).
- DSG cooler: **20 Nm + 90°** (R5 fixed).
- Vibration damper (context, same manual): 150 Nm + 90° (property class
  10.9: 100 Nm + 180°).
- Radiator/fan-shroud mounts, condenser mounts, A/C compressor bolts,
  expansion-tank screws: **NONE FOUND** (tables did not extract cleanly
  from erWin/Bentley).
- **Hose-clamp guidance:** OE uses **spring clamps** on quick-connect
  and small-bore hoses; worm-drive clamps are an aftermarket substitute
  and can cut into the hose if over-tightened — spring clamps preferred
  on OE-diameter hoses.

## Failure-mode summary (per part)

- **N493 pump/thermostat module leak** — THE Gen 3 classic; composite
  housing weeps or gasket leaks, hidden under the intake manifold,
  easily mis-diagnosed. Directly relevant to this owner's leak history.
  Also throws P2681/P00B7 if coolant reaches the actuator.
- **Pump belt at ~92k** — inspect; replace with the pump as a matter of
  course.
- **After-run pump V51 failure** — post-shutdown boil, DTCs
  P190E/P125700.
- **Expansion-tank crazing / silica-bag split** — cracking at mileage;
  the split desiccant bag is the notorious cause of a **clogged,
  non-flushable heater matrix**.
- **Fan controller death** — no fans → overheat in traffic; bearing
  whine precedes.
- **Condenser stone-chip leaks** — front-mounted, vulnerable; drier is
  integral so an open system needs the whole condenser or at least
  evacuation/recharge discipline.
- **N280 control-valve fault** — cheap part, mimics dead compressor
  (warm air, no noise).
- **Heater-matrix clog** — lukewarm heat; replacement is a dash-out job.
- **Climatronic actuator faults** — clicking/wrong temp; require flap
  basic-setting (B108D if calibration fails).
- **G62 drift** — fans-on / EML.

## Exploded-diagram / dimensioned-drawing URLs

- **erWin "EA888 Gen3 Service Manual" Ed. 12.2019, Rep. Gr. 19** — §3.1
  Exploded view coolant pump/thermostat; §3.2 electric coolant pump;
  §3.3 coolant temp senders; §3.5 coolant pump R&R; §3.6 toothed belt
  R&R; §3.7 N493 R&R. Scribd doc 465533887 / pdfcoffee mirror.
- **Audi SSP 606 (EA888 Gen 3)** — dual-circuit thermal management +
  N493 cutaways. Scribd 687811792.
- **Audi eSSP 920243 (3rd-gen EA888)** — NHTSA MC-10122162-9999.pdf.
- **VW Golf R Fluid Capacity Charts** — NHTSA MC-10130147-9999.pdf
  (2017) and MC-10127687 (2015).
- **Dealer catalogue diagram trees:** parts.vw.com Golf R cooling/HVAC
  pages; vw.oempartsonline.com Golf R "Cooling System" (Radiator &
  Components, Water Pump, Hoses & Lines, Cooling Fan) and "HVAC" (A/C
  Condenser & Evaporator, Blower Motor & Fan, Heater, Controls)
  sub-trees.

## Recommendations

1. **Model the N493 pump/thermostat module as the single centrepiece**
   under the intake manifold — depict the toothed belt off the balance
   shaft, the DC actuator motor, twin rotary valves, and the wax safety
   thermostat. This is the architectural heart of the system and the
   car's #1 leak point.
2. **Model TWO corner radiators** for this DSG car (left = DSG circuit
   5Q0121253H; right = engine coolant 5Q0121251HA) plus the main
   radiator (5Q0121251GN) — do not depict only one auxiliary.
3. **Refrigerant callout: R134a, 500 g** — do NOT label R1234yf on this
   pre-facelift car.
4. **Before quoting a definitive PN**, VIN-verify: (a) the exact
   06L121111/06L121012 module suffix — vendor data warns the generic
   Gen 3 pump may not fit the R; (b) compressor brand (Sanden vs Denso)
   — determines both the N280 valve and the PAG oil spec.
5. **Staged next steps:** (i) confirm compressor brand from the
   under-bonnet label/visual before any A/C work; (ii) if replacing the
   module, fit a metal-impeller kit (USP/BAR-TEK) rather than plain OE;
   (iii) if the heater is lukewarm, inspect the expansion tank for a
   split silica bag before condemning the matrix.
6. **Thresholds that change the above:** if the VIN decodes to a
   **facelift (2017+ / Mk7.5)** build, re-check refrigerant (may be
   **R1234yf**) and engine-oil spec (Mk7.5 R moved to **VW 504 00, 0W-30
   LongLife**). If a later module revision is already fitted, the
   impeller-detach risk is lower but the housing weep risk remains.

## Caveats / open flags (source disagreements)

- **CJXC pump suffix** not pinned to a single dealer page; WPD vendor
  note explicitly warns the generic Gen 3 pump "does not fit… Mk7 Golf
  R" — VIN-verify.
- **G62 exact Genuine-VW PN (04E906455)** is vendor-sourced, not
  confirmed on a VW dealer page — treat 06L919501/04L906031 as
  related-family references.
- **Rear final-drive fluid:** VW Golf R chart lists **G 052 145 A1** vs
  **G 052 145 S2** in the R6 brief — discrepancy flagged (likely a chart
  typo; S2 is the MQB standard).
- **Expansion-tank cap pressure rating** (~1.4–1.6 bar) not confirmed
  against a primary VW figure — NONE FOUND primary.
- **Numerous mounting torques** (radiator, fan shroud, condenser, A/C
  compressor, expansion tank) NONE FOUND — Bentley/erWin tables did not
  extract.
- **Active grille shutter: NOT fitted to the Golf R** — it is a feature
  of economy/BlueMotion/PZEV variants; the R's rad-pack has fixed
  louvres only.
- **N422 A/C-coolant shut-off valve** and **heater-core feed/return
  hose** exact R PNs: NONE FOUND.
- **Carried open flags from R1–R8** (continuity, not resolved here):
  cam-carrier torque; VVT phaser range attribution; Gen3 DV revision;
  intake manifold revision by VIN; DI rail exact PN; G247 suffix;
  exhaust flap V-designation; fuel tank 55 vs 60 L; DQ250 mechatronic
  PN; 0CQ vs 0CN bevel-box family; DQ250 gear ratios forum-only;
  RDU/bevel numeric ratios NONE FOUND; propshaft flange torques NONE
  FOUND; rear-diff plug torque ~30 Nm unverified; inner CV flange bolt
  torque NONE FOUND; Haldex fluid supersession TPI not obtained; front
  caster + rear-toe tolerance NONE FOUND;
  ball-joint/strut-clamp/top-mount/inner-tie-rod/track-rod-locknut
  torques NONE FOUND; rear ARB diameter vendor-only; GTI-PP rear pad PN
  NONE FOUND; brake master-cylinder casting by VIN; ESC-unit line-union
  torque NONE FOUND.
