import { CenterModal } from "@/components/CenterModal";
import NulstilKode from "@/components/nulstilKode";
import { Vare } from "@/components/Vare";
import { definitions } from "@/types/supabase";
import { AppContext } from "@/utils/context";
import { SimpleGrid } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useSelector } from "@xstate/react";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";

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
  const { user } = useUser();
  const router = useRouter();
  const { access_token, type } = router.query;
  const appContext = React.useContext(AppContext);
  const aktivDato = useSelector(
    appContext.ordreActor,
    (state) => state.context.aktivDato
  );
  const visPriser = useSelector(
    appContext.ordreActor,
    (state) => state.context.visPriser
  );
  const { send } = appContext.ordreActor;

  useEffect(() => {
    send({ type: "Set database varer", varer: data.varer ?? [] });
  }, [data.varer, send]);

  useEffect(() => {
    async function getFirmaNavn(userEmail: string) {
      const { data } = await supabaseClient
        .from<{ navn: string }>("firmaer")
        .select("navn")
        .match({ user_email: userEmail });

      if (data && data.length > 0) {
        const firmanavn = data[0]?.navn;
        if (firmanavn && firmanavn.length > 0) {
          send({ type: "Vis Priser", visPriser: false });
        }
      }
    }

    if (user && user.email) {
      getFirmaNavn(user.email);
    }
  }, [send, user]);

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
          <Vare
            key={vare.id}
            vare={vare}
            dato={aktivDato}
            visPris={visPriser}
          />
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
