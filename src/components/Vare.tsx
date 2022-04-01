import { Button, Heading, Text, useDisclosure, VStack } from "@chakra-ui/react";
import * as React from "react";
import { FC, useContext } from "react";
import { AppContext } from "../../pages/_app";
import { definitions } from "../types/supabase";
import { CenterModal } from "./CenterModal";
import ChakraNextImage from "./ChakraNextImage";
import { NumberInput } from "./NumberInput";

interface VareComponentProps {
  vare: definitions["varer"];
}

export const Vare: FC<VareComponentProps> = ({ vare }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const numberInputRef = React.useRef<HTMLInputElement>(null);
  const appServices = useContext(AppContext);
  const { send } = appServices.ordreService;

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

        <NumberInput
          onChange={(antal) => send({ type: "TILFOEJ_VARE", vareId: vare.id })}
          ref={numberInputRef}
        />

        <Button
          onClick={() => {
            console.log("hej 1");

            if (numberInputRef.current) {
              console.log("hej 2");
              numberInputRef.current.value = "0";
              numberInputRef.current.defaultValue = "0";
            }
          }}
        >
          Reset
        </Button>
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
