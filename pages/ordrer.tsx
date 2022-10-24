import ChakraNextImage from "@/components/ChakraNextImage";
import { PageBox } from "@/components/PageBox";
import type { Database } from "@/types/DatabaseDefinitions";
import {
  Box,
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
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createServerSupabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import {
  addDays,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
} from "date-fns";

interface KundeOrdreLinje {
  id: number;
  antal: number;
  dato: string;
  ordrer: { id: string };
  varer: { navn: string; billede: string };
}

export default function Ordrer({ ordrer }: { ordrer: KundeOrdreLinje[] }) {
  const linjeIdagBg = useColorModeValue("leanders.100", "leanders.500");

  const iDag = addDays(startOfDay(new Date()), -1);

  const kommendeOrdrer = ordrer.filter((linje) =>
    isAfter(parseISO(linje.dato), iDag)
  );

  const tidligereOrdrer = ordrer.filter((linje) =>
    isBefore(parseISO(linje.dato), addDays(iDag, 1))
  );

  const bygTable = (titel: string, ordreLinjer: KundeOrdreLinje[]) => (
    <Table variant="simple">
      <TableCaption placement="top">{titel}</TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric w="10%">
            antal
          </Th>
          <Th w="30%">vare</Th>
          <Th w="20%">dato</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ordreLinjer.map((linje) => {
          const idag = isToday(parseISO(linje.dato)) ? "leanders.100" : "";
          return (
            <Tr
              key={linje.id}
              background={idag ? linjeIdagBg : ""}
              fontWeight={idag ? "bold" : ""}
            >
              <Td isNumeric>{linje.antal}</Td>
              <Td>
                <HStack justify="space-between">
                  <Text>{linje.varer.navn}</Text>
                  <ChakraNextImage
                    alt={linje.varer.navn}
                    src={`/billeder/${linje.varer.billede}.jpeg`}
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
              <Td>{parseISO(linje.dato).toLocaleDateString("da-DK")}</Td>
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
          {bygTable("Ordrer fra det seneste år", tidligereOrdrer)}
        </Box>
      </TableContainer>
    </PageBox>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=ordrer",
  async getServerSideProps(ctx) {
    const supabaseClient = createServerSupabaseClient<Database>(ctx);

    const { data } = await supabaseClient
      .from("ordre_linjer")
      .select(
        `
          id,
          antal,
          dato,
          ordrer (id),
          varer (navn,billede)
      `
      )
      .gte("dato", addDays(new Date(), -365).toDateString())
      .order("dato", { ascending: false });

    return { props: { ordrer: data } };
  },
});
