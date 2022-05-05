import { AppContext } from "@/utils/context";
import { antalVarerPaaDato, sammeDato } from "@/utils/ordre";
import {
  antalVarerForHeleOrdrenSelector,
  sorteredeDatoerSelector,
} from "@/xstate/selectors";
import { Button, SimpleGrid, Slide, Text, VStack } from "@chakra-ui/react";
import { useActor, useSelector } from "@xstate/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FiCalendar, FiPlus, FiShoppingCart } from "react-icons/fi";
import RedigerAktivDatoModal from "./RedigerAktivDatoModal";
import SaetAktivDatoModal from "./SaetAktivDatoModal";
import TilfoejDatoModal from "./TilfoejDatoModal";

export function OrdreInfo() {
  const router = useRouter();
  const erPaaOrdreSiden = router.pathname === "/ordre";
  const appServices = React.useContext(AppContext);
  const { send } = appServices.ordreService;
  const [state] = useActor(appServices.ordreService);
  const sorteredeDatoer = useSelector(
    appServices.ordreService,
    sorteredeDatoerSelector
  );
  const antalVarerForHeleOrdren = useSelector(
    appServices.ordreService,
    antalVarerForHeleOrdrenSelector(sorteredeDatoer)
  );

  const ordrenOpbygges = antalVarerForHeleOrdren > 0;

  const antalDatoer = sorteredeDatoer.length;

  return (
    <>
      <Slide
        direction="bottom"
        in={ordrenOpbygges && !erPaaOrdreSiden}
        style={{ zIndex: 10 }}
      >
        <VStack
          roundedTop="md"
          padding={4}
          opacity={ordrenOpbygges ? 0.95 : 0.0}
          bg="brand.300"
          align="start"
        >
          <SimpleGrid
            spacing={{ base: 2, md: 4 }}
            columns={{ base: 2, md: 3, lg: 5 }}
            w="full"
          >
            {sorteredeDatoer.map((dato) => (
              <VStack
                justify="space-between"
                key={dato.toString()}
                alignItems="start"
                bg={
                  sammeDato(dato, state.context.aktivDato)
                    ? "brand.200"
                    : "transparent"
                }
                border="2px solid"
                borderColor="brand.200"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  transform: "scale(1.05)",
                  backgroundColor: "brand.200",
                  shadow: "sm",
                }}
                onClick={() => send({ type: "Sæt aktiv dato", dato })}
                padding={2}
                rounded="lg"
              >
                <Text fontSize="xs">{dato.toLocaleDateString("da-DK")}</Text>
                <Text>
                  {antalVarerPaaDato(dato, state.context.varer)} brød i kurven
                </Text>
              </VStack>
            ))}
            <VStack
              gridRow={{
                base: 2,
                md: antalDatoer > 1 ? 2 : 1,
                lg: antalDatoer > 3 ? 2 : 1,
              }}
              gridColumn={{
                base: 2,
                md: antalDatoer > 1 ? 3 : 2,
                lg: antalDatoer > 3 ? 5 : 4,
              }}
            >
              <Button
                leftIcon={<FiCalendar />}
                colorScheme="brand"
                variant="outline"
                size="sm"
                width="full"
                onClick={() => send({ type: "Start udskift aktiv dato" })}
              >
                Rediger dato
              </Button>

              <Button
                leftIcon={<FiPlus />}
                colorScheme="brand"
                variant="outline"
                size="sm"
                width="full"
                onClick={() => send({ type: "Start tilføj dato" })}
              >
                Tilføj ny dato
              </Button>
            </VStack>

            <NextLink href="/ordre" passHref>
              <Button
                size="lg"
                rightIcon={<FiShoppingCart />}
                colorScheme="green"
                fontSize="lg"
                gridRow={1}
                gridColumn={{ base: 2, md: 3, lg: 5 }}
                height="inherit"
                onClick={() => send({ type: "Bekræft ordre" })}
              >
                Gennemgå ordre
              </Button>
            </NextLink>
          </SimpleGrid>
        </VStack>
      </Slide>
      <SaetAktivDatoModal />
      <RedigerAktivDatoModal />
      <TilfoejDatoModal />
    </>
  );
}
