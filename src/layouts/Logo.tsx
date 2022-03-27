import { Link } from "@chakra-ui/layout";
import { Heading, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

export const Logo = () => (
  <NextLink href="/" passHref>
    <Link>
      <Heading
        size={useBreakpointValue({ base: "xs", lg: "sm" })}
        fontWeight="bold"
      >
        Leanders 🥐
      </Heading>
    </Link>
  </NextLink>
);
