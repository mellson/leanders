import { CenterModal } from '@/components/CenterModal';
import NulstilKode from '@/components/nulstilKode';
import { useUser } from '@supabase/auth-helpers-react';
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
