import { CenterModal } from "@/components/CenterModal";
import NulstilKode from "@/components/nulstilKode";
import { Vare } from "@/components/Vare";
import { definitions } from "@/types/supabase";
import { groupBy } from "@/utils/general";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";

export const getStaticProps = async () => {
  const { data } = await supabaseClient
    .from<definitions["varer"]>("varer")
    .select("*")
    .eq("kan_bestilles", true);

  // Overvej at bruge ISR i stedet for SSG - https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  return {
    props: {
      data: {
        varer: groupBy(data ?? [], (vare) => vare.kategori),
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
      {Object.keys(data.varer).map((kategori) => {
        return (
          <div key={kategori}>
            <Heading size="sm" pb={4}>
              {kategori}
            </Heading>
            <SimpleGrid
              columns={{ base: 2, md: 3, lg: 5 }}
              spacing={10}
              justifyItems="center"
            >
              {data.varer[kategori]?.map((vare) => (
                <Vare key={vare.id} vare={vare} />
              ))}
            </SimpleGrid>
          </div>
        );
      })}

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
