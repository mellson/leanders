import { Heading, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";

export const Logo = () => (
  <Heading
    size={useBreakpointValue({ base: "xs", lg: "sm" })}
    fontWeight="bold"
  >
    Leanders 🥐
  </Heading>
);
