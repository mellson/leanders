import { AppContext } from "@/utils/context";
import { sorteredeDatoerSelector } from "@/xstate/selectors";
import { Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useSelector } from "@xstate/react";
import React from "react";
import { Vare } from "../Vare";

export default function ValgteVarer() {
  const appContext = React.useContext(AppContext);
  const sorteredeDatoer = useSelector(
    appContext.ordreActor,
    sorteredeDatoerSelector
  );
  const varer = useSelector(
    appContext.ordreActor,
    (state) => state.context.varer
  );
  const databaseVarer = useSelector(
    appContext.ordreActor,
    (state) => state.context.databaseVarer
  );

  function getVarerPaaDato(dato: Date) {
    return Array.from(varer.get(dato.getTime())?.keys() ?? [])
      .sort()
      .map(
        (vareId) =>
          // Det er sikkert for os at antage at varen her er her fordi den kun kan være i varer hvis den allerede er i databaseVarer
          databaseVarer.find((vare) => vare.id === vareId)!
      );
  }

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
            {getVarerPaaDato(dato).map((vare) => (
              <Vare key={vare.id} vare={vare} dato={dato} />
            ))}
          </SimpleGrid>
        </VStack>
      ))}
    </>
  );
}
