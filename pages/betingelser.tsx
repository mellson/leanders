import { PageBox } from '@/components/PageBox';
import { Heading, Text } from '@chakra-ui/react';

export default function Om() {
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Vilkår og betingelser
      </Heading>
      <Text>Du skal opføre dig ordentligt.</Text>
    </PageBox>
  );
}
