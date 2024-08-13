import { useState } from "react";
import { DedotClient, WsProvider } from "dedot";
import { useAsync } from "react-use";

const POP_NETWORK_ENDPOINT = 'wss://rpc2.paseo.popnetwork.xyz';

export default function useClient() {
  const [client, setClient] = useState<DedotClient>()

  useAsync(async () => {
    const provider = new WsProvider(POP_NETWORK_ENDPOINT);
    setClient(await DedotClient.new({provider, cacheMetadata: true}))
  });

  return {
    client,
    ready: !!client,
  }
}
