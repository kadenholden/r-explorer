import { registerRecipe, resolveRecipe } from './registry'
import { brakeDisc } from './brakeDisc'
import { brakeCaliper } from './brakeCaliper'
import { brakeCarrier } from './brakeCarrier'
import { brakePad } from './brakePad'
import { hexBolt } from './fasteners'
import { engineBlock } from './engineBlock'
import { crankshaft } from './crankshaft'
import { connectingRod } from './connectingRod'
import { piston } from './piston'
import { balanceShaft } from './balanceShaft'
import { ladderFrame } from './ladderFrame'
import { oilJet } from './oilJet'
import { cylinderHead, headGasket } from './cylinderHead'
import { camshaft, avsCamElement, avsActuator, valve } from './camshaft'
import { timingChain, chainSprocket, chainTensioner, chainGuideRail } from './timingDrive'
import { is38Turbo, wastegateActuator, diverterValve, lambdaSensor } from './turbo'
import { airbox, intercooler, chargePipeHot, chargePipeCold, throttleBody } from './airPath'
import { intakeManifold, runnerFlaps, flapMotorV157, sensorG336 } from './intakeManifold'
import { hpfp, fuelRail, injector, railPressureSensor } from './fuelSystem'
import {
  downpipeCat,
  linkPipe,
  resonator,
  rearSilencer,
  exhaustTwinTip,
  exhaustValveActuator,
} from './exhaust'

registerRecipe('brakeDisc', brakeDisc)
registerRecipe('brakeCaliper', brakeCaliper)
registerRecipe('brakeCarrier', brakeCarrier)
registerRecipe('brakePad', brakePad)
registerRecipe('hexBolt', hexBolt)
registerRecipe('engineBlock', engineBlock)
registerRecipe('crankshaft', crankshaft)
registerRecipe('connectingRod', connectingRod)
registerRecipe('piston', piston)
registerRecipe('balanceShaft', balanceShaft)
registerRecipe('ladderFrame', ladderFrame)
registerRecipe('oilJet', oilJet)
registerRecipe('cylinderHead', cylinderHead)
registerRecipe('headGasket', headGasket)
registerRecipe('camshaft', camshaft)
registerRecipe('avsCamElement', avsCamElement)
registerRecipe('avsActuator', avsActuator)
registerRecipe('valve', valve)
registerRecipe('timingChain', timingChain)
registerRecipe('chainSprocket', chainSprocket)
registerRecipe('chainTensioner', chainTensioner)
registerRecipe('chainGuideRail', chainGuideRail)
registerRecipe('is38Turbo', is38Turbo)
registerRecipe('wastegateActuator', wastegateActuator)
registerRecipe('diverterValve', diverterValve)
registerRecipe('lambdaSensor', lambdaSensor)
registerRecipe('airbox', airbox)
registerRecipe('intercooler', intercooler)
registerRecipe('chargePipeHot', chargePipeHot)
registerRecipe('chargePipeCold', chargePipeCold)
registerRecipe('throttleBody', throttleBody)
registerRecipe('intakeManifold', intakeManifold)
registerRecipe('runnerFlaps', runnerFlaps)
registerRecipe('flapMotorV157', flapMotorV157)
registerRecipe('sensorG336', sensorG336)
registerRecipe('hpfp', hpfp)
registerRecipe('fuelRail', fuelRail)
registerRecipe('injector', injector)
registerRecipe('railPressureSensor', railPressureSensor)
registerRecipe('downpipeCat', downpipeCat)
registerRecipe('linkPipe', linkPipe)
registerRecipe('resonator', resonator)
registerRecipe('rearSilencer', rearSilencer)
registerRecipe('exhaustTwinTip', exhaustTwinTip)
registerRecipe('exhaustValveActuator', exhaustValveActuator)

export { resolveRecipe }
