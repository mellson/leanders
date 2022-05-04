import { CenterModal } from "@/components/CenterModal";
import ChakraNextImage from "@/components/ChakraNextImage";
import { VareInput } from "@/components/VareInput";
import { definitions } from "@/types/supabase";
import { Text, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";

interface VareComponentProps {
  vare: definitions["varer"];
}

export function Vare({ vare }: VareComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack spacing={2} maxWidth={200}>
        <Text noOfLines={1} fontSize="lg" fontWeight="medium">
          {vare.navn}
        </Text>

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
