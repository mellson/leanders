import { PageBox } from "@/components/PageBox";
import type { Database } from "@/types/DatabaseDefinitions";
import { AppContext } from "@/utils/context";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  createServerSupabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

type Firma = Database["public"]["Tables"]["firmaer"]["Row"];
interface ProfilProps {
  isAdmin: boolean;
  firma?: Firma;
}

export default function Profil({ isAdmin, firma: firmaInput }: ProfilProps) {
  const { error, session, supabaseClient } = useSessionContext();
  const [originaltFirma, setOriginaltFirma] = useState(firmaInput);
  const [firma, setFirma] = useState<Firma | undefined>(firmaInput);
  const [firmaIsChanging, setFirmaIsChanging] = useState(false);
  const firmaIsChanged = firma !== originaltFirma;
  const appContext = useContext(AppContext);
  const { send } = appContext.ordreActor;
  const router = useRouter();

  const getFirma = (input?: Firma): Firma => {
    if (input) return input;
    return {
      id: -1,
      navn: "",
      adresse: "",
      postnr: 0,
      by: "",
      user_email: session?.user.email ?? "",
    };
  };

  const sletFirma = async () => {
    setFirma(undefined);
    setFirmaIsChanging(true);
    const { data, error } = await supabaseClient
      .from("firmaer")
      .delete()
      .eq("id", firma?.id);
    setOriginaltFirma(undefined);
    setFirmaIsChanging(false);
    send({ type: "Vis Priser", visPriser: firma === undefined });
    router.reload();
  };

  const gemFirma = async () => {
    if (!firma) return;
    setFirmaIsChanging(true);
    const { data, error } = await supabaseClient.from("firmaer").upsert({
      id: firma && firma.id > 0 ? firma.id : undefined,
      navn: firma.navn,
      adresse: firma.adresse,
      postnr: firma.postnr,
      by: firma.by,
    });
    setOriginaltFirma(firma);
    setFirmaIsChanging(false);

    send({ type: "Vis Priser", visPriser: true });
  };

  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Profil
      </Heading>

      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          rounded="none"
          id="email"
          type="email"
          value={session?.user.email}
          readOnly
        />
        <FormHelperText>
          Emailadressen der er tilknyttet din bruger.
        </FormHelperText>

        <SimpleGrid columns={2} spacing={8} rowGap={0}>
          <Box>
            <FormLabel htmlFor="firmaNavn" mt={8}>
              <strong>Firma</strong> Navn
            </FormLabel>
            <Input
              rounded="none"
              id="firmaNavn"
              type="text"
              value={firma?.navn}
              onChange={(e) =>
                setFirma({ ...getFirma(firma), navn: e.target.value })
              }
            />
          </Box>
          <Box>
            <FormLabel htmlFor="firmaAdresse" mt={8}>
              Adresse
            </FormLabel>
            <Input
              rounded="none"
              id="firmaAdresse"
              type="text"
              value={firma?.adresse}
              onChange={(e) =>
                setFirma({ ...getFirma(firma), adresse: e.target.value })
              }
            />
          </Box>

          <Box>
            <FormLabel htmlFor="firmaPostnr" mt={8}>
              Postnummer
            </FormLabel>
            <Input
              rounded="none"
              id="firmaPostnr"
              type="number"
              value={
                firma
                  ? firma.postnr > 0
                    ? firma.postnr
                    : undefined
                  : undefined
              }
              onChange={(e) =>
                setFirma({ ...getFirma(firma), postnr: e.target.valueAsNumber })
              }
            />
          </Box>
          <Box>
            <FormLabel htmlFor="firmaBy" mt={8}>
              By
            </FormLabel>
            <Input
              rounded="none"
              id="firmaBy"
              type="text"
              value={firma?.by}
              onChange={(e) =>
                setFirma({ ...getFirma(firma), by: e.target.value })
              }
            />
          </Box>
        </SimpleGrid>
        <FormHelperText>
          Skriv firmainfo her hvis du bestiller på vegne af et firma.
        </FormHelperText>

        <HStack pt="2">
          <Button
            disabled={originaltFirma === null}
            onClick={() => sletFirma()}
            variant="outline"
            rounded="none"
          >
            Fjern firma
          </Button>
          <Button
            disabled={!firmaIsChanged || firmaIsChanging}
            onClick={() => setFirma(originaltFirma)}
            variant="outline"
            rounded="none"
          >
            Fortryd
          </Button>
          <Button
            disabled={!firmaIsChanged}
            isLoading={firmaIsChanging}
            onClick={gemFirma}
            variant={firmaIsChanged ? "solid" : "outline"}
            colorScheme={firmaIsChanged ? "green" : ""}
            rounded="none"
          >
            Gem ændringer
          </Button>
        </HStack>

        <FormLabel htmlFor="dineOrdrer" mt={8}>
          Dine ordrer
        </FormLabel>
        <NextLink href="/ordrer" passHref>
          <Button variant="outline" rounded="none">
            Dine ordrer
          </Button>
        </NextLink>
        <FormHelperText>Se dine tidligere ordrer.</FormHelperText>

        {isAdmin && (
          <>
            <FormLabel htmlFor="kundersOrdrer" mt={8}>
              Kunders ordrer
            </FormLabel>
            <NextLink href="/ordreoverblik" passHref>
              <Button variant="outline" colorScheme="leanders" rounded="none">
                Kunders ordrer
              </Button>
            </NextLink>
            <FormHelperText>Se ordrer fra alle kunder.</FormHelperText>
          </>
        )}

        <Button
          variant="outline"
          mt={8}
          rounded="none"
          onClick={async () => {
            await supabaseClient.auth.signOut();
            await router.push("/");
          }}
        >
          Log ud
        </Button>
      </FormControl>
    </PageBox>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=profil",
  async getServerSideProps(ctx) {
    const { data } = await createServerSupabaseClient<Database>(ctx)
      .from("firmaer")
      .select("*");

    const firma = data && data.length > 0 ? data[0] : null;

    const { data: adminData } = await createServerSupabaseClient(ctx)
      .from("admins")
      .select("*");

    const isAdmin = Array.isArray(adminData) && adminData.length > 0;

    return { props: { isAdmin, firma } };
  },
});
