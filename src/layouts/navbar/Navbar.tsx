import { Box, Container, Text, useBreakpointValue } from "@chakra-ui/react";
import { isAfter, isBefore } from "date-fns";
import { DesktopNavBar } from "./DesktopNavBar";
import { MobileNavBar } from "./MobileNavBar";

export function Navbar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, "lg");
  const visFerieLukket =
    isAfter(Date.now(), new Date(2023, 11, 19)) &&
    isBefore(Date.now(), new Date(2023, 11, 31));
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
          Vi holder ferielukket fra d. 23/12 kl 11, men har åbent igen fra d.
          27/12 til d. 29/12 kl. 7-13 og d. 30/12 kl. 7-11
        </Text>
      )}
    </Box>
  );
}
