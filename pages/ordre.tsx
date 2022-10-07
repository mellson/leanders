import { Confetti } from "@/components/ordre/Confetti";
import ValgteVarer from "@/components/ordre/ValgteVarer";
import { PageBox } from "@/components/PageBox";
import { AppContext } from "@/utils/context";
import { samletPris } from "@/utils/ordre";
import {
  antalVarerForHeleOrdrenSelector,
  sorteredeDatoerSelector,
} from "@/xstate/selectors";
import { Button, Heading, Text } from "@chakra-ui/react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useActor, useSelector } from "@xstate/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function Ordre() {
  const router = useRouter();
  const appContext = React.useContext(AppContext);
  const sorteredeDatoer = useSelector(
    appContext.ordreActor,
    sorteredeDatoerSelector
  );
  const antalVarerForHeleOrdren = useSelector(
    appContext.ordreActor,
    antalVarerForHeleOrdrenSelector(sorteredeDatoer)
  );
  const visPriser = useSelector(
    appContext.ordreActor,
    (state) => state.context.visPriser
  );
  const [state] = useActor(appContext.ordreActor);
  const { send } = appContext.ordreActor;

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

  console.log(JSON.stringify(state.context));

  return (
    <PageBox>
      {(state.matches("Bekræfter ordre") || arbejder) && (
        <>
          <Heading as="h3" size="sm" textTransform="uppercase">
            Bekræft din ordre
          </Heading>

          <Text mt={0} pb={4}>
            Du har i alt {antalVarerForHeleOrdren} brød på ordren
            {visPriser && (
              <span>
                , til en samlet pris på{" "}
                {Intl.NumberFormat("da-DK").format(
                  samletPris(state.context.varer, state.context.databaseVarer)
                )}{" "}
                kr
              </span>
            )}
            .
          </Text>

          <ValgteVarer />

          <Button
            onClick={() => send({ type: "Opret ordre" })}
            isLoading={arbejder}
            size="lg"
            fontSize="xl"
            p={8}
            colorScheme="green"
            rounded="none"
            rightIcon={<FiShoppingCart />}
          >
            Opret ordre
          </Button>
        </>
      )}

      {state.matches("Ordre afsluttet") ||
        (state.matches("Afventer") && (
          <>
            <Heading as="h3" size="sm" textTransform="uppercase" pb={4}>
              Tak for din ordre 🎉
            </Heading>
            <NextLink href="/" passHref>
              <Button size="lg" rounded="none">
                Tilbage til forsiden
              </Button>
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
    </PageBox>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=ordre",
});
