import { Container } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login(props: any) {
  const { user, error } = useUser();
  const router = useRouter();
  const { returnTo } = router.query;

  useEffect(() => {
    if (user) {
      const hasReturnTo = returnTo && typeof returnTo === 'string';
      router.push(hasReturnTo ? `/${returnTo}` : '/');
    }
  }, [returnTo, router, user]);

  return (
    <Container maxW={{ base: 'full', md: '640px' }}>
      {error && <p>{error.message}</p>}

      <Auth
        supabaseClient={supabaseClient}
        providers={['facebook', 'google']}
        socialLayout="horizontal"
        socialButtonSize="large"
      />
    </Container>
  );
}
