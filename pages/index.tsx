import { CenterModal } from "@/components/CenterModal";
import ChakraNextImage from "@/components/ChakraNextImage";
import NulstilKode from "@/components/nulstilKode";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

const TextWithHeading: FC<PropsWithChildren<{ heading: string }>> = ({
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
  const router = useRouter();
  const { access_token, type } = router.query;

  const visNulstilKode =
    access_token !== undefined &&
    typeof access_token === "string" &&
    type === "recovery";

  return (
    <>
      <VStack h={["200px", "300px", "400px", "500px"]} justify="space-around">
        <ChakraNextImage
          alt="Cover foto"
          src="/billeder/cover.jpeg"
          position="absolute"
          layout="fill"
          w="full"
          h={["200px", "300px", "400px", "500px"]}
          zIndex={-1}
        />
        <Heading
          size={{ base: "md", md: "lg", lg: "xl" }}
          textAlign="center"
          color="leanders.500"
        >
          Langsomt & lækkert siden 2017
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
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} py={16} px={8}>
        <TextWithHeading heading="Det gode brød">
          Hvad er et godt brød? Det er der jo mange meninger om, men her hos
          Brødkom- pagniet er det de gode økologiske råvarer og god tid, som
          kendetegner et godt brød. Et groft og luftigt brød, som mætter og
          smager af det mel og korn, det er lavet af. Rugbrød med eller uden
          kerner, som er saftigt, har en sprød skorpe og en tilpas syrlig smag.
          Det er Brødkompagniets defination af ‘Det gode brød’.
        </TextWithHeading>
        <TextWithHeading heading="Brød bagt på surdej">
          Alle brød fra Brødkompagniet er bagt på surdej. Det er lidt af en
          kunst at bage med surdej og det giver en noget længere bagningsproces,
          men til gengæld tilfører det brødet en skøn, karakteristisk og let
          syrlig smag. Den syrlige smag kommer primært fra de
          mælkesyrebakterier, som dannes i surdejen. Surdejen bruges både som
          hæve- middel og smagsgiver hos Brødkompagniet.
        </TextWithHeading>
      </SimpleGrid>
      <CenterModal
        titel={"Nulstil din kode"}
        isOpen={visNulstilKode}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <NulstilKode />
      </CenterModal>
    </>
  );
}
