import ChakraNextImage from "@/components/ChakraNextImage";
import { definitions } from "@/types/supabase";
import { truncateDate } from "@/utils/ordre";
import {
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
} from "@chakra-ui/react";
import {
  supabaseClient,
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/supabase-auth-helpers/nextjs";
import { addDays, isAfter, isBefore, isToday } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";

interface OrdreLinje {
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
  user: User;
  isAdmin: boolean;
  ordrer: OrdreLinje[];
}

export default function Ordrer({ user, isAdmin, ordrer }: ProfilProps) {
  const router = useRouter();
  const [ordreData, setOrdreData] = useState(ordrer);
  const [knapDerAfslutterOrdre, setKnapDerAfslutterOrdre] = useState<number>();

  if (!isAdmin) {
    router.push("/");
  }

  const iDag = truncateDate(new Date());

  const kommendeOrdrer = ordreData.filter((linje) =>
    isAfter(new Date(linje.dato), iDag)
  );

  const tidligereOrdrer = ordreData.filter((linje) =>
    isBefore(new Date(linje.dato), iDag)
  );

  const afslutOrdreLinje = async (ordreLinjeId: number, afsluttet: boolean) => {
    setKnapDerAfslutterOrdre(ordreLinjeId);
    const { data, error } = await supabaseClient
      .from("ordre_linjer")
      .update({ afsluttet })
      .match({ id: ordreLinjeId });
    setOrdreData(
      ordreData.map((linje) =>
        linje.id === ordreLinjeId ? { ...linje, afsluttet } : linje
      )
    );
    setKnapDerAfslutterOrdre(undefined);
  };

  const bygTable = (
    titel: string,
    ordreLinjer: OrdreLinje[],
    size: "sm" | "md" = "md"
  ) => (
    <Table variant="simple" size={size}>
      <TableCaption placement="top">{titel}</TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric>antal</Th>
          <Th>vare</Th>
          <Th>bestilt af</Th>
          <Th>dato</Th>
          <Th>afsluttet</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ordreLinjer.map((linje) => {
          const idag = isToday(new Date(linje.dato)) ? "brand.100" : "";
          return (
            <Tr
              key={linje.id}
              background={
                linje.afsluttet ? "gray.200" : idag ? "brand.100" : ""
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
              <Td>{linje.dato}</Td>
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
                  {linje.afsluttet ? "Er afsluttet" : "Tryk for at afslutte"}
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );

  return (
    <>
      <Heading size="md">Ordrer</Heading>
      <TableContainer>
        {bygTable("Kommende ordrer", kommendeOrdrer)}
        {bygTable("Ordrer fra de sidste to uger", tidligereOrdrer, "sm")}
      </TableContainer>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=ordrer",
  async getServerSideProps(ctx) {
    const { data } = await supabaseServerClient(ctx)
      .from<OrdreLinje>("ordrer_view")
      .select("*")
      .gte("dato", addDays(new Date(), -14).toDateString());

    const { data: adminData } = await supabaseServerClient(ctx)
      .from<definitions["admins"]>("admins")
      .select("*");

    const isAdmin = Array.isArray(adminData) && adminData.length > 0;

    return { props: { ordrer: data, isAdmin } };
  },
});
