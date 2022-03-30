import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "../Logo";
import { Sidebar } from "../Sidebar";
import { ToggleButton } from "../ToggleButton";

export function MobileNavBar() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
      <Logo />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        isFullHeight
        preserveScrollBarGap
      >
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
