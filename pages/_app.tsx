import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { useInterpret } from "@xstate/react";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { InterpreterFrom } from "xstate";
import { OrdreInfo } from "../src/components/OrdreInfo";
import { AppLayout } from "../src/layouts/AppLayout";
import theme from "../src/theme";
import { ordreMaskine } from "../src/xstate/ordreMaskine";

interface AppContext {
  ordreService: InterpreterFrom<typeof ordreMaskine>;
}

export const AppContext = createContext<AppContext>({} as AppContext);

export default function App({ Component, pageProps }: AppProps) {
  const ordreService = useInterpret(ordreMaskine);

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider value={{ ordreService }}>
        <AppLayout>
          <Component {...pageProps} />
          <OrdreInfo />
        </AppLayout>
      </AppContext.Provider>
    </ChakraProvider>
  );
}
