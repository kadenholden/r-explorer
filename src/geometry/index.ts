import { registerRecipe, resolveRecipe } from './registry'
import { brakeDisc } from './brakeDisc'
import { brakeCaliper, epbActuator } from './brakeCaliper'
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
import {
  dsgHousing,
  dualMassDamper,
  dualClutchPack,
  mechatronicJ743,
  inputShafts,
  gearCluster,
  finalDriveDiff,
  ptoBevel,
} from './dq250'
import {
  propshaftFront,
  centerBearing,
  propshaftRear,
  rduHousing,
  haldexCoupling,
  haldexPump,
  haldexFilter,
  haldexController,
  rearDiffGears,
  driveshaft,
} from './driveline'
import {
  coilSpring,
  strutFront,
  damperRear,
  lowerControlArm,
  steeringKnuckle,
  wheelCarrier,
  subframe,
  antiRollBar,
  dropLink,
  epsRack,
  tieRod,
  lateralLink,
  trailingLink,
} from './suspension'
import { pretoriaWheel, tyre, wheelBoltRing } from './wheels'
import {
  oilPan,
  valveCoverPcv,
  ignitionCoil,
  feadBelt,
  alternator,
  acCompressor,
  starterMotor,
  hydraulicMount,
  dogboneMount,
} from './ancillaries'
import {
  floorpan,
  frontStructure,
  bulkhead,
  strutTower,
  pillar,
  roofPanel,
  sillRail,
  rearStructure,
  bonnet,
  frontWing,
  quarterPanel,
  doorShell,
  tailgate,
  bumperFrontR,
  bumperRearR,
  roofSpoiler,
  mirrorCap,
  sideSkirt,
  glassPane,
} from './body'

registerRecipe('brakeDisc', brakeDisc)
registerRecipe('brakeCaliper', brakeCaliper)
registerRecipe('epbActuator', epbActuator)
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
registerRecipe('dsgHousing', dsgHousing)
registerRecipe('dualMassDamper', dualMassDamper)
registerRecipe('dualClutchPack', dualClutchPack)
registerRecipe('mechatronicJ743', mechatronicJ743)
registerRecipe('inputShafts', inputShafts)
registerRecipe('gearCluster', gearCluster)
registerRecipe('finalDriveDiff', finalDriveDiff)
registerRecipe('ptoBevel', ptoBevel)
registerRecipe('propshaftFront', propshaftFront)
registerRecipe('centerBearing', centerBearing)
registerRecipe('propshaftRear', propshaftRear)
registerRecipe('rduHousing', rduHousing)
registerRecipe('haldexCoupling', haldexCoupling)
registerRecipe('haldexPump', haldexPump)
registerRecipe('haldexFilter', haldexFilter)
registerRecipe('haldexController', haldexController)
registerRecipe('rearDiffGears', rearDiffGears)
registerRecipe('driveshaft', driveshaft)
registerRecipe('coilSpring', coilSpring)
registerRecipe('strutFront', strutFront)
registerRecipe('damperRear', damperRear)
registerRecipe('lowerControlArm', lowerControlArm)
registerRecipe('steeringKnuckle', steeringKnuckle)
registerRecipe('wheelCarrier', wheelCarrier)
registerRecipe('subframe', subframe)
registerRecipe('antiRollBar', antiRollBar)
registerRecipe('dropLink', dropLink)
registerRecipe('epsRack', epsRack)
registerRecipe('tieRod', tieRod)
registerRecipe('lateralLink', lateralLink)
registerRecipe('trailingLink', trailingLink)
registerRecipe('pretoriaWheel', pretoriaWheel)
registerRecipe('tyre', tyre)
registerRecipe('wheelBoltRing', wheelBoltRing)
registerRecipe('oilPan', oilPan)
registerRecipe('valveCoverPcv', valveCoverPcv)
registerRecipe('ignitionCoil', ignitionCoil)
registerRecipe('feadBelt', feadBelt)
registerRecipe('alternator', alternator)
registerRecipe('acCompressor', acCompressor)
registerRecipe('starterMotor', starterMotor)
registerRecipe('hydraulicMount', hydraulicMount)
registerRecipe('dogboneMount', dogboneMount)
registerRecipe('floorpan', floorpan)
registerRecipe('frontStructure', frontStructure)
registerRecipe('bulkhead', bulkhead)
registerRecipe('strutTower', strutTower)
registerRecipe('pillar', pillar)
registerRecipe('roofPanel', roofPanel)
registerRecipe('sillRail', sillRail)
registerRecipe('rearStructure', rearStructure)
registerRecipe('bonnet', bonnet)
registerRecipe('frontWing', frontWing)
registerRecipe('quarterPanel', quarterPanel)
registerRecipe('doorShell', doorShell)
registerRecipe('tailgate', tailgate)
registerRecipe('bumperFrontR', bumperFrontR)
registerRecipe('bumperRearR', bumperRearR)
registerRecipe('roofSpoiler', roofSpoiler)
registerRecipe('mirrorCap', mirrorCap)
registerRecipe('sideSkirt', sideSkirt)
registerRecipe('glassPane', glassPane)

export { resolveRecipe }
