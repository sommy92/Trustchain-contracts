export interface InitParams {
  admin: string;
  escrowContract: string;
}

export interface SetDriverPreferenceParams {
  driver: string;
  toToken: string;
}

export interface ExecuteSettlementSwapParams {
  /** Must be the configured escrow contract; it must authorize the call. */
  caller: string;
  /** Escrow delivery ID this swap pays out, used to correlate swap and escrow record. */
  deliveryId: bigint | number;
  /** Driver being paid; `toToken` must equal this driver's recorded preference. */
  driver: string;
  fromToken: string;
  toToken: string;
  recipient: string;
  amount: bigint;
  minAmountOut: bigint;
  /**
   * Unix timestamp (seconds, u64) after which the swap is rejected. Must not
   * be in the past and no more than 300 seconds after the current ledger
   * timestamp (`SETTLEMENT_SWAP_DEADLINE_WINDOW_SECONDS`).
   */
  deadline: bigint;
}

/**
 * Review period, in seconds, between `set_escrow_contract` and the earliest
 * ledger timestamp at which `confirm_escrow_contract` succeeds (3 days).
 * Mirrors `PEER_CONTRACT_CHANGE_TIMELOCK_SECONDS` in the contracts.
 */
export const PEER_CONTRACT_CHANGE_TIMELOCK_SECONDS = 259_200n;

export interface ProposeEscrowContractParams {
  /** Must be the stored settlement admin; the call requires its auth. */
  admin: string;
  /** Escrow contract address that becomes active after confirmation. */
  newEscrow: string;
}

/**
 * Mirrors the Rust `PendingPeerContractChange` struct returned by
 * `get_pending_escrow_contract`. `null` from the client means no proposal is
 * in flight.
 */
export interface PendingEscrowContractChange {
  /** Proposed escrow contract address. */
  address: string;
  /** Admin that submitted the proposal. */
  proposedBy: string;
  /**
   * Ledger timestamp (Unix seconds) from which the change may be confirmed.
   * The contract accepts confirmation when `now >= activatesAt`.
   */
  activatesAt: bigint;
}

export interface SetSwapRouterParams {
  /** Must be the stored settlement admin; the call requires its auth. */
  admin: string;
  /**
   * Router contract (`C...` address) implementing
   * `swap_exact_tokens_for_tokens`. Overwrites any previously configured router.
   */
  router: string;
}
