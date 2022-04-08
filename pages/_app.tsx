import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { useInterpret } from "@xstate/react";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { InterpreterFrom } from "xstate";
import { OrdreInfo } from "../src/components/OrdreInfo";
import { AppLayout } from "../src/layouts/AppLayout";
import theme from "../src/utils/theme";
import { ordreMaskine } from "../src/xstate/ordreMaskine";

interface AppContext {
  ordreService: InterpreterFrom<typeof ordreMaskine>;
}

export const AppContext = createContext<AppContext>({} as AppContext);

export default function App({ Component, pageProps }: AppProps) {
  const ordreService = useInterpret(ordreMaskine);

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ChakraProvider theme={theme}>
        <AppContext.Provider value={{ ordreService }}>
          <AppLayout>
            <Component {...pageProps} />
            <OrdreInfo />
          </AppLayout>
        </AppContext.Provider>
      </ChakraProvider>
    </UserProvider>
  );
}
