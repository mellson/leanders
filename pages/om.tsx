import ChakraNextImage from '@/components/ChakraNextImage';
import { PageBox } from '@/components/PageBox';
import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { TextWithHeading } from '.';

export default function Om() {
  return (
    <>
      <VStack h={['200px', '300px', '400px', '500px']} justify="space-around">
        <ChakraNextImage
          alt="Kasper"
          src="/billeder/kasper_intro.jpeg"
          position="absolute"
          layout="fill"
          w="full"
          h={['200px', '300px', '400px', '500px']}
          zIndex={-1}
        />
        <Heading
          size={{ base: 'md', md: 'lg', lg: 'xl' }}
          textAlign="center"
          color="leanders.500"
        >
          Økologisk brød bagt på surdej og god tid
        </Heading>
      </VStack>

      <PageBox>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} py={8} px={0}>
          <TextWithHeading heading="Direkte fra ovn til favn">
            Her køber du brød og søde sager direkte fra ovnen. Vi er ikke helt
            som de fleste andre bagerier. Vi har ikke noget salgslokale, så du
            handler med os, mens vi bager. På den måde ser og dufter du, hvor
            brødet kommer fra, og vi får lov til at hilse på dig og alle vores
            andre kunder. Det kan vi nemlig godt lide.
          </TextWithHeading>
          <TextWithHeading heading="Ærligt, simpelt og godt">
            Her får du friskt og ærligt bagværk bagt på de bedste økologiske
            råvarer, og det kan smages. Et godt brød smager nemlig af tid og det
            korn, det er lavet af. Alle ingredienser er nøje udvalgte, men den
            vigtigste ingrediens i et godt brød er tid. Derfor er alle vores
            brød langtidshævede, hvilket giver den helt særlige smag og krumme.
          </TextWithHeading>
        </SimpleGrid>
        <Heading as="h3" size="sm" textTransform="uppercase">
          Bag bagværket
        </Heading>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={8}
          justifyItems="center"
        >
          <Box>
            <Text>
              Leanders er stiftet af mig, Kasper Leander, og med mig i bageriet
              har jeg desuden den unge dejsnedker Nikolai, Mika som er uddannet
              konditor i Israel og altmuligmanden Flemming. Jeg stiftede
              bageriet i 2017, efter min familie og jeg flyttede fra København
              til Tåsinge. Min store interesse for brød og bagning blev vakt til
              live, da jeg arbejdede som kok og underviser i Meyers Madhus efter
              mange år i Københavns pulserende restaurationsliv på steder som
              Madklubben, Marv & Ben og Noma. Det er kærlighed til håndværket,
              surdej, de gode råvarer og kontakten til alle mine kunder, som
              driver bagværket - det håber jeg, du kan smage!
            </Text>
          </Box>
          <ChakraNextImage
            alt="Kasper"
            src="/billeder/kasper.jpeg"
            width={400}
            height={600}
          />
        </SimpleGrid>
      </PageBox>
    </>
  );
}
