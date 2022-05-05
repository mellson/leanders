import { CenterModal } from "@/components/CenterModal";
import NulstilKode from "@/components/nulstilKode";
import { Vare } from "@/components/Vare";
import { definitions } from "@/types/supabase";
import { SimpleGrid } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";

export const getStaticProps = async () => {
  const { data } = await supabaseClient
    .from<definitions["varer"]>("varer")
    .select("*")
    .eq("kan_bestilles", true)
    .order("id");

  // Overvej at bruge ISR i stedet for SSG - https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  return {
    props: {
      data: {
        varer: data,
      },
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { access_token, type } = router.query;

  const visNulstilKode =
    access_token !== undefined &&
    typeof access_token === "string" &&
    type === "recovery";

  return (
    <>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 5 }}
        spacing={{ base: 2, md: 5, lg: 10 }}
        justifyItems="center"
      >
        {data.varer?.map((vare) => (
          <Vare key={vare.id} vare={vare} />
        ))}
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
