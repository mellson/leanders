import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextImage from "next/image";

import * as React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export const Footer = () => (
  <Box as="footer" bg="gray.100">
    <Container role="contentinfo" py={{ base: "12", md: "16" }}>
      <Stack justify="space-between" direction="row" align="center">
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.facebook.com/broedkompagniet/"
            aria-label="Facebook"
            icon={<FaFacebook fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://www.instagram.com/broedkompagniet/"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
        </ButtonGroup>

        <Link href="https://www.findsmiley.dk/719019">
          <NextImage src={"/logoer/oeko_sort.svg"} width={52} height={50} />
        </Link>
      </Stack>

      <Text>Leanders IVS CVR: 38996371</Text>
    </Container>
  </Box>
);
