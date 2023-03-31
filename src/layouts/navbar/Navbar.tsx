import { Box, Container, Text, useBreakpointValue } from "@chakra-ui/react";
import { isBefore } from "date-fns";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";

export function Navbar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, "lg");
  const visPaaskeLukket = isBefore(Date.now(), new Date(2023, 3, 10));
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
      {visPaaskeLukket && (
        <Text bg="yellow.400" textAlign="center" p={2} color="black">
          Vi holder påskelukket fra den 6. til og med den 10. april 🐣
        </Text>
      )}
    </Box>
  );
}
