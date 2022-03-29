import { ButtonGroup, Container, IconButton, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Logo } from "./Logo";

export const Footer = () => (
  <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
    <Stack justify="space-between" direction="row" align="center">
      <Logo />
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="#"
          aria-label="Facebook"
          icon={<FaFacebook fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Instagram"
          icon={<FaInstagram fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  </Container>
);
