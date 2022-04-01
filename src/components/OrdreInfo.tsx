import { Button, HStack, Slide, Text, VStack } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import * as React from "react";
import { AppContext } from "../../pages/_app";

export function OrdreInfo() {
  const appServices = React.useContext(AppContext);
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;

  const antalVarer = Array.from(state.context.varer.values()).reduce(
    (acc, cur) =>
      acc + Array.from(cur.values()).reduce((total, antal) => total + antal, 0),
    0
  );

  return (
    <Slide
      direction="bottom"
      in={state.matches("bestiller")}
      style={{ zIndex: 10 }}
    >
      <HStack
        roundedTop="md"
        spacing={10}
        padding={4}
        opacity={state.matches("bestiller") ? 0.9 : 0.0}
        width="100%"
        bg="brand.300"
        justify="space-between"
      >
        <VStack alignItems="start" spacing={0}>
          <Text fontSize="xs">
            {state.context.aktivDato.toLocaleDateString()}
          </Text>
          <Text>{antalVarer} brød i kurven</Text>
        </VStack>
        <Button onClick={(_) => send("NULSTIL")}>Nulstil</Button>
      </HStack>
    </Slide>
  );
}
