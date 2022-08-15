import { Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export function SimpleLink({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  const isActive = router.asPath === href ?? router.pathname === href;

  return (
    <NextLink href={href} key={href} passHref>
      <Box
        as="a"
        py={2}
        px={4}
        bg={isActive ? 'leanders.500' : 'transparent'}
        _hover={{ bg: 'leanders.600' }}
        color={isActive ? 'leanders.900' : 'leanders.100'}
        fontWeight={isActive ? 'bold' : 'normal'}
      >
        {label}
      </Box>
    </NextLink>
  );
}
