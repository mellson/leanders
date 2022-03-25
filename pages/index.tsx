import type { InferGetServerSidePropsType } from "next";
import * as React from "react";
import { supabase } from "../src/utils/supabase";

export const getStaticProps = async () => {
  const { data, error } = await supabase.from("varer").select("*");

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
      {data.varer.map((vare) => (
        <div key={vare.id}>{vare.navn}</div>
      ))}
    </>
  );
}

export default Home;
