# Deep-research briefs — road to a full digital replica

**Goal (operator, 2026-08-02):** a digital replica of *this* Golf R where
every nut, cranny and bolt is present and identifiable, everything looks
lifelike (not just the body shell), and fault/animation modes explain how
systems work and what goes wrong.

## Where we actually are

| Measure | Now | Dossier target |
| --- | --- | --- |
| Part records | 195 | ~1,800–2,500 |
| Placed instances | 291 | — |
| Records with an OEM part number | **3** | ideally most |
| Records with a torque spec | **15** | every fastener |
| Real (GLB) geometry | body shell only | hero parts everywhere |

So: the *skeleton* of all ten systems exists and the app machinery
(explode, tree, info plates, fault mode, hero-mesh swap) is proven — but
we're at roughly a tenth of the part count and ~2% of the part-number
coverage. **The blocker is data, not code.** Every brief below is
designed so its output drops straight into `src/data/parts/*.json`.

## How to run these

One brief = one deep-research task. Paste the brief verbatim. Ask for the
output in the **standard return format** below; anything in that shape can
be ingested into the model quickly and safely.

### Standard return format (ask for this every time)

For each part:

```
name | oem_part_number (or NONE) | qty | parent assembly | sub-assembly |
material | torque (Nm + angle + TTY/replace?) | fitted-position note |
known failure modes | source URL/document
```

Plus, per brief: a short "how this system works" narrative, and any
**exploded-diagram or dimensioned-drawing URLs** found (these drive
geometry accuracy).

**Rules that protect the project's integrity:**
- Never invent a part number. "NONE FOUND" is a valid, useful answer.
- Always cite the source per fact — dealer catalogue (ETKA/7zap/
  partslink24), Bentley/erWin, SSP, or forum/vendor (mark which).
- Flag where sources disagree (we already carry one: head-bolt torque
  40 Nm+90+90 vs 60 Nm+180).
- Prefer data specific to **CJXC / Golf R Mk7 pre-facelift, DQ250 DSG**.

---

## R1 — Engine short block (highest owner value)

Every component and fastener inside the EA888 Gen 3 bottom end: block
casting variants, crank, rods, pistons + rings + pins + circlips, main and
rod bearings (sizes/grades), thrust washers, balance-shaft module and its
bearings/gears, oil pump + pickup + chain, windage tray, ladder frame,
sump, all seals (front/rear main, sump), core plugs, dowels, oil jets and
their solenoid, dipstick/tube, plus **every bolt with torque, sequence and
TTY/replace status**. Include the tightening ORDER for main/ladder and any
special tools. Note CJXB vs CJXC differences.

## R2 — Cylinder head & valvetrain

Head casting, valves (sizes, sodium-filled exhaust), springs, retainers,
collets, stem seals, seats, guides, roller-finger followers, hydraulic
lash adjusters, both camshafts, cam bearing caps/ladder, both VVT
phasers + their solenoids/control valves, the AVS sliding elements and
electromagnetic actuators, cam sensors, the complete timing-chain kit
(chain, sprockets, tensioner revisions — history matters, guides, bolts),
head gasket revisions and head-bolt torque sequence, valve cover + PCV
diaphragm assembly, spark plugs (gap/heat range/interval), coils.

## R3 — Intake, boost & the P2015 system (already partly modelled)

Complete the fault-mode assembly: intake manifold internals (flap shaft,
bushings, linkage, return spring), V157 motor internals, G336 sensor
spec (voltage curve, connector pinout), all manifold gaskets and bolts,
throttle body + gasket, IS38 internals (CHRA, wheels, wastegate actuator
part numbers by revision, calibration procedure), all boost pipes,
couplers and clamps with part numbers, intercooler, airbox + filter,
every sensor in the intake tract (MAP/IAT/charge-pressure) with pinouts,
diverter valve. **Especially: the full VCDS procedure set** (output
tests, measuring blocks, basic settings/adaptations) for this system.

## R4 — Fuel & exhaust

HPFP (internals, cam follower, revisions, failure symptoms), fuel rails,
DI and port injectors (part numbers, seals, torques, coding/adaptation),
rail pressure sensor, LPFP module, filter, lines and quick-connects, tank
hardware; exhaust: downpipe/cat, all flanges, gaskets, clamps, hangers,
resonator, valved rear silencer, flap actuators and their control, quad
tips, all lambda sensors (bank/position, part numbers, torque).

## R5 — DQ250 transmission (0D9)

Full internal breakdown: both clutch packs (plate counts/materials),
input shafts, all gear sets **with ratios**, synchros, selector forks and
drum, mechatronic J743 (valve body, solenoids, accumulator, TCU,
revisions and known failure modes), bellhousing, final drive, PTO/bevel
box, all bearings and seals, service parts (filter, oil spec + exact
capacity), DSG service interval and the adaptation/basic-settings
procedures. Include mount part numbers and torques.

## R6 — Haldex Gen 5 & driveline

