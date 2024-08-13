import { Contract, GenericContractApi } from "dedot/contracts";
import { Psp22ContractApi } from "@/contracts/types/psp22";
import { useBoolean, useDeepCompareEffect } from "react-use";
import { useState } from "react";
import useRefresher from "@/hooks/useRefresher.ts";

type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] }
type ContractQuery<A extends GenericContractApi = GenericContractApi> = OmitNever<{
  [K in keyof A['query']]: K extends string ? (K extends `${infer Literal}` ? {
    message: Literal,
    params: Parameters<A['query'][K]>
  } : never) : never;
}>;

type UseContractQueryReturnType<T extends Psp22ContractApi = Psp22ContractApi,
  M extends keyof ContractQuery<T> = keyof ContractQuery<T>> = {
  isLoading: boolean
  loaded: boolean,
  refresh: () => void,
} & Partial<Awaited<ReturnType<T['query'][M]>>>


export default function useContractQuery<
  T extends Psp22ContractApi = Psp22ContractApi,
  M extends keyof ContractQuery<T> = keyof ContractQuery<T>
>(
  parameters: {
    contract: Contract<T> | undefined,
    message: M,
    params?: Parameters<T['query'][M]>
  }
): UseContractQueryReturnType<T, M> {
  const [isLoading, setIsLoading] = useBoolean(true);
  const [loaded, setLoaded] = useBoolean(false);
  const [result, setResult] = useState<any>();
  const { refresh, refreshCounter } = useRefresher();
  const {contract, message, params} = parameters;

  useDeepCompareEffect(() => {
    (async () => {
      if (!contract || !message || !params) return;

      const result = await contract.query[message](...(params || []));
      setResult(result);
      setIsLoading(false);
      setLoaded(true);
    })();
  }, [contract, message, params, refreshCounter])

  return {
    isLoading,
    loaded,
    refresh,
    ...(result || {})
  } as any;
}
