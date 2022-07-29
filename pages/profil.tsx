import { definitions } from '@/types/supabase';
import { AppContext } from '@/utils/context';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
} from '@chakra-ui/react';
import {
  supabaseClient,
  supabaseServerClient,
  User,
  withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import NextLink from 'next/link';
import { useContext, useState } from 'react';

interface ProfilProps {
  user: User;
  isAdmin: boolean;
  firma?: definitions['firmaer'];
}

export default function Profil({ user, isAdmin, firma }: ProfilProps) {
  const [originaltFirmaNavn, setOriginaltFirmaNavn] = useState(firma?.navn);
  const [firmaNavn, setFirmaNavn] = useState(firma?.navn);
  const [firmaIsChanging, setFirmaIsChanging] = useState(false);
  const firmaIsChanged = firmaNavn !== originaltFirmaNavn;
  const appContext = useContext(AppContext);
  const { send } = appContext.ordreActor;

  const gemFirma = async () => {
    setFirmaIsChanging(true);
    const { data, error } = await supabaseClient
      .from('firmaer')
      .upsert({ id: firma?.id, navn: firmaNavn });
    setOriginaltFirmaNavn(firmaNavn);
    setFirmaIsChanging(false);

    send({ type: 'Vis Priser', visPriser: firmaNavn === '' });
  };

  return (
    <>
      <Heading size="md">Profil</Heading>

      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" value={user.email} readOnly />
        <FormHelperText>
          Emailadressen der er tilknyttet din bruger.
        </FormHelperText>

        <FormLabel htmlFor="firmaNavn" mt={8}>
          Firma
        </FormLabel>
        <Input
          id="firmaNavn"
          type="text"
          value={firmaNavn}
          onChange={(e) => setFirmaNavn(e.target.value)}
        />
        <FormHelperText>
          Skriv dit firmanavn her hvis du bestiller på vegne af et firma.
        </FormHelperText>
        <HStack pt="2">
          <Button
            disabled={!firmaIsChanged || firmaIsChanging}
            onClick={() => setFirmaNavn(originaltFirmaNavn)}
            variant="outline"
          >
            Fortryd
          </Button>
          <Button
            disabled={!firmaIsChanged}
            isLoading={firmaIsChanging}
            onClick={gemFirma}
            variant={firmaIsChanged ? 'solid' : 'outline'}
            colorScheme={firmaIsChanged ? 'green' : ''}
          >
            Gem ændringer
          </Button>
        </HStack>

        <FormLabel htmlFor="dineOrdrer" mt={8}>
          Dine ordrer
        </FormLabel>
        <NextLink href="/ordrer" passHref>
          <Button variant="outline">Dine ordrer</Button>
        </NextLink>
        <FormHelperText>Se dine tidligere ordrer.</FormHelperText>

        {isAdmin && (
          <>
            <FormLabel htmlFor="kundersOrdrer" mt={8}>
              Kunders ordrer
            </FormLabel>
            <NextLink href="/ordrer" passHref>
              <Button variant="outline" colorScheme="brand">
                Kunders ordrer
              </Button>
            </NextLink>
            <FormHelperText>Se ordrer fra alle kunder.</FormHelperText>
          </>
        )}

        <NextLink href="/api/auth/logout" passHref>
          <Button variant="outline" mt={8}>
            Log ud
          </Button>
        </NextLink>
      </FormControl>
    </>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login?returnTo=profil',
  async getServerSideProps(ctx) {
    const { data } = await supabaseServerClient(ctx)
      .from<definitions['firmaer']>('firmaer')
      .select('*');

    const firma = data && data.length > 0 ? data[0] : null;

    const { data: adminData } = await supabaseServerClient(ctx)
      .from<definitions['admins']>('admins')
      .select('*');

    const isAdmin = Array.isArray(adminData) && adminData.length > 0;

    return { props: { isAdmin, firma } };
  },
});
