import { PageBox } from "@/components/PageBox";
import { Heading, Link, Text } from "@chakra-ui/react";

export default function Kontakt() {
  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Samarbejdspartnere
      </Heading>
      <Link href="https://was-keramik.com/" target="_blank">
        <Text>Keramik og Kaffe</Text>
      </Link>
      <Link href="https://restaurantsvendborgsund.dk/" target="_blank">
        <Text>Restaurant Svendborgsund</Text>
      </Link>
      <Link href="https://byensgaardbutik.dk/" target="_blank">
        <Text>Byens Gårdbutik</Text>
      </Link>
      <Link href="https://www.work2gether.dk/" target="_blank">
        <Text>Work2gether, Svendborg</Text>
      </Link>
      <Link href="http://cafearoma.dk/" target="_blank">
        <Text>Café Aroma, Svendborg</Text>
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=100075931884735"
        target="_blank"
      >
        <Text>Sygehuskiosken, Svendborg</Text>
      </Link>
      <Link href="https://ostespecialisten.dk/" target="_blank">
        <Text>Ostespecialisten, Svendborg</Text>
      </Link>
      <Link href="https://www.sejlmedaron.dk/" target="_blank">
        <Text>Aron, Det Sydfynske Øhav</Text>
      </Link>
      <Link href="https://lalouvinbar.dk/" target="_blank">
        <Text>Lalou Vinbar, Odense</Text>
      </Link>
      <Link href="https://cafeunika.dk/" target="_blank">
        <Text>Café Unika, Odense</Text>
      </Link>
      <Link href="https://barunika.dk/" target="_blank">
        <Text>Bar' Unika, Odense</Text>
      </Link>
      <Link href="https://themonica.dk/" target="_blank">
        <Text>The Monica Hotel, Ærø</Text>
      </Link>
      <Link href="https://www.aggershoej.dk/" target="_blank">
        <Text>Aggershøj Pensionat</Text>
      </Link>
      <Link href="https://www.facebook.com/knaewr" target="_blank">
        <Text>Knæwr Kaffebar</Text>
      </Link>

      <Heading as="h4" size="xs" pt="6">
        Disse producenter har en særlig plads i bagerens hjerte, når de enten
        leverer råvarer eller samarbejder med os om forskellige madevents
      </Heading>
      <Link href="https://bornholms-valsemoelle.dk/" target="_blank">
        <Text>Bornholms Valsemølle</Text>
      </Link>
      <Link href="https://gronfokus.dk/" target="_blank">
        <Text>Grøn Fokus</Text>
      </Link>
      <Link
        href="https://goforlocal.dk/find-lokale-foedevarer/madkassen-paa-moselund-oekologi"
        target="_blank"
      >
        <Text>Moselund Økologi</Text>
      </Link>
      <Link href="https://thise.dk/" target="_blank">
        <Text>Thise Mejeri</Text>
      </Link>
      <Link href="https://kragegaarden.dk/" target="_blank">
        <Text>Økomølleriet Kragegården</Text>
      </Link>
      <Link href="https://quartzmolle.dk/" target="_blank">
        <Text>Quartz Mølle</Text>
      </Link>
      <Link href="https://www.facebook.com/Cykeltutten" target="_blank">
        <Text>Cykeltutten</Text>
      </Link>
      <br />
      <Text>
        Har du også lyst til at forkæle dine gæster med lækkert kvalitetsbagværk
        så tøv ikke med at kontakte os på{" "}
        <a href="mailto:kasper@leanders.dk">kasper@leanders.dk</a>
      </Text>
    </PageBox>
  );
}
