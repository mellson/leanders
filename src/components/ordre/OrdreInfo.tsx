import { Button, HStack, Slide, Text, VStack } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import * as React from "react";
import { AppContext } from "../../../pages/_app";
import { sammeDato, sorteredeDatoerFraVarer } from "../../utils/ordre";
import TilfoejDatoModal from "./TilfoejDatoModal";
import VaelgNyDatoModal from "./VaelgNyDatoModal";

export function OrdreInfo() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;

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

  const antalVarerForHeleOrdren = sorteredeDatoer.reduce(
    (acc, dato) => acc + antalVarer(dato),
    0
  );

  const ordrenOpbygges = antalVarerForHeleOrdren > 0;

  return (
    <>
      <Slide direction="bottom" in={ordrenOpbygges} style={{ zIndex: 10 }}>
        <HStack
          roundedTop="md"
          padding={4}
          opacity={ordrenOpbygges ? 0.95 : 0.0}
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
                    onClick={() => send({ type: "Start udskift aktiv dato" })}
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
            <Button
              size="sm"
              w="full"
              onClick={() => send({ type: "Start tilføj dato" })}
            >
              Tilføj dato
            </Button>
            <Button
              size="sm"
              w="full"
              onClick={() => send({ type: "Nulstil ordre" })}
            >
              Nulstil ordre
            </Button>
          </VStack>
        </HStack>
      </Slide>
      <VaelgNyDatoModal />
      <TilfoejDatoModal />
    </>
  );
}
