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
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface OrdreProps {
  user: User;
}

export default function Ordre({ user }: OrdreProps) {
  const router = useRouter();
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

  useEffect(() => {
    const handleRouteChange = () => {
      // Hvis vi er i gang med at bekræftige en ordre og siden skifter skal vi afbryde
      if (state.matches("Bekræfter ordre")) {
        send("Afbryd");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, send, state]);

  const arbejder =
    state.matches("Opretter ordre id") ||
    state.matches("Opretter ordre linjer");

  return (
    <>
      {(state.matches("Bekræfter ordre") || arbejder) && (
        <>
          <Heading size="md">
            Bekræft din ordre på {antalVarerForHeleOrdren} brød 🥐
          </Heading>

          <Button
            onClick={() => send({ type: "Opret ordre" })}
            isLoading={arbejder}
          >
            Afgiv ordre
          </Button>
        </>
      )}

      {state.matches("Ordre afsluttet") ||
        (state.matches("idle") && (
          <>
            <Heading size="md">Tak for din ordre 🎉</Heading>
            <NextLink href="/" passHref>
              <Button>Gå til forsiden</Button>
            </NextLink>
          </>
        ))}

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

export const getServerSideProps = withAuthRequired({
  redirectTo: "/login?returnTo=ordre",
});
