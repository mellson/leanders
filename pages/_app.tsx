import { theme } from "@chakra-ui/pro-theme";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import type { AppProps } from "next/app";
import { ChakraColorWrapper } from "../src/components/ChakraColorWrapper";
import { AppLayout } from "../src/layouts/AppLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.purple },
    },
    theme
  );
  return (
    <ChakraProvider theme={myTheme}>
      <ChakraColorWrapper cookies={pageProps.cookies}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ChakraColorWrapper>
    </ChakraProvider>
  );
}

export { getServerSideProps } from "../src/components/ChakraColorWrapper";

export default MyApp;
