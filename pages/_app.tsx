import { OrdreInfo } from "@/components/ordre/OrdreInfo";
import { AppLayout } from "@/layouts/AppLayout";
import { AppContext } from "@/utils/context";
import theme from "@/utils/theme";
import { ordreMaskine } from "@/xstate/ordreMaskine";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { inspect } from "@xstate/inspect";
import { useInterpret } from "@xstate/react";
import type { AppProps } from "next/app";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  inspect({ iframe: false });
}

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
