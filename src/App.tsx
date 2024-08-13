import usePsp22Contract from "@/hooks/usePsp22Contract.ts";
import useContractQuery from "@/hooks/useContractQuery.ts";
import { formatBalance } from "@/utils.ts";
import PendingText from "@/components/PendingText.tsx";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";

const OWNER_ADDRESS = '5EeG3x2qiUMU8LkRz4WGyy9kFhLY3u1AQwZz9aidvis58jqj';
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

function App() {
  const {contract} = usePsp22Contract();

  const {data: tokenName, isLoading: loadingTokenName} = useContractQuery(
    {
      contract: contract,
      message: 'psp22MetadataTokenName',
      params: [{caller: OWNER_ADDRESS}]
    }
  );

  const {data: tokenSymbol, isLoading: loadingTokenSymbol} = useContractQuery(
    {
      contract,
      message: 'psp22MetadataTokenSymbol',
      params: [{caller: OWNER_ADDRESS}]
    }
  );

  const {data: tokenDecimal, isLoading: loadingTokenDecimal} = useContractQuery(
    {
      contract,
      message: 'psp22MetadataTokenDecimals',
      params: [{caller: OWNER_ADDRESS}]
    }
  );

  const {data: balanceOfAlice, isLoading: loadingAliceBalance, refresh} = useContractQuery(
    {
      contract,
      message: 'psp22BalanceOf',
      params: [ALICE, {caller: OWNER_ADDRESS}]
    }
  );

  const handleReloadAliceBalance = () => {
    console.log('Refreshing Alice balance...');
    refresh();
  }

  return (
    <Container my={8}>
      <Heading>Typink App</Heading>
      <Box mt={8}>
        <Text mb={2}>Token Name: <PendingText fontWeight='600' isLoading={loadingTokenName}>{tokenName}</PendingText></Text>
        <Text mb={2}>Token Symbol: <PendingText fontWeight='600' isLoading={loadingTokenSymbol}>{tokenSymbol}</PendingText></Text>
        <Text mb={2}>Token Decimal: <PendingText fontWeight='600' isLoading={loadingTokenDecimal}>{tokenDecimal}</PendingText></Text>
        <Text mb={2}>Alice Balance: <PendingText fontWeight='600' isLoading={loadingAliceBalance}>{formatBalance(balanceOfAlice)}</PendingText> {tokenSymbol}</Text>
        <Button mt={4} size='sm' onClick={handleReloadAliceBalance}>Reload Alice Balance</Button>
      </Box>
    </Container>
  )
}

export default App