Coupling internals (plate stack, annular piston, accumulator, control
solenoid), the pump **0CQ598549** and its filter/screen part numbers,
controller, rear diff internals and ratio, fluid specs and exact
capacities for BOTH circuits, the pump-learn/basic-settings procedure,
propshaft (sections, flex discs, centre bearing, torques), all four
driveshafts (part numbers, CV joints, boots, clamps, hub bolt spec).
Failure symptom → diagnosis → fix chains.

## R7 — Suspension, steering & wheels

Every arm, link, bush, ball joint, strut/damper/spring (part numbers +
rates if published), top mounts, bearings, ARBs and links, both
subframes, knuckles/carriers, wheel bearings/hubs, **and the complete
bolt/torque chart including angle stages and which fasteners are
single-use**. Alignment specs (camber/toe/caster ranges). EPS rack,
column, intermediate shaft, tie rods. Wheel/tyre: Pretoria part number,
exact ET, TPMS, wheel bolt spec.

## R8 — Brakes (complete)

Front and rear: discs (dimensions incl. rear thickness — we currently
guess 22 mm), pads (the R-specific rear pad number that is NOT the GTI
PP part), calipers and carriers, guide pins, seals/boots, wear sensor,
EPB actuators + their part numbers and the retract/service procedure,
master cylinder, booster, ABS/ESC unit part number and variants, lines,
hoses, fluid spec/capacity/interval, **all torques**, and the bleeding
procedure/sequence.

## R9 — Cooling, HVAC & fluids

N493 module revisions and exact part numbers (plus the metal/reinforced
aftermarket options), coolant pump, thermostat behaviour map, all hoses
by part number, radiator/condenser/aux/intercooler/gearbox cooler,
fans + control, expansion tank and cap, sensors; HVAC: blower,
evaporator, heater core, expansion valve, drier, compressor, cabin
filter, actuators, Climatronic control; **and a master fluids table**:
every fluid, exact spec (VW standard), capacity, and change interval.

## R10 — Electrical, CAN & sensors

Confirm the ECU (MED 17.5.2 vs SIMOS 18) for this build; gateway J533 and
the **complete bus topology** (which module sits on which bus — this
becomes an overlay in the app); every control module with its address;
the full sensor catalogue with location, connector pinout and part
number; battery spec and registration procedure; fuse/relay maps;
harness sections; lighting units (bi-xenon/LED variants) and bulbs.

## R11 — Body, exterior & interior trim

Panel-by-panel part numbers (5-door, pre-facelift R): closures, glass,
seals, bumpers and their brackets/absorbers, grilles, badges, mirrors,
spoiler, skirts, lights, wipers, plus interior: seats, trim panels,
dash parts, console, airbags/belts, and the R-specific items. Paint
codes for VW white options in this era (so we can match the car).

## R12 — Fasteners & hardware library (dossier system 10)

The one system we have barely touched. Build a **master fastener table**
for the whole car: every bolt/nut/clip class used, with size, drive type
(T30/triple-square/spline/etc.), torque, angle stage, TTY/single-use
status, and which assemblies use it. This is what makes "every bolt on
the car" real rather than decorative.

## R13 — Fault library & problem animations (the interactive goal)

For each major system, a catalogue of **real, common faults** in the form
we can animate:
- fault code(s) + plain-English meaning
- what physically happens (the mechanical/electrical event to animate)
- symptoms the driver notices
- diagnostic steps (VCDS blocks/tests, measurements, expected values)
- the fix, with the decision points (cheap part vs assembly)
Start with: P2015 (done), water-pump/thermostat housing leak, PCV
diaphragm, timing-chain tensioner, HPFP wear, carbon build-up, Haldex
pump/filter clog, DSG mechatronic accumulator, IS38 wastegate/shaft,
coil/misfire, DCC-less suspension wear items, EPB faults.

## R14 — Geometry & mesh sources (for lifelike everything)

Where to obtain accurate 3D geometry for the *mechanical* parts, not just
the body: GrabCAD/CAD portals for EA888-family components, turbo, DSG,
suspension; any scan/photogrammetry sets; dimensioned drawings and
sectional diagrams (SSP 606 figures, Bentley sections) usable as modelling
references. Also: exploded-diagram image sources per assembly (7zap etc.)
so procedural recipes can be shaped correctly. Note licensing per source
(personal-use is fine here, but record provenance for the README).

---

## Suggested order

1. **R12 fasteners** + **R13 fault library** — these two unlock the
   operator's two stated goals (every bolt; problem animations) across
   every existing assembly without needing new geometry.
2. **R1 + R2 engine** — the owner's focus and the richest subsystem.
3. **R8 brakes** and **R9 fluids/cooling** — highest practical value for
   actually working on the car.
4. **R5/R6 drivetrain**, **R7 chassis**, then **R10/R11**.
5. **R14 geometry sources** in parallel — it feeds fidelity everywhere.

## Ingestion plan (what happens when research lands)

1. Drop the returned tables into `docs/research/<brief>.md`.
2. I convert them into part records, extending existing assemblies and
   adding new sub-assemblies where the tree needs more depth.
3. `docs/UNVERIFIED.md` shrinks as real numbers replace nulls.
4. New fault entries become fault-mode toggles like P2015.
5. Hero parts get GLB swaps as sources are found (zero code change).
