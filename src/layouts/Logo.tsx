import ChakraNextImage from '@/components/ChakraNextImage';
import { Heading, HStack, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link';

export const navn = 'Leanders';

export function Logo() {
  return (
    <NextLink href="/" passHref>
      <HStack spacing={4}>
        <ChakraNextImage
          width={80}
          height={80}
          src="/logoer/light_leanders_logo.png"
          bg="transparent"
        />
        <Heading
          cursor="pointer"
          size={useBreakpointValue({ base: 'xs', lg: 'sm' }, 'lg')}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="2px"
          color="leanders.400"
        >
          {navn}{' '}
        </Heading>
      </HStack>
    </NextLink>
  );
}
