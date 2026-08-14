# R4 return — fuel & exhaust: VW Golf R Mk7 (2014 pre-facelift, CJXC, EA888 Gen 3, DQ250)

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: fuel system (HPFP, injectors, rails, LP
supply, EVAP) and the exhaust line, 2014 pre-facelift Mk7 Golf R, CJXC,
EA888 Gen 3, DQ250 DSG. Inline citation chips from the PDF are preserved
as bracketed source names.

## TL;DR

- **The 2014 pre-facelift EUROPEAN/UK CJXC Golf R has FACTORY DUAL
  INJECTION — direct (FSI) injectors PLUS a low-pressure port/MPI rail
  with 200 cc port injectors.** This overturns R2's provisional "DI-only"
  conclusion. DI-only applies to the NORTH AMERICAN siblings (GTI = CXCA,
  Golf R = CYFB, built in Silao, Mexico). Build the EU car with a second
  (MPI) rail and 4 port injectors on the intake side.
- **Exhaust flaps are ELECTRIC servomotors, not vacuum** (OEM actuator
  family 4H0133246, current suffix 4H0133246J; Golf R typically uses two
  valve motors on the quad-exit rear box); the pre-facelift EU car is
  **pre-GPF** with exactly **two lambda sensors** (one pre-cat wideband,
  one post-cat binary) and the primary cat integrated in the cast
  downpipe (turbo-to-downpipe joined by V-band 5Q0253725G + fire-ring
  gasket 5Q0253115B).
- **Verified part numbers**: HPFP 06L127025R→06L127025T; DI injector
  family 06L906036 (Golf R revisions H→L→AB→AE→AJ→AK); port injector
  06L906031D; LPFP module 5Q0919051BM (4Motion); purge valve N80
  06H906517AE; pre-cat lambda 06K906262C/CS; post-cat lambda
  8S0906262B/06K906262AC. **Exact torque figures for HPFP bolts, injector
  clamps, G247 and rail bolts did NOT extract from the workshop torque
  tables — marked NONE FOUND rather than guessed**; only the mandatory
  staged/diagonal procedure is documented.

## Key findings

**1. Dual-injection resolution (headline).** Multiple independent,
mutually consistent sources establish that the European/UK high-output
EA888 Gen 3 (the 280–310 PS bracket that contains the 300 PS CJXC) left
the factory with both direct and port injection, while North American
cars did not:

- Stratified Automotive Controls ("MK7 GTI/R Fueling"): *"In Europe the
  MK7 GTI/R has both port (blue) and direct injection (red) while in
  North America the car only came with direct injection."*
  [Stratified Automotive Controls]
- EcuTek's "EA888 Multi-Port Injection" tuning document (a Mk7
  transverse/Simos 18.x guide) documents factory port injection on EU
  engines and states its Golf 7 R development car used *"standard 200cc
  injectors"* at an *"80% DI injector and 20% for port injectors"* split;
  its RaceROM note adds *"The default Value is 200cc based on the known
  injector size of EcuTek's development car."* [Atlassian]
- COBB Tuning names the US-market codes (CXCA GTI, CYFB Golf R) as
  requiring *"the installation of additional hardware for the USDM
  vehicles"* to add MPI — i.e., EU cars already had it. [COBB Tuning]
  [COBB Tuning]
- HPA Motorsports states its MPI parts are *"OEM components...found in
  ROW (Rest of World) versions of the EA888.3 engines"* and that the US
  HPFP has a brass plug where the ROW pump feeds the low-pressure MPI
  circuit.
- Genuine OEM port injector **06L906031D** is catalogued for *"Volkswagen
  Golf MK7 GTI/R, Audi 8V S3/TT/TTS...with direct and port injection."*
- VWROC members citing ETKA note the EU Golf R lost its *"secondary port
  injectors"* only at the 2019 WLTP change (new code DNUE, gained a GPF)
  — direct catalogue-level implication that the earlier CJXC HAD them.
- The "no MPI rail, four holes not connected" VW Vortex photo was a
  US/Mexico-built engine, not an EU one.

**2. Injection hardware exists on this exact car:** 4 direct injectors on
the DI rail + 4 port injectors on a low-pressure MPI rail, both fed from
the single Hitachi Gen III HPFP.

