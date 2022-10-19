import ChakraNextImage from "@/components/ChakraNextImage";
import { Box, Container, Flex, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { PropsWithChildren, useEffect, useState } from "react";
import { Footer } from "./footer/Footer";
import { navn } from "./Logo";
import { Navbar } from "./navbar/Navbar";

export function AppLayout({ children }: PropsWithChildren) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") {
      toggleColorMode();
    }
  }, [colorMode]);

  const [mode, setMode] = useState("ligth");
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        setMode(colorScheme);
      });
  }, []);

  const [bgLogoSize, setBgLogoSize] = useState<number>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBgLogoSize(window.innerWidth / 1.6);
    }
  });

  const logoHref =
    mode === "dark"
      ? "/logoer/light_leanders_logo.png"
      : "/logoer/dark_leanders_logo.png";

  return (
    <>
      <Head>
        <title>{navn}</title>
        <meta name="description" content={navn} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href={logoHref} />
      </Head>

      <Navbar />

      <Flex justify="space-between" direction="column" height="screen">
        <Container as="main">{children}</Container>

        {bgLogoSize !== undefined && (
          <Box zIndex={-1}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <ChakraNextImage
                alt="Logo"
                position="fixed"
                bottom={0}
                right={0}
                width={bgLogoSize}
                height={bgLogoSize}
                src="/logoer/dark_leanders_logo.png"
                bg="transparent"
                opacity={0.07}
              />
            </motion.div>
          </Box>
        )}
        <Footer />
      </Flex>
    </>
  );
}
