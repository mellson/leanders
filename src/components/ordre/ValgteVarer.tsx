import { AppContext } from "@/utils/context";
import { sorteredeDatoerSelector } from "@/xstate/selectors";
import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import React from "react";
import { Vare } from "../Vare";

export default function ValgteVarer() {
  const appServices = React.useContext(AppContext);
  const sorteredeDatoer = useSelector(
    appServices.ordreService,
    sorteredeDatoerSelector
  );
  const varer = useSelector(
    appServices.ordreService,
    (state) => state.context.varer
  );
  const databaseVarer = useSelector(
    appServices.ordreService,
    (state) => state.context.databaseVarer
  );

  return (
    <>
      {sorteredeDatoer.map((dato) => (
        <VStack key={dato.toString()} align="left" pb={8}>
          <Heading size="xs" fontWeight="normal">
            Dine varer til {dato.toLocaleDateString("da-DK")}
          </Heading>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 5 }}
            spacing={{ base: 2, md: 5, lg: 10 }}
            justifyItems="left"
          >
            {Array.from(varer.get(dato.getTime())?.keys() ?? [])
              .sort()
              .map((vareId) => (
                <Vare
                  key={vareId}
                  vare={databaseVarer.find((v) => v.id === vareId)!}
                />
              ))}
          </SimpleGrid>
        </VStack>
      ))}
    </>
  );
}
