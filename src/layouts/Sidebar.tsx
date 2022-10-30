import { routes } from '@/utils/routes';
import { Flex, Icon, Stack, useColorModeValue } from '@chakra-ui/react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Logo } from './Logo';
import { NavButton } from './NavButton';

interface SidebarProps {
  onClose: () => void;
}

export function Sidebar(props: SidebarProps) {
  const { session } = useSessionContext();
  const router = useRouter();

  const minSideLabel = session?.user ? 'Min side' : 'Log ind';

  return (
    <Flex
      flex="1"
      bg="leanders.900"
      overflowY="auto"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      maxW={{ base: 'full', sm: 'xs' }}
      py={{ base: '6', sm: '8' }}
      px={{ base: '4', sm: '6' }}
    >
      <Stack spacing={{ base: '5', sm: '6' }} width="100%" shouldWrapChildren>
        <Logo />
        <Stack spacing="1">
          {routes.map((route) => (
            <NavButton
              onClick={props.onClose}
              key={route.href}
              href={route.href}
              label={route.label}
              color="leanders.600"
              icon={<Icon as={route.icon} boxSize="6" />}
              aria-current={router.asPath === route.href ? 'page' : undefined}
            />
          ))}
          {/* <NavButton
            onClick={props.onClose}
            color="leanders.600"
            href="/profil"
            label={minSideLabel}
            icon={<Icon as={FiUser} boxSize="6" />}
            aria-current={router.asPath === "/profil" ? "page" : undefined}
          /> */}
        </Stack>
      </Stack>
    </Flex>
  );
}
