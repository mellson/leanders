import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import Favicon from "../components/Favicon";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Leanders</title>
        <meta name="description" content="Leanders" />
        <Favicon />
      </Head>
      <Box height="100vh">
        <Navbar />
        {/*<Flex justify="space-between" direction="column" height="100%">*/}
        <Container
          as="main"
          pt={{ base: "8", lg: "12" }}
          pb={{ base: "12", lg: "24" }}
        >
          {children}
        </Container>

        <Footer />
        {/*</Flex>*/}
      </Box>
    </>
  );
};
