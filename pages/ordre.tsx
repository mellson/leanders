import Confetti from "@/components/ordre/Confetti";
import { AppContext } from "@/utils/context";
import {
  antalVarerForHeleOrdrenSelector,
  sorteredeDatoerSelector,
} from "@/xstate/selectors";
import { Button, Heading } from "@chakra-ui/react";
import { User, withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useActor, useSelector } from "@xstate/react";
import React from "react";

interface OrdreProps {
  user: User;
}

export default function Ordre({ user }: OrdreProps) {
  const appServices = React.useContext(AppContext);
  const sorteredeDatoer = useSelector(
    appServices.ordreService,
    sorteredeDatoerSelector
  );
  const antalVarerForHeleOrdren = useSelector(
    appServices.ordreService,
    antalVarerForHeleOrdrenSelector(sorteredeDatoer)
  );
  const [state] = useActor(appServices.ordreService);
  const { send } = appServices.ordreService;

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

export const getServerSideProps = withAuthRequired({ redirectTo: "/login" });
