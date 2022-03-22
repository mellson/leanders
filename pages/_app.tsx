import { theme } from "@chakra-ui/pro-theme";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.purple },
    },
    theme
  );
  return (
    <ChakraProvider theme={myTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
