# Technical Reference Dossier: Volkswagen Golf R Mk7 (2014–2017, EA888 Gen 3, 300 PS)
### Source material for a systems-hierarchical interactive 3D model of the whole car and its engine

## TL;DR
- The Mk7 Golf R (pre-facelift, engine codes **CJXB**/**CJXC**) is a MQB-platform, steel-monocoque AWD hatchback built around a transverse 2.0 TSI EA888 Gen 3 engine, a 6-speed manual (MQ350/02Q) or 6-speed wet-clutch DSG (DQ250), and a Haldex Gen 5 4MOTION rear coupling — a genuinely modular architecture that maps cleanly onto a systems → assemblies → sub-assemblies → parts 3D hierarchy of roughly 1,800–2,500 catalogued distinct parts for a "every nut and cranny" build.
- The engine is the richest subsystem to model: closed-deck cast-iron block, integrated exhaust manifold in the head, Audi Valvelift exhaust system, dual (port + direct) injection, an IHI **IS38** turbo, and the innovative rotary-slide-valve thermal-management module (N493) — and it carries well-documented failure points (plastic water-pump/thermostat housing, PCV valve, timing-chain tensioner history, HPFP, carbon build-up, and the **intake manifold flap/position-sensor P2015 fault** the owner is chasing).
- The single best digital-build resource stack is: VW/Audi **Self-Study Programmes** (SSP 606 engine, SSP 308 DSG, SSP 612 MQB chassis, SSP 406 DCC, plus Haldex SSPs) for how-it-works context; **ETKA / erWin / partslink24 / 7zap / oemvwshop** for exploded diagrams and OEM part numbers; the **Bentley** Golf Mk7 manual for torque specs; and existing Sketchfab/CGTrader/GrabCAD Mk7 shells as reference geometry — with the caveat that OEM diagrams are copyrighted and usable only as internal reference, not redistribution.

## Key Findings

**Identity & codes.** The pre-facelift Mk7 Golf R (2014–2017) uses the EA888 Gen 3 engine in two calibrations: **CJXB** (206 kW / 280 PS, the "ROW/AU 280" tune) and **CJXC** (221 kW / 300 PS, the headline 300 PS car; 292 hp / 280 lb-ft in US trim). Both are 1,984 cc, 82.5 mm bore × 92.8 mm stroke, 9.3:1 compression, firing order 1-3-4-2, with peak torque of 380 Nm from 1,800 rpm. The facelift Mk7.5 (2017+) kept the same engine family but changed the DSG from 6-speed DQ250 to 7-speed DQ381 and added the Active Info Display digital cluster.

**Dimensions & mass (hatch, pre-facelift).** Length ≈ 4,268 mm, width 1,799 mm (excl. mirrors), height ≈ 1,470 mm, wheelbase 2,626–2,631 mm. Kerb weight is **1,476 kg DIN** for the CJXC 300 PS car (ZePerfs technical data: "The VW Golf VII R 300 PS claimed weight (DIN) is 1476 kg / 3254 lb"), with a nose-heavy front-biased distribution typical of transverse AWD. Ride height is 20 mm below a base Golf and ~5 mm below the GTI.

**Platform.** MQB (Modularer Querbaukasten) steel monocoque. Per Volkswagen Newsroom ("The new Golf – Body II – engineering"), the body-in-white "weighs 23 kg less" than the Mk6, broken down as "−12 kg – Use of high-strength and advanced high-strength steel grades and reduction of sheet metal thickness," "−4 kg – Only using materials where they are needed," and "−7 kg – Optimising profile and surface geometries." The same source states "The share of high-strength steels has grown from 66 per cent to 80 per cent compared to the Golf Mk6," using hot-formed ultra-high-strength steel (up to ~1,000 MPa).

## Details

### 1. VEHICLE ARCHITECTURE

**MQB platform & BIW.** The Golf Mk7 was the launch vehicle for MQB. The only dimensionally fixed element is the pedal-box/front-axle-to-firewall relationship; everything else (wheelbase, track, overhangs) is variable. The body-in-white is a steel monocoque; VW attributes the 23 kg BIW saving to the three measures quoted above. Hot-formed steels (~1,000 MPa) are used in the safety cage: A-pillars, B-pillars, sills/rockers, tunnel, front longitudinal members, bulkhead. Aluminium is used in select suspension components. High-strength steel share rose from 66% (Mk6) to 80% (Mk7).

For the 3D build, treat the BIW as its own assembly tree: floorpan (front floor, rear floor, spare-wheel well), front longitudinals and crash boxes, front subframe mounts, firewall/bulkhead, A/B/C pillars, roof rails and roof panel, sills, wheel houses, rear panel, and the strut towers.

**Exterior dimensions (pre-facelift hatch):** Length ≈ 4,268 mm; Width 1,799 mm; Height ≈ 1,470 mm; Wheelbase 2,626–2,631 mm. Front/rear track are approximately 1,538 mm front / 1,516 mm rear (MQB Golf figures; confirm against build sheet). Kerb weight 1,476 kg DIN (CJXC, manual). The Variant (estate) is longer (≈4,562 mm) and heavier (≈1,574 kg).

**Body panels (3-door and 5-door).** Both bodystyles were offered pre-facelift. Bolt-on panels to catalogue separately: bonnet, front wings (fenders, L/R), doors (2 vs 4 + tailgate), tailgate/hatch, front and rear bumper covers, sill extensions. Fixed/welded outer skin: roof, quarter panels, cowl. The 3-door uses longer single doors with different hinges/mirrors/glass; the 5-door adds rear doors, rear door glass and handles.

**Golf R-specific exterior parts.** R-specific front bumper with larger air intakes and R-specific lower grille/spoiler; R-specific rear bumper with a diffuser insert framing the **quad exhaust tips** (two chrome twin-tip outlets, one per side — the R's defining rear signature vs GTI's twin left-side tips); roof spoiler; gloss-black door mirror caps; "R" badging (grille badge, tailgate "R" logo, front-wing/no-wing depending on market), R-specific side skirts, and standard bi-xenon/LED headlamps with LED tail lamps. Blue brake calipers and "R" wheels (Cadiz 18" / Pretoria 19") complete the look.

### 2. ENGINE — EA888 Gen 3 2.0 TSI (CJXB/CJXC)

**Cylinder block.** Closed-deck, grey cast iron (**GJL 250**), 82.5 mm bore, 92.8 mm stroke, 1,984 cc. Casting changed from flat to upright pouring; nominal wall thickness reduced from 3.5±0.8 mm to 3.0±0.5 mm. Two horizontally-staggered **balance shafts** (spheroidal graphite cast iron) run at 2× crank speed in opposite directions (idler gear reverses the second), on low-friction roller bearings, to cancel second-order inertial forces. The **mechanical coolant pump is driven off a balance shaft** via a belt.

**Crankshaft, rods, pistons.** Forged steel crankshaft, induction hardened, four counterweights, five main bearings (48 mm dia). Connecting rods 36MnVS4, cracked (fracture-split) caps — the stock forged rods are documented to ~500 WHP (RWC Motorsport). Gen 3 pistons carry a strength-enhanced alloy coating; CJXB/CJXC use unique pistons for **9.3:1** compression (vs 9.6:1 GTI). Piston oil-jet cooling is **electronically controlled** (solenoid valve) with a higher flow rate on the R.

**Cylinder head & valvetrain.** Cross-flow head in AlSi10Mg on a three-layer MLS gasket, with the **exhaust manifold integrated into the head** and a water-cooled exhaust-gas cooling loop (eliminates full-load fuel enrichment for cooling → better economy/EGT control). DOHC, chain-driven (gear-type chain), roller-finger cam followers on needle bearings with hydraulic lash adjusters. Intake valves solid-stem, chrome-plated; exhaust valves nitrided, higher-Ni, tempered, **sodium-filled stems**, upgraded seat rings for the R's higher thermal load.

**Variable valve timing & lift.** Continuously variable cam phasing on both cams — intake range 30°, exhaust range 60° (relative to crank). Exhaust uses **Audi Valvelift System (AVS)**: two-step cam lobes (small/large) switched by electromagnetic actuators sliding the cam element axially. Below ~3,100 rpm the small lobe gives late exhaust opening, blocks exhaust backflow in overlap, and enables advanced intake timing for low-end torque and faster boost build; above that the large lobe is used.

**Timing chain system.** Single roller-type/gear chain at the flywheel end driving both cams, with a hydraulic tensioner and plastic guide rails. This is the historically weak area across EA888 generations (see failures).

**Cooling / thermal management.** The Gen 3's signature innovation. The **rotary-slide-valve module** (VW component **N493 = engine temperature control actuator / coolant regulator**, developed by Audi + Schaeffler) integrates with the mechanical water pump on the cold side of the engine. It houses **two mechanically-coupled rotary slide valves** driven by a single DC motor through a worm gear and lantern pinion; a rotary/steering-angle sensor monitors valve-1 position, and a safety expansion thermostat is included. Rotary valve 1 replaces the wax thermostat and regulates coolant between the oil cooler, cylinder head and main radiator; it can hold coolant anywhere between ~80 °C and 110 °C (up to ~107 °C at light load to cut friction) and, during warm-up, blocks or minimises flow into the block for faster warm-up. Rotary valve 2 controls coolant into the cylinder block (couples in at ~145° of valve-1 rotation, decouples at ~85°). The circuit also has switching valves for the heater core and the gearbox-oil heat exchanger. Control signal is a new CAN-like digital PWM (12 V, 1,000 Hz).

**Turbocharger — IHI IS38.** Single-scroll, internally-wastegated, integrated with the exhaust manifold/head; peak boost ~1.2 bar (17.4 psi). Boost is regulated by a **motorized electric wastegate actuator with position feedback** — per RWC Motorsport's EA888 Gen3 guide, "The ECU directly controls wastegate position via a motorized actuator with position feedback" (actuator part family 06K145xxx; the actuator must be re-calibrated by the ECU on replacement, or it throws a wastegate fault). Includes a pulsation damper and an O2 sensor directly upstream of the turbine. Documented wheel geometry: turbine inducer/exducer 47.4/54.7 mm, 8 blades; compressor inducer/exducer 45.2/58.0 mm, 6+6 blades. A **diverter valve** (electric, recirculating) is fitted on the compressor.

**Charge-air / intercooler.** Front-mount air-to-air intercooler (in the MQB stack) with charge pipes/boost hoses from turbo outlet → intercooler → throttle body → intake manifold. Model the charge-air path as its own sub-assembly (hard pipes, silicone couplers, clamps, IC core, end tanks).

**Intake system (extra depth — the owner's live fault).** Airbox → intake tract (Gen 3 uses a MAP/boost-pressure-based speed-density load model with intake-air-temp/pressure sensor, not a traditional MAF on most trims) → turbo inlet → intercooler → throttle body (T30 bolts, ~7 Nm) → **plastic intake manifold with integrated variable runner flaps**. The complete manifold assembly for the CJXC Golf R is VW **06L133201AH** (original fitment; "intake manifold with flaps"), with the current genuine complete-assembly replacement being **06L133201FP** (supersedes 06L133201T → EM → FA → CM; sold as "complete intake manifold with incorporated flapper motor," fits Golf VII R/GTI, Audi S3/A3 8V, B9 A4, Mk3 TT). The integrated flap actuator/motor is VW **Intake Manifold Flap Motor V157**, and the **Intake Manifold Flap Position Sensor is G336**. Crucially: the **position sensor G336 IS available separately** as VW **06K907386D** (previous rev 06K907386B), mounted on the passenger side of the manifold — so a pure sensor fault can be fixed cheaply, but the **V157 flap motor/linkage is only supplied as part of the complete manifold**.

The associated fault is **P2015 / VAG 18447 / VCDS 008213 — "Intake Manifold Flap Position Sensor (Bank 1): Implausible Signal."** The Ross-Tech Wiki entry (18447/P2015/008213) lists Possible Causes verbatim: "Intake Manifold Flap faulty · Intake Manifold Flap Motor (V157) stuck/faulty · Engine Control Module Software/Firmware Version faulty · Wiring and/or Connector(s) from/to Intake Manifold Flap Motor (V157) faulty," and notes "The Intake Manifold Flap Motor (V157) and Manifold Runner Position Sensor (G336) may be Part of the same Unit." Note that VW TSB 2045138/8 (24-18-01, released 6/15/2020) defines P2015 as "Sender for Intake Manifold Flap Position/Air Flow Control, Implausible Signal," covers the older 2006-2008 BPY and 2008-2016 CCTA/CBFA 2.0T engines, and specifies that "An ODIS intake manifold adaptation process must be performed after intake manifold replacement."

Diagnosis path (VCDS): (1) run **Output Test [03]** to command V157 and confirm the flaps/linkage physically move; (2) monitor **Measuring Value Block 142** comparing actual vs specified flap position (should track 0% at idle → ~99% actuated); (3) run **Basic Settings / Group 142 adaptation** to re-teach end-stops after any part swap — an "ERROR" status flags a persisting mechanical/electrical fault; (4) check G336 sensor voltage (≈5 V ref; signal ~4.5 V closed → ~1.2 V open; a reading below ~0.4 V indicates over-travel past the stop). For the owner's car: if the linkage is intact and only the sensor reads implausibly, try 06K907386D first; if the flap arm is worn/detached, the fix is the complete 06L133201FP manifold, followed by the ODIS/VCDS adaptation. The Gen 3 plastic manifold is a revised, less-P2015-prone design than the Mk6/Gen1-2 unit, but it is not immune. Intake-manifold-to-head T30 bolts torque to ~9 Nm.

**Fuel system (dual injection).** Low-pressure: in-tank electric **LPFP** feeds the high-pressure pump at ~4–6 bar (good to ~400 WHP stock). High-pressure: cam-driven (exhaust-cam four-lobe) **HPFP** raising rail pressure to ~200 bar (up to ~2,900 psi under load). **Direct injectors** (one per cylinder, in-chamber) plus, on Gen 3, a separate set of **port injectors** in the intake runners (the "dual injection" that washes valves and cuts particulates for Euro 6). Cold start uses port injection for homogeneous mix plus a stratified DI charge at the plug with retarded timing for fast cat light-off; low speed uses both; mid/high load uses DI only for its charge-cooling benefit. Model: fuel tank, in-tank pump module/sender, feed line, HPFP on head, fuel rail(s), 4× DI injectors, 4× port injectors, rail pressure sensor.

**Exhaust — downpipe to quad tips.** Turbo (integrated manifold) → cast **downpipe with primary catalyst** → front/link pipe → centre resonator → rear silencer with **electronically-actuated exhaust flaps/valves** feeding the R-specific **quad tips** (2 per side). Valve control uses the factory drive-mode logic. (Note: a gasoline particulate filter/GPF appears on later Euro-6d cars, not the earliest pre-facelift R; verify by build date.) Lambda sensors: one upstream of turbine, plus post-cat sensor(s).

**PCV / crankcase ventilation.** Integrated into the valve/cam cover with a diaphragm PCV valve — a failure point across all EA888 generations (a torn diaphragm causes rough idle, boost/vacuum faults, oil consumption). Model the cover, PCV diaphragm/regulator, and breather hoses.

**Engine mounts & ancillaries.** Transverse three-point mounting: right-side (pendulum) hydraulic engine mount, left-side transmission mount, and a lower **dogbone/torque-arm (pendulum support)** to the subframe. Ancillary/belt-drive (FEAD): single serpentine belt with auto-tensioner driving the **alternator** and **A/C compressor**; **starter** on the block/bellhousing; note the coolant pump is NOT on the FEAD belt (it is balance-shaft driven). Engine-mount torques (MQB): mount-to-engine-bracket ~60 Nm + 90°; mount-to-frame-rail ~40 Nm + 90°.

**Known failure points & common issues.**
- **Water pump / thermostat (rotary-valve) housing:** plastic housing near hot exhaust side goes brittle and cracks/leaks, typically 60,000–90,000 miles; aftermarket reinforced/metal housings exist. The classic Gen 3 coolant weak point.
- **PCV valve** (valve-cover diaphragm): rough idle, oil consumption, boost/vacuum codes.
- **Intake manifold flap / G336 position sensor:** P2015 (owner's fault — see intake section).
- **Timing chain tensioner:** the historically notorious EA888 issue (worse on Gen1/Gen2, where tensioner failure allowed chain skip and valve-to-piston contact — cold-start "rattle" is the red flag). Gen 3 received a revised tensioner/guides and is markedly better, but cold-start rattle and, on tuned/high-rpm cars, tensioner-bolt concerns remain worth checking. Use latest-revision parts if servicing.
- **Turbo (IS38):** shaft/bearing wear and wastegate-actuator faults; upgraded ball-bearing replacements common.
- **Carbon build-up:** direct injection deposits on intake valves; reduced (not eliminated) by Gen 3 port injection; walnut-blasting is the remedy.
- **HPFP:** internal wear/pressure drop under high load, especially on tuned/ethanol cars; also **rear main seal** and oil-cooler/filter-housing weeps.

**Torque specifications (indicative — verify against Bentley/erWin for CJXB/CJXC).** General fastener classes (Gen 3 workshop data): M6 = 10 Nm, M8 = 20 Nm, M10 = 45 Nm, M12 = 65 Nm. Cylinder-head bolts (torque-to-yield, replace): most commonly **40 Nm + 90° + 90°** (an alternate published figure is 60 Nm + 180° — confirm). Main-bearing/ladder-frame bolts: **~65 Nm + 90°** (alt 60 Nm + 90°). Connecting-rod bolts (stretch, replace): **30 Nm + 90°**. Flywheel/drive-plate bolts: not firmly published by VW for Gen 3 — indicatively ~60 Nm + 90° (stretch, replace) — verify. **Wheel bolts: 120 Nm** (well-documented MQB spec). Main hub/axle bolt: 200 Nm + 180°. Front caliper-to-bearing-housing: 200 Nm; caliper-to-carrier: 35 Nm. (Bottom-end rebuild torques are not in consumer VW literature; the internal figures above come from tuner/parts references and should be treated as indicative.)

### 3. TRANSMISSION

**6-speed manual — MQ350 (gearbox code 02Q, AWD variant).** Conventional single dry clutch with a **dual-mass flywheel**, hydraulic release, reinforced clutch and short-shift for the R. Model: bellhousing, input/output shafts, six synchronised gear sets + reverse, selector forks and shift drum/linkage, differential/final drive integrated in the case, clutch disc, pressure plate, DMF, release bearing/slave. Rated for the ~380 Nm engine torque; the clutch is the weak link when tuned (aftermarket clutch packs common).

**6-speed DSG — DQ250 (wet dual-clutch).** The DQ250 (02E FWD / 0D9 AWD) is the world's first mass-produced passenger-car dual-clutch, a **wet (oil-cooled) multi-plate dual clutch**. Per TVS Engineering, it was "especially designed for VAG vehicles with an engine torque up to 350-380 Nm like the sportier versions of the Golf (GTI and R models)," and was introduced in 2003 on the Golf Mk4 R32. Two clutch packs (K1 odd gears 1/3/5, K2 even 2/4/6) submerged in oil; a **mechatronic unit (VW code J743)** houses the valve body, electric pump, pressure accumulator, solenoids, TCU and speed/pressure sensors, pressurising the hydraulic circuit to ~40–60 bar. Separate oil circuits: gear/diff oil (GL-type) and mechatronic hydraulic oil. Model: bellhousing/housing, dual-clutch pack, mechatronic valve body, two input shafts (concentric), output shafts, gear sets, dual-mass damper, integrated final drive/diff, and the AWD power take-off (bevel/transfer). Known issues: mechatronic pressure-accumulator wear, clutch wear if launched hard from cold; wet design tolerates track abuse better than dry DSGs.

**Mk7.5 change:** the facelift replaced DQ250 with the **7-speed DQ381** wet-clutch DSG (higher torque capacity, ~7 ratios, revised mechatronics) — note this if modelling a facelift car.

### 4. DRIVETRAIN / AWD — Haldex Gen 5 4MOTION

Layout: engine/transaxle at the front drives the front wheels directly; a **power take-off / bevel box (angle drive)** off the transaxle sends torque rearward via a **propshaft** to the **rear final drive unit**, which carries the **Haldex Gen 5 electro-hydraulic coupling** ahead of the rear differential. The coupling is a **wet multi-plate clutch** engaged by an **electro-hydraulic oil pump** and controlled by the Haldex controller (its own ECU), pre-emptively sending torque rearward before slip occurs (up to ~50% rearward). Four-wheel EDS and XDS+ (brake-based transverse locks/torque vectoring) run through the ESC.

**Haldex internals to model:** clutch pack (friction + steel plates), annular piston, the **electric feed/charge pump (0CQ598549)**, filter/screen, accumulator, control solenoid/valve, controller module, and the rear diff gear set (separate GL-5 gear oil from the Haldex fluid). **Known service issue:** the Gen 5 pump and its fine mesh filter clog on tuned/hard-driven Rs, causing pump failure — symptoms are front-wheel spin, axle tramp/bounce off the line and often no dash warning (only a stored code). Fix is pump + fluid + filter/screen and a VCDS "pump learn"/basic-settings re-adaptation. Haldex fluid change is on a service interval; filter cleaning is owner-wisdom-recommended.

**Driveshafts & CV joints:** front driveshafts (unequal length, with intermediate bearing on one side typical of transverse layouts), rear driveshafts, each with inner (tripod/plunge) and outer (Rzeppa ball) CV joints and boots.

### 5. SUSPENSION & CHASSIS

**Front:** MacPherson strut. Components: strut (spring + damper; **DCC damper if fitted**), upper strut/top mount + bearing, coil spring + upper/lower seats, lower control arm (newly-developed "low wishbone" with track-stabilising scrub radius), ball joint, steering knuckle/bearing housing, front subframe (aluminium content), anti-roll bar with drop links and bushes. Ride height 20 mm below base Golf.

**Rear:** multi-link (four-link) independent. Components: rear subframe, longitudinal (trailing) link, three lateral links per side (upper, lower/spring link, toe/control link), spring (separate from damper), damper (DCC if fitted), wheel bearing/carrier, anti-roll bar + links, bushings (tuned for lateral rigidity/steering precision on the R).

**DCC (Dynamic/Adaptive Chassis Control).** Optional adaptive dampers with electronically-controlled proportional valves that vary oil flow in milliseconds. It reads wheel-displacement sensors and body accelerometers plus Chassis-CAN vehicle data, computing per-corner damping and (on this generation) independently varying rebound vs compression for transverse manoeuvres. Integrated with the **Driving Profile Selector** (Eco / Normal / Individual / **Race** — Race is R-specific; five profiles with DCC). Model each corner's DCC damper valve/solenoid and the DCC control unit + sensors. Cars without DCC have passive sport dampers.

**Steering.** Electromechanical power steering (EPS) with a **progressive-ratio rack** (variable-pitch rack teeth so the ratio quickens off-centre), rack-mounted motor. Model: rack housing, pinion, motor/ECU, tie rods, ends, boots, intermediate shaft, column.

**Wheels & OEM tyres.** OEM 18" "Cadiz" (7.5J×18 ET49) with **225/40 R18**, and optional 19" "Pretoria" (8J×19 ET45–50) with **235/35 R19**. 5×112 PCD, 57.1 mm centre bore. Ball-seat 14×1.5 wheel bolts, 120 Nm.

### 6. BRAKES

Front: **340 mm × 30 mm ventilated** discs with **single-piston floating (sliding) calipers** (aluminium, painted blue, "R" script). Rear: **310 mm ventilated** discs with single-piston floating calipers and an **electronic parking brake** (motor-on-caliper actuators, EPB control unit) — the rear pads are R-specific (larger guide tabs/hooks) and NOT interchangeable with the manual-handbrake GTI Performance Pack despite shared disc sizes. Hydraulics: tandem master cylinder + vacuum brake booster (brake fluid ~1.2 L, DOT4, 2–3 yr change). ABS/ESC: **Bosch ESP hydraulic unit + control module** (MK100/MK60EC1-class) integrating ABS, ESC, EDS, XDS+, hill-hold and the AWD brake-vectoring logic. Model: master cylinder, booster, ABS/ESC modulator + pump, 4× calipers/carriers/discs/pads, EPB actuators + module, brake hoses/hard lines, and wheel-speed sensors at each corner.

### 7. ELECTRICAL & ELECTRONICS

**Engine ECU.** Pre-facelift Mk7 R uses a **Bosch MED 17.5.2** gasoline DI ECU (Infineon TriCore); per RWC Motorsport, "The factory Bosch MED 17.5.2 ECU can be flash-tuned to support big turbo builds up to approximately 600-650 WHP." Some sources cite SIMOS 18 on later/facelift cars, so confirm from the ECU label/VCDS on the specific vehicle. The ECU manages the dual-injection fuelling, IS38 boost/electric wastegate, AVS, and thermal-management valve.

**Network architecture.** Multi-bus with a central **gateway (J533)** bridging separate CAN buses — powertrain/drivetrain CAN-C (engine, DSG/TCU, ABS/ESC, Haldex), comfort/convenience CAN-B, infotainment CAN and MOST/LVDS for media, plus LIN sub-buses for small actuators and a diagnostic CAN to the OBD port. The gateway also hosts the instrument cluster interface and does bus-to-bus translation and central diagnostics.

**Sensor catalogue (model as small parts on their host assemblies):** MAP/boost-pressure + intake-air-temp sensor(s) (Gen 3 is speed-density, no traditional MAF on most trims), charge-pressure sensor, throttle-position, crankshaft position (on block), 2× camshaft position (Hall), knock sensors (2, cylinder-selective), coolant-temp sensors, oil-level/temp/pressure, **intake manifold flap position sensor G336**, rail-pressure sensor, upstream + downstream lambda/O2 sensors, EGT (integrated cooling), wheel-speed (×4), steering-angle, yaw/lateral-accel (ESC cluster), DCC wheel-displacement + body accelerometers, brake-pad wear (front-left typical), ambient/rain/light.

**Battery & charging.** Front-mounted lead-acid battery (typ. ~68–72 Ah AGM/EFB) with battery-management; belt-driven alternator; energy recuperation/start-stop logic. Lighting: bi-xenon or LED headlamps with LED DRL, LED tail lamps, indicators, fogs; interior LED.

**Infotainment / cluster.** Pre-facelift: analogue instrument cluster with colour MFD; MIB2 infotainment (Composition/Discover Media/Pro) with 6.5"–8" touchscreens, App-Connect. **Mk7.5 facelift** adds the **Active Info Display** (12.3" fully-digital configurable cluster, VW's Virtual-Cockpit analogue) and updated MIB2.5 with glass touchscreens and gesture control on Discover Pro.

### 8. COOLING / HVAC & BODY SYSTEMS

**Cooling stack (front, model front-to-back):** A/C condenser, main radiator (high-performance on the R, with one or two **auxiliary radiators** depending on market), charge-air intercooler, plus cooling fan(s)/shroud. Additional loops: the rotary-valve thermal module circuit, oil cooler, gearbox-oil heat exchanger, heater core, and expansion/degas tank. **HVAC:** blower, evaporator, heater core, A/C compressor (belt-driven), expansion valve, receiver/drier, cabin filter, ducting and flap actuators, Climatronic control head. **Fuel storage:** plastic fuel tank (~55 L), in-tank pump/sender module, filler neck/EVAP charcoal canister, feed lines. (The Golf R's relocated fuel-filler hose gives more rear-inner wheel clearance than the GTI — a useful modelling detail.)

### 9. RESOURCES FOR THE 3D BUILD

**Exploded diagrams + OEM part numbers.**
- **ETKA** (dealer electronic parts catalogue) — the authoritative source for exploded assembly diagrams and superseding part numbers; not publicly licensed.
- **VW erWin** (erwin.volkswagen.de) — official repair/technical info + parts by subscription (hourly/daily/monthly), includes workshop manuals and torque data.
- **partslink24** — professional OEM parts catalogue access (ETKA data) by subscription.
- Free/consumer OEM-diagram sites showing exploded views with part numbers: **7zap.com**, **oemepc / oemvwshop.com**, **VW classic parts**, plus retailers **ECS Tuning**, **FCP Euro**, **Deutsche Auto Parts (shopDAP)**, **URO/JHM** that overlay diagrams on shopping. These are excellent for cross-referencing the manifold numbers above (06L133201FP, 06K907386D) and for assembly geometry cues.

**Self-Study Programmes (SSP) — the best "how it works" context for the model's interactivity:**
- **SSP 606** – Audi 1.8/2.0 TFSI EA888 3rd generation (the core engine document).
- **SSP 522** – "The 2.0-litre 162/169 kW TSI engine" (VW companion).
- **SSP 308** – Direct Shift Gearbox 02E (DSG fundamentals); DQ250-relevant DSG SSPs.
- **SSP 612** – Audi A3 '13 (MQB) suspension/brakes/steering/DCC/ACC.
- **SSP 406** – DCC Adaptive Chassis Control design & function.
- **SSP 399 / 317 / 225** – electromechanical steering (parallel-axis drive / dual-pinion / EPS fundamentals).
- **SSP 475** – ESC systems.
- **SSP 515** – Haldex (4MOTION) description (feature/function, not a repair manual).
- Additional MQB-era SSPs (222 mapped cooling, 246 VVT, 374 traction/assist) round out subsystem context.
(These are "for internal use" training documents; widely mirrored online but technically VW/Audi copyright.)

**Workshop manuals.** **Bentley Publishers** Golf Mk7 manual (the definitive English torque/procedure reference for the enthusiast) and **erWin** PDFs (official). Haynes coverage of the Mk7 is thinner and less useful for the R's specifics.

**Community / video resources.** **GolfMk7.com** and **VWROC** (VW R Owners Club) forums (model-specific DIY, fault threads, Haldex/DSG service); **Deutsche Auto Parts** and **Humble Mechanic** YouTube channels (EA888/MQB teardown and diagnosis walk-throughs); FCP Euro and Ross-Tech Wiki (fault-code and component-code reference — the source of the V157/G336/P2015 definitions).

**Existing 3D assets (reference geometry / starting points).**
- **Sketchfab:** free Mk7/Mk7.5 Golf R and GTI exterior/interior models (varying quality/licences).
- **CGTrader / Hum3D / TurboSquid:** paid high-poly Golf 7 R exteriors (MAX/OBJ/FBX/C4D), good for outer-body reference.
- **GrabCAD:** engineering-oriented CAD (some EA888 and Golf 7 parts) — better for mechanical reference than the render-focused sites.
- No known single "complete factory-accurate" teardown model exists publicly; expect to build powertrain internals from SSP diagrams + OEM exploded views rather than downloading them ready-made.

**Legal / licensing.** ETKA/erWin/partslink24 data and the SSP PDFs are VW/Audi copyright — fine as **internal reference** to inform your own modelled geometry and taxonomy, but do not redistribute the diagrams or PDFs, and do not resell models that embed OEM CAD or copyrighted diagram artwork. Paid marketplace models carry their own per-licence terms (editorial vs commercial) — check before using in any shipped/monetised product.

### 10. STRUCTURE FOR THE 3D MODEL

**Recommended taxonomy (systems → assemblies → sub-assemblies → parts):**
1. **Body & Structure** — BIW (floor, pillars, rails, towers), outer panels (3-dr/5-dr variants), closures, glass, exterior trim & R-specific parts, bumpers, lighting.
2. **Powertrain – Engine** — short block (block, crank, rods, pistons, balance shafts), cylinder head & valvetrain (cams, AVS, valves, chain), lubrication (oil pump, cooler, pan, PCV), cooling (rotary-valve module N493, pump, hoses), air/boost (airbox, IS38, intercooler, charge pipes, throttle, **intake manifold + V157/G336**), fuel (LPFP, HPFP, rails, DI + port injectors), exhaust (downpipe/cat, resonator, valved rear silencer, quad tips), ignition, ancillaries (alternator, A/C compressor, starter, FEAD), engine mounts.
3. **Powertrain – Transmission** — MQ350 manual OR DQ250 DSG (clutch/DMF or dual-clutch + mechatronic J743, gear sets, casings).
4. **Drivetrain / AWD** — bevel/PTO box, propshaft, rear final drive, Haldex Gen 5 coupling (pump/clutch/controller), driveshafts + CV joints.
5. **Suspension & Steering** — front struts/arms/subframe, rear multilink/subframe, ARBs, DCC dampers + control, EPS rack, wheels/tyres/hubs/bearings.
6. **Brakes** — calipers/discs/pads (F/R), master + booster, ABS/ESC modulator, EPB, lines, wheel-speed sensors.
7. **Electrical & Electronics** — ECU, gateway + CAN buses, sensor set, harnesses (engine-bay, cabin, door, rear zones), battery/charging, lighting, infotainment/cluster.
8. **Cooling/HVAC & Fluids** — cooling stack (condenser/radiator/aux/intercooler/fans), HVAC unit, heater/AC loops, fuel tank/lines, washer.
9. **Interior** — seats, dash/cluster/infotainment, HVAC controls, trims, safety (airbags, belts).
10. **Fasteners & Hardware library** — a shared, re-usable catalogue keyed by class (M6/M8/M10/M12 bolts, TTY head/rod/main bolts, T30/triple-square/spline drives, wheel bolts, hose clamps, circlips, seals/gaskets/O-rings) so every assembly references standard hardware with its torque value as metadata.

**Estimated part count.** A faithful "every nut and cranny" build is realistically **~1,800–2,500 distinct modelled parts/assemblies**: the engine alone (with valvetrain, fasteners, sensors, hoses) is ~600–800; transmission/DSG internals ~200–350; AWD/driveline ~120; suspension/steering/brakes ~250–350; body/closures/trim ~300–450; electrical/sensors/harness nodes ~200–300; HVAC/cooling ~120–180; interior ~200+. Using the shared fastener library avoids exploding this further.

**Phased build order (recommended):**
1. **Phase 1 — Engine short block + head** (highest learning value and the owner's focus; establishes scale/interfaces). Build to a fully explodable EA888 with working AVS, chain, and the rotary-valve cooling module.
2. **Phase 2 — Engine ancillaries + intake/fuel/exhaust** (prioritise the **intake manifold, V157 flap motor and G336 sensor** as an interactive, animated sub-assembly given the live P2015 fault — let the user toggle the flap and see the sensor signal).
3. **Phase 3 — Transmission** (MQ350 or DQ250 as the car specifies) mated to the engine.
4. **Phase 4 — Drivetrain/AWD** (bevel box, propshaft, Haldex, driveshafts).
5. **Phase 5 — Chassis** (subframes, suspension, steering, brakes, wheels) — gives a rolling chassis.
6. **Phase 6 — Body-in-white + closures + exterior R parts.**
7. **Phase 7 — Electrical/electronics + sensors + HVAC/cooling stack + interior**, finishing with the CAN/gateway overlay so the user can trace signals between the modelled ECUs and sensors.

## Recommendations
1. **Start the 3D build with the engine, and make the intake-manifold assembly the first fully-interactive sub-assembly** — model the plastic manifold, the integrated V157 flap motor, the runner flaps, and the G336 position sensor as separable animated parts, with a "fault mode" that reproduces P2015 (flap stuck / sensor over-travel). This directly serves the owner's current diagnosis and is the highest-value learning artefact.
2. **For the owner's live fault right now:** confirm with VCDS — run Output Test [03] on V157, watch Measuring Block 142 (actual vs specified), and check G336 voltage. If the linkage is mechanically intact and only the sensor reads implausibly, fit the standalone sensor **06K907386D** (cheap); if the flap arm is worn/detached, budget for the complete manifold **06L133201FP**. Re-run Group 142 basic-settings / ODIS adaptation after any swap.
3. **Anchor part numbers and geometry in ETKA/erWin/partslink24 or the free 7zap/oemvwshop diagrams**, and use SSP 606 (engine), SSP 308/DSG, SSP 612/406 (chassis/DCC) and the Haldex SSP for the "how it works" interactivity layer; keep the Bentley Mk7 manual as the torque-spec authority.
4. **Build a shared fastener/hardware library early** and attach torque values as metadata — it keeps the part count sane and makes the model genuinely instructive ("this bolt is TTY, 40 Nm + 90° + 90°, replace on removal").
5. **Verify car-specific specifics from the actual VIN/build sheet before finalising:** exact ECU (MED 17.5.2 vs SIMOS 18), presence of DCC, wheel size (18 Cadiz vs 19 Pretoria), GPF fitment, and (if a facelift) DQ381 + Active Info Display. These change which parts to model.

**Thresholds that change the plan:** if the car turns out to be a Mk7.5, switch the transmission module to DQ381 (7-speed) and the cluster to Active Info Display; if it's a manual, model MQ350 + DMF instead of DQ250; if no DCC, use passive dampers (no DCC valves/CU).

## Caveats
- **Sourcing quality:** dimensions vary slightly by market/spec and source; treat ±a few mm as normal and confirm against the build sheet. The 1,476 kg DIN kerb weight is the CJXC 300 PS figure (ZePerfs); manuals/DSG and market options shift this by 10–20 kg. Front/rear track figures are MQB-Golf approximations pending a VW spec confirmation.
- **Torque figures:** VW does not publish bottom-end rebuild torques in consumer literature; head/rod/main/flywheel figures here are from tuner/parts references and carry noted conflicts (head 40 Nm+90°+90° vs 60 Nm+180°; mains 60 vs 65 Nm+90°). Verify in Bentley/erWin before any rebuild. Wheel-bolt (120 Nm), hub (200 Nm+180°) and caliper torques are well-established.
- **ECU identity:** secondary sources disagree (MED 17.5.2 vs SIMOS 18); read the actual ECU label/VCDS.
- **GPF/particulate filter and dual-injection details** shifted within the 2014–2017 run and into Mk7.5; earliest pre-facelift Rs may differ from late cars — verify by build date.
- **P2015 nuance:** VW's own TSB 2045138/8 (24-18-01) documents P2015 primarily on the older Gen1/Gen2 (BPY/CCTA/CBFA) manifolds; the Gen 3 plastic manifold is a revised, less-failure-prone design, but the fault still occurs — the diagnostic path above is Gen-3-appropriate, and an ODIS/VCDS intake-manifold adaptation is mandatory after replacement.
- **Licensing:** SSPs and ETKA/erWin/partslink24 diagrams are VW/Audi copyright (internal reference only); marketplace 3D models carry their own licences — do not embed or redistribute either in a shipped product without clearing rights.
