import { SoMeLinks } from '@/components/SoMeLinks';
import { Logo } from '@/layouts/Logo';
import { Sidebar } from '@/layouts/Sidebar';
import { ToggleButton } from '@/layouts/ToggleButton';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

export function MobileNavBar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const isPhone = useBreakpointValue({ base: true, md: false }, 'lg');

  return (
    <>
      <HStack width="100%" justify="space-between">
        <Box p={4}>
          <Logo />
        </Box>
        <HStack spacing={2}>
          <SoMeLinks />
          {/* <ColorModeToggle /> */}
          <ToggleButton
            isOpen={isOpen}
            aria-label="Open Menu"
            onClick={onToggle}
          />
        </HStack>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        isFullHeight
        preserveScrollBarGap
        size={isPhone ? 'full' : 'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
