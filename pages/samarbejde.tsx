import { PageBox } from "@/components/PageBox";
import { Heading, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Kontakt() {
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Samarbejdspartnere
      </Heading>
      <Text>Café Citronen</Text>
      <Text>Work2gether</Text>
      <Text>Café Aroma</Text>
      <Text>Sygehuskiosken</Text>
      <Text>Ostespecialisten</Text>
      <Text>Aron</Text>
      <Text>105</Text>
      <Text>Lalou</Text>
      <Text>Café Unika</Text>
      <Text>Bar Unika</Text>
      <Text>Hotel The Monica</Text>
      <Text>Økomølleriet Kragegården</Text>
      <Text>Bornholms Valsemølle</Text>
      <Text>Thise Mejeri</Text>
      <Text>Grøn Fokus</Text>
      <Text>Moselund Økologi</Text>
      <br />
      <HStack spacing={1}>
        <Text>
          Har du også lyst til at forkæle dine gæster med lækkert
          kvalitetsbagværk så tøv ikke med at kontakte os på
        </Text>
        <NextLink href="mailto:kasper@leanders.dk" passHref>
          <Link>
            <Text>kasper@leanders.dk</Text>
          </Link>
        </NextLink>
      </HStack>
    </PageBox>
  );
}
