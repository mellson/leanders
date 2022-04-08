import {
  mode,
  SystemStyleFunction,
  transparentize,
} from "@chakra-ui/theme-tools";

// Denne klasse indeholder funktioner fra det almindelige tema's knap.
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts

export const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
};

export const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ...variantGhost(props),
  };
};
