import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <IconButton
        onClick={toggleColorMode}
        aria-label="Color mode toggle"
        variant="ghost"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      />
    </header>
  );
}
