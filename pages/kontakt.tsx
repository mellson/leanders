import { PageBox } from '@/components/PageBox';
import {
  AspectRatio,
  Box,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Kontakt() {
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Kontakt
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} pt={4} pb={8} spacing={4}>
        <Box>
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
        </Box>

        <Box>
          <Text fontWeight="bold">E-mail</Text>
          <NextLink href="mailto:rune@leanders.dk" passHref>
            <Link>
              <Text>rune@leanders.dk</Text>
            </Link>
          </NextLink>

          <Text fontWeight="bold">Telefon</Text>
          <NextLink href="tel:+4525330045" passHref>
            <Link>
              <Text>+45 25 33 00 45</Text>
            </Link>
          </NextLink>
        </Box>
      </SimpleGrid>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2285.145051056272!2d10.609237416161037!3d55.05819468037333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464d33575c1869ed%3A0x9d61990ca3044745!2sBr%C3%B8dkompagniet!5e0!3m2!1sda!2sdk!4v1648578694806!5m2!1sda!2sdk"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </AspectRatio>
    </PageBox>
  );
}
