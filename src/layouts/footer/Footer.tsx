import { SoMeLinks } from '@/components/SoMeLinks';
import { Cittaslow } from '@/layouts/footer/Cittaslow';
import { navn } from '@/layouts/Logo';
import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
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
              <NextLink href="https://www.findsmiley.dk/719019" passHref>
                <Link>kontrolrapport</Link>
              </NextLink>{' '}
              for {navn}
            </Text>
            <br />
            <HStack pb={2}>
              <OekoLogo />
              <Cittaslow />
            </HStack>
            <Heading as="h6" size="xs">
              Følg os
            </Heading>
            <SoMeLinks color="leanders.900" />
          </Box>
          <Box id="kontakt">
            <Heading as="h6" size="xs">
              Kontaktoplysninger
            </Heading>
            <Text>{navn} ApS CVR: 38996371</Text>
            <br />
            <Text fontWeight="bold">Adresse</Text>
            <NextLink
              href="https://www.google.com/maps?ll=55.058195,10.611426&z=17&t=m&hl=da&gl=DK&mapclient=embed&cid=11340513616249243461"
              passHref
            >
              <Link>
                <Text>Brogade 29 5700 Svendborg</Text>
              </Link>
            </NextLink>
            <Text>indgang fra Jernbanegade.</Text>
            <Text>Man - fre kl. 7-13 og lørdag kl 7-11</Text>
            <br />
            <Text fontWeight="bold">E-mail</Text>
            <NextLink href="mailto:kasper@leanders.dk" passHref>
              <Link>
                <Text>kasper@leanders.dk</Text>
              </Link>
            </NextLink>
            <br />
            <Text fontWeight="bold">Telefon</Text>
            <NextLink href="tel:+4525330045" passHref>
              <Link>
                <Text>+45 25 33 00 45</Text>
              </Link>
            </NextLink>
            <br />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
