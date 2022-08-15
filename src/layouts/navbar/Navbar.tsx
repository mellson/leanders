import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import { DesktopNavBar } from './DesktopNavBar';
import { MobileNavBar } from './MobileNavBar';

export function Navbar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, 'lg');

  return (
    <Box
      as="nav"
      bg="leanders.900"
      color="leanders.500"
      pos="sticky"
      zIndex={10}
      top={0}
    >
      {/* <Container py={{ base: '3', lg: '4' }}>
      </Container> */}
      <Container>{isDesktop ? <DesktopNavBar /> : <MobileNavBar />}</Container>
    </Box>
  );
}
