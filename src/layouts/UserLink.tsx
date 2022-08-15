import { SimpleLink } from '@/components/SimpleLink';
import { useUser } from '@supabase/auth-helpers-react';

export function UserLink() {
  const { user } = useUser();

  if (!user)
    return <SimpleLink href="/login?returnTo=profil" label="Log ind" />;

  return <SimpleLink href="/profil" label="Min side" />;
}