**3. HPFP drive:** A **four-point (four-lobe) cam lobe on the EXHAUST
camshaft** drives the single-piston HPFP via a **roller tappet**
(APR/USP: *"A four-point cam lobe located on the exhaust camshaft drives
the 2.0T EA888 Gen 3's Hitachi Generation III HPFP."*). This roller
design is far less failure-prone than the EA113 slider-follower.
[USP Motorsport]

**4. Exhaust actuation is electric**, resolving the vacuum-vs-electric
flag; pre-facelift EU is pre-GPF with two lambdas.

## Details — how the systems work

### Fuel system (demand-controlled, dual injection)

The in-tank fuel delivery module (5Q0919051-series; 4Motion Golf R uses
suffix BM) houses the low-pressure electric pump, a suction-jet transfer
arrangement for the 4Motion saddle tank, the level sender(s) and a
lifetime mesh strainer. The pump is not run at constant voltage — the
**fuel pump control module J538** varies pump speed on demand, so the
low-pressure circuit supplies only the pressure/flow currently required.
Fuel passes via the supply line and an engine-bay quick-connect to the
HPFP.

The **HPFP** is a single-piston pump driven off a four-lobe cam on the
exhaust camshaft through a roller tappet. It contains an
electrically-controlled inlet metering/pressure-control valve, a
low-pressure pulsation damper and a mechanical overpressure relief.
**The EA888 Gen 3's OEM maximum operating pressure is 200 bar (just over
2,900 psi)** (APR/HPA technical descriptions). Rail pressure is read by
high-pressure sender **G247**; the ECU closes the loop via the metering
valve. Low-pressure sender **G410** monitors the supply side so the ECU
can trim J538 duty. Four **direct injectors** spray into the chambers; on
the EU dual-injection car the HPFP additionally feeds a **low-pressure
MPI rail with four 200 cc port injectors**, which run at light load just
after warm-up/cat-heating up to an engine-speed set point — cleaning
intake valves and aiding emissions — while direct injection dominates
under load. Tank venting flows through a gravity/rollover valve to the
EVAP charcoal canister; purge valve **N80** meters vapour into the
intake. [USP Motorsport] [atlassian]

### Exhaust system (turbo-back OEM)

Gas exits the integrated water-cooled manifold/mono-scroll turbo, crosses
a **V-band joint** into the cast **downpipe that houses the primary
catalyst**. The **pre-cat wideband lambda G39 (LSU ADV)** sits at/near
the turbo outlet; the **post-cat binary lambda G130** sits after the cat.
The downpipe joins (flex section + flange/sleeve) to the centre
section/resonator, then to the **valved quad-exit rear silencer**.
Pre-facelift EU cars are **pre-GPF**. Rear-box flaps are driven by
**electric servomotor(s)** (OEM actuator 4H0133246-series), opening under
sport/race mode and higher rpm/load to cut backpressure and open up the
note, closing at light/eco load for quietness. Lambda control: pre-cat
wideband runs closed-loop fuelling; post-cat binary trims/monitors cat
efficiency.

## Parts table

(The PDF delivers this pipe-delimited with columns: name |
oem_part_number | qty | parent assembly | sub-assembly | material |
torque | fitted-position | known failure modes | source category.)

