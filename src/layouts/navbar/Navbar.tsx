import {
  Box,
  Container,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";

export function Navbar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, "lg");

  return (
    <Box
      as="nav"
      bg={useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
      boxShadow={useColorModeValue("sm", "sm-dark")}
      pos="sticky"
      zIndex={10}
      top={0}
    >
      <Container py={{ base: "3", lg: "4" }}>
        {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
      </Container>
    </Box>
  );
}
