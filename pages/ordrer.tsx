import { definitions } from "@/types/supabase";
import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";

interface ProfilProps {
  user: User;
  ordrer: definitions["ordrer"];
}

export default function Ordrer({ user, ordrer }: ProfilProps) {
  const router = useRouter();

  if (!godkendtEmail(user.email)) {
    router.push("/");
  }

  console.log(ordrer);

  return (
    <>
      <Heading size="md">Ordrer</Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top">Dagens ordrer</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=ordrer",
  async getServerSideProps(ctx) {
    const { data } = await supabaseServerClient(ctx)
      .from<definitions["ordrer"]>("ordrer")
      .select("*")
      .order("id");
    return { props: { ordrer: data } };
  },
});

const godkendteEmails = ["mellson@icloud.com"];
function godkendtEmail(email: string | undefined) {
  return email && godkendteEmails.includes(email);
}
