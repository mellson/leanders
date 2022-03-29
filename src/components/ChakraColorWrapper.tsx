import { theme } from "@chakra-ui/pro-theme";
import {
  ChakraProvider,
  cookieStorageManager,
  extendTheme,
  localStorageManager,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

interface ChakraProps {
  cookies?: string;
  children: ReactElement;
}

export function ChakraColorWrapper({
  cookies,
  children,
}: ChakraProps): JSX.Element {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.purple },
    },
    theme
  );

  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={myTheme}>
      {children}
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("hello");
  return {
    props: {
      // first time users will not have any cookies, and you may not return
      // undefined here, hence ?? is necessary
      cookies: context.req.headers.cookie ?? "",
    },
  };
};
