import ChakraNextImage from "@/components/ChakraNextImage";
import { PageBox } from "@/components/PageBox";
import type { Database } from "@/types/DatabaseDefinitions";
import {
  Box,
  Button,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createServerSupabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  addDays,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
} from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";

interface AdminOrdreLinje {
  id: number;
  antal: number;
  dato: string;
  firma?: string;
  user_email: string;
  vare: string;
  billede: string;
  afsluttet: boolean;
}

interface ProfilProps {
  isAdmin: boolean;
  ordrer: AdminOrdreLinje[];
}

export default function Ordreoverblik({ isAdmin, ordrer }: ProfilProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const [ordreData, setOrdreData] = useState(ordrer);
  const [knapDerAfslutterOrdre, setKnapDerAfslutterOrdre] = useState<number>();
  const isDesktop = useBreakpointValue({ base: false, lg: true }, "lg");
  const linjeIdagBg = useColorModeValue("leanders.100", "leanders.500");
  const linjeAfsluttetBg = useColorModeValue("gray.200", "gray.600");

  if (!isAdmin) {
    router.push("/");
  }

  const iDag = addDays(startOfDay(new Date()), -1);

  const kommendeOrdrer = ordreData.filter((linje) =>
    isAfter(parseISO(linje.dato), iDag)
  );

  const tidligereOrdrer = ordreData.filter((linje) =>
    isBefore(parseISO(linje.dato), addDays(iDag, 1))
  );

  const afslutOrdreLinje = async (ordreLinjeId: number, afsluttet: boolean) => {
    setKnapDerAfslutterOrdre(ordreLinjeId);
    const { data, error } = await supabaseClient
      .from("ordre_linjer")
      .update({ afsluttet, ordre_email_sendt: true })
      .match({ id: ordreLinjeId });
    setOrdreData(
      ordreData.map((linje) =>
        linje.id === ordreLinjeId ? { ...linje, afsluttet } : linje
      )
    );
    setKnapDerAfslutterOrdre(undefined);
  };

  const bygTable = (titel: string, ordreLinjer: AdminOrdreLinje[]) => (
    <Table variant="simple">
      <TableCaption placement="top">{titel}</TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric w="10%">
            antal
          </Th>
          <Th w="30%">vare</Th>
          <Th w="20%">bestilt af</Th>
          <Th w="20%">dato</Th>
          <Th w="20%">afsluttet</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ordreLinjer.map((linje) => {
          const idag = isToday(parseISO(linje.dato)) ? "leanders.100" : "";
          return (
            <Tr
              key={linje.id}
              background={
                linje.afsluttet ? linjeAfsluttetBg : idag ? linjeIdagBg : ""
              }
              opacity={linje.afsluttet ? 0.5 : 1}
              fontWeight={idag ? "bold" : ""}
              textDecoration={linje.afsluttet ? "line-through" : ""}
            >
              <Td isNumeric>{linje.antal}</Td>
              <Td>
                <HStack justify="space-between">
                  <Text>{linje.vare}</Text>
                  <ChakraNextImage
                    alt={linje.vare}
                    src={`/billeder/${linje.billede}.jpeg`}
                    width={60}
                    height={60}
                    transition="all 0.2s"
                    _hover={{
                      transform: "scale(1.05)",
                      shadow: "md",
                    }}
                  />
                </HStack>
              </Td>
              <Td>{linje.firma ?? linje.user_email}</Td>
              <Td>{parseISO(linje.dato).toLocaleDateString("da-DK")}</Td>
              <Td>
                <Button
                  variant="outline"
                  isLoading={knapDerAfslutterOrdre === linje.id}
                  disabled={
                    knapDerAfslutterOrdre !== undefined &&
                    knapDerAfslutterOrdre !== linje.id
                  }
                  onClick={() => afslutOrdreLinje(linje.id, !linje.afsluttet)}
                >
                  {linje.afsluttet
                    ? "Er afsluttet"
                    : isDesktop
                    ? "Klik for at afslutte"
                    : "Tryk for at afslutte"}
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );

  return (
    <PageBox>
      <Heading as="h3" size="sm" textTransform="uppercase">
        Ordrer
      </Heading>
      <TableContainer>
        {bygTable("Kommende ordrer", kommendeOrdrer)}
        <Box opacity={0.5}>
          {bygTable("Ordrer fra de sidste to uger", tidligereOrdrer)}
        </Box>
      </TableContainer>
    </PageBox>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=ordreoverblik",
  async getServerSideProps(ctx) {
    const supabaseClient = createServerSupabaseClient<Database>(ctx);

    const { data } = await supabaseClient
      .from("ordrer_view")
      .select("*")
      .gte("dato", addDays(new Date(), -14).toDateString());

    const { data: adminData } = await supabaseClient.from("admins").select("*");

    const isAdmin = Array.isArray(adminData) && adminData.length > 0;

    return { props: { ordrer: data, isAdmin } };
  },
});
