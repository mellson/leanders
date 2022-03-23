import type { InferGetServerSidePropsType } from "next";
import * as React from "react";
import { supabase } from "../src/utils/supabase";

export const getServerSideProps = async () => {
  const { data, error } = await supabase.from("varer").select("*");

  console.log(data);

  return {
    props: {
      data: {
        varer: data ?? [],
      },
    },
  };
};

function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1>Velkommen til Leanders 🥐</h1>

      {data.varer.map((vare) => (
        <div key={vare.id}>{vare.navn}</div>
      ))}
    </>
  );
}

export default Home;
