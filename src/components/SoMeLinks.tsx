import { HStack, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function SoMeLinks() {
  return (
    <HStack spacing={0}>
      <IconButton
        as="a"
        href="https://www.facebook.com/broedkompagniet/"
        aria-label="Facebook"
        variant="ghost"
        icon={<FaFacebook fontSize="1.25rem" />}
      />
      <IconButton
        as="a"
        href="https://www.instagram.com/broedkompagniet/"
        aria-label="Instagram"
        variant="ghost"
        icon={<FaInstagram fontSize="1.25rem" />}
      />
    </HStack>
  );
}
