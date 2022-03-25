import { Box, ColorModeScript, Container } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import { Navbar } from "./Navbar";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Leanders - Hjem</title>
        <meta name="description" content="Leanders" />
        <link rel="icon" href="/favicon.ico" />
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
