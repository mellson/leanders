import { Button, Heading, HStack, Text } from "@chakra-ui/react";
import {
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/supabase-auth-helpers/nextjs";
import NextLink from "next/link";

interface ProfilProps {
  user: User;
  isAdmin: boolean;
}

export default function Profil({ user, isAdmin }: ProfilProps) {
  return (
    <>
      <Heading size="md">Profil</Heading>
      <Text>{user.email}</Text>
      <HStack>
        {isAdmin && (
          <NextLink href="/ordrer" passHref>
            <Button variant="outline">Kunders ordrer</Button>
          </NextLink>
        )}
        <NextLink href="/api/auth/logout" passHref>
          <Button variant="outline">Log ud</Button>
        </NextLink>
      </HStack>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=profil",
  async getServerSideProps(ctx) {
    const { data } = await supabaseServerClient(ctx)
      .from("firmaer")
      .select("*");

    console.log(data);

    const isAdmin = true; // Array.isArray(data) && data.length > 0;

    return { props: { isAdmin } };
  },
});
