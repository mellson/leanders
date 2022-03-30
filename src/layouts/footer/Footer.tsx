import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import * as React from "react";
import { OekoLogo } from "./OekoLogo";
import { SoMeLinks } from "./SoMeLinks";

export const Footer = () => (
  <Box as="footer" bg="gray.100">
    <Container role="contentinfo" py={{ base: "12", md: "16" }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Heading as="h6" size="xs">
            Kontrolrapport
          </Heading>
          <Text>
            Se fødevarestyrelsens{" "}
            <Link href="https://www.findsmiley.dk/719019">kontrolrapport</Link>{" "}
            for Leanders
          </Text>
          <br />
          <OekoLogo />
        </Box>
        <Box>
          <Heading as="h6" size="xs">
            Kontaktoplysninger
          </Heading>
          <Text>Leanders IVS CVR: 38996371</Text>
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
        </Box>
        <SoMeLinks />
      </SimpleGrid>
    </Container>
  </Box>
);