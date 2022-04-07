import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    colors: {
      ...proTheme.colors,
      brand: proTheme.colors.orange,
    },
    // fonts: {
    //   body: "Roboto, sans-serif",
    //   heading: "Roboto, sans-serif",
    //   mono: "Menlo, monospace",
    // },
  },
  proTheme
);

export default theme;
