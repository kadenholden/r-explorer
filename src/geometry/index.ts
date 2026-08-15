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
  boosterMaster,
  absUnit,
  brakeLines,
  wheelSpeedSensor,
  n493Module,
  coolantPump,
  heatExchanger,
  fanShroud,
  expansionTank,
  coolantHoses,
  fuelTank,
  lpfpModule,
  fillerNeck,
  evapCanister,
  batteryTray,
  ecuBox,
  harnessLoom,
  dashboard,
  steeringWheelColumn,
  pedalBox,
  consoleShifter,
  hvacBox,
  acLines,
} from './phase7'
import {
  upperSump,
  sumpSealJoint,
  lowerSump,
  drainPlug,
  oilPickup,
  oilFilterHousing,
  oilLevelSensor,
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
  mainBearingCap,
  bearingShell,
  thrustWasher,
  pistonRingSet,
  wristPin,
  vibrationDamper,
  frontCover,
  crankSeal,
  rearSealFlange,
  corePlug,
  dipstickTube,
  oilPumpTwoStage,
  solenoidValve,
  windageTray,
  oRing,
} from './shortBlockDetail'
import {
  valveSpring,
  fingerFollower,
  hlaElement,
  sparkPlug,
  upperTimingCover,
  pcvModule,
} from './headDetail'
import {
  turboLines,
  cartridge,
  flexDisc,
  washerBottle,
  washerNeck,
  simpleBox,
  turboInletPipe,
} from './systemDetail'
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
registerRecipe('upperSump', upperSump)
registerRecipe('sumpSealJoint', sumpSealJoint)
registerRecipe('lowerSump', lowerSump)
registerRecipe('drainPlug', drainPlug)
registerRecipe('oilPickup', oilPickup)
registerRecipe('oilFilterHousing', oilFilterHousing)
registerRecipe('oilLevelSensor', oilLevelSensor)
registerRecipe('valveCoverPcv', valveCoverPcv)
registerRecipe('ignitionCoil', ignitionCoil)
registerRecipe('feadBelt', feadBelt)
registerRecipe('alternator', alternator)
registerRecipe('acCompressor', acCompressor)
registerRecipe('starterMotor', starterMotor)
registerRecipe('hydraulicMount', hydraulicMount)
registerRecipe('dogboneMount', dogboneMount)
registerRecipe('mainBearingCap', mainBearingCap)
registerRecipe('bearingShell', bearingShell)
registerRecipe('thrustWasher', thrustWasher)
registerRecipe('pistonRingSet', pistonRingSet)
registerRecipe('wristPin', wristPin)
registerRecipe('vibrationDamper', vibrationDamper)
registerRecipe('frontCover', frontCover)
registerRecipe('crankSeal', crankSeal)
registerRecipe('rearSealFlange', rearSealFlange)
registerRecipe('corePlug', corePlug)
registerRecipe('dipstickTube', dipstickTube)
registerRecipe('oilPumpTwoStage', oilPumpTwoStage)
registerRecipe('solenoidValve', solenoidValve)
registerRecipe('windageTray', windageTray)
registerRecipe('oRing', oRing)
registerRecipe('valveSpring', valveSpring)
registerRecipe('fingerFollower', fingerFollower)
registerRecipe('hlaElement', hlaElement)
registerRecipe('sparkPlug', sparkPlug)
registerRecipe('upperTimingCover', upperTimingCover)
registerRecipe('pcvModule', pcvModule)
registerRecipe('turboLines', turboLines)
registerRecipe('cartridge', cartridge)
registerRecipe('flexDisc', flexDisc)
registerRecipe('washerBottle', washerBottle)
registerRecipe('washerNeck', washerNeck)
registerRecipe('simpleBox', simpleBox)
registerRecipe('turboInletPipe', turboInletPipe)
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
registerRecipe('boosterMaster', boosterMaster)
registerRecipe('absUnit', absUnit)
registerRecipe('brakeLines', brakeLines)
registerRecipe('wheelSpeedSensor', wheelSpeedSensor)
registerRecipe('n493Module', n493Module)
registerRecipe('coolantPump', coolantPump)
registerRecipe('heatExchanger', heatExchanger)
registerRecipe('fanShroud', fanShroud)
registerRecipe('expansionTank', expansionTank)
registerRecipe('coolantHoses', coolantHoses)
registerRecipe('fuelTank', fuelTank)
registerRecipe('lpfpModule', lpfpModule)
registerRecipe('fillerNeck', fillerNeck)
registerRecipe('evapCanister', evapCanister)
registerRecipe('batteryTray', batteryTray)
registerRecipe('ecuBox', ecuBox)
registerRecipe('harnessLoom', harnessLoom)
registerRecipe('dashboard', dashboard)
registerRecipe('steeringWheelColumn', steeringWheelColumn)
registerRecipe('pedalBox', pedalBox)
registerRecipe('consoleShifter', consoleShifter)
registerRecipe('hvacBox', hvacBox)
registerRecipe('acLines', acLines)

export { resolveRecipe }
