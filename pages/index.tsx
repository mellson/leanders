import { CenterModal } from '@/components/CenterModal';
import NulstilKode from '@/components/nulstilKode';
import { Heading } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import NextImage from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { access_token, type } = router.query;

  const visNulstilKode =
    access_token !== undefined &&
    typeof access_token === 'string' &&
    type === 'recovery';

  return (
    <>
      <NextImage src="/billeder/cover.jpeg" layout="fill" objectFit="cover" />
      <Heading size="lg" textAlign="center">
        Langsomt & lækkert siden 2017
      </Heading>
      <CenterModal
        titel={'Nulstil din kode'}
        isOpen={visNulstilKode}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        <NulstilKode />
      </CenterModal>
    </>
  );
}
