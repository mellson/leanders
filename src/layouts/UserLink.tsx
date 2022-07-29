import { Button } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import NextLink from 'next/link';

export function UserLink() {
  const { user, error } = useUser();

  if (!user)
    return (
      <NextLink href="/profil" passHref>
        <Button variant="outline">Log ind</Button>
      </NextLink>
    );

  return (
    <NextLink href="/profil" passHref>
      <Button variant="outline">Min side</Button>
    </NextLink>
  );
}
