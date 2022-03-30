import { Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { CenterModal } from "./CenterModal";
import ChakraNextImage from "./ChakraNextImage";
import { NumberInput } from "./NumberInput";

interface VareProps {
  vare: any;
}

export const Vare: FC<VareProps> = ({ vare }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack spacing={2} maxWidth={200}>
        <Heading as="h6" size="xs">
          {vare.navn}
        </Heading>

        <ChakraNextImage
          alt={vare.navn}
          src={`/billeder/${vare.billede}.jpeg`}
          width={200}
          height={200}
          quality={50}
          onClick={onOpen}
        />

        <NumberInput />
      </VStack>
      <CenterModal titel={vare.navn} isOpen={isOpen} onClose={onClose}>
        <Text>{vare.beskrivelse}</Text>
      </CenterModal>
    </>
  );
};
