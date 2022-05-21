import { Button, Heading, Text } from "@chakra-ui/react";
import { User, withPageAuth } from "@supabase/supabase-auth-helpers/nextjs";
import NextLink from "next/link";

interface ProfilProps {
  user: User;
}

export default function Profil({ user }: ProfilProps) {
  return (
    <>
      <Heading size="md">Profil</Heading>
      <Text>{user.email}</Text>
      <Text>{user.id}</Text>
      <NextLink href="/api/auth/logout" passHref>
        <Button variant="outline">Log ud</Button>
      </NextLink>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login?returnTo=profil",
});
