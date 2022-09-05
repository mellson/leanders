import ChakraNextImage from '@/components/ChakraNextImage';
import { PageBox } from '@/components/PageBox';
import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

export default function Om() {
  return (
    <>
      <VStack h={['200px', '300px', '400px', '500px']} justify="space-around">
        <ChakraNextImage
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
          Et godt brød smager af god tid og det korn det er lavet af
        </Heading>
      </VStack>

      <PageBox>
        <Heading as="h3" size="sm" textTransform="uppercase">
          Manden bag Brødkompagniet
        </Heading>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={8}
          justifyItems="center"
        >
          <Box>
            <Text>
              Mit navn er Kasper Leander og jeg bor på Tåsinge med min kone,
              vores 3 børn og min svigermor. Vi flyttede hertil fra København i
              2013 og har elsket det fra første øjeblik, vi kørte over
              Svendborgsundbroen. Her har vi skabt et lille fritidslandbrug med
              økologisk køkkenhave, høns, får og grise og muligheden for det
              lidt mere rolige og nærværende familieliv. Jeg har en baggrund som
              kok og har arbejdet som køkkenchef og underviser i flere år.
              Interessen for brød har altid været der, så da jeg fik mulighed
              for at leje bageriet i Brogade i Svendborg tænkte jeg, at nu
              skulle det være. Ikke flere undskyldninger. Frem med dejskraberen
              og sæt igang!
            </Text>
            <br />
            <Text>
              Min vision med Brødkompagniet er at tilbyde dig friskt og ærligt
              brød bagt på de bedste økologiske råvarer. Et godt brød bliver
              ikke lavet på to timer og derfor er alle mine brød langtidshævede,
              hvilket gør at brødene bliver mere smagfulde. Det skal være
              ærligt, simpelt og godt! Velbekomme.
            </Text>
          </Box>
          <ChakraNextImage
            src="/billeder/kasper.jpeg"
            width={400}
            height={600}
          />
        </SimpleGrid>
      </PageBox>
    </>
  );
}
