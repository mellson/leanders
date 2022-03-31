import { SimpleGrid } from "@chakra-ui/react";
import type { InferGetServerSidePropsType } from "next";
import * as React from "react";
import { Vare } from "../src/components/Vare";
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
