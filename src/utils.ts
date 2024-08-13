export const formatBalance = (balance: bigint | undefined, decimal: number = 10): string => {
  if (!balance) return '';

  return (parseFloat(balance.toString()) / Math.pow(10, decimal)).toString();
};
