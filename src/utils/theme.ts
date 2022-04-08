import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import {
  darken,
  mode,
  StyleFunctionProps,
  transparentize,
} from "@chakra-ui/theme-tools";
import { variantOutline } from "./theme-button";

const theme = extendTheme(
  {
    colors: {
      ...proTheme.colors,
      brand: proTheme.colors.orange,
    },
    components: {
      Button: {
        variants: {
          outline: (props: StyleFunctionProps) => {
            if (props.colorScheme === "gray") {
              return {
                color: "emphasized",
                bg: mode("white", "gray.800")(props),
                _hover: {
                  bg: mode(
                    darken("gray.50", 1)(props.theme),
                    transparentize("gray.700", 0.4)(props.theme)
                  )(props),
                },
                _checked: {
                  bg: mode("gray.100", "gray.700")(props),
                },
                _active: {
                  bg: mode("gray.100", "gray.700")(props),
                },
              };
            }

            // Tilføj resterende farver fra det almindelige tema
            return variantOutline(props);
          },
        },
      },
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
