import Confetti from "@/components/ordre/Confetti";
import { AppContext } from "@/utils/context";
import {
  antalVarerForHeleOrdrenSelector,
  sorteredeDatoerSelector,
} from "@/xstate/selectors";
import { Button, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
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
  const varer = useSelector(
    appServices.ordreService,
    (state) => state.context.varer
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

          {sorteredeDatoer.map((dato) => (
            <VStack key={dato.toString()}>
              <Text fontSize="xs">{dato.toLocaleDateString("da-DK")}</Text>
              <SimpleGrid
                columns={{ base: 2, md: 3, lg: 5 }}
                spacing={{ base: 2, md: 5, lg: 10 }}
                justifyItems="center"
              >
                {Array.from(varer.get(dato.getTime())?.keys() ?? []).map(
                  (vareId) => (
                    <Text key={vareId}>
                      id:{vareId} - antal:
                      {varer.get(dato.getTime())?.get(vareId)}
                    </Text>
                  )
                )}
              </SimpleGrid>
            </VStack>
          ))}

          <Button
            onClick={() => send({ type: "Opret ordre" })}
            isLoading={arbejder}
          >
            Afgiv ordre
          </Button>
        </>
      )}

      {state.matches("Ordre afsluttet") ||
        (state.matches("Afventer") && (
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