| Part | OEM number | Qty | Parent assembly | Sub-assembly | Material | Torque | Fitted position | Known failure modes | Source category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| High-pressure fuel pump (HPFP) | 06L127025R → 06L127025T (GPF cars only: 06L127027C) | 1 | fuel injection | HPFP | aluminium/steel | staged/alternating TTY — exact Nm NONE FOUND | on head, driven off exhaust cam | long crank, P0087, P310B, hesitation | vendor (darkside/ecotune); erWin TOC |
| HPFP roller tappet / cam follower | NONE FOUND (OEM) | 1 | fuel injection | HPFP drive | steel roller | n/a | between exhaust-cam lobe and HPFP piston | rare wear (roller design, unlike EA113) | forum (SEATCUPRA/TTForum); vendor (STR) |
| HPFP inlet O-ring/seal | NONE FOUND (supplied w/ pump) | 1 | fuel injection | HPFP | Buna-N | n/a | HPFP-to-head | weep/leak | vendor (IE) |
| Direct (DI) injector | 06L906036 family; Golf R revs H→L→AB→AE→AJ→AK (current AK) | 4 | fuel injection | DI rail | Bosch/steel | clamp bolt staged — exact Nm NONE FOUND | into combustion chamber | misfire, rough idle, PTFE seal leak after R&R w/o forming tools, P030X/P0171 | dealer (parts.vw.com); vendor (034/ECS/ShopDAP) |
| DI injector PTFE combustion seal + support-ring kit | 06H998907B (seal kit); genuine per-injector kit via JT-Products | 4 | fuel injection | DI injector | PTFE + metal | requires seal-forming tools | injector tip | leaks if fitted without cones/sleeves | vendor (JT-Products/Amazon) |
| Port (MPI) injector — EU dual-injection only | 06L906031D / 06L906031A (200 cc) | 4 | fuel injection | MPI rail | Bosch | NONE FOUND | into intake manifold ports | clogging, low-RPM misfire | dealer/vendor (vaggarage/vagparts); EcuTek |
| High-pressure DI fuel rail | NONE FOUND for CJXC (06K133-series likely; 06L133317L is the older FSI rail, NOT this car) | 1 | fuel injection | DI rail | forged steel | rail bolts + HP union staged — exact Nm NONE FOUND | atop head | crack/leak (rare) | erWin TOC; vendor (autoparts-24) |
| Low-pressure MPI rail — EU only | NONE FOUND | 1 | fuel injection | MPI rail | plastic/alloy | NONE FOUND | on/near intake manifold | leak | subagent (EcuTek/HPA ROW parts) |
| Fuel rail HP sender G247 | Gen3 TSI genuine (NGP lists Mk7/8V/8S/B9); exact suffix NONE FOUND (06J906051-series is the older FSI/early-TSI part) | 1 | fuel injection | DI rail | Bosch | fine thread — exact Nm NONE FOUND | on HP rail | P0087/P0190 | vendor (NGP); erWin TOC |
| Low-pressure fuel sender G410 | NONE FOUND | 1 | fuel supply | supply line | — | NONE FOUND | in LP supply line | supply-pressure faults | erWin TOC |
| In-tank fuel delivery module (LPFP) | 5Q0919051 base; Golf R 4Motion 5Q0919051BM (also BH/BJ/CB/CC) | 1 | fuel supply | in-tank module | plastic | lock-ring NONE FOUND | in tank | pump failure, sender fault, no-start | dealer/used (Redline/OneLove) |
| Fuel pump control module J538 | NONE FOUND exact (5Q0906xxx family) | 1 | fuel supply | control | — | n/a | under rear seat/near tank | control failure, fuel-delivery DTC | erWin/Ross-Tech general |
| LPFP lock ring & tank seal | NONE FOUND | 1 ea | fuel supply | in-tank module | plastic/rubber | NONE FOUND | tank flange | leak | catalogue |
| Level sender(s) G / G169 | integrated w/ module (5Q0919051BM) | 1–2 | fuel supply | in-tank | — | n/a | in saddle tank (4Motion may use 2) | erratic gauge | catalogue |
| Fuel filter | integrated in-tank strainer (no separate serviceable external filter on Mk7 petrol) | 1 | fuel supply | in-tank module | mesh | n/a | in tank | clog (lifetime part) | catalogue/erWin |
| EVAP purge valve N80 | 06H906517AE (MQB Gen3); older 06E906517A | 1 | emission control | EVAP | plastic/solenoid | NONE FOUND | engine bay, intake side | P0441, rattle, hard start, rough idle | dealer (parts.vw.com); vendor |
| EVAP charcoal canister | NONE FOUND | 1 | emission control | EVAP | plastic/carbon | NONE FOUND | near tank | saturation | catalogue |
| Fuel filler neck / cap / flap | NONE FOUND | 1 | fuel tank | filler | — | n/a | rear quarter | — | catalogue |
| Gravity/rollover valve | NONE FOUND | 1 | fuel tank | venting | — | n/a | on tank | — | catalogue |
| Fuel tank (4Motion saddle) | NONE FOUND; **55 L** (VW US 2017 Golf R spec; VW Australia literature cites 60 L — flag) | 1 | fuel tank | tank | plastic | strap bolts NONE FOUND | under rear floor | — | dealer spec (media.vw.com) |
| Downpipe with primary cat (OEM) | NONE FOUND (OEM PN); pre-facelift EU pre-GPF, cat integrated in downpipe | 1 | exhaust | downpipe | stainless/cast | flange nuts NONE FOUND | turbo → midpipe | flex-section cracking, cat rattle on tuned cars | erWin TOC; vendor (aftermarket refs) |
| Downpipe-to-turbo V-band clamp | 5Q0253725G (supersedes 5Q0253725A/C) | 1 | exhaust | turbo joint | steel | NONE FOUND | turbo outlet | leak at V-band | dealer/vendor (ECS/ShopDAP/Awesome GTI) |
| Downpipe-to-turbo V-band gasket (fire ring) | 5Q0253115B | 1 | exhaust | turbo joint | metal | replace (one-time) | turbo-to-downpipe | blow-by leak | vendor (UroTuning/ShopDAP) |
| V-band bolt | N10240003 (M8×1.25×33) | 1–2 | exhaust | turbo joint | steel | replace (one-time) | V-band | — | vendor (ShopDAP) |
| Centre section / resonator (midpipe) | NONE FOUND (OEM PN) | 1 | exhaust | midpipe | stainless | sleeve/double-clamp NONE FOUND | downpipe → rear box | corrosion | catalogue/vendor |
| Exhaust sleeve clamp | NONE FOUND | 1–2 | exhaust | midpipe joint | steel | NONE FOUND | sleeve joint | leak | catalogue |
| Exhaust rubber hangers | NONE FOUND | 3–4 | exhaust | mounts | rubber | n/a | tunnel/rear | perishing | catalogue |
| Valved rear silencer (quad-exit) | NONE FOUND confirmed for pre-facelift Golf R hatch (5G-series) | 1 | exhaust | rear box | stainless | NONE FOUND | rear valance | flap seizure/rattle, worn valve, corrosion | vendor (Milltek/Cobra pre-facelift refs); eBay |
| Exhaust flap control actuator (electric servomotor) | 4H0133246J (supersedes 4H0133246D/H) | 1–2 (Golf R often 2) | exhaust | rear box valve | motor/plastic | NONE FOUND | on rear silencer | seized flap, motor failure, rattle | dealer (parts.vw.com) |
| Quad tailpipe tips | NONE FOUND separately (part of rear-box assembly) | 2 pairs | exhaust | rear box | polished stainless | n/a | rear valance/diffuser | discolour | catalogue |
| Pre-cat lambda (wideband) G39 = LSU ADV | 06K906262 family (06K906262C / 06K906262CS) | 1 | emission control | O2 | Bosch, M18×1.5 | ~45 Nm typical (VW figure NONE FOUND) | turbo/downpipe pre-cat | P0030-family heater, aging | vendor (vagparts/ShopDAP) |
| Post-cat lambda (binary) G130 | 8S0906262B / 06K906262AC family | 1 | emission control | O2 | Bosch, M18×1.5 | ~45 Nm typical (VW figure NONE FOUND) | after cat | slow response, cat-efficiency codes | vendor (Amazon/ECS) |
| Downpipe/tunnel heat shields | NONE FOUND | several | exhaust | shields | steel/alloy | NONE FOUND | over downpipe/tunnel | rattle | catalogue |
| Exhaust hanger brackets | NONE FOUND | several | exhaust | mounts | steel | NONE FOUND | body/floor | corrosion | catalogue [VW Vortex] |

