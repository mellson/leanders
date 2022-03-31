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
        <Heading as="h6" size="xs" noOfLines={1}>
          {vare.navn}
        </Heading>

        <ChakraNextImage
          alt={vare.navn}
          src={`/billeder/${vare.billede}.jpeg`}
          width={200}
          height={200}
          onClick={onOpen}
          transition="all 0.2s"
          _hover={{
            transform: "scale(1.05)",
            shadow: "md",
          }}
        />

        <NumberInput />
      </VStack>
      <CenterModal titel={vare.navn} isOpen={isOpen} onClose={onClose}>
        <VStack spacing={2}>
          <ChakraNextImage
            alt={vare.navn}
            src={`/billeder/${vare.billede}.jpeg`}
            width={600}
            height={400}
            hoverEffect={false}
          />
          <Text>{vare.beskrivelse}</Text>
        </VStack>
      </CenterModal>
    </>
  );
};
