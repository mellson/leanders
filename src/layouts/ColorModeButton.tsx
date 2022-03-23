import { Button, HStack, Icon, Text, useColorMode } from "@chakra-ui/react";
import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button variant="ghost" justifyContent="start" onClick={toggleColorMode}>
      <HStack spacing="3">
        <Icon
          as={colorMode === "light" ? FiMoon : FiSun}
          boxSize="6"
          color="subtle"
        />
        <Text>{colorMode === "light" ? "Sluk lyset" : "Tænd lyset"}</Text>
      </HStack>
    </Button>
  );
}
