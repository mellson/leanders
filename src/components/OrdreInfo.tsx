import { Button, HStack, Input, Slide, Text, VStack } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppContext } from "../../pages/_app";
import { imorgen } from "../xstate/ordreMaskine";
import { CenterModal } from "./CenterModal";

export function OrdreInfo() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;
  const [visDatoVaelger, setVisDatoVaelger] = useState(false);
  const [visNyDatoVaelger, setVisNyDatoVaelger] = useState(false);

  useEffect(() => {}, [state.context.aktivDato]);

  const antalVarer = (dato: Date) => {
    const varer = state.context.varer.get(dato);
    if (varer) {
      return Array.from(varer.values()).reduce((acc, cur) => acc + cur, 0);
    } else {
      return 0;
    }
  };

  const sorteredeDatoer = Array.from(state.context.varer.keys()).sort(
    (a, b) => a.getTime() - b.getTime()
  );

  return (
    <Slide
      direction="bottom"
      in={state.matches("bestiller")}
      style={{ zIndex: 10 }}
    >
      <HStack
        roundedTop="md"
        padding={4}
        opacity={state.matches("bestiller") ? 0.95 : 0.0}
        w="full"
        bg="brand.300"
        justify="space-between"
      >
        <HStack spacing={4}>
          {sorteredeDatoer.map((dato) => (
            <VStack
              key={dato.toString()}
              alignItems="start"
              bg={dato === state.context.aktivDato ? "brand.200" : "brand.400"}
              cursor="pointer"
              onClick={() => send({ type: "SET_AKTIV_DATO", dato })}
              padding={2}
              rounded="lg"
            >
              {dato === state.context.aktivDato ? (
                <Text
                  fontSize="xs"
                  cursor="pointer"
                  onClick={() => setVisDatoVaelger(true)}
                >
                  {dato.toLocaleDateString("da-DK")}
                </Text>
              ) : (
                <Text fontSize="xs">{dato.toLocaleDateString("da-DK")}</Text>
              )}
              <Text>{antalVarer(dato)} brød i kurven</Text>
            </VStack>
          ))}
        </HStack>
        <VStack justify="space-between">
          <Button size="sm" w="full" onClick={(_) => setVisNyDatoVaelger(true)}>
            Tilføj dag
          </Button>
          <Button size="sm" w="full" onClick={(_) => send("NULSTIL")}>
            Nulstil
          </Button>
        </VStack>
      </HStack>
      <CenterModal
        titel="Vælg ny dato"
        isOpen={visDatoVaelger}
        onClose={() => setVisDatoVaelger(false)}
      >
        <Input
          type="date"
          value={state.context.aktivDato.toLocaleDateString("en-CA")}
          onChange={(e) => {
            e.preventDefault();
            send({
              type: "AENDRE_DATO",
              dato: e.target.valueAsDate ?? new Date(),
            });
            setVisDatoVaelger(false);
          }}
        />
      </CenterModal>
      <CenterModal
        titel="Tilføj ny dato"
        isOpen={visNyDatoVaelger}
        onClose={() => setVisNyDatoVaelger(false)}
      >
        <Input
          type="date"
          value={imorgen.toLocaleDateString("en-CA")}
          onChange={(e) => {
            if (e.target.valueAsDate) {
              send({
                type: "TILFOEJ_DATO",
                dato: e.target.valueAsDate,
              });
              setVisNyDatoVaelger(false);
            }
          }}
        />
      </CenterModal>
    </Slide>
  );
}
