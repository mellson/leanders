import { ButtonGroup, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function SoMeLinks() {
  return (
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
  );
}
