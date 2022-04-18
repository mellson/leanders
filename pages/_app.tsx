import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { inspect } from "@xstate/inspect";
import { useInterpret } from "@xstate/react";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { ActorRefFrom } from "xstate";
import { OrdreInfo } from "../src/components/ordre/OrdreInfo";
import { AppLayout } from "../src/layouts/AppLayout";
import theme from "../src/utils/theme";
import { ordreMaskine } from "../src/xstate/ordreMaskine";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  inspect({ iframe: false });
}

interface AppContext {
  ordreService: ActorRefFrom<typeof ordreMaskine>;
}

export const AppContext = createContext<AppContext>({} as AppContext);

export default function App({ Component, pageProps }: AppProps) {
  const ordreService = useInterpret(ordreMaskine, { devTools: true });

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
