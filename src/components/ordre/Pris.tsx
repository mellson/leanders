import { Text } from "@chakra-ui/react";
import * as React from "react";

export function PrisText({ pris }: { pris: number }) {
  return (
    <Text fontSize="xs" fontWeight="light">
      {Intl.NumberFormat("da-DK").format(pris)} kr
    </Text>
  );
}
