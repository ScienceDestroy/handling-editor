export interface HandlingValue {
  value: string | number;
}

export interface VectorValue {
  x: string;
  y: string;
  z: string;
}

export interface HandlingData {
  handlingName: string;
  fMass: HandlingValue;
  fInitialDragCoeff: HandlingValue;
  fPercentSubmerged: HandlingValue;
  vecCentreOfMassOffset: VectorValue;
  vecInertiaMultiplier: VectorValue;
  fDriveBiasFront: HandlingValue;
  nInitialDriveGears: HandlingValue;
  fInitialDriveForce: HandlingValue;
  fDriveInertia: HandlingValue;
  fClutchChangeRateScaleUpShift: HandlingValue;
  fClutchChangeRateScaleDownShift: HandlingValue;
  fInitialDriveMaxFlatVel: HandlingValue;
  fBrakeForce: HandlingValue;
  fBrakeBiasFront: HandlingValue;
  fHandBrakeForce: HandlingValue;
  fSteeringLock: HandlingValue;
  fTractionCurveMax: HandlingValue;
  fTractionCurveMin: HandlingValue;
  fTractionCurveLateral: HandlingValue;
  fTractionSpringDeltaMax: HandlingValue;
  fLowSpeedTractionLossMult: HandlingValue;
  fCamberStiffnesss: HandlingValue;
  fTractionBiasFront: HandlingValue;
  fTractionLossMult: HandlingValue;
  fSuspensionForce: HandlingValue;
  fSuspensionCompDamp: HandlingValue;
  fSuspensionReboundDamp: HandlingValue;
  fSuspensionUpperLimit: HandlingValue;
  fSuspensionLowerLimit: HandlingValue;
  fSuspensionRaise: HandlingValue;
  fSuspensionBiasFront: HandlingValue;
  fAntiRollBarForce: HandlingValue;
  fAntiRollBarBiasFront: HandlingValue;
  fRollCentreHeightFront: HandlingValue;
  fRollCentreHeightRear: HandlingValue;
  fCollisionDamageMult: HandlingValue;
  fWeaponDamageMult: HandlingValue;
  fDeformationDamageMult: HandlingValue;
  fEngineDamageMult: HandlingValue;
  fPetrolTankVolume: HandlingValue;
  fOilVolume: HandlingValue;
  fSeatOffsetDistX: HandlingValue;
  fSeatOffsetDistY: HandlingValue;
  fSeatOffsetDistZ: HandlingValue;
  nMonetaryValue: HandlingValue;
  strModelFlags: string;
  strHandlingFlags: string;
  strDamageFlags: string;
  AIHandling: string;
}