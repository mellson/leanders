import { Button, Icon, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button variant="ghost" justifyContent="start" onClick={toggleColorMode}>
      <Icon
        as={colorMode === "light" ? FiMoon : FiSun}
        boxSize="6"
        color="subtle"
      />
    </Button>
  );
}
