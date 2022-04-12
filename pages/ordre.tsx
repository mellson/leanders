import { Button, Heading } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import React from "react";
import Confetti from "../src/components/ordre/Confetti";
import { sorteredeDatoerFraVarer } from "../src/utils/ordre";
import { AppContext } from "./_app";

export default function Ordre() {
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

  return (
    <>
      <Heading size="md">
        Bekræft din ordre på {antalVarerForHeleOrdren} brød 🥐
      </Heading>
      <Button onClick={() => send({ type: "Affyr Confetti" })}>
        Afgiv ordre
      </Button>
      <Confetti />
    </>
  );
}
