import { Button, HStack, Input, Slide, Text, VStack } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppContext } from "../../pages/_app";
import { imorgen, sammeDato, sorteredeDatoerFraVarer } from "../utils/ordre";
import { CenterModal } from "./CenterModal";

export function OrdreInfo() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;
  const [visDatoVaelger, setVisDatoVaelger] = useState(false);
  const [visNyDatoVaelger, setVisNyDatoVaelger] = useState(false);

  useEffect(() => {}, [state.context.aktivDato]);

  const antalVarer = (dato: Date) => {
    const varer = state.context.varer.get(dato.getTime());
    if (varer) {
      return Array.from(varer.values()).reduce((acc, cur) => acc + cur, 0);
    } else {
      return 0;
    }
  };

  const sorteredeDatoer = sorteredeDatoerFraVarer(state.context.varer).map(
    (time) => new Date(time)
  );

  return (
    <Slide
      direction="bottom"
      in={state.matches("Ordre opbygges")}
      style={{ zIndex: 10 }}
    >
      <HStack
        roundedTop="md"
        padding={4}
        opacity={state.matches("Ordre opbygges") ? 0.95 : 0.0}
        w="full"
        bg="brand.300"
        justify="space-between"
      >
        <HStack spacing={4}>
          {sorteredeDatoer.map((dato) => (
            <VStack
              key={dato.toString()}
              alignItems="start"
              bg={
                sammeDato(dato, state.context.aktivDato)
                  ? "brand.200"
                  : "brand.400"
              }
              cursor="pointer"
              onClick={() => send({ type: "Sæt aktiv dato", dato })}
              padding={2}
              rounded="lg"
            >
              {sammeDato(dato, state.context.aktivDato) ? (
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
            Tilføj dato
          </Button>
          <Button size="sm" w="full" onClick={(_) => send("Nulstil ordre")}>
            Nulstil ordre
          </Button>
        </VStack>
      </HStack>
      <CenterModal
        titel="Vælg ny dato"
        isOpen={visDatoVaelger}
        onClose={() => setVisDatoVaelger(false)}
        onDelete={() => {
          send({ type: "Slet aktiv dato" });
          setVisDatoVaelger(false);
        }}
      >
        <Input
          type="date"
          value={state.context.aktivDato.toLocaleDateString("en-CA")}
          onChange={(e) => {
            e.preventDefault();
            send({
              type: "Udskift aktiv dato",
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
                type: "Tilføj dato",
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
