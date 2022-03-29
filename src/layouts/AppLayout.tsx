import { Box, ColorModeScript, Container } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import Favicon from "../components/Favicon";
import { Navbar } from "./Navbar";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Leanders</title>
        <meta name="description" content="Leanders" />
        <Favicon />
      </Head>
      <ColorModeScript initialColorMode="light" />
      <Box as="section" height="100vh" overflowY="auto">
        <Navbar />

        <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
          {children}
        </Container>
      </Box>
    </>
  );
};
