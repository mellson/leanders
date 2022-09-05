import { PageBox } from '@/components/PageBox';
import { Heading, Text } from '@chakra-ui/react';

export default function Om() {
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Privatlivspolitik
      </Heading>
      <Text>
        Vi bruger din email for at give dig mulighed for at bestille brød og se
        dine tidligere ordrer.
      </Text>
    </PageBox>
  );
}
