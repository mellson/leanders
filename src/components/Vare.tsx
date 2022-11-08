import { CenterModal } from "@/components/CenterModal";
import ChakraNextImage from "@/components/ChakraNextImage";
import { VareInput } from "@/components/VareInput";
import type { Database } from "@/types/DatabaseDefinitions";
import { Box, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { PrisText } from "./ordre/Pris";

type Vare = Database["public"]["Tables"]["varer"]["Row"];

interface VareComponentProps {
  vare: Vare;
  dato?: Date;
  visPris: boolean;
}

export function Vare({ vare, dato, visPris }: VareComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="leanders.100"
      border="1px solid"
      π
      borderColor="leanders.800"
      shadow="md"
      maxW="full"
    >
      <VStack spacing={0} maxWidth={180}>
        <ChakraNextImage
          alt={vare.navn}
          src={`/billeder/${vare.billede}.jpeg`}
          width={180}
          height={140}
          onClick={onOpen}
          rounded="none"
          pb={2}
        />

        <Box p={2}>
          <VareInput vareId={vare.id} dato={dato} />
        </Box>

        <VStack align="center" p={2}>
          <Text
            noOfLines={2}
            fontSize="xl"
            textAlign="center"
            fontWeight="bolder"
            textTransform="uppercase"
            lineHeight={1}
          >
            {vare.navn}
          </Text>
          {vare.detaljer && (
            <Text noOfLines={2} fontSize="xs" textAlign="center" lineHeight={1}>
              {vare.detaljer}
            </Text>
          )}
          {visPris && <PrisText pris={vare.pris} />}
        </VStack>
      </VStack>
      <CenterModal isOpen={isOpen} onClose={onClose}>
        <VStack spacing={2}>
          <ChakraNextImage
            alt={vare.navn}
            src={`/billeder/${vare.billede}.jpeg`}
            width={448}
            height={300}
            rounded="none"
          />

          <Text
            noOfLines={2}
            fontSize="xl"
            textAlign="center"
            fontWeight="bolder"
            textTransform="uppercase"
            lineHeight={1}
          >
            {vare.navn}
          </Text>
          <Text>{vare.beskrivelse}</Text>
        </VStack>
      </CenterModal>
    </Box>
  );
}
