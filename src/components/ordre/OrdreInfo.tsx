import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Slide,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useActor } from "@xstate/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FiCalendar, FiPlus, FiShoppingCart } from "react-icons/fi";
import { AppContext } from "../../../pages/_app";
import { sammeDato, sorteredeDatoerFraVarer } from "../../utils/ordre";
import TilfoejDatoModal from "./TilfoejDatoModal";
import VaelgNyDatoModal from "./VaelgNyDatoModal";

export function OrdreInfo() {
  const router = useRouter();
  const erPaaOrdreSiden = router.pathname === "/ordre";
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

  const ordrenOpbygges = antalVarerForHeleOrdren > 0;

  const aktivDato = state.context.aktivDato.toLocaleDateString("da-DK");

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
          <Heading size="xs">
            Du er i gang med at bestille {antalVarerForHeleOrdren} brød
          </Heading>

          <SimpleGrid spacing={4} columns={{ base: 2, md: 3, lg: 5 }} w="full">
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
                <Text>{antalVarer(dato)} brød i kurven</Text>
              </VStack>
            ))}
            <VStack>
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
            <Box gridColumn="end">
              <NextLink href="/ordre" passHref>
                <Button
                  size="lg"
                  rightIcon={<FiShoppingCart />}
                  colorScheme="green"
                  onClick={() => send({ type: "Opret ordre" })}
                >
                  Opret ordre
                </Button>
              </NextLink>
            </Box>
          </SimpleGrid>
        </VStack>
      </Slide>
      <VaelgNyDatoModal />
      <TilfoejDatoModal />
    </>
  );
}
