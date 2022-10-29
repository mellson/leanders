import { Box, Container, Text, VStack } from '@chakra-ui/react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
interface Citat {
  citat: string;
  afsender: string;
}
export function Citat() {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const [citat, setCitat] = useState<Citat>();

  useEffect(() => {
    supabaseClient
      .from('citater')
      .select('citat,afsender')
      .then(({ data }) => {
        if (data) {
          data.sort(function () {
            return 0.5 - Math.random();
          });
          setCitat(data[0]);
        }
      });
  }, [router]);

  if (!citat) return null;

  return (
    <Box bg="leanders.900" color="leanders.500">
      <Container py={8} maxWidth="50%">
        <VStack align="end" spacing={0}>
          <Text
            fontSize="2xl"
            fontWeight="light"
            fontStyle="italic"
            textAlign="center"
          >
            "{citat.citat}"
          </Text>
          <Text>- {citat.afsender}</Text>
        </VStack>
      </Container>
    </Box>
  );
}
