# UNVERIFIED — parts awaiting OEM data

Per the project rule, no OEM part number is ever invented: when the dossier
doesn't provide one, the part stores `null` and is logged here. Verify
against ETKA / erWin / partslink24 / 7zap (dossier §9) and backfill the
JSON when confirmed.

## Front brake corner (Phase 0)

| Part (id) | Missing | Notes |
| --- | --- | --- |
| Brake disc, front (`front-brake-disc`) | OEM number, material | 340 × 30 mm ventilated per dossier §6; grey cast iron is typical but unconfirmed |
| Brake caliper housing (`front-brake-caliper`) | OEM number | Aluminium + blue paint confirmed by dossier §6 |
| Caliper carrier (`front-brake-carrier`) | OEM number, material | |
| Brake pad, front outer (`front-brake-pad-outer`) | OEM number, material | |
| Brake pad, front inner (`front-brake-pad-inner`) | OEM number, material | Wear-sensor variant to confirm (front-left typical) |
| Caliper guide bolts (`front-caliper-guide-bolts`) | OEM number, exact class/length | Torque 35 Nm is dossier-confirmed |
| Carrier bolts (`front-carrier-bolts`) | OEM number, replace-after-use status | Torque 200 Nm is dossier-confirmed |

## Remaining brake corners (operator-requested addition)

Front-left mirrors the front-right (same missing items). Rear corners
additionally need: **rear disc thickness** (modelled at a typical 22 mm
— not in the dossier), rear caliper/carrier bolt torques (dossier
states front only), EPB actuator part number, and the R-specific rear
pad number (the one that is NOT the GTI Performance Pack pad).

## Engine — short block & head (Phase 1)

The dossier gives materials and dimensions for these but no OEM part
numbers; all 21 records store `null`. Torque caveats are recorded on the
records themselves (head/ladder/rod figures are dossier-flagged as
indicative tuner-reference values — verify in Bentley/erWin).

| Part (id) | Missing |
| --- | --- |
| Cylinder block (`cylinder-block`) | OEM number |
| Main-bearing ladder (`main-bearing-ladder`) | OEM number, material, exact torque |
| Crankshaft (`crankshaft`) | OEM number |
| Connecting rods (`connecting-rods`) | OEM number |
| Pistons (`pistons`) | OEM number |
| Piston oil jets (`piston-oil-jets`) | OEM number, material |
| Balance shafts (`balance-shaft-intake`, `-exhaust`) | OEM numbers |
| Cylinder head (`cylinder-head-casting`) | OEM number |
| Head gasket (`head-gasket`) | OEM number |
| Head bolts (`head-bolts`) | OEM number, material, definitive torque (40+90+90 vs 60+180) |
| Camshafts (`intake-camshaft`, `exhaust-camshaft`) | OEM numbers, material |
| AVS elements + actuators (`avs-cam-elements`, `avs-actuators`) | OEM numbers, material |
| Valves (`intake-valves`, `exhaust-valves`) | OEM numbers |
| Chain drive (`timing-chain`, `crank-sprocket`, `chain-tensioner`, `chain-guide-rails`) | OEM numbers; tensioner latest-revision number especially worth pinning down |

## Intake / fuel / exhaust (Phase 2)

Two numbers ARE dossier-verified and recorded on their parts: the
complete manifold **06L133201FP** and the G336 sensor **06K907386D**.
The V157 motor and runner flaps intentionally carry `null` — they are
only sold inside the complete manifold (dossier §2).

| Part (id) | Missing |
| --- | --- |
| Airbox (`airbox`) | OEM number |
| Turbo (`turbo-is38`) | OEM number (IS38 is the model; exact 06K unit varies) |
| Wastegate actuator (`wastegate-actuator`) | exact 06K145xxx variant |
| Diverter valve (`diverter-valve`) | OEM number |
| Charge pipes (`charge-pipe-hot`, `-cold`) | OEM numbers, materials |
| Intercooler (`intercooler`) | OEM number |
| Throttle body (`throttle-body`) | OEM number |
| Manifold bolts (`manifold-bolts`) | OEM number, exact class/length |
| HPFP (`hpfp`) | OEM number |
| Fuel rails + injectors (`di-fuel-rail`, `di-injectors`, `port-fuel-rail`, `port-injectors`) | OEM numbers |
| Rail pressure sensor (`rail-pressure-sensor`) | OEM number |
| Exhaust line (`downpipe-cat`, `link-pipe`, `resonator`, `rear-silencer`, `exhaust-flap-actuators`, `quad-tips`) | OEM numbers |
| Lambda sensors (`lambda-sensors`) | OEM numbers |

## Transmission — DQ250 (Phase 3)

No OEM numbers or torque specs in the dossier for DSG internals; all 9
records store `null`. Confirm the gearbox code (DQ250/0D9) from the
bellhousing label.

| Part (id) | Missing |
| --- | --- |
| All DQ250 records (`dsg-housing`, `dual-mass-damper`, `dual-clutch-pack`, `mechatronic-j743`, `input-shafts`, `gear-set-1`, `gear-set-2`, `final-drive-diff`, `pto-bevel`) | OEM numbers; ratios; service capacities |

## Driveline — Haldex Gen 5 (Phase 4)

Dossier-verified: the charge pump **0CQ598549** (recorded on its part).
Everything else stores `null`.

| Part (id) | Missing |
| --- | --- |
| Propshaft + centre bearing (`propshaft-front`, `-rear`, `center-bearing`) | OEM numbers |
| RDU + Haldex internals (`rdu-housing`, `haldex-coupling`, `haldex-filter`, `haldex-controller`, `rear-diff-gears`) | OEM numbers; fluid part numbers + capacities |
| Driveshafts (`rear-driveshafts`, `front-driveshaft-right`, `front-driveshaft-left`) | OEM numbers |
