import { CenterModal } from "@/components/CenterModal";
import ChakraNextImage from "@/components/ChakraNextImage";
import { VareInput } from "@/components/VareInput";
import { definitions } from "@/types/supabase";
import { Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";

interface VareComponentProps {
  vare: definitions["varer"];
}

export function Vare({ vare }: VareComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack spacing={2} maxWidth={200}>
        <Heading
          as="h6"
          size="xs"
          noOfLines={1}
          position="absolute"
          color="white"
          textShadow="md"
          dropShadow="md"
          pt={4}
          zIndex={10}
        >
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

        <VareInput vareId={vare.id} />
      </VStack>
      <CenterModal titel={vare.navn} isOpen={isOpen} onClose={onClose}>
        <VStack spacing={2}>
          <ChakraNextImage
            alt={vare.navn}
            src={`/billeder/${vare.billede}.jpeg`}
            width={600}
            height={400}
          />
          <Text>{vare.beskrivelse}</Text>
        </VStack>
      </CenterModal>
    </>
  );
}
