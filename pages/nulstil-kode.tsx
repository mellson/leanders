import NulstilKode from '@/components/nulstilKode';
import { PageBox } from '@/components/PageBox';
import { Heading } from '@chakra-ui/react';

export default function Om() {
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Nulstil din kode
      </Heading>
      <NulstilKode />
    </PageBox>
  );
}
