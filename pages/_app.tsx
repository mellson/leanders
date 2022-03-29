import "@fontsource/inter/variable.css";
import type { AppProps } from "next/app";
import { ChakraColorWrapper } from "../src/components/ChakraColorWrapper";
import { AppLayout } from "../src/layouts/AppLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraColorWrapper cookies={pageProps.cookies}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraColorWrapper>
  );
}

export { getServerSideProps } from "../src/components/ChakraColorWrapper";

export default MyApp;
