import { Button, Link } from "@chakra-ui/react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import NextLink from "next/link";
import * as React from "react";

export function UserLink() {
  const { user, error } = useUser();

  if (!user)
    return (
      <NextLink href="/profil" passHref>
        <Button variant="outline">Log ind</Button>
      </NextLink>
    );

  console.log(user);

  return (
    <NextLink href="/profil" passHref>
      <Link>{user.email}</Link>
    </NextLink>
  );
}
