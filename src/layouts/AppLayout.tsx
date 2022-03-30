import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import Favicon from "../components/Favicon";
import { Footer } from "./footer/Footer";
import { navn } from "./Logo";
import { Navbar } from "./navbar/Navbar";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>{navn}</title>
        <meta name="description" content={navn} />
        <Favicon />
      </Head>
      <Flex height="100vh" direction="column">
        <Navbar />
        <Flex justify="space-between" direction="column" height="100%">
          <Container
            as="main"
            pt={{ base: "8", lg: "12" }}
            pb={{ base: "12", lg: "24" }}
          >
            {children}
          </Container>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
};