## Torque section

- **HPFP mounting bolts**: TTY, staged/alternating (diagonal, in-stages)
  per the erWin general rule — *"Bolts and nuts which secure covers and
  housings should be loosened and tightened in diagonal sequence and in
  stages."* High-pressure pipe unions: *"Tighten all unions lightly to
  start with before tightening to final torque"*; pipes reinstalled
  stress-free to the same cylinder. **Exact Nm NONE FOUND — do not
  guess.**
- **DI injector clamp/hold-down bolts**: staged; exact Nm **NONE FOUND**.
- **Fuel pressure sender G247**: fine thread; exact Nm **NONE FOUND**.
- **DI rail bolts**: staged; exact Nm **NONE FOUND**.
- **Downpipe-to-turbo V-band (5Q0253725G) + gasket 5Q0253115B + bolt
  N10240003**: renew gasket and bolt (one-time-use); clamp Nm **NONE
  FOUND**.
- **Sleeve/double clamps** on midpipe: **NONE FOUND**.
- **Lambda sensors (M18×1.5)**: commonly quoted ~45 Nm; **VW-verified
  figure NONE FOUND** (treat the ~45 Nm as a general lambda-fitting
  guide, not a VW spec).
- General erWin rules: TTY/angle bolts renew after removal; self-locking
  fasteners always renewed; non-oiled torque figures.

