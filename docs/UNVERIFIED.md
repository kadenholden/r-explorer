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
