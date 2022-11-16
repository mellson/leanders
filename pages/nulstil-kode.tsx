import NulstilKode from '@/components/nulstilKode';
import { PageBox } from '@/components/PageBox';
import { Heading } from '@chakra-ui/react';
import { useSessionContext } from '@supabase/auth-helpers-react';

export default function NulstilKodePage() {
  const { session } = useSessionContext();
  if (!session?.user)
    return (
      <PageBox>
        <Heading as="h3" size="sm" textTransform="uppercase">
          Fejl, kunne ikke finde din bruger
        </Heading>
      </PageBox>
    );
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Nulstil din kode
      </Heading>
      <NulstilKode />
    </PageBox>
  );
}
