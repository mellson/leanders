import { Container, Flex, useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Footer } from './footer/Footer';
import { navn } from './Logo';
import { Navbar } from './navbar/Navbar';

export function AppLayout({ children }: PropsWithChildren) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      toggleColorMode();
    }
  }, [colorMode]);

  const [mode, setMode] = useState('ligth');

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setMode(colorScheme);
      });
  }, []);

  const logoHref =
    mode === 'dark'
      ? '/logoer/light_leanders_logo.png'
      : '/logoer/dark_leanders_logo.png';

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
