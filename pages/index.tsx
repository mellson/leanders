import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { InferGetServerSidePropsType } from "next";
import * as React from "react";
import { ChakraNextImage } from "../src/components/ChakraNextImage";
import { supabase } from "../src/utils/supabase";

export const getStaticProps = async () => {
  const { data, error } = await supabase.from("varer").select("*").order("id");

  // Overvej at bruge ISR i stedet for SSG - https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  return {
    props: {
      data: {
        varer: data ?? [],
      },
    },
  };
};

function Home({ data }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <Heading>Brød</Heading>
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 5 }} spacing={10}>
        {data.varer.map((vare) => {
          return (
            <VStack key={vare.id} spacing={2}>
              <ChakraNextImage
                alt={vare.navn}
                src={`/billeder/${vare.billede}.jpeg`}
                width={100}
                height={100}
              />
              <Text>{vare.navn}</Text>
            </VStack>
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default Home;
