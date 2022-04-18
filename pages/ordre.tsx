import Confetti from "@/components/ordre/Confetti";
import { AppContext } from "@/utils/context";
import {
  antalVarerForHeleOrdrenSelector,
  sorteredeDatoerSelector,
} from "@/xstate/selectors";
import { Button, Heading, Text } from "@chakra-ui/react";
import { User, withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useActor, useSelector } from "@xstate/react";
import NextLink from "next/link";
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

  if (state.matches("Ordre linjer oprettet") || state.matches("idle"))
    return (
      <>
        <Heading size="md">Tak for din ordre 🎉🎉🎉</Heading>
        <NextLink href="/" passHref>
          <Button>Gå til forsiden</Button>
        </NextLink>
      </>
    );

  return (
    <>
      <Heading size="md">
        Bekræft din ordre på {antalVarerForHeleOrdren} brød 🥐
      </Heading>

      <Button onClick={() => send({ type: "Opret ordre" })}>Afgiv ordre</Button>

      {state.matches("Vi har en fejl") && (
        <>
          <Text pt={4}>
            Øv. Der er sket en fejl med beskeden:{" "}
            <Text as="i" color="red">
              {state.context.fejl}.{" "}
            </Text>
          </Text>
          <Text>
            Prøv at send din ordre igen ved at trykke på knappen ovenfor.
          </Text>
        </>
      )}
      <Confetti />
    </>
  );
}

export const getServerSideProps = withAuthRequired({ redirectTo: "/login" });
