import { SimpleGrid, Text } from "@chakra-ui/react";
import { useActor } from "@xstate/react";
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
  const [state] = useActor(appServices.ordreService);

  return (
    <>
      {state.matches("bestiller") && (
        <Text>{state.context.varer.size} produkter i kurven</Text>
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
