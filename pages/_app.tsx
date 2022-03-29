import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import type { AppProps } from "next/app";
import { AppLayout } from "../src/layouts/AppLayout";
import theme from "../src/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  );
}

export default App;
