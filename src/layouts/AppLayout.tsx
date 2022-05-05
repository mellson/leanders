import Favicon from "@/components/Favicon";
import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import { PropsWithChildren } from "react";
import { Footer } from "./footer/Footer";
import { navn } from "./Logo";
import { Navbar } from "./navbar/Navbar";

export function AppLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>{navn}</title>
        <meta name="description" content={navn} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <Favicon />
      </Head>

      <Navbar />

      <Flex justify="space-between" direction="column" height="100%">
        <Container
          as="main"
          pt={{ base: 8, lg: 12 }}
          pb={{ base: 12, lg: 24 }}
          px={2}
        >
          {children}
        </Container>
        <Footer />
      </Flex>
    </>
  );
}
