import {
  Box,
  Container,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      as="nav"
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Container py={{ base: "3", lg: "4" }}>
        {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
      </Container>
    </Box>
  );
};
