import { Box, Container, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";
import { Navbar } from "./Navbar";

export const AppLayout: React.FC = ({ children }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as="section" height="100vh" overflowY="auto">
      <Navbar />

      <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
        {children}
      </Container>
    </Box>
  );
};
