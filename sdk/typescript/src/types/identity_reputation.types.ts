import { DriverProfile, DriverTier, ReputationConfig, UserProfile } from './common.types';

export interface InitParams {
  admin: string;
  deliveryContract: string;
  disputeContract: string;
}

export interface SetAuthorizedContractParams {
  admin: string;
  contractAddr: string;
  authorized: boolean;
}

export interface SetReputationConfigParams {
  admin: string;
  config: ReputationConfig;
}

export interface SetDeliveryContractParams {
  admin: string;
  deliveryContract: string;
}

export interface SetDisputeContractParams {
  admin: string;
  disputeContract: string;
}

export interface RegisterDriverParams {
  driver: string;
}

export interface RegisterUserParams {
  user: string;
}

export interface SuspendDriverParams {
  admin: string;
  driver: string;
}

export interface ReinstateDriverParams {
  admin: string;
  driver: string;
}

export interface UpdateDriverKycStatusParams {
  admin: string;
  driver: string;
  kycVerified: boolean;
}

export interface IncreaseReputationParams {
  caller: string;
  driver: string;
  deliveryId: bigint;
  weightGrams: number;
  fragile: boolean;
}

export interface DecreaseReputationParams {
  caller: string;
  driver: string;
  points: number;
}

export interface AwardReputationParams {
  caller: string;
  driver: string;
  points: number;
}

/**
 * Payload emitted when a driver's reputation is increased via a delivery.
 *
 * `points` is the requested/configured award, while `appliedDelta` is the
 * actual score change applied on-chain (which may be smaller than `points`
 * when the score reaches `MAX_REPUTATION`). `newScore` is the resulting
 * stored score after the update, and `oldScore` is the score before it.
 */
export interface ReputationIncreasedEvent {
  driver: string;
  deliveryId: bigint;
  points: number;
  appliedDelta: number;
  oldScore: number;
  newScore: number;
}

/**
 * Payload emitted when reputation is awarded directly (e.g. by an
 * authorized contract or admin).
 *
 * `points` is the requested award, `appliedDelta` is the actual score change
 * applied on-chain (capped at `MAX_REPUTATION`), and `newScore` is the
 * resulting stored score. `oldScore` is the score before the update.
 */
export interface ReputationAwardedEvent {
  driver: string;
  points: number;
  appliedDelta: number;
  oldScore: number;
  newScore: number;
}

export { DriverProfile, DriverTier, ReputationConfig, UserProfile };