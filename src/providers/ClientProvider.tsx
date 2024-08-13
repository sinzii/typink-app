import { DedotClient } from "dedot";
import { createContext, useContext } from "react";
import { Props } from "../types.ts";
import useClient from "../hooks/useClient.ts";

export interface ClientProviderProps {
  client?: DedotClient;
  ready: boolean;
}

export const ClientContext = createContext<ClientProviderProps>({
  ready: false
});

export const useClientContext = () => {
  return useContext(ClientContext);
};

export default function ClientProvider({children}: Props) {
  const {client, ready,} = useClient();

  return (
    <ClientContext.Provider value={{client, ready}}>
      {children}
    </ClientContext.Provider>
  )

}
