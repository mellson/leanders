import ChakraNextImage from "@/components/ChakraNextImage";
import {
  Checkbox,
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
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/supabase-auth-helpers/nextjs";
import { isToday } from "date-fns";
import { useRouter } from "next/router";

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
  ordrer: OrdreLinje[];
}

export default function Ordrer({ user, ordrer }: ProfilProps) {
  const router = useRouter();

  if (!godkendtEmail(user.email)) {
    router.push("/");
  }

  return (
    <>
      <Heading size="md">Ordrer</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top">Kommende ordrer</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>antal</Th>
              <Th>vare</Th>
              <Th>bestilt af</Th>
              <Th>dato</Th>
              <Th>håndteret</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ordrer.map((linje) => {
              const idag = isToday(new Date(linje.dato)) ? "brand.100" : "";
              return (
                <Tr
                  key={linje.id}
                  background={
                    linje.afsluttet ? "gray.200" : idag ? "brand.100" : ""
                  }
                  opacity={linje.afsluttet ? 0.5 : 1}
                  fontWeight={idag ? "bold" : ""}
                  onClick={() => console.log("ordren er klikket på")}
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
                    <Checkbox isChecked={linje.afsluttet} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
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
      .gte("dato", new Date().toDateString());
    return { props: { ordrer: data } };
  },
});

const godkendteEmails = ["mellson@icloud.com"];
function godkendtEmail(email: string | undefined) {
  return email && godkendteEmails.includes(email);
}
