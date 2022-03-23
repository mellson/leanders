import { Avatar, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

export function UserLink() {
  return (
    <NextLink href="/profil" passHref>
      <Link>
        <Avatar
          boxSize="10"
          name="Christoph Winston"
          src="https://tinyurl.com/yhkm2ek8"
        />
      </Link>
    </NextLink>
  );
}
