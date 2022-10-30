import { PageBox } from '@/components/PageBox';
import { Container, Heading, Text } from '@chakra-ui/react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { session, error, supabaseClient } = useSessionContext();
  const router = useRouter();
  const { returnTo } = router.query;

  useEffect(() => {
    if (session?.user) {
      const hasReturnTo = returnTo && typeof returnTo === 'string';
      router.push(hasReturnTo ? `/${returnTo}` : '/');
    }
  }, [returnTo, router, session]);

  return (
    <PageBox>
      <Container maxW={{ base: 'full', md: '640px' }}>
        {error && <p>{error.message}</p>}

        <Heading as="h3" size="sm">
          Log ind
        </Heading>
        <Text>Du skal logge ind for at kunne bestille vores brød.</Text>
        <Text>
          Vi skal bruge dit login for at kunne sikre at du får netop det brød du
          har bestilt.
        </Text>
        <br />
        <Text pb="2">
          Du kan logge ind med FaceBook, Google eller med din email og en kode
          du selv vælger.
        </Text>

        <Auth
          supabaseClient={supabaseClient}
          providers={['facebook', 'google']}
          socialLayout="horizontal"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                radii: {
                  inputBorderRadius: '0',
                  borderRadiusButton: '0',
                  buttonBorderRadius: '0',
                },
                colors: {
                  inputBackground: '#fff',
                },
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email adresse',
                password_label: 'Kode',
                button_label: 'Log ind',
                link_text: 'Har du allerede en konto? Log ind her',
              },
              forgotten_password: {
                link_text: 'Glemt kode?',
              },
              sign_up: {
                link_text: 'Har du ikke en bruger? Opret en her',
                email_label: 'Email adresse',
                password_label: 'Kode',
              },
            },
          }}
        />
      </Container>
    </PageBox>
  );
}