## Injector coding / adaptation

**DI (TSI petrol) injectors**: Unlike VAG common-rail DIESEL injectors —
which require IMA/ISA injector-code adaptation via VCDS Adaptation
Ch. 071–074 (Ross-Tech / VAG-Coding) — **Gen 3 TSI petrol DI injectors do
NOT require IMA-style voltage/delivery coding for a like-for-like
replacement**; the ECU adapts flow via fuel-trim relearn (Go-Parts: *"For
a standard replacement with the same part number, no special programming
or coding is typically required. The engine's computer will
adapt...through its fuel trim adjustments."*). Different-flow injectors
require custom tuning. Flag: some later Simos ECUs expose
injector-correction (IDE) channels — verify per-VIN in ODIS. [Go-Parts]

**MPI/port injectors (EU dual-injection)**: no IMA coding; governed by
the port-injection fuel maps (software-scaled, per COBB/EcuTek), not
injector-coded.

## HPFP revision history

Golf R Mk7 (CJXC, EA888.3, IS38) OEM HPFP: **06L127025R** superseded by
**06L127025T** (current). GPF-equipped later cars require **06L127027C**
— do NOT fit to the pre-facelift, pre-GPF CJXC, which uses the 025R/025T
family. Roller-tappet drive off the exhaust cam (Gen 3), distinct from
the failure-prone EA113 slider follower.

## Exhaust-flap control

**Actuation resolved: ELECTRIC servomotor(s), not vacuum.** OEM valve
control actuator/motor = **4H0133246-series (current 4H0133246J,
supersedes 4H0133246D/H)**. Golf R rear box commonly carries **two**
valve motors; aftermarket cat-backs instruct re-using the OE valve
motors. No vacuum reservoir/diaphragm. [Awesome GTI]

**Opening logic**: ECU-controlled by drive mode (Race/Sport open), engine
speed and load; flaps closed at light/eco load.

**Failures**: seized flap, worn/rattling valve, motor failure.

**Designation flag**: electric confirmed; the specific VW "V-number" for
this car's flap motor is **NONE FOUND** — do NOT assert "N321" (an
N-designation implies a solenoid/valve, which is not what this
electric-motor system uses).

## Lambda sensor map

- **Count: 2** on the single-bank 4-cylinder: Bank 1 Sensor 1 (pre-cat
  wideband G39, LSU ADV) and Bank 1 Sensor 2 (post-cat binary G130). No
  mid sensor on pre-facelift EU (pre-GPF).
- Pre-cat: 06K906262 family (06K906262C / 06K906262CS). Post-cat:
  8S0906262B / 06K906262AC family.
- Thread M18×1.5; torque commonly ~45 Nm (VW-specific figure NONE FOUND).
- After replacement: no coding; heater/readiness self-adapts — clear
  codes and run a readiness drive cycle. Heater faults are P0030-family.

## UK/EU vs North America hardware differences

- **MPI**: EU/UK CJXC = DI + port injection (dual). NA CXCA/CYFB = DI
  only (MPI plugged/omitted). The EU HPFP has the low-pressure MPI
  outlet; the US pump has a brass plug there.
- **Cats/GPF**: pre-facelift EU CJXC = pre-GPF (cat in downpipe,
  2 lambdas). GPF and loss of port injection came with the WLTP/facelift
  DNUE cars. NA emissions plumbing differs.
- **Load-bearing caveat**: rows verified only against the US catalogue
  (parts.vw.com) may not reflect EU injection/exhaust hardware — flagged
  per row. Injection and exhaust rows preferentially rely on EU/ROW-
  relevant sources.

## Exploded-diagram / dimensioned-drawing URLs

