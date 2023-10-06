import { Box, Container, Text, useBreakpointValue } from "@chakra-ui/react";
import { isAfter, isBefore } from "date-fns";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";

export function Navbar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, "lg");
  const visFerieLukket =
    isAfter(Date.now(), new Date(2023, 9, 14)) &&
    isBefore(Date.now(), new Date(2023, 9, 23));
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
      {visFerieLukket && (
        <Text bg="yellow.400" textAlign="center" p={2} color="black">
          Vi holder ferielukket fra den 14. oktober til og med den 23. oktober
        </Text>
      )}
    </Box>
  );
}
