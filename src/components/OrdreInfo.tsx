import { Button, HStack, Input, Slide, Text, VStack } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppContext } from "../../pages/_app";
import { CenterModal } from "./CenterModal";

export function OrdreInfo() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;
  const [visDatoVaelger, setVisDatoVaelger] = useState(true);
  const dateRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateRef.current) {
      console.log(state.context.aktivDato);
      dateRef.current.valueAsDate = state.context.aktivDato;
    }
  }, [state.context.aktivDato]);

  const antalVarer = (dato: Date) => {
    const varer = state.context.varer.get(dato);
    if (varer) {
      return Array.from(varer.values()).reduce((acc, cur) => acc + cur, 0);
    } else {
      return 0;
    }
  };

  const sorteredeDatoer = Array.from(state.context.varer.keys()).sort();

  return (
    <Slide
      direction="bottom"
      in={state.matches("bestiller")}
      style={{ zIndex: 10 }}
    >
      <HStack
        roundedTop="md"
        padding={4}
        opacity={state.matches("bestiller") ? 0.9 : 0.0}
        width="100%"
        bg="brand.300"
        justify="space-between"
      >
        <HStack spacing={10}>
          {sorteredeDatoer.map((dato) => (
            <VStack key={dato.toString()} alignItems="start" spacing={0}>
              <Text fontSize="xs" onClick={() => setVisDatoVaelger(true)}>
                {dato.toLocaleDateString()}
              </Text>
              <Text>{antalVarer(dato)} brød i kurven</Text>
            </VStack>
          ))}
        </HStack>
        <Button onClick={(_) => send("NULSTIL")}>Nulstil</Button>
      </HStack>
      <CenterModal
        titel="Vælg ny dato"
        isOpen={visDatoVaelger}
        onClose={() => setVisDatoVaelger(false)}
      >
        <SingleDatepicker
          date={state.context.aktivDato}
          onDateChange={(nyDato) => send({ type: "AENDRE_DATO", nyDato })}
        />

        <Input
          type="date"
          value={state.context.aktivDato.toLocaleDateString("en-CA")}
          onChange={(e) =>
            send({
              type: "AENDRE_DATO",
              nyDato: e.target.valueAsDate ?? new Date(),
            })
          }
        />
      </CenterModal>
    </Slide>
  );
}
