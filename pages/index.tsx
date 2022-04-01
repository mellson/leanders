import { SimpleGrid, Text } from "@chakra-ui/react";
import type { InferGetServerSidePropsType } from "next";
import * as React from "react";
import { Vare } from "../src/components/Vare";
import { definitions } from "../src/types/supabase";
import { supabase } from "../src/utils/supabase";
import { AppContext } from "./_app";

export const getStaticProps = async () => {
  const { data } = await supabase
    .from<definitions["varer"]>("varer")
    .select("*")
    .order("id");

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
  const appServices = React.useContext(AppContext);
  const { state } = appServices.ordreService;
  return (
    <>
      {state && state.matches("bestiller") && (
        <>
          <Text>Bestilling:</Text>
          <pre>{JSON.stringify(state.context.varer, null, 2)}</pre>
        </>
      )}
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 5 }}
        spacing={10}
        justifyItems="center"
      >
        {data.varer.map((vare) => (
          <Vare key={vare.id} vare={vare} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default Home;
