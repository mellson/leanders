import { CenterModal } from "@/components/CenterModal";
import NulstilKode from "@/components/nulstilKode";
import { PageBox } from "@/components/PageBox";
import { Vare } from "@/components/Vare";
import { Database } from "@/types/DatabaseDefinitions";
import { AppContext } from "@/utils/context";
import { supabaseClient } from "@/utils/supabase-util";
import { SimpleGrid } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useSelector } from "@xstate/react";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";

export const getStaticProps = async () => {
  const { data } = await supabaseClient
    .from("varer")
    .select("*")
    .eq("kan_bestilles", true)
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

export default function Bestil({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const { session } = useSessionContext();
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
      const { data } = await createBrowserSupabaseClient<Database>()
        .from("firmaer")
        .select("navn")
        .match({ user_email: userEmail });

      if (data && data.length > 0) {
        const firmanavn = data[0]?.navn;
        if (firmanavn && firmanavn.length > 0) {
          send({ type: "Vis Priser", visPriser: false });
        }
      }
    }

    if (session?.user && session?.user.email) {
      getFirmaNavn(session?.user.email);
    }
  }, [send, session]);

  const visNulstilKode =
    access_token !== undefined &&
    typeof access_token === "string" &&
    type === "recovery";

  return (
    <PageBox>
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
    </PageBox>
  );
}