- erWin-derived "Engine TFSI EA888 Gen3 Service Manual" (Ed. 12.2019):
  https://pdfcoffee.com/engine-tfsi-ea888-gen3-service-manual-eng-pdf-pdf-free.html
  and Scribd doc 465533887 — Rep. Gr. 24 "Mixture preparation –
  injection" (exploded views: fuel rail with injectors p.245; HPFP p.266;
  G247 p.259; G410 p.263) and Rep. Gr. 26 "Exhaust system" (silencers
  exploded view p.280; emission-control/cat p.281–284). [Scribd]
- SSP 606 EA888 Gen 3 (dual-injection description): carworklog.com
  SSP 606 PDF.
- Dealer catalogue trees: parts.vw.com (Golf R fuel injection / muffler /
  EVAP); vw.oempartsonline.com 2016 Golf R tree (US-spec caveat).
- HPFP vendor teardowns: Integrated Engineering (performancebyie.com),
  034Motorsport.
- Valved silencer references: Milltek / Cobra Sport pre-facelift Golf R
  cat-back pages (Awesome GTI, cobrasport.com).

## Recommendations (build order & sourcing)

1. **Model the EU dual-injection layout**: build BOTH a high-pressure DI
   rail (4 direct injectors, 06L906036AK-current) and a low-pressure MPI
   rail (4 port injectors, 06L906031D) tied to the single HPFP
   (06L127025T). Show the HPFP's low-pressure MPI outlet (not plugged,
   unlike US cars). This is the single most important R4 correction to
   R2.
2. **Exhaust**: model an electric flap servomotor (4H0133246J), two on
   the quad-exit rear box; cast downpipe with integrated primary cat;
   V-band 5Q0253725G + fire-ring 5Q0253115B at the turbo; two lambdas
   only (pre-cat wideband, post-cat binary). Do NOT add a GPF or a
   mid-sensor — that is facelift/DNUE hardware.
3. **Torque plates/annotations**: for HPFP bolts, injector clamps, G247
   and rail bolts, annotate "staged/diagonal, TTY, exact Nm not published
   in extracted tables" rather than inventing values. If a dimensioned
   torque is essential, pull the Rep. Gr. 24 torque page directly from
   erWin/Bentley (paid) — the pdfcoffee mirror's torque tables did not
   extract cleanly.
4. **Thresholds that would change the above**: if the donor VIN decodes
   to a facelift/WLTP build (code DNUE, GPF present) the car would be
   DI-only + GPF with different downpipe/lambda architecture — re-verify.
   If the car is confirmed North American (CYFB), delete the MPI
   rail/port injectors entirely and add the brass HPFP plug.

## Caveats & open flags

- **Dual injection (RESOLVED)**: EU CJXC = dual (DI + MPI); NA = DI-only.
  R2's "DI-only" was incorrect for the EU/UK car. Confidence: HIGH
  (Stratified, EcuTek, COBB, HPA, VWROC/ETKA, OEM PN 06L906031D all
  agree).
- **DI rail exact PN**: not confirmed for CJXC (06L133317L is the older
  FSI rail, not this TSI engine). NONE FOUND.
- **G247 exact suffix for Gen3 TSI**: 06J906051-series is the older
  FSI/early-TSI part; the Gen3 TSI sender differs — exact suffix NONE
  FOUND.
- **HPFP/injector/rail/lambda torque Nm**: workshop torque tables did not
  extract; NONE FOUND. Only staged/diagonal procedure documented; ~45 Nm
  lambda figure is a general guide, not VW-verified.
- **Exhaust flap V-designation**: electric confirmed; specific VW
  V-number NONE FOUND — do not assert N321.
- **Fuel tank capacity conflict**: VW US 2017 Golf R spec = 55 L; VW
  Australia literature cites 60 L for 4MOTION — flag and verify against
  UK owner's manual.
- **Carried R1–R3 flags (listed, not resolved here)**: cam-carrier torque
  8 Nm+90° vs generic 10/15/20; VVT phaser range attribution 30/60; Gen3
  diverter-valve revision; intake-manifold revision by VIN.
- **Source hygiene**: low-grade aggregator charts were not used for
  engine-specific facts; injection/exhaust rows lean on EU/ROW-relevant
  sources per project rules. US-catalogue-only rows are flagged as
  load-bearing caveats.
