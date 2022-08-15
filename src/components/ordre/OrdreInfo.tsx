import { AppContext } from '@/utils/context';
import { antalVarerPaaDato, samletPrisPaaDato, sammeDato } from '@/utils/ordre';
import {
  antalVarerForHeleOrdrenSelector,
  sorteredeDatoerSelector,
} from '@/xstate/selectors';
import { Button, SimpleGrid, Slide, Text, VStack } from '@chakra-ui/react';
import { useActor, useSelector } from '@xstate/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiCalendar, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { PrisText } from './Pris';
import RedigerAktivDatoModal from './RedigerAktivDatoModal';
import SaetAktivDatoModal from './SaetAktivDatoModal';
import TilfoejDatoModal from './TilfoejDatoModal';

export function OrdreInfo() {
  const router = useRouter();
  const erPaaOrdreSiden = router.pathname === '/ordre';
  const appContext = React.useContext(AppContext);
  const { send } = appContext.ordreActor;
  const [state] = useActor(appContext.ordreActor);
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
          bg="leanders.600"
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
                    ? 'leanders.400'
                    : 'transparent'
                }
                border="2px solid"
                borderColor="leanders.800"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  transform: 'scale(1.05)',
                  shadow: 'sm',
                }}
                onClick={() => send({ type: 'Sæt aktiv dato', dato })}
                padding={2}
                rounded="none"
              >
                <Text fontSize="xs">{dato.toLocaleDateString('da-DK')}</Text>
                <Text>
                  {antalVarerPaaDato(dato, state.context.varer)} brød i kurven
                </Text>
                {visPriser && (
                  <PrisText
                    pris={samletPrisPaaDato(
                      dato,
                      state.context.varer,
                      state.context.databaseVarer
                    )}
                  />
                )}
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
                variant="outline"
                size="sm"
                width="full"
                rounded="none"
                onClick={() => send({ type: 'Start udskift aktiv dato' })}
              >
                Rediger dato
              </Button>

              <Button
                leftIcon={<FiPlus />}
                variant="outline"
                size="sm"
                width="full"
                rounded="none"
                onClick={() => send({ type: 'Start tilføj dato' })}
              >
                Tilføj ny dato
              </Button>
            </VStack>

            <NextLink href="/ordre" passHref>
              <Button
                size="lg"
                rightIcon={<FiShoppingCart />}
                colorScheme="green"
                rounded="none"
                fontSize={{ base: 'sm', sm: 'sm', md: 'lg' }}
                gridRow={1}
                gridColumn={{ base: 2, md: 3, lg: 5 }}
                height="inherit"
                onClick={() => send({ type: 'Bekræft ordre' })}
              >
                Godkend ordre
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
