import { HStack, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
export function SoMeLinks() {
  return (
    <HStack spacing={0}>
      <IconButton
        as="a"
        href="https://www.facebook.com/broedkompagniet/"
        aria-label="Facebook"
        variant="link"
        color="leanders.100"
        colorScheme="leanders"
        icon={<FaFacebook fontSize="1.25rem" />}
      />
      <IconButton
        as="a"
        href="https://www.instagram.com/broedkompagniet/"
        aria-label="Instagram"
        variant="link"
        color="leanders.100"
        colorScheme="leanders"
        icon={<FaInstagram fontSize="1.25rem" />}
      />
    </HStack>
  );
}
