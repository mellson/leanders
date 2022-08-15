import { Text } from '@chakra-ui/react';

export function PrisText({ pris }: { pris: number }) {
  return (
    <Text fontSize="sm" fontWeight="light" textTransform="uppercase">
      {Intl.NumberFormat('da-DK').format(pris)} kr
    </Text>
  );
}
