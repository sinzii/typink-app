import { Contract, ContractMetadata, GenericContractApi } from "dedot/contracts";
import { useClientContext } from "@/providers/ClientProvider.tsx";
import { useState } from "react";
import { useAsync } from "react-use";

export default function useContract<T extends GenericContractApi = GenericContractApi>(metadata?: string | ContractMetadata, address?: string) {
  const { client } = useClientContext();
  const [contract, setContract] = useState<Contract<T>>();

  useAsync(async () => {
    if (!client || !metadata || !address) {
      if (contract) {
        setContract(undefined);
      }

      return;
    }

    setContract(new Contract<T>(client, metadata as any, address))
  }, [client, metadata, address]);

  return {
    contract
  }
}
