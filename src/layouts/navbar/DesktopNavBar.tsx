import { SimpleLink } from '@/components/SimpleLink';
import { SoMeLinks } from '@/components/SoMeLinks';
import { Logo } from '@/layouts/Logo';
import { UserLink } from '@/layouts/UserLink';
import { routes } from '@/utils/routes';
import { Box, ButtonGroup, Flex, HStack } from '@chakra-ui/react';

export function DesktopNavBar() {
  return (
    <Flex justify="space-between" alignItems="end">
      <Box p={6}>
        <Logo />
      </Box>

      <HStack spacing="4">
        <ButtonGroup variant="ghost" spacing="1">
          {routes.map((route) => (
            <SimpleLink
              key={route.href}
              href={route.href}
              label={route.label}
            />
          ))}
          <UserLink />
        </ButtonGroup>
        <SoMeLinks />
        {/* <ColorModeToggle /> */}
      </HStack>
    </Flex>
  );
}
