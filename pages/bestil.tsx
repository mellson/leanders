import { PageBox } from '@/components/PageBox';
import { Vare } from '@/components/Vare';
import { AppContext } from '@/utils/context';
import { supabaseClient } from '@/utils/supabase-util';
import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useSelector } from '@xstate/react';
import type { InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import * as React from 'react';
import { useEffect } from 'react';

export const getStaticProps = async () => {
  const { data } = await supabaseClient
    .from('varer')
    .select('*')
    .eq('kan_bestilles', true)
    .order('id');

  // Overvej at bruge ISR i stedet for SSG - https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  return {
    props: {
      data: {
        varer: data ?? [],
      },
    },
  };
};

export default function Bestil({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const { session, supabaseClient } = useSessionContext();
  const appContext = React.useContext(AppContext);
  const aktivDato = useSelector(
    appContext.ordreActor,
    (state) => state.context.aktivDato
  );
  const visPriser = useSelector(
    appContext.ordreActor,
    (state) => state.context.visPriser
  );
  const { send } = appContext.ordreActor;

  useEffect(() => {
    send({ type: 'Set database varer', varer: data.varer ?? [] });
  }, [data.varer, send]);

  useEffect(() => {
    async function getFirmaNavn(userEmail: string) {
      const { data } = await supabaseClient
        .from('firmaer')
        .select('navn')
        .match({ user_email: userEmail });

      if (data && data.length > 0) {
        const firmanavn = data[0]?.navn;
        if (firmanavn && firmanavn.length > 0) {
          send({ type: 'Vis Priser', visPriser: false });
        }
      }
    }

    if (session?.user && session?.user.email) {
      getFirmaNavn(session?.user.email);
    }
  }, [send, session]);

  const infoHeight = useBreakpointValue({
    base: '340px',
    sm: '280px',
    md: '220px',
  });

  useEffect(() => {
    if (appContext.ordreActor.state?.matches('Bekræfter ordre')) {
      send({ type: 'Afbryd' });
    }
  }, []);

  return (
    <>
      <Box
        bg="rgba(190, 171, 139, 0.5)"
        p={{ base: 4, sm: 8, md: 12 }}
        position="absolute"
        left={0}
        right={0}
        maxH={infoHeight}
      >
        <Container maxW={{ base: 'full', md: '2xl' }}>
          <Heading as="h3" size="sm" textTransform="uppercase">
            Bestil og hent brød og kager
          </Heading>
          <Text>
            Her på siden kan du bestille brød og kager og vælge en dag du vil
            hente det. Du kan hente det I åbningstiden direkte fra bageriet og
            efter lukketid fra vores brødboks. Du betaler først, når du henter.
            Har du særlige ønsker eller forespørgsler, så tøv ikke med at
            kontakte os på <Link href="#kontakt">mail eller tlf.</Link>
          </Text>
          {session?.user && (
            <Box pt="4" textAlign="end">
              <NextLink href="/profil" passHref>
                <Link>Min side</Link>
              </NextLink>
            </Box>
          )}
        </Container>
      </Box>

      <Box mt={infoHeight}>
        <PageBox>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 5 }}
            spacing={{ base: 2, md: 5, lg: 10 }}
            justifyItems="center"
          >
            {data.varer?.map((vare) => (
              <Vare
                key={vare.id}
                vare={vare}
                dato={aktivDato}
                visPris={visPriser}
              />
            ))}
          </SimpleGrid>
        </PageBox>
      </Box>
    </>
  );
}
