import { OrdreInfo } from '@/components/ordre/OrdreInfo';
import { AppLayout } from '@/layouts/AppLayout';
import { AppContext } from '@/utils/context';
import theme from '@/utils/theme';
import { ordreMaskine } from '@/xstate/ordreMaskine';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/roboto-condensed';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import { useInterpret } from '@xstate/react';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

// const xstateInspect =
//   process.env.NEXT_PUBLIC_XSTATE_INSPECT === "true" &&
//   typeof window !== "undefined" &&
//   process.env.NODE_ENV === "development" &&
//   false;

// if (xstateInspect) inspect({ iframe: false });

export default function App({ Component, pageProps }: AppProps) {
  const ordreActor = useInterpret(ordreMaskine);

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ChakraProvider theme={theme}>
        <AppContext.Provider value={{ ordreActor }}>
          <NextNProgress
            color={theme.colors.leanders[500]}
            options={{ showSpinner: false }}
          />
          <AppLayout>
            <Component {...pageProps} />
            <OrdreInfo />
          </AppLayout>
        </AppContext.Provider>
      </ChakraProvider>
    </UserProvider>
  );
}
