import { SoMeLinks } from '@/components/SoMeLinks';
import { navn } from '@/layouts/Logo';
import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { OekoLogo } from './OekoLogo';

export function Footer() {
  return (
    <Box as="footer" bg="rgba(190, 171, 139, 0.800)">
      <Container role="contentinfo" py={{ base: '12', md: '16' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading as="h6" size="xs">
              Kontrolrapport
            </Heading>
            <Text>
              Se fødevarestyrelsens{' '}
              <Link href="https://www.findsmiley.dk/719019">
                kontrolrapport
              </Link>{' '}
              for {navn}
            </Text>
            <br />
            <OekoLogo />
            <br />
            <br />
            <Heading as="h6" size="xs">
              Følg os
            </Heading>
            <SoMeLinks />
          </Box>
          <Box>
            <Heading as="h6" size="xs">
              Kontaktoplysninger
            </Heading>
            <Text>{navn} ApS CVR: 38996371</Text>
            <br />
            <Text fontWeight="bold">Adresse</Text>
            <Link href="https://www.google.com/maps?ll=55.058195,10.611426&z=17&t=m&hl=da&gl=DK&mapclient=embed&cid=11340513616249243461">
              <Text>Brogade 29 5700 Svendborg</Text>
            </Link>
            <Text>indgang fra Jernbanegade.</Text>
            <Text>Man - fre kl. 7-13 og lørdag kl 7-11</Text>
            <br />
            <Text fontWeight="bold">E-mail</Text>
            <Link href="mailto:kasper@broedkompagniet.dk">
              <Text>kasper@broedkompagniet.dk</Text>
            </Link>
            <br />
            <Text fontWeight="bold">Telefon</Text>
            <Link href="tel:+4525330045">
              <Text>+45 25 33 00 45</Text>
            </Link>
            <br />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
