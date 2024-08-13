// Generated by dedot cli

import type { GenericSubstrateApi } from "dedot/types";
import type { AccountId32Like, AccountId32 } from "dedot/codecs";
import type {
  GenericContractEvents,
  GenericContractEvent,
} from "dedot/contracts";

export interface ContractEvents<ChainApi extends GenericSubstrateApi>
  extends GenericContractEvents<ChainApi> {
  /**
   * Event emitted when allowance by `owner` to `spender` changes.
   *
   * @signature_topic: 0x25cdb6c93882e925abbfc9a8b7c85884b73c038c03a2492f238a5e5ba3fbff8c
   **/
  Approval: GenericContractEvent<
    "Approval",
    {
      /**
       * Account providing allowance.
       *
       * @indexed: true
       **/
      owner: AccountId32;
      /**
       * Allowance beneficiary.
       *
       * @indexed: true
       **/
      spender: AccountId32;
      /**
       * New allowance amount.
       *
       * @indexed: false
       **/
      amount: bigint;
    }
  >;

  /**
   * Event emitted when transfer of tokens occurs.
   *
   * @signature_topic: 0x990df076cb1e9527aa102cd100c1481efe393eeabb5825f9af1f5e58221864de
   **/
  Transfer: GenericContractEvent<
    "Transfer",
    {
      /**
       * Transfer sender. `None` in case of minting new tokens.
       *
       * @indexed: true
       **/
      from: AccountId32 | undefined;
      /**
       * Transfer recipient. `None` in case of burning tokens.
       *
       * @indexed: true
       **/
      to: AccountId32 | undefined;
      /**
       * Amount of tokens transferred (or minted/burned).
       *
       * @indexed: false
       **/
      value: bigint;
    }
  >;
}
