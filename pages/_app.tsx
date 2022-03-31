import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { useInterpret } from "@xstate/react";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { AppLayout } from "../src/layouts/AppLayout";
import theme from "../src/theme";
import { ordreMaskine } from "../src/xstate/ordreMaskine";

export const GlobalStateContext = createContext({});

function App({ Component, pageProps }: AppProps) {
  const ordreService = useInterpret(ordreMaskine);

  return (
    <ChakraProvider theme={theme}>
      <GlobalStateContext.Provider value={{ ordreService }}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </GlobalStateContext.Provider>
    </ChakraProvider>
  );
}

export default App;
