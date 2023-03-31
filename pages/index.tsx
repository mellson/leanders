import ChakraNextImage from "@/components/ChakraNextImage";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { isBefore } from "date-fns";
import NextLink from "next/link";
import { FC, PropsWithChildren } from "react";

export const TextWithHeading: FC<PropsWithChildren<{ heading: string }>> = ({
  heading,
  children,
}) => {
  return (
    <Box>
      <Heading as="h3" size="sm" textTransform="uppercase">
        {heading}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

export default function Home() {
  return (
    <>
      <Box
        position="absolute"
        left={0}
        right={0}
        h={["200px", "300px", "400px", "500px"]}
      >
        <VStack h="full" justify="space-between">
          <ChakraNextImage
            alt="Cover foto"
            src="/billeder/cover.jpeg"
            position="absolute"
            layout="fill"
            w="full"
            h="full"
            zIndex={-1}
          />
          <Heading
            size={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
            textAlign="center"
            color="leanders.500"
            pt={{ base: 4, md: 20, lg: 40 }}
          >
            Værdifuldt brød i hjertet af Svendborg
          </Heading>
          <NextLink href="/bestil" passHref>
            <Button
              rounded="none"
              color="leanders.900"
              colorScheme="leanders"
              size="lg"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Bestil her!
            </Button>
          </NextLink>
          <Text
            bg="rgba(231, 224, 212, 0.7)"
            p={3}
            w="full"
            fontWeight={{ base: "normal", md: "bold" }}
            textAlign="center"
            noOfLines={1}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            <Box as="span" display={{ base: "none", sm: "inline" }}>
              TELEFON:
            </Box>
            <NextLink href="tel:+4525330045" passHref>
              <Link>+45 25 33 00 45</Link>
            </NextLink>
            <Box as="span" display={{ base: "none", sm: "inline" }}>
              {" "}
              • ÅBNINGSTIDER:
            </Box>
            <Box as="span" display={{ base: "inline", sm: "none" }}>
              {" "}
              •{" "}
            </Box>
            Man - fre kl. 7-13 og lør kl. 7-11
          </Text>
        </VStack>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, sm: 8, md: 16 }}
        py={{ base: 4, sm: 8, md: 16 }}
        px={{ base: 0, sm: 4, md: 8 }}
        mt={["200px", "300px", "400px", "500px"]}
      >
        <TextWithHeading heading="Brød bagt på værdier">
          Vores brød er bagt på en simpel men essentiel opskrift; lokalt og
          økologisk mel, vand, salt, surdej, god tid og kærlighed til
          håndværket. Det er lidt af en kunst at bage med surdej, og det giver
          en længere bageproces. Til gengæld giver det en karakteristisk, let
          syrlig smag og et brød der holder længe og smager af det korn og mel,
          det er lavet af.
        </TextWithHeading>
        <TextWithHeading heading="Det sure med det søde">
          Selvom vi elsker surdejsbrød, bager vi også et småt men godt udvalg af
          søde sager. Her er hverken sparet på værdier eller kalorier. Rigeligt
          med økologisk smør og sukker så englene synger. Vælg mellem sprød
          croissant, pain au chocolat, kanelsnegl eller tebirkes bagt som en
          ægte københavner.
        </TextWithHeading>
      </SimpleGrid>
    </>
  );
}
