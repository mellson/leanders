import ChakraNextImage from '@/components/ChakraNextImage';
import NextLink from 'next/link';

export const navn = 'Leanders';

export function Logo() {
  return (
    <NextLink href="/" passHref>
      <ChakraNextImage
        width={200}
        height={60}
        src="/logoer/light_leanders_logo_text.png"
        bg="transparent"
        alt={navn}
      />
    </NextLink>
  );
}
