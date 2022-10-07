import { SimpleLink } from "@/components/SimpleLink";
import { useSessionContext } from "@supabase/auth-helpers-react";

export function UserLink() {
  const { session } = useSessionContext();

  if (!session?.user)
    return <SimpleLink href="/login?returnTo=profil" label="Log ind" />;

  return <SimpleLink href="/profil" label="Min side" />;
}
