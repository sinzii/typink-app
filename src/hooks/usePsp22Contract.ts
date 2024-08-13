import { useClientContext } from "../providers/ClientProvider.tsx";
import { useState } from "react";
import { Contract } from "dedot/contracts";
import { Psp22ContractApi } from "@/contracts/types/psp22";
import { useAsync } from "react-use";
import useContract from "@/hooks/useContract.ts";
import useLoadMetadata from "@/hooks/useLoadMetadata.ts";

const PSP22_CONTRACT_ADDRESS = '5GSGWox1ZxUkHBAEbm6NPAHLKD28VoQefTRBYTQuydLrxaKJ';

export default function usePsp22Contract() {
  const metadata = useLoadMetadata('../contracts/psp22/psp22.json')
  const {contract} = useContract<Psp22ContractApi>(metadata, PSP22_CONTRACT_ADDRESS);

  return {
    contract
  }
}
